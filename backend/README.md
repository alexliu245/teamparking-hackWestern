
[GET] at /customer/<id>
returns {name: string}

[POST] at /customer
provide {name: string}

[GET] at /owner/<id>
returns {name: string}

[POST] at /owner
provide {name: string}

[GET] at /sensor/<id>
returns {owner: string, address: string, location: {type: Point, coordinates: [double, double]}, hourly_rental: float}

[POST] at /sensor
provide {owner: string, address: string}

[POST] at /assign/<customer_id>/<sensor_id>
Assing customer to sensor for starting session provide nothing

[POST] at /release/<sensor_id>
releases sensor from users to end session provide nothing 

[POST] /sensor/<sensor_id>/session
provide {detected: bool}
