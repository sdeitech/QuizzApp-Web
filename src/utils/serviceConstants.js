import { Platform } from 'react-native'
import { getData, consoleLog } from '../components/helper'

// export const BASE_URL = 'http://54.201.160.69:3051/api/app/user/'
// export const MAIN_BASE_URL = 'http://54.201.160.69:3051/api/app/'
// export const MAIN_BASE_URL_2 = 'http://54.201.160.69:3051/api/'

export const BASE_URL = 'https://dev-api.murabbo.com/api/app/user/';
export const MAIN_BASE_URL = 'https://dev-api.murabbo.com/api/app/';
export const MAIN_BASE_URL_2 = 'https://dev-api.murabbo.com/api/';

// export const BASE_URL = 'https://f8d2-122-170-14-199.ngrok.io/api/app/user/';
// export const MAIN_BASE_URL = 'https://f8d2-122-170-14-199.ngrok.io/api/app/';
// export const MAIN_BASE_URL_2 = 'https://f8d2-122-170-14-199.ngrok.io/api/';


export const token = ''

export const apiConstant = {
    loginToken: ''
}


export const header = {
    'devicename': Platform.OS, // If required
    'deviceId': 'deviceToken', //If any
    'Accept': 'application/json', // Accept only json format
    'Content-Type': 'multipart/form-data', // body sending request type 
    'Authorization': `Bearer `
}

// AUTH
export const SIGNUP = `${BASE_URL}userSignup`
export const LOGIN = `${BASE_URL}userLogin`
export const CHECK_SOCIAL = `${BASE_URL}checkSocial`
export const FORGOT = `${BASE_URL}forgotPassword`
export const UPDATE_DEVICE_INFORMATION = `${BASE_URL}updateDeviceInformation`
export const RESET_PASSWORD = `${BASE_URL}resetPassword`
export const CHANGE_PASSWORD = `${BASE_URL}changePassword`
export const GROUPS = `${BASE_URL}saveTo`
export const PREFFERD_CATEGORY = `${BASE_URL}category`
export const USER_PROFILE = `${BASE_URL}userProfile`
export const USER_LEADERBOARD = `${BASE_URL}leaderboard`

export const BRAND_LIST = `${MAIN_BASE_URL}brand/brand`
export const CATEGORY_LIST = `${MAIN_BASE_URL}category/category`
export const SAVE_CONTEST_LIST = `${MAIN_BASE_URL}contest/contest`
export const PUBLISH_CONTEST = `${MAIN_BASE_URL}contest/publishContest`
export const GET_CONTEST_LIST = `${MAIN_BASE_URL}contest/contest`
export const GAME_OF_THE_DAY = `${MAIN_BASE_URL}contest/gameOfTheDay`
export const ROUND_DETAILS = `${MAIN_BASE_URL}round/round`
export const TRAND_ROUND_DETAILS = `${MAIN_BASE_URL}individual/getTrending`
export const SORT_ROUND = `${MAIN_BASE_URL}round/sorting`
export const CREATE_QUIZ = `${MAIN_BASE_URL}roundQuestion/roundQuestion`
export const SORT_QUIZ = `${MAIN_BASE_URL}roundQuestion/sorting`
export const SORT_MB_ROUND = `${MAIN_BASE_URL}roundQuestion/sortingBingo`
export const GET_TREDROUND_LIST = `${MAIN_BASE_URL}round/trendingRound`
export const ROOM_LIST = `${MAIN_BASE_URL}room/room`
export const PIN_PASSWORD_ROOM = `${MAIN_BASE_URL}room/pinPassword`
export const ROOM_INVITE_LIST = `${MAIN_BASE_URL}room/userListInvite`
export const ROOM_INVITE = `${MAIN_BASE_URL}room/inviteRoom`
export const ROOM_INVITE_ACCEPT = `${MAIN_BASE_URL}room/acceptInviteRoom`
export const ROOM_INVITE_DECLINE = `${MAIN_BASE_URL}room/declineInviteRoom`
export const NOTIFICATION = `${MAIN_BASE_URL}notification`
export const AUDIO_LIBRARY = `${MAIN_BASE_URL}audioVideo/audioVideo`
export const MEDIA_LIBRARY = `${MAIN_BASE_URL}media`
export const GET_MEDIA_URL = `${MAIN_BASE_URL}get-url-from-file`
export const GET_USER_SUBSCRIPTION = `${MAIN_BASE_URL}subscription/getusersubscription`
export const INDIVIDUAL_ROUNDS = `${MAIN_BASE_URL}individual/homeScreenRounds`
export const MAX_NUMBER_QUESTIONS = `${MAIN_BASE_URL}getQuestionsLimit`

export const yourFrnd = `https://dev-api.murabbo.com/api/app/user/friends`
export const REPORT_CONTEST = `https://dev-api.murabbo.com/api/app/report`
export const ACTIVEUSERLIST = `https://dev-api.murabbo.com/api/app/game/activeUser/`
export const SCOREUPDATE = `https://dev-api.murabbo.com/api/app/game/blankRoundScore`

export const PHOTO_LIBRARY = `${MAIN_BASE_URL_2}image/image`
export const SUBMIT_QUESTION = `${MAIN_BASE_URL_2}game/submitQuestion`
export const TOTAL_POINTS = `${MAIN_BASE_URL_2}game/totalPoints`
export const GAMES = `${MAIN_BASE_URL_2}game/game`
export const GAMES_HISTORY = `${MAIN_BASE_URL_2}game/history`
export const DELETE_GAME_ROOM_DATA = `${MAIN_BASE_URL_2}/game/deleteGameRoomData`


export const apiKey = {
    DEVICE_TYPE: 'device_type',
    DEVICE_TOKEN: 'device_token',
    EMAIL: 'email',
    CONTACT_NUMBER: 'contact_number',

    PHONE_CODE: 'phone_code',
    COUNTRY_CODE: 'country_code',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirm_password',

   
 
    TIMEZONE: 'timezone',
    OFF_SET:'off_set',
    
}

export const catchErr = 'Something went wrong, please try again later.'
