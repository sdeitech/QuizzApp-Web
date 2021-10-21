import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import styled from "styled-components";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";
import {
    CModal,
    CModalBody,
} from '@coreui/react';

const StyledVideo = styled.video`
height: auto;
width: 100%;
`;

const Container = styled.div`
padding: 20px;
display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 90vh;
    position: relative;
    width: 50%;
    margin: 0;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    float: left;
}
`;

let peerServer;

let peers = {};


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = props => {
    const history = useHistory();
    
    // const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const currentStream = useRef();
    const userVideoPeerId = useRef();
    const userVideoStream = useRef();
    const userVideo = useRef();
    const otherStreamRef = useRef([]);
    
    const [otherStreams, setotherStreams] = useState([]);
    otherStreamRef.current = otherStreams;
    const [videoStream, setvideoStream] = useState([]);

    const [isAudioMuted, setAudioMute] = useState(false);
    const [isVideoMuted, setVideoMuted] = useState(false);
    const [cameraOffStreamID, setcameraOffStreamID] = useState([]);
    const [muteStreamID, setmuteStreamID] = useState([]);
    const [forcerender, setforcerender] = useState(0);
    const [cName, setcName] = useState("video-person1");

    let roomUrl = window.location.href;
    const roomId = roomUrl.substring(roomUrl.lastIndexOf("?") + 1);
    // const roomId = "roomtestingsocket";
    const userId = JSON.parse(reactLocalStorage.get("userData")).userId;
    
    const [confirmationModel,setconfirmationModel]= useState(false);


    

    const Video = props => {
        const ref = useRef();
    
        useEffect(() => {
            ref.current.srcObject = props.item;
        }, []);
    
        return <video ref={ref} autoPlay="true" />;
    };
    const cameraOff = () =>{
        if(isVideoMuted){
            setVideoMuted(false);
            userVideoUnMuteVoice(); 
        }else{
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
            const userIdd = userVideoPeerId.current;
            const myStream = userVideoStream.current;
            socketRef.current.emit("mute-video-user", ({ userIdd, roomId, streamId: myStream.id }));

            if(myStream){
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
            const userIdd = userVideoPeerId.current;
            const myStream = userVideoStream.current;
            console.log(myStream,"myStream");
            socketRef.current.emit("unmute-video-user", ({ userIdd, roomId, streamId: myStream.id }));
            // var videoTrack = myStream.getVideoTracks();
            if(myStream){
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
            const userIdd = userVideoPeerId.current;
            const myStream = userVideoStream.current;
            socketRef.current.emit("mute-user", ({ userIdd, roomId, streamId: myStream.id }));
    
            if(myStream){
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

            const userIdd = userVideoPeerId.current;
            const myStream = userVideoStream.current;
            socketRef.current.emit("unmute-user", ({ userIdd, roomId, streamId: myStream.id }));
    
            if(myStream){
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


    const logout = () => {
        console.log("logout");
        console.log(roomId, userId);

        socketRef.current.emit("leave-room", { roomId, userId });
        history.push('/dashboard');
    };
    useEffect(() => {
        console.log("my room Id => ", roomId);
        if (!socketRef.current) {
            socketRef.current = io(`https://safe-badlands-06778.herokuapp.com`, {
                forceNew: true,
                transports: ["polling"]
            });
        }
        console.log(socketRef.current);
        // socketRef.current = io("http://localhost:8000");
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

                    peerServer.on("error", error =>
                        console.log("peer error => ", error)
                    );
                    userVideo.current.srcObject = stream;
                    userVideoStream.current = stream;
                    currentStream.current = stream;
                    console.log("USERID ::", userId, stream);

                    peerServer.on("open", peerUserId => {
                        userVideoPeerId.current = peerUserId;
                        console.log("open join room", roomId);
                        socketRef.current.emit("join-room", {
                            userId: peerUserId,
                            roomId
                        });
                    });

                    socketRef.current.on("user-connected", userId => {
                        // connectToNewUser(userId, stream, dispatch);
                        console.log("user connected => ", userId);

                        let resStreamId;

                        const call = peerServer.call(userId, stream);

                        call.on("stream", remoteVideoStream => {
                            if (remoteVideoStream) {
                                resStreamId = remoteVideoStream?.id;
                                setTimeout(() => {
                                    _addStream(remoteVideoStream);
                                    // dispatch({ type: actionTypes.ADD_STREAM, payload: remoteVideoStream });
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
                                let streams = [...otherStreams];
                                streams = streams.filter(
                                    x => x.id !== resStreamId
                                );
                                setotherStreams(streams);
                                console.log("otherStreams",otherStreams);
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
                                let streams = [...otherStreams];
                                streams = streams.filter(
                                    x => x.id !== resStreamId
                                );
                                setotherStreams(streams);
                                console.log("otherStreams",otherStreams);
                            }
                        });

                        peers[userId] = call;
                    });

                    // receive a call
                    peerServer.on("call", call => {
                        call.answer(stream);

                        let resStreamId;

                        // stream back the call
                        call.on("stream", resstream => {
                            resStreamId = resstream?.id;

                            _addStream(resstream);
                            // dispatch({ type: actionTypes.ADD_STREAM, payload: resstream });
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
                                let streams = [...otherStreams];
                                streams = streams.filter(
                                    x => x.id !== resStreamId
                                );
                                setotherStreams(streams);
                                console.log("otherStreams",otherStreams);
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
                                let streams = [...otherStreams];
                                streams = streams.filter(
                                    x => x.id !== resStreamId
                                );
                                setotherStreams(streams);
                                console.log("otherStreams",otherStreams);
                            }
                        });
                    });

                    socketRef.current.on(
                        "user-disconnected",
                        ({ userId, streamId }) => {
                            try {
                                let streams = [...otherStreams];
                                console.log("all removed streams => ", streams);
                                streams = streams.filter(
                                    x => x.id !== streamId
                                );
                                setotherStreams(streams);

                                if (peers[userId]) peers[userId].close();
                            } catch (error) {
                                console.log("disconnected error => ", error);
                            }
                        }
                    );

                    socketRef.current.on("user-muted",({ userId, streamId }) => {
                            console.log("user-muted => ", userId, streamId);
                            var arr = muteStreamID;
                            arr.push(streamId);
                            setmuteStreamID(arr);
                            setforcerender(forcerender+1);
                        });
                        
                        
                    socketRef.current.on("user-video-muted", ({ userId, streamId }) => {
                        console.log("user-video-muted => ", userId, streamId);
                        var arr = cameraOffStreamID;
                        arr.push(streamId);
                        setcameraOffStreamID(arr);
                        setforcerender(forcerender+1);
                    });


                    
                    socketRef.current.on("user-video-unmuted", ({ userId, streamId }) => {
                        console.log("user-video-unmuted => ", userId, streamId);
                        var streams = cameraOffStreamID;
                        streams.map(item => item !== streamId);
                        setcameraOffStreamID(streams);
                        setforcerender(forcerender+1);
                    });

                    socketRef.current.on("user-unmuted",({ userId, streamId }) => {
                            console.log("user-unmuted => ", userId, streamId);
                            var streams = muteStreamID;
                        streams.map(item => item !== streamId);
                        setmuteStreamID(streams);
                        setforcerender(forcerender+1);
                        });
                    
                });

            window.addEventListener("beforeunload", event => {
                // Cancel the event as stated by the standard.
                event.preventDefault();
                // Chrome requires returnValue to be set.
                event.returnValue = "";

                console.log("close page");
                const streamUserId = userVideoPeerId.current;
                const myStream = userVideoStream.current;

                console.log("leaving room for => ", streamUserId);
                socketRef.current.emit("leave-room", {
                    userId: streamUserId,
                    roomId,
                    streamId: myStream.id
                });
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

                console.log("close page");
                const streamUserId = userVideoPeerId.current;
                const myStream = userVideoStream.current;

                console.log("leaving room for => ", streamUserId);
                socketRef.current.emit("leave-room", {
                    userId: streamUserId,
                    roomId,
                    streamId: myStream.id
                });
            });
            console.log("close page");
            const streamUserId = userVideoPeerId.current;
            const myStream = userVideoStream.current;

            console.log("leaving room for => ", streamUserId);
            setTimeout(() => {
                socketRef.current.emit("leave-room", {
                    userId: streamUserId,
                    roomId,
                    streamId: myStream.id
                });

                if (myStream) {
                    myStream.getTracks().forEach(track => track.stop());
                }
            }, 2000);
        };
    }, []);

    const _addStream = stream => {
        const otherStreams = otherStreamRef.current;
        if (otherStreams.findIndex(x => x.id === stream.id) === -1) {
            setotherStreams(prev => [...prev, stream]);
        }
        console.log(otherStreams,"otherStreams");
    };

    console.log("my totle streams => ", otherStreams);

    return (
        <section className="video-main" style={{display:"block",width:props.width}}>
        <div class="video-wrapper">
            <div class="video-previe video-center">

                <div class={cName}>
                    <div class="video-inner-wrap video-center">
                        <video ref={userVideo} autoPlay="true" /> 
                    </div>
                </div>

                {otherStreams.map((item, index,array) => {
                let buttoncamera = false;
                let buttonmute = false;
                    for(let i=0;i < cameraOffStreamID.length;i++){
                        if(item.id === cameraOffStreamID[i]){
                            buttoncamera = true;
                            
                        }else{
                            buttoncamera = false;
                        }
                    }
                    for(let j=0; j < muteStreamID.length; j++){
                        if(item.id === muteStreamID[j]){
                            buttonmute =  true;
                        }else{
                            buttonmute =false;
                        }
                    }

                var length = array.length;
                if(length==0){
                    if(cName!="video-person1"){
                        setcName("video-person1");
                    }
                }else if(length==1){
                    if(cName!="video-person2"){
                        setcName("video-person2");
                    }
                }else if(length>=2){
                    if(cName!="video-person3"){
                        setcName("video-person3");
                    }
                }
                console.log("other streams => ", item);
                return (
                    <div class={cName}>
                        <div class="video-inner-wrap video-center">
                            <Video key={index.toString()} item={item} />
                            {
                                (buttonmute)?<a><img alt="" src="img/mute(1).png"/></a>:<a><img alt="" src="img/mic1.png"/></a>
                            }
                            {
                                (buttoncamera)?<a style={{right:"50px"}}><img alt="" src="img/camera-off(1).png"/></a>:<a style={{right:"50px"}}><img alt="" src="img/camera.png"/></a>
                            }
                        </div>
                    </div>
                );})}



                
            </div>            
        </div>
        <div className="video-bottom-bar" style={{width:props.width}}>
            <div className="video-wrapper video-center">
                <a  onClick={cameraOff} >
                    {
                        (isVideoMuted) ? 
                        <img alt="" src="img/camera-off.png"/> 
                        : <img alt="" src="img/camera.png"/>
                    }
                    </a>
                <a onClick={muteAudio} >
                    {
                        (isAudioMuted) ? 
                        <img alt="" src="img/mute.png"/>
                        : <img alt="" src="img/mic1.png"/>
                    }
                    </a>   
                <a  onClick={() => setconfirmationModel(true)}><img className="video-end" alt="" src="img/call-end.png"/></a>
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
                                    <button style={{ minWidth: '150px'}} className="blue_btn" type="button" onClick={() => setconfirmationModel(false)} >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CModalBody>
    </CModal>

    </section>

    



    );
};

export default Room;


