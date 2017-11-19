import { createLogic }      from 'redux-logic';
import axios                from 'axios';
import { updateSensorData, updateSensorDataWithID, updateOwnerData }    from '../actions/Actions';

const getSensor = createLogic({

    type: 'GET_SENSOR_DATA',
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.get(APIEndpoint + '/sensors');
            dispatch(updateSensorData(result.data));
        } catch(err){
            done();
        }
    }
})

const getSensorWithID = createLogic({

    type: 'GET_SENSOR_DATA_WITH_ID',
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.get(APIEndpoint + '/sensors/' + action.payload );
            dispatch(updateSensorDataWithID(result.data));
        } catch(err){
            done();
        }
    }
})

const getOwner = createLogic({

    type: 'GET_OWNER_DATA',
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.get(APIEndpoint + '/owners');
            dispatch(updateOwnerData(result.data));
        } catch(err){
            done();
        }
    }
})

export default [
    getSensor,
    getSensorWithID,
    getOwner
]