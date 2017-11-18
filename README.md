# teamparking-hackWestern
_the AirBnB of parking_

current plan:

React.js front end:
login screen (fake)
client screen
owner screen

Python back end:
connects to AWS (use EC2)
3 DBs:
- machine profile DB (should be mostly static)
- machine log DB (adds each new complete session)
- machine current session (most active DB, will be constantly updating based on sensor readings)
