import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import styled from "styled-components";
import { reactLocalStorage } from "reactjs-localstorage";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

let peerServer;

let peers = {};

const Video = props => {
    const ref = useRef();

    useEffect(() => {
        ref.current.srcObject = props.item;
    }, []);

    return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = props => {
    // const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const currentStream = useRef();
    const userVideoPeerId = useRef();
    const userVideoStream = useRef();
    const userVideo = useRef();
    const otherStreamRef = useRef([]);

    const [otherStreams, setotherStreams] = useState([]);
    otherStreamRef.current = otherStreams;

    const [isAudioMuted, setAudioMute] = useState(false);
    let roomUrl = window.location.href;
    const roomId = roomUrl.substring(roomUrl.lastIndexOf("/") + 1);
    // const roomId = "roomtestingsocket";
    const userId = JSON.parse(reactLocalStorage.get("userData")).userId;
    const muteAudio = () => {
        if (isAudioMuted) {
            setAudioMute(false);
            console.log("Enable audio");
            // console.log(socketRef.current.unmuteAudio());
            // localStream.unmuteAudio();
        } else {
            setAudioMute(true);
            console.log("Disable audio");
            // console.log(socketRef.current.muteAudio());
            // localStream.muteAudio();
        }
    };

    const logout = () => {
        console.log("logout");
        console.log(roomId, userId);

        socketRef.current.emit("leave-room", { roomId, userId });
        console.log(currentStream.current.getTracks());
        currentStream.current.getTracks().forEach(track => track.stop());
        // connectionRef.current.destroy()
    };
    useEffect(() => {
        console.log("my room Id => ", roomId);
        if (!socketRef.current) {
            socketRef.current = io("https://socketherokutest.herokuapp.com", {
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
    };

    console.log("my totle streams => ", otherStreams);

    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            <button
                style={{ width: "100px", height: "35px" }}
                onClick={muteAudio}
            >
                {isAudioMuted === true ? "Unmute" : "Mute"}
            </button>
            <button style={{ width: "100px", height: "35px" }} onClick={logout}>
                Logout
            </button>
            {otherStreams.map((item, index) => {
                console.log("other streams => ", item);
                return <Video key={index.toString()} item={item} />;
            })}
        </Container>
    );
};

export default Room;
