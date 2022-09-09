import { initialState } from './initialState';
import actionType from '../redux/action/types'
import { consoleLog, clearAllData } from '../components/helper'


export default (state = initialState.contestState, action) => {
    const { payload, type } = action
    switch (type) {
        case 'LOGIN_SUCCESS': return {
            ...state
        }
        case actionType.BRAND_LIST:
            return {
                ...state,
                brandList: action.payload
            }

        case actionType.CATEGORY_LIST:
            return {
                ...state,
                categoryList: action.payload
            }
        case actionType.BRAND_SELCTED_LIST:
            return {
                ...state,
                brandSeleList: action.payload
            }

        case actionType.CATEGORY_SELCTED_LIST:
            console.log('action.payload::', action.payload);
            return {
                ...state,
                categorySeleList: action.payload
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