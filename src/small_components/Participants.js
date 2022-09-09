import {Alert, Text, View} from 'react-native';
import React, {Component} from 'react';
import Materialcom from 'react-native-vector-icons/MaterialIcons';
import VideoHandler from '../utils/VideoHandler';
import {VaniEvent, MessagePayload} from 'vani-meeting-client';

export default class Participants extends Component {
  constructor(props) {
    super(props);
    this.participant = props.participant;
    this.state = {
      isAudioBlocked: !this.participant.isAudioEnable,
      isVideoBlocked: !this.participant.isVideoEnable,
    };
    this.onAudioVideoStatusUpdated = this.onAudioVideoStatusUpdated.bind(this);
    this.blockUnblockUserVideo = this.blockUnblockUserVideo.bind(this);
    this.blockUnblockUserMic = this.blockUnblockUserMic.bind(this);
  }

  componentDidMount() {
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnAudioVideoStatusUpdated, this.onAudioVideoStatusUpdated);
  }
  componentWillUnmount() {
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .off(VaniEvent.OnAudioVideoStatusUpdated, this.onAudioVideoStatusUpdated);
  }

  onAudioVideoStatusUpdated(participant) {
    if (participant.userId === this.participant.userId) {
      this.setState({
        isAudioBlocked: !this.participant.isAudioEnable,
        isVideoBlocked: !this.participant.isVideoEnable,
      });
    }
  }
  blockUnblockUserMic() {
    console.log('blockUnblockUserMic');
    if (this.state.isAudioBlocked) {
      Alert.alert('Audio is already muted');
      // toast("Audio is already muted")
    } else {
      const messagePayload = new MessagePayload(
        'PauseAudio',
        this.participant.userId,
      );
      messagePayload.type = 'PauseAudio';
      VideoHandler.getInstance()
        .getMeetingHandler()
        .sendMessage(messagePayload);
      this.setState({isAudioBlocked: !this.state.isAudioBlocked});
    }
  }
  blockUnblockUserVideo() {
    console.log('blockUnblockUserVideo');
    if (this.state.isVideoBlocked) {
      // toast("Video is already paused")
      Alert.alert('Video is already muted');
    } else {
      const messagePayload = new MessagePayload(
        'PauseVideo',
        this.participant.userId,
      );
      messagePayload.type = 'PauseVideo';
      VideoHandler.getInstance()
        .getMeetingHandler()
        .sendMessage(messagePayload);
      this.setState({isVideoBlocked: !this.state.isVideoBlocked});
    }
  }

  render() {
    const {name} = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginLeft: 10,
          marginRight: 17,
        }}>
        <Text style={{fontSize: 20, color: 'black', fontFamily: 'p-600'}}>
          {this.props.participant.userData.name
            ? this.props.participant.userData.name
            : ''}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {VideoHandler.getInstance().getMeetingRequest().isAdmin &&
            VideoHandler.getInstance().getMeetingRequest().userId !==
              this.participant.userId && (
              <>
                {this.state.isAudioBlocked ? (
                  <Materialcom
                    name="mic-off"
                    size={25}
                    color={'black'}
                    style={{
                      marginRight: 6,
                    }}
                    onPress={() => {
                      this.blockUnblockUserMic();
                    }}
                  />
                ) : (
                  <Materialcom
                    name="mic"
                    size={25}
                    style={{
                      marginRight: 6,
                    }}
                    color={'black'}
                    onPress={() => {
                      this.blockUnblockUserMic();
                    }}
                  />
                )}

                {this.state.isVideoBlocked ? (
                  <Materialcom
                    name="videocam-off"
                    size={25}
                    color={'black'}
                    onPress={() => {
                      this.blockUnblockUserVideo();
                    }}
                  />
                ) : (
                  <Materialcom
                    name="videocam"
                    size={25}
                    color={'black'}
                    onPress={() => {
                      this.blockUnblockUserVideo();
                    }}
                  />
                )}
              </>
            )}
        </View>
      </View>
    );
  }
}
