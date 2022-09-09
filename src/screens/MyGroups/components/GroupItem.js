import React, { useState } from 'react'
import {
    StyleSheet, Text, TouchableOpacity,
    Animated, Image, View,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import BlueBorderView from '../../../common/BlueBorderView';

import assets from './../../../common/assests';
import color from './../../../utils/color';
import * as fontFamily from './../../../utils/fontFamily';

const GroupItem = (props) => {
    const [itemLayout, setitemLayout] = useState({});

    return (
        // <Animated.View style={{
        //     height:
        //         props?.item?.rowTranslateAnimatedValues[
        //             props.item.saveToId
        //         ]?.interpolate
        //             ?
        //             props.item.rowTranslateAnimatedValues[
        //                 props.item.saveToId
        //             ].interpolate({
        //                 inputRange: [0, 1],
        //                 outputRange: [0, 80],
        //             })
        //             :
        //             80,
        // }}>
        // <TouchableOpacity
        //     onPress={() => {
        //         console.log("my item object::", props.item);
        //         Actions.mygames({ saveToId: props.item.saveToId, groupName: props.item.saveToTitle });
        //     }}
        //     style={styles.container}
        //     activeOpacity={1}
        //     onLayout={(element) => {
        //         setitemLayout(element.nativeEvent.layout);
        //     }}
        // >
        <BlueBorderView
            onPress={() => {
                // console.log("my item object::", props.item);
                Actions.mygames({ saveToId: props.item.saveToId, groupName: props.item.saveToTitle });
            }}
            style={styles.container}
            activeOpacity={1}
            onLayout={(element) => {
                setitemLayout(element.nativeEvent.layout);
            }}
        >
            <View style={styles.leftContainer}>
                <Text style={styles.title}>{props.item.saveToTitle}</Text>
                <Text style={styles.contestNumber}>{props.item.contestNumber} Contests</Text>
            </View>

            {props.item.createdBy !== 'Data Admin' && (
                <View
                    onPress={() => {
                        props.onDotClick(itemLayout, props.item)
                    }}
                    style={styles.rightContainer}
                >
                    <TouchableOpacity onPress={() => props.onDeleteClick(props.item.saveToId)}>
                        <Image
                            source={assets.mark}
                            style={styles.rightIcon}
                        />
                    </TouchableOpacity>

                    <View height={10} />

                    <TouchableOpacity onPress={() => props.onEditClick(props.item)}>
                        <Image
                            source={assets.edit}
                            style={styles.rightIcon}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </BlueBorderView>
        // </TouchableOpacity>
        // </Animated.View>
    )
}

export default GroupItem;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        // paddingTop: 10,
        // paddingBottom: 10,
        // borderWidth: 1,
        // borderRadius: 5,
        // borderColor: color.matchItColor,
        // backgroundColor: color.statusBar,
        // marginBottom: 16,
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    title: {
        color: color.hangmanColor,
        fontFamily: fontFamily.avenirMedium,
        fontSize: 18,
        // bottom: 2,
    },
    contestNumber: {
        color: color.offlineGray,
        fontSize: 12,
        fontFamily: fontFamily.avenirLight,
    },
    leftContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    rightContainer: {
        paddingHorizontal: 10,
        width: 50,
        alignItems: "flex-end",
        right: -10,
    },
    rightIcon: {
        height: 20,
        width: 20,
        // tintColor: color.matchItColor,
    },
})
