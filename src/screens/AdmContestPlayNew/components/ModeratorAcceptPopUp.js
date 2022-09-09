import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";

import assests from "../../../common/assests";
import BlueBorderView from "../../../common/BlueBorderView";
// import { _moderatorAcceptRequest } from '../../../redux/action/gameActions';
import { _moderatorAcceptRequest } from "../../../redux/action/videoActions";
import VaniSetupHelper from "../../../utils/VaniSetupHelper";
import { Button } from "./../../../components/customComponent";
import color from "./../../../utils/color";

const ModeratorAcceptPopUp = ({
  user,
  roomID,
  currentIndex = 0,
  totalLength,
  parentViewWidth,
}) => {
  const dispatch = useDispatch();

  const _moderatorAcceptStatus = (status, isClosed = false) => {
    dispatch(
      _moderatorAcceptRequest({
        roomID,
        status,
        socketId: user.socketId,
        isClosed,
      })
    );
  };

  console.log("user in accept or decline request :: ", user);

  console.log(
    "parentWidth is :: ",
    parentViewWidth ? parentViewWidth - 48 : 20
  );

  return (
    <BlueBorderView
      style={[
        styles.container,
        {
          width: parentViewWidth ? parentViewWidth - 48 : 20,
        },
      ]}
      disabled
    >
      {/* back button for accept and decline buttons */}
      <TouchableOpacity
        style={{
          top: 5,
          right: 5,
          position: "absolute",
        }}
        onPress={() => _moderatorAcceptStatus(false, true)}
      >
        <Image
          source={assests.close_pink}
          style={{
            tintColor: color.white,
            height: 25,
            width: 25,
          }}
        />
      </TouchableOpacity>

      {/* for profile in invitation list */}
      <Image
        source={{
          uri:
            user?.userProfile ||
            "https://www.netclipart.com/pp/m/0-4623_small-apple-clipart-small-clipart.png",
        }}
        defaultSource={assests.vCallPlaceholder}
        style={styles.profile}
        resizeMode={"cover"}
      />

      <View width={10} />

      {/* <View style={styles.container}> */}
      <View style={styles.rightMainView}>
        <Text style={styles.text}>
          {user?.userData.name || "--unknown user--"}
          {` wants to join contest.`}
        </Text>

        <View height={10} />

        <View style={styles.bottomButtonView}>
          {/* for accept */}
          <Button
            title={"Accept"}
            style={[
              styles.buttonStyle,
              {
                backgroundColor: color.green,
              },
            ]}
            textStyle={styles.buttonTextStyle}
            onPress={() => {
              VaniSetupHelper.getInstance().approveJoinRequest(user);
              _moderatorAcceptStatus(false, true);
            }}
          />

          <View width={10} />

          {/* for decline */}
          <Button
            title={"Decline"}
            style={[
              styles.buttonStyle,
              {
                backgroundColor: color.fadeRedColor,
              },
            ]}
            textStyle={styles.buttonTextStyle}
            onPress={() => {
              VaniSetupHelper.getInstance().declineJoinRequest(user);
              _moderatorAcceptStatus(false, true);
            }}
          />
        </View>
      </View>
      {/* </View> */}
    </BlueBorderView>
  );
};

export default memo(ModeratorAcceptPopUp);

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.black,
    marginHorizontal: 16,
    paddingHorizontal: 10,
    // position: Platform.OS === "android" ? "relative" : 'absolute',
    // position: 'absolute',
    // top: 0,
    // elevation: 5,
    // flex: 1,
    // flexDirection: "row",
    // marginVertical: 6,
    // alignItems: 'flex-start',
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  rightMainView: {
    flex: 1,
  },
  text: {
    width: "96%",
    fontSize: 16,
    color: color.white,
    marginRight: 10,
  },
  bottomButtonView: {
    flexDirection: "row",
    width: "100%",
  },
  buttonStyle: {
    height: 28,
    width: "38%",
    // flex: 0.6,
  },
  buttonTextStyle: {
    color: color.statusBar,
  },
});
