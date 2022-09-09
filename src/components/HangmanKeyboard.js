import React, { useCallback } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, Dimensions,
} from 'react-native';

import color from './../utils/color';
import * as fontFamily from './../utils/fontFamily';

const HangmanKeyboard = ({ keyBoardData = [], onPressKey, wrongAnswers = [], rightAnswers = [], disabled = false }) => {

    const _backGroundColor = useCallback((keyText) => {
        if ([...rightAnswers].includes(keyText)) {
            return color.hangmanColor;
        } else if ([...wrongAnswers].includes(keyText)) {
            return color.fadeRedColor;
        } else {
            return "transparent"
        }
    }, [wrongAnswers, rightAnswers]);

    const _textColor = useCallback((keyText) => {
        if ([...wrongAnswers, ...rightAnswers].includes(keyText)) {
            return color.statusBar;
        }

        return color.hangmanColor;
    }, [wrongAnswers, rightAnswers]);

    const _borderColor = useCallback((keyText) => {
        if ([...wrongAnswers].includes(keyText)) {
            return color.fadeRedColor;
        }

        return color.hangmanColor;
    }, [wrongAnswers]);

    const _onPressKey = (keyText) => {
        if (!_isClicked(keyText)) {
            onPressKey(keyText);
        }
    }

    // check if char is added or not
    const _isClicked = (keyText) => {
        return [...wrongAnswers, ...rightAnswers].includes(keyText);
    }

    return (
        <View style={styles.container}>
            {
                keyBoardData.map(keyText => (
                    <TouchableOpacity
                        key={keyText}
                        style={styles.textTouchContainer}
                        onPress={() => _onPressKey(keyText)}
                        disabled={_isClicked(keyText) || disabled}
                    >
                        <View style={[styles.textContainer, {
                            backgroundColor: _backGroundColor(keyText),
                            borderColor: _borderColor(keyText)
                        }]}>
                            <Text style={[styles.keyText, {
                                color: _textColor(keyText)
                            }]}>{keyText}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default HangmanKeyboard;

const { width } = Dimensions.get("screen");

const _boxSize = () => {
    const paddingWidth = (1.5 * width) / 100;
    return ((14.29 * width) / 100) - paddingWidth;
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: "black",
        justifyContent: 'center',
    },
    textTouchContainer: {
        width: _boxSize(),
        height: _boxSize(),
        // backgroundColor: "red",
        // borderWidth: 0.2,
        // borderColor: "yellow",
        marginBottom: 6,
        padding: "2%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        height: "100%",
        width: "100%",
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
    },
    keyText: {
        fontFamily: fontFamily.avenirBold,
    },
})
