// /sensor GET
export const getSensorData = () => {
   return {
       type: 'GET_SENSOR_DATA'
   }
}
export const updateSensorData = (res) => {
   return {
       type: 'UPDATE_SENSOR',
       payload: res
   }
}

// /sensor/<id> GET
export const getSensorDataWithID = (sensorID) => {
	return {
		type: 'GET_SENSOR_DATA_WITH_ID',
		payload: sensorID
	}
}
export const updateSensorDataWithID = (res) => {
   return {
       type: 'UPDATE_SENSOR_DATA_WITH_ID',
       payload: res
   }
}

// /owner GET
export const getOwnerData = () => {
   return {
       type: 'GET_OWNER_DATA'
   }
}
export const updateOwnerData = (res) => {
   return {
       type: 'UPDATE_OWNER',
       payload: res
   }
}

// /customer POST
export const postCustomerData = (name) => {
   return {
       type: 'POST_CUSTOMER_DATA',
       payload: name
   }
}
export const updateCustomerPostData = (res) => {
   return {
       type: 'UPDATE_CUSTOMER',
       payload: res
   }
}

// /owner POST
export const postOwnerData = (name) => {
   return {
       type: 'POST_OWNER_DATA',
       payload: name
   }
}
export const updateOwnerPostData = (res) => {
   return {
       type: 'UPDATE_OWNER_POST_DATA',
       payload: res
   }
}

// /owner/<id> GET
export const getOwnerDataWithID = (ownerID) => {
    return {
        type: 'GET_OWNER_DATA_WITH_ID',
        payload: ownerID
    }
}
export const updateOwnerDataWithID = (res) => {
    return {
        type: 'UPDATE_OWNER_DATA_WITH_ID',
        payload: res
    }
}

// /customer/<id> GET
export const getCustomerDataWithID = (customerID) => {
    return {
        type: 'GET_CUSTOMER_DATA_WITH_ID',
        payload: customerID
    }
}
export const updateCustomerDataWithID = (res) => {
    return {
        type: 'UPDATE_CUSTOMER_DATA_WITH_ID',
        payload: res
    }
}

// /assign/<customer_id>/<sensor_id> POST
export const assignCustomerToSensor = (customerID, sensorID) => {
    return {
        type: 'ASSIGN_CUSTOMER_TO_SENSOR',
        payload: {customer_id: customerID, sensor_id: sensorID}
    }
}
export const updateCustomerToSensor = (res) => {
    return {
        type: 'UPDATE_CUSTOMER_TO_SENSOR',
        payload: res
    }
}

// /release/<sensor_id> POST
export const releaseSensorAssignment = (sensorID) => {
    return {
        type: 'RELEASE_SENSOR_ASSIGNMENT',
        payload: sensorID
    }
}
export const updateSensorAssignment = (res) => {
    return {
        type: 'UPDATE_SENSOR_ASSIGNMENT',
        payload: res
    }
}

// /available-parking-spots-near?lat=x&lng=y
export const availableParkingSpots = (address) => {
    return {
        type: 'AVAILABLE_PARKING_SPOTS',
        payload: address
    }
}
export const updateAvailableParkingSpots = (res) => {
    return {
        type: 'UPDATE_AVAILABLE_PARKING_SPOTS',
        payload: res
    }
}

// /sensor POST
export const postSensor = (ownerID, address, hourlyRental, startBound, endBound) => {
    return {
        type: 'POST_SENSOR',
        payload: {ownerID: ownerID, address: address, hourlyRental: hourlyRental, startBound: startBound, endBound: endBound}
    }
}
export const updatePostSensor = (res) => {
    return {
        type: 'UPDATE_POST_SENSOR',
        payload: res
    }
}

// /transactions GET
export const getTransactionData = () => {
    return {
        type: 'GET_TRANSACTION_DATA',
    }
}
export const updateTransactionData = (res) => {
    return {
        type: 'UPDATE_TRANSACTION_DATA',
        payload: res
    }
}

// /transactions/<owner_id> GET
export const getTransactionDataWithID = (ownerID) => {
    return {
        type: 'GET_TRANSACTION_DATA_WITH_ID',
        payload: ownerID
    }
}
export const updateTransactionDataWithID = (res) => {
    return {
        type: 'UPDATE_TRANSACTION_DATA_WITH_ID',
        payload: res
    }
}