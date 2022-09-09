import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
// import Reactotron from 'reactotron-react-native';
// import { composeWithDevTools } from 'remote-redux-devtools';

let composeEnhancers = compose;

// if (__DEV__) {
//     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }

import rootReducer from '../reducer'
import Reactotron from './../../utils/ReactotronConfig';

const middleware = [
    thunk,
    logger
];


const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(...middleware),
        Reactotron.createEnhancer()
    )
);

export default store;