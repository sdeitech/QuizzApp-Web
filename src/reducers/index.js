import authReducers from "./authReducers";
import socketReducers from "./socketReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	authReducers,
	socketReducers,
})

export default rootReducer;