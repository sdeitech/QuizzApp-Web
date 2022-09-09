import actionType from '../action/types';

const initialState = {
    // common
    isStarted: false,
    roundIndex: 0,
    questionIndex: 0,
    requestedUsers: [],
    clientUsers: [],
    isModerator: false,
    moderatorLeaveRoom: false,

    // assigned
    currentAssignedUser: "",
    requestAccepted: undefined,
    lastAnswerResult: undefined,

    // compititive
    answeredUsers: [],
    moveToNext: false,

    // deep-linking
    deepLinkingStated: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.GAME_START_STATUS: {
            const { status, userId, ...rest } = payload;
            return { ...state, isStarted: status, ...rest };
        }
        case actionType.GAME_ASSIGNED_USER: {
            return { ...state, currentAssignedUser: payload };
        }
        case actionType.GAME_CLIENT_USERS: {
            const { userId } = payload;
            return { ...state, clientUsers: [...state.clientUsers, userId] };
        }
        case actionType.GAME_CLIENT_USERS_REQUEST_ADD: {
            // const { userId } = payload;
            return { ...state, requestedUsers: [...state.requestedUsers, { ...payload }] };
        }
        case actionType.GAME_CLIENT_USERS_REQUEST_REMOVE: {
            const { userId } = payload;
            let newUserList = [...state.requestedUsers];

            newUserList = newUserList.filter(user => user.userId !== userId);

            return { ...state, requestedUsers: [...newUserList] };
        }
        case actionType.GAME_MODERATOR_STATUS: {
            return { ...state, isModerator: payload };
        }

        // when someone will answer the result
        case actionType.GAME_LAST_ANS_RESULT: {
            const { resultStatus } = payload;
            return { ...state, lastAnswerResult: resultStatus };
        }

        case actionType.GAME_MODERATOR_NEXT_ROOM_COMP: {
            return { ...state, moveToNext: payload };
        }

        case actionType.GAME_CLIENT_USERS_REQUEST_ACCEPT_STATUS: {
            return { ...state, requestAccepted: payload };
        }

        // call when host will leave the room
        case actionType.GAME_MODERATOR_LEAVE_ROOM: {
            return { ...state, moderatorLeaveRoom: payload };
        }

        // call when host will leave the room
        case actionType.DEEP_LINK_STATUS: {
            return { ...state, deepLinkingStated: payload };
        }

        // reset all the store
        case actionType.GAME_FLUSH_DATA: {
            return { ...initialState };
        }

        default:
            return state;
    }
};
