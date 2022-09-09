import React, { useMemo, useState, useEffect } from 'react';
import {
    Image, StyleSheet, Text,
    View, TouchableOpacity,
} from 'react-native';

import color from '../utils/color';
import * as fontFamily from '../utils/fontFamily';
import PageIndicator from './PageIndicator';
import {
    Button,
} from './customComponent';
import assests from '../common/assests';
import HangmanKeyboard from './HangmanKeyboard';
import HangmanFillTextInput from './HangmanFillTextInput';

const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const alphaKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const keyboardTypes = {
    number: "number",
    char: "char",
};

const HangmanComponent = (props) => {
    // wrong counter
    const [wrongAnswers, setwrongAnswers] = useState([]);

    // right counter
    const [rightAnswers, setrightAnswers] = useState([]);

    // keyboard type
    const [keyboardType, setkeyboardType] = useState(keyboardTypes.char);

    useEffect(() => {
        setwrongAnswers([]);
        setrightAnswers([]);
    }, [props.donequestion])

    const _question = useMemo(() => {
        return props.quizData[props.donequestion]?.question || "";
    }, [props.donequestion]);

    const _hint = useMemo(() => {
        return props.quizData[props.donequestion]?.hintText || "";
    }, [props.donequestion]);

    const _filterAnswerArray = () => {
        const _questionArray = _question.split("");

        let newArray = [];

        _questionArray.forEach((text) => {
            if (!newArray.includes(text) && text !== " ") {
                newArray = [...newArray, text];
            }
        });

        return newArray;
    }

    // add text after click on alpha click
    const _addText = (latter) => {
        // check is this char added or not
        const hasWord = () => {
            return _question.toUpperCase().includes(latter);
        }

        if (hasWord()) {
            if (_filterAnswerArray().length === rightAnswers.length + 1) {
                props.onCorrectClick();
            }
            setrightAnswers(prev => [...prev, latter]);
        } else {
            if (wrongAnswers.length === 5) {
                props.onNextClick();
            }
            setwrongAnswers(prev => [...prev, latter]);
        }
    }

    const _changeKeyboardType = () => {
        if (keyboardTypes.char === keyboardType) {
            setkeyboardType(keyboardTypes.number);
        } else {
            setkeyboardType(keyboardTypes.char);
        }
    }


    return (
        <View style={styles.container}>
            <View height={20} />

            <PageIndicator
                totalQuestion={props.questionLength}
                doneQuestion={props.donequestion}
                wrongQuestions={props.wrongQuestions}
            />

            <View height={20} />

            {/* hangman top Container */}
            <View style={styles.topContainer}>
                <Image
                    source={assests.hangmanMan}
                    style={styles.hangmanImage}
                    resizeMode={'contain'}
                />

                {/* top question right View */}
                <View style={styles.topRightContainer}>
                    <Text style={styles.hint}>{_hint}</Text>
                    <HangmanFillTextInput
                        question={_question}
                        filledAnswer={rightAnswers}
                    />
                </View>
            </View>

            <View height={40} />

            {/* hangman bottom keyboard container */}
            <View style={styles.bottomContainer}>
                <HangmanKeyboard
                    keyBoardData={keyboardTypes.char === keyboardType ? alphaKeys : numberKeys}
                    onPressKey={(keyText) => _addText(keyText)}
                    wrongAnswers={wrongAnswers}
                    rightAnswers={rightAnswers}
                    disabled={props.doneClick}
                />

                <View height={10} />

                {/* swicth keyboard */}
                <TouchableOpacity
                    style={styles.keysToggleButton}
                    onPress={() => _changeKeyboardType()}
                >
                    <Text style={styles.buttonTitle}>
                        {
                            (keyboardTypes.char === keyboardType)
                                ?
                                "123"
                                :
                                "Abc"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HangmanComponent;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: "100%",
        paddingHorizontal: "5%",
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topRightContainer: {
        marginLeft: 28,
        flex: 1,
    },
    hangmanImage: {
        height: 70,
        width: 70,
    },
    hint: {
        fontFamily: fontFamily.avenirBold,
        color: color.hangmanColor,
        fontSize: 24,
    },
    bottomContainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
    },
    keysToggleButton: {
        alignSelf: 'center',
        padding: 10,
        borderWidth: 2,
        backgroundColor: color.hangmanColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
    },
    buttonTitle: {
        color: color.statusBar,
        fontFamily: fontFamily.avenirBold,
    },
});
