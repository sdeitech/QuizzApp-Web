import {MeetingHandler, MeetingType} from 'vani-meeting-client';
import EventEmitter from 'events';

class VideoHandler {
  static instance = null;

  

  meetingRequest;

  eventEmitter;

  isAdmin;

  roomId;

  messages;

  callMembers;

  static getInstance() {
    if (VideoHandler.instance === null) {
      VideoHandler.instance = new VideoHandler();
    }
    return VideoHandler.instance;
  }

  constructor() {
    this.meetingHandler = new MeetingHandler();
    this.meetingRequest = undefined;
    this.eventEmitter = new EventEmitter();
    this.isAdmin = false;
    this.roomId = null;
    this.messages = [];
    this.callMembers = [];
    this.isVideoCall = true;
    this.getMeetingRequest = this.getMeetingRequest.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.cleanUp = this.cleanUp.bind(this);
    this.onNewChatMessageReceived = this.onNewChatMessageReceived.bind(this);
    // this.onInitDone = this.onInitDone.bind(this)
    // this.onSocketConnected = this.onSocketConnected.bind(this)
  }

  cleanUp() {
    // this.unregisterOfEvents()
    console.log('Vani CLeanup');
    this.getMeetingHandler().endAndDestory();
    this.meetingRequest = undefined;
    this.messages = [];
    this.callMembers = [];
    this.eventEmitter.removeAllListeners();
    VideoHandler.instance = null;
  }

  setup(roomId, userData, isAdmin) {
    console.log("QQQ",roomId,userData,isAdmin);
    this.isAdmin = isAdmin;
    if (!this.meetingRequest || this.meetingRequest == null) {
      this.meetingRequest = this.getMeetingHandler().meetingStartRequestObject(
        roomId,
        `${new Date().getTime() + Math.floor(Math.random() * 1000)}`,
        'MurabboMobileApp',
        'wss://meetserver.murabbo.com/?connection=',
      );
      this.meetingRequest.numberOfUsers = 10;
      this.meetingRequest.isMobileApp = true
      this.meetingRequest.userData = userData;
      this.meetingRequest.isAdmin = this.isAdmin;
      this.meetingRequest.videoCaptureHeight = 240;
      this.meetingRequest.videoCaptureWidth = 180;
      this.meetingRequest.meetingType = MeetingType.SFU;
      console.log("this.meetingRequest");
    }
  }

  // Check Online offline
  getUserByUserId(userId) {
    const participantById = this.getMeetingHandler()
      .getAllParticipants()
      .find(participant => participant.userData.id === userId);
    return participantById;
  }

  ///
  onNewChatMessageReceived(messagePayload) {
    this.messages.push(messagePayload);
    this.eventEmitter.emit('onMessageListUpdated', this.messages);
  }

  sendMessage(messagePayload) {
    this.meetingHandler.sendMessage(messagePayload);
    this.onNewChatMessageReceived(messagePayload);
  }

  getMeetingHandler() {
    return this.meetingHandler;
  }

  getMeetingRequest() {
    return this.meetingRequest;
  }
}

export default VideoHandler;
