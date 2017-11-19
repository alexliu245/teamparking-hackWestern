import requests
from random import randint
import json

names = ['Rafael', 'Alex', 'Tori', 'Raj']
ownerIDs = []
sensors = ['1151 Richmond St, London, ON', '99 University Ave, Kingston, ON', '138 Bagot Street, Kingston, ON', '223 University Crescent, London, ON']
customers = ['Jack', 'James', 'John', 'Someone']
# populate the owners
for n in names:
    r = requests.post(url='http://parkingapp.bsyes82dni.us-east-1.elasticbeanstalk.com/owner', data={'name': n})
    print(r.text)
    ownerIDs.append(r.text)

i = 0
for s in sensors:
    s = requests.post(url='http://parkingapp.bsyes82dni.us-east-1.elasticbeanstalk.com/sensor', data={'owner': ownerIDs[i], 'address': s, 'hourly_rental': randint(5, 10), 'start_bound': randint(1, 24), 'end_bound': randint(1, 24)})
    i += 1

for c in customers:
    c = requests.post(url='http://parkingapp.bsyes82dni.us-east-1.elasticbeanstalk.com/customer', data={'name': c})


