import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
    ScrollView, DeviceEventEmitter,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import * as validation from '../../utils/validation';
import constants from '../../utils/appConstants';
import assests from '../../common/assests';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import * as commonApi from '../../ServiceRequests/serviceContest';
import { Input, InputCreteContest, Button } from '../../components/customComponent';
import { dynamicSize } from '../../utils/responsive';
import { PopUpScreen, RoundPopUp } from '../../common/alertPop';
import { LoaderAction } from '../../redux/action';
import { SLIDER } from './../../utils/enum';
import defaultPoints from '../../utils/defaultCreatePoints';


const HUGiScreen = (props) => {
    const { gameType = "temp type" } = props;

    const dispatch = useDispatch();

    const [roundid, setRoundid] = useState(''); //roundid

    const [words, setwords] = useState(props?.item?.question || "");
    const [wordStatus, setwordStatus] = useState({ status: true, error: '' });
    const [isVaildWords, setisVaildWords] = useState(false);

    const [hint, sethint] = useState(props?.item?.hintText || '');
    const [hintStatus, setHintStatus] = useState({ status: true, error: '' });
    const [isVaildHint, setisVaildHint] = useState(false);

    const [basePointValue, setbasePointValue] = useState(props?.params?.basePointValue || defaultPoints.basePointDefault);

    const [seconds, setSeconds] = useState("30");
    const [minutes, setMinutes] = useState("00");

    const [hintValue, setHintValue] = useState(props?.params?.hintValue || 'Always');
    const [hintSeleValue, setHintSeleValue] = useState(props?.params?.hintValue || 'Always');
    const [chooseHintShow, setChooseHintShow] = useState(false);

    const [descriptionStatus, setDescriptionStatus] = useState({ status: true, error: '' });
    const [isVailddescription, setIsVaildDescription] = useState(false);

    const [onDemandPoint, setOnDemandPoint] = useState(props?.params?.onDemandPoint || defaultPoints.onDemandNegSliderDefault);

    // error controller
    const [errorMsgText, setErrorMsgText] = useState('');
    const [visiblerror, setVisibleError] = useState(false);

    useEffect(() => {
        (async () => {
            const id = await AsyncStorage.getItem('roundid');
            setRoundid(id);
        })();

        if (props.item) {
            setOldData();
        }
    }, []);


    const msToMS = (ms) => {
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / 1000 / 60) % 60);
        if (seconds < 9) seconds = `0${seconds}`;
        if (minutes < 9) minutes = `0${minutes}`;
        setSeconds(seconds);
        setMinutes(minutes);
    }

    const setOldData = () => {
        const {
            timeLimit, basePoints, hint, onDemandNegativePoints,
        } = props.item;
        console.log("question props => ", JSON.stringify(props.item));

        msToMS(timeLimit);
        setbasePointValue(basePoints);

        // set hint data
        setHintValue(hint !== 2 ? "On demand" : "Always");
        setHintSeleValue(hint !== 2 ? "On demand" : "Always");
        //! set hint data

        // set nagative demand point
        setOnDemandPoint(onDemandNegativePoints);
        //! set nagative demand point
    }

    const onTextChange = (title) => (text) => {
        if (title === "words") {
            setwords(text);
            if (validation.isEmpty(text)) {
                setwordStatus({ status: true, error: 'Please enter question' });
                setisVaildWords(true);
            } else {
                setwordStatus({ status: false, error: '' });
                setisVaildWords(false);
            }
        } else if (title === "hint") {
            sethint(text);
            if (validation.isEmpty(text)) {
                // setwordStatus({ status: true, error: 'Please enter question' });
                // setisVaildWords(true);
            } else {
                // setwordStatus({ status: false, error: '' });
                // setisVaildWords(false);
            }
        }
    }


    /**
     * Type == 1  Positive
     * Type == 2  Negative
     */
    const handleTimerClick = (type) => {

        let valueMinutes = parseInt(minutes) * 60;
        let valueSecond = parseInt(seconds);

        valueSecond = valueMinutes + valueSecond;

        if (type == 1) {//Plus Click
            // if (parseInt(valueMinutes) == 5) { return }
            // if (valueSecond == 59) {
            //     valueSecond = "00"
            //     if (parseInt(valueMinutes) == 0) {
            //         valueMinutes = "01"
            //     } else if (parseInt(valueMinutes) == 1) {
            //         valueMinutes = "02"
            //     } else if (parseInt(valueMinutes) == 2) {
            //         valueMinutes = "03"
            //     } else if (parseInt(valueMinutes) == 3) {
            //         valueMinutes = "04"
            //     } else if (parseInt(valueMinutes) == 4) {
            //         valueMinutes = "05"
            //     }
            // } else {
            //     if (valueSecond < 9) {
            //         valueSecond = "0" + (valueSecond + 5)
            //     } else {
            //         valueSecond = valueSecond + 5
            //     }
            // }

            if (valueSecond < 300) valueSecond = valueSecond + 5;

        }
        else { //Minus Click
            // let valueMinutes = minutes
            // let valueSecond = parseInt(seconds)
            // if (parseInt(valueSecond) == 30 && parseInt(valueMinutes) == 0) { return }
            // if (valueSecond == 0) {
            //     valueSecond = 59
            //     if (parseInt(valueMinutes) == 1) {
            //         valueMinutes = "00"
            //     } else if (parseInt(valueMinutes) == 2) {
            //         valueMinutes = "01"
            //     } else if (parseInt(valueMinutes) == 3) {
            //         valueMinutes = "02"
            //     } else if (parseInt(valueMinutes) == 4) {
            //         valueMinutes = "03"
            //     } else if (parseInt(valueMinutes) == 5) {
            //         valueMinutes = "04"
            //     }
            // } else {
            //     if (valueSecond < 11) {
            //         valueSecond = "0" + (valueSecond - 5)
            //     } else {
            //         valueSecond = valueSecond - 5
            //     }
            // }
            // setSeconds(valueSecond.toString())
            // setMinutes(valueMinutes.toString())

            if (valueSecond > 30) valueSecond = valueSecond - 5;
        }

        console.log("value minutes => ", valueMinutes);
        console.log("value seconds => ", valueSecond);

        valueMinutes = new Date("", "", "", "", "", valueSecond).getMinutes();
        valueSecond = new Date("", "", "", "", "", valueSecond).getSeconds();

        if (valueMinutes < 10) valueMinutes = `0${valueMinutes}`;
        if (valueSecond < 10) valueSecond = `0${valueSecond}`;

        setMinutes(valueMinutes.toString())
        setSeconds(valueSecond.toString())
    }


    const _onHintClick = (value) => {
        setHintValue(value)
        setHintSeleValue(value)
        setChooseHintShow(false)
    }

    const _applyAction = () => {
        // setDialogVisible(false)
        setVisibleError(false),
            errorMsgText ? null : Actions.pop()
    }

    const _onSubmit = async () => {
        try {
            if (validation.isEmpty(words)) {
                setwordStatus({ status: true, error: 'Please enter words!' });
                setisVaildWords(true);
            } else {

                // const t = minutes + ':' + seconds;

                // console.log("formData: collom time stamp => ", t);

                // const r = Number(t.split(':')[0]) * 60 + Number(t.split(':')[1]) * 1000;
                const r = parseInt(minutes * 60000) + parseInt(seconds * 1000);

                let formData = new FormData();
                formData.append('roundId', roundid);
                formData.append('timeLimit', r);
                formData.append('basePoints', basePointValue);
                formData.append('question', words);
                formData.append('onDemandNegativePoints', onDemandPoint);
                formData.append('hintText', hint);
                formData.append('questionType', 2);
                hintValue === "Always" ? formData.append('hint', 2) : formData.append('hint', 3);
                formData.append('gameType', props.gameType);

                console.log('formData::', formData);

                if (props.item) {
                    dispatch(LoaderAction(true))
                    const response = await commonApi.updateQuestionDetailsAPI(formData, dispatch, props?.item?._id);
                    if (response['status']) {
                        console.log('response.data::', response.data);
                        DeviceEventEmitter.emit('QuestionUpdate');
                        setTimeout(() => {
                            Actions.pop();
                        }, 1000);
                    }
                    else {
                        setTimeout(() => {
                            setErrorMsgText(response['message'])
                            setVisibleError(true)
                        }, 1000);
                    }
                } else {
                    dispatch(LoaderAction(true))
                    const response = await commonApi.savecreatequizAPI(formData, dispatch);
                    if (response['status']) {
                        console.log('response.data::', response.data);
                        DeviceEventEmitter.emit('QuestionUpdate');
                        setTimeout(() => {
                            Actions.pop();
                        }, 1000);
                    }
                    else {
                        setTimeout(() => {
                            setErrorMsgText(response['message'])
                            setVisibleError(true)
                        }, 1000);
                    }
                }
            }
            // Actions.popTo("roundTryScreen");
            // Actions.pop();
            // DeviceEventEmitter.emit('RoundUpdate');
        } catch (error) {
            console.log("error for create hangman => ", error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={`${gameType}`}
            />
            <View style={styles.innerContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.innerContainerScrollView}
                >
                    <Input
                        onChangeText={onTextChange("words")}
                        value={words}
                        setValue={'11111'}
                        keyboardType={'default'}
                        style={{ width: '100%' }}
                        blurOnSubmit={false}
                        placeholder={constants.WORDS_TEXT}
                        icon={assests.title}
                        isFiledImage
                        // autoCapitalize={'none'}
                        source={isVaildWords ? assests.info : (validation.isEmpty(words) ? '' : assests.check)}
                        labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        errorMessage={wordStatus['error']}
                    />

                    {
                        !props.params
                            ?
                            <>
                                {/* time component */}
                                <View style={styles.timeLimitContainer}>
                                    <Image source={assests.clock} />
                                    <Text style={styles.timeLimitText}>Time Limit</Text>
                                    <TouchableOpacity onPress={() => handleTimerClick(2)} style={{ marginLeft: 17 }}>
                                        {/* setTimerValue(timervalue > 1 ? timervalue - 1 : timervalue)}  */}
                                        <Image source={assests.minus} />
                                    </TouchableOpacity>
                                    <Text style={styles.timeMinSec} placeholder={'00'}>
                                        {minutes + ":" + seconds}
                                    </Text>
                                    <TouchableOpacity onPress={() => handleTimerClick(1)} style={{ marginLeft: 7, }}>
                                        {/* setTimerValue(timervalue < 60 ? timervalue + 1 : timervalue) */}
                                        <Image source={assests.pluss} />
                                    </TouchableOpacity>
                                </View>

                                {/* base points */}
                                <View style={{ marginTop: 30 }}>
                                    <Text style={styles.basePointText}>Base Points (0-100)</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Slider
                                            minimumValue={0}
                                            maximumValue={100}
                                            step={SLIDER.steps}
                                            onValueChange={(value) => setbasePointValue(value)}
                                            value={basePointValue}
                                            maximumTrackTintColor={'#274552'}
                                            minimumTrackTintColor={'#FCD274'}
                                            style={{ width: '100%', marginTop: 13, flex: 1, }} />
                                        <Text style={[styles.sliderTxt, { marginTop: 10, }]}>{basePointValue}</Text>
                                    </View>
                                </View>
                            </>

                            :
                            null
                    }
                    {/* hint */}
                    <Input
                        onChangeText={onTextChange("hint")}
                        value={hint}
                        keyboardType={'default'}
                        style={{ width: '100%', top: (props.params) ? -14 : undefined }}
                        blurOnSubmit={false}
                        placeholder={'Hint'}
                        icon={assests.infoWhite}
                        isFiledImage
                        // autoCapitalize={'none'}
                        // source={isVaildHint ? '' : assests.info}
                        source={isVaildHint ? assests.info : ''}
                        labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        errorMessage={hintStatus['error']}
                    />


                    {
                        !props.params &&
                        <InputCreteContest
                            style={{ width: '100%' }}
                            placeholder={hintSeleValue}
                            defaultTitle={"Show Hint"}
                            icon={assests.hintWhiteIcon}
                            isFiledImage
                            value={dynamicSize(2)}
                            source={isVailddescription ? assests.info : ''}
                            errorMessage={descriptionStatus['error']}
                            onPress={() => setChooseHintShow(true)}
                        />
                    }

                    {
                        !props.params && hintValue == 'On demand' && hintSeleValue === 'On demand' ?
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.onDemandNagPointsText}>On Demand Negative Points (0-100)</Text>
                                {/* <Slider maximumTrackTintColor={'#274552'} minimumTrackTintColor={'#FCD274'} style={{ width: '100%', marginTop: 13 }} /> */}

                                <View style={{ flexDirection: 'row' }}>
                                    <Slider
                                        minimumValue={0}
                                        maximumValue={100}
                                        step={SLIDER.steps}
                                        onValueChange={(value) => setOnDemandPoint(value)}
                                        value={onDemandPoint}
                                        maximumTrackTintColor={'#274552'}
                                        minimumTrackTintColor={'#FCD274'}
                                        style={{ width: '100%', marginTop: 13, flex: 1, }} />
                                    <Text style={[styles.sliderTxt, { marginTop: 10, }]}>{onDemandPoint}</Text>
                                </View>
                            </View>
                            : null
                    }

                    <Button
                        title={'Submit'}
                        textStyle={styles.buttonText}
                        style={styles['submitButton']}
                        onPress={() => {
                            _onSubmit();
                        }}
                    />

                </ScrollView>
            </View>

            <RoundPopUp
                title={'Hint'}
                option1={'Always'}
                option2={'On demand'}
                selectedLangauge={hintValue}
                onSetLanguage={(language) => setHintSeleValue(language)}
                onDonePress={(value) => _onHintClick(value)}
                isModalVisible={chooseHintShow}
                onCancel={() => setChooseHintShow(false)}
            />

            <PopUpScreen
                isModalVisible={visiblerror}
                msgText={errorMsgText}
                isError={true}
                onCloseModal={() => setVisibleError(false)}
                _applyAction={() => _applyAction()}
            />
        </SafeAreaView>
    )
}

export default HUGiScreen;
