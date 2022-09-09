import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Switch,
    DeviceEventEmitter,
} from 'react-native';
import Video from 'react-native-video';
import DocumentPicker from 'react-native-document-picker';

import { styles } from './styles';
// components
import { SLIDER } from './../../utils/enum';
import appConstants from '../../common/appConstants';
import MaineHeader from '../../common/headerWithText'
import assests from '../../common/assests';
import { Actions } from 'react-native-router-flux';
import { useSelector, useDispatch } from 'react-redux'
import Slider from '@react-native-community/slider';
import { SaveTo, WariningPopUp, AddImage, RoundPopUp, AnswersPop, QuestionTypePop, Alert } from '../../common/alertPop'
import * as validation from '../../utils/validation';
import * as commonApi from '../../ServiceRequests/serviceContest';
import { getLoginData } from '../../utils/session';
import { LoaderAction } from '../../redux/action';
import AsyncStorage from '@react-native-community/async-storage';
import { PopUpScreen } from '../../common/alertPop'
import { getFontSize, dynamicSize } from '../../utils/responsive'

import {
    Button,
    InputIcons, InputCreteContest, Input
} from '../../components/customComponent';
import ImagePicker from 'react-native-image-crop-picker';
import color from '../../utils/color';
import QuestionFileView from '../../components/QuestionFileView';
import gameTypes from '../../utils/gameTypes';
import defaultPoints from '../../utils/defaultCreatePoints';

const FILE_TYPES = {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    LINK: 'link',
};

function DiscussionDetails(props) {
    const answerDataRef = useRef(null);

    useEffect(() => {
        console.log("my parm => ", props.params);
    }, [])

    const isTaboo = () => props.gameType === gameTypes.Taboo;


    const [answerData, setAnswerData] = useState([]);
    answerDataRef.current = answerData;
    const [timervalue, setTimerValue] = useState('00:30')
    const [seconds, setSeconds] = useState(props?.params?.seconds || "30")
    const [minutes, setMinutes] = useState(props?.params?.minutes || "00")
    const [isAddImage, setAddImage] = useState(false)
    const [image, setImage] = useState('');

    const [fileType, setfileType] = useState(FILE_TYPES.IMAGE);

    const [isDeleteDialog, setisDeleteDialog] = useState(false);

    const [deleteAnsIndex, setdeleteAnsIndex] = useState(undefined);

    const [visibility, setVisbility] = useState(false);
    const [visibilityValue, setVisbilityValue] = useState('Single');
    const [visibilitySave, setVisibilitySave] = useState('');


    const [hastag, sethashTag] = useState(false);
    const [hastagValue, setHastagValue] = useState('Type hastag');
    const [answerText, setAnswerText] = useState('');
    const [hastagText, setHastagText] = useState('');
    const [hint, sethint] = useState(props?.item?.hintText || '');
    const [addquestionText, setAddQuestionText] = useState(props?.item?.question || '');

    const [negSliderValue, setNegSliderValue] = useState(props?.params?.nagative.value || defaultPoints.negSliderDefault);

    const [basePointValue, setbasePointValue] = useState(props?.params?.basePointValue || defaultPoints.basePointDefault);
    const [onDemandPoint, setOnDemandPoint] = useState(props?.params?.onDemandPoint || defaultPoints.onDemandNegSliderDefault);
    const [metaData, setMetaData] = useState(false)

    const [chooseHintShow, setChooseHintShow] = useState(false);

    const [hintValue, setHintValue] = useState(props?.params?.hintValue || 'Always');
    const [hintSeleValue, setHintSeleValue] = useState(props?.params?.hintValue || 'Always');

    const [questionType, setquestionType] = useState(false);
    const [selectedQuestionType, setselectedQuestionType] = useState('Single Select');
    const [selectedQuestionTypesave, setselectedQuestionTypeSave] = useState('Single Select');

    //Error Dialog
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [errorMsgText, setErrorMsgText] = useState('');
    const [visiblerror, setVisibleError] = useState(false);

    const [titleStatus, setTitleStatus] = useState({ status: true, error: '' });
    const [isVaildTitlw, setIsVaildTitle] = useState(false);

    const [descriptionStatus, setDescriptionStatus] = useState({ status: true, error: '' });
    const [isVailddescription, setIsVaildDescription] = useState(false);

    const [hintStatus, setHintStatus] = useState({ status: true, error: '' });
    const [isVaildHint, setisVaildHint] = useState(false);

    const [questionTypeStatus, setquestionTypeStatus] = useState({ status: true, error: '' });
    const [isVaildQuestionType, setisVaildQuestionType] = useState(false);

    const [languageStatus, setlanguadeStatus] = useState({ status: true, error: '' });
    const [isVaildlanguage, setIsVaildlanguage] = useState(false);

    const [imageStatus, setImageStatus] = useState({ status: true, error: '' });
    const [isVaildImage, setIsVaildImage] = useState(false);

    // if select from device
    const [newSelectedImage, setnewSelectedImage] = useState(false);

    // if select from online library
    const [newSelectedLibrary, setnewSelectedLibrary] = useState(false);

    const [roundid, setRoundid] = useState(''); //roundid

    const [isEnableQuestionType, setisEnableQuestionType] = useState(true);
    // const toggleAnswerSwitch = () => setisEnableQuestionType(previousState => !previousState);

    const [isEnabled, setIsEnabled] = useState(props?.params?.nagative.status || true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [editedIndex, seteditedIndex] = useState(undefined);


    const dispatch = useDispatch();


    const msToMS = (ms) => {
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / 1000 / 60) % 60);
        if (seconds < 9) seconds = `0${seconds}`;
        if (minutes < 9) minutes = `0${minutes}`;
        setSeconds(seconds);
        setMinutes(minutes);
    }

    const getQuestiontype = (id) => {
        switch (id) {
            case 1:
                return "Single Select";
            case 2:
                return "Multi Select";
            case 3:
                return "Free Text";
            case 4:
                return "Flashcard";
            case 5:
                return "True or False";
            default:
                return "Single Select";
        }
    }

    useEffect(() => {
        async function fetchMyAPI() {
            const data = await AsyncStorage.getItem('userid')
            const id = await AsyncStorage.getItem('roundid')
            console.log('/*/**/**/*/*/', id);
            setRoundid(id);
            // dispatch(LoaderAction(true))
            // const response = await commonApi.saveROUNDGetAPI(0, dispatch,data)

            // if (response['status']) {
            //     if (response.data != null && response.data != undefined) {
            //         // setListarr(response.data)
            //         response.data.map((map) => {if(map.contestId == data){setRoundid(map._id)}})
            //     }
            // }
        }

        fetchMyAPI();

        if (props.item) {
            setOldData();
        }
    }, [])

    const setOldData = () => {
        const {
            timeLimit, basePoints, negativeScoring,
            negativeBasePoints, hint, onDemandNegativePoints,
            answerType, file, answers, answerTypeBoolean,
            fileType,
        } = props.item;
        console.log("question props => ", JSON.stringify(props.item));

        msToMS(timeLimit);
        setbasePointValue(basePoints);
        setIsEnabled(negativeScoring);
        setNegSliderValue(negativeBasePoints);

        // set hint data
        setHintValue(hint !== 2 ? "On demand" : "Always");
        setHintSeleValue(hint !== 2 ? "On demand" : "Always");
        //! set hint data

        // set question type
        setselectedQuestionType(getQuestiontype(answerType));
        setselectedQuestionTypeSave(getQuestiontype(answerType));
        //! set question type

        // set image 
        setImage(file);
        //! set image 

        setfileType(fileType);

        // set nagative demand point
        setOnDemandPoint(onDemandNegativePoints);
        //! set nagative demand point

        // set answer
        if (answerType === 5) {
            setisEnableQuestionType(answerTypeBoolean);
        } else {
            setAnswerData(answers);
        }
        //! set answer
    }

    const imagePickerAcion = (isCamera) => {
        if (isCamera) {
            ImagePicker.openCamera({
                cropping: true,
                width: 300,
                height: 200,
            }).then(image => {
                setnewSelectedImage(true);
                console.log(image);
                setImage(image.path)
                setAddImage(false)
                setImageStatus({ status: false, error: '' })
                setIsVaildImage(false)
                setfileType(FILE_TYPES.IMAGE);
            });

        }
        else {
            ImagePicker.openPicker({
                cropping: true,
                width: 300,
                height: 200,
            }).then(image => {
                setnewSelectedImage(true);
                // debugger
                console.log(image);
                setImage(image.path)
                setAddImage(false)
                setImageStatus({ status: false, error: '' })
                setIsVaildImage(false)
                setfileType(FILE_TYPES.IMAGE);
            });
        }
    }


    const removeImage = () => {
        try {
            setnewSelectedImage(false);
            setImage('');
            setAddImage(false)
            setImageStatus({ status: true, error: '' })
            setIsVaildImage(false)
            setfileType(FILE_TYPES.IMAGE);
        } catch (error) {
        }
    }

    const videoPickerAcion = () => {
        ImagePicker.openPicker({
            mediaType: 'video',
            width: 300,
            height: 200,
        }).then(image => {
            setnewSelectedImage(true);
            // debugger
            console.log(image);
            setImage(image.path);
            setAddImage(false);
            setImageStatus({ status: false, error: '' });
            setIsVaildImage(false);
            setfileType(FILE_TYPES.VIDEO);
        });
    }

    const audioPickerAcion = () => {
        DocumentPicker.pick({
            type: [DocumentPicker.types.audio],
        }).then(image => {
            setnewSelectedImage(true);
            // debugger
            console.log(image);
            setImage(image.uri);
            setAddImage(false);
            setImageStatus({ status: false, error: '' });
            setIsVaildImage(false);
            setfileType(FILE_TYPES.AUDIO);
        });
    }

    const _onVisibilityMode = () => {
        setVisbilityValue(visibilitySave)
        setVisbility(false)
    }

    const _onAnswerSelection = () => {
        const newAnswerData = [...answerData];

        const checkSameQuestion = () => {
            let isSameQuestion = false;
            if (editedIndex !== undefined && newAnswerData[editedIndex]['answer'] === answerText.trim()) {
                isSameQuestion = false;
            } else if (answerData.findIndex(x => x.answer === answerText) > -1) {
                isSameQuestion = true;
            }
            return isSameQuestion;
        }

        if (checkSameQuestion()) {
            setTimeout(() => {
                setErrorMsgText('You can not add same answers');
                setVisibleError(true);
            }, 1000);
        } else if (editedIndex !== undefined) {
            console.log("anwer click edit => ", editedIndex);
            console.log("anwer click edit => answers => ", newAnswerData[editedIndex].answer);

            newAnswerData[editedIndex]['answer'] = answerText;
            setAnswerData(newAnswerData);
        } else if (answerData.length < 6) {
            if (selectedQuestionTypesave === "Free Text" || selectedQuestionTypesave === "Flashcard" || isTaboo()) {
                setAnswerData([...answerData, { 'answer': answerText, correctAnswer: true }]);
            } else {
                if (validation.isEmpty(answerText) == false) {
                    if (answerData.length > 0) {
                        setAnswerData([...answerData, { 'answer': answerText.trim(), correctAnswer: false }]);
                    } else {
                        setAnswerData([...answerData, { 'answer': answerText.trim(), correctAnswer: true }]);
                    }
                }
            }
        } else {
            setTimeout(() => {
                setErrorMsgText('You can add maximum 6 answers');
                setVisibleError(true);
            }, 1000);
        }
        sethashTag(false);
        setAnswerText('');
        seteditedIndex(undefined);
    }

    const _onAnswerModalClose = () => {
        sethashTag(false);
        setAnswerText('');
        seteditedIndex(undefined);
    }

    const _onHintClick = (value) => {
        setHintValue(value)
        setHintSeleValue(value)
        setChooseHintShow(false)
    }

    const _onQuestionType = (value) => {
        setAnswerData([]);

        setselectedQuestionType(value)
        setselectedQuestionTypeSave(value)
        setquestionType(false)

        setquestionTypeStatus({ status: false, error: '' });
        setisVaildQuestionType(false);
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

    const _applyAction = () => {
        // setDialogVisible(false)
        setVisibleError(false),
            errorMsgText ? null : Actions.pop()
    }

    const changeTextField = (type) => (text) => {
        if (type === "addquestion") {
            setAddQuestionText(text);
            if (validation.isEmpty(text)) {
                setTitleStatus({ status: true, error: 'Please enter question' })
                setIsVaildTitle(true)
            } else {
                setTitleStatus({ status: false, error: '' })
                setIsVaildTitle(false)
            }
        } else if (type === "hint") {
            sethint(text);
            if (validation.isEmpty(text)) {
                setHintStatus({ status: true, error: 'Please enter hint' });
                setisVaildHint(true);
            } else {
                setHintStatus({ status: false, error: '' });
                setisVaildHint(false);
            }
        }
    }

    const onClickselectLanguage = (language) => {
        setselectedQuestionType(language);
    }

    const answerCloseClick = (index) => {
        setisDeleteDialog(true);
        setdeleteAnsIndex(index);
    }

    const answerEditClick = (index) => {
        sethashTag(true);
        setAnswerText(answerData[index].answer);
        seteditedIndex(index);
    }

    const fileVisibleComponent_test = () => {
        // image param is any file selected or not
        if (image) {
            if (fileType === 'video') {
                return (
                    <QuestionFileView questionDetail={{ file: image, fileType: "video" }} />
                )
            }

            if (fileType === 'audio') {
                return (
                    <QuestionFileView questionDetail={{ file: image, fileType: "audio" }} />
                )
            }

            if (fileType === 'link') {
                return (
                    <QuestionFileView questionDetail={{ file: image, fileType: "link" }} />
                )
            }
            return (
                <Image
                    imageStyle={{ borderRadius: 10 }}
                    style={{ height: '100%', width: '100%', borderRadius: 10 }}
                    source={{ uri: image }}
                />
            )
        } else {
            return (
                <View>
                    <Image style={{ alignSelf: 'center' }} source={assests.upload} />
                    <Text style={{ marginTop: 8.5, color: '#ADBAC1', fontFamily: appConstants.AirbnbCerealAppBook, fontSize: 16 }}>Tap to add image, audio, video</Text>
                </View>
            )
        }
    }

    const fileVisibleComponent = () => {
        // image param is any file selected or not
        if (image) {
            if (fileType === 'video') {
                return (
                    <>
                        <Video
                            source={{ uri: image }}
                            onBuffer={() => { }}
                            onError={(error) => { alert(error) }}
                            style={{ height: '100%', width: '100%' }}
                            paused
                            resizeMode={'stretch'}
                        />

                        <Image
                            source={assests.play}
                            style={styles.playVideoIcon}
                        />
                    </>
                )
            }

            if (fileType === 'audio') {
                return (
                    <>
                        <Image
                            source={assests.audio}
                            style={styles.playAudioIcon}
                        />
                    </>
                )
            }
            return (
                <Image
                    imageStyle={{ borderRadius: 10 }}
                    style={{ height: '100%', width: '100%', borderRadius: 10 }}
                    source={{ uri: image }}
                />
            )
        } else {
            return (
                <View>
                    <Image style={{ alignSelf: 'center' }} source={assests.upload} />
                    <Text style={{ marginTop: 8.5, color: '#ADBAC1', fontFamily: appConstants.AirbnbCerealAppBook, fontSize: 16 }}>Tap to add image, audio, video</Text>
                </View>
            )
        }
    }

    const _onSelectMedia = (imagePath, fileType) => {
        setnewSelectedLibrary(true);
        setImage(imagePath)
        setImageStatus({ status: false, error: '' })
        setIsVaildImage(false)
        setfileType(fileType);
    }

    const onPhotoGallery = () => {
        try {
            setAddImage(false);
            Actions.photoLibrary({
                mediaType: 'image',
                onSelect: (imagePath) => _onSelectMedia(imagePath, FILE_TYPES.IMAGE)
            });
        } catch (error) {
            // alert(error);
        }
    }

    const onVideoGallery = () => {
        try {
            setAddImage(false);
            Actions.photoLibrary({
                mediaType: 'video',
                onSelect: (imagePath) => _onSelectMedia(imagePath, FILE_TYPES.VIDEO)
            });
        } catch (error) {
            // alert(error);
        }
    }

    const onAudioGallery = () => {
        try {
            setAddImage(false);
            Actions.photoLibrary({
                mediaType: 'audio',
                onSelect: (imagePath) => _onSelectMedia(imagePath, FILE_TYPES.AUDIO)
            });
        } catch (error) {
            // alert(error);
        }
    }

    const onYoutube = () => {
        try {
            setAddImage(false);
            Actions.youtubeLibrary({ onSelect: (urlPath) => _onSelectMedia(urlPath, FILE_TYPES.LINK) });
        } catch (error) {
            // alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={`Create Quiz ${isTaboo() ? "Taboo" : "Questions"}`}
            />
            <View style={{ backgroundColor: '#22343C', flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingTop: 20 }}>
                    <View style={{ alignSelf: 'flex-end', position: 'absolute', right: 0, top: -20 }}>
                        <Image resizeMode={'contain'} source={assests.backLogo} />
                    </View>
                    <View style={styles.innerContainer}>
                        <View style={{ display: isTaboo() ? 'none' : undefined }}>
                            {
                                image
                                    ?
                                    <View style={{ width: '100%' }}>

                                        <TouchableOpacity
                                            onPress={() => setAddImage(true)}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#324B55',
                                                height: fileType === 'audio' ? undefined : 200,
                                                width: "100%",
                                            }}
                                        >
                                            {
                                                fileVisibleComponent_test()
                                            }
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                removeImage()
                                            }}
                                            style={{
                                                backgroundColor: color.goldenColor,
                                                padding: 5,
                                                borderRadius: 10,
                                                position: 'absolute',
                                                right: 10,
                                                top: 10
                                            }}
                                        >
                                            <Image style={{ height: 10, width: 10 }} resizeMode={'contain'} source={assests.crossSmall} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity
                                        onPress={() => setAddImage(true)}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#324B55',
                                            height: fileType === 'audio' ? undefined : 200,
                                            width: "100%",
                                        }}
                                    >
                                        {
                                            fileVisibleComponent_test()
                                        }
                                    </TouchableOpacity>
                            }

                            <Text style={styles.imageErrorStyle}>
                                {imageStatus.error}
                            </Text>
                        </View>

                        {
                            !props.params &&
                            <>
                                <View style={{ marginTop: 29, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={assests.clock} />
                                    <Text style={{ fontSize: 13, letterSpacing: 1.33, textAlign: 'left', fontFamily: appConstants.fontReqular, color: '#fff', marginLeft: 10 }}>Time Limit</Text>
                                    <TouchableOpacity onPress={() => handleTimerClick(2)} style={{ marginLeft: 17 }}>
                                        {/* setTimerValue(timervalue > 1 ? timervalue - 1 : timervalue)}  */}
                                        <Image source={assests.minus} />
                                    </TouchableOpacity>
                                    <Text value={timervalue} style={{ fontSize: 20, fontFamily: appConstants.fontReqular, letterSpacing: 2.04, textAlign: 'left', marginLeft: 8, color: '#fff' }} placeholder={'00'}>
                                        {minutes + ":" + seconds}
                                    </Text>
                                    <TouchableOpacity onPress={() => handleTimerClick(1)} style={{ marginLeft: 7, }}>
                                        {/* setTimerValue(timervalue < 60 ? timervalue + 1 : timervalue) */}
                                        <Image source={assests.pluss} />
                                    </TouchableOpacity>
                                </View>


                                <View style={{ marginTop: 30 }}>
                                    <Text style={{ color: '#fff', fontFamily: appConstants.fontReqular, fontSize: 13, letterSpacing: 1.33 }}>Base Points (0-100)</Text>
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
                                    {/* <Slider maximumTrackTintColor={'#274552'} minimumTrackTintColor={'#FCD274'} style={{ width: '100%', marginTop: 13 }} /> */}
                                </View>

                                <View style={[{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }]}>
                                    <Image source={assests.negativeSign} />
                                    <Text style={{ fontSize: 13, letterSpacing: 1.33, textAlign: 'left', fontFamily: appConstants.AirbnbCerealAppMedium, color: '#fff', marginHorizontal: 8 }}>{'Negative Scoring'}</Text>
                                    <Switch
                                        trackColor={{ false: "#324B55", true: "#88D8B8" }}
                                        thumbColor={isEnabled ? 'white' : "#88D8B8"}
                                        ios_backgroundColor="#324B55"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                    <TouchableOpacity>
                                        <Image style={{ marginLeft: 5 }} source={assests.info2} />
                                    </TouchableOpacity>
                                </View>

                                {
                                    isEnabled &&
                                    <View style={{ marginTop: 30 }}>
                                        <Text style={{ color: '#fff', fontFamily: appConstants.fontReqular, fontSize: 13, letterSpacing: 1.33 }}>Negative Base Points (0-{basePointValue})</Text>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Slider
                                                minimumValue={0}
                                                maximumValue={basePointValue}
                                                step={SLIDER.steps}
                                                onValueChange={(value) => setNegSliderValue(value)}
                                                value={negSliderValue}
                                                maximumTrackTintColor={'#274552'}
                                                minimumTrackTintColor={'#FCD274'}
                                                style={{ width: '100%', marginTop: 13, flex: 1, }}
                                            />
                                            <Text style={[styles.sliderTxt, { marginTop: 10, }]}>{negSliderValue}</Text>
                                        </View>
                                    </View>
                                }
                            </>
                        }



                        {/* <InputIcons
                            containerStyle={{ marginTop: 40 }}
                            icon={assests.help}
                            title={'Add Question'}
                            placeholder={'Type here'}
                            onChangeText={(text) => setAddQuestionText(text)}
                        /> */}

                        <Input
                            onChangeText={changeTextField("addquestion")}
                            value={addquestionText}
                            keyboardType={'default'}
                            style={{ width: '100%' }}
                            blurOnSubmit={false}
                            placeholder={`Add ${isTaboo() ? "Word" : "Question"}`}
                            icon={assests.help}
                            isFiledImage
                            // autoCapitalize={'none'}
                            source={isVaildTitlw ? assests.info : ''}
                            labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                            errorMessage={titleStatus['error']}
                        />

                        {/* <InputIcons
                            containerStyle={{ marginTop: 40 }}
                            icon={assests.help}
                            title={'Select Question Type'}
                            onPress={() => setquestionType(true)}
                            touch={true}
                            info={true}
                            value={selectedQuestionType}
                            placeholder={'Single Select'}
                        /> */}

                        {
                            !isTaboo() &&
                            <>
                                <InputCreteContest
                                    style={{ width: '100%' }}
                                    placeholder={selectedQuestionTypesave}
                                    defaultTitle={'Select Question Type'}
                                    icon={assests.help}
                                    isFiledImage
                                    value={dynamicSize(2)}
                                    // source={isVaildscoring ? assests.info : ''}
                                    // errorMessage={scoringStatus['error']}
                                    onPress={() => setquestionType(true)}
                                />
                                {
                                    questionTypeStatus.error
                                        ?
                                        <Text style={[styles.bottomErrorStyle, { left: 20, top: -14 }]}>
                                            {questionTypeStatus.error}
                                        </Text>
                                        :
                                        null
                                }

                                {/* <InputIcons
                                    containerStyle={{ marginTop: 40 }}
                                    icon={assests.help}
                                    title={'Select Question Type'}
                                    placeholder={'Single Select'}
                                /> */}

                                {/** Player Type */}
                                {/* <InputIcons
                                containerStyle={{ marginTop: 40 }}
                                icon={assests.console}
                                title={'Player Type'}
                                placeholder={'Single Select'}
                                touch={true}
                                value={visibilityValue}
                                onPress={() => setVisbility(true)}
                            /> */}

                                {/* <InputIcons
                                containerStyle={{ marginTop: 40 }}
                                icon={assests.infoWhite}
                                title={'Hint'}
                                placeholder={'Choose hint'}
                            /> */}


                                {/* <InputIcons
                                icon={assests.infoWhite}
                                touch={true}
                                title={'Hint'}
                                value={hintValue}
                                placeholder={'Choose hint'}
                                onPress={() => setChooseHintShow(true)}
                            /> */}


                                <Input
                                    onChangeText={changeTextField("hint")}
                                    value={hint}
                                    keyboardType={'default'}
                                    style={{ width: '100%' }}
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
                                    <>
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
                                        {
                                            hintValue == 'On demand' && hintSeleValue === 'On demand' ?
                                                <View style={{ marginTop: 20 }}>
                                                    <Text style={{ color: '#fff', fontFamily: appConstants.fontReqular, fontSize: 13, letterSpacing: 1.33 }}>On Demand Negative Points (0-{basePointValue})</Text>
                                                    {/* <Slider maximumTrackTintColor={'#274552'} minimumTrackTintColor={'#FCD274'} style={{ width: '100%', marginTop: 13 }} /> */}

                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Slider
                                                            minimumValue={0}
                                                            maximumValue={basePointValue}
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
                                    </>
                                }
                            </>
                        }

                        {/* // if  question type is true or false display only switch */}
                        {
                            selectedQuestionTypesave === "True or False"
                                ?
                                <>
                                    <View style={[{ marginTop: 20, flexDirection: 'row', alignItems: 'center', marginBottom: dynamicSize(20) }]}>
                                        <Image source={assests.negativeSign} />
                                        <Text
                                            style={{ fontSize: 13, letterSpacing: 1.33, textAlign: 'left', fontFamily: appConstants.AirbnbCerealAppMedium, color: '#fff', marginHorizontal: 8 }}
                                        >
                                            {'Select Answer'}
                                        </Text>
                                        {/* <Switch
                                            trackColor={{ false: "#324B55", true: "#88D8B8" }}
                                            thumbColor={isEnableQuestionType ? 'white' : "#88D8B8"}
                                            ios_backgroundColor="#324B55"
                                            onValueChange={toggleAnswerSwitch}
                                            value={isEnableQuestionType}
                                        /> */}

                                        <TouchableOpacity>
                                            <Image style={{ marginLeft: 5 }} source={assests.info2} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.trueFalseContainer}>
                                        <TouchableOpacity
                                            style={[styles.trueFalseButton]}
                                            onPress={() => setisEnableQuestionType(true)}
                                        >
                                            {
                                                isEnableQuestionType ?
                                                    <View style={{
                                                        backgroundColor: '#22343C', borderRadius: 13, alignSelf: 'center',
                                                        width: 26, height: 26, justifyContent: 'center', marginHorizontal: 10
                                                    }}>
                                                        <Image source={assests.checkMarkSelected}
                                                            style={{ alignSelf: 'center' }} />
                                                    </View> : <View style={{ width: 46 }}></View>
                                            }

                                            <Text style={styles.trueFalseText}>True</Text>
                                        </TouchableOpacity>

                                        <View width={10} />

                                        <TouchableOpacity
                                            style={[styles.trueFalseButton]}
                                            onPress={() => setisEnableQuestionType(false)}
                                        >
                                            {
                                                !isEnableQuestionType ?
                                                    <View style={{
                                                        backgroundColor: '#22343C', borderRadius: 13, alignSelf: 'center',
                                                        width: 26, height: 26, justifyContent: 'center', marginHorizontal: 10
                                                    }}>
                                                        <Image source={assests.checkMarkSelected}
                                                            style={{ alignSelf: 'center' }} />
                                                    </View> : <View style={{ width: 46 }}></View>
                                            }

                                            <Text style={styles.trueFalseText}>False</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                                :
                                <>
                                    {answerData.length != 0 ?
                                        <View style={{ marginTop: 45 }}>
                                            <Text style={{ color: '#fff', fontFamily: appConstants.fontReqular, fontSize: 13, letterSpacing: 1.33 }}>
                                                Select {isTaboo() ? "Taboo" : "Answer"}
                                            </Text>
                                        </View>
                                        : null}
                                    <FlatList
                                        key={'brand'}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsHorizontalScrollIndicator={false}
                                        data={answerData}
                                        extraData={({ item }) => item.key}
                                        renderItem={({ item, index }) => (
                                            <View>
                                                <View style={{ marginTop: 15, paddingVertical: 20, backgroundColor: '#324B55', borderRadius: 8 }}>
                                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                                        <TouchableOpacity onPress={() => handleAnsSelectionClick(index)}
                                                            style={{ flexDirection: 'row', flex: 1, }}>
                                                            {
                                                                !isTaboo() && item.correctAnswer ?
                                                                    <View style={{
                                                                        backgroundColor: '#22343C', borderRadius: 13, alignSelf: 'center',
                                                                        width: 26, height: 26, justifyContent: 'center', marginHorizontal: 10
                                                                    }}>
                                                                        <Image source={assests.checkMarkSelected}
                                                                            style={{ alignSelf: 'center' }} />
                                                                    </View> : <View style={{ width: 46 }}></View>
                                                            }
                                                            <Text style={{
                                                                color: '#ADBAC1', fontFamily: appConstants.fontReqular,
                                                                fontSize: 16, flex: 1, alignSelf: 'center', paddingVertical: 10
                                                            }}>{item.answer}</Text>
                                                        </TouchableOpacity>


                                                        <View>
                                                            <TouchableOpacity
                                                                onPress={() => answerCloseClick(index)}
                                                                style={{ paddingHorizontal: 10, right: 0, top: -13 }}
                                                            >
                                                                <Image style={{}} source={assests.mark} />
                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                onPress={() => answerEditClick(index)}
                                                                style={{ paddingHorizontal: 10, right: 0, top: 0 }}
                                                            >
                                                                <Image style={{}} source={assests.edit} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>

                                                </View>
                                            </View>
                                        )}
                                        ListFooterComponent={() => <View height={20} />}
                                    />

                                    {
                                        answerData.length === 6
                                            ?
                                            <View>
                                                <Text
                                                    style={{
                                                        top: -8,
                                                        color: color.fadeRedColor,
                                                        fontFamily: appConstants.fontReqular,
                                                        fontSize: 13,
                                                        letterSpacing: 1.33,
                                                        marginBottom: 20,
                                                    }}
                                                >
                                                    You can not add more than 6 {isTaboo() ? "taboo" : "answer"}s
                                                </Text>
                                            </View>
                                            :
                                            <Button
                                                title={
                                                    answerData.length == 0
                                                        ?
                                                        `Add ${isTaboo() ? "Taboo Word" : "Answer"}`
                                                        :
                                                        `Add More ${isTaboo() ? "Taboo Word" : "Answer"}s`
                                                }
                                                textStyle={styles.buttonText}
                                                style={[styles['signupButton'], { marginTop: !props.params ? 35 : 10 }]}
                                                onPress={() => sethashTag(true)}
                                            />
                                    }
                                </>
                        }

                        <Button
                            title={'Save & Exit'}
                            textStyle={styles.buttonText}
                            style={[styles['saveButton'], { backgroundColor: '#FF5485' }]}
                            onPress={() => saveContestClick()}
                        />
                    </View>

                    <AddImage
                        isAuido={true}
                        isModalVisible={isAddImage}
                        onCancel={() => setAddImage(false)}
                        onCamera={() => imagePickerAcion(true)}
                        onPhotoGallery={() => onPhotoGallery()}
                        onGallery={() => imagePickerAcion(false)}
                        onVideo={() => onVideoGallery()}
                        onAudio={() => onAudioGallery()}
                        onYoutube={() => onYoutube()}
                    // onVideo={() => videoPickerAcion()}
                    // onAudio={() => audioPickerAcion()}
                    />

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

                    <QuestionTypePop
                        title={''}
                        isModalVisible={questionType}
                        onCancel={() => setquestionType(false)}
                        selectedLangauge={selectedQuestionType}
                        onSetLanguage={onClickselectLanguage}
                        onDonePress={(text) => _onQuestionType(text)}
                        scoringType={props?.scoring}
                    />

                    {/* <RoundPopUp
                        title={'Hint'}
                        option1={'Always'}
                        option2={'On demand'}
                        selectedLangauge={hintSeleValue}
                        onSetLanguage={(language) => setHintSeleValue(language)}
                        onDonePress={(value) => _onHintClick(value)}
                        isModalVisible={chooseHintShow}
                        onCancel={() => setChooseHintShow(false)}
                    /> */}

                    <RoundPopUp
                        title={'Player Type'}
                        option1={'Single'}
                        option2={'Multiplayer'}
                        selectedLangauge={visibilitySave}
                        onSetLanguage={(language) => setVisibilitySave(language)}
                        onDonePress={() => _onVisibilityMode()}
                        isModalVisible={visibility}
                        onCancel={() => setVisbility(false)}
                    />

                    <AnswersPop
                        hashtagValue={''}
                        title={editedIndex !== undefined ? 'Edit Answer' : `Add ${isTaboo() ? "Taboo" : "Answer"}`}
                        buttonText={editedIndex !== undefined ? 'Update' : 'Done'}
                        placeHolder={`Type ${isTaboo() ? "taboo" : "answer"}`}
                        value={answerText}
                        onChangeText={(text) => setAnswerText(text)}
                        onDonePress={() => _onAnswerSelection()}
                        isModalVisible={hastag}
                        onCancel={() => _onAnswerModalClose()}
                    />

                    <Alert
                        // icon={assests.close_pink}
                        title={'Are you sure you want to delete?'}
                        isModalVisible={isDeleteDialog}
                        buttonTitle={'Yes'}
                        cancleTitle={'No'}
                        heading={''}
                        onCancel={() => {
                            setisDeleteDialog(false)
                        }}
                        logout={() => deleteAnswerClick(deleteAnsIndex)}
                    />

                    <PopUpScreen
                        isModalVisible={visiblerror}
                        msgText={errorMsgText}
                        isError={true}
                        onCloseModal={() => setVisibleError(false)}
                        _applyAction={() => _applyAction()}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    function getQuestionId(text) {
        switch (text) {
            case "Single Select":
                return 1;
            case "Multi Select":
                return 2;
            case "Free Text":
                return 3;
            case "Flashcard":
                return 4;
            case "True or False":
                return 5;
            default:
                return 1;
        }
    }

    //Api Call

    async function saveContestClick() {
        // return

        // var t = minutes + ':' + seconds;
        // var r = Number(t.split(':')[0]) * 60 + Number(t.split(':')[1]) * 1000;
        // console.log(r)
        const r = parseInt(minutes * 60000) + parseInt(seconds * 1000);

        const correctAnswerNo = answerData.find((x) => x.correctAnswer === true);

        const data = await AsyncStorage.getItem('userid')

        setTitleStatus({ status: false, error: '' });
        setIsVaildTitle(false);

        setDescriptionStatus({ status: false, error: '' });
        setIsVaildDescription(false);

        setlanguadeStatus({ status: false, error: '' });
        setIsVaildlanguage(false);

        setHintStatus({ status: false, error: '' });
        setisVaildHint(false);

        setquestionTypeStatus({ status: false, error: '' });
        setisVaildQuestionType(false);

        if (props.gameType === gameTypes.GuessAndGo && validation.isEmpty(image)) {
            setImageStatus({ status: true, error: 'Please add image, audio, video' })
            setIsVaildImage(true)
        }
        else if (validation.isEmpty(addquestionText)) {
            setTitleStatus({ status: true, error: 'Please enter question' })
            setIsVaildTitle(true)
        } else if (selectedQuestionTypesave === "Select Question Type") {
            setquestionTypeStatus({ status: false, error: 'Please select question type' });
            setisVaildQuestionType(false);
        }
        // else if (validation.isEmpty(hint)) {
        //     setHintStatus({ status: false, error: 'Please enter hint' });
        //     setisVaildHint(false);
        // }
        else if (answerData.length == 0 && getQuestionId(selectedQuestionTypesave) !== 5) {
            setTimeout(() => {
                setErrorMsgText('Please add at least one answer')
                setVisibleError(true)
            }, 300);
        }
        else if (selectedQuestionTypesave === "Multi Select" && !correctAnswerNo) {
            setTimeout(() => {
                setErrorMsgText(`Please select atleast one ${isTaboo() ? "taboo" : "answer"}`);
                setVisibleError(true);
            }, 300);
        }
        else {

            let formData = new FormData()
            formData.append('roundId', roundid);
            formData.append('timeLimit', r);
            formData.append('basePoints', basePointValue);
            formData.append('negativeBasePoints', negSliderValue);
            formData.append('question', addquestionText);
            formData.append('onDemandNegativePoints', onDemandPoint);
            formData.append('negativeScoring', isEnabled);
            formData.append('hintText', hint);

            if (isTaboo()) {
                formData.append('answerType', 4); // 4 === flashcard
            } else {
                formData.append('answerType', getQuestionId(selectedQuestionTypesave));
            }

            formData.append('questionType', 2);
            formData.append('fileType', fileType);
            formData.append('gameType', props.gameType);
            if (getQuestionId(selectedQuestionTypesave) === 5) {
                formData.append('answerTypeBoolean', isEnableQuestionType);
            } else {
                formData.append('answers', JSON.stringify(answerData));
            }
            // formData.append('answers', 12)

            hintValue === "Always" ? formData.append('hint', 2) : formData.append('hint', 3);

            if (validation.isEmpty(image) == false && newSelectedImage) {
                let res1 = image.split("/");
                let spltDot = res1[res1.length - 1].split(".");
                var timeStamp = Math.floor(Date.now());
                formData.append("file", {
                    uri: Platform.OS == 'ios' ? 'file://' + image : image,
                    type: "image/jpeg",
                    name: timeStamp + "." + spltDot[spltDot.length - 1]
                });
                //  formData.append('media', 'file://' + feedImage)
            } else if (validation.isEmpty(image) == false && newSelectedLibrary) {
                formData.append("fileUrl", image);
            } else {

                // setTimeout(() => {
                //     setErrorMsgText('Please add file')
                //     setVisibleError(true)
                // }, 300);
            }

            console.log('formData::', formData);

            if (props.item) {
                dispatch(LoaderAction(true))
                const response = await commonApi.updateQuestionDetailsAPI(formData, dispatch, props.item._id);
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

    }

    /**
     * Delete Answer Click
     */
    function deleteAnswerClick(selectedIndex) {
        let arrList = answerData
        console.log('answerData::', answerData);
        arrList.splice(selectedIndex, 1)
        console.log('arrList::', arrList);
        setAnswerData(arrList)
        setMetaData(!metaData)
        setisDeleteDialog(false);
    }

    /**
     * Handle Answer Selection Click
     */
    function handleAnsSelectionClick(selectedIndex) {
        if (selectedQuestionTypesave === "Single Select") {
            let arrList = answerData;
            arrList.forEach((item, index) => {
                if (index == selectedIndex) {
                    item.correctAnswer = true;
                } else {
                    item.correctAnswer = false;
                }
            })
            setAnswerData(arrList);
            setMetaData(!metaData);
        } else if (selectedQuestionTypesave === "Multi Select") {
            let arrList = [...answerDataRef.current];
            console.log('old => debug => ' + JSON.stringify(arrList));

            const objIndex = arrList.findIndex((obj, index) => index == selectedIndex);

            arrList[objIndex].correctAnswer = !arrList[objIndex].correctAnswer;

            // arrList.forEach((item, index) => {
            //     if (index == selectedIndex) {


            //         // item.correctAnswer = true;

            //         // if (item.correctAnswer === true) {
            //         //     // alert(item.correctAnswer + " true");
            //         //     item.correctAnswer = false;
            //         // }

            //         // if (item.correctAnswer === false) {
            //         //     // alert(item.correctAnswer);
            //         //     item.correctAnswer = true;
            //         // }
            //     }
            //     // else {
            //     //     item.correctAnswer = false;
            //     // }
            // })
            console.log('new => debug => ' + JSON.stringify(arrList));
            setAnswerData(arrList);
            setMetaData(!metaData);
        }
    }


}
export default DiscussionDetails;
