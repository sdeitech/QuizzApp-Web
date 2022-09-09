import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { useSelector } from "react-redux";

import assests from "../../common/assests";
import styles from "./styles";
import MaineHeader from "../../common/headerWithText";
import ContestantsList from "../AdmContestPlayNew/components/ContestantsList";
// import ContestantsList from '../AdmContestPlayNew/components/ContestantsList_old';

// contestance data
const testData = [{}, {}, {}, {}, {}, {}, {}, {}];

const notifyNumbers = 3;

const MembersList = (props) => {
  const [data, setdata] = useState(testData);

  const video = useSelector((state) => state.videoReducer);
  const userReducer = useSelector((state) => state.userReducer);

  console.log(props, "memberlist props", video);
  const emptyListView = () => {
    return <Text style={styles.emptyViewLabel}>{"No data found"}</Text>;
  };

  const myVideoStreamData = useCallback(() => {
    return {
      remoteVideoStream: video.myStream,
      userData: userReducer?.loginDetails,
      qualify: true,
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />
      <MaineHeader
        isBack
        subHeaderTextS={{ color: "#fff" }}
        style={{ zIndex: 1 }}
        title={"Members"}
      />
      <View style={styles.innerContainer}>
        <View
          style={{
            alignSelf: "flex-end",
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <Image resizeMode={"contain"} source={assests.backLogo} />
        </View>
        {
          // [video.myStream, ...video.streams].length > 0
          [myVideoStreamData(), ...video.streams].length > 0 ? (
            <ContestantsList
              // data={[video.myStream, ...video.streams]}
              data={[myVideoStreamData(), ...video.streams]}
              roomId={props?.roomId}
              participants={props?.participants}
              isModerator={props?.isModerator}
            />
          ) : (
            emptyListView()
          )
        }
      </View>
    </SafeAreaView>
  );
};

export default MembersList;
