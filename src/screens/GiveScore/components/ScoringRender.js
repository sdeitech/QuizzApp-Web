import React, { memo } from 'react'
import {
    StyleSheet, Text, View,
    ImageBackground, Image,
} from 'react-native'

import color from './../../../utils/color';
import assets from './../../../common/assests';
import * as fontFamily from './../../../utils/fontFamily';
import PointBoxList from './PointBoxList';

const ScoringRender = (props) => {
    const {
        name, username, selectedPoint, image, score,
        
        onSelect, index
    } = props.item;
    console.log(selectedPoint,'selected Point',props.item)
    return (
        <View style={styles.container}>

            {/* sub container */}
            <View style={styles.subContainer}>
                <ImageBackground
                    source={image ? { uri: image } : assets.vCallPlaceholder}
                    style={styles.profileBG}
                >
                    {/* <View style={styles.imageBottomContainer}>
                        <View style={styles.imageBottomsubContainer}>
                            <Image
                                style={styles.imageBottomVideoIcon}
                                source={assets.videoCamera}
                                resizeMode={'stretch'}
                            />
                        </View>

                        <View style={styles.imageBottomsubContainer}>
                            <Image
                                style={styles.imageBottomMicIcon}
                                source={assets.microphone}
                                resizeMode={'stretch'}
                            />
                        </View>
                    </View> */}
                </ImageBackground>

                <View width={18} />

                <View>
                    <Text style={styles.name}>{name}</Text>

                    <View height={4} />

                    {/* <Text style={styles.username}>{username}</Text> */}
                </View>

            </View>

            <PointBoxList
                selectedPoint={selectedPoint}
                score={score}
                onSelect={onSelect}
                userIndex={index}
            />
        </View>
    )
}

export default memo(ScoringRender);

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 28,
        borderBottomColor: color.subBordorColor,
        borderBottomWidth: 1,
        paddingVertical: 22,
    },
    subContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    profileBG: {
        height: 90,
        width: 90,
        borderRadius: 45,
        overflow: 'hidden',
    },
    imageBottomContainer: {
        position: 'absolute',
        bottom: 4,
        width: "100%",
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    imageBottomsubContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBottomVideoIcon: {
        height: "44%",
        width: "60%",
    },
    imageBottomMicIcon: {
        height: "60%",
        width: "44%",
    },
    name: {
        color: color.bingoColor,
        fontSize: 16,
    },
    username: {
        color: color.textGray,
        fontSize: 14,
    },
});
