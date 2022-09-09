import VideoHandler from "./VideoHandler";
import { VaniEvent, MessagePayload } from "vani-meeting-client";

class VaniSetupHelper {
  static instance = new VaniSetupHelper();

  static getInstance() {
    return this.instance;
  }

  constructor() {
    this.cleanup = this.cleanup.bind(this);
    this.onInitDone = this.onInitDone.bind(this);
    this.onSocketConnected = this.onSocketConnected.bind(this);
    this.onAllParticipants = this.onAllParticipants.bind(this);
    this.declineJoinRequest = this.declineJoinRequest.bind(this);
    this.askIfUserCanJoinMeeting = this.askIfUserCanJoinMeeting.bind(this);
    this.approveJoinRequest = this.approveJoinRequest.bind(this);
  }

  setUp(roomId, userData, isModerator) {
    console.log("from vani", roomId);
    userData.isApproved = isModerator;
    VideoHandler.getInstance().setup(roomId, userData, isModerator);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnInitDone, this.onInitDone);

    VideoHandler.getInstance().getMeetingHandler().init();
  }

  onInitDone() {
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnAllParticipants, this.onAllParticipants);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnSocketConnected, this.onSocketConnected);
    VideoHandler.getInstance().getMeetingHandler().checkSocket();
  }

  onSocketConnected() {
    console.log("on socket connected");
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getUpdatedParticipantsListFromServer();
  }

  onAllParticipants(participants) {
    console.log("on all partic");
    VideoHandler.getInstance().eventEmitter.emit("OnConnected", {});
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .off(VaniEvent.OnAllParticipants, this.onAllParticipants);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .off(VaniEvent.OnSocketConnected, this.onSocketConnected);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .off(VaniEvent.OnInitDone, this.onInitDone);
  }

  askIfUserCanJoinMeeting() {
    const admin = VideoHandler.getInstance()
      .getMeetingHandler()
      .getAllParticipants()
      .find((participant) => participant.isAdmin === true);
    console.log("vani-part");
    console.log(
      VideoHandler.getInstance().getMeetingHandler().getAllParticipants()
    );
    if (admin) {
      console.log("admin", admin);
      const messagePayload = new MessagePayload("JoinRequest", admin.userId);
      messagePayload.type = "JoinRequest";
      VideoHandler.getInstance()
        .getMeetingHandler()
        .sendMessage(messagePayload);
      return true;
    } else {
      console.log("admin", admin);
      return false;
    }
  }

  approveJoinRequest(participant) {
    const messagePayload = new MessagePayload(
      "JoinRequestApproved",
      participant.userId
    );
    messagePayload.type = "JoinRequestApproved";
    VideoHandler.getInstance().getMeetingHandler().sendMessage(messagePayload);
  }

  declineJoinRequest(participant) {
    const messagePayload = new MessagePayload(
      "JoinRequestDeclined",
      participant.userId
    );
    messagePayload.type = "JoinRequestDeclined";
    VideoHandler.getInstance().getMeetingHandler().sendMessage(messagePayload);
  }
  cleanup() {
    this.instance = new VaniSetupHelper();
  }
}

export default VaniSetupHelper;
