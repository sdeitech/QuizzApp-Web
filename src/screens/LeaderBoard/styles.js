import { StyleSheet } from 'react-native';

import color from '../../utils/color';
import * as fontFamily from '../../utils/fontFamily';
import { dynamicSize } from '../../utils/responsive';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#324B55',
    },
    topContainer: {
        // marginTop: 10,
        // marginBottom: 30,
        alignSelf: "center",
        width: "95%",
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBG: {
        height: "100%",
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // paddingTop: 30,
    },
    topperContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    secImage: {
        height: 74,
        width: 74,
        borderRadius: 60,
        // overflow: 'hidden',
        borderWidth: 3,
        borderColor: color.hangmanColor,
    },
    secImageStyle: {
        height: "100%",
        width: "100%",
        borderRadius: 60,
    },
    secNumContainer: {
        height: 35,
        width: 35,
        borderRadius: 19,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.hangmanColor,
        position: 'absolute',
        bottom: -17,
        borderWidth: 3,
        borderColor: color.subBordorColor
    },
    secNumContainerText: {
        color: color.subBordorColor,
        fontFamily: fontFamily.avenirBold,
        fontSize: 20,
    },

    threeImage: {
        height: 74,
        width: 74,
        borderRadius: 60,
        // overflow: 'hidden',
        borderWidth: 3,
        borderColor: color.bingoColor,
    },
    threeImageStyle: {
        height: "100%",
        width: "100%",
        borderRadius: 60,
    },
    threeNumContainer: {
        height: 35,
        width: 35,
        borderRadius: 19,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.bingoColor,
        position: 'absolute',
        bottom: -17,
        borderWidth: 3,
        borderColor: color.subBordorColor
    },
    threeNumContainerText: {
        color: color.subBordorColor,
        fontFamily: fontFamily.avenirBold,
        fontSize: 20,
    },

    oneImage: {
        height: 100,
        width: 100,
        borderRadius: 60,
        // overflow: 'hidden',
        borderWidth: 3,
        borderColor: color.goldenColor,
    },
    oneImageStyle: {
        height: "100%",
        width: "100%",
        borderRadius: 60,
    },
    oneNumContainer: {
        height: 43,
        width: 43,
        borderRadius: 22,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.goldenColor,
        position: 'absolute',
        bottom: -17,
        borderWidth: 3,
        borderColor: color.subBordorColor
    },
    oneNumContainerText: {
        color: color.subBordorColor,
        fontFamily: fontFamily.avenirBold,
        fontSize: 20,
    },

    listContainer: {
        backgroundColor: color.statusBar,
        flex: 1,
        marginTop: 64,
        width: "100%",
    },
    flatlistStyle: {
        paddingHorizontal: "10%",
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
    },

    leaderBoardNumber: {
        fontFamily: fontFamily.avenirSemiBold,
        fontSize: 32,
    },
    renderListImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    renderName: {
        fontFamily: fontFamily.avenirSemiBold,
        fontSize: 20,
    },
    renderUsername: {
        fontFamily: fontFamily.avenirMedium,
        fontSize: 17,
    },
    renderPoints: {
        fontFamily: fontFamily.avenirMedium,
        fontSize: 15,
    },

    joinUs: {
		marginTop: dynamicSize(10),
		marginBottom: dynamicSize(20),
        width: '86%',
        marginHorizontal: -20,
        alignSelf: 'center',
		backgroundColor: '#88D8B8',
    },
    startNextRound: {
		marginTop: dynamicSize(18),
        width: '86%',
        marginHorizontal: -20,
        alignSelf: 'center',
		backgroundColor: color.goldenColor,
    },
    gotoBotton: {
		marginTop: dynamicSize(18),
		marginBottom: dynamicSize(20),
        width: '86%',
        marginHorizontal: -20,
        alignSelf: 'center',
		backgroundColor: '#88D8B8',
    },
    gotoBottonText: {
        fontSize: 18,
        color: '#22343C',
        letterSpacing: 3.09,
        fontFamily: appConstants.fontBold
    },

    upArrowIcon: {
        height: 18,
        width: 18
    },
});
