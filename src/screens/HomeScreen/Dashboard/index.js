import React, { useEffect, useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { VaniEvent } from "vani-meeting-client";
import { Pages } from "react-native-pages";
import actionTypes from "../../../redux/action/types";
import AsyncStorage from "@react-native-community/async-storage";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import DraggableGrid from "react-native-draggable-grid";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { styles } from "./styles";
// components
import appConstants from "../../../common/appConstants";
import MaineHeader from "../../../common/headerNext";
import assests from "../../../common/assests";
import { Actions } from "react-native-router-flux";
import BoxView from "./boxView";
import { BoxBottomView, BottomBoxView, BottomBox } from "./bottomBox";
// import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from '@shankarmorwal/rn-viewpager';
import Multiplayer from "./multiplayer";
import color from "../../../utils/color";
import * as actionType from "../../../redux/action";
import * as commonApi from "../../../ServiceRequests/serviceContest";
import * as commonApiAuth from "./../../../ServiceRequests/serviceAuth";
import { LoaderAction } from "../../../redux/action";
import { _changeDeepLinkStatus } from "../../../redux/action/gameActions";
import { PopUpScreen } from "../../../common/alertPop";
import { Loader } from "../../../components/customComponent";
import { clearAllData } from "../../../components/helper";
import gameTypes from "../../../utils/gameTypes";
import Toast from "react-native-tiny-toast";
import VideoHandler from "../../../utils/VideoHandler";
import store from "../../../redux/store";

const { width } = Dimensions.get("screen");

function DiscussionDetails(props) {
  // const imageData = [
  //     {
  //         "_id": "607021a8d89ada4549dcd7ea",
  //         "createdByName": "Akshay",
  //         "title": "Hula Hoops",
  //         "description": "How to hula hoop ",
  //         "image": "https://api.murabbo.com/api/uploads/contest/contest_1617961384346GX5KZy.jpg"
  //     },
  //     {
  //         "_id": "60821469c0e71b0bc2c6cd2a",
  //         "createdByName": "Kruti",
  //         "title": "Bollywood quiz",
  //         "description": "multiplayer from iPhone ",
  //         "image": ""
  //     }
  // ];
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.authReducer.loader);
  const deepLinkingStated = useSelector(
    (state) => state.gameReducer.deepLinkingStated
  );

  const [trendContests, setTrendContests] = useState([]);
  const [trendRounds, setTrendRounds] = useState([]);
  const [gameOfTheDay, setgameOfTheDay] = useState([]);
  //Error Dialog
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [errorMsgText, setErrorMsgText] = useState("");
  const [visibl, setVisible] = useState(false);
  const [apicount, setApicount] = useState(1);
  const [apicount1, setApicount1] = useState(1);

  // const [roundTrayData1, setRoundTrayData1] = useState([
  //     { key: 'one', color: '#68C1D2', name: 'HangMan', icon: assests.imgbackground },
  //     { key: 'five', color: '#EFB3FE', name: 'Match It', icon: assests.imgBackgroundPink },
  //     { key: 'three', color: '#FF5485', name: 'Unscramble', icon: assests.imgBackgroundRed },
  //     { key: 'six', color: '#F9B17F', name: 'Guess & Go', icon: assests.imgBackgounddYello },
  //     { key: 'seven', color: '#EFB3FE', name: 'Gibberish', icon: assests.imgBackgroundPink },
  //     { key: 'four', color: '#93DEC0', name: 'Bingo', icon: assests.imgBackgoundGreen },
  //     { key: 'two', color: '#FFC542', name: 'Quizz', icon: assests.imgBackgroundYe },
  //     { key: 'eight', color: '#F9B17F', name: 'Taboo', icon: assests.imgBackgounddYello },
  // ])

  const [roundTrayData, setRoundTrayData] = useState([
    {
      key: "one",
      color: "#68C1D2",
      name: "HangMan",
      icon: assests.imgbackground,
    },
    {
      key: "five",
      color: "#EFB3FE",
      name: "Match It",
      icon: assests.imgBackgroundPink,
    },
    {
      key: "three",
      color: "#FF5485",
      name: "Unscramble",
      icon: assests.imgBackgroundRed,
    },
    {
      key: "six",
      color: "#F9B17F",
      name: "GuessAndGo",
      icon: assests.imgBackgounddYello,
    },
    {
      key: "seven",
      color: "rgb(253,163,163)",
      name: "Gibberish",
      icon: assests.imgBg_gibberish,
    },
    {
      key: "four",
      color: "#93DEC0",
      name: "Bingo",
      icon: assests.imgBackgoundGreen,
    },
    { key: "two", color: "#FFC542", name: "Quiz", icon: assests.imgBg_quiz },
    {
      key: "eight",
      color: "#B2E698",
      name: "Taboo",
      icon: assests.imgBackgroundTaboo,
    },
  ]);

  const [isPager, setispager] = useState(true);

  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        trackScroll={true}
        dotStyle={{ backgroundColor: "#355360", bottom: -28 }}
        selectedDotStyle={{ backgroundColor: "#FCD274", bottom: -28 }}
        pageCount={imageData.length}
      />
    );
  };

  // * for deep link starts here
  useEffect(() => {
    _dynamicLinksFunc();
  }, []);

  const _dynamicLinksFunc = async () => {
    if (!deepLinkingStated) {
      // chenge status for deeplinking
      dispatch(_changeDeepLinkStatus(true));

      dynamicLinks()
        .getInitialLink()
        .then(async (link) => {
          console.log("registering dyanmic");
          const regex = /[?&]([^=#]+)=([^&#]*)/g;
          let params = {};
          let match;
          while ((match = regex.exec(link.url))) {
            params[match[1]] = match[2];
          }
          const splitUrl = link.url.split("/").pop().split("?");
          console.log("deeplinking params => ", link.url.split("/").pop());
          console.log("deeplinking params => ", params);
          await AsyncStorage.removeItem("isDynamic");
          const contestId = splitUrl[0];
          const roomId = splitUrl[1];
          const isRedirected = await AsyncStorage.getItem("isDynamic");

          if (roomId && contestId && !isRedirected) {
            await _getContestDetail(roomId, contestId);
          }
        })
        .catch((error) => {
          console.log("error => ", error);
        });
    }
  };

  const _getContestDetail = async (roomId, contestId) => {
    try {
      dispatch(LoaderAction(true));
      // const userID = await AsyncStorage.getItem('userid');

      const response = await commonApi.saveContestGetAPI(
        0,
        dispatch,
        "",
        "",
        "",
        contestId
      );
      // dispatch(LoaderAction(false))
      console.log("data of my games => ", JSON.stringify(response.data));

      if (response["status"]) {
        console.log("data of getting contest => ", response.data[0]);
        _getRoomDetails(response.data[0], roomId);
      }
    } catch (error) {
      console.log("error is => _getContestDetail => ", error);
    }
  };

  const _getRoomDetails = async (contestInfo, invitedRoomId) => {
    try {
      dispatch(LoaderAction(true));

      console.log("data of my rooms => params => ", contestInfo, invitedRoomId);

      // console.log("user id => ", data);
      const response = await commonApi.roomListing("", invitedRoomId, dispatch);
      // dispatch(LoaderAction(false))
      console.log("data of my rooms => ", JSON.stringify(response.data));

      const roomResponse = response.data.jsonData.data[0];
      const {
        gamePin,
        password,
        roomId,
        displayName,
        gameId,
        _id,
      } = roomResponse;

      if (response["status"]) {
        _getRoundList({
          contestInfo: {
            ...contestInfo,
            response: { gamePin, password, roomId, displayName, _id },
          },
          gameId,
        });
        // console.log("contest info which is sending => ", JSON.stringify({ contestInfo: { ...contestInfo, response: { gamePin, password, roomId, displayName } } }));
        // Actions.contestEnter({ contestInfo: { ...contestInfo, response: { gamePin, password, roomId, displayName } } });
      }
    } catch (error) {
      Toast.show(`Room has been deleted`);
      console.log("error is => _getRoomDetails ", error);
    }
  };

  const _getRoundList = async ({ contestInfo, gameId }) => {
    try {
      // dispatch(LoaderAction(true));

      console.log("get round list 123 => ", contestInfo, gameId);
      const response = await commonApi.getRoundList(
        dispatch,
        0,
        contestInfo._id
      );
      console.log("arrData==== response :) ", JSON.stringify(response));

      if (response["status"]) {
        const properData = response?.data.filter((item) => item.title);

        // dispatch(setCurrentRound(0));
        dispatch(actionType.setPlayRoundList(properData));
        // dispatch(LoaderAction(true));

        // const gameData = await _createGame("", contestInfo._id);

        // console.log("game data from join click => ", JSON.stringify(gameData));
        dispatch(LoaderAction(false));

        Actions.admContestPlayNew({
          contestInfo: { ...contestInfo },
          gameData: { _id: gameId },
        });
      } else {
        setTimeout(() => {
          console.log("error is => ", response.message);
          // setErrorMsgText(response.message);
          // setVisibleError(true);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        console.log("error is => ", error);
        // setErrorMsgText(error);
        // setVisibleError(true);
      }, 1000);
    }
  };
  // ! for deep link ends here

  useEffect(() => {
    getTredContests();
    getTredRouds();
    getGameOftheDay();
    getSubscriptionDetails();
    getMamNumberOfQuestions();
    _getUserInformation();
  }, []);

  const _getUserInformation = async () => {
    try {
      const userId = await AsyncStorage.getItem("userid");

      const response = await commonApiAuth.getUserProfile(userId, dispatch);

      if (response["status"]) {
        dispatch(actionType.SaveUserDataAction(response?.data));
      }
    } catch (error) {
      console.log("error is => _getUserInformation ", error);
    }
  };

  const getSubscriptionDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem("userid");

      const response = await commonApi.getUserSubscription(userId, dispatch);

      console.log("subscription => ", response);

      if (response["status"]) {
        dispatch(
          actionType.getSubscriptionAction(
            response?.data?.jsonData?.data?.currentPlan
          )
        );
      } else {
      }
    } catch (error) {
      // alert(error);
    }
  };

  const getMamNumberOfQuestions = async () => {
    try {
      const response = await commonApi.getMaxNumberQuestion(dispatch);

      console.log("max number of questions => ", response);

      if (response["status"]) {
        dispatch(
          actionType.getMaxNumberQuestionAction(
            response?.data?.jsonData?.data?.maxQuestionLimit
          )
        );
      } else {
      }
    } catch (error) {
      // alert(error);
    }
  };

  /**
   * Get Games Data
   */
  const getTredContests = async () => {
    try {
      dispatch(LoaderAction(true));
      const response = await commonApi.getGamesList(
        "",
        "",
        "",
        "",
        "yes",
        0,
        dispatch
      );
      console.log("response => ", JSON.stringify(response));
      if (response["status"]) {
        const arrData = response.data;
        if (arrData.length > 0) {
          dispatch(actionType.getGamesDataAction(response.data));
        } else {
          dispatch(actionType.getGamesDataAction([]));
        }
        setTrendContests(arrData);
      } else {
        setTimeout(() => {
          setErrorMsgText("No data available");
          setVisible(true);
          if (response["message"] === "Invalid Token!") {
            clearAllData();
            Actions.loginscreen();
          }
          setTrendContests([]);
        }, 1000);
      }
    } catch (error) {
      // alert(error);
    }
  };

  /**
   * Get Game of The Day
   */
  const getGameOftheDay = async () => {
    try {
      dispatch(LoaderAction(true));

      const userId = await AsyncStorage.getItem("userid");

      const response = await commonApi.getGameOfTheDay(userId, dispatch);
      console.log("response of game of the day => ", JSON.stringify(response));

      if (response["status"]) {
        setgameOfTheDay(response.data);
      } else {
      }
    } catch (error) {
      // alert(error);
    }
  };

  const getTredRouds = async () => {
    dispatch(LoaderAction(true));
    const response = await commonApi.getTredRoundList(dispatch, 0);
    console.log("arrData==== rounds => ", JSON.stringify(response));
    if (response["status"]) {
      const arrData = response.data;
      console.log("arrData====", arrData);
      setTrendRounds(arrData);
      setVisible(true);
    } else {
      setTimeout(() => {
        setErrorMsgText("No data available");
        setVisible(true);
        setTrendRounds([]);
      }, 1000);
    }
  };

  async function CallApi() {
    setApicount(apicount + 1);
    // const data = await AsyncStorage.getItem('userid')
    dispatch(LoaderAction(true));
    const response = await commonApi.getTredRoundList(dispatch, apicount);

    if (response["status"]) {
      if (response.data != null && response.data != undefined) {
        response.data.map((data) => trendRounds.push(data));
      }
    }
  }

  async function CallApiCon() {
    setApicount1(apicount1 + 1);
    // const data = await AsyncStorage.getItem('userid')
    dispatch(LoaderAction(true));
    const response = await commonApi.getGamesList(
      "",
      "",
      "",
      "",
      "yes",
      apicount1,
      dispatch
    );

    if (response["status"]) {
      if (response.data != null && response.data != undefined) {
        response.data.map((data) => trendContests.push(data));
      }
    }
  }

  const render_item = (item) => {
    const itemName = () => {
      if (item.name === gameTypes.GuessAndGo) return "Guess & Go";
      return item.name;
    };

    return (
      <View key={item.key} style={[styles.bottomBoxContainer]}>
        <View
          style={[styles.bottomBoxInnerView, { backgroundColor: item.color }]}
        >
          <Image style={styles.boxLogo} source={item.icon} />
          {/* <Image style={styles.crossLogo} source={assests.crossCircle} /> */}
          <Text style={styles.bottomBoxText}>{itemName()}</Text>
        </View>
      </View>
    );
  };

  const emptyListView = (title) => {
    return (
      <View style={styles.emptyListBox}>
        <Text style={{ color: "#FFFFFF", fontSize: 10 }}>
          {visibl && !loader ? title : ""}
        </Text>
      </View>
    );
  };

  const roundTitle = (comeFrom, item) => {
    const sunName = "Round"; // comeFrom === 'rounds' ? 'Round' : 'Question';
    // console.log("round is this::", comeFrom);
    if (!item.totalRound) return item.numberOfQuestions + " Question";
    if (item.totalRound > 1) {
      return `${item.totalRound} ${sunName}s`;
    }
    return `${item.totalRound} ${sunName}`;
  };

  const _renderItems = (item, comeFrom) => {
    return (
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() =>
          Actions.contestInfo({ contestInfo: item, isRound: !item.totalRound })
        }
        disabled={comeFrom === "rounds"}
      >
        <View
          style={[styles.innerBox, { borderColor: "#68C1D2", height: "100%" }]}
        >
          {item.image ? (
            <Image
              style={styles.boxImage}
              source={{ uri: item.image }}
              resizeMode="stretch"
            />
          ) : (
            <Image
              style={styles.boxImage}
              source={assests.smallPlaceholder}
              resizeMode="stretch"
            />
          )}
          {/* <View style={{ alignSelf: 'center', alignItems: 'center'}}> */}
          <Text
            numberOfLines={1}
            style={[styles.questionText, { color: "#68C1D2" }]}
          >
            {item.title}
          </Text>

          <Text numberOfLines={1} style={styles.gamename}>
            {roundTitle(comeFrom, item)}
          </Text>

          <Text numberOfLines={1} style={styles.gameCreator}>
            {item.totalRound ? item.userName : item.createdBy}
          </Text>
          {/* </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  const clickViewAll = async (clickFrom) => {
    await AsyncStorage.setItem("searchFor", clickFrom);
    Actions.searchScreen({ searchFor: "contest" });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={color.statusBar} barStyle="light-content" />
      <MaineHeader
        subHeaderTextS={{ color: "#fff" }}
        onNextAction={() => Actions.notifications()}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#22343C" }}>
        <View style={styles.innerContainer}>
          {isPager ? (
            <View style={styles.paggerView}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              >
                {gameOfTheDay.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item._id}
                      style={{
                        height: 100,
                        width: width - 70,
                        marginTop: 2,
                        //   height: 'auto',
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 4,
                        marginRight: index ? 0 : 20,
                        overflow: "hidden",
                        borderWidth: 1,
                        borderColor: "#68C1D2",
                        //   backgroundColor: 'red'
                        flexDirection: "row",
                      }}
                      onPress={() => Actions.contestInfo({ contestInfo: item })}
                    >
                      <Image
                        style={{
                          flex: 1,
                          height: "100%",
                          backgroundColor: color.translucentDarkBule,
                        }}
                        loadingStyle={{ size: "large", color: "blue" }}
                        source={
                          item.image
                            ? { uri: item?.image }
                            : assests.smallPlaceholder
                        }
                        resizeMode={item.image ? "cover" : "contain"}
                      />

                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                          numberOfLines={1}
                          style={[styles.questionText, { color: "#68C1D2" }]}
                        >
                          {item.title || ""}
                        </Text>

                        <Text numberOfLines={1} style={styles.gamename}>
                          {`${item?.totalRound} Round`}
                        </Text>

                        <Text numberOfLines={1} style={styles.gameCreator}>
                          {item.createdByName || ""}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              {/* <IndicatorViewPager
                                style={styles.imageView}
                                showPageIndicator={true}
                                horizontalScroll={true}
                                // autoPlayEnable = {true}
                                indicator={_renderDotIndicator()}
                            >
                                {imageData.map((item, index) => {
                                    return (
                                        <View
                                            style={{
                                                marginTop: 2,
                                                //   height: 'auto',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 4,
                                                marginRight: index ? 0 : 50,
                                                overflow: 'hidden',
                                                //   backgroundColor: 'red'
                                            }}>
                                            <Image
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                }}
                                                loadingStyle={{ size: 'large', color: 'blue' }}
                                                source={assests.games} resizeMode={'cover'} />
                                        </View>
                                    )
                                })}
                            </IndicatorViewPager> */}

              {/* <TouchableOpacity
                                onPress={() => setispager(false)}
                                style={{
                                    position: 'absolute',
                                    top: 15,
                                    right: 10,
                                    borderRadius: 10
                                }}>
                                <Image
                                    loadingStyle={{ size: 'large', color: 'blue' }}
                                    source={assests.crossCircle} />
                            </TouchableOpacity> */}
            </View>
          ) : null}
          <Text style={{ fontSize: 22, color: "#FCD274", marginTop: 30 }}>
            Trending{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 13, color: "#ADBAC1" }}>Contests</Text>
            {!loader &&
              trendContests.length > 0 &&
              false && ( // <-- comment this if you want to see view all button
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => clickViewAll("contest")}
                >
                  <Text style={{ fontSize: 10, color: "#FCD274" }}>
                    View All{" "}
                  </Text>
                  <Image source={assests.forwordYellow} />
                </TouchableOpacity>
              )}
          </View>
          {trendContests.length !== 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={trendContests}
              horizontal={true}
              renderItem={({ item }) => _renderItems(item, "contest")}
              // ListEmptyComponent={() => emptyListView("No data found")}
              keyExtractor={(item, index) => item._id.toString()}
              // onEndReached={() => CallApiCon()}
              onEndReachedThreshold={0.3}
              // scrollEnabled={trendContests.length !== 0}
            />
          ) : (
            emptyListView("No data found")
          )}

          {/* <BoxView data={trendContests} /> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            <Text style={{ fontSize: 13, color: "#ADBAC1" }}>Rounds</Text>
            {!loader &&
              trendContests.length > 0 &&
              false && ( // <-- comment this if you want to see view all button
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => Actions.roundsSearch()}
                >
                  <Text style={{ fontSize: 10, color: "#FCD274" }}>
                    View All{" "}
                  </Text>
                  <Image source={assests.forwordYellow} />
                </TouchableOpacity>
              )}
          </View>

          {trendRounds.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={trendRounds}
              horizontal={true}
              renderItem={({ item }) => _renderItems(item, "rounds")}
              keyExtractor={(item, index) => item._id.toString()}
              // onEndReached={() => CallApi()}
              onEndReachedThreshold={0.3}
            />
          ) : (
            emptyListView("No data found")
          )}
          {/* <Multiplayer data={trendRounds} /> */}

          <DraggableGrid
            style={{ marginTop: 50 }}
            data={roundTrayData}
            numColumns={3}
            //   onDragRelease={(data) => _onDataChange(data)}
            key={"roundTry"}
            onItemPress={(item) => {
              // Actions.roundsSearch({ gameType: item.name })
            }}
            renderItem={render_item}
            keyExtractor={(item, index) => {
              item.key;
            }}
          />

          {/* <BoxBottomView icons={assests.imgbackground}
                        icons1={assests.imgBackgoundGreen}
                        icons2={assests.imgBackgounddYello}
                        color={'#68C1D2'}
                        color2={'#F2BE47'}
                        color3={'#FF5485'}
                        boxStyle={{ marginTop: 60 }} />

                    <BottomBoxView
                        icons={assests.imgBackgoundGreen}
                        icons1={assests.imgBackgroundPink}
                        icons2={assests.imgBackgroundYe}
                        color={'#93DEC0'}
                        color2={'#EFB3FE'}
                        color3={'#F9B17F'}
                        boxStyle={{ marginTop: 18 }}
                    />
                    <BottomBox
                        icons={assests.imgBackgoundGreen}
                        icons1={assests.imgBackgroundPink}
                        icons2={assests.imgBackgroundYe}
                        color={'#93DEC0'}
                        color2={'#EFB3FE'}
                        color3={'#F9B17F'}
                        boxStyle={{ marginTop: 18 }}
                    /> */}
        </View>

        <Loader isLoading={loader} />
      </ScrollView>
    </SafeAreaView>
  );
}
export default DiscussionDetails;
