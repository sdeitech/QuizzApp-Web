import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image, TextInput,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import AsyncStorage from '@react-native-community/async-storage';
import SoundPlayer from 'react-native-sound-player'
import { useSelector } from 'react-redux';

import color from './../utils/color';
import assests from './../common/assests';
import * as fontFamily from './../utils/fontFamily';
import appConstants from './../utils/appConstants';
import PageIndicator from './PageIndicator';
import { dynamicSize } from '../utils/responsive';
import { Button } from './customComponent';
import QuestionFileView from './QuestionFileView';
import FlashcardContainer from './FlashcardContainer';

const QuestionComponentNew = (props) => {
    const mounted = useRef();

    // game socket selector
    const gameReducer = useSelector(state => state.gameReducer);

    const {
        quizData, selectedAns, setselectedAns,
        setcurentQuizTime, rightIds, doneClick,
        wrongQuestions, onSingleDoneClick, gameData,
        timeLimits, donequestion, totalTimer,
        questionTimeEnd, freeText, setfreeText,
        showHint, setshowHint, isModerator,
        onCorrectClick, onNextClick,
        isSingle, // if true all type of question will be enabeld
        executionMode, // question execution_mode based on round (if 2 => compititive)
        scoringType, // question scoring based on round (if 2 => automatic)
        bodyDisplayType, // bodyDisplayType is one type of currently displaying current main view
        latestAnswerPoint, setlatestAnswerPoint, // for get and set the points for the current question
    } = props;

    const [answers, setanswers] = useState([]);

    const [timerText, settimerText] = useState("0:00");
    const [progressPercentage, setprogressPercentage] = useState(100);
    const [mediaStatus, setmediaStatus] = useState(false);

    const [currentUserId, setcurrentUserId] = useState("");

    // useEffect(() => {
    //     let interval = null;
    //     try {
    //         if (timeLimits > 0 || donequestion === 0) {
    //             if (doneClick && interval) clearInterval(interval);
    //             interval = setInterval(() => {
    //                 console.log("interval calling => ");

    //                 const newMSeconds = timeLimits - 1000;

    //                 setcurentQuizTime(newMSeconds);
    //                 // let total_seconds = parseInt(Math.floor(newMSeconds / 1000));
    //                 // let total_minutes = parseInt(Math.floor(total_seconds / 60));

    //                 // total_seconds = total_seconds > -1 ? total_seconds : 0;
    //                 // total_minutes = total_minutes > -1 ? total_minutes : 0;
    //                 var total_minutes = Math.floor(newMSeconds / 60000);
    //                 var total_seconds = ((newMSeconds % 60000) / 1000).toFixed(0);

    //                 total_seconds = total_seconds > -1 ? total_seconds : 0;
    //                 total_minutes = total_minutes > -1 ? total_minutes : 0;

    //                 settimerText(`${total_minutes}:${total_seconds}`);

    //                 const timerPercent = (newMSeconds * 100) / totalTimer;

    //                 console.log("interval calling timer parent => ", timerPercent);
    //                 console.log("interval calling new m seconds => ", newMSeconds);
    //                 console.log("interval calling => total timer => ", totalTimer);

    //                 setprogressPercentage(Math.ceil(timerPercent));

    //                 if (newMSeconds === 0) {
    //                     questionTimeEnd();
    //                     if (interval) {
    //                         clearInterval(interval);
    //                         interval = null;
    //                     }
    //                 }
    //             }, 1000);
    //         }
    //     } catch (error) {
    //         alert(error)
    //     }

    //     return () => {
    //         if (interval) {
    //             clearInterval(interval);
    //             interval = null;
    //         }
    //     }
    // }, [donequestion, timeLimits, doneClick]);

    useEffect(() => {
        console.log("my current question => ", JSON.stringify(quizData[props.donequestion]));
        setshowHint(false);

        if (quizData.length > 0 && quizData[props.donequestion]?.answerType === 5) {
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

        setlatestAnswerPoint(0);
    }, [quizData, props.donequestion]);

    useEffect(() => {
        let newTimeLimit;
        if (quizData[props.donequestion]?.timeLimit < 1000) {
            newTimeLimit = quizData[props.donequestion]?.timeLimit * 1000;
        } else {
            newTimeLimit = quizData[props.donequestion]?.timeLimit;
        }
        setcurentQuizTime(newTimeLimit);
    }, [quizData]);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            if (quizData[props.donequestion]?.answerType !== 2 && selectedAns.length > 0) {
                onSingleDoneClick();
            }
        }
    }, [selectedAns]);

    useEffect(() => {
        setUserId();
    }, [])

    // set user id to state for check is user can answer or not
    const setUserId = async () => {
        const userId = await AsyncStorage.getItem('userid');
        setcurrentUserId(userId);
    }


    // to get backgroundColor for question options
    const getNewColor = (i) => {
        // const myColorNumber = i + 1;

        // if (myColorNumber % 6 === 0) {
        //     return color.matchItColor;
        // } else if (myColorNumber % 5 === 0) {
        //     return color.unscrambleColor;
        // } else if (myColorNumber % 4 === 0) {
        //     return color.guessGoColor;
        // } else if (myColorNumber % 3 === 0) {
        //     return color.hangmanColor;
        // } else if (myColorNumber % 2 === 0) {
        //     return color.bingoColor;
        // }

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

    const _answerRenderItems = ({ item, index, _canTouch }) => {
        let answerStatus = 'none';

        if (rightIds.length > 0) {
            if (rightIds.includes(item._id)) {
                answerStatus = "right";
            } else {
                answerStatus = "wrong";
            }
        }

        const backgroundColor = () => {
            if (!_canTouch || (executionMode === 2 && doneClick && rightIds.length === 0)) {
                if (executionMode === 2) {
                    if (selectedAns.includes(item._id)) {
                        return color.textLightGray;
                    } else {
                        return color.white;
                    }
                }

                return color.textLightGray;
            } else if (!doneClick) {
                if (selectedAns.includes(item._id)) {
                    return color.goldenColor;
                } else {
                    return color.white;
                }
            } else {
                if (doneClick && rightIds.length === 0) {
                    return color.textLightGray;
                } else if (answerStatus === 'wrong') {
                    if (selectedAns.includes(item._id)) return color.fadeRedColorDark;
                    return color.fadeRedColor;
                } else {
                    if (selectedAns.includes(item._id)) return color.bingoColorDark;
                    return color.bingoColor;
                }
            }
        }

        const answerIcon = () => {
            // return <Text style={styles.optionText}>{getOptionName(index)}</Text>
            if (!doneClick || !_canTouch) {
                return <Text style={styles.optionText}>{getOptionName(index)}</Text>
            } else if (answerStatus === 'wrong') {
                return (
                    <Image
                        style={[styles.wrongAnsCross, { tintColor: backgroundColor() }]}
                        source={assests.crossSmall}
                        resizeMode={'contain'}
                    />
                )
            } else if (answerStatus === "right") {
                return (
                    <Image
                        style={[styles.wrongAnsCross, { tintColor: backgroundColor() }]}
                        source={assests.check_true}
                        resizeMode={'contain'}
                    />
                )
            } else {
                return <Text style={styles.optionText}>{getOptionName(index)}</Text>
            }
        };

        const textColorAns = () => {
            let colorOfText = "#324b55";
            if ((doneClick && rightIds.length && !rightIds.includes(item._id)) && _canTouch) {
                colorOfText = color.white;
            }

            return colorOfText;
        }

        const iconBackgroundColor = () => {
            let colorOfTextBG = color.white;

            if (!doneClick && !selectedAns.includes(item._id)) {
                colorOfTextBG = color.goldenColor;
            }

            if (executionMode === 2 && rightIds.length === 0 && doneClick && !selectedAns.includes(item._id)) {
                colorOfTextBG = color.textLightGray;
            }

            return colorOfTextBG;
        }

        return (
            <TouchableOpacity key={(index + 1).toString()}
                style={[styles.answerItemContainer]}
                onPress={() => {
                    _onAnswerSelect(item, index);
                }}
                disabled={doneClick}
            >
                <View style={[
                    styles.answerSpaceContainer, {
                        backgroundColor: backgroundColor()
                    }
                ]}>
                    <View
                        style={[
                            styles.answerLableIcon,
                            {
                                backgroundColor: iconBackgroundColor()
                            }
                        ]}
                    >
                        {
                            answerIcon()
                        }
                    </View>



                    <Text
                        style={[styles.answerText, {
                            color: textColorAns()
                        }]}
                    // numberOfLines={2}
                    >{item.answer}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const hintText = (text) => {
        return (
            <View style={styles.hintTextContainer}>
                <Image
                    source={assests.hintWhiteIcon}
                />

                <View width={10} />

                <Text style={styles.hintText}>Hint: </Text>

                <View width={10} />

                <Text style={styles.hintTextAnswer}>{text}</Text>
            </View>
        );
    }

    const hintButton = () => {
        return (
            <View style={styles.hintTextContainer}>
                <Image
                    source={assests.hintWhiteIcon}
                />

                <View width={10} />

                <TouchableOpacity onPress={() => setshowHint(true)}>
                    <Text style={styles.hintText}>Show Hint</Text>
                </TouchableOpacity>
                {/* <Button
                    title={'Show Hint'}
                    textStyle={[styles.buttonText]}
                    style={[styles.addButton]}
                    onPress={() => setshowHint(true)}
                    disabled={doneClick}
                /> */}
            </View>
        );
    }

    const _isTouchable = useMemo(() => {
        let touchEvent = undefined;

        if (!isSingle && executionMode === 1 && gameReducer?.currentAssignedUser !== currentUserId) {
            touchEvent = "none";
        }

        return touchEvent;
    }, [currentUserId, gameReducer]);

    const _answersView = () => {
        if (quizData.length > 0) {
            if (quizData[props.donequestion]?.answerType !== 3 || doneClick) {
                return (
                    <>
                        <View
                            pointerEvents={_isTouchable}
                            style={[styles.answerViewContainer]}
                        >

                            {
                                (doneClick && (gameReducer?.currentAssignedUser === currentUserId || isSingle)) &&
                                <Text style={styles.doneLableText}>
                                    {`Correct answers`}
                                </Text>
                            }

                            <View style={styles.customAnswerList}>
                                {
                                    answers?.map((item, index) => {
                                        const _canTouch = _isTouchable === undefined ? true : false;
                                        return _answerRenderItems({ item, index, _canTouch })
                                    })
                                }
                            </View>

                            {/* hint container */}
                            <View style={styles.hintContainer}>
                                {
                                    quizData[props.donequestion]?.hintText && !doneClick
                                        ?
                                        (quizData[props.donequestion]?.hint === 2)
                                            ?
                                            hintText(quizData[props?.donequestion]?.hintText)
                                            :
                                            <>
                                                {
                                                    showHint
                                                        ?
                                                        hintText(quizData[props.donequestion].hintText)
                                                        :
                                                        hintButton()
                                                }
                                            </>
                                        :
                                        null
                                }
                            </View>
                        </View>
                    </>
                )
            } else {
                return (
                    <>
                        {
                            ((gameReducer?.currentAssignedUser === currentUserId) || (_isTouchable === undefined) || isSingle) &&
                            <TextInput
                                style={styles.freeTextStyle}
                                placeholder={'Type your answer here'}
                                placeholderTextColor={color.textLightGray}
                                value={freeText}
                                onChangeText={(text) => setfreeText(text)}
                                editable={!doneClick}
                            />
                        }
                    </>
                )
            }
        }
    }

    return (
        <View style={styles.topViewContainer}>


            <View style={[styles.headerProgressContainer]}>
                {/* {
                    !doneClick &&
                    <ProgressCircle
                        percent={progressPercentage}
                        radius={24}
                        borderWidth={3}
                        color={color.goldenColor}
                        shadowColor={'#fff'}
                        bgColor={color.questionBGColor}
                    >
                        <Text style={styles.headerCircleVal}>{timerText}</Text>
                    </ProgressCircle>
                } */}
            </View>

            <View style={styles.questionContainer}>
                <View
                    height={30}
                />

                <QuestionFileView
                    questionDetail={quizData[props.donequestion]}
                />

                <PageIndicator
                    totalQuestion={props.questionLength}
                    doneQuestion={props.donequestion}
                    wrongQuestions={props.wrongQuestions}
                />

                {
                    (doneClick && (gameReducer?.currentAssignedUser === currentUserId || isSingle)) &&
                    <Text style={[styles.pointsText, {
                        color: latestAnswerPoint < 1 ? color.fadeRedColor : color.onlineGreen
                    }]}>
                        {`You got ${latestAnswerPoint} points`}
                    </Text>
                }

                {
                    quizData[props.donequestion]?.answerType === 4
                        ?
                        <View style={{ paddingVertical: 18 }}>
                            <FlashcardContainer
                                _question={quizData[props.donequestion]?.question}
                                _answers={answers}
                                isModerator={isModerator}
                            />
                        </View>
                        :
                        <Text style={styles.questionText}>
                            {quizData[props.donequestion]?.question}
                        </Text>
                }



            </View>

            <View height={10} />

            {
                quizData[props.donequestion]?.answerType === 4
                    ?
                    !doneClick && isModerator &&
                    <View style={styles.tabooBottom}>
                        <Button
                            title={'Correct'}
                            textStyle={styles.buttonText}
                            style={[styles.bottomButtons, {
                                backgroundColor: color.buttonColor1
                            }]}
                            onPress={() => onCorrectClick()}
                        />

                        <View width={20} />

                        <Button
                            title={'Next'}
                            textStyle={styles.buttonText}
                            style={[styles.bottomButtons, {
                                backgroundColor: color.fadeRedColor
                            }]}
                            onPress={() => onNextClick()}
                        />
                    </View>
                    :
                    <>
                        {
                            _answersView()
                        }
                        {
                            (quizData[props.donequestion]?.answerType === 2 || quizData[props.donequestion]?.answerType === 3) &&
                                !doneClick &&
                                (gameReducer?.currentAssignedUser === currentUserId || executionMode === 2 || isSingle)
                                ?
                                <Button
                                    title={'Submit'}
                                    textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                                    style={styles['playButton']}
                                    onPress={() => onSingleDoneClick()}
                                />
                                :
                                null
                        }

                        {
                            executionMode === 2 && isModerator && scoringType === 1 &&
                            <Button
                                title={'Next'}
                                textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                                style={styles['nextButton']}
                                onPress={() => props.compititiveNext()}
                            />
                        }
                    </>
            }

        </View>
    )
}

export default QuestionComponentNew;

const styles = StyleSheet.create({

    // 1
    topViewContainer: {
        paddingHorizontal: "2%",
        // backgroundColor: '#324B55',
        top: -46,
        paddingBottom: 26,
        marginHorizontal: "5%",
    },
    questionContainer: {
        backgroundColor: color.subBordorColor,
        paddingHorizontal: "5%",
        borderRadius: 6,
    },
    headerProgressContainer: {
        marginTop: 80,
        top: 20,
        alignSelf: 'center',
        zIndex: 4,
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
    headerCircleVal: {
        fontFamily: fontFamily.avenirBold,
        fontSize: 11,
        color: '#fff',
    },
    // 4
    questionText: {
        color: '#fff',
        marginTop: 18,
        marginBottom: 24,
        fontSize: 20,
        letterSpacing: 1.4,
        textAlign: 'center',
        paddingHorizontal: "8%",
        fontFamily: fontFamily.avenirBold,
    },
    hintTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        alignSelf: 'stretch',
    },
    hintText: {
        color: color.goldenColor,
        fontFamily: fontFamily.avenirBold,
        fontSize: 20,
    },
    hintTextAnswer: {
        flex: 1,
        color: color.white,
        fontFamily: fontFamily.avenirMedium,
        fontSize: 20,
    },
    doneLableText: {
        color: color.white,
        justifyContent: 'flex-end',
        textAlign: 'center',
        marginVertical: 6,
    },
    pointsText: {
        color: color.white,
        justifyContent: 'flex-end',
        textAlign: 'center',
        marginTop: 18,
        marginVertical: 6,
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
        fontFamily: fontFamily.avenirBold,
        fontSize: 16
    },
    // 5
    customAnswerList: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: color.subBordorColor,
        // paddingHorizontal: "5%",
        // borderRadius: 6,
        alignItems: 'center',
        // paddingVertical: 10,
    },
    answerViewContainer: {
        backgroundColor: color.subBordorColor,
        paddingHorizontal: "5%",
        borderRadius: 6,
        paddingVertical: 10,

    },
    freeTextStyle: {
        alignSelf: 'stretch',
        backgroundColor: color.subBordorColor,
        color: color.white,
        paddingHorizontal: "5%",
        paddingVertical: 20,
        borderRadius: 6,
        alignItems: 'center',
        fontSize: 20,
    },
    playButton: {
        marginTop: 20,
        backgroundColor: color.goldenColor,
        marginHorizontal: 30,
    },
    nextButton: {
        marginTop: 20,
        backgroundColor: color.goldenColor,
        marginHorizontal: 30,
    },

    buttonText: {
        fontSize: 12,
        letterSpacing: 3.09,
        fontFamily: appConstants.fontBold,
        color: color.statusBar,
    },
    addButton: {
        height: undefined,
        backgroundColor: color.goldenColor,
        paddingVertical: 8,
        justifyContent: 'flex-start',
        alignSelf: 'flex-end',
        top: 10,
    },
    hintContainer: {
        // marginBottom: 10,
    },
})
