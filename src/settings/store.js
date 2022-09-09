import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "../reducer/authReducer";
const appReducer = combineReducers({
    auth: authReducer,
})
const middleware = [thunk] // integrate thunk
const store = createStore(
    appReducer,
    applyMiddleware(...middleware)
);
export default store;
