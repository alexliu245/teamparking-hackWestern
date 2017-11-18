
import { createStore, applyMiddleware } from 'redux';
import { rootReducer }                  from './reducers';
import { createLogicMiddleware }        from 'redux-logic';
import arrLogic                         from './logic';

const APIEndpoint = "http://parkingapp.bsyes82dni.us-east-1.elasticbeanstalk.com/";
const logicMiddleware = createLogicMiddleware(arrLogic, {APIEndpoint});
const middleware = applyMiddleware(
    logicMiddleware
);
const store = createStore(rootReducer, middleware);

export default store;
