import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';

import color from '../utils/color';
import * as fontFamily from '../utils/fontFamily';
import { Button } from './customComponent';
import HangmanKeyboard from './HangmanKeyboard';
import PageIndicator from './PageIndicator';

const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const alphaKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const keyboardTypes = {
    number: "number",
    char: "char",
};

const GibbrishComponent = (props) => {
    const textTypeRef = useRef(null);

    // keyboard type
    const [keyboardType, setkeyboardType] = useState(keyboardTypes.char);

    // word type text
    const [textType, settextType] = useState("");
    textTypeRef.current = textType;

    // word type text
    const [gibbrishWord, setgibbrishWord] = useState("");

    // useEffect(() => {
    //     _createGibbrish();
    // }, []);

    useEffect(() => {
        _createGibbrish();
        settextType("");
    }, [props.donequestion])

    const _question = useMemo(() => {
        return props.quizData[props.donequestion]?.question.toUpperCase() || "";
    }, [props.donequestion]);

    const _hint = useMemo(() => {
        return props.quizData[props.donequestion]?.hintText || "";
    }, [props.donequestion]);

    const _changeKeyboardType = () => {
        if (keyboardTypes.char === keyboardType) {
            setkeyboardType(keyboardTypes.number);
        } else {
            setkeyboardType(keyboardTypes.char);
        }
    }

    // get array of empty space in sentence
    const _spaceIdexes = () => {
        const ansArray = _question.split("");

        let spaceIndexes = [];

        ansArray.forEach((item, index) => {
            if (item === " ") {
                spaceIndexes = [...spaceIndexes, index];
            }
        });

        return spaceIndexes;
    }

    // suffle array from basic array
    const _shuffleArray = (array) => {
        const charArray = [...array];

        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // get new array after remove empty space
    const _removeSpaces = () => {
        const ansArray = _question.split("");

        let newSentence = [];

        ansArray.forEach((item) => {
            if (item !== " ") {
                newSentence = [...newSentence, item];
            }
        });

        return newSentence;
    }

    const _createGibbrish = () => {
        const newWordListObj = _removeSpaces();

        const suffledArray = _shuffleArray(newWordListObj);

        console.log("suffeled array => ", suffledArray);

        const arrayIndexList = _spaceIdexes();

        for (const spaceIndex of arrayIndexList) {
            suffledArray.splice(spaceIndex, 0, " ");
        }

        setgibbrishWord(suffledArray);
    }

    // add text after click on alpha click
    const _addText = (latter) => {
        const arrayIndexList = _spaceIdexes();

        let splittedTextArray = [...textTypeRef.current.split("")];

        if (arrayIndexList.includes(textTypeRef.current.length + 1)) {
            splittedTextArray = [...splittedTextArray, `${latter} `];
        } else {
            splittedTextArray = [...splittedTextArray, `${latter}`];
        }

        settextType(splittedTextArray.join(""));
    }

    const _checkAnswer = () => {
        if (_question === textType) { // answer is correct
            props.onCorrectClick();
        } else { // answer is incorrect
            props.onNextClick()
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

            <ScrollView
                horizontal
                contentContainerStyle={styles.gibbrishWordContainer}
                bounces={false}
            >
                <Text style={styles.gibbrishWord}>{gibbrishWord}</Text>
            </ScrollView>

            <ScrollView
                horizontal
                contentContainerStyle={[styles.gibbrishWordContainer, {
                    width: "100%",
                }]}
                bounces={false}
            >
                <View style={styles.answerTypeConteiner}>
                    <Text style={styles.answerType}>
                        {textType || "Type here"}
                    </Text>
                </View>
            </ScrollView>

            <View height={20} />

            {/* hangman bottom keyboard container */}
            {
                !props.doneClick &&
                <View style={styles.bottomContainer}>
                    <HangmanKeyboard
                        keyBoardData={keyboardTypes.char === keyboardType ? alphaKeys : numberKeys}
                        onPressKey={(keyText) => _addText(keyText)}
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

            }

            {/* bottom button container */}
            {
                !props.doneClick &&
                <View style={styles.gibbrishBottom}>
                    <Button
                        title={'Correct'}
                        textStyle={styles.buttonText}
                        style={[styles.bottomButtons, {
                            backgroundColor: color.buttonColor1
                        }]}
                        onPress={() => _checkAnswer()}
                    />

                    <View width={20} />

                    <Button
                        title={'Next'}
                        textStyle={styles.buttonText}
                        style={[styles.bottomButtons, {
                            backgroundColor: color.fadeRedColor
                        }]}
                        onPress={() => props.onNextClick()}
                    />
                </View>
            }
        </View>
    )
}

export default GibbrishComponent

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: "100%",
        paddingHorizontal: "5%",
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
    bottomContainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
    },
    gibbrishWordContainer: {
        alignItems: 'center',
        alignSelf: 'center'
    },
    gibbrishWord: {
        color: color.white,
        fontSize: 26,
        fontFamily: fontFamily.avenirLight,
        backgroundColor: color.subBordorColor,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    answerTypeConteiner: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: color.textGray,
        padding: 15,
    },
    answerType: {
        fontSize: 26,
        color: color.textGray,
        textAlign: 'center',
    },
    buttonTitle: {
        color: color.statusBar,
        fontFamily: fontFamily.avenirBold,
    },
    gibbrishBottom: {
        flexDirection: 'row',
        // backgroundColor: color.subBordorColor,
        paddingHorizontal: "5%",
        borderRadius: 6,
        paddingVertical: 40,
    },
    buttonText: {
        fontSize: 17,
        color: '#22343C',
        letterSpacing: 3.09,
        fontFamily: appConstants.fontBold
    },
    bottomButtons: {
        flex: 1,
    },
});
