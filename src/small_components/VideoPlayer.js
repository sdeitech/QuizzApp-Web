import React from 'react';
import {Component} from 'react';
import {RTCView, MediaStream} from 'react-native-webrtc';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    //   this.state = {
    //     mediaStrem :
    //   }
  }

  componentDidMount() {
    console.log('componentDidMount');

    // if (
    //   this.videoPlayer !== null &&
    //   this.videoPlayer.current !== null &&
    //   this.props.track &&
    //   this.props.track !== null
    // ) {
    //   this.videoPlayer.current.srcObject = new MediaStream([this.props.track]);
    // } else if (
    //   this.videoPlayer !== null &&
    //   this.videoPlayer.current !== null &&
    //   (!this.props.track || this.props.track === null)
    // ) {
    //   this.videoPlayer.current.srcObject = null;
    // }
  }

  render() {
    return (
      <RTCView
        style={{height: '100%', width: '100%'}}
        key="bigVideo"
        zOrder={100}
        mirror={true}
        objectFit="cover"
        streamURL={new MediaStream([this.props.track]).toURL()}
      />
    );
  }
}
