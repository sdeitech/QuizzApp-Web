import React from 'react'
import {
    StyleSheet, Image, View,
    ScrollView, useWindowDimensions, TouchableOpacity
} from 'react-native'
// import { RTCView } from 'react-native-webrtc';
import { useDispatch } from 'react-redux';

import assests from './../../../common/assests';
import color from './../../../utils/color';

const ContestantsList = (props) => {
    const dispatch = useDispatch();

    const { width } = useWindowDimensions();

    const splitToChunks = (array, n) => {
        let [...arr] = array;
        var res = [];
        while (arr.length) {
            res.push(arr.splice(0, n));
        }
        return res;
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
            <View style={styles.bottomView}>
                <TouchableOpacity
                    disabled={!isSelf}
                >
                    <Image
                        source={assests.callRight}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={!isSelf}
                    onPress={() => _onMuteClick()}
                >
                    <Image
                        source={assests.callMic}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={!isSelf}
                    onPress={() => _onVideoMuteClick()}
                >
                    <Image
                        source={assests.callCam}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    // * page list display for scroll
    const pageWithList = () => {
        try {
            const splittedData = [...splitToChunks(props.data, 6)];
            console.log("splitted data: ", splittedData[0]);
            return splittedData.map((item, index) => (
                <View
                    key={index.toString()}
                    style={styles.renderContestants(width)}
                >
                    {
                        item.map((item, index) => {
                            {console.log("item to resolved: hm: ", item)}
                            return (
                                <View
                                    key={index.toString()}
                                    style={[
                                        styles.renderContestantsItem,
                                        {
                                            marginLeft: (index % 2) !== 0 ? "4%" : 0,
                                            marginRight: (index % 2) === 0 ? "4%" : 0,
                                        }
                                    ]}
                                >
                                    <Image
                                        style={styles.contestantsImage}
                                        source={assests.vCallPlaceholder}
                                    />

                                    {/* <RTCView
                                        streamURL={item.toURL()}
                                        style={styles.contestantsImage}
                                        objectFit={'cover'}
                                        mirror={true}
                                    /> */}

                                    {
                                        muteUnmuteIcon(item.getTracks(), item.id, false)
                                    }
                                </View>
                            );
                        })
                    }
                </View>
            ));
        } catch (error) {
            alert(error);
        }
    }

    return (
        <ScrollView
            horizontal
            pagingEnabled
            style={styles.listingData}
            showsHorizontalScrollIndicator={false}
        >
            {
                pageWithList()
            }
        </ScrollView>
    )
}

export default ContestantsList;

const styles = StyleSheet.create({
    listingData: {
        flex: 1,
        // backgroundColor: "blue",
    },
    renderContestants: (width) => ({
        width,
        // backgroundColor: "pink",
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: "4%",
        marginVertical: 20,
    }),
    renderContestantsItem: {
        height: "29%",
        width: "46%",
        // marginHorizontal: "6%",
        marginVertical: "3%",
        backgroundColor: color.subBordorColor,
        borderRadius: 8,
        overflow: 'hidden',
    },
    contestantsImage: {
        width: "100%",
        height: "62%",
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})
