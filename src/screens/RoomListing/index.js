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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles";
import MaineHeader from "../../common/headerWithText";
import * as commonApi from "../../ServiceRequests/serviceContest";
import RoomItem from "./components/RoomItem";
import { LoaderAction } from "../../redux/action";
import { Loader } from "../../components/customComponent";
import assests from "../../common/assests";

const RoomListScreen = (props) => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.authReducer.loader);

  const [roomData, setroomData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetchAPIData();
    }, 400);
  }, []);

  const fetchAPIData = async () => {
    try {
      dispatch(LoaderAction(true));

      const response = await commonApi.roomListing(
        props.contestId,
        "",
        dispatch
      );

      console.log("room listing data => ", JSON.stringify(response));

      if (response["status"]) {
        setroomData(response.data.jsonData.data);
        console.log("ZEBRONNNNN", response.data.jsonData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emptyListView = () => {
    return (
      <Text style={styles.emptyViewLabel}>
        {!loader ? "No data found" : ""}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loader} />

      <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />
      <MaineHeader isBack subHeaderTextS={{ color: "#fff" }} title={"Rooms"} />

      <View style={styles.innerContainer}>
        {/* <View style={[styles.bottomBorder, { backgroundColor: '#324B55', marginHorizontal: 15, flexDirection: 'row', flex: 1 }]}>
                    <Image source={assests.search} resizeMode='contain' style={{ alignSelf: 'center' }} />
                    <TextInput
                        placeholder={'Keyword of games'}
                        placeholderTextColor={'#ADBAC1'}
                        style={[styles.textInputSty, {}]}
                        // value={searchKeyword}
                        onChangeText={text => {}}
                        onSubmitEditing={() => {}}
                        returnKeyType={"search"}
                    />
                    {
                        // isIconShow ?
                            <TouchableOpacity onPress={() => {}}
                                style={{ alignSelf: 'center', }}>
                                <Image source={assests.close_pink} resizeMode='contain' style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            // : null
                    }
                </View> */}
        <FlatList
          data={roomData}
          renderItem={({ item, index }) => (
            <RoomItem item={{ ...item, index }} />
          )}
          keyExtractor={(x) => x._id.toString()}
          ListEmptyComponent={emptyListView}
        />
      </View>
    </SafeAreaView>
  );
};

export default RoomListScreen;
