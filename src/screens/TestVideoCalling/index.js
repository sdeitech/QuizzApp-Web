import React, { useState, useEffect, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux'
import InCallManager from 'react-native-incall-manager';
import HeadphoneDetection from 'react-native-headphone-detection';

import MaineHeader from '../../common/headerWithText';

import styles from './styles';
import { joinRoom, leaveRoom, toggleMuteVoice, userMuteVoice, userUnMuteVoice, userVideoMuteVoice, userVideoUnMuteVoice } from '../../redux/action/videoActions';
import actionTypes from '../../redux/action/types';
import assests from '../../common/assests';

const TestVideoCalling = (props) => {
    const dispatch = useDispatch();
    const video = useSelector(state => state.videoReducer);

    const [isSpeakerOn, setisSpeakerOn] = useState(false);

    const { height } = useWindowDimensions();

    const handleAppStateChange = (nextAppState) => {
        console.log("the app is closed => ", nextAppState);
        if (nextAppState === 'inactive') {
            console.log('the app is closed');
        }
    }


    useEffect(() => {
        dispatch({ type: actionTypes.FLUSH_USERS_LIST });

        // InCallManager.setMicrophoneMute(false);
        InCallManager.setKeepScreenOn(true);

        _changeVolumeType(false);

        HeadphoneDetection.addListener((data) => {
            for (const isPulgValue of Object.values(data)) {
                if (isPulgValue) {
                    _changeVolumeType(true);
                    break;
                } else {
                    _changeVolumeType(false);
                }
            }
        });

        HeadphoneDetection.isAudioDeviceConnected()
            .then((data) => {
                for (const isPulgValue of Object.values(data)) {
                    if (isPulgValue) {
                        _changeVolumeType(true);
                        break;
                    } else {
                        _changeVolumeType(false);
                    }
                }
            })
            .catch(err => {
                console.log("error => ", err);
            });

        let isFront = true;
        mediaDevices.enumerateDevices().then((sourceInfos) => {
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
                            minWidth: 500,
                            minHeight: 300,
                            minFrameRate: 30,
                        },
                        facingMode: isFront ? 'user' : 'environment',
                        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
                    },
                })
                .then((stream) => {
                    dispatch(joinRoom(stream, props.roomId));
                })
                .catch((error) => {
                    console.log(error);
                });
        });


        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            dispatch(leaveRoom(props.roomId));

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

    const _changeVolumeType = (status) => {
        console.log("is Speaker on => " + !status)
        setTimeout(() => {
            setisSpeakerOn(!status);
            InCallManager.setForceSpeakerphoneOn(!status);
            InCallManager.setSpeakerphoneOn(!status);
            // InCallManager.setMicrophoneMute(status);
        }, 100);

    }

    const selfVideoStyle = () => {
        let selfStyle = {
            height: 250,
            width: "50%",
        };
        const otherVideoLength = [...video.streams, ...video.remoteStreams].length;
        // const otherVideoLength = [...video.allusers].length;

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
        }

        return selfStyle;
    }

    const videoStyle = () => {
        let selfStyle = {
            height: 250,
            width: "50%",
        };
        const otherVideoLength = [...video.streams, ...video.remoteStreams].length;
        // const otherVideoLength = [...video.allusers].length;

        if (otherVideoLength === 1) {
            selfStyle = {
                height: "50%",
                width: "100%",
            };
        } else if (otherVideoLength === 2) {
            selfStyle = {
                height: "50%",
                width: "50%",
            };
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

    const _toggleSpeaker = () => {
        _changeVolumeType(isSpeakerOn);
    }

    const headerRight = () => {
        return (
            <TouchableOpacity
                onPress={() => _toggleSpeaker()}
                style={[
                    styles.crossLogo, {
                        opacity: isSpeakerOn ? 0.4 : 1
                    }
                ]}
            >
                <Image source={assests.speaker} />
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />

            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff', flex: 1, left: 50 }}
                title={props.title || 'Video Calling'}
                right={headerRight()}
            />

            <View style={styles.innerContainer}>
                <ScrollView style={{ width: "100%" }} contentContainerStyle={{ flexGrow: 1 }} >
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
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", height: "100%" }}>
                        {
                            video.myStream &&
                            // <View
                            //     style={selfVideoStyle()}
                            // // imageStyle={styles.rctView}
                            // // source={assests.vCallPlaceholder}
                            // // resizeMode={"stretch"}
                            // >
                            <ImageBackground
                                style={[selfVideoStyle(), { backgroundColor: "red" }]}
                                imageStyle={styles.rctView}
                                source={assests.vCallPlaceholder}
                                resizeMode={'stretch'}
                            >
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
                                    muteUnmuteIcon(video.myStream.getTracks())
                                }
                            </ImageBackground>
                            // {/* </View> */}
                        }
                        {/* {
                            [...video.allusers].map((item, i) => {
                                return (
                                    <View
                                        style={videoStyle()}
                                        key={i.toString()}
                                    >
                                        <RTCView
                                            streamURL={item.toURL()}
                                            style={styles.rctView}
                                            objectFit={'cover'}
                                        />

                                        {
                                            muteUnmuteIcon(item.getTracks(), item.id)
                                        }
                                    </View>
                                );
                            })
                        } */}
                        {
                            [...video.streams].map((item, i) => {
                                return (
                                    <ImageBackground
                                        style={[videoStyle(), { backgroundColor: "red" }]}
                                        imageStyle={styles.rctView}
                                        source={assests.vCallPlaceholder}
                                        resizeMode={'stretch'}
                                        key={item.id}
                                    >
                                        {
                                            !_isVideoMute(item.getTracks()) &&
                                            <RTCView
                                                streamURL={item.toURL()}
                                                style={styles.rctView}
                                                objectFit={'cover'}
                                                mirror={true}
                                            />
                                        }

                                        {
                                            muteUnmuteIcon(item.getTracks(), item.id, false)
                                        }
                                    </ImageBackground>
                                );
                            })
                        }
                    </View>
                    {/* </ScrollView>
                </View> */}

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default TestVideoCalling;