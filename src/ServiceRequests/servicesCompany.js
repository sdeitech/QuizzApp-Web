import * as url from '../utils/serviceConstants'
import { consoleLog, storeData, getData } from '../components/helper'
import apiRequest from '../components/serviceRequest'
import localKey from '../utils/localStorageKey'
import { LoaderAction, AlertAction, SaveUserDataAction } from '../redux/action'
import { Actions } from 'react-native-router-flux'

const POST = 'POST'
const GET = 'GET'

export const categoryList = async (c, dispatch) => {
    try {
        let res = await apiRequest('', url['CATEGORY_LIST'], GET)
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        if (res['status'] === 401) {
            // debugger
            // consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
           Actions.loginscreen()
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

export const interseteList = async (data, dispatch) => {
    try {
// debugger
        let res = await apiRequest(data, url['INTERESTE_LIST'], POST)
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        if (res['status'] === 401) {
            // debugger
            // consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
           Actions.loginscreen()
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

export const placeList = async (data, dispatch) => {
    try {
// debugger
        let res = await apiRequest(data, url['PLACE_LIST'], POST)
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        if (res['status'] === 401) {
            // debugger
            // consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
           Actions.loginscreen()
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
            Actions.loginscreen()
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        // consoleLog('error in login api', err)
    }
}


export const myReview = async (data, dispatch) => {
    let urls = data == '' ? url['REVIEW_LIST'] : url['REVIEW_LIST']+data
    try {
// debugger
        let res = await apiRequest('', urls, GET)
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] }
        }
        if (res['status'] === 401) {
            // debugger
            // consoleLog('response==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
           Actions.loginscreen()
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
            Actions.loginscreen()
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }))
        }, 500);
        // consoleLog('error in login api', err)
    }
}