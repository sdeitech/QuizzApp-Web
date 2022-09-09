import IO from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

import actionTypes from './types';
import store from './../store';

// const API_URI_2 = `https://dev-api.murabbo.com`;
const API_URI_2 = `https://5ac9-150-107-241-244.ngrok.io`;

// socket config
let socket_2;

if (!socket_2) {
    socket_2 = IO(API_URI_2, { forceNew: true });
}

// if (socket_2) {
socket_2?.on('connect', () => {
    console.log('Connection for 2');
});
// }

// get socket data if moderator click on start any question
socket_2.on("startQuestion", async (data) => {
    console.log("start question => socket => ", JSON.stringify(data));

    const payload = {
        status: true,
        ...data,
    };

    store.dispatch({ type: actionTypes.GAME_START_STATUS, payload });

    // FOR ASSIGNED USER
    store.dispatch({ type: actionTypes.GAME_ASSIGNED_USER, payload: data.userId });
});

// after some user connected for same game room 
// it will call only for moderator
socket_2.on("user-connected-game", ({ userId, username }) => {
    const { isModerator } = store.getState().gameReducer;

    console.log("user-connected-game out", userId);

    if (isModerator) {
        console.log("user-connected-game in");
        const payload = {
            userId,
            username
        };

        store.dispatch({ type: actionTypes.GAME_CLIENT_USERS_REQUEST_ADD, payload });
    }
});

// after moderator accept or decline result user will get this
socket_2.on("joinResult", async ({ roomID, userId, status }) => {
    const selfUserId = await AsyncStorage.getItem('userid');

    console.log("join result => ", { roomID, userId, status });
    console.log("join result => self user id => ", selfUserId);

    if (userId === selfUserId) {

        if (!status) {
            Actions.pop();
        } else {
            store.dispatch({ type: actionTypes.GAME_CLIENT_USERS_REQUEST_ACCEPT_STATUS, payload: status });
        }
    }
});

// after another user done with question
socket_2.on("resultQuestion", ({ questionIndex, roundIndex, resultStatus }) => {

    console.log("result question emit => ", questionIndex, roundIndex, resultStatus);

    const payload = { resultStatus };

    store.dispatch({ type: actionTypes.GAME_LAST_ANS_RESULT, payload });
});

// after moderator leave the room
socket_2.on("confirm-disconnect-room", (status) => {
    store.dispatch({ type: actionTypes.GAME_MODERATOR_LEAVE_ROOM, payload: status });
    // Actions.reset("Tabs");
});

// compititive next room by moderator
socket_2.on("nextQuestionModerator", () => {
    console.log("call next screen by moderator");
    store.dispatch({ type: actionTypes.GAME_MODERATOR_NEXT_ROOM_COMP, payload: true });
});

export const _flushPlayedGameData = () => dispatch => {
    dispatch({ type: actionTypes.GAME_FLUSH_DATA });
}

export const _joinGameRoom = ({ roomID, userId }) => (dispatch) => {
    try {
        socket_2.emit('join-game-room', ({ roomID, userId }));

        dispatch({ type: "actionTypes.MY_STREAM", payload: "roundId" });

        console.log("new data emit => enter join room => ",roomID,userId);

    } catch (error) {
        console.log("error is => ", error);
    }
}

export const _startRoundModerator = ({ roomID }) => async (dispatch) => {
    try {
        const {
            questionIndex, roundIndex, clientUsers,
            currentAssignedUser
        } = store.getState().gameReducer;

        let newUserIdIndex = clientUsers.findIndex(x => x === currentAssignedUser);


        console.log("user id for assign new question => index => old => ", newUserIdIndex);
        console.log("user id for assign new question => id => old => ", currentAssignedUser);

        if (newUserIdIndex === (clientUsers.length - 1)) {
            newUserIdIndex = 0;
        } else {
            newUserIdIndex = newUserIdIndex + 1;
        }

        const userId = clientUsers[newUserIdIndex];

        console.log("user id for assign new question => index => ", newUserIdIndex);
        console.log("user id for assign new question => id => ", userId);

        const gameInfo = {
            questionIndex,
            roundIndex,
            userId,
        };

        socket_2.emit('startRound', ({ roomID, gameInfo }));

        if (!newUserIdIndex) {
            const selfUserId = await AsyncStorage.getItem('userid');
            dispatch({ type: actionTypes.GAME_ASSIGNED_USER, payload: selfUserId });
        } else {
            dispatch({ type: actionTypes.GAME_ASSIGNED_USER, payload: userId });
        }

        dispatch({ type: "actionTypes.MY_STREAM", payload: "roundId" });
    } catch (error) {
        console.log("error is => ", error);
    }
}

export const _resultSendSocket = ({ roomID, resultStatus }) => (dispatch) => {
    try {
        const { questionIndex, roundIndex, clientUsers } = store.getState().gameReducer;

        const resultInfo = {
            questionIndex,
            roundIndex,
            resultStatus,
        };

        socket_2.emit('submitQuestion', ({ roomID, resultInfo }));

        dispatch({ type: "actionTypes.MY_STREAM", payload: "roundId" });
    } catch (error) {
        console.log("error is => ", error);
    }
}

// for moderator accept the user request
export const _moderatorAcceptRequest = ({ roomID, userId, status, isClosed }) => dispatch => {
    try {
        console.log("join-room :: ", { roomID, userId, status, isClosed });
        if (!isClosed) socket_2.emit('join-room-response', ({ roomID, userId, status }));

        const payload = {
            userId,
        };

        dispatch({ type: actionTypes.GAME_CLIENT_USERS_REQUEST_REMOVE, payload });

        if (status) {
            const payload = {
                userId,
            };

            dispatch({ type: actionTypes.GAME_CLIENT_USERS, payload });
        }
    } catch (error) {
        console.log("error is => ", error);
    }
}

// moderator leave room
export const _moderatorLeaveRoom = ({ roomID }) => (dispatch) => {
    try {
        socket_2.emit('disconnect-room', ({ roomID }));

        dispatch({ type: "unknownAction" });
    } catch (error) {
        console.log("error is => ", error);
    }
}

// moderator move next
export const _moderatorMoveNext = ({ roomID }) => (dispatch) => {
    try {
        socket_2.emit('nextQuestionComp', ({ roomID }));

        dispatch({ type: actionTypes.GAME_MODERATOR_NEXT_ROOM_COMP, payload: true });
    } catch (error) {
        console.log("error is => ", error);
    }
}

// change deep link status
export const _changeDeepLinkStatus = (status) => (dispatch) => {
    try {
        dispatch({ type: actionTypes.DEEP_LINK_STATUS, payload: status });
    } catch (error) {
        console.log("error is => ", error);
    }
}

