import * as url from '../utils/serviceConstants'
import { consoleLog, storeData } from '../components/helper'
import apiRequest from '../components/serviceRequest'
import localKey from '../utils/localStorageKey'
import { LoaderAction, AlertAction, SaveUserDataAction } from '../redux/action'
import { getLoginToken } from '../utils/session';
const POST = 'POST'
const PUT = 'PUT'
const GET = 'GET'
const DELETE = 'DELETE'


/**
 * Brand List API
 */
export const getBrandList = async (dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        // debugger
        let res = await apiRequest('', url.BRAND_LIST, GET);

        // debugger
        if (res['status'] === 200) {
            // debugger
            consoleLog('response_getBrandList==>', res)
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



/**
 * Category List API
 */
export const getCategoryList = async (dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger
        let res = await apiRequest('', url.CATEGORY_LIST, GET)
        // debugger
        if (res['status'] === 200) {
            // debugger
            consoleLog('response_getCategoryList==>', res)
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

/**
 * GAME OF THE DAY SCREEN
 */
export const getGameOfTheDay = async (userId, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger
        let res = await apiRequest('', `${url.GAME_OF_THE_DAY}?userId=${userId}&date=${new Date().toUTCString()}`, GET);
        console.log("requested api call for game of the day => ", `${url.GAME_OF_THE_DAY}?userId=${userId}&date=${new Date().toUTCString()}`);
        // debugger
        if (res['status'] === 200) {
            // debugger
            consoleLog('response_getCategoryList==>', res)
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

/**
 * Save Contest
 */

export const saveContestAPI = async (postData, dispatch) => {
    
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        // debugger

        let res = await apiRequest(postData, url.SAVE_CONTEST_LIST, POST)
        console.log('res::', res.data);
        console.log("RRR",postData,dispatch);
        // debugger
        if (res['status'] === 200) {
            // debugger
             consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Update Contest API
 */

export const updateContestDetailsAPI = async (postData, dispatch, contestId) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest(postData, `${url.SAVE_CONTEST_LIST}/${contestId}`, PUT)


        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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


/**
 * Publish Contest API
 */

export const publishContestAPI = async (dispatch, contestId) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest({}, `${url.PUBLISH_CONTEST}/${contestId}`, PUT)


        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Delete Contest API
 */

export const deleteContestDetailsAPI = async (postData, dispatch, contestId) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest(postData, `${url.SAVE_CONTEST_LIST}/${contestId}`, DELETE)


        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Save Contest
 */

export const saveContestGetAPI = async (postData, dispatch, id, saveToId, searchKey, contestId, isClone = false) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        // const data = await getLoginToken()

        let newEditableUrl = `${url.SAVE_CONTEST_LIST}?pageNo=${postData}`;

        if (saveToId) newEditableUrl = newEditableUrl + "&saveToId=" + saveToId;
        if (searchKey) newEditableUrl = newEditableUrl + "&searchKey=" + searchKey;
        if (contestId) newEditableUrl = newEditableUrl + "&contestId=" + contestId;
        if (isClone) newEditableUrl = newEditableUrl + "&isClone=" + true;
        if (id) newEditableUrl = newEditableUrl + `&userId=${id}`;

        console.log("new editable url == ", newEditableUrl);

        let res = await apiRequest('', newEditableUrl, GET);
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
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

/**
 * get round details
 */
export const getRoundDetailsSearch = async ({ gameType, pageno, dispatch, searchKey = "" }) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let baseAPI = `${url.INDIVIDUAL_ROUNDS}`;

        if (gameType) baseAPI = `${baseAPI}?gameType=${gameType}`;

        if (searchKey) baseAPI = `${baseAPI}?searchKey=${searchKey}`;

        console.log("search api new URL => ", baseAPI);

        let res = await apiRequest({}, baseAPI, GET);


        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res?.jsonData?.data }
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

/**
 * Get Contest History Data
 */

export const getContestHistoryAPI = async (userId, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        // const data = await getLoginToken()

        let newEditableUrl = `${url.GAMES_HISTORY}?userId=${userId}`;

        let res = await apiRequest('', newEditableUrl, GET);
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
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

/**
 * leaderboard Get API
 */

export const leaderboardGetAPI = async (userId, pageNo, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        // const data = await getLoginToken()
        let newEditableUrl = `${url.USER_LEADERBOARD}?userId=${userId}&page=${pageNo}&size=10`;

        let res = await apiRequest('', newEditableUrl, GET);
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
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

/**
 * yourFriend Get API
 */

export const yourFriend = async (userId, searchKey, pageNo, dispatch, id) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        // const data = await getLoginToken()
        let newEditableUrl = `${url.yourFrnd}?userId=${userId}&roomId=${id}`;

        // let newEditableUrl = `${url.yourFrnd}?userId=${userId}&page=${pageNo}&size=10`;

        if (searchKey) newEditableUrl = `${newEditableUrl}&searchKey=${searchKey}`;

        console.log("editable url :: ", newEditableUrl);

        let res = await apiRequest('', newEditableUrl, GET);
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
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

/**
 * Active members in room Get API
 */

export const activeMember = async (roomId, dispatch, gameId) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        // const data = await getLoginToken()
        let newEditableUrl = `${url.ACTIVEUSERLIST}?roomId=${roomId}&gameId=${gameId}`;

        let res = await apiRequest('', newEditableUrl, GET);
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            setTimeout(() => {
                // dispatch(LoaderAction(false))
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
        consoleLog('error in Active MemberList api', err)
    }

}

/**
 * Active members in room Get API
 */

export const scoreUpdate = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        // const data = await getLoginToken()
        let newEditableUrl = url.SCOREUPDATE;

        let res = await apiRequest(JSON.parse(JSON.stringify(postData)), url.SCOREUPDATE, POST);
        console.log('res::', res);
        // debugger
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
        consoleLog('error in Score update api', err)
    }

}

/**
 * photo library Get API
 */

export const mediaLibraryGetAPI = async (pageNo, mediaType, search, category, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        // const data = await getLoginToken()
        var newEditableUrl = `${url.MEDIA_LIBRARY}?type=${mediaType}&page=${pageNo}&size=10&keywords=${search}`;

        console.log("category display :: category :: ", typeof category);

        if (category && category !== 0 && typeof category !== "object") {
            newEditableUrl += `&category=${category}`;
        }

        console.log("category display :: category :: ", category);
        console.log("category display :: ", newEditableUrl);

        let res = await apiRequest('', newEditableUrl, GET);
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
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

/**
 * Get Notifications
 */

export const getNotifications = async (id, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        // const data = await getLoginToken()

        const calledURL = `${url.NOTIFICATION}?id=${id}`;

        console.log("get api detail :: ", calledURL);

        let res = await apiRequest('', calledURL, GET);
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
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

/**
 * Category List API
 */
export const getGamesList = async (language, playerType, categoryIds, searchKey, isTranding = "no", pageNo = 0, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        // // debugger
        let createNewRequest = url.GET_CONTEST_LIST + '?isTrending=' + (isTranding !== '' ? isTranding : 'no');
        if (language) createNewRequest = createNewRequest + '&language=' + language;
        if (playerType) createNewRequest = createNewRequest + '&playerType=' + playerType;
        if (categoryIds) createNewRequest = createNewRequest + '&categoryIds=' + categoryIds;
        if (searchKey) createNewRequest = createNewRequest + '&searchKey=' + searchKey;
        if (pageNo) {
            createNewRequest = createNewRequest + '&pageNo=' + pageNo;
        } else {
            createNewRequest = createNewRequest + '&pageNo=0';
        }

        console.log("get tranding contest => " + createNewRequest);
        let res = await apiRequest('', createNewRequest, GET)
        if (res['status'] === 200) {
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

/**
 * RoundDetails API 
 */

export const saveroundDetailsAPI = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        url.header['Content-Type'] = 'application/json';
        // debugger

        let res = await apiRequest(JSON.stringify(postData), url.ROUND_DETAILS, POST)
        console.log('res::', res);

        url.header['Content-Type'] = 'multipart/form-data';

        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Update Round API
 */

export const updateroundDetailsAPI = async (postData, dispatch, roundId) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest(postData, `${url.ROUND_DETAILS}/${roundId}`, PUT)


        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * RoundDetails API GET
 */


export const saveROUNDGetAPI = async (postData, dispatch, id) => {

    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        const data = await getLoginToken()

        let res = await apiRequest('', `${url.ROUND_DETAILS}?contestId=${id}`, GET)
        // alert(JSON.stringify(res['jsonData']));
        console.log('res::', res);
        // debugger
        dispatch(LoaderAction(false))

        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
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

/**
 * Tranding RoundDetails API GET
 */
export const getTredRoundList = async (dispatch, page) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        // debugger
        let res = await apiRequest('', url.TRAND_ROUND_DETAILS + `?page=${page}&size=10`, GET)
        if (res['status'] === 200) {
            consoleLog('RESPONSE getGamesList==>', res)
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


/**
 * RoundDetails API GET
 */
export const getRoundList = async (dispatch, page, contestId) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        // debugger

        // ?contestId=qweqweqwe&isTrending=no&roundId=asdasd&pageNo=0
        let newUrlData = url.ROUND_DETAILS + `?page=${page}`;

        if (contestId) newUrlData = newUrlData + `&contestId=${contestId}`;

        let res = await apiRequest('', newUrlData, GET);
        if (res['status'] === 200) {
            consoleLog('RESPONSE getGamesList==>', res);
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


/**
 * GAME submit question
 */
export const submitQuestion = async (paramData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();

        let res = await apiRequest(paramData, url.SUBMIT_QUESTION, POST);
        if (res['status'] === 200) {
            consoleLog('RESPONSE getGamesList==>', res);
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
    } finally {
        url.header['Content-Type'] = 'multipart/form-data';
    }
}


/**
 * Game Score
 */
export const getGamePoint = async (gameId, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();

        const totalPointsApi = `${url.TOTAL_POINTS}?gameId=${gameId}`;

        let res = await apiRequest({}, totalPointsApi, GET);
        if (res['status'] === 200) {
            consoleLog('RESPONSE getGamesList==>', res);
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
    } finally {
        url.header['Content-Type'] = 'multipart/form-data';
    }
}


/**
 * GAME submit question
 */
export const createGame = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        url.header['Content-Type'] = 'application/json';

        let res = await apiRequest(JSON.stringify(postData), url.GAMES, POST);
        if (res['status'] === 200) {
            consoleLog('RESPONSE getGamesList==>', res);
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
    } finally {
        url.header['Content-Type'] = 'multipart/form-data';
    }
}

/**
 * Delete Round API
 */

export const deleteRoundAPI = async (postData, dispatch, roundId) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        // debugger

        let res = await apiRequest(postData, `${url.ROUND_DETAILS}/${roundId}`, DELETE);

        console.log('res::', res);

        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * RoundQuestion API GET
 */


export const RoundquestionsAPI = async (postData, dispatch, id, gameType) => {

    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        const data = await getLoginToken()

        let res = await apiRequest('', `${url.CREATE_QUIZ}?roundId=${id}&gameType=${gameType}`, GET)
        // console.log('res::',res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
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


/**
 * Create Quiz Questions API
 */

export const savecreatequizAPI = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest(postData, url.CREATE_QUIZ, POST)
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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


/**
 * Delete Quiz Question API
 */

export const deleteQuestionDetailsAPI = async (postData, dispatch, questionId, roundId, gameType) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        // debugger

        let res = await apiRequest(postData, `${url.CREATE_QUIZ}/${questionId}?gameType=${gameType}&roundId=${roundId}`, DELETE);


        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Update Quiz Question API
 */

export const updateQuestionDetailsAPI = async (postData, dispatch, questionId) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest(postData, `${url.CREATE_QUIZ}/${questionId}`, PUT)


        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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


/**
 * Sorting Quiz Questions API
 */

export const saveSortquizAPI = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        url.header['Content-Type'] = 'application/json';
        // debugger

        console.log("my api request => ", JSON.stringify(postData), url.SORT_QUIZ, PUT);

        let res = await apiRequest(JSON.stringify(postData), url.SORT_QUIZ, PUT)

        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }));
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


/**
 * Sorting Match it and bingo Questions API
 */

export const saveSortMatchitBingoAPI = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        url.header['Content-Type'] = 'application/json';
        // debugger

        console.log("my api request => ", JSON.stringify(postData), url.SORT_MB_ROUND, PUT);

        let res = await apiRequest(JSON.stringify(postData), url.SORT_MB_ROUND, PUT)

        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }));
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

/**
 * Update Quiz Question API
 */

export const uploadImageAPI = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest(postData, `${url.GET_MEDIA_URL}`, POST);


        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Update Quiz Question API
 */

export const getUserSubscription = async (userId, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest({}, `${url.GET_USER_SUBSCRIPTION}?userId=${userId}`, GET);


        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

// get number for limit max number of question
export const getMaxNumberQuestion = async (dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest({}, `${url.MAX_NUMBER_QUESTIONS}`, GET);


        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Sorting Quiz Round API
 */

export const saveSortRoundAPI = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        url.header['Content-Type'] = 'application/json';
        // debugger

        console.log("my api request => ", JSON.stringify(postData), url.SORT_ROUND, PUT);

        let res = await apiRequest(JSON.stringify(postData), url.SORT_ROUND, PUT);

        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Report Contest API
 */

export const reportContest = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        // debugger

        let res = await apiRequest(postData, url.REPORT_CONTEST, POST);

        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Create Room Questions API
 */

export const roomCreate = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();
        // debugger

        let res = await apiRequest(postData, url.ROOM_LIST, POST);
         console.log("WWW",res);
        // debugger
        if (res['status'] === 200) {
            // debugger
             consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Room listing Questions API
 */

export const roomListing = async (contestId, roomId, dispatch) => {
    try {
        // debugger
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();

        let getRoomList = `${url.ROOM_LIST}?size=10000&`;

        if (contestId && roomId) {
            getRoomList = getRoomList + `contestId=${contestId}&roomId=${roomId}`;
        } else if (contestId) {
            getRoomList = getRoomList + `contestId=${contestId}`;
        } else if (roomId) {
            getRoomList = getRoomList + `roomId=${roomId}`;
        }

        console.log("getRoomList :: ", getRoomList);

        let res = await apiRequest({}, `${getRoomList}`, GET);

        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * Room listing Questions API
 */

export const roomGetFromPinPass = async (gamePin, password, dispatch) => {
    try {
        // debugger
        url.header['Authorization'] = 'Bearer ' + await getLoginToken();

        let getRoomDetail = url.PIN_PASSWORD_ROOM;

        if (gamePin) {
            getRoomDetail = getRoomDetail + `?gamePin=${gamePin}`;
        }

        if (password) {
            getRoomDetail = getRoomDetail + `&password=${password}`;
        }

        let res = await apiRequest({}, getRoomDetail, GET);

        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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

/**
 * User Invite List
 */

export const userInviteGetAPI = async (pageNo, searchKey, dispatch, id) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let getListUrl = `${url.ROOM_INVITE_LIST}?roomId=${id}&page=${pageNo}&size=10`;

        console.log("invitable api", getListUrl);

        if (searchKey) getListUrl = `${getListUrl}&searchKey=${searchKey}`;

        let res = await apiRequest('', getListUrl, GET)
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
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
/**
 * User Invite
 */

export const userInviteSendAPI = async (params, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest(params, `${url.ROOM_INVITE}`, POST)
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
             consoleLog('response_list==>', res)
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

/**
 * User Invite Accept
 */
export const userInviteAcceptAPI = async (params, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest(params, `${url.ROOM_INVITE_ACCEPT}`, POST)
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res['jsonData']['data'] };
        }
        else {
            dispatch(LoaderAction(false))
            setTimeout(() => {
                dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }));
            }, 500);
            return { status: false, message: res['jsonData']['message'] }
        }
    } catch (err) {
        dispatch(LoaderAction(false))
        setTimeout(() => {
            dispatch(AlertAction({ isVisible: true, message: res['jsonData']['message'] }));
        }, 500);
        consoleLog('error in login api', err)
    }

}
/**
 * User Invite Decline
 */
export const userInviteDeclineAPI = async (params, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest(params, `${url.ROOM_INVITE_DECLINE}`, POST)
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
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


/**
 * Create Quiz Questions API
 */

export const gameDeleteAPI = async (postData, dispatch) => {
    try {
        url.header['Authorization'] = 'Bearer ' + await getLoginToken()
        // debugger

        let res = await apiRequest(postData, url.DELETE_GAME_ROOM_DATA, POST)
        console.log('res::', res);
        // debugger
        if (res['status'] === 200) {
            // debugger
            // consoleLog('response_list==>', res)
            setTimeout(() => {
                dispatch(LoaderAction(false))
            }, 500);
            return { status: true, message: res['jsonData']['message'], data: res }
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
