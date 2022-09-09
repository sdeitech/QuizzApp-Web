import { StyleSheet } from 'react-native';

import { dynamicSize } from '../../utils/responsive';
import color from '../../utils/color';
import appConstants from '../../common/appConstants';

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
    bgImageIcon: {
        right: 0,
        top: -50,
        position: 'absolute',
        backgroundColor: 'red',
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#22343C',
        paddingHorizontal: "2%",
    },
    parentScrollView: {
    },
    headerRightContainer: {
        
    },
    countTxtSty: {
        backgroundColor: color.fadeRedColor,
        // textAlign: 'center',
        fontFamily: appConstants.AirbnbCerealAppLight,
        fontSize: 12,
        color: '#ffffff',
        // paddingHorizontal: 10,
        paddingVertical: 2,
        paddingRight: 14,
        paddingLeft: 6,
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginEnd: 10,
        overflow: 'hidden',
        position: 'absolute',
        top: -6,
        right: -9,
    },
    emptyViewLabel: {
        fontSize: 20,
        marginLeft: 13,
        marginTop: dynamicSize(300),
        color: '#ADBAC1',
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: appConstants.AirbnbCerealAppLight
    },
});
