import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { MessagePayload, VaniEvent } from "vani-meeting-client";

import appConstants from "../../../common/appConstants";
import assests from "../../../common/assests";
import BlueBorderView from "../../../common/BlueBorderView";
import { _moderatorChangeQualify } from "../../../redux/action/videoActions";
import color from "../../../utils/color";
import VideoHandler from "../../../utils/VideoHandler";

const ContestItem = ({
  item,
  itemIndex,
  userData,
  isModerator,
  roomId,
  participants,
}) => {
  useEffect(() => {
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnAudioVideoStatusUpdated, onAudioVideoStatusUpdated);
  }, []);
  const onAudioVideoStatusUpdated = (remoteparticipant) => {
    if (remoteparticipant.userId === item.userId) {
      setIsAudioBlocked(!item.isAudioEnable);
      setIsVideoBlocked(!item.isVideoEnable);
    }
  };
  console.log("contest item details: ", item);
  const { remoteVideoStream, qualify } = item;

  const dispatch = useDispatch();
  const [isAudioBlocked, setIsAudioBlocked] = useState(!item.isAudioEnable);
  const [isVideoBlocked, setIsVideoBlocked] = useState(!item.isVideoEnable);
  const _isVideoMute = (tracks) => {
    let isVideoMute = false;
    isVideoMute = tracks.find((x) => x?.kind === "video")?.muted;

    return isVideoMute;
  };

  const _isAudioMute = (tracks) => {
    let isMute = false;
    isMute = tracks.find((x) => x?.kind === "audio")?.muted;

    return isMute;
  };

  const blockUnblockUserMic = () => {
    console.log("blockUnblockUserMic");
    if (isAudioBlocked) {
      Alert.alert("Audio is already muted");
      // toast("Audio is already muted")
      // VideoHandler.getInstance()
      //   .getMeetingHandler()
      //   .sendMessage(MessagePayload);
      // this.setState({isAudioBlocked: !this.state.isAudioBlocked});
    } else {
      const messagePayload = new MessagePayload("PauseAudio", item.userId);
      messagePayload.type = "PauseAudio";
      VideoHandler.getInstance()
        .getMeetingHandler()
        .sendMessage(messagePayload);
      setIsAudioBlocked(!isAudioBlocked);
    }
  };
  const blockUnblockUserVideo = () => {
    console.log("blockUnblockUserVideo");
    if (isVideoBlocked) {
      // toast("Video is already paused")
      Alert.alert("Video is already muted");
    } else {
      const messagePayload = new MessagePayload("PauseVideo", item.userId);
      messagePayload.type = "PauseVideo";
      VideoHandler.getInstance()
        .getMeetingHandler()
        .sendMessage(messagePayload);
      setIsVideoBlocked(!isVideoBlocked);
    }
  };

  const muteUnmuteIcon = () => {
    return (
      <>
        <View style={styles.itemRightView}>
          {VideoHandler.getInstance().getMeetingRequest().isAdmin &&
            VideoHandler.getInstance().getMeetingRequest().userId !==
              item.userId && (
              <>
                {isAudioBlocked ? (
                  <TouchableOpacity onPress={() => blockUnblockUserMic()}>
                    <Image
                      source={assests.callMicMute}
                      style={styles.icons}
                      resizeMode={"contain"}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => blockUnblockUserMic()}>
                    <Image
                      source={assests.callMic}
                      style={styles.icons}
                      resizeMode={"contain"}
                    />
                  </TouchableOpacity>
                )}
                {isVideoBlocked ? (
                  <TouchableOpacity onPress={() => blockUnblockUserVideo()}>
                    <Image
                      source={assests.callCamMute}
                      style={styles.icons}
                      resizeMode={"contain"}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => blockUnblockUserVideo()}>
                    <Image
                      source={assests.callCam}
                      style={styles.icons}
                      resizeMode={"contain"}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
        </View>
      </>
    );
  };

  return (
    <BlueBorderView disabled>
      {userData.image ? (
        <Image source={{ uri: userData?.image }} style={styles.itemProfile} />
      ) : (
        <Image source={assests.vCallPlaceholder} style={styles.itemProfile} />
      )}

      <View width={15} />

      <Text style={styles.itemTextName}>{userData?.name || "John Doe"}</Text>

      <View width={15} />

      {muteUnmuteIcon()}
    </BlueBorderView>
  );
};

const ContestantsList = ({ data, roomId, isModerator, participants }) => {
  console.log("participants: ", participants);
  return (
    <FlatList
      keyExtractor={(item, index) => "item?.id" + index}
      data={participants}
      renderItem={({ item, index }) => (
        <ContestItem
          item={item}
          participants={participants}
          itemIndex={index}
          userData={item.userData}
          isModerator={isModerator}
          roomId={roomId}
        />
      )}
      // ItemSeparatorComponent={() => <View style={{ height: 1, width: "100%", backgroundColor: color.textGray }} />}
    />
  );
};

export default ContestantsList;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    // alignItems: 'center',
    // paddingVertical: 14,
    // paddingRight: 6,
    // paddingLeft: 16,
  },
  itemTextName: {
    flex: 1,
    color: color.hangmanColor,
    fontSize: 20,
    letterSpacing: 0.8,
    fontFamily: appConstants.fontBold,
    fontWeight: "800",
    marginBottom: 4,
  },
  itemProfile: {
    height: 44,
    width: 44,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  itemRightView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icons: {
    height: 30,
    width: 30,
  },
});
