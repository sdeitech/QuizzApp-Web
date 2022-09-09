import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import { Button } from './customComponent';
import color from '../utils/color';
import * as fontFamily from '../utils/fontFamily';
import PageIndicator from './PageIndicator';
import FlashcardContainer from './FlashcardContainer';

const TabooComponent = (props) => {

    // game socket selector
    const gameReducer = useSelector(state => state.gameReducer);

    const {
        donequestion, timeLimits, doneClick,
        quizData, setcurentQuizTime, totalTimer,
    } = props;

    const [timerText, settimerText] = useState("0:00");

    const [currentUserId, setcurrentUserId] = useState("");

    const [progressPercentage, setprogressPercentage] = useState(100);

    // useEffect(() => {
    //     let interval = null;
    //     try {
    //         // alert(timeLimits);
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
    //                     props.onNextClick();
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
        setcurentQuizTime(quizData[props.donequestion]?.timeLimit);
    }, [quizData]);

    const _question = useMemo(() => {
        return quizData[donequestion]?.question || "";
    }, [donequestion])

    const _answers = useMemo(() => {
        return quizData[donequestion]?.answers || [];
    }, [donequestion])

    useEffect(() => {
        setUserId();
    }, [])

    // set user id to state for check is user can answer or not
    const setUserId = async () => {
        const userId = await AsyncStorage.getItem('userid');
        setcurrentUserId(userId);
    }

    return (
        <View style={styles.container}>


            {/* <View onPress={() => { }} style={[styles.headerProgressContainer]}>
                {
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
                }
            </View> */}

            <View style={styles.innerContainer}>

                <PageIndicator
                    totalQuestion={props.questionLength}
                    doneQuestion={props.donequestion}
                    wrongQuestions={props.wrongQuestions}
                />

                <View height={20} />

                <FlashcardContainer
                    _question={_question}
                    _answers={_answers}
                    isModerator={props.isModerator}
                    playable={gameReducer?.currentAssignedUser === currentUserId}
                />
            </View>

            <View height={10} />


            {
                !doneClick && props.isModerator &&
                <View style={styles.tabooBottom}>
                    <Button
                        title={'Correct'}
                        textStyle={styles.buttonText}
                        style={[styles.bottomButtons, {
                            backgroundColor: color.buttonColor1
                        }]}
                        onPress={() => props.onCorrectClick()}
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

export default TabooComponent

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: "100%",
        paddingHorizontal: "10%",
    },
    innerContainer: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: color.subBordorColor,
        paddingHorizontal: "5%",
        borderRadius: 6,
        paddingBottom: 30,
        paddingTop: 10,
    },
    questionContainer: {
        backgroundColor: color.subBordorColor,
        paddingHorizontal: "5%",
        borderRadius: 6,
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
    tabooBottom: {
        flexDirection: 'row',
        backgroundColor: color.subBordorColor,
        paddingHorizontal: "5%",
        borderRadius: 6,
        paddingVertical: 10,
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
    headerProgressContainer: {
        marginTop: 20,
        top: 20,
        alignSelf: 'center',
        zIndex: 4,
    },
    headerCircleVal: {
        fontFamily: fontFamily.avenirBold,
        fontSize: 11,
        color: '#fff',
    },
});
