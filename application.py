from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime


# EB looks for an 'application' callable by default.
application = Flask(__name__)

production_url = "mongodb://western:parker77@parkingapp-shard-00-00-s0fvp.mongodb.net:27017," \
                 "parkingapp-shard-00-01-s0fvp.mongodb.net:27017," \
                 "parkingapp-shard-00-02-s0fvp.mongodb.net:27017/test?ssl=true&replicaSet=ParkingApp-shard-0&authSource=admin"

client = MongoClient(production_url)
db = client.test
owners = db.owners
customers = db.customers
sensors = db.sensors
transactions = db.transactions


@application.route("/")
def dont_use_this_route():
    return "Dont use this route."


@application.route("/owner/<id>", methods=["GET"])
def get_owner(id):
    owner = owners.find_one(ObjectId(id))
    if owner is not None:
        owner.pop("_id")
        return jsonify(owner)
    else:
        return jsonify({})


@application.route("/owner", methods=["POST"])
def register_owner():
    owner = owners.insert_one({
        "name": request.form["name"],
        "address": request.form["address"],
        "hourly_rental": float(request.form["hourly_rental"])
    })
    return str(owner.inserted_id)


@application.route("/sensor/<id>", methods=["GET"])
def get_sensor(id):
    sensor = sensors.find_one(ObjectId(id))
    if sensor is not None:
        sensor.pop("_id")
        return jsonify(sensor)
    else:
        return jsonify({})


@application.route("/sensor", methods=["POST"])
def register_sensor():
    sensor = sensors.insert_one({
        "owner": ObjectId(request.form["owner"]),
    })
    return str(sensor.inserted_id)


@application.route("/customer/<id>", methods=["GET"])
def get_customer(id):
    customer = customers.find_one(ObjectId(id))
    if customer is not None:
        customer.pop("_id")
        return jsonify(customer)
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
    sensor_id = ObjectId(sensor_id)
    if sensor_detected(sensor_id):
        if not session_is_open(sensor_id):
            sensors.update_one(
                {"_id": sensor_id},
                {"$set": {"start_time": datetime.now()}}
            )
    else:
        if session_is_open(sensor_id):
            sensor_session = close_session(sensor_id)
            record_transaction(sensor_session)
    return str(True)


def sensor_detected(sensor_id):
    return request.form["detected"] in set([True, "True", "true"])


def session_is_open(sensor_id):
    open_session = {
        "_id": sensor_id,
        "assigned_customer": {"$exists": True},
        "start_time": {"$exists": True}
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
    transaction = sensor
    owner = owners.find_one({"_id": transaction["owner"]})
    transaction.pop("_id")
    transaction["end_time"] = datetime.now()
    transaction["duration_in_hours"] = (
        transaction["end_time"] - transaction["start_time"]
    ).total_seconds() / 3600
    transaction["value"] = (
        transaction["duration_in_hours"] * owner["hourly_rental"]
    )
    transactions.insert_one(sensor)

# run the app.
if __name__ == "__main__":
    application.debug = True
    application.run()
