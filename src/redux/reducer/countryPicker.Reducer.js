import { initialState } from '../initialStates'
import actionType from '../action/types'
import { consoleLog } from '../../components/helper'
export default (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case actionType['COUNTRY_CODE']: return {
            ...state,
            countryLabel: payload
        }
        case actionType['LOGOUT']: return {
            ...initialState
        }
        default: return { ...state }
    }
}