import React, { memo, useMemo } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity,
} from 'react-native';

import color from './../utils/color'
import * as fontFamily from './../utils/fontFamily'

const UnscrambleSuffleList = (props) => {

    const _renderWord = (item, index) => {

        const isAdded = props.selectedWordsIndex.includes(index);

        const _bgColor = () => {
            let bgColor = color.statusBar;

            if (isAdded) bgColor = color.hangmanColor;

            if (props.currentFalse && (props.selectedWordsIndex[props.selectedWordsIndex.length - 1] === index)) {
                bgColor = color.fadeRedColor;
            }

            return bgColor;
        }

        return (
            <View
                key={index + item}
                style={[styles.mainRender, {
                    opacity: isAdded || !props.playable ? 0.5 : 1
                }]}
            >
                <TouchableOpacity
                    style={[styles.touchRender, {
                        backgroundColor: _bgColor(),
                    }]}
                    onPress={() => {
                        props.onPress(item, index)
                    }}
                    disabled={isAdded || props.doneClick || !props.playable}
                >
                    <Text style={[styles.text, {
                        color: isAdded ? color.statusBar : color.hangmanColor,
                    }]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {
                props?.suffName.map(_renderWord)
            }
        </View>
    )
}

export default memo(UnscrambleSuffleList);

const styles = StyleSheet.create({
    container: {
        width: "95%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    mainRender: {
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    touchRender: {
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: color.hangmanColor,
        backgroundColor: color.statusBar,
    },
    text: {
        fontSize: 20,
        fontFamily: fontFamily.avenirBold,
    },
});
