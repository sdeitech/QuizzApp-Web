import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { useDispatch } from "react-redux";

import { Button } from "../../../components/customComponent";
import * as commonApi from "./../../../ServiceRequests/serviceContest";
import { LoaderAction, setPlayRoundList } from "../../../redux/action";
import color from "./../../../utils/color";

const RoomItem = (props) => {
  const dispatch = useDispatch();

  const _getContestDetail = async () => {
    try {
      dispatch(LoaderAction(true));
      console.log("prabhat", props.item);
      console.log("item of invite => ", JSON.stringify(props.item));

      const response = await commonApi.saveContestGetAPI(
        0,
        dispatch,
        "",
        "",
        "",
        props.item.contestId,
        true
      );
      // dispatch(LoaderAction(false))
      console.log("data of my games => ", JSON.stringify(response.data));

      if (response["status"]) {
        console.log("data of getting contest => ", response.data[0]);
        _getRoomDetails(response.data[0]);
      }
    } catch (error) {
      console.log("error is => ", error);
    }
  };

  const _getRoomDetails = async (contestInfo) => {
    try {
      dispatch(LoaderAction(true));

      console.log("my whole props detail => ", JSON.stringify(props.item));
      const response = await commonApi.roomListing(
        "",
        props.item._id,
        dispatch
      );

      // dispatch(LoaderAction(false))
      console.log("data of my rooms => ", JSON.stringify(response.data));

      const roomResponse = response.data.jsonData.data[0];
      const {
        gamePin,
        password,
        roomId,
        displayName,
        gameId,
        _id,
      } = roomResponse;

      if (response["status"] && roomResponse) {
        console.log(
          "contest info which is sending => ",
          JSON.stringify({
            contestInfo: {
              ...contestInfo,
              response: { gamePin, password, roomId: _id, displayName },
            },
          })
        );

        _getRoundList({
          contestInfo: {
            ...contestInfo,
            response: { gamePin, password, roomId, displayName, _id },
          },
          gameId,
        });
      }
    } catch (error) {
      console.log("error is => ", error);
    }
  };

  const _getRoundList = async ({ contestInfo, gameId }) => {
    try {
      dispatch(LoaderAction(true));

      console.log("get round list 123 => ", contestInfo, gameId);
      const response = await commonApi.getRoundList(
        dispatch,
        0,
        contestInfo._id
      );
      console.log("arrData====", JSON.stringify(response));

      if (response["status"]) {
        const properData = response?.data.filter((item) => item.title);

        // dispatch(setCurrentRound(0));
        dispatch(setPlayRoundList(properData));
        // dispatch(LoaderAction(true));

        // const gameData = await _createGame("", contestInfo._id);

        // console.log("game data from join click => ", JSON.stringify(gameData));

        Actions.contestEnter({
          contestInfo: { ...contestInfo },
          gameData: { _id: gameId },
        });
        // Actions.admContestPlayNew({ contestInfo: { ...contestInfo }, gameData: { _id: gameId } });
      } else {
        setTimeout(() => {
          setErrorMsgText(response.message);
          setVisibleError(true);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setErrorMsgText(error);
        setVisibleError(true);
      }, 1000);
    }
  };

  return (
    <View style={styles.container} onPress={() => Actions.admContestPlay()}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{props.item.displayName}</Text>

        <View height={10} />

        <Text style={styles.members}>{props.item.createdByName}</Text>
      </View>

      <View width={6} />

      <Button
        title={"Join"}
        textStyle={[
          styles.buttonText,
          {
            color: color.statusBar,
          },
        ]}
        style={[
          styles.addButton,
          {
            backgroundColor: color.goldenColor,
            paddingHorizontal: 14,
          },
        ]}
        onPress={() => {
          _getContestDetail();
        }}
      />
    </View>
  );
};

export default RoomItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderBottomWidth: 0.6,
    borderBottomColor: color.white,
    paddingVertical: 16,
  },
  leftContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: color.white,
  },
  members: {
    fontSize: 12,
    color: color.white,
  },
  buttonText: {
    fontSize: 15,
    letterSpacing: 3.09,
    fontFamily: appConstants.fontBold,
  },
  addButton: {
    height: undefined,
    // paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "flex-start",
  },
});
