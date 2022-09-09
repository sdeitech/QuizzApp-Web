import React, { Component } from 'react';
import VideoHandler from '../utils/VideoHandler';
import { VaniEvent } from 'vani-meeting-client';
import VideoHolderModel from '../utils/VideoHolderModel';
import { Track, TrackKind } from 'vani-meeting-client/lib/model/Track';
import InCallManager from 'react-native-incall-manager';
import { AppState } from 'react-native';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Materialcom from 'react-native-vector-icons/MaterialCommunityIcons';
import Participant from '../small_components/Participants';
import VideoHolder from '../small_components/VideoHolder';
import CallDetectorManager from 'react-native-call-detection';

var callDetector = undefined;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//const dataList=[{key:1},{key:2}]

export default class DuringVideoCall extends Component {
  constructor(props) {
    super(props);
    this.micOffPrev = false;
    this.videoOffPrev = false;
    this.state = {
      videoHoldersModels: [],
      showParticipant:false,
      participants: [],
      volume: true,
      videoOff: true,
      micOff: true,
      appState: AppState.currentState,
     // pipMode: false
    };
    
    this.onNewChatMessageReceived = this.onNewChatMessageReceived.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.onInitDone = this.onInitDone.bind(this);
    this.onPermissionApproved = this.onPermissionApproved.bind(this);
    this.onPermissionError = this.onPermissionError.bind(this);
    this.onSocketConnected = this.onSocketConnected.bind(this);
    this.onTrack = this.onTrack.bind(this);
    this.onTrackEnded = this.onTrackEnded.bind(this);
    // this.endCall = this.endCall.bind(this);

    this.checkAndAddUser = this.checkAndAddUser.bind(this);
    this.onUserLeft = this.onUserLeft.bind(this);
    this.onUserJoined = this.onUserJoined.bind(this);
    this.onAllParticipants = this.onAllParticipants.bind(this);
    this.switchVideo = this.switchVideo.bind(this);
    this.switchMic = this.switchMic.bind(this);

    this.onVideoUnblocked = this.onVideoUnblocked.bind(this);
    this.onVideoBlocked = this.onVideoBlocked.bind(this);
    this.onmissedcall = this.onmissedcall.bind(this);
    this.onAudioBlocked = this.onAudioBlocked.bind(this);
    this.onAudioUnblocked = this.onAudioUnblocked.bind(this);

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.eventListenerSubscription = null;
  }

  handleBackButtonClick(e) {
    if (this.state.showParticipant) {
      console.log('inside 2');
      e.preventDefault();
      this.setState({ showParticipant: false });
      return;
    }
    e.preventDefault();
    console.log(e);
    console.log('inside');
    this.props.navigation.dispatch(e.data.action);
  }

  onincomecall = () => {
    if (!this.state.micOff) {
      this.micOffPrev = this.state.micOff;

      this.switchMic();
    }
    if (!this.state.videoOff) {
      // this.setState({ videoOff: true })
      this.videoOffPrev = this.state.videoOff;
      this.switchVideo();
    } else {
      return;
    }
    console.log('income call');
  };
  ondisconnected() {
    console.log(this.videoOffPrev, this.micOffPrev);
    if (!this.micOffPrev) {
      this.switchMic();

      this.micOffPrev = null;
    }
    if (!this.videoOffPrev) {
      this.switchVideo();

      this.videoOffPrev = null;
    }
    console.log('disconnected');
  }
  onmissedcall() {
    console.log('missed call');
  }
  componentDidMount() {
    this.callDetector = new CallDetectorManager(
      (event, number) => {
        console.log('event', event);
        if (event === 'Disconnected') {
          // Do something call got disconnected
          this.ondisconnected();
        } else if (event === 'Connected') {
          // Do something call got connected
          // This clause will only be executed for iOS
        } else if (event === 'Incoming') {
          this.onincomecall();
          // Do something call got incoming
        } else if (event === 'Dialing') {
          // Do something call got dialing
          // This clause will only be executed for iOS
        } else if (event === 'Offhook') {
          //Device call state: Off-hook.
          // At least one call exists that is dialing,
          // active, or on hold,
          // and no calls are ringing or waiting.
          // This clause will only be executed for Android
        } else if (event === 'Missed') {
          this.ondisconnected();
          // Do something call got missed
          // This clause will only be executed for Android
        }
      },
      false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => { }, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      }, // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    );
    this.props.navigation.addListener('beforeRemove', e => {
      this.handleBackButtonClick(e);
    });
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    if (
      !VideoHandler.getInstance().getMeetingRequest() ||
      VideoHandler.getInstance().getMeetingRequest() === null
    ) {
      //Go to Login
      return;
    }
    console.log('componentDidMount');

    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnInitDone, this.onInitDone);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnTrack, this.onTrack);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnTrackEnded, this.onTrackEnded);
    VideoHandler.getInstance().getMeetingHandler().init();
    this.eventListenerSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
  }

  componentWillUnmount() {
    // this.eventListenerSubscription.remove();
    this.handleCallEnd();
  }
  _handleAppStateChange = nextAppState => {
    // if (nextAppState === "active") {
    //   this.setState({
    //     pipMode: false

    //   })
    // }else if(nextAppState === "background"){
    //   this.setState({
    //     pipMode: true
    //   })
    //   PipHandler.enterPipMode(300,214)
    // }
    // this.setState({ appState: nextAppState })
    // console.log("nextapp", nextAppState);

    console.log('this.state.appState', this.state.appState);
    console.log('nextAppState', nextAppState);
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('Sachin', this.videoOffPrev);
      if (!this.videoOffPrev) {
        this.switchVideo();
        this.videoOffPrev = null;
      }
    }
    if (nextAppState.match(/inactive|background/)) {
      if (!this.state.videoOff) {
        this.videoOffPrev = this.state.videoOff;
        this.switchVideo();
      }
    }
    console.log('After sachin', this.videoOffPrev);
    this.setState({appState: nextAppState});
  };

  onInitDone() {
    console.log('onInitDone');
    this.state.videoHoldersModels.push(
      new VideoHolderModel(
        VideoHandler.getInstance()
          .getMeetingHandler()
          .participantByUserId(
            VideoHandler.getInstance().getMeetingRequest().userId,
          ),
        'Main',
        true,
      ),
    );
    this.setState({ videoHoldersModels: [...this.state.videoHoldersModels] });
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnAllParticipants, this.onAllParticipants);

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
  onPermissionError() {
    alert('Please Allow Permission');
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
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnSocketConnected, this.onSocketConnected);
    VideoHandler.getInstance().getMeetingHandler().checkSocket();
  }

  onSocketConnected() {
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .off(VaniEvent.OnSocketConnected, this.onSocketConnected);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      ?.on(VaniEvent.OnNewChatMessageReceived, this.onNewChatMessageReceived);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnUserLeft, this.onUserLeft);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnUserJoined, this.onUserJoined);

    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnVideoUnblocked, this.onVideoUnblocked);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnAudioUnblocked, this.onAudioUnblocked);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnVideoBlocked, this.onVideoBlocked);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnAudioBlocked, this.onAudioBlocked);

    VideoHandler.getInstance().getMeetingHandler().startMeeting();

    // InCallManager.setSpeakerphoneOn(true)
  }
  onNewChatMessageReceived(messagePayload) {
    if (messagePayload.type === 'PauseVideo') {
      VideoHandler.getInstance().getMeetingHandler().pauseCamera();
    } else if (messagePayload.type === 'PauseAudio') {
      VideoHandler.getInstance().getMeetingHandler().muteUser();
    }
  }
  onAudioBlocked(participant) {
    if (
      participant.userId ===
      VideoHandler.getInstance().getMeetingRequest().userId
    ) {
      toast('Audio Blocked');
    }
  }
  onVideoBlocked(participant) {
    if (
      participant.userId ===
      VideoHandler.getInstance().getMeetingRequest().userId
    ) {
      toast('Camera Blocked');
    }
  }
  onAudioUnblocked(participant) {
    if (
      participant.userId ===
      VideoHandler.getInstance().getMeetingRequest().userId
    ) {
      toast('Audio Unblocked');
    }
  }
  onVideoUnblocked(participant) {
    if (
      participant.userId ===
      VideoHandler.getInstance().getMeetingRequest().userId
    ) {
      toast('Camera Unblocked');
    }
  }
  onTrack(track) {
    console.log('onTrack 12344');
    if (track.isLocalTrack && track.trackKind === TrackKind.Video) {
      this.setState({ videoOff: false });
      InCallManager.start({ media: 'video' });
      InCallManager.setKeepScreenOn(true);
      // InCallManager.setForceSpeakerphoneOn(true)
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
    if (allParticipants.length > 0) {
      allParticipants.forEach(participant => {
        this.checkAndAddUser(participant, 'Main');
      });
    }
  }
  onUserLeft(participant) {
    console.log('onUserLeft');
    const videos = this.state.videoHoldersModels.filter(
      videoHoldersModel =>
        videoHoldersModel.participant.userId !== participant.userId,
    );
    this.setState({ videoHoldersModels: [...videos] });
    this.setState({
      allParticipants: VideoHandler.getInstance()
        .getMeetingHandler()
        .getAllParticipants(),
    });
  }
  onUserJoined(participant) {
    this.checkAndAddUser(participant, 'Main');
    this.setState({
      allParticipants: VideoHandler.getInstance()
        .getMeetingHandler()
        .getAllParticipants(),
    });
  }
  checkAndAddUser(participant, viewHolderType) {
    const alreadyExitModel = this.state.videoHoldersModels.find(
      viewHolder =>
        viewHolder.participant.userId === participant.userId &&
        viewHolder.videoHolderModelType === viewHolderType,
    );
    if (!alreadyExitModel) {
      this.state.videoHoldersModels.unshift(
        new VideoHolderModel(
          participant,
          viewHolderType,
          participant.userId ===
          VideoHandler.getInstance().getMeetingRequest().userId,
        ),
      );
      this.setState({ videoHoldersModels: [...this.state.videoHoldersModels] });
    }
  }
  switchVideo() {
    if (this.state.videoOff) {
      if (
        VideoHandler.getInstance()
          .getMeetingHandler()
          .participantByUserId(
            VideoHandler.getInstance().getMeetingRequest().userId,
          ).isVideoBlockedByAdmin
      ) {
        toast('Video Blocked');
      } else {
        VideoHandler.getInstance().getMeetingHandler().resumeCamera();
      }
    } else {
      VideoHandler.getInstance().getMeetingHandler().pauseCamera();
    }
  }
  switchMic() {
    if (this.state.micOff) {
      if (
        VideoHandler.getInstance()
          .getMeetingHandler()
          .participantByUserId(
            VideoHandler.getInstance().getMeetingRequest().userId,
          ).isAudioBlockedByAdmin
      ) {
        toast('Audio Blocked');
      } else {
        VideoHandler.getInstance().getMeetingHandler().unmute();
      }
    } else {
      VideoHandler.getInstance().getMeetingHandler().muteUser();
    }
  }

  handleCallEnd = () => {
    console.log('handleCallEnd');
    VideoHandler.getInstance().cleanUp();
    InCallManager.stop();
    InCallManager.setKeepScreenOn(false);
    console.log("data", this.props.navigation.canGoBack());
    this.props?.route?.params?.stopService()
    this.props.navigation.navigate("StartMeet");
  };
  switchCamera() {
    console.log('switchCamera');

    VideoHandler.getInstance().getMeetingHandler().switchCamera();
  }

  // microphone_mute = () => {
  //   if (this.state.mic == false) {
  //     this.setState({ mic: true });
  //   } else {
  //     this.setState({ mic: false });
  //   }
  // };
  // video_mute = () => {
  //   if (this.state.video == false) {
  //     this.setState({ video: true });
  //   } else {
  //     this.setState({ video: false });
  //   }
  // };
  toggleParticipats = () => {
    this.setState({
      participants: VideoHandler.getInstance()
        .getMeetingHandler()
        .getAllParticipants(),
      showParticipant: !this.state.showParticipant,
    });
  };

  /*  _renderItem = ({ item, index }) => {
     let { itemStyle } = styles;

     return (
       <View
         style={{
           flex: 1,
           height: this.state.videoHoldersModels.length > 1 ? windowHeight / 2.35 : windowHeight / 1,
         }}>
         <View style={itemStyle}>
           <View style={styles.profile}>
             <Text
               style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center' }}>
               A
             </Text>
           </View>
           <View
             style={{
               position: 'absolute',
               bottom: this.state.videoHoldersModels.length > 1 ? 0 : 100,
             }}>
             <Text style={{ color: 'white', fontSize: 20 }}>Ankit</Text>
           </View>
         </View>
       </View>
     );
   }; */
  render() {
    //console.log("Duringvideocalllll props",props);
    //console.log("KKKKKKK",this.state.videoHoldersModels.length)
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: Dimensions.get('window').height * 0.9,
            width: windowWidth / 1,
          }}>
          {this.state.videoHoldersModels.length <= 2 ? (
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
              key={'#'}
              keyExtractor={item => '#' + item.participant.userId}
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
              key={'_'}
              keyExtractor={item => '_' + item.participant.userId}
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
            style={styles.bottom_icon}>
            {this.state.micOff ? (
              <Materialcom name="microphone-off" size={25} color={'black'} />
            ) : (
              <Materialcom size={25} name="microphone" color={'black'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.switchVideo();
            }}
            style={styles.bottom_icon}>
            {this.state.videoOff ? (
              <Materialcom size={25} name="video-off" color={'black'} />
            ) : (
              <Materialcom name="video" size={25} color={'black'} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              borderRadius: 30,
              height: 55,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.handleCallEnd()}>
            <Materialcom name="phone-hangup" size={30} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottom_icon}
            onPress={() => {
              this.switchCamera();
            }}>
            <Icon name="flip-camera-ios" size={25} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.toggleParticipats();
            }}
            style={styles.bottom_icon}>
            <Icon name="people-alt" size={25} color={'black'} />
          </TouchableOpacity>
        </View>
        <>
          {this.state.showParticipant && (
            <View style={styles.popup}>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',}}>
                <View style={{alignItems:'center',justifyContent:'center',width:'90%'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    // alignSelf: 'center',
                     fontFamily: 'p-500',
                     alignItems:'center',
                     left:'6%'
                  }}>
                  Participant
                </Text>
              </View>
                <TouchableOpacity
                  style={{
                    // alignItems: 'flex-end',
                    // justifyContent: 'flex-end',
                    // marginTop: -20,
                  }}
                  onPress={() => {
                    this.toggleParticipats();
                  }}>
                  <Icon name="close" size={28} color={'black'} />
                </TouchableOpacity>
              
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: 'black',
                    padding: 1,
                    width: '100%',
                  }}></View>
              
              <ScrollView contentContainerStyle={{}}>
                {this.state.participants.map(participant => (
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
    color: 'black',
  },
  itemStyle: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#1c1e1f',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.1,
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: '#fff',
    position:'absolute',
    bottom:0
  },

  profile: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  popup: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('window').height * 1,
    backgroundColor: '#fff',
    borderColor: 'white',
    borderWidth: 2,
    marginRight: 5,
  },
  popup_icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 17,
  },
  bottom_icon: {
    backgroundColor: 'white',
    borderRadius: 24,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
