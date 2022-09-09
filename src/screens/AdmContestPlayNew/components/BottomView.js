import React from 'react';
import {
    StyleSheet, View, TouchableOpacity,
    Image,
} from 'react-native';

import assets from './../../../common/assests';
import color from './../../../utils/color';

const BottomView = (props) => {
    console.log(props.onFlipCamera, 'camera check')
    return (
        <View style={styles.container}>
            {
                !props.isSinglePlayer &&
                <>
                    {/* invite view */}
                    <TouchableOpacity
                        onPress={props.onMuteClick}
                        style={[styles.iconContainer]}
                    >
                        <Image
                            source={props.isAudioMute ? assets.callMicMute : assets.callMic}
                            style={[styles.icon]}
                            resizeMode={"stretch"}
                        />
                    </TouchableOpacity>

                    {/* coin icons */}
                    <TouchableOpacity
                        onPress={props.onVideoMuteclick}
                        style={[styles.iconContainer]}
                    >
                        <Image
                            source={props.isVideoMute ? assets.callCamMute : assets.callCam}
                            style={[styles.icon]}
                            resizeMode={"stretch"}
                        />
                    </TouchableOpacity>

                    {/* mute unmute option */}
                    <TouchableOpacity
                        onPress={() => props.onSpeakerClick(!props.isSpeakerOn)}
                        style={[styles.iconContainer]}
                    >
                        <Image
                            source={!props.isSpeakerOn ? assets.speakerMute : assets.speaker}
                            style={[styles.icon]}
                            resizeMode={"stretch"}
                        />
                    </TouchableOpacity>

                    {/* members view */}
                    {/* <TouchableOpacity
                        onPress={props.onMemberPress}
                        style={[styles.iconContainer]}
                    >
                        <Image
                            source={assets.viewVCallUsers}
                            style={[styles.icon]}
                            resizeMode={"stretch"}
                        />
                    </TouchableOpacity> */}
                </>
            }

            {/* end game view */}
            <TouchableOpacity
                style={[styles.iconContainer, { overflow: "hidden" }]}
                onPress={() => props.onExitClick()}
            >
                <Image
                    source={assets.end}
                    style={[styles.icon, {
                        height: "100%", width:"100%"
                    }]}
                    resizeMode={"stretch"}
                />
            </TouchableOpacity>

            {/* coin icons */}
            <TouchableOpacity
                onPress={props.onFlipCamera}
                style={[styles.iconContainer]}
            >
                <Image
                    source={assets.flipCam}
                    style={[styles.icon, { opacity: props.isVideoMute ? 0.6 : 1, height: "100%" }]}
                    resizeMode={"stretch"}
                />
            </TouchableOpacity>
        </View>
    )
}

export default BottomView;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        width: "80%",
        marginTop: 6,
        // marginBottom: 18,
        bottom: 18,
        position: 'absolute',
    },
    iconContainer: {
        height: 46,
        width: 46,
        borderRadius: 25,
        backgroundColor: color.subBordorColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: "100%",
        width: "100%",
    },
})
