import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet, View, TouchableOpacity,
    Image, ActivityIndicator, Platform,
    Text,
} from 'react-native'
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import { WebView } from "react-native-webview";

import assests from '../common/assests';

const QuestionFileView = ({ questionDetail }) => {
    const videoRef = useRef(null);

    const mediaStatusType = {
        loading: "loading",
        pause: "pause",
        play: "play"
    };

    const [mediaStatus, setmediaStatus] = useState(mediaStatusType.loading);
    const [maxLangth, setmaxLangth] = useState(0);
    const [currentMediaDuration, setcurrentMediaDuration] = useState(0);

    useEffect(() => {
        setmediaStatus(mediaStatusType.loading);
        setmaxLangth(0);
        setcurrentMediaDuration(0);
    }, [questionDetail?.file])

    // event after play and pause buttons
    const _playPauseAction = () => {
        try {
            if (mediaStatus === mediaStatusType.pause || mediaStatus === mediaStatusType.loading) {
                setmediaStatus(mediaStatusType.play);
            } else {
                setmediaStatus(mediaStatusType.pause);
            }
        } catch (error) {
            alert(error);
        }
    }

    // after reach the end of media
    const _onEndReach = () => {
        _playPauseAction();

        setTimeout(() => {
            videoRef.current.seek(0);
        }, 400);
        // setmediaStatus(mediaStatusType.pause);
    }

    // after load media set size of the duratio
    const _onLoadMedia = (data) => {
        try {
            console.log("media data => ", data);

            const maxSec = parseFloat(data.duration.toFixed(2));
            setmaxLangth(maxSec);

            _playPauseAction();
        } catch (error) {
            console.log("on load error => ", error);
        }
    }

    // play pause and loading button
    const _playPauseButton = (isAudio) => {
        if (mediaStatus === mediaStatusType.loading) {
            return (
                <ActivityIndicator
                    style={{
                        zIndex: 3,
                        top: isAudio ? undefined : 85,
                        marginBottom: isAudio ? 18 : undefined,
                        position: isAudio ? "relative" : "absolute",
                        alignSelf: "center",
                    }}
                    color={"white"}
                    size={"large"}
                />
            );
        }
        return (
            <TouchableOpacity
                onPress={_playPauseAction}
                style={{
                    height: 30,
                    width: 30,
                    top: isAudio ? undefined : 85,
                    marginBottom: isAudio ? 18 : undefined,
                    position: isAudio ? "relative" : "absolute",
                    alignSelf: "center",
                    // backgroundColor: "blue",
                    zIndex: 3,
                }}
            >
                <Image
                    style={{ height: "100%", width: "100%", tintColor: "white" }}
                    source={mediaStatus === mediaStatusType.pause ? assests.play : assests.pause}
                    resizeMode={"contain"}
                />
            </TouchableOpacity>
        )
    }

    // slider for progress media current length
    const _sliderView = (isAudio) => {

        let videoStyle = {};

        if (!isAudio) {
            videoStyle = { bottom: 0, position: "absolute", zIndex: 3, width: "100%", marginBottom: 0 };
        }

        return (
            <Slider
                style={[styles.sliderStyle, videoStyle]}
                value={currentMediaDuration}
                minimumValue={0}
                maximumValue={maxLangth}
                onValueChange={(numb) => videoRef.current.seek(parseFloat(numb.toFixed(2)))}
                disabled={mediaStatus === mediaStatusType.loading}
                step={Platform.OS === "ios" ? 100 : undefined}
                maximumTrackTintColor={'#274552'}
                minimumTrackTintColor={'#FCD274'}
            />
        );
    }


    // video component
    const _commonVideo = (file, isAudio) => {
        return (
            <Video
                ref={videoRef}
                key={file}
                source={{ uri: file }}
                onBuffer={() => { }}
                onLoad={(data) => _onLoadMedia(data)}
                onEnd={() => _onEndReach()}
                onProgress={({ currentTime }) => setcurrentMediaDuration(parseFloat(currentTime.toFixed(2)))}
                onError={(error) => { }}
                style={[styles.videoStyle, { display: isAudio ? 'none' : undefined }]}
                resizeMode={"stretch"}
                paused={mediaStatus === mediaStatusType.pause}
                // controls
            />
        );
    }

    if (questionDetail?.file) {
        if (questionDetail.fileType === "image") {
            return (
                <Image
                    source={{ uri: questionDetail.file }}
                    style={{ height: 200, width: 300 }}
                    resizeMode={'contain'}
                />
            );
        } else if (questionDetail.fileType === "link") {
            return (
                <View style={{ height: 200, width: "100%" }} >
                    <WebView
                        javaScriptEnabled={true}
                        useWebKit={true}
                        allowsInlineMediaPlayback={true}
                        source={{
                            uri: questionDetail.file,
                        }}
                        allowsFullscreenVideo={false}
                    />
                </View>
            );
        } else if (questionDetail.fileType === "video") {
            return (
                <View style={{ height: 200, width: "100%", backgroundColor: "black" }}>
                    {
                        _playPauseButton()
                    }

                    {
                        _commonVideo(questionDetail.file, false)
                    }

                    {
                        _sliderView(false)
                    }
                </View>
            );
        } else { // else is for audio
            return (
                <View style={{ width: "100%", backgroundColor: "transparent" }}>
                    <Image
                        source={assests.tempMusic}
                        style={styles.musicLogo}
                    />

                    {
                        _sliderView(true)
                    }

                    {
                        _playPauseButton(true)
                    }

                    {
                        _commonVideo(questionDetail.file, true)
                    }
                </View>
            );
        }
    }
    return null;
}

export default QuestionFileView

const styles = StyleSheet.create({
    container: {
    },
    videoStyle: {
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        zIndex: 1
    },
    musicLogo: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        top: 10,
    },
    sliderStyle: {
        marginTop: 45,
        marginBottom: 20,
        width: "50%",
        alignSelf: 'center',
    },
});
