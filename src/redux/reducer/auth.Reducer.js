import { initialState } from '../initialStates'
import actionType from '../action/types'
import { consoleLog, clearAllData } from '../../components/helper'
export default (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case 'LOGIN_SUCCESS': return {
            ...state
        }
        case actionType['USER_DETAILS']: return {
            ...state,
            userId: payload['token']
        }
        case actionType['USER_TOKEN']: return {
            ...state,
            loginToken: payload
        }
        case actionType['LOGIN_ROLE']: return {
            ...state,
            loginRole: payload
        }
        case actionType['LOADER']: return {
            ...state,
            loader: payload
        }
        case actionType['ALERT']: return {
            ...state,
            isAlertVisible: payload?.['isVisible'] ? payload?.['isVisible'] : false,
            alertMessage: payload?.['message'] ? payload['message'] : ''
        }
        case actionType['LOGOUT']: {
            clearAllData()
            return {
                ...initialState
            }
        }
        default: return { ...state }
    }
}