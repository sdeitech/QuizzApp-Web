import _ from "underscore";

const initialData = {
    token: "kevin",
    clientToken: "",
    userData: {},
    is_login: "",
    redirect: "",
    reload: "",
    forgot_email: "",
};

const authReducers = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_TOKEN":
            return {
                ...state,
                token: action.data,
            };
        case "ADD_CLIENTTOKEN":
            return {
                ...state,
                clientToken: action.data,
            };
        case "ADD_USERDATA":
            return {
                ...state,
                userData: action.data,
            };
        case "IS_LOGIN":
            return {
                ...state,
                is_login: action.data,
            };
        case "REDIRECT":
            return {
                ...state,
                redirect: action.data,
            };
        case "RELOAD":
            return {
                ...state,
                reload: action.data,
            };
        case "SUBSCRIPTION":
            return {
                ...state,
                subscriptionCode: action.data,
            };
        case "FORGOT_EMAIL":
            return {
                ...state,
                forgot_email: action.data,
            };
        default:
            return state;
    }
};

export default authReducers;
