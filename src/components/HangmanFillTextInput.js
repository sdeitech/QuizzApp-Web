import React from 'react'
import {
    StyleSheet, Text, View,
    ScrollView,
} from 'react-native'

import color from '../utils/color';
import * as fontFamily from '../utils/fontFamily';

const HangmanFillTextInput = ({ question, filledAnswer }) => {
    const questionChatList = question.split("");

    const CharContainer = (item, index) => {
        return (
            <View
                key={item + index}
                style={[styles.charTextContainer, {
                    borderBottomWidth: item !== " " ? 1 : undefined,
                }]}
            >
                <Text style={styles.charText}>
                    {
                        filledAnswer.includes(item.toUpperCase()) ? item.toUpperCase() : ""
                    }
                </Text>
            </View>
        );
    }


    return (
        <ScrollView
            style={styles.container}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {
                questionChatList.map(CharContainer)
            }
        </ScrollView>
    )
}

export default HangmanFillTextInput

const styles = StyleSheet.create({
    container: {
        minHeight: 44,
        marginTop: 14,
    },
    charTextContainer: {
        marginHorizontal: 4,
        borderColor: color.walkThrowGrayDesc,
        minWidth: 30,
        alignItems: 'center',
    },
    charText: {
        fontFamily: fontFamily.avenirBold,
        color: color.hangmanColor,
        fontSize: 30,
    },
})
