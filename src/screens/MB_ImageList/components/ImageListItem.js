import React, { useState } from 'react';
import {
    Image, StyleSheet, Text,
    View, TouchableOpacity, Dimensions,
} from 'react-native';
import appConstants from '../../../common/appConstants';

import assests from '../../../common/assests';
import { dynamicSize } from '../../../utils/responsive';
import color from './../../../utils/color';

const ImageListItem = ({ data, onDeleteClick }) => {
    return (
        <View uniqueKey={`${data.item_id}`} style={[styles.bottomBoxContainer]}>
            <View style={[styles.bottomBoxInnerView]}>
                <Image
                    source={{ uri: data.title }}
                    resizeMode={'contain'}
                    style={[styles.boxLogo]}
                />

                {/* close button at the top */}
                <TouchableOpacity
                    style={styles.closeContainer}
                    onPress={() => onDeleteClick(data.item_id)}
                >
                    <Image
                        source={assests.crossCir}
                        style={styles.closeIcon}
                        resizeMode={"stretch"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ImageListItem;

const { width } = Dimensions.get("screen");

const itemBoxWidth = () => {
    return (27 * width) / 100;
}

const styles = StyleSheet.create({
    
    // render items
    bottomBoxContainer: {
        justifyContent: 'space-between',
        overflow: "hidden",
        width: itemBoxWidth(),
        height: itemBoxWidth(),
        // borderRadius: 10,
        marginBottom: 20,
        marginHorizontal: "1.5%",
        marginTop: 10,
        borderWidth: 1,
        // borderColor: '#EFB3FE',
        borderColor: color.hangmanColor,
        backgroundColor: '#22343C',
    },
    bottomBoxInnerView: {
        shadowColor: '#121D21FA',
        // elevation: 1,
        shadowOffset: { width: 0, height: 14 },
        
        flex: 1,
        // borderRadius: dynamicSize(10),
        // flexDirection: 'row',
        // height: dynamicSize(83),
    },
    boxLogo: {
        height: dynamicSize(60),
        flex: 1,
        // borderTopLeftRadius: dynamicSize(10),
        // borderBottomLeftRadius: dynamicSize(10),
        backgroundColor: '#324B55',
    },
    bottomBoxText: {
        fontSize: 14,
        color: color.matchItColor,
        marginRight: dynamicSize(5),
        fontFamily: appConstants.AirbnbCerealAppMedium,
        width: "100%",
        textAlign: 'center',
    },
    closeContainer: {
        top: 4,
        right: 4,
        position: 'absolute',
        height: 20,
        width: 20,
        backgroundColor: '#22343C',
        borderRadius: 10,
    },
    closeIcon: {
        height: "110%",
        width: "110%",
    },
    emptyViewLabel: {
        fontSize: 20,
        marginTop: "50%",
        width: "100%",
        color: '#ADBAC1',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: appConstants.AirbnbCerealAppLight,
    },
})
