import React, { memo } from 'react'
import {
    StyleSheet, Text, View,
    TouchableOpacity,
} from 'react-native'

import color from './../utils/color'
import * as fontFamily from './../utils/fontFamily'

const UnscrambleBottomUnderscore = (props) => {

    const _renderWord = (item, index) => {
        return (
            <View
                key={index + item}
                style={styles.mainRender}
            >
                <Text style={styles.text}>
                    {props?.selectedWords[index]}
                </Text>
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

export default memo(UnscrambleBottomUnderscore);

const styles = StyleSheet.create({
    container: {
        width: "95%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 20,
    },
    mainRender: {
        borderBottomWidth: 1,
        borderBottomColor: color.white,
        height: 54,
        width: 54,
        // backgroundColor: color.subBordorColor,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 6,
    },
    text: {
        fontSize: 30,
        color: color.hangmanColor,
        fontFamily: fontFamily.avenirBold,
    },
});
