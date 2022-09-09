import { StyleSheet } from 'react-native';
import color from '../../utils/color';

import { dynamicSize } from '../../utils/responsive';
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
    },
    parentScrollView: {
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
	addGroupButton: {
        marginVertical: dynamicSize(10),
        width: '86%',
        backgroundColor:'#88D8B8',
        alignSelf: 'center',
    },
    popUpView: {
        height: 95,
        width: 125,
        position: 'absolute',
        right: 20,
        // backgroundColor: "black",
        zIndex: 2,
        borderRadius: 5,
        overflow: 'hidden',
    },
    touchContainer: {
        backgroundColor: color.subBordorColor,
        height: "50%",
        alignItems: 'center',
        // justifyContent: 'center',
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    popUpText: {
        color: '#FAFAFA',
        fontFamily: appConstants.AirbnbCerealAppLight,
        fontSize: 16,
        marginLeft: 15,
    },
});
