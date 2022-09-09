import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import * as commonApi from "../../ServiceRequests/serviceContest";
import { useDispatch, useSelector } from "react-redux";

import assests from "../../common/assests";
import styles from "./styles";
import MaineHeader from "../../common/headerWithText";
import { LoaderAction } from "../../redux/action";
import RenderUser from "./components/RenderUser";

import { PermissionsAndroid } from "react-native";
import Contacts from "react-native-contacts";

const AddByContact = (props) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.authReducer.loader);

  const searchTextRef = useRef(null);

  // page number for pagination of getting users
  const [pageNum, setpageNum] = useState(0);

  const [addbyContactList, setaddbyContactList] = useState([]);
  const [addbyNameList, setaddbyNameList] = useState([]);
  const [searchText, setsearchText] = useState("");
  searchTextRef.current = searchText;

  useEffect(() => {
    console.log("my room id id => ", props.roomId);
    fetchMyAPI();
  }, []);

  const fetchMyAPI = async (fromSearch = false) => {
    if (pageNum === 0) dispatch(LoaderAction(true));
    // .then(await Contacts.getAll())
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: "Contacts",
      message: "This app would like to view your contacts.",
      buttonPositive: "Please accept",
    })
    .then((granted) => {
      //   if (granted) {

      //   }
      Contacts.getAll().then((contacts) => {
        console.log(`Contacts = ${JSON.stringify(contacts)}`);
        dispatch(LoaderAction(false));
        setaddbyContactList(contacts);
      });
    });

    // const response = await commonApi.userInviteGetAPI(pageNum, searchTextRef.current, dispatch, props.roomId);

    // // console.log("respose of user invited => ", JSON.stringify(response.data));

    // if (response['status']) {
    //     if (fromSearch && pageNum === 0) {
    //         setaddbyNameList(response.data);
    //     } else {
    //         setaddbyNameList([...addbyNameList, ...response.data]);
    //     }
    // }
    
  };

  useEffect(() => {
    if (pageNum !== 0) fetchMyAPI();
  }, [pageNum]);

  const seperatorItem = () => (
    <View
      style={{
        height: 0.4,
        backgroundColor: "gray",
        width: "100%",
        marginVertical: 18,
      }}
    />
  );

  const _callAtEndReach = () => {
    setpageNum(pageNum + 1);
  };

  const _onDoneSerach = () => {
    setpageNum(0);

    const newData = addbyContactList.filter(
        (item) => {
        const itemData = item.displayName
          ? item.displayName.toUpperCase()
          : ''.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    console.log(newData,'Filtered Data')
    setaddbyNameList(newData);
    setsearchText(searchText);
      
  };

  const onCrossClick = () => {
    setsearchText("");
    setpageNum(0);
    setaddbyNameList([]);
    fetchMyAPI();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />
      <MaineHeader
        isBack
        subHeaderTextS={{ color: "#fff" }}
        title={"Add By Contact"}
      />

      <View style={[styles.searchComponent, styles.bottomBorder]}>
        <Image
          source={assests.search}
          resizeMode="contain"
          style={{ alignSelf: "center" }}
        />
        <TextInput
          placeholder={"Search"}
          placeholderTextColor={"#ADBAC1"}
          style={[styles.searchInput]}
          value={searchText}
          onChangeText={(text) => setsearchText(text)}
          onSubmitEditing={_onDoneSerach}
        />
        {searchText.length > 0 ? (
          <TouchableOpacity
            onPress={() => onCrossClick()}
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

      <View style={styles.innerContainer}>
        <Text style={styles.listTitle}>Add to Invite</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          data={searchText ? addbyNameList:addbyContactList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <RenderUser item={{ ...item, index, roomId: props.roomId }} />
          )}
          ItemSeparatorComponent={() => seperatorItem()}
          onEndReachedThreshold={0.3}
          onEndReached={() => _callAtEndReach()}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddByContact;
