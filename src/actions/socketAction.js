export const joinRoomReqSend = (data) =>({ type: "JOIN_ROOM_REQ_SEND", data: data});
export const setModerator = (data) => ({ type: "IS_MODERATOR", data: data });
export const setRoomCreatorId = (data) => ({ type: "ROOM_CREATOR_ID", data: data });
export const setWaitScreen = (data) => ({ type: "WAIT_SCREEN", data: data });
export const setOtherUserStreams = (data) => ({ type: "SET_OTHER_USER_STREAM", data: data });
export const RemoveOtherUserStreams = (data) => ({ type: "REMOVE_OTHER_USER_STREAM", data: data });
export const clearOthetUserStream = (data) => ({ type: "CLEAR_OTHER_USER_STREAM", data: data });
export const updateOthetUserStream = (data) => ({ type: "UPDATE_OTHER_USER_STREAM", data: data });
export const setRoomId = (data) => ({ type: "SET_ROOMID", data: data });
export const setSocket = (data) => ({ type: "SOCKET", data: data });



// export const setMembers = (data) => ({ type: "SET_MEMBERS", data: data });


// export const removeMember = (data) => ({ type: "REMOVE_MEMBERS", data: data });

