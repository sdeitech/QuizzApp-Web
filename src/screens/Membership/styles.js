import { StyleSheet } from "react-native";

import appConstants from "../../common/appConstants";
import color from "../../utils/color";
import * as fontFamily from './../../utils/fontFamily';

import { dynamicSize } from "../../utils/responsive";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#324B55",
  },
  crossLogo: {
    position: "absolute",
    right: dynamicSize(0),
    padding: dynamicSize(10),
    // backgroundColor: "blue",
  },
  bgImageIcon: {
    right: 0,
    top: -50,
    position: "absolute",
    backgroundColor: "red",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#22343C",
  },
  topContainer: {
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: color.subBordorColor,
  },
  top1Text: {
    fontSize: 18,
    fontFamily: fontFamily.avenirMedium,
    color: color.white,
  },
  top2Text: {
    fontSize: 21,
    fontFamily: fontFamily.avenirMedium,
    color: color.goldenColor,
  },
  top3Text: {
    fontSize: 12,
    fontFamily: fontFamily.avenirMedium,
    color: color.textLightGray,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subscribeContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  subLine1: {
    color: color.goldenColor,
    fontFamily: fontFamily.avenirMedium,
    fontSize: 18,
  },
  subLine2: {
    fontSize: 18,
    color: color.white,
    fontFamily: fontFamily.avenirMedium,
  },
  subLine3: {
    fontFamily: fontFamily.avenirLight,
    color: color.textLightGray,
  },
  parentScrollView: {},
});
