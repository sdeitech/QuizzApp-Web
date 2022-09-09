import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image,
} from 'react-native';

import color from './../utils/color';
import assests from './../common/assests';
import * as fontFamily from './../utils/fontFamily';
import appConstants from './../utils/appConstants';
import PageIndicator from './PageIndicator';
import { dynamicSize } from '../utils/responsive';

const QuestionComponent = (props) => {
    const mounted = useRef();
    const {
        quizData, selectedAns, setselectedAns,
        setcurentQuizTime, rightIds, doneClick,
        wrongQuestions, onSingleDoneClick, gameData,
    } = props;

    const [answers, setanswers] = useState([]);

    useEffect(() => {
        if (quizData.length > 0 && quizData[props.donequestion].answerType === 5) {
            const newAnswers = [
                {
                    "answer": "True",
                    "correctAnswer": false,
                    "_id": 1
                },
                {
                    "answer": "False",
                    "correctAnswer": true,
                    "_id": 0
                },
            ];
            setanswers(newAnswers);
        } else {
            setanswers(quizData[props.donequestion]?.answers);
        }
    }, [quizData, props.donequestion]);

    useEffect(() => {
        setcurentQuizTime(quizData[props.donequestion]?.timeLimit);
    }, [quizData]);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            if (quizData[props.donequestion].answerType !== 2) {
                onSingleDoneClick();
            }
        }
    }, [selectedAns])

    // to get backgroundColor for question options
    const getNewColor = (i) => {
        const myColorNumber = i + 1;

        if (myColorNumber % 6 === 0) {
            return color.matchItColor;
        } else if (myColorNumber % 5 === 0) {
            return color.unscrambleColor;
        } else if (myColorNumber % 4 === 0) {
            return color.guessGoColor;
        } else if (myColorNumber % 3 === 0) {
            return color.hangmanColor;
        } else if (myColorNumber % 2 === 0) {
            return color.bingoColor;
        }

        return color.goldenColor;
    }

    // to get option name of the answer like (A, B, C, D)
    const getOptionName = (i) => {
        switch (i) {
            case 0:
                return 'A';
            case 1:
                return 'B';
            case 2:
                return 'C';
            case 3:
                return 'D';
            case 4:
                return 'E';
            case 5:
                return 'F';
        }
    }

    const _onAnswerSelect = (item) => {
        // Actions.leaderBoard();
        if (selectedAns.includes(item._id)) {
            const removedArray = selectedAns.filter(i => i !== item._id);
            setselectedAns(removedArray);
        } else {
            if (quizData[props.donequestion].answerType === 2) {
                setselectedAns(prev => [...prev, item._id]);
            } else {
                setselectedAns([item._id]);
            }
        }
    }

    const _answerRenderItems = ({ item, index }) => {
        let answerStatus = 'none';

        if (rightIds.length > 0 && !rightIds.includes(item._id) && selectedAns.includes(item._id)) {
            answerStatus = "wrong";
        } else if (selectedAns.includes(item._id) || rightIds.includes(item._id)) {
            answerStatus = "right";
        }

        const answerIcon = () => {
            if (answerStatus === 'wrong') {
                return (<Image
                    style={[styles.wrongAnsCross, { tintColor: getNewColor(index) }]}
                    source={assests.crossSmall}
                    resizeMode={'stretch'}
                />)
            } else if (answerStatus === "right") {
                return (<Image
                    style={[styles.wrongAnsCross, { tintColor: getNewColor(index) }]}
                    source={assests.check}
                    resizeMode={'stretch'}
                />)
            } else {
                return <Text style={styles.optionText}>{getOptionName(index)}</Text>
            }
        };

        return (
            <TouchableOpacity key={(index + 1).toString()}
                style={[styles.answerItemContainer]}
                onPress={() => {
                    _onAnswerSelect(item, index);
                }}
                disabled={doneClick}
            >
                <View style={[
                    styles.answerSpaceContainer,
                    {
                        backgroundColor: answerStatus !== "none" ? getNewColor(index) : '#fff'
                    }
                ]}>
                    <View
                        style={[
                            styles.answerLableIcon,
                            {
                                backgroundColor: answerStatus !== "none" ? '#fff' : getNewColor(index)
                            }
                        ]}
                    >
                        {
                            answerIcon()
                        }
                    </View>



                    <Text
                        style={[styles.answerText, {
                            // color: item.isSelected ? '#fff' : "#324b55"
                        }]}
                        numberOfLines={2}
                    >{item.answer}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.topViewContainer}>
            {/* question number title */}
            <Text
                style={styles.questionTextTitle}
            >
                {appConstants.QUESTION + " "}
                {(props.donequestion + 1) + '/'}
                <Text
                    style={styles.questionSubText}
                >
                    {props.questionLength}
                </Text>
            </Text>

            <PageIndicator
                totalQuestion={props.questionLength}
                doneQuestion={props.donequestion}
            />

            <Text style={styles.questionText}>
                {quizData[props.donequestion]?.question}
            </Text>

            {
                quizData.length > 0 &&
                <View style={styles.customAnswerList}>
                    {
                        answers?.map((item, index) => {
                            return _answerRenderItems({ item, index })
                        })
                    }
                </View>
            }
        </View>
    )
}

export default QuestionComponent;

const styles = StyleSheet.create({

    // 1
    topViewContainer: {
        paddingHorizontal: "5%",
        backgroundColor: '#324B55',
        paddingBottom: 26,
    },
    // 2
    questionTextTitle: {
        color: '#fff',
        marginTop: 36,
        fontSize: 20,
        letterSpacing: 0.4,
    },
    // 3
    questionSubText: {
        color: '#fff',
        marginTop: 36,
        fontSize: 12,
        letterSpacing: 0.4,
    },
    // 4
    questionText: {
        color: '#fff',
        marginTop: 36,
        marginBottom: 24,
        fontSize: 24,
        letterSpacing: 1.4,
        textAlign: 'center',
        paddingHorizontal: "8%",
        fontFamily: fontFamily.avenirBold,
    },
    // 6
    answerItemContainer: {
        width: "48%",
        marginTop: dynamicSize(12),
        flexDirection: 'row',
    },
    // 7
    answerSpaceContainer: {
        width: '100%',
        borderRadius: 10,
        // paddingVertical: 18,
        height: 65,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 14,
        flexDirection: 'row',
        borderWidth: 1,
        shadowColor: '#000000A6',
        elevation: 1,
        shadowColor: '#0000003B',
        shadowOffset: {
            width: 0,
            height: 14
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    // 8
    answerLableIcon: {
        height: 30,
        width: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    // 10
    optionText: {
        fontFamily: fontFamily.avenirBold,
        fontSize: 14,
    },
    // 9
    wrongAnsCross: {
        height: 14,
        width: 14,
        // tintColor: color.unscrambleColor,
    },
    // 11
    answerText: {
        flex: 1,
        color: "#324b55",
        fontFamily: fontFamily.avenirBold,
        fontSize: 18
    },
    // 5
    customAnswerList: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
})
