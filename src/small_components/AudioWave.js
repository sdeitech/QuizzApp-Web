import hark from "hark";
import React from "react";
import { Component } from "react";
import LottieView from 'lottie-react-native';
import {RTCView, MediaStream} from 'react-native-webrtc';

export default class AudioWave extends Component {
  // speechEvents: hark.Harker;
  constructor(props) {
    super(props);
    this.state = {
      isUserSpeaking: false,
    };
    this.lottieOptions = {
      loop: true,
      autoplay: true,
      animationData: require("../Lottie/hark.json"),
    };
    this.speechEvents = hark(new MediaStream([this.props.audioTrack]));

    this.onSpeaking = this.onSpeaking.bind(this);
    this.onStopSpeaking = this.onStopSpeaking.bind(this);
  }

  componentDidMount() {
    this.speechEvents.on("speaking", this.onSpeaking);

    this.speechEvents.on("stopped_speaking", this.onStopSpeaking);
  }

  componentWillUnmount() {
    // this.speechEvents.stop();
  }

  onSpeaking() {
    this.setState({ isUserSpeaking: true });
  }

  onStopSpeaking() {
    this.setState({ isUserSpeaking: false });
  }

  render() {
    return (
      <>
       
         <LottieView
                   isStopped={!this.state.isUserSpeaking}

                  style={{
                 // position:"absolute",
                  zIndex:2000,
                  height:30,
                  width:30,
                  marginRight:10
                  
                }}
                source={require('../Lottie/hark.json')}
                autoPlay loop
              />
        </>
    );
  }
}
