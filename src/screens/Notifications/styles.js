import { StyleSheet } from 'react-native';

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
    bgImageIcon: {
        right: 0,
        top: -60,
        position: 'absolute',
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#22343C',
        paddingHorizontal: "5%",
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
});
