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

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        });
    }, []);

    return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
};

const Room = (props) => {
    // const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const currentStream = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
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
        console.log( roomId, userId );

        socketRef.current.emit("leave-room", { roomId, userId });
        console.log(currentStream.current.getTracks());
        currentStream.current.getTracks().forEach(track => track.stop());
        // connectionRef.current.destroy()
        console.log(11);  
    };
    useEffect(() => {
        socketRef.current = io("https://socketherokutest.herokuapp.com");
        console.log(socketRef.current);
        // socketRef.current = io("http://localhost:8000");
        try {

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


            navigator.mediaDevices
                .getUserMedia({ video: videoConstraints, audio: true })
                .then((stream) => {
                    userVideo.current.srcObject = stream;
                    currentStream.current = stream;
                    console.log("USERID ::",userId)


                    peerServer.on("open", () => {
                        console.log("open join room", roomId);
                        socketRef.current.emit('join-room', { userId, roomId });


                            socketRef.current.on("all_users", (user) => {
                            console.log("user list => ", user);

                                for(let x in user){
                                    console.log(user[x]);
                                console.log(userId,user[x])
                                if (userId != user[x]) {
                                const call = peerServer.call(user[x], stream);

                                call.on('stream', (remoteVideoStream) => {
                                    if (remoteVideoStream) {
                                        // dispatch({ type: actionTypes.ADD_REMOTE_STREAM, payload: remoteVideoStream });

                                        console.log("user connected new generated id for => from ", user[x] + " to " + remoteVideoStream.id);

                                        const abcdObj = { ...remoteVideoStream, uniqueUserId: user[x] };

                                        console.log("remoteVideoStream => ", JSON.stringify(remoteVideoStream));
                                        console.log("remoteVideoStream => ", JSON.stringify(abcdObj));

                                        peersRef.current.push({
                                            remoteVideoStream
                                        });

                                        console.log(peersRef.current);
                                    }
                                });


                                call.on("close", () => {
                                    console.log("peer close for => ");
                                });

                                peers[user[x]] = call;
                            }
                            }
                        });


                        // socketRef.current.on("user-connected", (puserId) => {
                        //     console.log("user connected => ", puserId);

                        //     // if (userId !== puserId) {

                        //         console.log("IN")
                        //         const call = peerServer.call(puserId, stream);

                        //         call.on('stream', (remoteVideoStream) => {
                        //             if (remoteVideoStream) {
                        //                 // dispatch({ type: actionTypes.ADD_REMOTE_STREAM, payload: remoteVideoStream });

                        //                 console.log("user connected new generated id for => from ", puserId + " to " + remoteVideoStream.id);

                        //                 const abcdObj = { ...remoteVideoStream, uniqueUserId: puserId };

                        //                 console.log("remoteVideoStream => ", JSON.stringify(remoteVideoStream));
                        //                 console.log("remoteVideoStream => ", JSON.stringify(abcdObj));

                        //                 peersRef.current.push({
                        //                     remoteVideoStream
                        //                 });

                        //                 console.log(peersRef.current);
                        //             }
                        //         });


                        //         call.on("close", () => {
                        //             console.log("peer close for => ");
                        //         });

                        //         peers[puserId] = call;

                        //     // }
                        // });
                    });

                     
                });
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            <button onClick={muteAudio}>{(isAudioMuted === true) ? 'Unmute' : 'Mute' }</button>
            <button onClick={logout}>Logout</button>
            {peersRef.current.map((peer, index) => {
                return <Video key={index} peer={peer} />;
            })}
        </Container>
    );
};

export default Room;
