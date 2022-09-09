import { StyleSheet } from 'react-native';
import appConstants from '../../common/appConstants';

import { dynamicSize } from '../../utils/responsive';
import color from '../../utils/color';
import * as fontFamily from '../../utils/fontFamily';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#324B55',
        zIndex: 2,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#22343C',
        alignItems: 'center'
    },
    parentScrollView: {
        width: "100%"
        // paddingTop: 50,
        // paddingHorizontal: 10,
    },
    profileStyle: {
        height: 154,
        width: 154,
        alignSelf: 'center',
        top: 44,
        position: 'absolute',
        zIndex: 4,
    },
    profileImageStyle: {
        height: "100%",
        width: "100%",
        borderRadius: 77,
    },
    profileEditContainer: {
        height: 34,
        width: 34,
        borderRadius: 17,
        backgroundColor: color.subBordorColor,
        padding: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        bottom: 18,
        right: 0,
        position: 'absolute',
    },
    profileEditStyle: {
        height: "60%",
        width: "60%",
    },
    submitButton: (width) => ({
        marginTop: dynamicSize(30),
        marginBottom: dynamicSize(20),
        width: width - 60,
        marginHorizontal: 30,
        backgroundColor: '#88D8B8',
        opcity: 0.3,
    }),
    submitButtonText: {
        fontSize: 20,
        color: '#22343C',
        letterSpacing: 3.09,
        fontFamily: appConstants.AirbnbCerealAppExtraBold,
    },
    upperProfilePic: {
        backgroundColor: color.subBordorColor,
        height: 130,
    },
    dropDownMainView: {
        position: 'absolute',
        top: 230,
        width: 178,
        backgroundColor: color.subBordorColor,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        zIndex:3,
    },
    dropDownStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        paddingHorizontal: 9,
    },
    dropDownIcon: {
        height: 7.04,
        width: 12.32,
    },
    statusTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',        
    },
    statusText: {
        color: color.textGray,
        fontFamily: fontFamily.avenirMedium,
    },
    dropOptions: {
        flexDirection: 'row',
        paddingVertical: 5,
        width: "100%",
        paddingHorizontal: 9,
        alignItems: 'center',
    },
    statusImage: {
        height: 12,
        width: 12,
        marginRight: 6,
    },
});
