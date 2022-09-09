import React, { useEffect, useMemo, useState } from 'react';
import {
    StyleSheet, View, Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from 'react-redux';

import color from './../utils/color'
import PageIndicator from './PageIndicator';
import UnscrambleBottomUnderscore from './UnscrambleBottomUnderscore';
import UnscrambleSuffleList from './UnscrambleSuffleList';

const UnscrambleComponent = (props) => {

    // game socket selector
    const gameReducer = useSelector(state => state.gameReducer);


    // user id
    const [currentUserId, setcurrentUserId] = useState("");

    // current feeled words
    const [selectedWords, setselectedWords] = useState([]);

    // current feeled words index
    const [selectedWordsIndex, setselectedWordsIndex] = useState([]);

    // is current false
    const [currentFalse, setcurrentFalse] = useState(false);

    useEffect(() => {
        console.info("all props => ", JSON.stringify(props));
        setselectedWords([]);
        setselectedWordsIndex([]);
        setcurrentFalse(false);
        props.setlatestAnswerPoint(0);
    }, [props?.quizData, props.donequestion]);


    useEffect(() => {
        setUserId();
    }, [])

    // set user id to state for check is user can answer or not
    const setUserId = async () => {
        const userId = await AsyncStorage.getItem('userid');
        setcurrentUserId(userId);
    }

    // make alphabates list from string
    const suffName = useMemo(() => {
        let mainQ = props?.quizData[props.donequestion]?.question_shuffle;

        // split the word
        mainQ = mainQ.toUpperCase().split('');

        // remove the space
        mainQ = mainQ.filter(x => x !== " ");

        return mainQ;
    }, [props?.quizData, props.donequestion]);

    // make alphabates list from orignal array
    const originalName = useMemo(() => {
        let mainQ = props?.quizData[props.donequestion]?.question;

        // split the word
        mainQ = mainQ.toUpperCase().split('');

        // remove the space
        mainQ = mainQ.filter(x => x !== " ");

        return mainQ;
    }, [props?.quizData, props.donequestion]);

    // get know answer
    const _onPressWordClick = (item, index) => {
        setselectedWords(prev => [...prev, item]);
        setselectedWordsIndex(prev => [...prev, index]);

        if (originalName[selectedWords.length] === item) {
            if (originalName.length === selectedWords.length + 1) {
                props.onCorrectClick();
            }
        } else {
            props.onNextClick();
            setcurrentFalse(true);
        }
    }

    return (
        <View style={styles.topViewContainer}>
            <View style={styles.container}>
                <View height={20} />

                <PageIndicator
                    totalQuestion={props.questionLength}
                    doneQuestion={props.donequestion}
                    wrongQuestions={props.wrongQuestions}
                />

                {
                    props.doneClick && gameReducer?.currentAssignedUser === currentUserId &&
                    <Text style={[styles.pointsText, {
                        color: props.latestAnswerPoint < 1 ? color.fadeRedColor : color.onlineGreen
                    }]}>
                        {`You got ${props.latestAnswerPoint} points`}
                    </Text>
                }

                <View height={20} />

                {/* hangman top Container */}
                <View style={styles.topContainer}>

                    {/* suffeled word */}
                    <UnscrambleSuffleList
                        suffName={suffName}
                        selectedWordsIndex={selectedWordsIndex}
                        onPress={_onPressWordClick}
                        currentFalse={currentFalse}
                        doneClick={props.doneClick}
                        playable={gameReducer?.currentAssignedUser === currentUserId}
                    />

                    {/* bottom underscore list */}
                    {
                        gameReducer?.currentAssignedUser === currentUserId &&
                        <UnscrambleBottomUnderscore
                            suffName={suffName}
                            selectedWords={selectedWords}
                            currentFalse={currentFalse}
                        />
                    }

                    {/* hint text */}
                    {
                        props?.quizData[props.donequestion]?.question_shuffle?.hintText &&
                        <Text style={styles.hintText}>
                            {props?.quizData[props.donequestion]?.question_shuffle?.hintText || ""}
                        </Text>
                    }
                </View>
            </View>
        </View>
    )
}

export default UnscrambleComponent;

const styles = StyleSheet.create({
    topViewContainer: {
        paddingHorizontal: "1%",
        // backgroundColor: '#324B55',
        // top: -46,
        paddingBottom: 26,
        marginHorizontal: "5%",
    },
    container: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // flex: 1,
        width: "100%",
        paddingHorizontal: "5%",
        backgroundColor: color.subBordorColor,
        borderRadius: 6,
    },
    topContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        // backgroundColor: color.fadeRedColor,
    },
    hintText: {
        marginTop: 30,
        color: color.white
    },
    pointsText: {
        justifyContent: 'flex-end',
        textAlign: 'center',
        marginTop: 18,
        marginVertical: 6,
    },
});
