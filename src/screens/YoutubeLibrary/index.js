import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import {
  Button,
  InputIcons,
  InputCreteContest,
  Input,
} from "../../components/customComponent";
import { WebView } from "react-native-webview";
import styles from "./styles";
import MaineHeader from "../../common/headerWithText";
import Video from "react-native-video";
import { Actions } from "react-native-router-flux";
import { validURL } from "../../utils/validation";
import assests from "../../common/assests";

const YoutubeLibrary = (props) => {
  const [youtubeUrl, setyoutubeUrl] = useState({});

  const [trimURL, setTrimURL] = useState("");

  const [videoId, setVideoId] = useState({});

  const [startTimeMin, setStartTimeMin] = useState("");
  const [startTimeSec, setStartTimeSec] = useState("");
  const [endTimeMin, setEndTimeMin] = useState("");
  const [endTimeSec, setEndTimeSec] = useState("");

  const [urlError, setUrlError] = useState();

  const [timerError, settimerError] = useState("");

  const _setNewUrl = () => {
    // var trimURL = `https://www.youtubetrimmer.com/view/?v=${videoId}`;

    setUrlError("");

    if (validURL(trimURL)) {
      if (_validatetiming()) {

        const startSecond = getSeconds({ min: startTimeMin || 0, sec: startTimeSec || 0 });
        const endSecond = getSeconds({ min: endTimeMin || 0, sec: endTimeSec || 0 });

        // if (startSecond) {
        //   trimURL += `&start=${startSecond}`;
        // }

        // if (endSecond) {
        //   trimURL += `&end=${endSecond}`;
        // }

        var newTrimURL = `https://www.youtube.com/embed/${videoId}?start=${startSecond}&amp;end=${endSecond}`;


        setTrimURL(newTrimURL);
      }
    } else {
      setUrlError("Not A Valid URL");
    }
  }

  const _validatetiming = () => {
    settimerError("");
    let isValidate = true;

    const startSecond = getSeconds({ min: startTimeMin || 0, sec: startTimeSec || 0 });
    const endSecond = getSeconds({ min: endTimeMin || 0, sec: endTimeSec || 0 });

    if ((startSecond >= endSecond)) {
      settimerError("end time smaller then start time");
      isValidate = false;
    } else if (startTimeSec > 60 || endTimeSec > 60) {
      settimerError("Start Time second or End time second are invalid");
      isValidate = false;
    } else if (startTimeMin > 60 || endTimeMin > 60) {
      settimerError("Start Time minute or End time minute are invalid");
      isValidate = false;
    }

    return isValidate;
  }

  const getSeconds = ({ min = 0, sec = 0 }) => {
    return (parseInt(min) * 60) + parseInt(sec);
  }



  const _onChangeUrlText = (text) => {
    if (text) {
      var video_id = text.split("v=")[1];
      if (video_id) {
        var ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        setVideoId(video_id);
        console.log(`Video ID = ${video_id}`);

        var trimURL = `https://www.youtube.com/embed/${video_id}`;
        // https://www.youtubetrimmer.com/view/?v=${video_id}`;
        console.log(`TRIMURL = ${trimURL}`);
        setTrimURL(trimURL);
      }
    }
  }

  const _onDonePress = () => {
    setUrlError("");
    if (validURL(trimURL)) {
      if (_validatetiming()) {
        props.onSelect(trimURL);
        Actions.pop();
      }
    } else {
      setUrlError("Not A Valid URL");
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />

      <MaineHeader
        isBack
        subHeaderTextS={{ color: "#fff" }}
        title={"Youtube"}
      />

      <ScrollView
        contentContainerStyle={styles.youtubeLinkContainer}
      >
        <View style={styles.webViewContainer}>
          <WebView
            style={styles.webView}
            javaScriptEnabled={true}
            useWebKit={true}
            allowsInlineMediaPlayback={true}
            allowsFullscreenVideo={false}
            source={{
              uri: trimURL,
            }}
          />
        </View>

        {/* <View style={styles.pasteLinkContainer}> */}
        <Input
          icon={assests.cube}
          isFiledImage
          placeholder={"Paste Youtube URL here"}
          onChangeText={_onChangeUrlText}
          returnKeyType={"done"}
          style={{ width: '100%' }}
          errorMessage={urlError}
        />
        {/* </View> */}
        {/* <Text style={{ color: "#fff" }}>{trimURL}</Text> */}
        <View style={styles.trimContainer}>
          <Input
            icon={assests.clock}
            // isFiledImage
            placeholder={"Start At Min"}
            keyboardType={"number-pad"}
            onChangeText={(text) => setStartTimeMin(text)}
            returnKeyType={"done"}
            style={{ flex: 1 }}
            value={startTimeMin}
          />

          <Text style={styles.betweenDotsStyle}>{`     :     `}</Text>

          <Input
            icon={assests.clock}
            // isFiledImage
            placeholder={"Start At Sec"}
            keyboardType={"number-pad"}
            onChangeText={(text) => setStartTimeSec(text)}
            returnKeyType={"done"}
            style={{ flex: 1 }}
            value={startTimeSec}
          />
        </View>

        <View style={styles.trimContainer}>
          <Input
            icon={assests.clock}
            // isFiledImage
            placeholder={"End At Min"}
            keyboardType={"number-pad"}
            onChangeText={(text) => setEndTimeMin(text)}
            returnKeyType={"done"}
            style={{ flex: 1 }}
            value={endTimeMin}
          />

          <Text style={styles.betweenDotsStyle}>{`     :     `}</Text>

          <Input
            icon={assests.clock}
            // isFiledImage
            placeholder={"End At Sec"}
            keyboardType={"number-pad"}
            onChangeText={(text) => setEndTimeSec(text)}
            returnKeyType={"done"}
            style={{ flex: 1 }}
            value={endTimeSec}
          />
        </View>

        {
          timerError.length !== 0 &&
          <Text style={styles.redErrorTimer}>{timerError}</Text>
        }

        <Button
          title={"Set"}
          textStyle={{
            fontSize: 17,
            color: "#22343C",
            letterSpacing: 3.09,

            fontFamily: appConstants.fontBold,
          }}
          style={styles["setButton"]}
          onPress={_setNewUrl}
        />

        <Button
          title={"Done"}
          textStyle={{
            fontSize: 17,
            color: "#22343C",
            letterSpacing: 3.09,

            fontFamily: appConstants.fontBold,
          }}
          style={styles["doneButton"]}
          onPress={() => _onDonePress()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default YoutubeLibrary;
