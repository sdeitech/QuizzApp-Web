import { initialState } from '../initialStates'
import actionType from '../action/types'
import { consoleLog } from '../../components/helper'
export default (state = initialState, action) => {
    // debugger

    const { payload, type } = action
    switch (type) {
        case actionType['PHONE']: return {
            ...state,
            phone: payload
        }
        case actionType['PROFILE']: return {
            ...state,
            profile: payload
        }
        case actionType['PULL_REFRESH']: return {
            ...state,
            isFetch: payload
        }
        case actionType['LOGIN_DETAILS']: return {
            ...state,
            loginDetails: payload
        }
        case actionType['LOGOUT']: return {
            ...initialState
        }
        default: return { ...state }
    }
}