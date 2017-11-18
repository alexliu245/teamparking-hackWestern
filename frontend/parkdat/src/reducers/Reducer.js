const initialState = {
    sensorData: [],
    sensorDataWithID: [],
    ownerData: []
}

export default function actionsReducer(state = initialState, action) {

    switch (action.type) {

        case 'UPDATE_SENSOR':
            return{
                ...state,
                sensorData: action.payload
            }

        case 'GET_SENSOR_DATA':
            return {
                ...state
            }

        case 'GET_SENSOR_DATA_WITH_ID':
            return {
                ...state
            }

        case 'UPDATE_SENSOR_DATA_WITH_ID':
            return {
                ...state,
                sensorDataWithID: action.payload
            }

        case 'UPDATE_OWNER':
            return {
                ...state,
                ownerData: action.payload
            }

        case 'GET_OWNER_DATA':
            return {
                ...state
            }

        default: {
            return state
        }
    }
}