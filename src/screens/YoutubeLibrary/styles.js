import { StyleSheet } from "react-native";
import appConstants from "../../common/appConstants";

import { dynamicSize } from "../../utils/responsive";
import color from "../../utils/color";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22343C",
  },
  doneButton: {
    borderRadius: dynamicSize(6),
    backgroundColor: "#88D8B8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    // bottom: 10,
    // left: 30,
    // right: 30,
    // position: "absolute",
  },
  setButton: {
    borderRadius: dynamicSize(6),
    backgroundColor: color.goldenColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    // bottom: 10,
    // left: 30,
    // right: 30,
    // position: "absolute",
  },
  youtubeLinkContainer: {
    backgroundColor: "#22343C",
    padding: 20,
    flexGrow: 1,
  },
  pasteLinkContainer: {
    backgroundColor: "#324B55",
    height: 60,
    justifyContent: "center",
    padding: 5,
    marginTop: 10,
  },
  trimContainer: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    padding: 5,
    marginTop: 10,
  },
  textInputSty: {
    fontFamily: appConstants.AirbnbCerealAppLight,
    fontSize: 16,
    color: "#ADBAC1",
    paddingHorizontal: 10,
  },
  setContainer: {
    backgroundColor: "#324B55",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  betweenDotsStyle: {
    fontFamily: appConstants.AirbnbCerealAppLight,
    color: color.white,
  },
  redErrorTimer: {
    fontFamily: appConstants.AirbnbCerealAppLight,
    color: color.fadeRedColor,
  },

  // webview style
  webViewContainer: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  webView: {
    backgroundColor: color.littleTransperentBG,
  },
});
