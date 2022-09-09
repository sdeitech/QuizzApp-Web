import { StyleSheet } from 'react-native';

import { dynamicSize, getFontSize } from '../../utils/responsive';
import color from '../../utils/color';
import * as fontFamily from '../../utils/fontFamily';
import appConstants from '../../common/appConstants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#324B55',
    },
    editBtnSty: {
        fontFamily: appConstants.AirbnbCerealAppBlack,
        fontSize: getFontSize(15),
        color: '#FCD274',
        paddingVertical: 5,
        paddingHorizontal: 24,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#FCD274',
        marginTop: 10,
        marginRight: 10,
        letterSpacing: 1.2,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#22343C',
    },
    parentScrollView: {
    },
    upperProfileInfoContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
    },
    upperContainer: {
        backgroundColor: color.subBordorColor,
        padding: 20,
    },
    profilePictureContainer: {
        height: 100,
        width: 100,
    },
    profilePicture: {
        height: "100%",
        width: "100%",
        borderRadius: 50,
    },
    profileStatus: {
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: color.subBordorColor,
        right: 4,
        bottom: 8,
        position: 'absolute',
        // borderWidth: 1,
        // borderColor: '#fff',
    },
    nameText: {
        fontSize: 29,
        fontFamily: fontFamily.avenirLight,
        color: '#fff',
        bottom: -10,
    },
    profileRightInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
    },
    iconRightInfo: {
        tintColor: '#fff',
        marginRight: 10,
    },
    statusText: {
        flex: 1,
        fontFamily: fontFamily.avenirLight,
        color: '#fff',
        // fontSize: 19,
    },
    statusText: {
        fontFamily: fontFamily.avenirLight,
        color: '#fff',
        fontSize: 16,
    },

    hrLine: {
        height: 0.4,
        backgroundColor: 'black',
        marginVertical: 20,
    },

    profileInfoScreen: {
        // backgroundColor: "red",
        paddingHorizontal: "6%",
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
        fontSize: 12,
    },
    profileInfoRightPointsContain: {
        paddingVertical: 10,
        width: "100%",
        marginTop: 10,
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

    subMenuContainer: {
        paddingHorizontal: "8%",
        paddingVertical: 20,
    },
    subMenu: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    subMenuText: {
        color: "#fff",
        fontFamily: fontFamily.avenirLight,
        fontFamily: appConstants.AirbnbCerealAppLight,
        fontSize: 18,
    },
    rightIcon: {
        height: 19
    },
    socialIcons: {
        height: 25,
        width: 24,
        // tintColor: '#fff',
    },
});
