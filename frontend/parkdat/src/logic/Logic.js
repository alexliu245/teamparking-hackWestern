import { createLogic }      from 'redux-logic';
import axios                from 'axios';
import { updateSensorData, 
        updateSensorDataWithID, 
        updateOwnerData, 
        updateCustomerPostData, 
        updateOwnerPostData,
        updateOwnerDataWithID,
        updateCustomerDataWithID,
        updateCustomerToSensor,
        updateSensorAssignment,
        updateAvailableParkingSpots }    
from '../actions/Actions';

const getSensor = createLogic({

    type: 'GET_SENSOR_DATA',
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.get(APIEndpoint + 'sensors');
            dispatch(updateSensorData(result.data));
            done();
        } catch(err){
            done();
        }
    }
})

const getSensorWithID = createLogic({

    type: 'GET_SENSOR_DATA_WITH_ID',
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.get(APIEndpoint + 'sensors/' + action.payload );
            dispatch(updateSensorDataWithID(result.data));
            done();
        } catch(err){
            done();
        }
    }
})

const getOwner = createLogic({

    type: 'GET_OWNER_DATA',
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.get(APIEndpoint + 'owners');
            dispatch(updateOwnerData(result.data));
            done();
        } catch(err){
            done();
        }
    }
})

const postCustomer = createLogic({

    type: 'POST_CUSTOMER_DATA',
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            console.log(action.payload);
            var result = await axios.post(APIEndpoint + 'customer',
                                        { name: action.payload });
            dispatch(updateCustomerPostData(result.data));
            done();
        } catch(err) {
            done();
        }
    }
})

const postOwner = createLogic({

    type: 'POST_OWNER_DATA',
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios({
                            method: 'post',
                            url: APIEndpoint + 'owner',
                            data:{ name: "dammit" }
                        });
            // var result = await axios.post(APIEndpoint + 'owner',
            //                             { name : action.payload });
            dispatch(updateOwnerPostData(result.data));
            done();
        } catch (err) {
            done();
        }
    }
})

const getOwnerWithID = createLogic({
    
    type: 'GET_OWNER_DATA_WITH_ID',
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.get(APIEndpoint + 'owner/' + action.payload );
            dispatch(updateOwnerDataWithID(result.data));
            done();
        } catch(err){
            done();
        }
    }
})

const getCustomerWithID = createLogic({

    type: 'GET_CUSTOMER_DATA_WITH_ID',
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.get(APIEndpoint + 'customer/' + action.payload );
            dispatch(updateCustomerDataWithID(result.data));
            done();
        } catch(err){
            done();
        }
    }
})

const assignCustomerToSensor = createLogic({

    type: "ASSIGN_CUSTOMER_TO_SENSOR",
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.post(APIEndpoint + 'assign/' + action.payload.customer_id + '/' + action.payload.sensor_id, {});
            dispatch(updateCustomerToSensor(result.data));
            done();
        } catch (err) {
            done();
        }
    }
})

const releaseSensorAssignment = createLogic({

    type: "RELEASE_SENSOR_ASSIGNMENT",
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.post(APIEndpoint + 'release/' + action.payload, {});
            dispatch(updateSensorAssignment(result.data));
            done();
        } catch (err) {
            done();
        }
    }
})

const availableParkingSpots = createLogic({

    type: "AVAILABLE_PARKING_SPOTS",
    async process({ getState, action, APIEndpoint }, dispatch, done) {
        try {
            var result = await axios.get(APIEndpoint + "/available-parking-spots-near?lat=" + action.payload.lat + "&lng=" + action.payload.long);
            dispatch(availableParkingSpots(result.data));
            done();
        } catch (err) {
            done();
        }
    }
})

export default [
    getSensor,
    getSensorWithID,
    getOwner,
    postCustomer,
    postOwner,
    getOwnerWithID,
    getCustomerWithID,
    assignCustomerToSensor,
    releaseSensorAssignment,
    availableParkingSpots
]