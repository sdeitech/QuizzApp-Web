import actionType from './types'
import { consoleLog } from '../../components/helper'

export const LoaderAction = data => ({
    type: actionType['LOADER'],
    payload: data
})

export const PullRefreshAction = data => ({
    type: actionType['PULL_REFRESH'],
    payload: data
})

export const AlertAction = data => ({
    type: actionType['ALERT'],
    payload: data
})

export const PhoneAction = data => ({
    type: actionType['PHONE'],
    payload: data
})

export const CountryPickerAction = data => ({
    type: actionType['COUNTRY_CODE'],
    payload: data
})

export const LoginTokenAction = (data) => ({
    type: actionType['USER_TOKEN'],
    payload: data
})

export const SaveUserDataAction = data => ({
    type: actionType['LOGIN_DETAILS'],
    payload: data
})


export const LogoutAction = data => ({
    type: actionType['LOGOUT'],
    payload: data
})

export const ProfileAction = data => ({
    type: actionType['PROFILE'],
    payload: data
})


export const setSeleBrandList = (data) => {
    return {
        type: actionType.BRAND_SELCTED_LIST,
        payload: data
    }
}


export const setSeleCategoryList = (data) => {
    return {
        type: actionType.CATEGORY_SELCTED_LIST,
        payload: data
    }
}


export const setBrandList = (data) => {
    return {
        type: actionType.BRAND_LIST,
        payload: data
    }
}

export const setGameList = (data) => {
    return {
        type: actionType.GAMES_LIST,
        payload: data
    }
}

export const setGroupsList = data => ({
    type: actionType.GROUP_LIST,
    payload: data
})

export const setCategoryList = (data) => {
    return {
        type: actionType.CATEGORY_LIST,
        payload: data
    }
}

export const setNotificationsList = (data) => {
    return {
        type: actionType.NOTIFICATIONS,
        payload: data
    }
}

export const setPlayRoundList = (data) => {
    return {
        type: actionType.SET_PLAYABLE_ROUNDS,
        payload: data
    }
}

export const setCurrentRound = (roundNo) => {
    return {
        type: actionType.SET_CURRENT_ROUND,
        payload: roundNo
    }
}

export const getGamesDataAction = data => ({
    type: actionType['GAMES_LIST'],
    payload: data
})

/**
 * SUBSCRIPTIN ACTIONS
 */

export const getSubscriptionAction = (data) => ({
    type: actionType.GET_SUBSCRIBE_DATA,
    payload: data
})

/**
 * SUBSCRIPTIN ACTIONS
 */

export const getMaxNumberQuestionAction = (data) => ({
    type: actionType.CONTEST_MAX_QUESTION_GET,
    payload: data
})
