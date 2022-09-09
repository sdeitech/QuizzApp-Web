import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";

import ModeratorAcceptPopUp from "./ModeratorAcceptPopUp";

// const testUserList = [
//     { username: "John doe" },
//     { username: "Piter Parker" },
//     { username: "Piter Parker" },
// ];

const ModeratorAcceptList = ({ roomID }) => {
  const invitationUserList = useSelector(
    (state) => state?.videoReducer?.requestedUsers
  );

  const [parentWidth, setparentWidth] = useState(undefined);

  const changeParentWidth = (width) => {
    setparentWidth(width);
  };
  console.log("calling moderator popup",invitationUserList);
  return (
    <View style={styles.container}>
      <ScrollView
        onLayout={({ nativeEvent }) =>
          changeParentWidth(nativeEvent.layout.width)
        }
        style={styles.container}
        // bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {/* <View style={styles.container}> */}
        {invitationUserList.map((user, index) => (
          <ModeratorAcceptPopUp
            key={"accept" + index}
            user={user}
            roomID={roomID}
            currentIndex={index}
            totalLength={invitationUserList?.length}
            parentViewWidth={parentWidth}
          />
        ))}
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default ModeratorAcceptList;

const styles = StyleSheet.create({
  container: {
    top: 0,
    // alignSelf: 'stretch',
    position: "absolute",
    width: "100%",
    // elevation: 4,
    // zIndex: 1,
    // backgroundColor: 'yellow',
  },
  contentContainerStyle: {
    // backgroundColor: 'yellow',
    // width: "100%",
    paddingHorizontal: "4%",
    // flex: 1,
    flexGrow: 1,
  },
});
