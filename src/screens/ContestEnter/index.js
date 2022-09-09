import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import VaniSetUpHeloper from "../../utils/VaniSetupHelper";
import AsyncStorage from "@react-native-community/async-storage";

import assests from "../../common/assests";
import styles from "./styles";
import MaineHeader from "../../common/headerWithText";
import SubParts from "./components/SubParts";
import { Button } from "../../components/customComponent";
import UsersList from "./components/UsersList";
import * as commonApi from "../../ServiceRequests/serviceContest";
import { InviteFriendsAlert, PopUpScreen } from "../../common/alertPop";
import { Actions } from "react-native-router-flux";
import { LoaderAction, setPlayRoundList } from "../../redux/action";
import VaniSetupHelper from "../../utils/VaniSetupHelper";

const ContestEnter = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.userReducer);
  console.log("prm", userData);
  const [inThisRoomData, setinThisRoomData] = useState([
    { name: "Zaid", isOnline: false },
    { name: "Jugjivn", isOnline: true },
    { name: "John Doe", isOnline: false },
  ]);
  const [errorMsgText, setErrorMsgText] = useState("");
  const [visiblerror, setVisibleError] = useState(false);

  const [inviteFriendvisible, setinviteFriendvisible] = useState(false);

  useEffect(() => {
    console.log("contest enter props =>", props);
  }, []);

  const _addByNameClick = () => {
    setinviteFriendvisible(false);
    Actions.addByName({ roomId: props.contestInfo.response._id });
  };

  const _applyAction = () => {
    setVisibleError(false);
  };

  const _onPlayClick = () => {
    console.log("contestinfo on click => ", JSON.stringify(props.contestInfo));

    if (props?.contestInfo?.playerType === 2) {
      // setErrorMsgText('This is multiplayer game, So you can’t play alone');
      // setVisibleError(true);

      // setTimeout(() => {
      _getRoundList();
      // Actions.admContestPlay({ contestInfo: { ...props.contestInfo } });
      // }, 3000);
    } else {
      // alert(props.contestInfo.playerType);
    }
    // else {
    //     Actions.roundListing({ contestInfo: { ...props.contestInfo } });
    // }
  };

  const _createGame = async (roundId = "", contestId = "") => {
    try {
      // dispatch(LoaderAction(true))

      const data = await AsyncStorage.getItem("userid");
      console.log("create game detail => ", data, roundId, contestId);

      const formData = {
        contestId: contestId,
        roundId: roundId,
        createdBy: data,
        roomId: props.contestInfo.response._id,
      };

      console.log("my form data => ", JSON.stringify(formData));

      const response = await commonApi.createGame(formData, dispatch);

      if (response["status"]) {
        console.log("proper filtered data => ", JSON.stringify(response?.data));

        return response?.data;
      } else {
        throw response.message;
        // setTimeout(() => {
        //     setErrorMsgText(response.message);
        //     setVisibleError(true);
        // }, 1000);
      }
    } catch (error) {
      throw error;
      // setTimeout(() => {
      //     setErrorMsgText(error);
      //     setVisibleError(true);
      // }, 1000);
    }
  };

  const _getRoundList = async () => {
    // try {
    dispatch(LoaderAction(true));
    const response = await commonApi.getRoundList(
      dispatch,
      0,
      props.contestInfo._id
    );
    console.log("prabhat", props.isModerator);
    const v = VaniSetupHelper.getInstance().setUp(
      props.contestInfo.response._id,
      { name: userData.loginDetails.name },
      props.isModerator ? true : false
    );
    console.log("arrData====", JSON.stringify(response));
    if (response["status"]) {
      const properData = response?.data.filter((item) => item.title);

      // dispatch(setCurrentRound(0));
      dispatch(setPlayRoundList(properData));
      dispatch(LoaderAction(true));

      let gameData;

      if (props?.gameData) {
        gameData = props?.gameData;
      } else {
        gameData = await _createGame("", props.contestInfo._id);
      }

      console.log("game data from join click => ", JSON.stringify(gameData));

      Actions.admContestPlayNew({
        contestInfo: { ...props.contestInfo },
        gameData,
        isModerator: props.isModerator,
      });
    } else {
      setTimeout(() => {
        setErrorMsgText(response.message);
        setVisibleError(true);
      }, 1000);
    }
    // } catch (error) {
    console.log(error);
    setTimeout(() => {
      setErrorMsgText(error);
      setVisibleError(true);
    }, 1000);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* upper header */}
      <>
        <StatusBar
          backgroundColor={colors.statusBar}
          barStyle="light-content"
        />
        <MaineHeader
          isBack
          subHeaderTextS={{ color: "#fff" }}
          title={"Contest"}
        />
      </>

      {/* main body */}
      <View style={styles.innerContainer}>
        <ScrollView>
          {/* upper container in body */}
          <>
            <View style={styles.upperView}>
              <Image
                source={
                  props.contestInfo.image
                    ? { uri: props.contestInfo.image }
                    : assests.bigPlaceHolder
                }
                style={styles.image}
              />
              <Text style={styles.note}>
                {"You need to be with a friend to play Maths quiz."}
              </Text>
            </View>

            {!!props?.contestInfo?.response?.gamePin && (
              <View style={styles.upperMainPart}>
                <SubParts
                  title={"Game PIN"}
                  value={`${
                    props?.contestInfo?.response?.gamePin || "--No PIN found--"
                  }`}
                  valueStyle={
                    !props?.contestInfo?.response?.gamePin && {
                      fontSize: 14,
                      height: 21,
                    }
                  }
                />

                {/* seerator between two components */}
                <View style={styles.seperator} />

                <SubParts
                  title={"Game Password"}
                  value={`${props?.contestInfo?.password || "--NA--"}`}
                  valueStyle={
                    !props.contestInfo.password && { fontSize: 14, height: 21 }
                  }
                />
              </View>
            )}
          </>

          <View style={styles.scrollBottom}>
            {/* <UsersList
                            title={"In This Room"}
                            data={inThisRoomData}
                            isOnline
                        /> */}

            {/* bottom button here */}
            {/* {
                            props.contestInfo.playerType === 2 &&
                            <Button
                                title={'Invite Friends Here'}
                                textStyle={styles.buttonText}
                                style={styles.inviteFriendsHere}
                                onPress={() => setinviteFriendvisible(true)}
                            />
                        } */}

            {props.isModerator ? (
              <>
                <Button
                  title={props?.gameData ? "Join" : "Play"}
                  textStyle={styles.buttonText}
                  style={styles.play}
                  onPress={() => _onPlayClick()}
                />

                {/* <Button
                                        title={'Play without video'}
                                        textStyle={styles.buttonText}
                                        style={styles.play}
                                    // onPress={() => _onPlayClick()}
                                    />

                                    <Button
                                        title={'Play in-person'}
                                        textStyle={styles.buttonText}
                                        style={styles.play}
                                    // onPress={() => _onPlayClick()}
                                    /> */}
              </>
            ) : (
              <Button
                title={"Join"}
                textStyle={styles.buttonText}
                style={styles.play}
                onPress={() => _onPlayClick()}
              />
            )}
          </View>
        </ScrollView>
      </View>

      <InviteFriendsAlert
        title={"Add Friends"}
        isModalVisible={inviteFriendvisible}
        buttonTitle={"Copy Profile Link"}
        onDoneClick={() => setinviteFriendvisible(false)}
        addByNamePress={() => _addByNameClick()}
        onBack={() => setinviteFriendvisible(false)}
      />

      <PopUpScreen
        isModalVisible={visiblerror}
        msgText={errorMsgText}
        isError={true}
        onCloseModal={() => setVisibleError(false)}
        _applyAction={() => _applyAction()}
      />
    </SafeAreaView>
  );
};

export default ContestEnter;
