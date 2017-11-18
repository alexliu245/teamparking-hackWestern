import googlemaps
import pymongo
from pymongo import MongoClient
from datetime import datetime
import re

# test server clients
serverclient = MongoClient('mongodb://western:parker77@parkingapp-shard-00-00-s0fvp.mongodb.net:27017,parkingapp-shard-00-01-s0fvp.mongodb.net:27017,parkingapp-shard-00-02-s0fvp.mongodb.net:27017/test?ssl=true&replicaSet=ParkingApp-shard-0&authSource=admin')
db = serverclient.test
sensorcollection = db.sensors
ownercollection = db.owners
usercollection = db.users
transcollection = db.transactions
# initialize map client
gmaps = googlemaps.Client(key='AIzaSyDccw8C-y8tyB9izZb_OfwOpawLthxVb9Q')
while True:
    option = input("Add/Delete Owner, Sensor, or User? Or Add Transaction? Or Find Spots?\n")

    if option == "Add Owner":
        ownername = input("What is the owner's name?\n")
        owner = {"name": ownername,
                 "sensors": []}
        ownercollection.insert_one(owner)
    elif option == "Add Sensor":
        ownerofsensor = input("Who owns this sensor?\n")
        if not ownercollection.find({"name": ownerofsensor}):
            print("Invalid owner name.")
            break;
        address = input("What address is this sensor located at?\n")
        time1 = input("What time is the spot available from?\n")
        time2 = input("what time is the spot available till?\n")
        price = input("What is the hourly rate for this sensor?\n")
        # geocode supplied address
        geocode_result = gmaps.geocode(address)
        # Extract Lat and Long from geocode result and place in pair
        location = [geocode_result[0]['geometry']['location']['lat'], geocode_result[0]['geometry']['location']['lng']]
        sensor = {"state": False,
                  "timestart": time1,
                  "timeend": time2,
                  "location": location,
                  "price": price}
        sensor_id = sensorcollection.insert_one(sensor).inserted_id
        ownercollection.update_one({"name": ownerofsensor}, {'$push': {"sensors": sensor_id}})
    elif option == "Add User":
        username = input("What is the user's name?\n")
        password = input("Set password: \n")
        user = {"username": username,
                "password": password}
        usercollection.insert_one(user)
    elif option == "Delete Owner":
        ownername = input("What owner would you like to delete?\n")
        for sensor in ownercollection.find_one({"name": ownername})['sensors']:
            sensorcollection.delete_one({'_id': sensor})
        ownercollection.delete_one({"name": ownername})
    elif option == "Delete Sensor":
        sensorid = input("What is the id of the sensor you want to delete?\n")
        sensorcollection.delete_one({'_id': sensorid})
    elif option == "Delete User":
        userdelte = input("What is the name of the user you want to delete?\n")
        usercollection.delete_one({"username": userdelte})
    elif option == "Add Transaction":
        time1 = input("What time did the transaction start?\n")
        time2 = input("What time did the transaction end?\n")
        elapsedtime = time1 - time2
        ownerassociate = input("What owner was associated with the transaction?\n")
        userassociate = input("What user was associated with the transaction?\n")
        sensorassociate = input("What is the ID of the sensor where this took place?\n")
        trans = {"starttime": time1,
                 "endtime": time2,
                 "owner": ownerassociate,
                 "user": userassociate,
                 "sensor": sensorassociate}
        transcollection.insert_one(trans)
    elif option == "Find Spots":
        locale = input("Where do you want to see all the spots near?")
        geocode_result = gmaps.geocode(locale)
        # Extract Lat and Long from geocode result and place in pair
        locate = (geocode_result[0]['geometry']['location']['lat'], geocode_result[0]['geometry']['location']['lng'])
        dest = []
        for sensor in sensorcollection.find():
            dest.append((sensor['location'][0],sensor['location'][1]))
        print(dest)
        print(locate)
        matrix = gmaps.distance_matrix(locate, dest)
        print(matrix)
        print(matrix.keys())
        destinations = []
        i=0
        for opt in matrix['destination_addresses']:
            loc = {"address": opt,
                   "distance": matrix['rows'][0]['elements'][i]['distance']['text'],
                   "duration": matrix['rows'][0]['elements'][i]['duration']['text']}
            if int(re.sub('[^0-9]', '', loc['distance'])) <= 1:
                destinations.append(loc)
            i += 1
        print(destinations)





# print(db.collection_names(include_system_collections=False))

# origins = [location]
# destinations = [locationd, locationd2]

# matrix = gmaps.distance_matrix(origins, destinations)
# print(matrix['rows'])