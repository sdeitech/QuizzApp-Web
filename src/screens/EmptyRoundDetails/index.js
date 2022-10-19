import React, { useEffect, useState, useMemo } from "react";
import {
    View,
    SafeAreaView,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    FlatList,
    Switch,
    DeviceEventEmitter,
} from "react-native";
import { styles } from "./styles";
// components
import appConstants from "../../common/appConstants";
import MaineHeader from "../../common/headerWithText";
import assests from "../../common/assests";
import { Actions } from "react-native-router-flux";
import { useSelector, useDispatch } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-community/async-storage";

import {
    SaveTo,
    WariningPopUp,
    AddImage,
    RoundPopUp,
    HashTag,
    AnswersPop,
} from "../../common/alertPop";
import * as validation from "../../utils/validation";
import { PopUpScreen } from "../../common/alertPop";
import * as commonApi from "../../ServiceRequests/serviceContest";
import { getLoginData } from "../../utils/session";
import color from "../../utils/color";
import { LoaderAction } from "../../redux/action";
import { getFontSize, dynamicSize } from "../../utils/responsive";
import localKey from "../../utils/localStorageKey";

import {
    Button,
    InputIcons,
    InputCreteContest,
    Input,
} from "../../components/customComponent";
import gameTypes from "../../utils/gameTypes";
import MatchItRowSelection from "./components/MatchItRowSelection";
import matchItTypes from "../../utils/matchItTypes";
// import { Item } from 'react-native-paper/lib/typescript/src/components/List/List';
// import { call } from 'react-native-reanimated';

const basePointDefault = 40;
const negSliderDefault = 30;

function DiscussionDetails(props) {
    const imageData = [{ key: "Android" }, { key: "Android" }];

    const isMatchIt = () => {
        return props?.RoundDetails?.item?.gameType === gameTypes.MatchIt;
    };

    const isBingoo = () => {
        return props?.RoundDetails?.item?.gameType === gameTypes.Bingo;
    };

    const dispatch = useDispatch();

    const [score, setScore] = useState("");
    const [isScore, setisScore] = useState(false);
    const [popUpTitle, setPopTitle] = useState("");
    const [saveTo, setSaveTo] = useState(false);
    const [execution, setExecution] = useState(false);
    const [timervalue, setTimerValue] = useState("00:30");
    const [seconds, setSeconds] = useState("30");
    const [minutes, setMinutes] = useState("00");
    const [basePointValue, setbasePointValue] = useState(basePointDefault);
    const [negSliderValue, setNegSliderValue] = useState(negSliderDefault);

    // match it special states
    const [matchItRows, setmatchItRows] = useState(4);
    const [matchItType, setmatchItType] = useState(matchItTypes.text);
    const [matchItNoQuestions, setmatchItNoQuestions] = useState(3);

    const [matchItTypeModal, setmatchItTypeModal] = useState(false);
    const [matchItSave, setMatchItSave] = useState(matchItTypes.text);
    // !--- match it special states

    const [executionSave, setExecutionSave] = useState("");

    const [hashTagText, setHashTagText] = useState("");
    const [hashTagData, setHashTagData] = useState([]);
    const [isAddImage, setAddImage] = useState(false);
    const [image, setImage] = useState("");

    const [scoring, setScoring] = useState(false);
    const [scoringValue, setScoringValue] = useState("Moderator Driven");
    const [scoreSave, setScoreSave] = useState("Scoring");

    const [rendering, setRendering] = useState(false);
    const [renderingValue, setRenderingValue] = useState("Automatic");
    const [renderingSave, setRenderingSave] = useState("Rendering Mode");

    const [visibility, setVisbility] = useState(false);
    const [visibilityValue, setVisbilityValue] = useState("Public");
    const [visibilitySave, setVisibilitySave] = useState("");

    const [hastag, sethashTag] = useState(false);
    const [hastagValue, setHastagValue] = useState("Type hastag");
    const [hastagSave, setHastagSave] = useState("");
    const [hastagText, setHastagText] = useState("");

    const [title, setTitle] = useState(""); //validation
    const [description, setDescription] = useState("");

    //Error Dialog
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [errorMsgText, setErrorMsgText] = useState("");
    const [visiblerror, setVisibleError] = useState(false);

    const [titleStatus, setTitleStatus] = useState({ status: true, error: "" });
    const [isVaildTitlw, setIsVaildTitle] = useState(false);

    const [descriptionStatus, setDescriptionStatus] = useState({
        status: true,
        error: "",
    });
    const [isVailddescription, setIsVaildDescription] = useState(false);

    const [languageStatus, setlanguadeStatus] = useState({
        status: true,
        error: "",
    });
    const [isVaildlanguage, setIsVaildlanguage] = useState(false);

    const [scoringStatus, setScoringStatus] = useState({
        status: true,
        error: "",
    });
    const [isVaildscoring, setIsVaildscoring] = useState(false);

    const [renderStatus, setRenderStatus] = useState({
        status: true,
        error: "",
    });
    const [isVaildrender, setIsVaildREnder] = useState(false);

    const [imageStatus, setImageStatus] = useState({ status: true, error: "" });
    const [isVaildImage, setIsVaildImage] = useState(false);

    const [categoryid, setCategoryid] = useState(false);

    const [apicount, setApicount] = useState(1);
    const [Token, setToken] = useState("");
    const [storeimg, setStoreImg] = useState(false);

    const [chooseHintShow, setChooseHintShow] = useState(false);
    const [hintValue, setHintValue] = useState("Always");
    const [hintSeleValue, setHintSeleValue] = useState("Always");
    const [onDemandPoint, setOnDemandPoint] = useState(10);

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => {
        setIsEnabled((previousState) => {
            if (!previousState) setNegSliderValue(negSliderDefault);
            return !previousState;
        });
    };

    const _onScorePress = (selectedMode) => {
        setScoringValue(selectedMode);
        setScoreSave(selectedMode);
        setScoring(false);
    };

    // after click on match it types
    const _onMatchItPress = (selectedMode) => {
        setmatchItType(selectedMode);
        setMatchItSave(selectedMode);
        setmatchItTypeModal(false);
    };

    const _onRendringMode = (selectedMode) => {
        setRenderingValue(selectedMode);
        setRenderingSave(selectedMode);
        setRendering(false);
    };

    const _onVisibilityMode = (selectedMode) => {
        setVisbilityValue(selectedMode);
        setVisbility(false);
    };

    const _onExcutiveMode = (selectedMode) => {
        // reset sliders
        if (selectedMode === "Assigned") {
            setbasePointValue(basePointDefault);
            setNegSliderValue(negSliderDefault);
        }

        // alert(selectedMode);
        setExecutionValue(selectedMode);
        setExecution(false);
    };
    const onDonePress = () => {
        setSaveTo(false);
        Actions.home();
    };

    const msToMS = (ms) => {
        let newSeconds = Math.floor((ms / 1000) % 60);
        let newMinutes = Math.floor((ms / 1000 / 60) % 60);

        if (newSeconds < 9) newSeconds = `0${newSeconds}`;
        if (newMinutes < 9) newMinutes = `0${newMinutes}`;

        setSeconds(newSeconds);
        setMinutes(newMinutes);
    };

    const getMatchItTypeFromId = (id) => {
        switch (parseInt(id)) {
            case 3:
                return matchItTypes.number;
            case 2:
                return matchItTypes.image;
            default:
                return matchItTypes.text;
        }
    };

    const getMatchItIdFromType = (type) => {
        switch (type) {
            case matchItTypes.number:
                return 3;
            case matchItTypes.image:
                return 2;
            default:
                return 1;
        }
    };

    useEffect(() => {
        try {
            console.log(
                "new game type is => ",
                props?.RoundDetails?.item?.gameType
            );
            // Quiz, Taboo, GuessAndGo
            // if (props?.RoundDetails?.item?.gameType === "Bingo") {
            //     _onExcutiveMode("Competitive");
            // }

            async function fetchMyAPI() {
                const id = await AsyncStorage.getItem("categoryid");
                setCategoryid(id);
                let userData = await AsyncStorage.getItem(
                    localKey["LOGIN_TOKEN"]
                );
                setToken(userData);
            }

            (async () => {
                if (
                    props.RoundDetails != undefined &&
                    props.RoundDetails != null
                ) {
                    setTitle(props.RoundDetails.item.title);
                    setDescription(props.RoundDetails.item.description);

                    if (props.RoundDetails.item.timeLimit !== 0) {
                        msToMS(props.RoundDetails.item.timeLimit);
                    }

                    console.log(
                        "round details => " + JSON.stringify(props.RoundDetails)
                    );
                    // alert(props.RoundDetails.item.image);
                    setImage(props.RoundDetails.item.image);
                    await AsyncStorage.setItem(
                        "roundid",
                        props.RoundDetails.item._id
                    );
                    console.log("call", props.RoundDetails.item.image);
                    if (props.RoundDetails.item.image == "") {
                        setStoreImg(true);
                    }
                }
            })();
            fetchMyAPI();
        } catch (error) {
            console.log("round details error => ", error);
        }
    }, [apicount]);

    const imagePickerAcion = (isCamera) => {
        setAddImage(false);
        setTimeout(() => {
            if (isCamera) {
                ImagePicker.openCamera({
                    cropping: true,
                    width: 400,
                    height: 200,
                }).then((image) => {
                    console.log(image);
                    setImage(image.path);
                    setStoreImg(true);
                    setAddImage(false);
                    setImageStatus({ status: false, error: "" });
                    setIsVaildImage(false);
                });
            } else {
                ImagePicker.openPicker({
                    cropping: true,
                    width: 400,
                    height: 200,
                }).then((image) => {
                    // debugger
                    console.log(image);
                    setImage(image.path);
                    setStoreImg(true);
                    setAddImage(false);
                    setImageStatus({ status: false, error: "" });
                    setIsVaildImage(false);
                });
            }
        }, 1000);
    };

    const removeImage = () => {
        try {
            setImage("");
            setStoreImg(false);
            setAddImage(false);
            setImageStatus({ status: true, error: "" });
            setIsVaildImage(false);
        } catch (error) {}
    };

    const _onHashTagSelect = () => {
        // debugger
        if (validation.isEmpty(hashTagText) == false) {
            setHashTagData([...hashTagData, { key: hashTagText }]);
        }
        sethashTag(false);
        setHashTagText("");
    };

    const _applyAction = () => {
        // setDialogVisible(false)
        setVisibleError(false), errorMsgText ? null : Actions.pop();
    };

    const onTextChange = (type) => (text) => {
        if (type === "title") {
            setTitle(text);
            if (validation.isEmpty(text)) {
                setTitleStatus({ status: true, error: "Please enter title" });
                setIsVaildTitle(true);
            } else {
                setTitleStatus({ status: false, error: "" });
                setIsVaildTitle(false);
            }
        } else if (type === "description") {
            setDescription(text);
            if (validation.isEmpty(text)) {
                // setDescriptionStatus({ status: true, error: 'Please enter description' });
                // setIsVaildDescription(true);
            } else {
                setDescriptionStatus({ status: false, error: "" });
                setIsVaildDescription(false);
            }
        }
    };

    const _onHintClick = (value) => {
        setHintValue(value);
        setHintSeleValue(value);
        setChooseHintShow(false);
    };

    /**
     * Type == 1  Positive
     * Type == 2  Negative
     */
    const handleTimerClick = (type) => {
        let valueMinutes = parseInt(minutes) * 60;
        let valueSecond = parseInt(seconds);

        valueSecond = valueMinutes + valueSecond;

        if (type == 1) {
            //Plus Click
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

            if (valueSecond < 900) valueSecond = valueSecond + 5;
        } else {
            //Minus Click
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

        setMinutes(valueMinutes.toString());
        setSeconds(valueSecond.toString());
    };

    const matchItTypeChange = (value) => {
        if (value) {
            setmatchItType(matchItTypes.image);
        } else {
            setmatchItType(matchItTypes.text);
        }
    };

    const matchItMediaType = useMemo(() => {
        if (matchItType === matchItTypes.image) {
            return true;
        }
        return false;
    }, [matchItType]);

    const _roundNameHeader = () => {
        switch (props?.RoundDetails?.item?.gameType) {
            case gameTypes.GuessAndGo:
                return "Guess & Go";
            default:
                return props?.RoundDetails?.item?.gameType;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <MaineHeader
                isBack
                subHeaderTextS={{ color: "#fff" }}
                title={"Blank Round"}
                // subTitle={_roundNameHeader()}
            />
            <View style={{ backgroundColor: "#22343C", flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, paddingTop: 20 }}
                >
                    <View
                        style={{
                            alignSelf: "flex-end",
                            position: "absolute",
                            right: 0,
                            top: -20,
                        }}
                    >
                        <Image
                            resizeMode={"contain"}
                            source={assests.backLogo}
                        />
                    </View>
                    <View style={styles.innerContainer}>
                        <TouchableOpacity
                            onPress={() => setAddImage(true)}
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#324B55",
                                height: 152,
                            }}
                        >
                            {image ? (
                                <View style={{ width: "100%" }}>
                                    <Image
                                        imageStyle={{ borderRadius: 10 }}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 10,
                                        }}
                                        source={{ uri: image }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            removeImage();
                                        }}
                                        style={{
                                            backgroundColor: color.goldenColor,
                                            padding: 5,
                                            borderRadius: 10,
                                            position: "absolute",
                                            right: 10,
                                            top: 10,
                                        }}
                                    >
                                        <Image
                                            style={{ height: 10, width: 10 }}
                                            resizeMode={"contain"}
                                            source={assests.crossSmall}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    <Image
                                        style={{ alignSelf: "center" }}
                                        source={assests.upload}
                                    />
                                    <Text
                                        style={{
                                            marginTop: 8.5,
                                            color: "#ADBAC1",
                                            fontFamily:
                                                appConstants.AirbnbCerealAppBook,
                                            fontSize: 16,
                                        }}
                                    >
                                        Add Image
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <Text style={styles.imageErrorStyle}>
                            {imageStatus.error}
                        </Text>
                        {/* <InputIcons
                            containerStyle={{ marginTop: 40 }}
                            icon={assests.title}
                            title={'Title'}
                            placeholder={'Type here...'}
                            onChangeText={(text) => setTitle(text)}
                        /> */}
                        {props.RoundDetails != null &&
                        props.RoundDetails != undefined ? (
                            <Input
                                onChangeText={onTextChange("title")}
                                value={props.RoundDetails.item.title}
                                setValue={"11111"}
                                keyboardType={"default"}
                                style={{ width: "100%" }}
                                blurOnSubmit={false}
                                placeholder={"Title"}
                                icon={assests.title}
                                isFiledImage
                                // autoCapitalize={'none'}
                                source={
                                    isVaildTitlw
                                        ? assests.info
                                        : validation.isEmpty(title)
                                        ? ""
                                        : assests.check
                                }
                                labelTextStyle={{
                                    fontSize: 14,
                                    marginLeft: dynamicSize(5),
                                }}
                                errorMessage={titleStatus["error"]}
                            />
                        ) : (
                            <Input
                                onChangeText={onTextChange("title")}
                                value={title}
                                setValue={"11111"}
                                keyboardType={"default"}
                                style={{ width: "100%" }}
                                blurOnSubmit={false}
                                placeholder={"Title"}
                                icon={assests.title}
                                isFiledImage
                                // autoCapitalize={'none'}
                                source={
                                    isVaildTitlw
                                        ? assests.info
                                        : validation.isEmpty(title)
                                        ? ""
                                        : assests.check
                                }
                                labelTextStyle={{
                                    fontSize: 14,
                                    marginLeft: dynamicSize(5),
                                }}
                                errorMessage={titleStatus["error"]}
                            />
                        )}

                        {/* <InputIcons
                            icon={assests.paper}
                            title={'Description'}
                            placeholder={'Type here...'}
                            onChangeText={(text) => setDescription(text)}
                        /> */}

                        {props.RoundDetails != null &&
                        props.RoundDetails != undefined ? (
                            <Input
                                onChangeText={onTextChange("description")}
                                value={props.RoundDetails.item.description}
                                keyboardType={"default"}
                                style={{
                                    width: "100%",
                                    height: dynamicSize(50),
                                }}
                                blurOnSubmit={false}
                                placeholder={"Description"}
                                icon={assests.paper}
                                isFiledImage
                                // autoCapitalize={'none'}
                                source={
                                    isVailddescription
                                        ? assests.info
                                        : validation.isEmpty(description)
                                        ? ""
                                        : assests.check
                                }
                                labelTextStyle={{
                                    fontSize: 14,
                                    marginLeft: dynamicSize(5),
                                }}
                                errorMessage={descriptionStatus["error"]}
                            />
                        ) : (
                            <Input
                                onChangeText={onTextChange("description")}
                                value={description}
                                keyboardType={"default"}
                                style={{
                                    width: "100%",
                                    height: dynamicSize(50),
                                }}
                                blurOnSubmit={false}
                                placeholder={"Description"}
                                icon={assests.paper}
                                isFiledImage
                                // autoCapitalize={'none'}
                                source={
                                    isVailddescription
                                        ? assests.info
                                        : validation.isEmpty(description)
                                        ? ""
                                        : assests.check
                                }
                                labelTextStyle={{
                                    fontSize: 14,
                                    marginLeft: dynamicSize(5),
                                }}
                                errorMessage={descriptionStatus["error"]}
                            />
                        )}

                        {
                            <View
                                style={{
                                    marginTop: 29,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 20,
                                }}
                            >
                                <Image source={assests.clock} />
                                <Text
                                    style={{
                                        fontSize: 13,
                                        letterSpacing: 1.33,
                                        textAlign: "left",
                                        fontFamily: appConstants.fontReqular,
                                        color: "#fff",
                                        marginLeft: 10,
                                    }}
                                >
                                    Time Limit
                                </Text>
                                <TouchableOpacity
                                    onPress={() => handleTimerClick(2)}
                                    style={{ marginLeft: 17 }}
                                >
                                    {/* setTimerValue(timervalue > 1 ? timervalue - 1 : timervalue)}  */}
                                    <Image source={assests.minus} />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontFamily: appConstants.fontReqular,
                                        letterSpacing: 2.04,
                                        textAlign: "left",
                                        marginLeft: 8,
                                        color: "#fff",
                                    }}
                                    placeholder={"00"}
                                >
                                    {minutes + ":" + seconds}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => handleTimerClick(1)}
                                    style={{ marginLeft: 7 }}
                                >
                                    {/* setTimerValue(timervalue < 60 ? timervalue + 1 : timervalue) */}
                                    <Image source={assests.pluss} />
                                </TouchableOpacity>
                            </View>
                        }

                        {props.ShowBtnRound == true ? null : (
                            <Button
                                title={`Save${
                                    matchItSave === matchItTypes.number
                                        ? ""
                                        : " & Exit"
                                }`}
                                textStyle={{
                                    fontSize: 17,
                                    color: "#22343C",
                                    letterSpacing: 3.09,
                                    fontFamily: appConstants.fontBold,
                                }}
                                style={styles["signupButton"]}
                                onPress={() => {
                                    props.RoundDetails != null &&
                                    props.RoundDetails != undefined
                                        ? saveContestClick(1, true)
                                        : saveContestClick(2, true);
                                }}
                            />
                        )}
                    </View>
                    <SaveTo
                        title={popUpTitle}
                        isModalVisible={isScore}
                        onCancel={() => setisScore(false)}
                    />

                    <AddImage
                        isModalVisible={isAddImage}
                        onCancel={() => setAddImage(false)}
                        onCamera={() => imagePickerAcion(true)}
                        onGallery={() => imagePickerAcion(false)}
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

    async function onNextScreenClick() {
        try {
            if (matchItSave === matchItTypes.number) return null;

            const { gameType } = props.RoundDetails.item;

            if (executionValue === "Assigned") {
                const params = {
                    gameType,
                    executionValue,
                    minutes,
                    seconds,
                    basePointValue,
                    hintValue,
                    onDemandPoint,
                    nagative: {
                        status: isEnabled,
                        value: negSliderValue,
                    },
                };

                if (
                    gameType === gameTypes.Hangman ||
                    gameType === gameTypes.Unscramble ||
                    gameType === gameTypes.Gibberish
                ) {
                    Actions.wordsListing({
                        params,
                        scoring: scoringValue,
                        gameType,
                    });
                } else if (
                    gameType === gameTypes.Quiz ||
                    gameType === gameTypes.GuessAndGo ||
                    gameType === gameTypes.Taboo
                ) {
                    Actions.roundQuestion({
                        params,
                        scoring: scoringValue,
                        gameType,
                    });
                } else if (
                    gameType === gameTypes.MatchIt ||
                    gameType === gameTypes.Bingo
                ) {
                    // Actions.matchIt({ params, scoring: scoringValue, customTitle: "Bingo" });
                    Actions.mb_ImageList({
                        params,
                        scoring: scoringValue,
                        customTitle: gameType,
                        gameType,
                        matchItType: getMatchItIdFromType(matchItType),
                    });
                }
            } else {
                if (
                    gameType === gameTypes.Hangman ||
                    gameType === gameTypes.Unscramble ||
                    gameType === gameTypes.Gibberish
                ) {
                    Actions.wordsListing({ scoring: scoringValue, gameType });
                    // Actions.hugiScreen({ scoring: scoringValue, params: { gameType } });
                } else if (
                    gameType === gameTypes.Quiz ||
                    gameType === gameTypes.GuessAndGo ||
                    gameType === gameTypes.Taboo
                ) {
                    Actions.roundQuestion({ scoring: scoringValue, gameType });
                } else if (
                    gameType === gameTypes.MatchIt ||
                    gameType === gameTypes.Bingo
                ) {
                    // Actions.matchIt({ scoring: scoringValue, customTitle: "Bingo" });
                    Actions.mb_ImageList({
                        scoring: scoringValue,
                        customTitle: gameType,
                        gameType,
                        matchItType: getMatchItIdFromType(matchItType),
                    });
                }
            }
        } catch (error) {
            // console.log("error => on create round => and next => ", error)
        }
    }

    // value = insaert or update
    // isNext = true === save & next || false === save & change
    async function saveContestClick(value, isNext = false) {
        // alert()
        // return

        const data = await AsyncStorage.getItem("userid");

        setTitleStatus({ status: false, error: "" });
        setIsVaildTitle(false);

        setDescriptionStatus({ status: false, error: "" });
        setIsVaildDescription(false);

        setImageStatus({ status: false, error: "" });
        setIsVaildImage(false);

        if (validation.isEmpty(title)) {
            setTitleStatus({ status: true, error: "Please enter title" });
            setIsVaildTitle(true);
        }
        // else if (validation.isEmpty(description)) {
        //     setDescriptionStatus({ status: true, error: 'Please enter description' })
        //     setIsVaildDescription(true)
        // }
        // else if (validation.isEmpty(image)) {
        //     setImageStatus({ status: true, error: 'Please add image' })
        //     setIsVaildImage(true)
        // }
        else {
            const { gameType } = props.RoundDetails.item;

            let userData = await getLoginData();
            console.log("userData::", userData);
            console.log("userId::", userData.userId);

            let formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);

            // const t = minutes + ':' + seconds;

            // console.log("formData: collom time stamp => ", t);

            // const r = Number(t.split(':')[0]) * 60 + Number(t.split(':')[1]) * 1000;
            const r = parseInt(minutes * 60000) + parseInt(seconds * 1000);

            formData.append("timeLimit", r);

            formData.append("gameType", gameType);
            formData.append("contestId", categoryid);

            console.log(
                "upload image data => " +
                    `image => ${image} storeimg => ${storeimg.toString()} => ${value}`
            );

            if (validation.isEmpty(image) == false && value == 2) {
                let res1 = image.split("/");
                let spltDot = res1[res1.length - 1].split(".");
                var timeStamp = Math.floor(Date.now());
                formData.append("image", {
                    uri: Platform.OS == "ios" ? "file://" + image : image,
                    type: "image/jpeg",
                    name: timeStamp + "." + spltDot[spltDot.length - 1],
                });
                // //  formData.append('media', 'file://' + feedImage)
            } else if (
                validation.isEmpty(image) == false &&
                storeimg == true &&
                value == 1
            ) {
                let res1 = image.split("/");
                let spltDot = res1[res1.length - 1].split(".");
                var timeStamp = Math.floor(Date.now());
                formData.append("image", {
                    uri: Platform.OS == "ios" ? "file://" + image : image,
                    type: "image/jpeg",
                    name: timeStamp + "." + spltDot[spltDot.length - 1],
                });
                // alert("call on this func");
                // alert("call on this func");
            } else {
                // alert("else");
                // formData.append("image", image)
            }

            // alert(`${JSON.stringify(formData)}`);
            console.log("formData::", formData);

            // throw "abcd";

            if (value == 2) {
                dispatch(LoaderAction(true));
                const response = await commonApi.saveroundDetailsAPI(
                    formData,
                    dispatch
                );
                if (response["status"]) {
                    DeviceEventEmitter.emit("RoundUpdate");
                    console.log(
                        "response.data::",
                        response.data.jsonData.data._id
                    );
                    Actions.pop();
                    // // Actions.roundQuestion()
                    // if (isNext) {
                    //     onNextScreenClick();
                    // } else {
                    //     // Actions.roundTryScreen()
                    //     Actions.pop();
                    // }
                } else {
                    setTimeout(() => {
                        setErrorMsgText(response["message"]);
                        setVisibleError(true);
                    }, 1000);
                }
            } else if (value == 1) {
                try {
                    dispatch(LoaderAction(true));
                    const response = await commonApi.updateroundDetailsAPI(
                        formData,
                        dispatch,
                        props.RoundDetails.item._id
                    );
                    if (response["status"]) {
                        DeviceEventEmitter.emit("RoundUpdate");
                        console.log(
                            "response.data::",
                            response.data.jsonData.data
                        );
                        Actions.pop();
                        // if (isNext) {
                        //     onNextScreenClick();
                        // } else {
                        //     // Actions.roundTryScreen()
                        //     Actions.pop();
                        // }
                    } else {
                        setTimeout(() => {
                            // alert(response['message']);
                            setErrorMsgText(response["message"]);
                            setVisibleError(true);
                        }, 1000);
                    }

                    // const header = {
                    //     "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTE4MjRhNTU2ODgzNTFjZGVjYTNhMCIsImVtYWlsIjoibWVldC5hZ2hlcmFAeG9uZ29sYWIuY29tIiwiaWF0IjoxNjA4NjI5Mzg0LCJleHAiOjE2MDg3MTU3ODR9.v68a1ARbOTO-WcRtV-CW0cEC22IoTYEzn-EPdAM5Tfo',
                    //     'Content-Type': 'multipart/form-data'
                    // };
                    // const response = await fetch(`http://54.201.160.69:3051/api/round/round/${props.RoundDetails.item._id}`, {
                    //     method: "PUT",
                    //     headers: header,
                    //     body: formData
                    // }).then((res) => {
                    //     dispatch(LoaderAction(false)),
                    //         console.log('resrrers', res);
                    //     DeviceEventEmitter.emit('RoundUpdate')
                    // })
                } catch (e) {
                    alert(e);
                    // reject(e);
                }
            }
        }
    }
}
export default DiscussionDetails;
