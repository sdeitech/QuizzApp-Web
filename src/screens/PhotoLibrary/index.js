import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Video from "react-native-video";

import * as commonApi from "../../ServiceRequests/serviceContest";
import assests from "../../common/assests";
import styles from "./styles";
import MaineHeader from "../../common/headerWithText";
import { LoaderAction } from "../../redux/action";
import { Button, Loader } from "../../components/customComponent";
import { Actions } from "react-native-router-flux";
import appConstants from "../../utils/appConstants";
import VideoItem from "./components/VideoItem";
import isUserAuthorizedItem from "../../utils/helpers/isUserAuthorizedItem";
import { Alert } from "../../common/alertPop";
import color from '../../utils/color';

const PhotoLibrary = (props) => {

  const [data, setdata] = useState([]);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.authReducer.loader);
  const [tabIndex, setTabIndex] = React.useState(0);

  const [selectedMedia, setselectedMedia] = useState({});
  const videoPlayer = [];
  const [searchKeyword, setSearchKeyword] = useState("");

  const [params, setParams] = useState(null);
  // filter object will be use for pagination
  const [categoryId, setCategoryId] = useState();
  const [searchdata, setSearchData] = useState([]);
  const [dynamicCategory, setdynamicCategory] = useState([]);
  const [isIconShow, setIconShow] = useState(false);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [pageNos, setPageNos] = useState(0);


  // subscription alert dialog
  const [subscriptionAlert, setsubscriptionAlert] = useState(false);

  // useEffect(() => {

  // });

  useEffect(() => {
    setShow(false);
    setCount(0);
    setSearchData([]);
    fetchCategories();

    // if (pageNos === 0) {
    //   setdata([]);
    // }
    fetchMyAPI();
  }, [pageNos]);

  useEffect(() => {
    console.log("CHANGEEEEEEDDDDDDD");
    fetchMyAPI();
  }, [categoryId]);

  const fetchCategories = async () => {
    try {
      dispatch(LoaderAction(true));

      let categoryResponse = await commonApi.getCategoryList(dispatch);
      if (categoryResponse["status"]) {

        console.log("categoryResponse => ", JSON.stringify(categoryResponse.data));

        const categoryNewMap = categoryResponse.data.map((x) => ({
          title: x.name,
          id: x._id,
          isSelected: false,
        }));

        setdynamicCategory([
          {
            title: "All",
            id: 0,
            isSelected: true,
          },
          ...categoryNewMap,
        ]);

        if (categoryId === null) {
          setCategoryId(categoryNewMap[0].id);
        }
      }
    } catch (error) {
      // alert(error);
    }
  };

  const fetchMyAPI = async (fromClosed) => {
    console.log("fetchMyAPICalled");
    try {
      dispatch(LoaderAction(true));

      console.log("user id => ", data);


      console.log("media library params", pageNos,
        props.mediaType,
        searchKeyword,
        categoryId,
        dispatch);

      const newSearchKeyword = fromClosed ? "" : searchKeyword;
      const newPageNo = fromClosed ? 0 : pageNos;

      const response = await commonApi.mediaLibraryGetAPI(
        newPageNo,
        props.mediaType,
        newSearchKeyword,
        categoryId,
        dispatch
      );
      // dispatch(LoaderAction(false));
      console.log(
        "category display :: data of mediaLibraryGetAPI => ",
        JSON.stringify(response), ` ${pageNos}`
      );

      if (response?.data) {
        var playIds = [];
        const requests = response.data.map((value, index) => {
          console.log("RESPONSEVALUE = ", value);

          let item = value;
          item.isplaying = false;
          return item;
        });

        Promise.all(requests).then(() => {
          if (response["status"]) {
            console.log("SETDATA CALLED");
            if (pageNos === 0) {
              setdata([...response.data]);
            } else {
              setdata([...data, ...response.data]);
            }
          } else {
            // alert(response.message);
          }
        });
      }

      // var dts = [];
    } catch (error) {
      // alert(error);
    }
  };

  const _onItemClick = (item) => {
    try {
      if (isUserAuthorizedItem(item?.subscriptionType)) {
        if (selectedMedia?._id === item._id) {
          setselectedMedia({});
        } else {
          setselectedMedia(item);
        }
      } else {
        setsubscriptionAlert(true);
      }
    } catch (error) {
      // alert(error);
    }
  };

  const mediaItem = (item, index) => {
    console.log(`ITEM = ${item} Index = ${index} `);
    switch (props.mediaType) {
      case "image":
        return (
          <View
            style={[
              styles.itemContainer,
              {
                borderWidth: selectedMedia?._id === item._id ? 3 : 0,
                marginBottom: 10,
              },
            ]}
          >
            <Image
              style={[styles.image]}
              source={{ uri: item.image }}
              resizeMode={"stretch"}
            />
            <View style={{ justifyContent: "center", height: 35 }}>
              <Text
                style={[styles.titleLabel, { marginTop: 1 }]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
            </View>
          </View>
        );
      case "video":
        return (
          // <Video
          //   source={{ uri: item.url }}
          //   onBuffer={() => {}}
          //   onError={(error) => {
          //     alert(error);
          //   }}
          //   style={[
          //     styles.image,
          //     {
          //       borderWidth: selectedMedia?._id === item._id ? 3 : 0,
          //     },
          //   ]}
          //   paused
          //   controls
          //   resizeMode={"stretch"}
          // />
          <View
            style={[
              styles.itemContainer,
              {
                borderWidth: selectedMedia?._id === item._id ? 3 : 0,
                marginBottom: 10,
              },
            ]}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <VideoItem
                file={item.url}
              />

              <View style={{ justifyContent: "center", height: 35 }}>
                <Text
                  style={[styles.titleLabel, { marginTop: 1 }]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
              </View>
            </View>
          </View>
        );
      case "audio":
        return (
          <View
            style={[
              styles.itemContainer,
              {
                borderWidth: selectedMedia?._id === item._id ? 3 : 0,
                marginBottom: 10,
              },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <Video
                ref={(r) => (videoPlayer[item._id] = r)}
                source={{ uri: item.url }}
                onBuffer={() => { }}
                // onError={(error) => alert("File not supported")}
                style={styles.audio}
                // repeat
                paused
                audioOnly={true}
                resizeMode={"stretch"}
              />
              {/* <Image source={assests.audio} style={styles.playVideoIcon} /> */}
              {/* {playedIds[index] ? ( */}
              {item.isplaying ? (
                <TouchableOpacity
                  style={[styles.playVideoIcon, {
                    flex: 1,
                    alignItems: "center",
                  }]}
                  key={Math.random()}
                  onPress={() => {
                    console.log("PAUSE CALLED");

                    data.map((value, valueIndex) => {
                      console.log(`Value = ${JSON.stringify(value)}`);
                      let changedValue = value;
                      if (value._id !== item._id) {
                        videoPlayer[value._id].setNativeProps({
                          paused: true,
                        });
                      } else {
                        changedValue.isplaying = false;
                        videoPlayer[value._id].setNativeProps({
                          paused: true,
                        });
                      }

                      return changedValue;
                    });

                    // console.log(`playedIdsAfter = ${playedIds}`);

                    let tempData = data;
                    // tempData[index].isplaying = false

                    setTimeout(() => {
                      setdata(Object.assign([], tempData));
                    }, 0);

                    // setTimeout(() => {
                    //   setdata(tempData);
                    // }, 0);
                  }}
                  disabled={!isUserAuthorizedItem(item?.subscriptionType)}
                >
                  <Image
                    source={assests.pause}
                    key={Math.random()}
                    style={{ height: 20, width: 20, tintColor: "#FCD274" }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.playVideoIcon, {
                    flex: 1,
                    alignItems: "center",
                  }]}
                  key={Math.random()}
                  onPress={() => {
                    console.log("PLAY CALLED");
                    // console.log(`playedIdsBefore = ${playedIds}`);

                    data.map((value, valueIndex) => {
                      console.log(`Value = ${JSON.stringify(value)}`);
                      let changedValue = value;
                      if (value._id !== item._id) {
                        videoPlayer[value._id].setNativeProps({
                          paused: true,
                        });
                      } else {
                        changedValue.isplaying = true;
                        videoPlayer[value._id].setNativeProps({
                          paused: false,
                        });
                      }

                      return changedValue;
                    });

                    // console.log(`playedIdsAfter = ${playedIds}`);

                    let tempData = data;
                    // tempData[index].isplaying = false

                    setTimeout(() => {
                      setdata(Object.assign([], tempData));
                    }, 0);

                    // setTimeout(() => {
                    //   setdata(tempData);
                    // }, 0);
                  }}
                  disabled={!isUserAuthorizedItem(item?.subscriptionType)}
                >
                  <Image
                    source={assests.play}
                    key={Math.random()}
                    style={{ height: 18, width: 18, tintColor: "#FCD274" }}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              )}

              <View
                style={{
                  justifyContent: "center",
                  height: 35,
                  marginTop: -10,
                  marginBottom: 5,
                }}
              >
                <Text
                  style={styles.titleLabel}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 5,
                  paddingLeft: 5,
                }}
              >
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const _renderItem = (item, index) => {
    return (
      <View style={styles.renderItemViewContainer}>
        <TouchableOpacity
          style={[styles.renderItemContainer, {
            opacity: isUserAuthorizedItem(item?.subscriptionType) ? 1 : 0.4
          }]}
          onPress={() => _onItemClick(item, index)}
        // disabled={!isUserAuthorizedItem(item?.subscriptionType)}
        >
          {mediaItem(item, index)}

          {/* {
            !isUserAuthorizedItem(item?.subscriptionType) &&
            <Text
              style={{
                color: color.black,
                position: 'absolute',
                top: 40,
                textAlign: 'center',
                width: "100%",
                fontWeight: 'bold',
              }}
            >
              {item?.subscriptionType}
            </Text>
          } */}
        </TouchableOpacity>

        {
          !isUserAuthorizedItem(item?.subscriptionType) &&
          <View
            style={{
              backgroundColor: color.white,
              paddingHorizontal: 3,
              paddingVertical: 2,
              position: 'absolute',
              top: 6,
              // left: -4.3,
              borderRadius: 10,
              width: "70%",
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}
          >

            <Image
              resizeMode={'stretch'}
              style={{
                height: 12,
                width: 12
              }}
              source={assests.pro}
            />

            <Text
              style={{
                color: color.black,
                textAlign: 'center',
                fontSize: 10,
                // fontWeight: 'bold',
              }}
            >
              {item?.subscriptionType}
            </Text>
          </View>
        }
      </View>
    );
  };

  const emptyListView = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.emptyViewLabel}>
          {!loader ? "No data found" : ""}
        </Text>
      </View>
    );
  };

  const _headerTitle = () => {
    switch (props.mediaType) {
      case "image":
        return "Photo Library";
      case "video":
        return "Video Library";
      case "audio":
        return "Audio Library";
      default:
        return "";
    }
  };

  const _handleDoneClick = () => {
    if (props.mediaType === "image") {
      props.onSelect(selectedMedia.image);
      Actions.pop();
    } else if (props.mediaType === "video") {
      props.onSelect(selectedMedia.url);
      Actions.pop();
    } else if (props.mediaType === "audio") {
      props.onSelect(selectedMedia.url);
      Actions.pop();
    }
  };

  const _headerRightButton = () => {
    return (
      <Button
        title={"Done"}
        textStyle={{
          fontSize: 17,
          color: "#22343C",
          letterSpacing: 3.09,
          fontFamily: appConstants.fontBold,
        }}
        style={styles["doneButton"]}
        onPress={() => _handleDoneClick()}
      />
    );
  };

  const clickOnEnter = () => {
    console.log('ClickOnEnterCalled')
    setPageNos(0);
    if (searchKeyword) {
      console.log('ClickOnEnterCalled TRUE')
      // setdata([]);
      setCategoryId(Object.assign({}, categoryId));
    }
  };

  /**
   * Search Keyword
   */
  const handleOnSeachKeyword = (searchStr) => {
    if (searchStr.length > 0) {
      setIconShow(true);
    } else {
      setIconShow(false);
    }
    if (searchStr != "") {
      setSearchKeyword(searchStr);
    } else {
      setSearchKeyword("");
    }
  };

  /**
   * search cross click
   */
  const handleCloseClick = () => {
    Keyboard.dismiss();
    setIconShow(false);
    setSearchKeyword("");
    setSearchData([]);
    fetchMyAPI(true);
    // setPageNos(0);
  };

  /**
   * Render Header View
   */
  const renderHeaderView = () => {
    return (
      <View style={{ marginBottom: 5, height: 100 }}>
        <View
          style={[
            styles.bottomBorder,
            {
              backgroundColor: "#324B55",
              marginHorizontal: 15,
              flexDirection: "row",
              flex: 1,
            },
          ]}
        >
          <Image
            source={assests.search}
            resizeMode="contain"
            style={{ alignSelf: "center" }}
          />
          <TextInput
            placeholder={"Keyword"}
            placeholderTextColor={"#ADBAC1"}
            style={[styles.textInputSty, {}]}
            value={searchKeyword}
            onChangeText={(text) => [
              handleOnSeachKeyword(text),
              setParams(null),
            ]}
            onSubmitEditing={clickOnEnter}
            returnKeyType={"search"}
          />
          {isIconShow ? (
            <TouchableOpacity
              onPress={() => handleCloseClick()}
              style={{ alignSelf: "center" }}
            >
              <Image
                source={assests.close_pink}
                resizeMode="contain"
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {/* <TouchableOpacity
          onPress={() => [setFilterModelVisible(true), setSearchData([])]}
          style={{ alignSelf: "center", marginTop: 10 }}
        >
          <Image
            source={assests.filter}
            resizeMode="contain"
            style={{ alignSelf: "center", marginEnd: 20 }}
          />
          {count == 0 ? null : <Text style={styles.countTxtSty}>{count}</Text>}
        </TouchableOpacity> */}
        <View>
          <ScrollView horizontal>
            <FlatList
              // style={{ height: 60 }}
              key={Math.random()}
              data={dynamicCategory}
              renderItem={categoryRenderItem}
              numColumns={dynamicCategory.length}
            />
          </ScrollView>
        </View>
      </View>
    );
  };


  const categoryRenderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        alignItems: "center",
      }}
      onPress={() => {
        setTabIndex(index);
        setdata([]);

        setPageNos(0);

        setCategoryId(item.id);
      }}
    >
      <View
        style={{
          backgroundColor: "#324B55",
        }}
      >
        <View style={{ padding: 16 }}>
          <Text style={{ color: "#fff" }}>{item.title}</Text>
        </View>

        <View
          style={{
            borderBottomColor: tabIndex === index ? "#FCD274" : "#324B55",
            borderBottomWidth: 1,
          }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />
      <MaineHeader
        isBack
        subHeaderTextS={{ color: "#fff" }}
        title={_headerTitle()}
      />
      {renderHeaderView()}
      {/* <FilterModel
        isVisible={isFilterModelVisible}
        onClick={handleFilterSelection}
        dynamicCategory={dynamicCategory}
        searchFor={props.searchFor}
      /> */}

      <View style={styles.innerContainer}>
        <FlatList
          contentContainerStyle={styles.listContentStyle}
          numColumns={3}
          data={data}
          renderItem={({ item, index }) => _renderItem(item, index)}
          onEndReached={() => {
            if (data.length > 0) {
              setPageNos((prev) => prev + 1);
            }
          }}
          onEndReachedThreshold={0.3}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={emptyListView}
          showsVerticalScrollIndicator={false}
        />

        {_headerRightButton()}
      </View>
      <Loader isLoading={loader} />

      {/* alert for subscription */}
      <Alert
        // title={'Are you sure!'}
        heading={appConstants.SUBSCRIPTION_MESSAGE}
        isModalVisible={subscriptionAlert}
        buttonTitle={'OK'}
        customYesTitle
        cancleTitle={'No'}
        isHideCancel
        onCancel={() => setsubscriptionAlert(false)}
        logout={() => setsubscriptionAlert(false)}
      />
    </SafeAreaView>
  );
};

export default PhotoLibrary;
