import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import $ from 'jquery';
import styled from "styled-components";
import { reactLocalStorage } from "reactjs-localstorage";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { joinRoomReqSend, setWaitScreen, setOtherUserStreams, RemoveOtherUserStreams, updateOthetUserStream, setSocket, setMuteUnmute } from '../../actions/socketAction';
import {
    CModal,
    CModalBody,
} from '@coreui/react';
import socket from "socket.io-client/lib/socket";


let peerServer;

let peers = {};
let bgcolor = ["#25afff","#b525ff","#31a56a"];


// const videoConstraints = {
//     height: window.innerHeight / 2,
//     width: window.innerWidth / 2
// };

const videoConstraints = {
    width: { min: 22 },
    height: { min: 33 }
}

const Room = props => {
    const userId = JSON.parse(reactLocalStorage.get("userData")).userId;
    const username = JSON.parse(reactLocalStorage.get("userData")).name;
    const profilePic = JSON.parse(reactLocalStorage.get("userData")).profilePic;
    const history = useHistory();
    const dispatch = useDispatch();
    const joinroomreq = useSelector((state) => state.socketReducers.joinRoomReq);
    const isModerator = useSelector((state) => state.socketReducers.isModerator);
    const roomCreatorId = useSelector((state) => state.socketReducers.roomCreatorId);
    const joinRoomReq = useSelector((state) => state.socketReducers.joinRoomReq);
    const otherUserSteams = useSelector((state) => state.socketReducers.otherUserSteams);
    const roomId = useSelector((state) => state.socketReducers.roomId);
    let string = "kevin";
    // let moderator = false;
    // if(roomCreatorId==userId){
    //     moderator = true;
    // }
    // const isModerator = !joinRoomReq;

    // const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const currentStream = useRef();
    const userVideoPeerId = useRef();
    const userVideoStream = useRef();
    const userVideo = useRef();
    const otherStreamRef = useRef([]);
    const myRef = useRef([]);
    socketRef.current = useSelector((state) => state.socketReducers.socket);
    const [otherStreams, setotherStreams] = useState([]);
    const [otherUser, setotherUser] = useState([]);
    otherStreamRef.current = otherUserSteams;
    const [videoStream, setvideoStream] = useState([]);

    const [isAudioMuted, setAudioMute] = useState(false);
    const [isVideoMuted, setVideoMuted] = useState(false);
    const [cameraOffStreamID, setcameraOffStreamID] = useState([]);
    const [muteStreamID, setmuteStreamID] = useState([]);
    const [forcerender, setforcerender] = useState(0);
    const [joinuser, setjoinuser] = useState([]);

    // const roomId = props.roomId; 

    const [confirmationModel, setconfirmationModel] = useState(false);
    const [requestModel, setrequestModel] = useState(false);
    const [moderatorLeave, setmoderatorLeave] = useState(false);
    const [openModelForMembers, setopenModelForMembers] = useState(false);
    const [requestSender, setrequestSender] = useState("");
    const [reqSenderSocketId, setreqSenderSocketId] = useState();

    // socketRef.current = props.socket;


    const Video = props => {
        const ref = useRef();

        useEffect(() => {
            ref.current.srcObject = props.item;
        }, []);

        return <video ref={ref} autoPlay="true" />;
    };
    const cameraOff = () => {
        if (isVideoMuted) {
            setVideoMuted(false);
            userVideoUnMuteVoice();
        } else {
            setVideoMuted(true);
            userVideoMuteVoice();
        }
    }

    const muteAudio = () => {

        if (isAudioMuted) {
            setAudioMute(false);
            userUnMuteVoice();
        } else {
            setAudioMute(true);
            userMuteVoice();
        }
    };


    const userVideoMuteVoice = () => {
        try {
            const joinedUserId = userId;
            const myStream = userVideoStream.current;
            socketRef.current.emit("mute-video-user", ({ roomId, userId: userVideoPeerId.current, joinedUserId, streamId: myStream.id }));

            if (myStream) {
                myStream.getVideoTracks().forEach((track) => {
                    track.enabled = false;
                });
            }
            console.log("camera off");

            // dispatch({ type: actionTypes.MY_STREAM, payload: myStream });
            // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        } catch (error) {
            console.log("toggleMuteVoice error => ", error);
        }
    }

    const userVideoUnMuteVoice = () => {
        try {
            // clone main data
            const joinedUserId = userId;
            const myStream = userVideoStream.current;
            console.log(myStream, "myStream");
            socketRef.current.emit("unmute-video-user", ({ joinedUserId, userId: userVideoPeerId.current, roomId, streamId: myStream.id }));
            // var videoTrack = myStream.getVideoTracks();
            if (myStream) {
                myStream.getVideoTracks().forEach((track) => {
                    track.enabled = true;
                });
            }
            console.log("camera on");
            // dispatch({ type: actionTypes.MY_STREAM, payload: myStream });
            // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        } catch (error) {
            console.log("toggleMuteVoice error => ", error);
        }
    }


    const userMuteVoice = () => {
        try {
            // clone main data
            const joinedUserId = userId;
            const myStream = userVideoStream.current;
            socketRef.current.emit("mute-user", ({ joinedUserId, userId: userVideoPeerId.current, roomId, streamId: myStream.id }));

            if (myStream) {
                myStream.getAudioTracks().forEach((track) => {
                    track.enabled = false;
                });
            }
            console.log("audio muted");

            // dispatch({ type: actionTypes.MY_STREAM, payload: myStream });
            // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        } catch (error) {
            console.log("toggleMuteVoice error => ", error);
        }
    }

    const userUnMuteVoice = () => {
        try {
            // clone main data
            const joinedUserId = userId;
            const myStream = userVideoStream.current;
            socketRef.current.emit("unmute-user", ({ joinedUserId, userId: userVideoPeerId.current, roomId, streamId: myStream.id }));

            if (myStream) {
                myStream.getAudioTracks().forEach((track) => {
                    track.enabled = true;
                });
            }

            console.log("audio unmuted");

            // dispatch({ type: actionTypes.MY_STREAM, payload: myStream });
            // dispatch({ type: actionTypes.TOGGLE_MUTE_USER, payload: streamsData });
        } catch (error) {
            console.log("toggleMuteVoice error => ", error);
        }
    }

    const moderatorResponse = (status) => {
        socketRef.current.emit("join-room-response-from-moderator", {
            roomID: roomId, socketId: reqSenderSocketId, status
        });
        setrequestSender("");
        setrequestModel(false);
        setreqSenderSocketId("");
        console.log("response send is ", status);

    }

    const logout = () => {
        console.log("logout");
        otherStreamRef.current = [];
        setjoinuser([]);
        history.push('/dashboard', { state: null });
    };

    const handleDisqualify = (joinedUserId, qualify) => {
        let data = {
            joinedUserId,
            field: "qualify",
            value: qualify
        }
        dispatch(setMuteUnmute(data));
        console.log("moderator Disqualify", joinedUserId, qualify, roomId);
        socketRef.current.emit("Disqualify", { joinedUserId, qualify, roomId });
    }


    useEffect(() => {
        console.log("isModerator", isModerator)
        if (isModerator) {
            socketRef.current.on("user-request-moderator", ({ userdata, socketId }) => {
                setrequestSender(userdata.name);
                setrequestModel(true);
                setreqSenderSocketId(socketId);
                console.log("reqest from ", userdata.name);
            });
        }
        //////moderator reponse from server;

        socketRef.current.on("req-response-from-server", status => {
            console.log("req response..........................")
            if (status) {
                const myStream = userVideoStream.current;
                socketRef.current.emit("join-room", {
                    userId: userVideoPeerId.current,
                    roomId,
                    stream: myStream,
                    joinedUserId: userId,
                    isModerator: isModerator,
                });
                dispatch(setWaitScreen(false));
                dispatch(joinRoomReqSend(false));
            } else {
                console.log("request decline");
                toast.error("request decline");
                setTimeout(() => {
                    history.push('/dashboard');
                }, 3000)
            }
        });
        try {
            navigator.mediaDevices
                .getUserMedia({ video: videoConstraints, audio: true })
                .then(stream => {
                    peerServer = new Peer(undefined, {
                        secure: false,
                        config: {
                            iceServers: [
                                {
                                    urls: [
                                        "stun:stun1.l.google.com:19302",
                                        "stun:stun2.l.google.com:19302"
                                    ]
                                }
                            ]
                        }
                    });

                    if (peerServer) {
                        console.log("peer connection => ", peerServer);

                        peerServer.on("connection", data => {
                            console.log("peer connect with data => ", data);
                        });

                        peerServer.on("disconnected", data => {
                            console.log("peer disconnect with data => ", data);
                        });
                    }

                    peerServer.on("error", (error) => console.log("peer error => ", error));

                    userVideo.current.srcObject = stream;
                    userVideoStream.current = stream;
                    currentStream.current = stream;
                    console.log("USERID ::", userId, stream);


                    ///send join room request
                    if (joinroomreq) {
                        socketRef.current.emit("join-room-req", { roomId: roomId, joinedUserId: userId })
                        console.log("join room request send ", roomId, userId);
                        dispatch(joinRoomReqSend(false));
                    }


                    peerServer.on("open", peerUserId => {
                        userVideoPeerId.current = peerUserId;
                        const myStream = userVideoStream.current;

                        if (isModerator) {
                            console.log("open join room", roomId);
                            socketRef.current.emit("join-room", {
                                userId: peerUserId,
                                roomId,
                                stream: myStream,
                                joinedUserId: userId,
                                isModerator: isModerator,
                            });
                        }
                    });



                    ////user disQualifiy by moderator

                    socketRef.current.on("user-Disqualify", ({ joinedUserId, qualify }) => {
                        console.log(joinedUserId, qualify, "user-Disqualify")
                        let data = {
                            joinedUserId,
                            field: "qualify",
                            value: qualify
                        }
                        dispatch(setMuteUnmute(data));
                    })


                    socketRef.current.on("user-connected", ({ userId, joinedUserId, userData, qualify, Video, Audio }) => {
                        try {
                            console.log("user connected => ", userId);

                            let resStreamId;

                            const call = peerServer.call(userId, stream);

                            call.on("stream", (remoteVideoStream) => {
                                if (remoteVideoStream) {
                                    resStreamId = remoteVideoStream?.id;
                                    setTimeout(() => {
                                        console.log(remoteVideoStream, "line 344");
                                        let data = {
                                            stream: remoteVideoStream,
                                            joinedUserId,
                                            userData,
                                            qualify,
                                            Video,
                                            Audio
                                        }
                                        dispatch(setOtherUserStreams(data));
                                    }, 400);
                                }
                            });

                            call.on("close", () => {
                                console.log(
                                    "peer close for this id => outside => "
                                );
                                if (resStreamId) {
                                    console.log(
                                        "peer close for this id => inside => ",
                                        resStreamId
                                    );

                                    dispatch(RemoveOtherUserStreams(resStreamId));
                                }
                            });

                            call.on("error", () => {
                                console.log(
                                    "peer error for this id => outside => "
                                );
                                if (resStreamId) {
                                    console.log(
                                        "peer error for this id => inside => ",
                                        resStreamId
                                    );
                                    dispatch(RemoveOtherUserStreams(resStreamId));
                                }
                            });

                            peers[userId] = call;
                        } catch (error) {
                            console.log("user-connected error", error);
                        }
                    });


                    socketRef.current.on("previous-users", (users) => {
                        // connectToNewUser(userId, stream, dispatch);
                        console.log("user connected prev users => from server :: ", users);

                        if (users) {
                            users.forEach(user => {
                                const userId = user.userId;
                                const joinedUserId = user.userData._id;
                                const userData = user.userData;
                                const qualify = user.qualify;
                                const Video = user.Video;
                                const Audio = user.Audio;

                                const call = peerServer.call(userId, stream);

                                console.log("user connected prev users => ", userId);

                                call.on('stream', (remoteVideoStream) => {
                                    console.log("user connected prev users => :: ", remoteVideoStream);

                                    let data = {
                                        stream: remoteVideoStream,
                                        joinedUserId,
                                        userData,
                                        qualify,
                                        Video,
                                        Audio
                                    }
                                    dispatch(setOtherUserStreams(data));
                                });
                            });
                        }
                    });


                    // receive a call
                    peerServer.on("call", call => {
                        call.answer(stream);

                        let resStreamId;

                        // stream back the call
                        call.on("stream", resstream => {
                            if (resstream) {
                                resStreamId = resstream.id;
                                console.log(resstream, "line 419");
                            }
                        });

                        call.on("close", () => {
                            console.log(
                                "peer close for this id => outside => "
                            );
                            if (resStreamId) {
                                console.log("peer close for this id => inside => ", resStreamId);
                                dispatch(RemoveOtherUserStreams(resStreamId));
                            }
                        });

                        call.on("error", () => {
                            console.log(
                                "peer error for this id => outside => "
                            );
                            if (resStreamId) {
                                console.log("peer error for this id => inside => ", resStreamId);
                                dispatch(RemoveOtherUserStreams(resStreamId));
                            }
                        });
                    });

                    socketRef.current.on("user-disconnected", ({ userId, streamId, isModerator, username }) => {
                        try {
                            if (isModerator) {
                                console.log("Moderator disconnected");
                                setmoderatorLeave(true);
                            } else {
                                console.log("user disconnected", username);
                                toast.error(`${username} left from room`);
                            }

                            let streams = otherUserSteams;
                            console.log("all removed streams => ", streams);

                            const removedStream = streams.find(x => x.stream.id == streamId);

                            if (removedStream) {
                                removedStream.getTracks().forEach(track => track.stop());
                                removedStream.release();
                            }

                            dispatch(RemoveOtherUserStreams(streamId));

                            if (peers[userId]) { peers[userId].close(); }
                        } catch (error) {
                            console.log("disconnected error => ", error);
                        }
                    }
                    );

                    socketRef.current.on("user-muted", ({ userId, joinedUserId, streamId }) => {
                        let data = {
                            joinedUserId,
                            field: "Audio",
                            value: false
                        }

                        console.log("user-muted>>>>>>>>>", data);
                        dispatch(setMuteUnmute(data));
                    });

                    socketRef.current.on("user-unmuted", ({ userId, joinedUserId, streamId }) => {

                        let data = {
                            joinedUserId,
                            field: "Audio",
                            value: true
                        }
                        console.log("user-unmuted>>>>>>>>>", data);
                        dispatch(setMuteUnmute(data));
                    });

                    socketRef.current.on("user-video-muted", ({ userId, joinedUserId, streamId }) => {
                        console.log("user-video-muted => ", joinedUserId, streamId);

                        let data = {
                            joinedUserId,
                            field: "Video",
                            value: false
                        }
                        console.log("user-video-muted>>>>>>>>>", data);
                        dispatch(setMuteUnmute(data));
                    });



                    socketRef.current.on("user-video-unmuted", ({ userId, joinedUserId, streamId }) => {
                        let data = {
                            joinedUserId,
                            field: "Video",
                            value: true
                        }
                        console.log("user-video-unmuted>>>>>>>>>", data);
                        dispatch(setMuteUnmute(data));
                    });


                });


            window.addEventListener('popstate', function (event) {
                window.history.pushState(null, document.title, window.location.href);
            });

            window.addEventListener("beforeunload", event => {
                // Cancel the event as stated by the standard.
                event.preventDefault();
                console.log(event)
                // Chrome requires returnValue to be set.
                event.returnValue = "";

                console.log("close page LISTENER");
                // const streamUserId = userVideoPeerId.current;
                // const myStream = userVideoStream.current;

                // console.log("leaving room for => ", streamUserId);
                // socketRef.current.emit("leave-room", {
                //     userId: streamUserId,
                //     roomId,
                //     streamId: myStream.id,
                //     isModerator: isModerator,
                // });
            });
        } catch (error) {
            console.log(error);
        }
        return () => {
            window.removeEventListener("beforeunload", event => {
                // Cancel the event as stated by the standard.
                event.preventDefault();
                // Chrome requires returnValue to be set.
                event.returnValue = "";

                console.log("close page  REMOVELISTENER");
                const streamUserId = userVideoPeerId.current;
                const myStream = userVideoStream.current;

                console.log("leaving room for => ", streamUserId);
                socketRef.current.emit("leave-room", {
                    userId: streamUserId,
                    roomId,
                    streamId: myStream.id,
                    isModerator: isModerator,
                });
                if (myStream) {
                    myStream.getTracks().forEach(track => track.stop());
                }
                // socketRef.current.emit('end');
                setSocket("");
                otherStreamRef.current = [];
            });
            console.log("close page");
            const streamUserId = userVideoPeerId.current;
            const myStream = userVideoStream.current;

            console.log("leaving room for => ", streamUserId);
            setTimeout(() => {
                socketRef.current.emit("leave-room", {
                    userId: streamUserId,
                    roomId,
                    streamId: myStream.id,
                    isModerator: isModerator
                });
                // socketRef.current.emit('end');
                setSocket("");
                otherStreamRef.current = [];

                if (myStream) {
                    myStream.getTracks().forEach(track => track.stop());
                }
            }, 2000);
        };
    }, []);

    return (
        <>
            <section className="" id="video" style={{ width: props.width }}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    style={{ top: "80px" }}
                />
                <div className="">
                    <div class="video-wrapper">
                        <div class="video-previe video-center">

                            <div class={otherUserSteams.length == 0 ? "video-person1" : otherUserSteams.length == 1 ? "video-person2" : "video-person3"} style={{position: "relative"}}>
                                <div class="video-inner-wrap video-center circle-body" style={{position: "relative"}}>
                                    <video ref={userVideo} muted="true" autoPlay="true" /> 
                                </div>
                                {
                                                isVideoMuted ?
                                                <div class="video-inner-wrap video-center circle-body inline" style={{position: "absolute",width: `${otherUserSteams.length == 0 ?"96%":"92%"}`}}>
                                                   { profilePic?
                                                <img className="profile11" src={profilePic}></img>
                                                
                                                :
                                                <>
                                                <img className="profile11" src={`https://ui-avatars.com/api/?name=${username}&background=random`} ></img>
                                                    {/* <div class="circle" style={{backgroundColor: `${bgcolor[Math.floor(Math.random() * bgcolor.length)]}`}}>
                                                        
                                                        <span class="initials">{username.charAt(0).toUpperCase()}</span> */}
                                                    {/* </div> */}
                                                     </>}
                                                    </div>: null
                                            }
                            </div>


                            {otherUserSteams.map((item, index, array) => {
                                return (
                                    <div class={otherUserSteams.length == 0 ? "video-person1" : otherUserSteams.length == 1 ? "video-person2" : "video-person3"} style={{position: "relative"}}>
                                        <div class={item.Video ? "video-inner-wrap video-center" : "video-inner-wrap video-center circle-body"} style={{position: "relative"}}>
                                            <Video key={index.toString()} item={item.stream} /> 
                                            {
                                                item.Video ?null:
                                                <div class="video-inner-wrap video-center circle-body inline" style={{position: "absolute",width:"92"}}>
                                                        <img className="profile11" src={item.userData.image}></img>
                                                        {/* :
                                                        <img className="profile11" src={`https://ui-avatars.com/api/?name=${item.userData.name}&background=random`} ></img>
                                                    // <div class="circle" style={{backgroundColor: `${bgcolor[Math.floor(Math.random() * bgcolor.length)]}`}}>
                                                    //     <span class="initials">{item.userData.name.charAt(0).toUpperCase()}</span>
                                                    // </div> 
                                                    } */}
                                                    </div>
                                            }
                                            <a><img alt="" src={(item.Audio) ? "img/mic1.png" : "img/mute(1).png"} /></a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="video-bottom-bar" style={{ width: props.width }}>
                        <div className="video-wrapper video-center">
                            <a onClick={cameraOff} >
                                <img alt="" src={(isVideoMuted) ? "img/camera-off(1).png" : "img/camera.png"} />
                            </a>
                            <a onClick={muteAudio} >
                                <img alt="" src={(isAudioMuted) ? "img/mute(1).png" : "img/mic1.png"} />
                            </a>
                            <a onClick={() => setopenModelForMembers(true)} ><img alt="" src="img/group.png" /></a>
                            <a onClick={() => setconfirmationModel(true)}><img className="video-end" alt="" src="img/call-end.png" /></a>
                        </div>
                    </div>
                </div>




                <CModal show={confirmationModel} closeOnBackdrop={false} onClose={() => setconfirmationModel(false)}
                    color="danger"
                    centered>
                    <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close" onClick={() => setconfirmationModel(false)}>
                                    <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <img src='./murabbo/img/exit.png' alt="" />
                                        <h3>Exit</h3>
                                        <h4>Do you want to Exit?</h4>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg" />
                                    <img className="shape3" src="./murabbo/img/shape3.svg" />
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">

                                            <div style={{ textAlign: 'center', float: 'left', marginRight: '10px' }} className="">
                                                <button style={{ minWidth: '150px' }} className="pink_btn" type="button" onClick={logout} >Exit</button>
                                            </div>
                                            <div style={{ textAlign: 'center', float: 'left' }} className="">
                                                <button style={{ minWidth: '150px' }} className="blue_btn" type="button" onClick={() => setconfirmationModel(false)} >Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CModalBody>
                </CModal>






                <CModal show={requestModel} closeOnBackdrop={false} onClose={() => setrequestModel(false)}
                    color="danger"
                    centered>
                    <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close" onClick={() => setconfirmationModel(false)}>
                                    <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <img src='./murabbo/img/exit.png' alt="" />
                                        <h3>Join Request</h3>
                                        <h4>{requestSender} wants to join the Room</h4>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg" />
                                    <img className="shape3" src="./murabbo/img/shape3.svg" />
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">

                                            <div style={{ textAlign: 'center', float: 'left', marginRight: '10px' }} className="">
                                                <button style={{ minWidth: '150px' }} className="pink_btn" type="button" onClick={() => moderatorResponse(false)} >Decline</button>
                                            </div>
                                            <div style={{ textAlign: 'center', float: 'left' }} className="">
                                                <button style={{ minWidth: '150px' }} className="blue_btn" type="button" onClick={() => moderatorResponse(true)} >Accept</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CModalBody>
                </CModal>


                <CModal show={moderatorLeave} closeOnBackdrop={false} onClose={() => setrequestModel(false)}
                    color="danger"
                    centered>
                    <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <div className="model_data">
                                    <div className="model-title">
                                        <img src='./murabbo/img/exit.png' alt="" />
                                        <h3>Moderator has left the Room</h3>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg" />
                                    <img className="shape3" src="./murabbo/img/shape3.svg" />
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div style={{ textAlign: 'center' }} className="">
                                                <button style={{ minWidth: '150px' }} className="blue_btn" type="button" onClick={logout} >Exit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CModalBody>
                </CModal>

                <CModal show={openModelForMembers} closeOnBackdrop={true} onClose={() => setopenModelForMembers(false)}
                    color="danger"
                    centered>
                    <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">

                                <button type="button" className="close" onClick={() => setopenModelForMembers(false)}>
                                    <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <h3>Members</h3>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            {otherUserSteams.map(item => {
                                                return (
                                                    <div className="col-md-12">
                                                        <div class="_1st2-member two_no">
                                                            <div className="_1stimg">
                                                                <div className="memberImg_">
                                                                    <img style={{
                                                                        height: "50px",
                                                                        width: "50px",
                                                                        borderRadius: "50%"
                                                                    }} src={item.userData.image == "" ? "avatars/placeholder-user.png" : item.userData.image} />
                                                                </div>
                                                                <div className="member_details">
                                                                    <h5 style={{
                                                                        color: "#fff", marginBottom: "0 !important", position: "relative", top: "10px"
                                                                    }}>{item.userData.name}</h5>
                                                                </div>
                                                                <div className="icons-members" style={{
                                                                    top: "18px !important"
                                                                }}>
                                                                    {
                                                                        isModerator ?
                                                                            item.qualify ?
                                                                                <a onClick={() => handleDisqualify(item.userData._id, false)}>
                                                                                    <img src="img/correct-green.png" width="26px" height="23px" alt="callRight" style={{ position: "relative", top: "5px" }} />
                                                                                </a>
                                                                                :
                                                                                <a onClick={() => handleDisqualify(item.userData._id, true)}>
                                                                                    <img src="img/close.png" width="26px" height="23px" style={{ position: "relative", top: "5px" }} />
                                                                                </a>
                                                                            :
                                                                            null
                                                                    }
                                                                    <img src={(item.Audio) ? "img/mic1.png" : "img/mute(1).png"} width="33px" alt="callMic" />
                                                                    <img src={(item.Video) ? "img/camera.png" : "img/camera-off(1).png"} width="33px" alt="ccallCam" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </CModalBody>
                </CModal>



            </section>
        </>


    );
};

export default Room;


