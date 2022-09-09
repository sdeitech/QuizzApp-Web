import actionTypes from './types';

import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';

import store from './../store';

// API url
// const API_URI = ` https://rtc.murabbo.com`;
// const API_URI = `http://socketherokutest.herokuapp.com`;
// const API_URI = `https://socketvideocalling.herokuapp.com`;
const API_URI = `https://safe-badlands-06778.herokuapp.com`;
// const API_URI = `https://9b1f-103-251-59-25.ngrok.io`;

// socket config
let socket;


if (!socket) {
    socket = IO(API_URI, { forceNew: true });
}

// if (socket) {
socket?.on('connect', () => {
    console.log('Connection');
});
// }

let peerServer;

let peers = {};

// socket?.emit("join_room", "hello main room join");

export const joinRoom = (stream, roomId) => (dispatch) => {
     

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

    // open connection for our server
    peerServer.on("open", (userId) => {
        console.log("open join room", roomId);
        socket.emit('join-room', { userId, roomId });
        dispatch({ type: actionTypes.ADD_VIDEO_USERID, payload: userId });
    });

    socket.on("user-connected", ({ userId, joinedUserId }) => {
        // connectToNewUser(userId, stream, dispatch);
        console.log("user connected => ", userId);

        let resStreamId;

        const call = peerServer.call(userId, stream);

        call.on('stream', (remoteVideoStream) => {
            console.log("out of the screen stream");
            if (remoteVideoStream) {
                console.log("out of the screen stream");
                resStreamId = remoteVideoStream?.id;
                // dispatch({ type: actionTypes.ADD_REMOTE_STREAM, payload: remoteVideoStream });

                // console.log("user connected new generated id for => from ", userId + " to " + remoteVideoStream.id);

                // const abcdObj = { ...remoteVideoStream, uniqueUserId: userId };

                // console.log("remoteVideoStream => ", JSON.stringify(remoteVideoStream));
                // console.log("remoteVideoStream => ", JSON.stringify(abcdObj));

                const remoteVideoData = {
                    remoteVideoStream,
                    joinedUserId
                };

                setTimeout(() => {
                    dispatch({ type: actionTypes.ADD_STREAM, payload: remoteVideoData });
                }, 400);
            }
        });

        call.on("close", () => {
            if (resStreamId) {
                let streams = [...store.getState().videoReducer.streams];

                // if (streams.findIndex(x => x.id !== remoteVideoStream.id) !== -1) {
                streams = streams.filter(x => x.id !== resStreamId);
                dispatch({ type: actionTypes.REMOVE_REMOTE_STREAM, payload: streams });
                // }
                console.log("peer close for => ", resStreamId);
            }
        });

        peers[userId] = call;
    });

    // socket.on("all-users", (userList) => {
    //     try {
    //         const streamUserId = store.getState().videoReducer.videoUserId;

    //         console.log("%call users pre => ", "margin-top: 20px", userList);

    //         userList = userList.filter(x => x !== streamUserId);

    //         console.log("all users post => ", userList);

    //         // let allUserStream = [];
    //         dispatch({ type: actionTypes.FLUSH_USERS_LIST });

    //         for (const userId of userList) {
    //             const call = peerServer.call(userId, stream);

    //             call.on('stream', (remoteVideoStream) => {
    //                 if (remoteVideoStream) {
    //                     // allUserStream = [...allUserStream, remoteVideoStream];

    //                     dispatch({ type: actionTypes.ADD_USERS_LIST, payload: remoteVideoStream });
    //                 } else {
    //                     console.log("stream error for remote => ", remoteVideoStream);
    //                 }
    //             });
    //         }
    //         // console.log("all users post stream user's ids => ", allUserStream);
    //     } catch (error) {
    //         console.log("all users error => ", error);
    //     }
    // });

    socket.on("user-disconnected", ({ userId, streamId }) => {
        try {
            console.log("user disconnected => from socket =>", streamId);

            // const call = peerServer.call(userId, stream);

            // call.on('stream', (remoteVideoStream) => {
            //     console.log("user disconnected new generated id for => from ", userId + " to " + remoteVideoStream.id);

            let streams = [...store.getState().videoReducer.streams];
            console.log("all removed streams => ", streams);

            const removedStream = streams.find(x => x.id === streamId);

            if (removedStream) {
                removedStream.getTracks().forEach(track => track.stop());
                removedStream.release();
            }

            streams = streams.filter(x => x.id !== streamId);
            dispatch({ type: actionTypes.REMOVE_REMOTE_STREAM, payload: streams });
            if (peers[userId]) peers[userId].close();
            // peerServer.disconnect(userId);
            // });


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

            resStreamId = resstream?.id;

            // console.log(new Date() + " resstream => ", resstream);

            // dispatch({ type: actionTypes.ADD_USERS_LIST, payload: resstream });
            // { stream: remoteVideoStream, uniqueUserId: userId }
            // const streamsData = [...store.getState().videoReducer.streams];
            // const myStream = store.getState().videoReducer.myStream;

            // resStreamId = resstream.id;

            // if ([...streamsData].findIndex(x => x.id !== resstream.id) == -1) {
            console.log("user connected => from call => ");
            dispatch({ type: actionTypes.ADD_STREAM, payload: resstream });
            // }
        });

        call.on("close", () => {
            if (resStreamId) {
                console.log("user disconnected => from peer =>", resStreamId);
                let streams = [...store.getState().videoReducer.streams];

                // if (streams.findIndex(x => x.id !== remoteVideoStream.id) !== -1) {
                streams = streams.filter(x => x.id !== resStreamId);
                dispatch({ type: actionTypes.REMOVE_REMOTE_STREAM, payload: streams });
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
        const muteUserIndex = streamsData.findIndex(x => x.id === streamId);
        console.log("toggleMuteVoice streamId index => ", muteUserIndex);

        // get mute status
        streamsData[muteUserIndex]?.getAudioTracks()?.forEach((track) => {
            track.enabled = false;
        });

        dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        //     }
        // });
    });


    socket.on("user-unmuted", ({ userId, streamId }) => {
        // connectToNewUser(userId, stream, dispatch);
        console.log("user-muted => ", userId, streamId);

        const streamsData = [...store.getState().videoReducer.streams];

        // const call = peerServer.call(userId, stream);

        // call.on('stream', (remoteVideoStream) => {
        //     if (remoteVideoStream) {
        // find user stream index for change
        const muteUserIndex = streamsData.findIndex(x => x.id === streamId);
        console.log("toggleMuteVoice streamId index => ", muteUserIndex);

        // get mute status
        streamsData[muteUserIndex]?.getAudioTracks()?.forEach((track) => {
            track.enabled = true;
        });

        dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        //     }
        // });
    });


    socket.on("user-video-muted", ({ userId, streamId }) => {
        // connectToNewUser(userId, stream, dispatch);
        console.log("user-video-muted => ", userId, streamId);

        const streamsData = [...store.getState().videoReducer.streams];

        // const call = peerServer.call(userId, stream);

        // call.on('stream', (remoteVideoStream) => {
        //     if (remoteVideoStream) {
        // find user stream index for change
        const muteUserIndex = streamsData.findIndex(x => x.id === streamId);
        console.log("toggleMuteVoice streamId index => ", muteUserIndex);

        // get mute status
        streamsData[muteUserIndex]?.getVideoTracks()?.forEach((track) => {
            track.enabled = false;
        });

        dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        //     }
        // });
    });


    socket.on("user-video-unmuted", ({ userId, streamId }) => {
        // connectToNewUser(userId, stream, dispatch);
        console.log("user-video-unmuted => ", userId, streamId);

        const streamsData = [...store.getState().videoReducer.streams];

        // const call = peerServer.call(userId, stream);

        // call.on('stream', (remoteVideoStream) => {
        //     if (remoteVideoStream) {
        // find user stream index for change
        const muteUserIndex = streamsData.findIndex(x => x.id === streamId);
        console.log("toggleMuteVoice streamId index => ", muteUserIndex);

        // get mute status
        streamsData[muteUserIndex]?.getVideoTracks()?.forEach((track) => {
            track.enabled = true;
        });

        dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        //     }
        // });
    });
}

export const leaveRoom = (roomId) => (dispatch) => {
    const streamUserId = store.getState().videoReducer.videoUserId;
    const myStream = store.getState().videoReducer.myStream;
    const otherStreams = store.getState().videoReducer.streams;

    if (streamUserId && myStream) {
        console.log("leaving room for => ", streamUserId);
        // setTimeout(() => {
        socket.emit('leave-room', { userId: streamUserId, roomId, streamId: myStream.id });
        myStream.getTracks().forEach(track => track.stop());
        // myStream.getTracks().forEach(t => t.stop());
        myStream.release();

        for (const stream of otherStreams) {
            stream.getTracks().forEach(track => track.stop());
            stream.release();
        }

        dispatch({ type: actionTypes.MY_STREAM, payload: null });
        // peerServer.close();
        // }, 2000);
        dispatch({ type: actionTypes.FLUSH_USERS_LIST });
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


export const userMuteVoice = (roomId) => (dispatch) => {
    try {
        // clone main data
        const userId = store.getState().videoReducer.videoUserId;
        const myStream = store.getState().videoReducer.myStream;
        socket.emit("mute-user", ({ userId, roomId, streamId: myStream.id }));

        myStream?.getAudioTracks()?.forEach((track) => {
            track.enabled = false;
        });

        dispatch({ type: actionTypes.MY_STREAM, payload: myStream });
        // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
    } catch (error) {
        console.log("toggleMuteVoice error => ", error);
    }
}

export const userUnMuteVoice = (roomId) => (dispatch) => {
    try {
        // clone main data
        const userId = store.getState().videoReducer.videoUserId;
        const myStream = store.getState().videoReducer.myStream;
        socket.emit("unmute-user", ({ userId, roomId, streamId: myStream.id }));

        myStream?.getAudioTracks()?.forEach((track) => {
            track.enabled = true;
        });

        dispatch({ type: actionTypes.MY_STREAM, payload: myStream });
        // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
    } catch (error) {
        console.log("toggleMuteVoice error => ", error);
    }
}

export const userVideoMuteVoice = (roomId) => (dispatch) => {
    try {
        // clone main data
        const userId = store.getState().videoReducer.videoUserId;
        const myStream = store.getState().videoReducer.myStream;
        socket.emit("mute-video-user", ({ userId, roomId, streamId: myStream.id }));

        myStream?.getVideoTracks()?.forEach((track) => {
            track.enabled = false;
        });

        dispatch({ type: actionTypes.MY_STREAM, payload: myStream });
        // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
    } catch (error) {
        console.log("toggleMuteVoice error => ", error);
    }
}


export const userVideoUnMuteVoice = (roomId) => (dispatch) => {
    try {
        // clone main data
        const userId = store.getState().videoReducer.videoUserId;
        const myStream = store.getState().videoReducer.myStream;
        socket.emit("unmute-video-user", ({ userId, roomId, streamId: myStream.id }));

        myStream?.getVideoTracks()?.forEach((track) => {
            track.enabled = true;
        });

        dispatch({ type: actionTypes.MY_STREAM, payload: myStream });
        // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
    } catch (error) {
        console.log("toggleMuteVoice error => ", error);
    }
}

