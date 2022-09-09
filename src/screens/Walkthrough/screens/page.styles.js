import { StyleSheet, Dimensions } from "react-native";

import color from './../../../utils/color';
import * as fontFamily from './../../../utils/fontFamily';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        overflow: "hidden",
        paddingHorizontal: "4%",
    },
    title: {
        color: color.goldenColor,
        fontFamily: fontFamily.avenirBold,
        fontSize: 20,
    },
    topView: {
        width: 580,
        height: 580,
        backgroundColor: "#22343C",
        top: -100,
        position: "absolute",
        borderRadius: 320,
    },
    centerImage: {
        height: (width / 2),
        width: (width / 2),
        borderRadius: 20,
    },
    subTitle: {
        color: color.goldenColor,
        fontFamily: fontFamily.avenirBold,
        fontSize: 18,
        textAlign: "center",
    },
    desc: {
        color: color.walkThrowGrayDesc,
        fontFamily: fontFamily.avenirLight,
        fontSize: 16,
        textAlign: "center",
    },

    skipButtonContainer: {
        bottom: 40,
        position: "absolute",
        alignSelf: 'flex-start',
        right: 35,
    },
    skipButton: {
        color: color.walkSkipText, 
    },
    doneButtonContainer: {
        bottom: 40,
        position: "absolute",
        alignSelf: 'flex-end',
        right: 35,
    },
})

export default styles;
