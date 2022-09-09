import React, { useState, useRef } from 'react';
import {
    ActivityIndicator, StyleSheet, Text,
    View, TouchableOpacity, Image,
} from 'react-native';
import Video from 'react-native-video';

import assests from '../../../common/assests';

const VideoItem = ({ file }) => {
    const mediaStatusType = {
        loading: "loading",
        pause: "pause",
        play: "play"
    };

    const videoRef = useRef(null);

    const [mediaStatus, setmediaStatus] = useState(mediaStatusType.loading);


    // after reach the end of media
    const _onEndReach = () => {
        _playPauseAction();

        setTimeout(() => {
            videoRef.current.seek(0);
        }, 400);
        // setmediaStatus(mediaStatusType.pause);
    }

    // event after play and pause buttons
    const _playPauseAction = () => {
        try {
            if (mediaStatus === mediaStatusType.play || mediaStatus === mediaStatusType.loading) {
                setmediaStatus(mediaStatusType.pause);
            } else {
                setmediaStatus(mediaStatusType.play);
            }
        } catch (error) {
            alert(error);
        }
    }

    // play pause and loading button
    const _playPauseButton = () => {
        if (mediaStatus === mediaStatusType.loading) {
            return (
                <ActivityIndicator
                    style={{
                        zIndex: 3,
                        top: 45,
                        position: "absolute",
                        alignSelf: "center",
                    }}
                    color={"white"}
                />
            );
        }
        return (
            <TouchableOpacity
                onPress={_playPauseAction}
                style={{
                    height: 25,
                    width: 30,
                    top: 38,
                    position: "absolute",
                    alignSelf: "center",
                    zIndex: 3,
                }}
            >
                <Image
                    style={{ height: "100%", width: "100%", tintColor: "yellow" }}
                    source={mediaStatus === mediaStatusType.pause ? assests.play : assests.pause}
                    resizeMode={"contain"}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Video
                key={file}
                ref={videoRef}
                source={{ uri: file }}
                onBuffer={() => { }}
                onLoad={_playPauseAction}
                onError={(error) => { }}
                style={[styles.videoStyle]}
                resizeMode={"stretch"}
                paused={mediaStatus === mediaStatusType.pause}
                onEnd={() => _onEndReach()}
                // repeat
                // controls
            />
            {
                _playPauseButton()
            }
        </View>
    )
}

export default VideoItem;

const styles = StyleSheet.create({
    container: {
        height: 95,
        width: "100%",  
    },
    videoStyle: {
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        zIndex: 1
    },
});
