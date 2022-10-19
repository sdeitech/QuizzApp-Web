import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  Dimensions,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import InCallManager from "react-native-incall-manager";
import IO from "socket.io-client";
import Clipboard from "@react-native-clipboard/clipboard";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import Toast from "react-native-simple-toast";
import Share from "react-native-share";

import * as commonApi from "./../../ServiceRequests/serviceContest";
import assests from "../../common/assests";
import color from "../../utils/color";
import constants from "../../utils/appConstants";
import styles from "./styles";
import AdmHeader from "./components/AdmHeader";
import BottomView from "./components/BottomView";
import {
  Alert,
  InviteFriendsAlert,
  PopUpScreen,
  QuestionContantAlert,
  ReportModal,
} from "../../common/alertPop";
import ContestantsList from "./components/ContestantsList";
import QuestionComponentNew from "../../components/QuestionComponentNew";
import {
  LoaderAction,
  setCurrentRound,
  setPlayRoundList,
} from "../../redux/action";
import actionType from "../../redux/action/types";
import RoundInfoScreen from "./components/RoundInfoScreen";
import { Button, Loader } from "../../components/customComponent";
import ResultModal from "./components/ResultModal";
//import VideoCallingView from '../VideoCallingComponent';
import DuringVideoCall from "../DuringVideoCall";
import LocalVideo from "../LocalVideo";
import actionTypes from "../../redux/action/types";
import {
  userMuteVoice,
  userUnMuteVoice,
  userVideoMuteVoice,
  userVideoUnMuteVoice,
  _startRoundModerator,
  _resultSendSocket,
  _moderatorMoveNext,
} from "../../redux/action/videoActions";
import {
  _joinGameRoom,
  _moderatorLeaveRoom,
} from "../../redux/action/gameActions";
import RightOptionDots from "./components/RightOptionDots";
import TabooComponent from "../../components/TabooComponent";
import gameTypes from "../../utils/gameTypes";
import HangmanComponent from "../../components/HangmanComponent";
import GibbrishComponent from "../../components/GibbrishComponent";
import ModeratorAcceptList from "./components/ModeratorAcceptList";
import WaiingLoader from "./components/WaiingLoader";
import EmptyRoundComponent from "../../components/EmptyRoundComponent";
import UnscrambleComponent from "../../components/UnscrambleComponent";
import { MediaStreamTrack } from "react-native-webrtc";
import VideoHandler from "../../utils/VideoHandler";
import store from "../../redux/store";
import { VaniEvent } from "vani-meeting-client";
import VaniSetupHelper from "../../utils/VaniSetupHelper";

const AdmContestPlay = (props) => {
  console.log("Akkki props", props);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.authReducer.loader);
  const video = useSelector((state) => state.videoReducer);

  const playingRoundsRef = useRef(null);
  const currentRoundRef = useRef(null);

  // use ref for create reference to video call component
  const videoCallRef = useRef(null);

  const userCurrId = useRef("");
  // * competitive states
  const ansTimeRef = useRef(null);
  // ! competitive states end

  // game socket selector
  const gameReducer = useSelector((state) => state.gameReducer);

  const playingRounds = useSelector((state) => state.playReducer.playingRounds);
  const currentRound = useSelector((state) => state.playReducer.currentRound);
  playingRoundsRef.current = playingRounds;
  // currentRoundRef.current = currentRound;

  const [currRound, setcurrRound] = useState(0);
  currentRoundRef.current = currRound;

  const [errorMsgText, setErrorMsgText] = useState("");
  const [visiblerror, setVisibleError] = useState(false);
  const [connected, setConnected] = useState(false);
  const [asking, setAasking] = useState(props.isModerator ? false : true);
  const [participants, setParticipants] = useState([]);

  // state for hide or show the game view
  const [gameViewVisible, setgameViewVisible] = useState(true);

  // * for report success alert
  const [reportStatusLoading, setreportStatusLoading] = useState(false); // loader status
  const [reportSuccess, setreportSuccess] = useState(false); // modal status
  const [reportSuccessMessage, setreportSuccessMessage] = useState(""); // modal message

  // * quiz states
  const selectedAnsRef = useRef(null);
  const [quizData, setquizData] = useState([]);
  const [donequestion, setdonequestion] = useState(0);
  const [selectedAns, setselectedAns] = useState([]);
  const [rightIds, setrightIds] = useState([]);
  const [showHint, setshowHint] = useState(false);
  const [isFrontCamera, setCamera] = useState(true);
  const [micOff, setMicOff] = useState(true);
  const [videoOff, setVideoOff] = useState(true);

  // const [gameData, setgameData] = useState({});

  const [freeText, setfreeText] = useState("");

  const [wrongQuestions, setwrongQuestions] = useState([]);
  const [doneClick, setdoneClick] = useState(false);

  selectedAnsRef.current = selectedAns;
  // !!quiz

  const [curentQuizTime, setcurentQuizTime] = useState(0);

  const [chackedIndex, setchackedIndex] = useState(1);

  // * set points for each question
  const [latestAnswerPoint, setlatestAnswerPoint] = useState(0);
  // ! set points for each question

  const [questionBoxDialog, setquestionBoxDialog] = useState(false);
  const [exitDialogShow, setexitDialogShow] = useState(false);

  // * state for once submit answer is called
  const [isSubmitted, setisSubmitted] = useState(false);
  // ! state for once submit answer is called end

  // for show the component for play game and result
  const [bodyDisplayType, setbodyDisplayType] = useState(0);

  const [currentQueNo, setcurrentQueNo] = useState(2);

  // for set status if single user game then he can not see some values
  const [isSingle, setisSingle] = useState(true);

  // moderator options box visible status
  const [moderatorOpt, setmoderatorOpt] = useState(false);

  // check and update speaker status in vcall
  const [isSpeakerOn, setisSpeakerOn] = useState(false);

  // invite friends pop up
  const [inviteFriendvisible, setinviteFriendvisible] = useState(false);

  // report contest pop up
  const [isReport, setIsReport] = useState(false);

  // moderator leave room alert
  const [moderatorLeaveAlert, setmoderatorLeaveAlert] = useState(false);

  // console.log("get contest data => round data => count => ", currentRoundRef.current);
  // console.log("get contest data => round data => main data => ", playingRoundsRef.current);

  // data for temp display from props
  const {
    gameType = "",
    title: roundName,
    _id: roundId,
    parentId,
    execution_mode,
    scoring,
  } = playingRoundsRef.current[currentRoundRef.current];

  const { title, playerType } = props.contestInfo;
  // const { _id: gameId } = props.gameData;

  // for socket join game
  useEffect(() => {
    console.log(
      "round reference details => ",
      playingRoundsRef.current[currentRoundRef.current]
    );

    (async () => {
      console.log(
        "admnew details props => ",
        JSON.stringify(props.contestInfo)
      );
      const userId = await AsyncStorage.getItem("userid");

      // set user id to use in whole page
      userCurrId.current = userId;

      const roomID = props?.contestInfo?.response?._id;

      console.log("join room details : ", roomID, userId, props.gameData._id);

      dispatch(_joinGameRoom({ roomID, userId }));

      const payload = {
        userId,
      };
      dispatch({ type: actionType.GAME_CLIENT_USERS, payload });
    })();

    // set global is moderator or not
    dispatch({
      type: actionType.GAME_MODERATOR_STATUS,
      payload: props.isModerator,
    });
  }, []);

  useEffect(() => {
    VideoHandler.getInstance().eventEmitter.on("OnConnected", () => {
      console.log("connected");
      setConnected(true);
      if (VideoHandler.getInstance().getMeetingRequest().isAdmin === false) {
        console.log("inside no admin");
        setAasking(true);
        VaniSetupHelper.getInstance().askIfUserCanJoinMeeting();
      }
    });
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      .on(VaniEvent.OnNewChatMessageReceived, onNewChatMessageReceived);
  }, []);

  const onNewChatMessageReceived = (messagePayload) => {
    if (messagePayload.type === "JoinRequest") {
      console.log("new Join request");
      console.log("join data", messagePayload.sender);
      if (
        messagePayload.sender &&
        messagePayload.sender.userData &&
        messagePayload.sender.userData.name
      ) {
        // setParticipants([...participant, messagePayload.sender]);
        const payload = messagePayload.sender;
        console.log("payload", payload);
        store.dispatch({
          type: actionTypes.VIDEO_CLIENT_USERS_REQUEST_ADD,
          payload,
        });
        // setrequestModel(true);
      }
    } else if (messagePayload.type === "JoinRequestApproved") {
      console.log("new Join Approved");
      const selfParticipant = VideoHandler.getInstance()
        .getMeetingHandler()
        .getAllParticipants()
        .find(
          (participant) =>
            participant.userId ===
            VideoHandler.getInstance().getMeetingRequest().userId
        );
      if (selfParticipant) {
        selfParticipant.userData.isApproved = true;
      }
      VideoHandler.getInstance()
        .getMeetingHandler()
        .updateParticipantData(selfParticipant);
      setAasking(false);
      // props.setWaitScreen(false);
      // console.log(messagePayload.participant.userData)
    } else if (messagePayload.type === "JoinRequestDeclined") {
      console.log("new Join request declined");
      setAasking(false);
      props.navigation.pop();
      // props.setWaitScreen(false);
      return;
      // console.log(messagePayload.participant.userData)
    }
  };
  useEffect(() => {
    console.log("video call ref :: ", videoCallRef);
    if (videoCallRef.current) {
      // videoCallRef.current.getAlert();
      // videoCallRef.current.startCall(props.isModerator);
      // return () => {
      //     videoCallRef.current.endCall();
      // }
    }
  }, []);

  // ! old game reducer dependency
  // useEffect(() => {
  //     if (gameReducer.isStarted) {
  //         mainViewChanger();
  //     }

  //     if (gameReducer.lastAnswerResult !== undefined && execution_mode === 1) {
  //         _onSubmitClick(gameReducer.lastAnswerResult, true);

  //         const payload = { resultStatus: undefined };
  //         dispatch({ type: actionType.GAME_LAST_ANS_RESULT, payload });
  //     }

  //     // call when server calling for next screen
  //     if (gameReducer.moveToNext && execution_mode === 2) {
  //         _onSubmitClick("", "", true);
  //         dispatch({ type: actionType.GAME_MODERATOR_NEXT_ROOM_COMP, payload: false });
  //     }
  // }, [gameReducer]);

  // * new game reducer based on video reducer
  useEffect(() => {
    if (video.isStarted) {
      mainViewChanger();
    }

    if (video.lastAnswerResult !== undefined && execution_mode === 1) {
      _onSubmitClick(video.lastAnswerResult, true);

      const payload = { resultStatus: undefined };
      dispatch({ type: actionType.GAME_LAST_ANS_RESULT, payload });
    }

    // call when server calling for next screen
    if (video.moveToNext && execution_mode === 2) {
      _onSubmitClick("", "", true);
      dispatch({
        type: actionType.GAME_MODERATOR_NEXT_ROOM_COMP,
        payload: false,
      });
    }
  }, [video]);

  useEffect(() => {
    _setData();
  }, [currRound]);

  useEffect(() => {
    console.log(video.moderatorLeaveRoom, "main alert for leaving the room");
    setTimeout(() => {
      setmoderatorLeaveAlert(video.moderatorLeaveRoom);
    }, 300);
  }, [video.moderatorLeaveRoom]);

  const setGameType = () => {
    getQuestionList();
    // switch (playingRoundsRef.current[currentRoundRef.current].gameType.toLowerCase()) {
    //     case 'quiz':
    //         // setbodyDisplayType(1);
    //         getQuestionList();
    //         break;
    //     default:
    //         break;
    // }
  };

  const getQuestionList = async () => {
    console.log("get contest data => ", JSON.stringify(props.contestInfo));

    // console.log("get contest data => round data => count => ", currentRoundRef.current);
    // console.log("get contest data => round data => main data => ", playingRoundsRef.current[currentRoundRef.current]);

    try {
      // dispatch(LoaderAction(true))

      console.log("roundID ==>>> parentId => ", parentId);
      console.log("roundID ==>>> roundId => ", roundId);

      const response = await commonApi.RoundquestionsAPI(
        {},
        dispatch,
        parentId || roundId,
        gameType
      );

      if (response["status"]) {
        console.log("round questions => 001 ", JSON.stringify(response));

        console.log(response.data);
        setquizData(response.data);
      } else {
        setTimeout(() => {
          setErrorMsgText(response.message);
          setVisibleError(true);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setErrorMsgText(error);
        setVisibleError(true);
      }, 1000);
    } finally {
      dispatch(LoaderAction(false));
    }
  };

  const _addByNameClick = () => {
    setinviteFriendvisible(false);
    Actions.addByName({ roomId: props.contestInfo.response._id });
  };

  const _addByContactClick = () => {
    setinviteFriendvisible(false);
    Actions.addByName({
      roomId: props.contestInfo.response._id,
      isFriend: true,
    });
    // Actions.addByContact({ roomId: props.contestInfo.response._id });
  };

  const _addByFacebookClick = () => {
    setinviteFriendvisible(false);
    _shareInviteOthers();
    // Actions.addByFacebook({ roomId: props.contestInfo.response._id });
  };

  const _shareInviteOthers = async () => {
    try {
      const link = await _generateLinkText();
      const shareOptions = {
        title: "Murabbo",
        message: `You can join room via:\n${link}`,
      };
      await Share.open(shareOptions);
    } catch (error) {}
  };
  console.log("asking", asking);
  const mainViewChanger = () => {
    switch (
      playingRoundsRef.current[currentRoundRef.current].gameType.toLowerCase()
    ) {
      case gameTypes.Quiz.toLowerCase():
      case gameTypes.GuessAndGo.toLowerCase():
        setbodyDisplayType(1);
        break;
      case gameTypes.Taboo.toLowerCase():
        setbodyDisplayType(2);
        break;
      case gameTypes.Hangman.toLowerCase():
        setbodyDisplayType(3);
        break;
      case gameTypes.Gibberish.toLowerCase():
        setbodyDisplayType(4);
        break;
      case gameTypes.Blank.toLowerCase():
        setbodyDisplayType(5);
        break;
      case gameTypes.Unscramble.toLowerCase():
        setbodyDisplayType(6);
        break;
      default:
        setbodyDisplayType(1);
        break;
    }
  };

  const _setData = () => {
    // console.log("set data new type props => ", JSON.stringify(quizData));
    setdonequestion(0);
    // setgameData({});
    setwrongQuestions([]);
    setrightIds([]);
    setselectedAns([]);
    setdoneClick(false);
    setisSubmitted(false);

    if (playerType === 2) {
      setisSingle(false);
    }

    setGameType();
  };

  // const _createGame = async (roundId, contestId) => {
  //     try {
  //         // dispatch(LoaderAction(true))

  //         const data = await AsyncStorage.getItem('userid');
  //         console.log("create game detail => ", data, roundId, contestId);

  //         const formData = {
  //             "contestId": contestId,
  //             "roundId": roundId,
  //             "createdBy": data
  //         };

  //         console.log("my form data => ", JSON.stringify(formData));

  //         const response = await commonApi.createGame(formData, dispatch);

  //         if (response['status']) {
  //             console.log("proper filtered data => ", JSON.stringify(response?.data));

  //             return response?.data;
  //         }
  //         else {
  //             throw response.message;
  //             // setTimeout(() => {
  //             //     setErrorMsgText(response.message);
  //             //     setVisibleError(true);
  //             // }, 1000);
  //         }
  //     } catch (error) {
  //         throw error;
  //         // setTimeout(() => {
  //         //     setErrorMsgText(error);
  //         //     setVisibleError(true);
  //         // }, 1000);
  //     }
  // }

  const _onRoundClick = async () => {
    // try {
    //     const _gameData = await _createGame(roundId, props.contestInfo._id);
    //     setgameData(_gameData);
    // } catch (error) {
    //     setTimeout(() => {
    //         setErrorMsgText(error);
    //         setVisibleError(true);
    //     }, 1000);
    // }
    const roomID = props?.contestInfo?.response?._id;

    dispatch(_startRoundModerator({ roomID }));

    mainViewChanger();
  };

  const _displayReturntype = () => {
    // if (!props.isModerator && gameReducer.requestAccepted === undefined && !isSingle) {
    //     return (
    //         <WaiingLoader />
    //     )
    // }

    if (video?.loaderForRequestedUsers) {
      return null;
    }

    switch (bodyDisplayType) {
      case -1:
        return (
          <ResultModal
            gameData={props.gameData}
            roundDetail={playingRoundsRef.current[currentRoundRef.current]}
            onDoneClick={() => _onResultScreen()}
            deleteRoom={() => _deleteRoom()}
            isLastRound={playingRounds.length - 1 === currRound}
          />
        );
      case 0:
        return (
          <RoundInfoScreen
            item={{ ...playingRoundsRef.current[currentRoundRef.current] }}
            onPlayClick={() => _onRoundClick()}
            onEndClick={() => setexitDialogShow(true)}
            isModerator={props.isModerator}
            isSingle={isSingle}
          />
        );
      case 1: // quiz game
        return (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            {
              // console.log("my new own quiz data => ", JSON.stringify(quizData))
            }
            {/* <ScrollView> */}
            <QuestionComponentNew
              questionLength={quizData.length}
              donequestion={donequestion}
              roundId={roundId}
              quizData={quizData}
              selectedAns={selectedAns}
              setselectedAns={setselectedAns}
              setcurentQuizTime={setcurentQuizTime}
              rightIds={rightIds}
              doneClick={doneClick}
              wrongQuestions={wrongQuestions}
              onSingleDoneClick={() => _onSubmitClick()}
              questionTimeEnd={() => _onSubmitClick("", "", true)}
              compititiveNext={() => _onModeratorNextComp()}
              gameData={props.gameData}
              // roomId={roomId}
              timeLimits={curentQuizTime}
              totalTimer={quizData[donequestion]?.timeLimit}
              freeText={freeText}
              setfreeText={setfreeText}
              showHint={showHint}
              setshowHint={setshowHint}
              isModerator={props.isModerator}
              executionMode={execution_mode}
              scoringType={scoring}
              latestAnswerPoint={latestAnswerPoint}
              setlatestAnswerPoint={setlatestAnswerPoint}
              onNextClick={() => _onSubmitClick(false)}
              onCorrectClick={() => _onSubmitClick(true)}
              isSingle={isSingle}
            />
            {/* </ScrollView> */}
          </View>
        );
      case 2: // taboo game
        return (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <TabooComponent
              questionLength={quizData.length}
              donequestion={donequestion}
              roundId={roundId}
              quizData={quizData}
              isModerator={props.isModerator}
              wrongQuestions={wrongQuestions}
              onNextClick={() => _onSubmitClick(false)}
              onCorrectClick={() => _onSubmitClick(true)}
              timeLimits={curentQuizTime}
              doneClick={doneClick}
              setcurentQuizTime={setcurentQuizTime}
              totalTimer={quizData[donequestion]?.timeLimit}
            />
          </View>
        );
      case 3: // hangman game
        return (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <HangmanComponent
              questionLength={quizData.length}
              donequestion={donequestion}
              roundId={roundId}
              quizData={quizData}
              isModerator={props.isModerator}
              wrongQuestions={wrongQuestions}
              onNextClick={() => _onSubmitClick(false)}
              onCorrectClick={() => _onSubmitClick(true)}
              doneClick={doneClick}
            />
          </View>
        );
      case 4: // gibbrish game
        return (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <GibbrishComponent
              questionLength={quizData.length}
              donequestion={donequestion}
              roundId={roundId}
              quizData={quizData}
              isModerator={props.isModerator}
              wrongQuestions={wrongQuestions}
              onNextClick={() => _onSubmitClick(false)}
              onCorrectClick={() => _onSubmitClick(true)}
              doneClick={doneClick}
            />
          </View>
        );
      case 5: // blank round
        return (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <EmptyRoundComponent
              roundDetail={playingRoundsRef.current[currentRoundRef.current]}
              timeLimit={_totalTimer()}
              setcurentQuizTime={setcurentQuizTime}
            />
            {/* <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => {}}
                        >
                            <Text style={{ fontSize: 13, letterSpacing: 1.33, textAlign: 'center', fontFamily: appConstants.fontBold, color: '#22343C' }}>Skip</Text>
                        </TouchableOpacity> */}
            {props.isModerator && (
              <Button
                title={"Skip Round"}
                textStyle={{
                  fontSize: 17,
                  color: "#22343C",
                  letterSpacing: 3.09,
                  fontFamily: appConstants.fontBold,
                }}
                style={styles.play}
                onPress={() => _onSubmitClick(false)}
              />
            )}
          </View>
        );
      case 6: // Unscramble
        return (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <UnscrambleComponent
              questionLength={quizData.length}
              donequestion={donequestion}
              quizData={quizData}
              wrongQuestions={wrongQuestions}
              doneClick={doneClick}
              onNextClick={() => _onSubmitClick(false)}
              onCorrectClick={() => _onSubmitClick(true)}
              latestAnswerPoint={latestAnswerPoint}
              setlatestAnswerPoint={setlatestAnswerPoint}
            />
          </View>
        );
      default:
        return;
    }
  };

  const _submitAnswerToServer = async (isCorrect) => {
    try {
      const questionData = quizData[donequestion];

      console.log(questionData, "heyeyeyeyeyyeyeeyeyeeyye");
      const timeUsed = questionData?.timeLimit - ansTimeRef.current;

      console.log("timeUsed data => timeLimit => ", questionData?.timeLimit);
      console.log(
        "timeUsed data => ansTimeRef.current => ",
        ansTimeRef.current
      );
      console.log("timeUsed data => ", timeUsed);

      let remainTimes = 1;

      if (ansTimeRef.current !== 0) {
        remainTimes = ansTimeRef.current / 1000;
      }

      const selectedAnswer = selectedAnsRef.current;
      let userId = await AsyncStorage.getItem("userid");

      const myScoreGameType = playingRoundsRef.current[
        currentRoundRef.current
      ].gameType.toLowerCase();

      if (myScoreGameType === gameTypes.Taboo.toLowerCase()) {
        userId = gameReducer?.currentAssignedUser;
      }

      const countScore = () => {
        let score = 0;
        if (isCorrect) {
          score = score + questionData?.basePoints;

          if (execution_mode === 2) {
            score = score * remainTimes;
          }
        }

        if (!isCorrect && questionData?.negativeScoring) {
          score = score - questionData?.negativeBasePoints;
        }

        if (showHint) {
          score = score - questionData?.onDemandNegativePoints;
        }
        return score;
      };

      // set points from here
      setlatestAnswerPoint(countScore());

      const formData = new FormData();

      formData.append("gameId", props.gameData._id);
      formData.append("userId", userId);
      formData.append("roundQuestionId", questionData?._id);
      formData.append(
        "selectedAnswer",
        selectedAnswer.length > 0 ? selectedAnswer.join(",") : ""
      );
      formData.append("isCorrect", isCorrect);
      formData.append("score", countScore());
      formData.append("timeAlloted", questionData?.timeLimit);
      formData.append("timeUsed", timeUsed);

      if (props?.contestInfo?.response?._id) {
        formData.append("roomId", props?.contestInfo?.response?._id);
      }

      console.log("my form data => ", JSON.stringify(formData));

      const response = await commonApi.submitQuestion(formData, dispatch);

      console.log("response for game data pass => ", JSON.stringify(response));
      if (response["status"]) {
        // alert(response.message);
        // alert(JSON.stringify(response.data));
      } else {
        _submitAnswerToServer(isCorrect);
        // alert(response.message + "message");
        // setTimeout(() => {
        // setErrorMsgText(response.message);
        // setVisibleError(true);
        // }, 1000);
      }
    } catch (error) {
      alert(error);
      _submitAnswerToServer(isCorrect);
      // alert(error);
      // setTimeout(() => {
      //     setErrorMsgText(error);
      //     setVisibleError(true);
      // }, 1000);
    }
  };

  const _questionResult = async ({ rightAnsIds, isTrue, fromSocket }) => {
    // console.log("answers ids => true ", JSON.stringify(rightAnsIds));
    // console.log("answers ids => selected ", JSON.stringify(selectedAnsRef.current));

    // console.log("my question is => this ", JSON.stringify(quizData[donequestion]));

    let rightAnswer = true;

    if (!isTrue) {
      if (quizData[donequestion]?.answerType === 5) {
        // console.log("get result of user => answer from server => ", quizData[donequestion]?.answerTypeBoolean);
        // console.log("get result of user => selected => ", selectedAnsRef.current);

        // if (quizData[donequestion]?.answerTypeBoolean !== undefined && selectedAnsRef.current.includes(1)) {
        if (
          (selectedAnsRef.current.includes(0) &&
            quizData[donequestion]?.answerTypeBoolean === false) ||
          (selectedAnsRef.current.includes(1) &&
            quizData[donequestion]?.answerTypeBoolean === true)
        ) {
          rightAnswer = true;
        } else {
          rightAnswer = false;
        }
      } else if (quizData[donequestion]?.answerType === 3) {
        const freeTextIndex = quizData[donequestion]?.answers.findIndex(
          (x) => x.answer.trim().toLowerCase() === freeText.trim().toLowerCase()
        );
        if (freeTextIndex === -1) {
          rightAnswer = false;
        }
      } else if (
        rightAnsIds &&
        selectedAnsRef.current.length === rightAnsIds.length
      ) {
        for (const item of rightAnsIds) {
          rightAnswer = selectedAnsRef.current.includes(item);
          if (!rightAnswer) break;
        }
      } else {
        rightAnswer = false;
      }

      // let rightAnswer = false;
      // if (quizData[donequestion]?.answerType === 5) {
      //     if (quizData[donequestion]?.answerTypeBoolean && selectedAnsRef.current.includes(1)) {
      //         rightAnswer = true;
      //     } else {
      //         rightAnswer = false;
      //     }
      // } else {
      //     if (selectedAnsRef.current.length > 0) {
      //         rightAnswer = true;
      //         for (const item of selectedAnsRef.current) {
      //             rightAnswer = rightAnsIds.includes(item);
      //             if (!rightAnswer) break;
      //         }
      //     }
      // }
    }

    try {
      // if answers submit from socket do not send currunt user answer to server
      if (!fromSocket) {
        await _submitAnswerToServer(rightAnswer);
      }
    } catch (error) {}

    return rightAnswer;
  };

  const _onSubmitClick = async (
    isTrue = false,
    fromSocket = false,
    _fromTimeCom = false
  ) => {
    try {
      // dispatch(LoaderAction(true));
      if (quizData.length > 0 && !isSubmitted) {
        setdoneClick(true);
        ansTimeRef.current = curentQuizTime < 0 ? 0 : curentQuizTime;

        console.log(
          "timeUsed data => curent quiz time => prev => ",
          curentQuizTime
        );

        if (!_fromTimeCom && execution_mode === 2) return 0;

        setisSubmitted(true);

        const rightAnsObject = quizData[donequestion]?.answers?.filter(
          (item) => item.correctAnswer === true
        );

        console.log("on submit click ans => ", quizData[donequestion]);
        console.log("rightAnsObject on submit click ans => ", rightAnsObject);

        const rightAnsIds = rightAnsObject?.map((item) => item._id);

        const resultStatus = await _questionResult({
          rightAnsIds,
          isTrue,
          fromSocket,
        });

        console.log("get result of user => ", resultStatus);

        if (!fromSocket) {
          // socket called for submit answer for user
          const roomID = props?.contestInfo?.response?._id;
          dispatch(_resultSendSocket({ roomID, resultStatus }));
        }

        if (resultStatus) {
          if (quizData[donequestion]?.answerType === 5) {
            setrightIds([quizData[donequestion]?.answerTypeBoolean ? 1 : 0]);
          } else {
            setrightIds(rightAnsIds);
          }

          setTimeout(() => {
            _redirectProcess();
          }, 5000);
        } else {
          if (quizData[donequestion]?.answerType === 5) {
            setrightIds([quizData[donequestion]?.answerTypeBoolean ? 1 : 0]);
          } else {
            setrightIds(rightAnsIds);
          }
          setwrongQuestions([...wrongQuestions, donequestion]);
          setTimeout(() => {
            _redirectProcess();
          }, 5000);
        }
        dispatch(LoaderAction(false));
      } else {
        setTimeout(() => {
          dispatch(LoaderAction(false));
          _redirectProcess();
        }, 5000);
      }

      console.log("submit click ans => END");
    } catch (error) {
      dispatch(LoaderAction(false));
      console.log("error for submit click ans => ", error);
    }
  };

  const _onModeratorNextComp = () => {
    const roomID = props?.contestInfo?.response?._id;
    dispatch(_moderatorMoveNext({ roomID }));
  };

  const _onResultScreen = () => {
    try {
      if (playingRounds.length - 1 === currRound) {
        // Actions.leaderBoard();
        // alert("error => extra");
      } else {
        // dispatch(setCurrentRound(currentRound + 1));
        setcurrRound((prev) => prev + 1);
        dispatch(setPlayRoundList(playingRounds));
        setbodyDisplayType(0);
      }
    } catch (error) {}
  };

  const _redirectProcess = () => {
    if (donequestion + 1 === quizData.length) {
      setbodyDisplayType(-1);

      const payload = {
        status: false,
      };
      dispatch({ type: actionType.GAME_START_STATUS, payload });
    } else if (
      playingRoundsRef.current[
        currentRoundRef.current
      ].gameType.toLowerCase() === gameTypes.Blank.toLowerCase()
    ) {
      setbodyDisplayType(-1);

      const payload = {
        status: false,
      };
      dispatch({ type: actionType.GAME_START_STATUS, payload });
    } else {
      _nextQuestion();
    }
  };

  const _nextQuestion = () => {
    try {
      if (quizData[donequestion]?.answerType === 3) {
        setfreeText("");
      }

      setdonequestion((prev) => {
        const newDoneNumber = prev + 1;
        setcurentQuizTime(quizData?.[newDoneNumber]?.timeLimit);
        return newDoneNumber;
      });
      setrightIds([]);
      setselectedAns([]);
      setdoneClick(false);
      setisSubmitted(false);

      const roomID = props?.contestInfo?.response?._id;

      if (props.isModerator) {
        dispatch(_startRoundModerator({ roomID }));
      }
    } catch (error) {}
  };

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

  const _muteToggle = () => {
    const tracks = video.myStream.getTracks();
    const isMute = _isAudioMute(tracks);

    if (isMute) {
      dispatch(userUnMuteVoice(props?.contestInfo?.response?._id));
    } else {
      dispatch(userMuteVoice(props?.contestInfo?.response?._id));
    }
  };

  const _cameraToggle = () => {
    const tracks = video.myStream.getTracks();
    const isMute = _isAudioMute(tracks);

    if (isMute) {
      dispatch(userUnMuteVoice(props?.contestInfo?.response?.gamePin));
    } else {
      dispatch(userMuteVoice(props?.contestInfo?.response?.gamePin));
    }
  };

  const _muteVideoToggle = () => {
    const tracks = video.myStream.getTracks();
    const isVideoMute = _isVideoMute(tracks);

    if (isVideoMute) {
      dispatch(userVideoUnMuteVoice(props?.contestInfo?.response?._id));
    } else {
      dispatch(userVideoMuteVoice(props?.contestInfo?.response?._id));
    }
  };

  const _changeVolumeType = (status) => {
    console.log("is Speaker on => " + !status);
    setTimeout(() => {
      InCallManager.setForceSpeakerphoneOn(status);
      InCallManager.setSpeakerphoneOn(status);
      setisSpeakerOn(status);
      // InCallManager.setMicrophoneMute(status);
    }, 100);
  };

  const _toggleSpeaker = (status) => {
    _changeVolumeType(status);
  };

  const _timerEndHeader = async () => {
    const selfUserId = await AsyncStorage.getItem("userid");

    if (
      selfUserId === gameReducer?.currentAssignedUser ||
      execution_mode === 2
    ) {
      // _onSubmitClick();
      _onSubmitClick("", "", true);
    }
  };

  const _flipCamView = () => {
    try {
      video?.myStream?.getVideoTracks()?.forEach((track) => {
        track?._switchCamera();
      });
    } catch (error) {}
  };

  const _pauseCamView = () => {
    try {
      video?.myStream?.getVideoTracks()?.forEach((track) => {
        // track?.muted = true;
      });
      // if (video?.myStream?.getVideoTracks().length) {
      //     video?.myStream?.getVideoTracks()[0].enabled = false;
      // }
    } catch (error) {}
  };

  const _endOfGame = async () => {
    setexitDialogShow(false);

    if (props.isModerator) {
      _deleteRoom();
    } else {
      setTimeout(() => {
        Actions.reset("Tabs");
      }, 1000);
    }
  };

  const _deleteRoom = async () => {
    await AsyncStorage.setItem("isDynamic", "yes");
    Actions.reset("Tabs");
    dispatch(LoaderAction(false));
    // try {
    //     dispatch(LoaderAction(true));

    //     if (isSingle) Actions.reset("Tabs");
    //     else {
    //         const roomID = props?.contestInfo?.response?._id;

    //         const formData = new FormData();

    //         formData.append("roomId", roomID);

    //         const response = await commonApi.gameDeleteAPI(formData, dispatch);

    //         if (response['status']) {
    //             // alert("delee room");
    //             console.log("delete game => ", JSON.stringify(response.data));
    //         } else {
    //             setTimeout(() => {
    //                 // setErrorMsgText(response.message);
    //                 // setVisibleError(true);
    //             }, 1000);
    //         }
    //     }

    // } catch (error) {
    //     setTimeout(() => {
    //         // setErrorMsgText(error);
    //         // setVisibleError(true);
    //     }, 1000);
    // } finally {
    //     const roomID = props?.contestInfo?.response?._id;
    //     // dispatch(_moderatorLeaveRoom({ roomID }));
    //     // dispatch(leaveRoom(roomID, props.isModerator));
    //     await AsyncStorage.setItem('isDynamic', "yes");
    //     Actions.reset("Tabs");
    //     dispatch(LoaderAction(false));
    // }
  };

  const _onDoneClick = () => {
    // alert();
    dispatch({ type: actionType.GAME_MODERATOR_LEAVE_ROOM, payload: false });
    Actions.reset("Tabs");
  };

  const _onReportPress = async (feedback) => {
    try {
      Keyboard.dismiss();
      setreportStatusLoading(true);
      setTimeout(async () => {
        // dispatch(LoaderAction(true));
        const userId = await AsyncStorage.getItem("userid");
        const { _id } = props.contestInfo;
        const roomId = props?.contestInfo?.response?._id;

        const formData = new FormData();

        // formData.append('title', 'Report Contest');
        formData.append("contestId", _id);
        formData.append("roomId", roomId || "");
        formData.append("description", feedback);
        formData.append("userId", userId);

        const response = await commonApi.reportContest(formData, dispatch);

        console.log("Report Contest response::", JSON.stringify(response));

        if (response["status"]) {
          // Actions.Tabs();
          setreportStatusLoading(false);
          setIsReport(false);
          setTimeout(() => {
            setreportSuccess(true);
            setreportSuccessMessage(response["message"]);
          }, 300);
        } else {
          setreportStatusLoading(false);
          setIsReport(false);
          setTimeout(() => {
            console.log(response["message"], "Report error message");
            setVisibleError(true);
            setErrorMsgText(response["message"]);
          }, 300);
        }
      }, 1000);
    } catch (error) {
      setreportStatusLoading(false);
      setIsReport(false);
      setTimeout(() => {
        setVisibleError(true);
        setErrorMsgText(error);
      }, 300);
    }
  };

  const _generateLinkText = async () => {
    const newLink ="https://play.murabbo.com"
    const oldLink ="https://murabbo.page.link"

    const roomId = props?.contestInfo?.response?._id;
    const contestId = props.contestInfo._id;
    const link = await dynamicLinks().buildShortLink({
      link: `${newLink}?roomId=${roomId}&contestId=${contestId}`,
      // link: `https://murabboapp.page.link?contestId=${}`,
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: newLink,
      ios: {
        bundleId: "com.cozycrater.murabbo",
        appStoreId: "1554420524",
      },
      android: {
        packageName: "com.cozycrater.murabbo",
      },
    });
    return link;
  };

  const _generateLink = async () => {
    try {
      setinviteFriendvisible(false);

      const link = await _generateLinkText();

      Clipboard.setString(`You can join room via:\n${link}`);
      Toast.show("Link Copied!");
      console.log("new link available => ", link);
    } catch (error) {
      console.log("new link available => error => ", error);
    }
  };

  const _totalTimer = () => {
    let timerData = 0;

    if (quizData.length) {
      timerData = quizData[donequestion]?.timeLimit;
    } else {
      timerData = playingRoundsRef.current[currentRoundRef.current]?.timeLimit;
      console.log(
        "time limit => ",
        playingRoundsRef.current[currentRoundRef.current]?.timeLimit
      );
    }

    return timerData;
  };

  const _onMembersPress = () => {
    _onHeaderRightClick(false);
    // Actions.membersList({ roomId: props?.contestInfo?.response?.gamePin, isModerator: props.isModerator });
    Actions.membersList({
      roomId: props?.contestInfo?.response?._id,
      isModerator: props.isModerator,
      participants: VideoHandler.getInstance()
        .getMeetingHandler()
        .getAllParticipants(),
    });
  };

  const _onHeaderRightClick = (status) => {
    const isCreator = props?.contestInfo?.createdBy === userCurrId?.current;

    if (isCreator && isSingle) return;

    // if (isSingle || !props.isModerator) {
    if (isSingle) {
      setIsReport(true);
    } else {
      setmoderatorOpt(status);
    }
  };
  console.log("loader", loader);
  return (
    <SafeAreaView
      style={styles.container}
      onStartShouldSetResponder={(evt) => {
        evt.persist();
        setmoderatorOpt(false);
      }}
    >
      {!connected ? null : asking ? (
        <LocalVideo
          navigation={props.navigation}
          route={props.route}
          roomId={props?.contestInfo?.response?._id}
          data={props}
          asking={asking}
        />
      ) : (
        <DuringVideoCall
          navigation={props.navigation}
          route={props.route}
          roomId={props?.contestInfo?.response?._id}
          data={props}
          asking={asking}
        />
      )}

      <StatusBar backgroundColor={color.statusBar} barStyle="light-content" />
      <AdmHeader
        title={title}
        subTitle={`${roundName || ""} (${gameType || ""})`}
        notifyNumbers={3}
        timeLimits={curentQuizTime}
        donequestion={donequestion}
        setcurentQuizTime={setcurentQuizTime}
        questionTimeEnd={() => _timerEndHeader()}
        totalTimer={_totalTimer()}
        doneClick={doneClick}
        toggleModeratorOption={_onHeaderRightClick}
        isModerator={props.isModerator}
        isSingle={isSingle}
        bodyDisplayType={bodyDisplayType}
      />
      {moderatorOpt && (
        <RightOptionDots
          toggleModeratorOption={(status) => setmoderatorOpt(status)}
          roomId={props?.contestInfo?.response?._id}
          gameId={props.gameData._id}
          onMuteAllClick={() => {}}
          onGiveScoreClick={() => {}}
          onReportClick={() => {
            setIsReport(true);
          }}
          onInviteUsersClick={() => {
            setinviteFriendvisible(true);
          }}
          isCreator={props?.contestInfo?.createdBy === userCurrId.current}
          _onMembersPress={_onMembersPress}
          isModerator={props.isModerator}
        />
      )}

      {
        // toggle game hide/show
        // !isSingle && !moderatorOpt &&
        // (
        //     <TouchableOpacity
        //         onPress={() => setgameViewVisible(prev => !prev)}
        //         style={styles.gameVisibleButtonContainer}
        //     >
        //         <Image source={assests.eye} resizeMode='stretch' style={styles.gameVisibleButton} />
        //     </TouchableOpacity>
        // )
      }

      {!loader && (
        <View style={[styles.innerContainer]}>
          <View style={styles.mainBodyStyle}>
            <ScrollView
              contentContainerStyle={styles.mainBodyScrollStyle}
              style={{ display: gameViewVisible ? "flex" : "none" }}
            >
              {_displayReturntype()}
            </ScrollView>

            <ModeratorAcceptList roomID={props?.contestInfo?.response?._id} />
          </View>

          <PopUpScreen
            isModalVisible={visiblerror}
            msgText={errorMsgText}
            isError={true}
            onCloseModal={() => setVisibleError(false)}
            _applyAction={() => setVisibleError(false)}
          />

          <PopUpScreen
            isModalVisible={reportSuccess}
            msgText={reportSuccessMessage}
            onCloseModal={() => setreportSuccess(false)}
            _applyAction={() => setreportSuccess(false)}
          />

          <InviteFriendsAlert
            title={"Add Friends"}
            isModalVisible={inviteFriendvisible}
            buttonTitle={"Copy Invite Link"}
            onDoneClick={() => _generateLink()}
            addByNamePress={() => _addByNameClick()}
            addByContactPress={() => _addByContactClick()}
            addByFacebookPress={() => _addByFacebookClick()}
            onBack={() => setinviteFriendvisible(false)}
          />

          <ReportModal
            title={"Report Contest"}
            desc={"Please tell us in detail about your report..."}
            isModalVisible={isReport}
            buttonTitle={"Report"}
            cancelTitle={"Cancel"}
            reportStatusLoading={reportStatusLoading}
            onBackClick={() => setIsReport(false)}
            onDoneClick={(feedback) => _onReportPress(feedback)}
          />

          <Alert
            // title={'Are you sure!'}
            heading={"Are you sure, you want to leave?"}
            isModalVisible={exitDialogShow}
            buttonTitle={"Leave"}
            cancleTitle={"Cancel"}
            onCancel={() => {
              setexitDialogShow(false);
            }}
            logout={() => _endOfGame()}
          />

          <Alert
            heading={"Moderator left the room!"}
            isModalVisible={moderatorLeaveAlert}
            buttonTitle={"Leave"}
            isHideCancel
            isCloseHide
            logout={() => _onDoneClick()}
          />

          <Loader isLoading={loader} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AdmContestPlay;
