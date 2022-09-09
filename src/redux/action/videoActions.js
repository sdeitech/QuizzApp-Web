import actionTypes from './types';

import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';

import store from './../store';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

// API url
// const API_URI = ` https://rtc.murabbo.com`;
// const API_URI = `http://socketherokutest.herokuapp.com`;
// const API_URI = `https://socketvideocalling.herokuapp.com`;
const API_URI = `https://dev-api.murabbo.com`;
// const API_URI = `https://f8d2-122-170-14-199.ngrok.io`;

// socket config
let socket;


if (!socket) {
    socket = IO(API_URI, { forceNew: true });
}

// if (socket) {
socket?.on('connect', () => {
    console.log('Connection', socket);
});

socket?.on('disconnect', () => {
    console.log('DisConnection');
});
// }

let peerServer;

let peers = {};

// socket?.emit("join_room", "hello main room join");

export const joinRoom = (stream, roomId, joinedUserId, isModerator = false) => (dispatch) => {

    // if (socket?.disconnected) {
    //     socket.connect();
    // } else
    if (!socket) {
        socket = IO(API_URI, { forceNew: true });
    }

    // const peerServer = new Peer(undefined, {
    //     host: '192.168.0.100',
    //     secure: false,
    //     port: 5000,
    //     path: '/mypeer'
    // });

    peerServer = new Peer(undefined, {
        secure: false,
        config: {
            iceServers: [
                {
                    urls: [
                        'stun:stun1.l.google.com:19302',
                        'stun:stun2.l.google.com:19302',
                    ],
                },
            ],
        },
    });

    if (peerServer) {
        console.log("peer connection => ", peerServer);

        peerServer.on("connection", (data) => {
            console.log("peer connect with data => ", data);
        });

        peerServer.on("disconnected", (data) => {
            console.log("peer disconnect with data => ", data);
        });
    }

    peerServer.on("error", (error) => console.log("peer error => ", error));

    // const roomId = roomId;

    // set my stream
    dispatch({ type: actionTypes.MY_STREAM, payload: stream });
    console.log("my stream is  => ", stream, isModerator);

    // open connection for our server
    peerServer.on("open", (userId) => {
        console.log("open join room => ", roomId);


        if (isModerator) {
            socket.emit('join-room', { userId, roomId, stream, joinedUserId, isModerator });

            socket.on("user-request-moderator", ({ userdata, socketId }) => {
                try {
                    console.log("request from moderator => ", userdata, socketId);

                    const payload = {
                        userId: userdata?._id,
                        username: userdata.name,
                        userProfile: userdata.image,
                        socketId,
                    };

                    store.dispatch({ type: actionTypes.VIDEO_CLIENT_USERS_REQUEST_ADD, payload });
                } catch (error) {
                    console.log("request from moderator => error :: ", error);
                }
            });

            dispatch({ type: actionTypes.ADD_VIDEO_USERID, payload: userId });

            // alert("accepe request");
        } else {
            // alert(isModerator);
            socket.emit('join-room-req', { roomId, joinedUserId });

            // alert("send request");

            dispatch({ type: actionTypes.LOADER_FOR_REQUEST_MODERATOR, payload: true });

            socket.on("req-response-from-server", (status) => {
                console.log("join req from server => ", status);

                if (!status) {
                    Actions.pop();
                } else {
                    socket.emit('join-room', { userId, roomId, stream, joinedUserId, isModerator });
                    dispatch({ type: actionTypes.ADD_VIDEO_USERID, payload: userId });
                    dispatch({ type: actionTypes.LOADER_FOR_REQUEST_MODERATOR, payload: false });
                }
            });
        }
    });

    socket.on("user-connected", ({ userId, joinedUserId, userData, qualify }) => {
        // connectToNewUser(userId, stream, dispatch);
        console.log("user connected => ", userId, joinedUserId, userData, qualify);

        if (isModerator) {
            const payload = {
                userId: joinedUserId,
            };
            dispatch({ type: actionTypes.GAME_CLIENT_USERS, payload });
        }

        let allStreams = [...store.getState().videoReducer.streams];

        const getOldStreamer = allStreams?.find(stream => stream?.joinedUserId === joinedUserId);

        if (getOldStreamer) return;

        let resStreamId;

        const call = peerServer.call(userId, stream);

        call.on('stream', (remoteVideoStream) => {
            console.log("out of the screen stream");
            if (remoteVideoStream) {
                console.log("out of the screen stream", remoteVideoStream);
                resStreamId = remoteVideoStream?.id;
                // dispatch({ type: actionTypes.ADD_REMOTE_STREAM, payload: remoteVideoStream });

                // console.log("user connected new generated id for => from ", userId + " to " + remoteVideoStream.id);

                // const abcdObj = { ...remoteVideoStream, uniqueUserId: userId };

                // console.log("remoteVideoStream => ", JSON.stringify(remoteVideoStream));
                // console.log("remoteVideoStream => ", JSON.stringify(abcdObj));

                const payload = {
                    remoteVideoStream,
                    joinedUserId,
                    userData,
                    qualify
                };

                setTimeout(() => {
                    dispatch({ type: actionTypes.ADD_STREAM, payload });
                }, 400);
            }
        });

        call.on("close", () => {
            if (resStreamId) {
                let streams = [...store.getState().videoReducer.streams];

                // if (streams.findIndex(x => x.id !== remoteVideoStream.id) !== -1) {
                streams = streams.filter(x => {
                    if (x?.remoteVideoStream?.id !== resStreamId) return true;
                    return false;
                });
                dispatch({ type: actionTypes.REMOVE_REMOTE_STREAM, payload: streams });
                // }
                console.log("peer close for => ", resStreamId);
            }
        });

        peers[userId] = call;
    });

    // user previously connected users
    socket.on("previous-users", (users) => {
        // connectToNewUser(userId, stream, dispatch);
        console.log("user connected prev users => from server :: ", users);

        if (users) {

            let allStreams = [...store.getState().videoReducer.streams];

            users.forEach(user => {
                const { userId, userData, qualify = true, Audio = true, Video = true } = user;

                const call = peerServer.call(userId, stream);

                console.log("user connected prev users => ", userId);

                const getOldStreamer = allStreams?.find(stream => stream?.joinedUserId === userData?._id);

                if (!getOldStreamer) {
                    call.on('stream', (remoteVideoStream) => {

                        if (!Audio) {
                            remoteVideoStream?.getAudioTracks()?.forEach((track) => {
                                track.enabled = false;
                            });
                        }

                        if (!Video) {
                            remoteVideoStream?.getVideoTracks()?.forEach((track) => {
                                track.enabled = false;
                            });
                        }

                        const payload = {
                            remoteVideoStream,
                            joinedUserId: userData?._id,
                            userData,
                            qualify
                        };
                        console.log("user connected prev users => :: ", remoteVideoStream);
                        dispatch({ type: actionTypes.ADD_STREAM, payload });
                    });
                }
            });
        }
        // let resStreamId;
    });

    socket.on("user-disconnected", ({ userId, streamId, isModerator, username }) => {
        try {
            console.log("user disconnected => from socket =>", userId, streamId, isModerator, username);

            // const call = peerServer.call(userId, stream);

            // call.on('stream', (remoteVideoStream) => {
            //     console.log("user disconnected new generated id for => from ", userId + " to " + remoteVideoStream.id);

            let streams = [...store.getState().videoReducer.streams];
            console.log("all removed streams => ", streams);

            const { remoteVideoStream: removedStream } = streams.find(x => {
                console.log("all removed streams => get one stream :: id :: ", x?.remoteVideoStream?.id);

                if (x?.remoteVideoStream?.id === streamId) return true;
                return false;
            }) || { remoteVideoStream: undefined };

            console.log("all removed streams => get one stream :: ", removedStream);

            if (removedStream) {
                removedStream.getTracks().forEach(track => track.stop());
                removedStream.release();
            }

            streams = streams.filter(x => {
                if (x?.remoteVideoStream?.id !== streamId) return true;
                return false;
            });



            dispatch({ type: actionTypes.REMOVE_REMOTE_STREAM, payload: streams });
            if (peers[userId]) peers[userId].close();
            // peerServer.disconnect(userId);
            // });

            // IF MODERATOR REMOVE FROM STREAM
            if (isModerator) {
                dispatch({ type: actionTypes.VIDEO_MODERATOR_LEAVE_ROOM, payload: true });
            } else { // if other users leave from room
                Toast.show(`${username} left from room`);
            }

            console.log("all removed streams => END");
        } catch (error) {
            console.log("disconnected error => ", error);
        }
    });

    socket.on("user-Disqualify", ({ joinedUserId, qualify }) => {
        try {
            console.log("user disconnected => from socket =>", joinedUserId);

            // const call = peerServer.call(userId, stream);

            // call.on('stream', (remoteVideoStream) => {
            //     console.log("user disconnected new generated id for => from ", userId + " to " + remoteVideoStream.id);

            let streams = [...store.getState().videoReducer.streams];
            console.log("disqualify streams => ", streams);

            streams.forEach(strm => {
                console.log("disqualify streams => get one stream :: id :: ", strm?.userData?._id);

                if (strm?.userData?._id === joinedUserId) {
                    strm.qualify = qualify;
                }
            });

            console.log("disqualify streams => get new streams :: ", streams);

            dispatch({ type: actionTypes.UPDATE_REMOTE_STREAM, payload: streams });

            console.log("disqualify streams => END");
        } catch (error) {
            console.log("disconnected error => ", error);
        }
    });



    // receive a call
    peerServer.on('call', (call) => {
        call.answer(stream);



        let resStreamId;

        // stream back the call
        call.on('stream', (resstream) => {
            console.log("receive call from peer server", resstream);

            resStreamId = resstream?.id;

            // console.log(new Date() + " resstream => ", resstream);

            // dispatch({ type: actionTypes.ADD_USERS_LIST, payload: resstream });
            // { stream: remoteVideoStream, uniqueUserId: userId }
            // const streamsData = [...store.getState().videoReducer.streams];
            // const myStream = store.getState().videoReducer.myStream;

            // resStreamId = resstream.id;

            // if ([...streamsData].findIndex(x => x.id !== resstream.id) == -1) {
            // dispatch({ type: actionTypes.ADD_STREAM, payload: resstream });
            // }
        });

        call.on("close", () => {
            if (resStreamId) {
                console.log("user disconnected => from peer =>", resStreamId);
                let streams = [...store.getState().videoReducer.streams];

                // if (streams.findIndex(x => x.id !== remoteVideoStream.id) !== -1) {
                streams = streams.filter(x => {
                    if (x?.remoteVideoStream?.id !== resStreamId) return true;
                    return false;
                });
                // dispatch({ type: actionTypes.REMOVE_REMOTE_STREAM, payload: streams });
                // }
                // console.log("peer close for => ", resStreamId);
            }
        });
    });



    socket.on("user-muted", ({ userId, streamId }) => {
        // connectToNewUser(userId, stream, dispatch);
        console.log("user-muted => ", userId, streamId);

        const streamsData = [...store.getState().videoReducer.streams];

        // const call = peerServer.call(userId, stream);

        // call.on('stream', (remoteVideoStream) => {
        //     if (remoteVideoStream) {
        // find user stream index for change
        const muteUserIndex = streamsData.findIndex(x => x.remoteVideoStream.id === streamId);
        console.log("toggleMuteVoice streamId index => ", muteUserIndex);

        // get mute status
        streamsData[muteUserIndex]?.remoteVideoStream?.getAudioTracks()?.forEach((track) => {
            track.enabled = false;
        });

        dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        //     }
        // });
    });


    // userId, joinedUserId, streamId
    socket.on("user-unmuted", ({ userId, streamId, joinedUserId }) => {
        // connectToNewUser(userId, stream, dispatch);
        console.log("user-muted => ", userId, streamId);

        const streamsData = [...store.getState().videoReducer.streams];

        // const call = peerServer.call(userId, stream);

        // call.on('stream', (remoteVideoStream) => {
        //     if (remoteVideoStream) {
        // find user stream index for change
        const muteUserIndex = streamsData.findIndex(x => x.remoteVideoStream.id === streamId);
        console.log("toggleMuteVoice streamId index => ", muteUserIndex);

        // get mute status
        streamsData[muteUserIndex]?.remoteVideoStream?.getAudioTracks()?.forEach((track) => {
            track.enabled = true;
        });

        dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        //     }
        // });
    });


    socket.on("user-video-muted", ({ userId, streamId, joinedUserId }) => {
        // connectToNewUser(userId, stream, dispatch);
        console.log("user-video-muted => ", userId, streamId);

        const streamsData = [...store.getState().videoReducer.streams];

        // const call = peerServer.call(userId, stream);

        // call.on('stream', (remoteVideoStream) => {
        //     if (remoteVideoStream) {
        // find user stream index for change
        const muteUserIndex = streamsData.findIndex(x => x.remoteVideoStream.id === streamId);
        console.log("toggleMuteVoice streamId index => ", muteUserIndex);

        // get mute status
        streamsData[muteUserIndex]?.remoteVideoStream?.getVideoTracks()?.forEach((track) => {
            track.enabled = false;
        });

        dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        //     }
        // });
    });


    socket.on("user-video-unmuted", ({ userId, streamId, joinedUserId }) => {
        // connectToNewUser(userId, stream, dispatch);
        console.log("user-video-unmuted => ", userId, streamId);

        const streamsData = [...store.getState().videoReducer.streams];

        // const call = peerServer.call(userId, stream);

        // call.on('stream', (remoteVideoStream) => {
        //     if (remoteVideoStream) {
        // find user stream index for change
        const muteUserIndex = streamsData.findIndex(x => x.remoteVideoStream.id === streamId);
        console.log("toggleMuteVoice streamId index => ", muteUserIndex);

        // get mute status
        streamsData[muteUserIndex]?.remoteVideoStream?.getVideoTracks()?.forEach((track) => {
            track.enabled = true;
        });

        dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        //     }
        // });
    });

    //! call to game sockets for easy understanding
    dispatch(_gameSession(stream, roomId, joinedUserId, isModerator));
}

const _gameSession = (stream, roomId, joinedUserId, isModerator) => (dispatch) => {
    // get socket data if moderator click on start any question
    socket.on("startQuestion", async (data) => {
        console.log("start question => socket => ", JSON.stringify(data));

        const payload = {
            status: true,
            ...data,
        };

        store.dispatch({ type: actionTypes.GAME_START_STATUS, payload });

        // FOR ASSIGNED USER
        store.dispatch({ type: actionTypes.GAME_ASSIGNED_USER, payload: data.userId });
    });

    // after another user done with question
    socket.on("resultQuestion", ({ questionIndex, roundIndex, resultStatus }) => {

        console.log("result question emit => ", questionIndex, roundIndex, resultStatus);

        const payload = { resultStatus };

        store.dispatch({ type: actionTypes.GAME_LAST_ANS_RESULT, payload });
    });

    //! compititive next room by moderator
    socket.on("nextQuestionModerator", () => {
        console.log("call next screen by moderator");
        store.dispatch({ type: actionTypes.GAME_MODERATOR_NEXT_ROOM_COMP, payload: true });
    });
}


// when moderator click on start button
export const _startRoundModerator = ({ roomID }) => async (dispatch) => {
    try {
        const {
            questionIndex, roundIndex, clientUsers,
            currentAssignedUser
        } = store.getState().videoReducer;

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

        socket.emit('startRound', ({ roomID, gameInfo }));

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

// send result from answer by user
export const _resultSendSocket = ({ roomID, resultStatus }) => (dispatch) => {
    try {
        const { questionIndex, roundIndex, clientUsers } = store.getState().videoReducer;

        const resultInfo = {
            questionIndex,
            roundIndex,
            resultStatus,
        };

        socket.emit('submitQuestion', ({ roomID, resultInfo }));

        dispatch({ type: "actionTypes.MY_STREAM", payload: "roundId" });
    } catch (error) {
        console.log("error is => ", error);
    }
}

// for moderator accept the user request
export const _moderatorAcceptRequest = ({ roomID, socketId, status, isClosed }) => dispatch => {
    try {
        console.log("join-room :: ", { roomID, status, isClosed });
        if (!isClosed) {
            socket.emit('join-room-response-from-moderator', ({ roomID, socketId, status }));
        }

        const payload = {
            socketId,
        };

        dispatch({ type: actionTypes.VIDEO_CLIENT_REQ_DONE, payload });

        // if (status) {
        //     const payload = {
        //         userId,
        //     };

        //     dispatch({ type: "--empty dispatch--", payload });
        // }

    } catch (error) {
        console.log("error is => ", error);
    }
}

export const _moderatorChangeQualify = ({ userId, qualify, roomId }) => dispatch => {
    console.log("moderator disqualify user => ", userId, qualify, roomId);
    // joinedUserId, qualify ,roomId
    socket.emit('Disqualify', { joinedUserId: userId, qualify, roomId });


    // update stream data to redux
    let streams = [...store.getState().videoReducer.streams];
    console.log("disqualify streams => ", streams);

    streams.forEach(strm => {
        console.log("disqualify streams => get one stream :: id :: ", strm?.userData?._id);

        if (strm?.userData?._id === userId) {
            strm.qualify = qualify;
        }
    });

    console.log("disqualify streams => get new streams :: ", streams, qualify);

    dispatch({ type: actionTypes.UPDATE_REMOTE_STREAM, payload: streams });
}


//! moderator move next [temp]
export const _moderatorMoveNext = ({ roomID }) => (dispatch) => {
    try {
        socket.emit('nextQuestionComp', ({ roomID }));

        dispatch({ type: actionTypes.GAME_MODERATOR_NEXT_ROOM_COMP, payload: true });
    } catch (error) {
        console.log("error is => ", error);
    }
}

export const leaveRoom = (roomId, isModerator) => (dispatch) => {
    console.log("leaving room for => 0 ");

    try {
        const streamUserId = store.getState().videoReducer.videoUserId;
        const myStream = store.getState().videoReducer.myStream;
        const otherStreams = store.getState().videoReducer.streams;

        console.log("leaving room for => 1 ");

        console.log("leaving room for => 1 .. ", streamUserId, myStream);

        if (streamUserId && myStream) {
            console.log("leaving room for => ", streamUserId, roomId, myStream.id, isModerator);
            console.log("leaving room for => other stream => ", otherStreams);
            // setTimeout(() => {
            socket.emit('leave-room', { userId: streamUserId, roomId, streamId: myStream.id, isModerator });
            myStream.getTracks().forEach(track => track.stop());
            // myStream.getTracks().forEach(t => t.stop());
            myStream.release();

            for (const { remoteVideoStream: stream } of otherStreams) {
                stream.getTracks().forEach(track => track.stop());
                stream.release();
            }

            dispatch({ type: actionTypes.MY_STREAM, payload: null });
            // peerServer.close();
            // }, 2000);
            dispatch({ type: actionTypes.FLUSH_USERS_LIST });

            console.log("leaving room for => END ");
        }
    } catch (error) {
        console.log("leaving room for => error :: ", error);
    }
}

export const toggleMuteVoice = (streamId) => (dispatch) => {
    try {
        // clone main data
        const streamsData = [...store.getState().videoReducer.streams];

        console.log("toggleMuteVoice => ", streamsData);
        console.log("toggleMuteVoice streamId => ", streamId);

        // find user stream index for change
        const muteUserIndex = streamsData.findIndex(x => x.id === streamId);
        console.log("toggleMuteVoice streamId index => ", muteUserIndex);

        // get mute status
        streamsData[muteUserIndex]?.getAudioTracks()?.forEach((track) => {
            track.enabled = !track.enabled;
        });

        dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
    } catch (error) {
        console.log("toggleMuteVoice error => ", error);
    }
}


export const userMuteVoice = (roomId) => async (dispatch) => {
    try {
        // clone main data
        const userId = store.getState().videoReducer.videoUserId;
        const myStream = store.getState().videoReducer.myStream;

        // get user id
        const joinedUserId = await AsyncStorage.getItem('userid');

        console.log("mute user params", userId, roomId, myStream.id, joinedUserId);

        // roomId, userId, joinedUserId, streamId
        socket.emit("mute-user", ({ userId, roomId, streamId: myStream.id, joinedUserId }));

        myStream?.getAudioTracks()?.forEach((track) => {
            track.enabled = false;
        });

        dispatch({ type: actionTypes.MY_STREAM, payload: myStream });

        console.log("mute user END");

        // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
    } catch (error) {
        console.log("toggleMuteVoice error => ", error);
    }
}

export const userUnMuteVoice = (roomId) => async (dispatch) => {
    try {
        // clone main data
        const userId = store.getState().videoReducer.videoUserId;
        const myStream = store.getState().videoReducer.myStream;

        // get user id
        const joinedUserId = await AsyncStorage.getItem('userid');

        // roomId, userId, joinedUserId, streamId
        socket.emit("unmute-user", ({ userId, roomId, streamId: myStream.id, joinedUserId }));

        myStream?.getAudioTracks()?.forEach((track) => {
            track.enabled = true;
        });

        dispatch({ type: actionTypes.MY_STREAM, payload: myStream });

        console.log("mute user not mute END");
        // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
    } catch (error) {
        console.log("toggleMuteVoice error => ", error);
    }
}

export const userVideoMuteVoice = (roomId) => async (dispatch) => {
    try {
        // clone main data
        const userId = store.getState().videoReducer.videoUserId;
        const myStream = store.getState().videoReducer.myStream;

        // get user id
        const joinedUserId = await AsyncStorage.getItem('userid');

        socket.emit("mute-video-user", ({ userId, roomId, streamId: myStream.id, joinedUserId }));

        myStream?.getVideoTracks()?.forEach((track) => {
            track.enabled = false;
        });

        dispatch({ type: actionTypes.MY_STREAM, payload: myStream });
        // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
    } catch (error) {
        console.log("toggleMuteVoice error => ", error);
    }
}


export const userVideoUnMuteVoice = (roomId) => async (dispatch) => {
    try {
        // clone main data
        const userId = store.getState().videoReducer.videoUserId;
        const myStream = store.getState().videoReducer.myStream;

        // get user id
        const joinedUserId = await AsyncStorage.getItem('userid');

        socket.emit("unmute-video-user", ({ userId, roomId, streamId: myStream.id, joinedUserId }));

        myStream?.getVideoTracks()?.forEach((track) => {
            track.enabled = true;
        });

        dispatch({ type: actionTypes.MY_STREAM, payload: myStream });
        // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
    } catch (error) {
        console.log("toggleMuteVoice error => ", error);
    }
}

export const _flushVideoStoreData = () => dispatch => {
    if (socket) {
        // socket.disconnect();
        socket = undefined;
    }
    // socket.disconnect();
    dispatch({ type: actionTypes.FLUSH_DATA });
}

