export const getSensorData = () => {
   return {
       type: 'GET_SENSOR_DATA'
   }
}

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

export const updateSensorData = (res) => {
   return {
       type: 'UPDATE_SENSOR',
       payload: res
   }
}

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