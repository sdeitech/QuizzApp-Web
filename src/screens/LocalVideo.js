import React, { Component } from "react";
import VideoHandler from "../utils/VideoHandler";
import { VaniEvent } from "vani-meeting-client";
import VideoHolderModel from "../utils/VideoHolderModel";
import { Track, TrackKind } from "vani-meeting-client/lib/model/Track";
import InCallManager from "react-native-incall-manager";
import { AppState } from "react-native";
import { getLoginToken } from "../utils/session";
//import PipHandler from 'react-native-pip-android'

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Materialcom from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicon from "react-native-vector-icons/Ionicons";
import Octicon from "react-native-vector-icons/Octicons";
import Participant from "../small_components/Participants";
import VideoHolder from "../small_components/VideoHolder";
import CallDetectorManager from "react-native-call-detection";
import AsyncStorage from "@react-native-community/async-storage";

var callDetector = undefined;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default class LocalVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoHoldersModels: [],
      micOff: true,
      videoOff: true,
      showSetting: false,
      participantWindow: false,
      allParticipants: [],
    };
    this.onTrack = this.onTrack.bind(this);
    this.onTrackEnded = this.onTrackEnded.bind(this);
    this.onPermissionError = this.onPermissionError.bind(this);
    this.onPermissionApproved = this.onPermissionApproved.bind(this);
    this.onUserLeft = this.onUserLeft.bind(this);
    this.onAllParticipants = this.onAllParticipants.bind(this);
    this.switchVideo = this.switchVideo.bind(this);
    this.switchMic = this.switchMic.bind(this);
  }
  componentDidMount() {
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnTrack, this.onTrack);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnTrackEnded, this.onTrackEnded);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnPermissionApproved, this.onPermissionApproved);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnPermissionError, this.onPermissionError);
    VideoHandler.getInstance().getMeetingHandler().startLocalStream(true, true);
  }
  onPermissionApproved() {
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .off(VaniEvent.OnPermissionApproved, this.onPermissionApproved);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .off(VaniEvent.OnPermissionError, this.onPermissionError);
    this.state.videoHoldersModels.push(
      new VideoHolderModel(
        VideoHandler.getInstance()
          .getMeetingHandler()
          .participantByUserId(
            VideoHandler.getInstance().getMeetingRequest().userId
          ),
        "Main",
        true
      )
    );
    this.setState({
      videoHoldersModels: [...this.state.videoHoldersModels],
    });
  }
  onPermissionError() {
    alert("Please Allow Permission");
  }
  switchVideo() {
    if (this.state.videoOff) {
      if (
        VideoHandler.getInstance()
          .getMeetingHandler()
          .participantByUserId(
            VideoHandler.getInstance().getMeetingRequest().userId
          ).isVideoBlockedByAdmin
      ) {
        toast("Video Blocked");
      } else {
        VideoHandler.getInstance().getMeetingHandler().resumeCamera();
        VideoHandler.getInstance().isVideoPaused = false;
      }
    } else {
      VideoHandler.getInstance().getMeetingHandler().pauseCamera();
      VideoHandler.getInstance().isVideoPaused = true;
    }
  }
  switchMic() {
    if (this.state.micOff) {
      if (
        VideoHandler.getInstance()
          .getMeetingHandler()
          .participantByUserId(
            VideoHandler.getInstance().getMeetingRequest().userId
          ).isAudioBlockedByAdmin
      ) {
        toast("Audio Blocked");
      } else {
        VideoHandler.getInstance().getMeetingHandler().unmute();
        VideoHandler.getInstance().isAudioPaused = false;
      }
    } else {
      VideoHandler.getInstance().getMeetingHandler().muteUser();
      VideoHandler.getInstance().isAudioPaused = true;
    }
  }
  onTrack(track) {
    console.log("onTrack 12344");
    if (track.isLocalTrack && track.trackKind === TrackKind.Video) {
      this.setState({ videoOff: false });
    } else if (track.isLocalTrack && track.trackKind === TrackKind.Audio) {
      this.setState({ micOff: false });
    }
  }
  onTrackEnded(track) {
    if (track.isLocalTrack && track.trackKind === TrackKind.Video) {
      this.setState({ videoOff: true });
    } else if (track.isLocalTrack && track.trackKind === TrackKind.Audio) {
      this.setState({ micOff: true });
    }
  }
  onAllParticipants(allParticipants) {
    console.log("onAllParticipants", allParticipants);
    if (allParticipants.length > 0) {
      allParticipants.forEach((participant) => {
        this.checkAndAddUser(participant, "Main");
      });
    }
  }
  onUserLeft(participant) {
    console.log("onUserLeft", participant);
    if (participant.isAdmin) {
      this.props.endCall();
      return;
    }
    const videos = this.state.videoHoldersModels.filter(
      (videoHoldersModel) =>
        videoHoldersModel.participant.userId !== participant.userId
    );
    this.setState({ videoHoldersModels: [...videos] });
    this.setState({
      allParticipants: this.getAllApprovedParticipants(),
    });
  }
  handleCallEnd = async () => {
    if (this.props.data.isModerator) {
      const url = `https://dev-api.murabbo.com/api/game/deleteGameRoomData`;

      let tokenStr = await getLoginToken();
      try {
        const res = await axios.post(
          url,
          { roomId: this.props.roomId },
          {
            headers: { Authorization: `Bearer ${tokenStr}` },
          }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
      console.log("handleCallEnd");
      VideoHandler.getInstance().cleanUp();
      InCallManager.stop();
      InCallManager.setKeepScreenOn(false);
      console.log("data", this.props);
      this.props.navigation.pop();
    } else {
      console.log("handleCallEnd");
      VideoHandler.getInstance().cleanUp();
      InCallManager.stop();
      InCallManager.setKeepScreenOn(false);
      console.log("data", this.props);
      this.props.navigation.pop();
    }
  };
  renderClassOnVideos = () => {
    switch (this.state.videoHoldersModels.length) {
      case 1:
        return "one";
      case 2:
        return "two";
      case 3:
        return "three";
      default:
        return "default-grid";
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            height: Dimensions.get("window").height * 0.87,
            width: windowWidth * 0.95,
            position: "absolute",
            bottom: 0,
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        >
          {this.state.videoHoldersModels.length <= 2 ? (
            <FlatList
              style={{
                flex: 1,
              }}
              data={this.state.videoHoldersModels}
              renderItem={({ item, index }) => (
                <VideoHolder
                  key={item.participant.userId}
                  participantsLength={this.state.videoHoldersModels.length}
                  videoHolderModel={item}
                  index={index}
                />
              )}
              keyExtractor={(item, index) => {
                index.toString;
              }}
              key={"#"}
              keyExtractor={(item) => "#" + item.participant.userId}
              numColumns={1}
              scrollEnabled={
                this.state.videoHoldersModels.length > 1 ? true : false
              }
            />
          ) : (
            <FlatList
              //columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
              style={{
                flex: 1,
              }}
              data={this.state.videoHoldersModels}
              renderItem={({ item, index }) => (
                <VideoHolder
                  key={item.participant.userId}
                  participantsLength={this.state.videoHoldersModels.length}
                  videoHolderModel={item}
                  index={index}
                />
              )}
              keyExtractor={(item, index) => {
                index.toString;
              }}
              key={"_"}
              keyExtractor={(item) => "_" + item.participant.userId}
              numColumns={2}
              scrollEnabled={
                this.state.videoHoldersModels.length > 1 ? true : false
              }
            />
          )}
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              this.switchMic();
            }}
            style={styles.bottom_icon}
          >
            {this.state.micOff ? (
              <Materialcom name="microphone-off" size={25} color={"#fff"} />
            ) : (
              <Materialcom size={25} name="microphone" color={"#fff"} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.switchVideo();
            }}
            style={styles.bottom_icon}
          >
            {this.state.videoOff ? (
              <Feather size={25} name="video-off" color={"#fff"} />
            ) : (
              <Feather name="video" size={25} color={"#fff"} />
            )}
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              this.microphone_mute();
            }}
            style={{
              backgroundColor: this.state.MicBackgroundColor,
              borderRadius: 24,
              height: 45,
              width: 45,
              justifyContent: "center",
              alignItems: "center",
              elevation: 4,
            }}
          >
            {this.state.mic ? (
              <Ionicon size={30} name="volume-mute-outline" color={"#fff"} />
            ) : (
              <Octicon name="unmute" size={25} color={"#fff"} />
            )}
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => {
              this.toggleParticipats();
            }}
            style={styles.bottom_icon}
          >
            <Icon name="unmute" size={25} color={"#fff"} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              borderRadius: 30,
              height: 45,
              width: 45,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => this.handleCallEnd()}
          >
            <Materialcom name="phone-hangup" size={30} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottom_icon}
            onPress={() => {
              this.switchCamera();
            }}
          >
            <Materialcom name="camera-flip-outline" size={25} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <>
          {this.state.showParticipant && (
            <View style={styles.popup}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "90%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "black",
                      // alignSelf: 'center',
                      fontFamily: "p-500",
                      alignItems: "center",
                      left: "6%",
                    }}
                  >
                    Participant
                  </Text>
                </View>
                <TouchableOpacity
                  style={
                    {
                      // alignItems: 'flex-end',
                      // justifyContent: 'flex-end',
                      // marginTop: -20,
                    }
                  }
                  onPress={() => {
                    this.toggleParticipats();
                  }}
                >
                  <Icon name="close" size={28} color={"black"} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: "black",
                  padding: 1,
                  width: "100%",
                }}
              ></View>

              <ScrollView contentContainerStyle={{}}>
                {this.state.participants.map((participant) => (
                  <Participant
                    participant={participant}
                    key={participant.userId}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight / 2,
  },

  itemText: {
    fontSize: 50,
    color: "black",
  },
  itemStyle: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#1c1e1f",
    alignSelf: "center",
    justifyContent: "center",
  },
  bottom: {
    flexDirection: "row",
    alignSelf: "center",
    height: Dimensions.get("window").height * 0.09,
    justifyContent: "space-around",
    width: "80%",
    //backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    zIndex: 100,
  },

  profile: {
    height: 50,
    width: 50,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  popup: {
    top: 0,
    left: 0,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("window").height * 1,
    backgroundColor: "#fff",
    borderColor: "white",
    borderWidth: 2,
    marginRight: 5,
    ...Platform.select({
      ios: {
        zIndex: 1000,
        position: "absolute",
      },
      android: {
        zIndex: 1000,
        position: "absolute",
      },
    }),
  },
  popup_icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 17,
  },
  bottom_icon: {
    backgroundColor: "#40514e",
    borderRadius: 24,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  bottom_icon1: {
    backgroundColor: "red",
    borderRadius: 24,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
