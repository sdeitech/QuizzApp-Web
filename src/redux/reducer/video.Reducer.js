import actionType from "../action/types";

const initialState = {
  myStream: null,
  streams: [],
  remoteStreams: [],
  videoUserId: null,
  allusers: [],

  requestedUsers: [],
  moderatorLeaveRoom: false,
  loaderForRequestedUsers: false,

  //* gameReducer
  isStarted: false,
  roundIndex: 0,
  questionId: 0,
  clientUsers: [],
  currentAssignedUser: "",

  //! temp gameReducer
  moveToNext: false,
};

export default (state = initialState, { type, payload }) => {
  console.log("video reducer => type => ", type);
  console.log("video reducer => payload => ", payload);

  switch (type) {
    case actionType.MY_STREAM:
      return { ...state, myStream: payload };
    case actionType.ADD_STREAM:
      // const newObjectArr = [payload];

      // // get old variables
      // const getNewArray = state.streams.map(obj => newObjectArr.find(o => o.joinedUserId === obj.joinedUserId) || obj);

      return { ...state, streams: [...state.streams, payload] };
    // return { ...state, streams: [...getNewArray] };
    case actionType.ADD_REMOTE_STREAM:
      return { ...state, remoteStreams: [...state.remoteStreams, payload] };
    case actionType.REMOVE_REMOTE_STREAM:
      return { ...state, streams: [...payload] };
    case actionType.UPDATE_REMOTE_STREAM:
      return { ...state, streams: [...payload] };
    case actionType.ADD_VIDEO_USERID:
      return { ...state, videoUserId: payload };
    case actionType.TOGGLE_MUTE_USER:
      return { ...state, streams: [...payload] };

    case actionType.VIDEO_CLIENT_USERS_REQUEST_ADD: {
      console.log("from reducer", payload);
      // const { userId } = payload;
      return {
        ...state,
        requestedUsers: [...state.requestedUsers, { ...payload }],
      };
    }
    case actionType.VIDEO_CLIENT_REQ_DONE: {
      const { socketId } = payload;
      let newUserList = [...state.requestedUsers];

      newUserList = [...state.requestedUsers].filter(
        (user) => user.socketId !== socketId
      );

      return { ...state, requestedUsers: [...newUserList] };
    }
    case actionType.LOADER_FOR_REQUEST_MODERATOR: {
      return { ...state, loaderForRequestedUsers: payload };
    }
    case actionType.VIDEO_MODERATOR_LEAVE_ROOM: {
      return { ...state, moderatorLeaveRoom: payload };
    }

    case actionType.ADD_USERS_LIST:
      // if (state.allusers.findIndex(x => x.id === payload.id) === -1) {
      //     return state;
      // } else {
      return { ...state, allusers: [...state.allusers, payload] };
    // }
    case actionType.FLUSH_USERS_LIST:
      return { ...state, streams: [] };

    //* gameReducer
    case actionType.GAME_START_STATUS: {
      const { status, ...rest } = payload;
      return { ...state, isStarted: status, ...rest };
    }

    case actionType.GAME_CLIENT_USERS: {
      const { userId } = payload;
      return { ...state, clientUsers: [...state.clientUsers, userId] };
    }

    //! temporary set move to next
    case actionType.GAME_MODERATOR_NEXT_ROOM_COMP: {
      return { ...state, moveToNext: payload };
    }

    // when someone will answer the result
    case actionType.GAME_LAST_ANS_RESULT: {
      const { resultStatus } = payload;
      return { ...state, lastAnswerResult: resultStatus };
    }

    // assign user on next game request
    case actionType.GAME_ASSIGNED_USER: {
      return { ...state, currentAssignedUser: payload };
    }

    case actionType.FLUSH_DATA:
      return { ...initialState };
    default:
      return state;
  }
};
