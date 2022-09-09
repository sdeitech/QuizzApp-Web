import React from 'react';
import {
    ImageBackground, StyleSheet, Text,
    TouchableOpacity, View, Image,
} from 'react-native';

import assets from './../../../common/assests';
import color from './../../../utils/color';

const FooterView = () => {

    const commonImageView = (selected = false, diffColor = false) => {
        return (
            <TouchableOpacity style={[styles.imageViewTouch, { borderColor: diffColor ? color.bingoColor : "#f55485" }]}>
                <ImageBackground
                    style={styles.imageView}
                    imageStyle={styles.imageStyle}
                    source={assets.candy}
                    resizeMode="stretch"
                >
                    {
                        selected &&
                        <View style={styles.imageBottomContainer}>
                            <View style={styles.imageBottomsubContainer}>
                                <Image
                                    source={assets.videoCamera}
                                    style={styles.imageBottomsubContainerIcon}
                                    resizeMode={'stretch'}
                                />
                            </View>
                            <View
                                style={styles.imageBottomsubContainer}
                            >
                                <Image
                                    source={assets.microphone}
                                    style={styles.imageBottomsubContainerIcon}
                                    resizeMode={'stretch'}
                                />
                            </View>
                        </View>

                    }
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>

            { commonImageView(true)}

            { commonImageView()}

            { commonImageView(false, true)}
        </View>
    )
}

export default FooterView

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: "8%",
        paddingTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageViewTouch: {
        width: "30%",
        height: 68,
        borderWidth: 4,
        borderRadius: 6,
    },
    imageView: {
        width: "100%",
        height: "100%",
        overflow: 'hidden',
    },
    imageStyle: {
        width: "100%",
        height: "100%",
    },
    imageBottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    imageBottomsubContainer: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBottomsubContainerIcon: {
        height: "50%",
        width: "60%",
    }
});
