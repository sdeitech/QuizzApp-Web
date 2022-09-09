import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
    Button,
    SafeAreaView,
    AppState,
    ScrollView,
    View,
    Image,
    StatusBar,
    useWindowDimensions,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import {
    RTCView,
    mediaDevices,
} from 'react-native-webrtc';
import { useDispatch, useSelector } from 'react-redux';
import InCallManager from 'react-native-incall-manager';
import HeadphoneDetection from 'react-native-headphone-detection';
import AsyncStorage from '@react-native-community/async-storage';

import MaineHeader from '../../common/headerWithText';

import styles from './styles';
import { joinRoom, leaveRoom, toggleMuteVoice, userMuteVoice, userUnMuteVoice, userVideoMuteVoice, userVideoUnMuteVoice } from '../../redux/action/videoActions';
import actionTypes from '../../redux/action/types';
import assests from '../../common/assests';
import { Loader } from '../../components/customComponent';
import WaitingLoader from './components/WaitingLoader';
import color from '../../utils/color';

const VideoCallingView = (props, ref) => {
    // console.log(props,'hitesh dama')
    const dispatch = useDispatch();
    const video = useSelector(state => state.videoReducer);
    const userReducer = useSelector(state => state.userReducer);

    const [tempStateForReRender, settempStateForReRender] = useState(false);

    const [isFront, setIsFront] = useState(props.toggleCamera ? props.toggleCamera : true);

    // const isFrontRef = useRef(props.toggleCamera);
    let isFrontRef = props.toggleCamera;

    const { height } = useWindowDimensions();

    const handleAppStateChange = (nextAppState) => {
        console.log("the app is closed => ", nextAppState);
        if (nextAppState === "inactive" || nextAppState === "background") {
            video?.myStream?.getVideoTracks()?.forEach((track) => {
                track?.stop();
            });
        } else {
            video?.myStream?.getVideoTracks()?.forEach((track) => {
                track?.release();
            });
        }
    }

    useEffect(() => {
        // isFrontRef.current = props?.toggleCamera;
        // console.log('camera status => ', isFrontRef.current);
    }, [props?.toggleCamera]);

    useEffect(() => {
        console.log("joining call from mount");
        console.log("video call ref :: mount");
        console.log(props.toggleCamera, 'camera status')
        let reRenderStateChange;
        try {
            // console.log("video component => ");
            dispatch({ type: actionTypes.FLUSH_USERS_LIST });

            // InCallManager.setMicrophoneMute(false);
            InCallManager.setKeepScreenOn(true);

            // setIsFront(props.toggleCamera)
            // _changeVolumeType(false);

            // HeadphoneDetection.addListener((data) => {
            //     // for (const isPulgValue of Object.values(data)) {
            //     //     if (isPulgValue) {
            //     //         _changeVolumeType(true);
            //     //         break;
            //     //     } else {
            //     //         _changeVolumeType(false);
            //     //     }
            //     // }
            //     console.log("video component => listener");
            //     _checkPluggedInAudioDevice(data);
            // });

            HeadphoneDetection.isAudioDeviceConnected()
                .then((data) => {
                    // console.log("video component => method");
                    _checkPluggedInAudioDevice(data);
                })
                .catch(err => {
                    console.log("error => ", err);
                });

            // let isFront = props.toggleCamera? props.toggleCamera : true;
            console.log(isFront, 'isFRont right===')
            mediaDevices.enumerateDevices().then((sourceInfos) => {
                console.log(" video component =>enter call");
                let videoSourceId;
                for (let i = 0; i < sourceInfos.length; i++) {
                    const sourceInfo = sourceInfos[i];
                    if (
                        sourceInfo.kind == 'videoinput' &&
                        sourceInfo.facing == (isFront ? 'front' : 'environment')
                    ) {
                        videoSourceId = sourceInfo.deviceId;
                    }
                }
                mediaDevices
                    .getUserMedia({
                        audio: true,
                        video: {
                            mandatory: {
                                minWidth: 205,
                                minHeight: 410,
                                minFrameRate: 30,
                            },
                            facingMode: isFrontRef ? 'user' : 'environment',
                            optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
                        },
                    })
                    .then(async (stream) => {
                        const joinedUserId = await AsyncStorage.getItem('userid');
                        console.log("my personal stream => ", stream, props.roomId, joinedUserId, props.isModerator);
                        dispatch(joinRoom(stream, props.roomId, joinedUserId, props.isModerator));
                    })
                    .catch((error) => {
                        console.log("error for streaming => ", error);
                    });
            })
                .catch((error) => {
                    alert("error for streaming => ");
                });;


            AppState.addEventListener('change', handleAppStateChange);

            reRenderStateChange = setInterval(() => {
                settempStateForReRender(prev => !prev);
            }, 3000);
        } catch (error) {
            console.log("error for streaming => useEffect", error);
        }
        return () => {
            console.log("leaving call from unmount");

            if (reRenderStateChange) {
                clearInterval(reRenderStateChange);
            }
            clearInterval();

            console.log("leaving call from unmount 0");

            dispatch(leaveRoom(props.roomId, props.isModerator));

            console.log("leaving call from unmount 1");


            if (HeadphoneDetection.remove) { // The remove is not necessary on Android
                console.log("remove headphone");
                HeadphoneDetection.remove();
            }

            _changeVolumeType(false);

            AppState.addEventListener('change', handleAppStateChange);

            InCallManager.setKeepScreenOn(false);

            // InCallManager.setMicrophoneMute(true);
        }
    }, []);

    useImperativeHandle(ref, () => ({

        getAlert() {
            alert("getAlert from Child");
        }

    }));

    const _pauseCamView = () => {
        try {
            video?.myStream?.getVideoTracks()?.forEach((track) => {
                console.log("video stream get video track", track);
                track?.stop();
            });
            // if (video?.myStream?.getVideoTracks().length) {
            //     video?.myStream?.getVideoTracks()[0].enabled = false;
            // }
        } catch (error) {
        }
    }

    const _checkPluggedInAudioDevice = (data) => {
        let changeVoulumeType = false;
        for (const isPulgValue of Object.values(data)) {
            if (isPulgValue === true) {
                changeVoulumeType = true;
                // _changeVolumeType(true);
                break;
            }
        }

        _changeVolumeType(changeVoulumeType);
    }

    const _changeVolumeType = (status) => {
        // InCallManager.setForceSpeakerphoneOn(!status);
        // InCallManager.setSpeakerphoneOn(!status);
        props.toggleSpeaker(!status);
        // InCallManager.setMicrophoneMute(status);
    }

    const selfVideoStyle = () => {
        let selfStyle = {
            height: 250,
            width: "50%",
        };
        const otherVideoLength = [...video.streams, ...video.remoteStreams].length;
        // const otherVideoLength = [video.myStream, video.myStream, video.myStream, video.myStream, video.myStream].length;

        if (otherVideoLength === 0) {
            selfStyle = {
                height: "100%",
                width: "100%",
            };
        } else if (otherVideoLength === 1 || otherVideoLength === 2) {
            selfStyle = {
                height: "50%",
                width: "100%",
            };
        } else if (otherVideoLength === 3) {
            selfStyle = {
                height: "50%",
                width: "50%",
            };
        } else if (otherVideoLength === 4) {
            selfStyle = {
                height: "50%",
                width: "33.33%",
            };
        } else if (otherVideoLength === 5) {
            selfStyle = {
                height: "40%",
                width: "25%",
            };
        }

        return selfStyle;
    }

    const videoStyle = (i) => {
        let selfStyle = {
            height: 250,
            width: "50%",
        };
        const otherVideoLength = [...video.streams, ...video.remoteStreams].length;
        // const otherVideoLength = [video.myStream, video.myStream, video.myStream, video.myStream, video.myStream].length;

        if (otherVideoLength === 1) {
            selfStyle = {
                height: "50%",
                width: "100%",
            };
        } else if (otherVideoLength === 2 || otherVideoLength === 3) {
            selfStyle = {
                height: "50%",
                width: "50%",
            };
        } else if (otherVideoLength === 4) {
            if (i <= 1) {
                selfStyle = {
                    height: "50%",
                    width: "33.33%",
                };
            } else {
                selfStyle = {
                    height: "50%",
                    width: "50%",
                };
            }
        } else if (otherVideoLength === 5) {
            if (i <= 2) {
                selfStyle = {
                    height: "40%",
                    width: "25%",
                };
            } else {
                selfStyle = {
                    height: "60%",
                    width: "50%",
                };
            }
        }

        return selfStyle;
    }

    const onMuteUnmutePress = (streamId) => {
        try {
            dispatch(toggleMuteVoice(streamId));
        } catch (error) {
        }
    }

    const _isVideoMute = (tracks) => {
        let isVideoMute = false;
        isVideoMute = tracks.find(x => x?.kind === 'video')?.muted;

        return isVideoMute;
    }

    const _isAudioMute = (tracks) => {
        let isMute = false;
        isMute = tracks.find(x => x?.kind === 'audio')?.muted;

        return isMute;
    }

    const muteUnmuteIcon = (tracks, streamId, isSelf = true) => {
        // console.log("tracks object => ", JSON.stringify(tracks));

        const isMute = _isAudioMute(tracks);

        const isVideoMute = _isVideoMute(tracks);

        const _onMuteClick = () => {
            if (isMute) {
                dispatch(userUnMuteVoice(props.roomId))
            } else {
                dispatch(userMuteVoice(props.roomId))
            }
        }

        const _onVideoMuteClick = () => {
            if (isVideoMute) {
                dispatch(userVideoUnMuteVoice(props.roomId))
            } else {
                dispatch(userVideoMuteVoice(props.roomId))
            }
        }

        return (
            <View style={styles.videoControllers}>
                <TouchableOpacity
                    style={styles.muteIconContainer}
                    onPress={() => _onMuteClick()}
                    disabled={!isSelf}
                >
                    <Image
                        source={assests.callMic}
                        style={[
                            styles.muteIcon,
                            {
                                opacity: isMute ? 0.2 : 1
                            }
                        ]}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>



                <TouchableOpacity
                    style={styles.muteIconContainer}
                    onPress={() => _onVideoMuteClick()}
                    disabled={!isSelf}
                >
                    <Image
                        source={assests.callCam}
                        style={[
                            styles.muteIcon,
                            {
                                opacity: isVideoMute ? 0.2 : 1
                            }
                        ]}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />

            {/* <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff', flex: 1, left: 50 }}
                title={props.title || 'Video Calling'}
            /> */}

            <View style={styles.innerContainer}>
                <ScrollView
                    style={{ width: "100%" }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    horizontal={[...video.streams, ...video.remoteStreams].length > 2}
                >
                    {
                        /* <View style={styles.localStream}> */
                    }

                    {/* {userVideo && <RTCView style={[styles.rtc]} streamURL={userVideo} objectFit={'cover'} />} */}
                    {
                        // video.myStream &&
                        // <RTCView
                        //     streamURL={video.myStream.toURL()}
                        //     style={{ height: (height / 3), width: "100%" }}
                        //     objectFit={'cover'}
                        // />
                    }
                    {/* </View> */}

                    {/* <View style={{ flex: 1, width: "100%" }}>
                    {
                        remoteStream.length > 0 &&
                        <RTCView
                            style={[styles.rtc]}
                            streamURL={remoteStream[0]}
                            objectFit={'cover'}
                        />
                    }
                </View> */}

                    {/* <View style={{ flex: 1, width: "100%" }}>
                    <ScrollView> */}
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            width: "100%",
                            height: "100%",
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {
                            video.myStream &&
                            // <View
                            //     style={selfVideoStyle()}
                            // // imageStyle={styles.rctView}
                            // // source={assests.vCallPlaceholder}
                            // // resizeMode={"stretch"}
                            // >
                            <ImageBackground
                                style={[selfVideoStyle(), styles.rctViewContainer, {
                                    display: video?.loaderForRequestedUsers ? 'none' : 'flex',
                                }]}
                            // imageStyle={styles.rctView}
                            // source={assests.vCallPlaceholder}
                            // resizeMode={'stretch'}
                            >
                                <View
                                    style={[styles.emptyViewContainer, {
                                        // borderWidth: !_isVideoMute(video.myStream.getTracks()) ? undefined : 1,
                                    }]}
                                >
                                    <Image
                                        style={[{
                                            height: 90,
                                            width: 90,
                                            borderRadius: 45,
                                        }]}
                                        source={{ uri: userReducer?.loginDetails?.image || `https://eu.ui-avatars.com/api/?name=Me` }}
                                        defaultSource={assests.vCallPlaceholder}
                                    />
                                </View>
                                {console.log("streamid is =>> ", video.myStream.toURL())}
                                {
                                    !_isVideoMute(video.myStream.getTracks()) &&
                                    <RTCView
                                        streamURL={video.myStream.toURL()}
                                        style={styles.rctView}
                                        objectFit={'cover'}
                                        mirror={true}
                                    />
                                }

                                {
                                    // muteUnmuteIcon(video.myStream.getTracks())
                                }
                            </ImageBackground>
                            // {/* </View> */}
                        }


                        {
                            [...video.streams].map((item, i) => {
                                // (video.myStream === null ? [] : [video.myStream, video.myStream, video.myStream, video.myStream, video.myStream]).map((item, i) => {
                                console.log("video stream value => ", item);

                                const { remoteVideoStream } = item;
                                // const remoteVideoStream = item;

                                return (
                                    <View
                                        style={[videoStyle(i), styles.rctViewContainer]}
                                        key={`` + remoteVideoStream?.id + i}
                                    >
                                        <View
                                            style={[styles.emptyViewContainer, {
                                                // borderWidth: !_isVideoMute(remoteVideoStream.getTracks()) ? undefined : 1,
                                            }]}
                                        >
                                            <Image
                                                style={[{
                                                    height: 90,
                                                    width: 90,
                                                    borderRadius: 45,
                                                    position: 'absolute',
                                                }]}
                                                source={{ uri: item?.userData?.image }}
                                                defaultSource={assests.vCallPlaceholder}
                                            />
                                        </View>
                                        {
                                            !_isVideoMute(remoteVideoStream.getTracks()) &&
                                            <RTCView
                                                streamURL={remoteVideoStream.toURL()}
                                                style={styles.rctView}
                                                objectFit={'cover'}
                                                mirror={true}
                                                key={`__` + remoteVideoStream?.id + i}
                                            />
                                        }

                                        {
                                            // muteUnmuteIcon(remoteVideoStream.getTracks(), remoteVideoStream.id, false)
                                        }
                                    </View>
                                );
                            })
                        }
                    </View>
                    {/* </ScrollView>
                </View> */}

                    {
                        video?.loaderForRequestedUsers &&
                        <WaitingLoader />
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default forwardRef(VideoCallingView);