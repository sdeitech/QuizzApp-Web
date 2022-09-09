import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {VaniEvent} from 'vani-meeting-client';
import VideoPlayer from './VideoPlayer';
import VideoHandler from '../utils/VideoHandler';
import {Track, TrackKind} from 'vani-meeting-client/lib/model/Track';
import Materialcom from 'react-native-vector-icons/MaterialIcons';
import AudioWave from './AudioWave';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class VideoHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoTrack: undefined,
      audioTrack: undefined,
      //progress: new Animated.Value(0),
    };
    this.videoHolderModel = props.videoHolderModel;

    this.registerEventHandler = this.registerEventHandler.bind(this);
    this.unregisterEventHandler = this.unregisterEventHandler.bind(this);
    this.onTrack = this.onTrack.bind(this);
    this.onTrackEnded = this.onTrackEnded.bind(this);
    // this.onVisibilityChange = this.onVisibilityChange.bind(this);
  }

  componentDidMount() {
    this.registerEventHandler();
    if (this.videoHolderModel) {
      if (
        this.videoHolderModel.participant.userId ===
        VideoHandler.getInstance().getMeetingRequest().userId
      ) {
        this.isLocal = true;
      }
      console.log(this.videoHolderModel.participant.userId);
      const tracks = VideoHandler.getInstance()
        .getMeetingHandler()
        .getTracksByParticipantId(this.videoHolderModel.participant.userId);

      tracks.forEach(track => {
        this.onTrack(track);
      });
    }
    // Animated.timing(this.state.progress, {
    //   toValue: 1,
    //   duration: 5000,
    //   easing: Easing.linear,
    // }).start();
  }
  componentWillUnmount() {
    this.unregisterEventHandler();
  }
  registerEventHandler() {
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnTrack, this.onTrack);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnTrackEnded, this.onTrackEnded);
  }
  unregisterEventHandler() {
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .off(VaniEvent.OnTrack, this.onTrack);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .off(VaniEvent.OnTrackEnded, this.onTrackEnded);
  }
  onTrackEnded(track) {
    if (track.participant.userId === this.videoHolderModel.participant.userId) {
      if (this.videoHolderModel.videoHolderModelType === 'Main') {
        if (track.trackKind === TrackKind.Video) {
          this.setState({videoTrack: undefined});
        } else if (track.trackKind === TrackKind.Audio) {
          this.setState({audioTrack: undefined});
        }
      }
    }
  }

  onTrack(track) {
    console.log('onTrack  123');

    if (track.participant.userId === this.videoHolderModel.participant.userId) {
      if (
        this.videoHolderModel.videoHolderModelType === 'Main' &&
        (track.trackKind === TrackKind.Video ||
          track.trackKind === TrackKind.Audio)
      ) {
        if (track.trackKind === TrackKind.Audio) {
          this.setState({audioTrack: track});
        } else if (track.trackKind === TrackKind.Video) {
          // WebrtcCallHandler.getInstance().getMeetingHandler().updateSpatialForTrack(track,0)
          this.setState({videoTrack: track});
          // if (!track.isLocalTrack) {
          //   this.props.isFullScreenView
          //     ? VideoHandler.getInstance()
          //         .getMeetingHandler()
          //         .updateSpatialForTrack(track, 1)
          //     : VideoHandler.getInstance()
          //         .getMeetingHandler()
          //         .updateSpatialForTrack(track, 0);
          // }
        }
      } else if (
        this.videoHolderModel.videoHolderModelType === 'Screenshare' &&
        (track.trackKind === TrackKind.ScreenshareVideo ||
          track.trackKind === TrackKind.ScreenshareAudio)
      ) {
        if (
          !track.isLocalTrack &&
          track.trackKind === TrackKind.ScreenshareAudio
        ) {
          this.setState({audioTrack: track});
        } else if (track.trackKind === TrackKind.ScreenshareVideo) {
          this.setState({videoTrack: track});
        }
      }
    }
  }

  render() {
    const {item, index, participantsLength} = this.props;
    return (
      <View
        style={{
          flex: 1,
          height:
            participantsLength > 1
              ? (windowHeight * 0.9) / 2
              : (windowHeight) / 1,
            
        }}>
        <View style={styles.itemStyle}>
          <View
            style={{
              height: '100%', 
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{position: 'absolute', zIndex: 100, right: 10, top: 10}}>
              {!this.state.audioTrack ? (
                <Materialcom
                  name="mic-off"
                  size={25}
                  color={'white'}
                  style={{
                    marginRight: 6,
                    alignSelf: 'flex-end',
                  }}
                />
              ) : (
                <AudioWave audioTrack={this.state.audioTrack.track} />
              )}
            </View>
            {this.state.videoTrack && this.state.videoTrack.track&& 
              <VideoPlayer
                style={{height: '100%', width: '100%'}}
                key={this.state.videoTrack.track.id}
                isLocal={
                  this.isLocal &&
                  this.videoHolderModel?.videoHolderModelType === 'Main'
                }
                track={this.state.videoTrack.track}
              />
            
            }
          </View>

          <View
            style={{
              position: 'absolute',
             // bottom: 10,
              left: 10,
              zIndex:100,
              top:10
            }}>
            <Text style={{color: 'white', fontSize: 20}}>
              {' '}
              {this.props.videoHolderModel.participant.userData.name
                ? this.props.videoHolderModel.participant.userData.name
                : ''}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemStyle: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#1c1e1f',
    alignSelf: 'center',
   // justifyContent: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingVertical: '3%',
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: '#fff',
  },

  profile: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
