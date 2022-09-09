import * as url from '../utils/serviceConstants'
import { consoleLog, storeData, getData } from '../components/helper'
import apiRequest from '../components/serviceRequest'
import localKey from '../utils/localStorageKey'
import { LoaderAction, AlertAction, SaveUserDataAction } from '../redux/action'
import { setUserData } from '../utils/session';
import AsyncStorage from '@react-native-community/async-storage'

const POST = 'POST'
const GET = 'GET'
const DELETE = 'DELETE'
const PUT = 'PUT'

export const singupUser = async (loginParam, dispatch) => {
    try {
        url.header['Authorization'] = ''
        url.header['Content-Type'] = 'application/json';
        // debugger
        let res = await apiRequest(loginParam, url['SIGNUP'], POST)
        // debugger
        if (res['status'] === 200) {
            // debugger
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);

            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    } finally {
        url.header['Content-Type'] = 'multipart/form-data';
    }
}

export const loginUser = async (loginParam, dispatch) => {
    try {
        url.header['Authorization'] = ''
        let uri = url['LOGIN']
        let res = await apiRequest(loginParam, uri, POST)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            // debugger
            url.header['Authorization'] = `Bearer ${res['jsonData']['data']['refreshToken']}`
            dispatch(SaveUserDataAction(res['jsonData']['data']))
            storeData(localKey['LOGIN_TOKEN'], res['jsonData']['data']['refreshToken'])

            setUserData(res['jsonData']['data'])


            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const checkSocial = async (loginParam, dispatch) => {
    try {
        url.header['Authorization'] = ''
        let uri = url['CHECK_SOCIAL'];
        let res = await apiRequest(loginParam, uri, POST)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            // debugger
            url.header['Authorization'] = `Bearer ${res['jsonData']['data']['refreshToken']}`;
            dispatch(SaveUserDataAction(res['jsonData']['data']));
            storeData(localKey['LOGIN_TOKEN'], res['jsonData']['data']['refreshToken']);

            setUserData(res['jsonData']['data']);


            setTimeout(() => {
                dispatch(LoaderAction(false));
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const loginUserWithSocial = async (loginType, dispatch) => {
    try {
        url.header['Authorization'] = ''
        let uri = url['LOGIN']
        let res = await apiRequest(loginParam, uri, POST)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            // debugger
            url.header['Authorization'] = `Bearer ${res['jsonData']['data']['refreshToken']}`
            dispatch(SaveUserDataAction(res['jsonData']['data']))
            storeData(localKey['LOGIN_TOKEN'], res['jsonData']['data']['refreshToken'])

            setUserData(res['jsonData']['data'])


            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const updateDeviceInformation = async (params, dispatch) => {
    try {
        const authToken = await AsyncStorage.getItem('loginToken');
        url.header['Authorization'] = 'Bearer ' + authToken;
        let uri = url['UPDATE_DEVICE_INFORMATION'];
        let res = await apiRequest(params, uri, PUT);

        if (res['status'] === 200) {
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const forgotPassword = async (para, dispatch) => {
    try {
        url.header['Authorization'] = ''
        let uri = url['FORGOT']
        let res = await apiRequest(para, uri, POST)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const resetPassword = async (para, dispatch) => {
    try {
        url.header['Authorization'] = ''
        let uri = url['RESET_PASSWORD']
        let res = await apiRequest(para, uri, POST)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const changePassword = async (params, dispatch) => {
    try {
        const authToken = await AsyncStorage.getItem('loginToken');
        url.header['Authorization'] = 'Bearer ' + authToken;
        // url.header['Content-Type'] = 'application/x-www-form-urlencoded';
        let uri = url.CHANGE_PASSWORD;
        let res = await apiRequest(params, uri, POST)
        consoleLog('response==>', res)
        if (res['status'] === 200) {
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const getMyGroups = async (userId, dispatch) => {
    try {
        const authToken = await AsyncStorage.getItem('loginToken');
        url.header['Authorization'] = 'Bearer ' + authToken;
        let uri = `${url.GROUPS}?userId=${userId}`;
        let res = await apiRequest({}, uri, GET)

        consoleLog('response==>', res)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            // setTimeout(() => {
                dispatch(LoaderAction(false))
            // }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const addMyGroups = async (params, dispatch) => {
    try {
        const authToken = await AsyncStorage.getItem('loginToken');
        url.header['Authorization'] = 'Bearer ' + authToken;
        // url.header['Content-Type'] = 'application/x-www-form-urlencoded';
        let uri = `${url.GROUPS}`;
        let res = await apiRequest(params, uri, POST)

        consoleLog('response==>', res)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const updateMyGroups = async (params, dispatch) => {
    try {
        const authToken = await AsyncStorage.getItem('loginToken');
        url.header['Authorization'] = 'Bearer ' + authToken;
        // url.header['Content-Type'] = 'application/x-www-form-urlencoded';
        let uri = `${url.GROUPS}`;
        let res = await apiRequest(params, uri, POST)

        consoleLog('response==>', res)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const deleteMyGroups = async ({ userId, saveToId }, dispatch) => {
    try {
        const authToken = await AsyncStorage.getItem('loginToken');
        url.header['Authorization'] = 'Bearer ' + authToken;
        url.header['Content-Type'] = 'application/x-www-form-urlencoded';

        let uri = `${url.GROUPS}?userId=${userId}&saveToId=${saveToId}`;

        let res = await apiRequest({}, uri, DELETE)

        consoleLog('response==>', res)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}


export const getUserProfile = async (userId, dispatch) => {
    try {
        const authToken = await AsyncStorage.getItem('loginToken');
        url.header['Authorization'] = 'Bearer ' + authToken;
        // url.header['Content-Type'] = 'application/x-www-form-urlencoded';

        let uri = `${url.USER_PROFILE}?userId=${userId}`;
        let res = await apiRequest({}, uri, GET)

        consoleLog('response==>', res)
        if (res['status'] === 200) {
            consoleLog('response==>', res.jsonData.data.saveTo)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}


export const updateUserProfile = async (data, dispatch) => {
    try {
        const authToken = await AsyncStorage.getItem('loginToken');
        url.header['Authorization'] = 'Bearer ' + authToken;
        // url.header['Content-Type'] = 'application/x-www-form-urlencoded';

        let uri = `${url.USER_PROFILE}`;
        let res = await apiRequest(data, uri, PUT)

        consoleLog('response==>', res)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const getPrefCategory = async (userId, dispatch) => {
    try {
        const authToken = await AsyncStorage.getItem('loginToken');
        url.header['Authorization'] = 'Bearer ' + authToken;

        let uri = `${url.PREFFERD_CATEGORY}?userId=${userId}`;
        let res = await apiRequest({}, uri, GET)

        consoleLog('response==>', res)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const addPrefCategory = async (params, dispatch) => {
    try {
        const authToken = await AsyncStorage.getItem('loginToken');
        url.header['Authorization'] = 'Bearer ' + authToken;
        // url.header['Content-Type'] = 'application/x-www-form-urlencoded';
        let uri = `${url.PREFFERD_CATEGORY}`;
        let res = await apiRequest(params, uri, PUT)

        consoleLog('response==>', res)
        if (res['status'] === 200) {
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

export const getProfile = async (c, dispatch) => {
    try {
        let res = await apiRequest('', url['GET_PROFILE'], GET)
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            dispatch(SaveUserDataAction(res['jsonData']['data']))

            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);

            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        // consoleLog('error in login api', err)
    }
}

export const updateProfile = async (data, dispatch) => {
    try {
        let res = await apiRequest(data, url['UPDATE_PROFILE'], POST)
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response==>', res)

            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            dispatch(SaveUserDataAction(res['jsonData']['data']))

            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);

            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        // consoleLog('error in login api', err)
    }
}

export const otpVerify = async (loginParam, dispatch) => {
    try {
        url.header['Authorization'] = ''
        let res = await apiRequest(loginParam, url['LOGIN'], POST)
        if (res['status'] === 200) {
            // debugger
            url.header['Authorization'] = `Bearer ${res['jsonData']['data']['token']}`
            dispatch(SaveUserDataAction(res['jsonData']['data']))
            storeData(localKey['LOGIN_TOKEN'], res['jsonData']['data']['token'])
            consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
            }, 500);

            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        consoleLog('error in login api', err)
    }
}

