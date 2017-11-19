from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
from googlemaps import Client
from watson_developer_cloud import VisualRecognitionV3
import requests
import logging
import pprint
import json
import os


logger = logging.getLogger(__name__)

# EB looks for an 'application' callable by default.
application = Flask(__name__)
CORS(application)

client = MongoClient(os.getenv("DB_URL"))

db = client.production if os.getenv("ENVIRONMENT") == "production" else client.test
owners = db.owners
customers = db.customers
sensors = db.sensors
transactions = db.transactions

maps = Client(key=os.getenv("GOOGLE_MAPS_KEY"))


@application.route("/")
def api_blueprint():
    return "https://hackwestern4.slack.com/files/U7VEQCPH9/F821ZN6SV/api_docs.txt"


@application.route("/owner/<id>", methods=["GET"])
def get_owner(id):
    owner = owners.find_one(ObjectId(id))
    if owner is not None:
        owner["_id"] = str(owner["_id"])
        return jsonify(owner)
    else:
        return jsonify({})


@application.route("/owners", methods=["GET"])
def get_owners():
    owners_ = owners.find()
    result = []
    if owners_ is not None:
        for owner in owners_:
            if owner is not None:
                owner["_id"] = str(owner["_id"])
                result.append(owner)
        return jsonify(result)
    else:
        return jsonify({})


@application.route("/owner", methods=["POST"])
def register_owner():
    owner = owners.insert_one({
        "name": request.form["name"]
    })
    return str(owner.inserted_id)


@application.route("/sensor/<id>", methods=["GET"])
def get_sensor(id):
    sensor = sensors.find_one(ObjectId(id))
    if sensor is not None:
        sensor["_id"] = str(sensor["_id"])
        sensor["owner"] = str(sensor["owner"])
        sensor["session"] = is_place_available(sensor)
        return jsonify(sensor)
    else:
        return jsonify({})


@application.route("/sensors", methods=["GET"])
def get_sensors():
    sensors_ = sensors.find()
    results = []
    if sensors_ is not None:
        for sensor in sensors_:
            if sensor is not None:
                sensor["_id"] = str(sensor["_id"])
                if "assigned_customer" in sensor:
                    sensor.pop("assigned_customer")
                sensor["owner"] = str(sensor["owner"])
                sensor["session"] = is_place_available(sensor)
                results.append(sensor)
        return jsonify(results)
    else:
        return jsonify({})


@application.route("/sensor", methods=["POST"])
def register_sensor():
    loc = try_get_geocode(request.form["address"])
    sensor = sensors.insert_one({
        "owner": ObjectId(request.form["owner"]),
        "address": request.form["address"],
        "start_bound": int(request.form["start_bound"]),
        "end_bound": int(request.form["end_bound"]),
        "location": {"type": "Point", "coordinates": [loc["lng"], loc["lat"]]},
        "hourly_rental": float(request.form["hourly_rental"])
    })
    return str(sensor.inserted_id)


@application.route("/customer/<id>", methods=["GET"])
def get_customer(id):
    customer = customers.find_one(ObjectId(id))
    if customer is not None:
        customer["_id"] = str(customer["_id"])
        return jsonify(customer)
    else:
        return jsonify({})


@application.route("/customers", methods=["GET"])
def get_customers():
    customers_ = customers.find()
    result = []
    if customers_ is not None:
        for customer in customers_:
            if customer is not None:
                customer["_id"] = str(customer["_id"])
                result.append(customer)
        return jsonify(result)
    else:
        return jsonify({})


@application.route("/customer", methods=["POST"])
def register_customer():
    customer = customers.insert_one({
        "name": request.form["name"]
    })
    return str(customer.inserted_id)


@application.route("/assign/<customer_id>/<sensor_id>", methods=["POST"])
def assign_user_to_sensor(customer_id, sensor_id):
    updated = sensors.update_one(
        {"_id": ObjectId(sensor_id)},
        {"$set": {"assigned_customer": ObjectId(customer_id)}}
    )
    return str(updated.modified_count == 1)


@application.route("/release/<sensor_id>", methods=["POST"])
def release_sensor(sensor_id):
    updated = sensors.update_one(
        {"_id": ObjectId(sensor_id)},
        {"$unset": {"assigned_customer": True}}
    )
    return str(updated.modified_count == 1)


@application.route("/sensor/<sensor_id>/session", methods=["POST"])
def session(sensor_id):
    sensor_id = "5a1182998113c9063dc1febc" # <<< WE CURRENTLY ONLY HAVE THIS SENSOR!
    sensor_id = ObjectId(sensor_id)
    detected_car, items, score = sensor_detected(sensor_id, request.form["url"])
    if detected_car:
        if not session_is_open(sensor_id):
            sensors.update_one(
                {"_id": sensor_id},
                {"$set": {"start_time": datetime.now()}}
            )
            return ("Car Detected (Score %d) - Session Created\n" % score) + pprint.pformat(items)
        else:
            return ("Car Detected (Score %d) - Session was already opened\n" % score) + pprint.pformat(items)
    else:
        if session_is_open(sensor_id):
            sensor_session = close_session(sensor_id)
            record_transaction(sensor_session)
            return ("Car not Detected (Score %d) - Ended Session\n" % score) + pprint.pformat(items)
        else:
            return ("Car not Detected (Score %d)  - No Session to End\n" % score) + pprint.pformat(items)


@application.route("/available-parking-spots-near", methods=["GET"])
def available_parking_spots_near():
    if request.args.get("lat") and request.args.get("lng"):
        latitude = float(request.args.get("lat"))
        longitude = float(request.args.get("lng"))
    else:
        location = try_get_geocode(request.args.get("address"))
        latitude, longitude = location["lat"], location["lng"]
    geo_query = {
     "$and": [
        {
            "location": {
                "$near": {
                    "$geometry": {
                        "type": "Point",
                        "coordinates": [
                                longitude,
                                latitude
                        ]
                    },
                    "$maxDistance": 50000
                }
            }
        },
        {
         "assigned_customer": {"$exists": False}
        },
        {
         "start_time": {"$exists": False}
        }
    ]
    }
    if request.args.get("timebound") == False:
        pass
    else:
        current_hour = datetime.now().hour
        geo_query["$and"].append({"start_bound": {"$lte": current_hour}})
        geo_query["$and"].append({"end_bound": {"$gte": current_hour}})
    sensors_ = sensors.find(geo_query)
    results = []
    if sensors_ is not None:
        for sensor in sensors_:
            if sensor is not None:
                sensor["_id"] = str(sensor["_id"])
                if "assigned_customer" in sensor:
                    sensor["assigned_customer"] = str(sensor["assigned_customer"])
                sensor["owner"] = str(sensor["owner"])
                results.append(sensor)
        return jsonify(results)
    else:
        return jsonify({})


@application.route("/transactions")
def get_transactions():
    transactions_ = transactions.find()
    if transactions_ is None:
        return jsonify({})
    result = []
    for transaction in transactions_:
        transaction["_id"] = str(transaction["_id"])
        transaction["owner"] = str(transaction["owner"])
        transaction["sensor_id"] = str(transaction["sensor_id"])
        transaction["assigned_customer"] = str(transaction["assigned_customer"])
        result.append(transaction)
    return jsonify(result)


@application.route("/transactions/<owner_id>")
def get_transactions_by_owner(owner_id):
    transactions_ = transactions.find({"owner": ObjectId(owner_id)})
    if transactions_ is None:
        return jsonify({})
    result = []
    for transaction in transactions_:
        transaction["_id"] = str(transaction["_id"])
        transaction["owner"] = str(transaction["owner"])
        transaction["sensor_id"] = str(transaction["sensor_id"])
        transaction["assigned_customer"] = str(transaction["assigned_customer"])
        result.append(transaction)
    return jsonify(result)


def try_get_geocode(address):
    try:
        return get_geocode(address)
    except:
        return {"lat": 42.9959, "lng": -81.2757}


def get_geocode(address):
    result = maps.geocode(address)
    return result[0]['geometry']['location']


def sensor_detected(sensor_id, url):
    return is_this_a_car_watson(sensor_id, url)


def session_is_open(sensor_id):
    open_session = {
        "$and": [
            {"_id": sensor_id},
            {"assigned_customer": {"$exists": True}},
            {"start_time": {"$exists": True}}
        ]
    }
    return sensors.find_one(open_session) is not None


def close_session(sensor_id):
    session = sensors.find_one({"_id": sensor_id})
    sensors.update(
        {"_id": sensor_id},
        {"$unset": {"assigned_customer": True, "start_time": True, "end_time": True}}
    )
    return session


def record_transaction(sensor):
    lng, lat = sensor["location"]["coordinates"]
    transaction = sensor
    transaction["sensor_id"] = sensor["_id"]
    transaction["end_time"] = datetime.now()
    transaction["duration_in_hours"] = (
        transaction["end_time"] - transaction["start_time"]
    ).total_seconds() / 3600
    transaction["value"] = (
        transaction["duration_in_hours"] * transaction["hourly_rental"]
    )
    transaction["weather"] = try_get_weather(lng, lat)
    transactions.insert_one(transaction)


def is_this_a_car_watson(sensor_id, camera_snapshot_url):
    vis = VisualRecognitionV3('2017-11-18', api_key=os.getenv("WATSON_KEY"))
    # try:
    result = vis.classify(
        parameters=json.dumps({'url': camera_snapshot_url})
    )
    items = list(result["images"][0]["classifiers"][0]["classes"])
    count = 0
    for possible in items:
        if (is_a_vehicle_class(possible["class"])) and (possible["score"] > 0.5):
            count += 1
    return count > 0, items, count
    # except:
    #     return True, "Exception", 0


def is_a_vehicle_class(item_class):
    VEHICLES = set(['car', 'truck', 'vehicle'])
    for vehicle_class in VEHICLES:
        if vehicle_class in item_class.split(" "):
            return True
    return False


def try_get_weather(lat, lng):
    try:
        return get_weather(lat, lng)
    except:
        return {}


def get_weather(lat, lng):
    base_url = "https://hackathon.pic.pelmorex.com/api"

    location_code = requests.get(base_url + "/search/latlng?lat=%s&lng=%s" % (lat, lng)).json()["code"]
    weather = requests.get(base_url + "/data/observation?locationcode=" + location_code).json()["data"]
    return {
        "temperature": weather["temp"],
        "windspeed":  weather["windSpeed"],
        "visibility": weather["visibility"]
    }


def is_place_available(sensor):
    current_hour = datetime.now().hour
    if (("start_time" in sensor) and ("end_time" not in sensor)) or (current_hour < int(sensor["start_bound"]) or current_hour > int(sensor["end_bound"])):
        return "UNAVAILABLE"
    else:
        return "AVAILABLE"

# run the app.
if __name__ == "__main__":
    application.debug = True
    application.run()
