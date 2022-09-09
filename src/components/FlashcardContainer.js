import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import color from '../utils/color';
import * as fontFamily from '../utils/fontFamily';

const FlashcardContainer = (props) => {
    const { _question, _answers, isModerator, playable } = props;

    return (
        <View style={[styles.flashCardContainer, {
            opacity: isModerator || playable ? 1 : 0.5
        }]}>
            <View style={styles.tabooTextContainer}>
                <Text style={styles.title}>{_question}</Text>
            </View>

            {/* answers view for moderator */}
            {
                isModerator &&
                _answers.map((item) => (
                    <View style={[styles.tabooTextContainer, {
                        backgroundColor: color.white
                    }]}>
                        <Text style={styles.answer}>{item.answer}</Text>
                    </View>
                ))
            }
        </View>
    )
}

export default FlashcardContainer;

const styles = StyleSheet.create({
    flashCardContainer: {
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
    },
    tabooTextContainer: {
        backgroundColor: color.hangmanColor,
        width: "100%",
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    title: {
        color: color.statusBar,
        fontFamily: fontFamily.avenirBold,
        fontSize: 22,
    },
    answer: {
        color: color.statusBar,
        fontFamily: fontFamily.avenirLight,
        fontSize: 22,
    },
});
