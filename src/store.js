import { createStore } from "redux";
import rootReducer from "./reducers/index";

const initialState = {
    sidebarShow: "responsive",
    asideShow: false,
    darkMode: false,
};

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case "set":
            return { ...state, ...rest };
        default:
            return state;
    }
};

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
