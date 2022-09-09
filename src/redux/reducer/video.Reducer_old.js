import actionType from '../action/types';

const initialState = {
    myStream: null,
    streams: [],
    streamsWithUserData: [],
    remoteStreams: [],
    videoUserId: null,
    allusers: [],
};

export default (state = initialState, { type, payload }) => {

    console.log("video reducer => type => ", type);
    console.log("video reducer => payload => ", payload);

    switch (type) {
        case actionType.MY_STREAM:
            return { ...state, myStream: payload };
        case actionType.ADD_STREAM:
            console.log("video reducer => payload => ADD_STREAM => ", payload);
            const streamUserData = {
                ...payload.userData,
                videoStream: payload.remoteVideoStream
            };

            return {
                ...state,
                streams: [...state.streams, payload.remoteVideoStream],
                streamsWithUserData: [...state.streamsWithUserData, streamUserData]
            };
        case actionType.ADD_REMOTE_STREAM:
            return { ...state, remoteStreams: [...state.remoteStreams, payload] };
        case actionType.REMOVE_REMOTE_STREAM:
            return { ...state, streams: [...payload] };
        case actionType.ADD_VIDEO_USERID:
            return { ...state, videoUserId: payload };
        case actionType.TOGGLE_MUTE_USER:
            return { ...state, streams: [...payload] };
        case actionType.ADD_USERS_LIST:
            // if (state.allusers.findIndex(x => x.id === payload.id) === -1) {
            //     return state;
            // } else {
            return { ...state, allusers: [...state.allusers, payload] };
            // }
        case actionType.FLUSH_USERS_LIST:
            return { ...state, streams: [] };
        default:
            return state;
    }
};