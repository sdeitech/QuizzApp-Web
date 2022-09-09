import { initialState } from '../initialStates'
import actionType from '../action/types'
import { consoleLog } from '../../components/helper'
export default (state = initialState, action) => {
    // debugger

    const { payload, type } = action
    switch (type) {
        case actionType['GAMES_LIST']: return {
            ...state,
            gamesList: [...state.gamesList, ...payload]
        }
        case actionType['GROUP_LIST']: return {
            ...state,
            groupsList: [...state.groupsList, ...payload]
        }
        case actionType['NOTIFICATIONS']: return {
            ...state,
            notificationList: [...state.notificationList, ...payload]
        }
        // case actionType['PROFILE']: return {
        //     ...state,
        //     profile: payload
        // }
        // case actionType['PULL_REFRESH']: return {
        //     ...state,
        //     isFetch: payload
        // }
        // case actionType['LOGIN_DETAILS']: return {
        //     ...state,
        //     loginDetails: payload
        // }
        // case actionType['LOGOUT']: return {
        //     ...initialState
        // }
        default: return { ...state }
    }
}