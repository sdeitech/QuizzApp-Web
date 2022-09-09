import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
    ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';

import * as commonApi from './../../ServiceRequests/serviceContest';
import assests from '../../common/assests';
import color from '../../utils/color';
import constants from '../../utils/appConstants';
import styles from './styles';
import AdmHeader from './components/AdmHeader';
import BottomView from './components/BottomView';
import { Alert, PopUpScreen, QuestionContantAlert } from '../../common/alertPop';
import ContestantsList from './components/ContestantsList';
import QuestionComponent from '../../components/QuestionComponent';
import { Button } from '../../components/customComponent';
import { LoaderAction } from '../../redux/action';

// contestance data
const testData = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
];

const AdmContestPlay = (props) => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.authReducer.loader);

    const [errorMsgText, setErrorMsgText] = useState('');
    const [visiblerror, setVisibleError] = useState(false);

    // quiz states
    const selectedAnsRef = useRef(null);
    const [quizData, setquizData] = useState([]);
    const [donequestion, setdonequestion] = useState(0);
    const [selectedAns, setselectedAns] = useState([]);
    const [rightIds, setrightIds] = useState([]);
    const [wrongQuestions, setwrongQuestions] = useState([]);
    const [doneClick, setdoneClick] = useState(false);

    selectedAnsRef.current = selectedAns;
    // !!quiz

    const [curentQuizTime, setcurentQuizTime] = useState(0);

    const [chackedIndex, setchackedIndex] = useState(1);

    const [data, setdata] = useState(testData);

    const [questionBoxDialog, setquestionBoxDialog] = useState(false);
    const [exitDialogShow, setexitDialogShow] = useState(false);

    const [bodyDisplayType, setbodyDisplayType] = useState(0);

    const [currentQueNo, setcurrentQueNo] = useState(2);

    // for set status if single user game then he can not see some values
    const [isSingle, setisSingle] = useState(false);

    // data for temp display from props
    const { roundId, title, roundName, gameType, playerType } = props.contestInfo;
    const { _id: gameId } = props.gameData;

    useEffect(() => {
        _setData();
    }, []);

    const setGameType = () => {
        switch (gameType.toLowerCase()) {
            case 'quiz':
                setbodyDisplayType(1);
                getQuestionList();
                break;
            default:
                break;
        }
    }

    const getQuestionList = async () => {
        console.log("get contest data => ", JSON.stringify(props.contestInfo))
        try {
            dispatch(LoaderAction(true))

            console.log("roundID ==>>> ", roundId);

            const response = await commonApi.RoundquestionsAPI({}, dispatch, roundId);

            if (response['status']) {
                console.log("round questions => ", JSON.stringify(response.data));

                setquizData(response.data);
            }
            else {
                setTimeout(() => {
                    setErrorMsgText(response.message);
                    setVisibleError(true);
                }, 1000);
            }
        } catch (error) {
            alert(error);
            setTimeout(() => {
                setErrorMsgText(error);
                setVisibleError(true);
            }, 1000);
        }
    }

    const _setData = () => {
        // console.log("set data new type props => ", JSON.stringify(quizData));
        if (playerType === 1) {
            setisSingle(true);
        }

        setGameType();
    }

    const _displayReturntype = () => {
        switch (bodyDisplayType) {
            case 0:
                return (
                    <ContestantsList
                        data={data}
                    />
                )
            case 1:
                return (
                    <View style={{}}>
                        {/* <ScrollView> */}
                        <QuestionComponent
                            questionLength={quizData.length}
                            donequestion={donequestion}
                            roundId={roundId}
                            quizData={quizData}
                            selectedAns={selectedAns}
                            setselectedAns={setselectedAns}
                            setcurentQuizTime={setcurentQuizTime}
                            rightIds={rightIds}
                            doneClick={doneClick}
                            wrongQuestions={wrongQuestions}
                            onSingleDoneClick={() => _onSubmitClick()}
                            gameData={props.gameData}
                        />
                        {/* </ScrollView> */}
                    </View>
                );
            default:
                return;
        }
    }

    const _submitAnswerToServer = async (isCorrect) => {
        try {
            // dispatch(LoaderAction(true))

            const questionData = quizData[donequestion];

            console.log(questionData,'questionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
            const timeUsed = questionData?.timeLimit - curentQuizTime;
            const selectedAnswer = selectedAnsRef.current;

            const formData = new FormData();

            formData.append("gameId", gameId);
            formData.append("roundQuestionId", questionData?._id);
            formData.append("selectedAnswer", selectedAnswer.join(','));
            formData.append("isCorrect", isCorrect);
            formData.append("score", 10);
            formData.append("timeAlloted", questionData?.timeLimit);
            formData.append("timeUsed", timeUsed);
            formData.append("roomId", props?.contestInfo?.response?._id)

            console.log("my form data => ", JSON.stringify(formData));

            const response = await commonApi.submitQuestion(formData, dispatch);

            if (response['status']) {
                // alert(JSON.stringify(response.data));
            }
            else {
                // setTimeout(() => {
                // setErrorMsgText(response.message);
                // setVisibleError(true);
                // }, 1000);
            }
        } catch (error) {
            // setTimeout(() => {
            //     setErrorMsgText(error);
            //     setVisibleError(true);
            // }, 1000);
        }
    }

    const _questionResult = (rightAnsIds) => {
        console.log("answers ids => true ", JSON.stringify(rightAnsIds));
        console.log("answers ids => selected ", JSON.stringify(selectedAnsRef.current));

        // let rightAnswer = true;
        // if (selectedAnsRef.current.length === rightAnsIds.length) {
        // for (const item of rightAnsIds) {
        //     rightAnswer = selectedAnsRef.current.includes(item);
        //     if (!rightAnswer) break;
        // }
        // } else {
        //     rightAnswer = false;
        // }

        let rightAnswer = false;
        if (quizData[donequestion]?.answerType === 5) {
            if (quizData[donequestion]?.answerTypeBoolean && selectedAnsRef.current === 1) {
                rightAnswer = true;
            } else {
                rightAnswer = false;
            }
        } else {
            if (selectedAnsRef.current.length > 0) {
                rightAnswer = true;
                for (const item of selectedAnsRef.current) {
                    rightAnswer = rightAnsIds.includes(item);
                    if (!rightAnswer) break;
                }
            }
        }

        _submitAnswerToServer(rightAnswer);

        return rightAnswer;
    }

    const _onSubmitClick = () => {
        try {
            if (quizData.length > 0) {
                setdoneClick(true);

                const rightAnsObject = quizData[donequestion]?.answers?.filter((item) => item.correctAnswer === true);
                const rightAnsIds = rightAnsObject.map((item) => item._id);

                if (_questionResult(rightAnsIds)) {
                    if ((donequestion + 1) === quizData.length) {
                        Actions.leaderBoard();
                    } else {
                        _nextQuestion();
                    }
                } else {
                    setrightIds(rightAnsIds);
                    setTimeout(() => {
                        if ((donequestion + 1) === quizData.length) {
                            Actions.leaderBoard();
                        } else {
                            _nextQuestion();
                        }
                    }, 3000);
                }
            }
        } catch (error) {
        }
    }

    const _nextQuestion = () => {
        try {
            setdoneClick(false);
            setdonequestion(prev => {
                const newDoneNumber = prev + 1;
                setcurentQuizTime(quizData[newDoneNumber].timeLimit)
                return newDoneNumber;
            });
        } catch (error) {
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={color.statusBar}
                barStyle="light-content"
            />
            <AdmHeader
                title={title}
                subTitle={`${roundName} (${gameType})`}
                notifyNumbers={3}
                gameData={gameData}
                timeLimits={curentQuizTime}
                donequestion={donequestion}
                setcurentQuizTime={setcurentQuizTime}
                questionTimeEnd={() => _onSubmitClick()}
                totalTimer={quizData[donequestion]?.timeLimit}
                doneClick={doneClick}
            />
            {
                !loader &&
                <View style={styles.innerContainer}>

                    {/* top title */}
                    {
                        bodyDisplayType === 0 &&
                        <View style={styles.upperTitle}>
                            <Text style={styles.contestants}>
                                {constants.CONTESTANTS}
                            </Text>

                            <TouchableOpacity
                                style={styles.upperArrowConteiner}
                                onPress={() => setbodyDisplayType(1)}
                            >
                                <Image
                                    style={styles.upIcon}
                                    source={assests.upWhiteArrow}
                                />
                            </TouchableOpacity>
                        </View>
                    }

                    {
                        _displayReturntype()
                    }

                    {/* bottom title */}
                    {
                        bodyDisplayType !== 0 && !isSingle &&
                        <View style={styles.downTitle}>
                            <TouchableOpacity
                                style={styles.upperArrowConteiner}
                                onPress={() => setbodyDisplayType(0)}
                            >
                                <Image
                                    style={styles.upIcon}
                                    source={assests.downWhiteArrow}
                                />
                            </TouchableOpacity>
                        </View>
                    }

                    {
                        (bodyDisplayType === 1 && quizData[donequestion]?.answerType === 2) &&
                        <Button
                            title={'Submit'}
                            textStyle={styles.buttonText}
                            style={styles.submitButton}
                            onPress={() => _onSubmitClick()}
                            disabled={doneClick}
                        />
                    }

                    <BottomView
                        onExitClick={() => { setexitDialogShow(true) }}
                        onFlipCamera={() => { alert('its working') }}
                        onInvitePress={() => Actions.addByName()}
                        onCoinsPress={() => Actions.giveScore()}
                        isSinglePlayer={isSingle}
                    />

                    {/* <QuestionContantAlert
                        isModalVisible={questionBoxDialog}
                        onBackClick={() => setquestionBoxDialog(false)}
                        totalQuestion={totalQ}
                        currentQueNo={currentQueNo}
                        answerData={tempAnswers}
                    /> */}

                    <PopUpScreen
                        isModalVisible={visiblerror}
                        msgText={errorMsgText}
                        isError={true}
                        onCloseModal={() => setVisibleError(false)}
                        _applyAction={() => setVisibleError(false)}
                    />

                    <Alert
                        // title={'Are you sure!'}
                        heading={'Are you sure, you want to leave?'}
                        isModalVisible={exitDialogShow}
                        buttonTitle={'Leave'}
                        cancleTitle={'Cancel'}
                        onCancel={() => { setexitDialogShow(false) }}
                        logout={() => { Actions.reset("Tabs") }}
                    />

                </View>
            }
        </SafeAreaView>
    )
}

export default AdmContestPlay;
