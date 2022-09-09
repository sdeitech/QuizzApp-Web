import { StyleSheet } from 'react-native';

import color from '../../utils/color';
import * as fontFamily from '../../utils/fontFamily';

import { dynamicSize } from '../../utils/responsive';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#324B55',
    },
    crossLogo: {
        position: 'absolute',
        right: dynamicSize(0),
        padding: dynamicSize(10),
        // backgroundColor: "blue",
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#22343C',
    },
    parentScrollView: {
    },
    topContainer: {
        backgroundColor: color.subBordorColor,
        paddingVertical: 26,
    },
    profileImageContainer: {
        height: 140,
        width: 140,
        alignSelf: "center",
        // borderRadius: 70,
    },
    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius: 70,
    },
    profileRightBottomContainer: {
        height: 24,
        width: 24,
        borderRadius: 20,
        backgroundColor: color.subBordorColor,
        bottom: 10,
        right: 4,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileRightBottom: {
        // top: 2,
        height: "80%",
        width: "80%",
    },
    profileInfoScreen: {
        // backgroundColor: "red",
        paddingHorizontal: "6%",
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cupImage: {
    },
    profileInfoRight: {
        flex: 1,
    },
    currentRankText: {
        color: "#fff",
        fontFamily: fontFamily.avenirLight,
        fontSize: 18,
    },
    currentRankTextScore: {
        fontFamily: fontFamily.avenirBold
    },
    profileInfoRightPointsContain: {
        paddingVertical: 18,
        width: "90%",
        marginTop: 18,
        borderRadius: 16,
        backgroundColor: color.goldenColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileInfoRightPoints: {
        fontFamily: fontFamily.avenirBold,
        fontSize: 38,
    },
    profileInfoRightPointsLight: {
        fontFamily: fontFamily.avenirLight,
        fontSize: 14,
    },
    bottomList: {
        paddingHorizontal: "6%",
        paddingVertical: 18,
        flex: 1,
    },
    topRankText: {
        color: color.goldenColor,
        fontSize: 16,
    },
    loadingText: {
        color: color.goldenColor,
        fontSize: 20,
        display: 'flex',
        margin:15,
        alignSelf:'center'
    },

    renderItemView: {
        borderWidth: 1.2,
        borderRadius: 6,
        paddingHorizontal: 18,
        paddingVertical: 8,
        marginTop: 18,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.hangmanColor,
    },
    leaderBoardNumber: {
        fontFamily: fontFamily.avenirSemiBold,
        fontSize: 32,
        color: color.hangmanColor,
        width: "14%",
        textAlign: 'center',
    },
    upArrowIcon: {
        height: 18,
        width: 18
    },
    renderListImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    renderTextContainer: {
        width: "80%",
        flex: 1,
        // justifyContent: 'flex-end',
        flexDirection: 'row',
        // backgroundColor: "red",
    },
    renderName: {
        fontFamily: fontFamily.avenirSemiBold,
        fontSize: 20,
        color: color.hangmanColor,
    },
    renderUsername: {
        fontFamily: fontFamily.avenirLight,
        fontSize: 17,
        color: '#fff',
    },
    renderPoints: {
        fontFamily: fontFamily.avenirLight,
        fontSize: 15,
        color: '#fff',
    },
    emptyViewLabel: {
        fontSize: 20,
        marginLeft: 13,
        marginTop: dynamicSize(30),
        color: '#ADBAC1',
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: appConstants.AirbnbCerealAppLight
    },
});
