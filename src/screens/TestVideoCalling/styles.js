import { StyleSheet } from 'react-native';

import color from '../../utils/color';
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
        top: -50,
        position: 'absolute',
        backgroundColor: 'red',
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#22343C',
        alignItems: 'center',
    },
    parentScrollView: {
    },
    stream: {
        flex: 1
    },
    rctView: {
        width: 100,
        height: 100,
        marginBottom: 20,
        alignSelf: 'center'
    },
    otherStreamContainer: {
        marginTop: 16,
        paddingBottom: 16,
        flex: 1,
        backgroundColor: "red"
    },
    streamContainer: {
        // backgroundColor: 'grey',
        // justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    streamWrapper: {
        backgroundColor: 'grey',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        // flexDirection: 'row'
    },
    roomTitle: {
        fontSize: 20,
        paddingTop: 20
    },
    rtcview: {
        width: '45%',
        height: '60%',
        borderColor: '#ccc',
        borderWidth: 3,

    },
    rtc: {
        height: 150,
        width: 100,
        // backgroundColor: "gray",
        // marginHorizontal: 10,
        // marginTop: 6
    },
    localStream: {
        flex: 1,
        backgroundColor: "gray",
        width: "100%",
        // height: 220,
        // paddingTop: 10,
        alignItems: 'center',
        // backgroundColor: "red",
    },

    rctView: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "transparent",
    },

    videoControllers: {
        bottom: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: "red",
        width: "100%",
    },
    muteIconContainer: {
        // bottom: 15,
        // left: 15,
        // position: 'absolute',
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.transparentBGColor1,
        padding: 15,
        borderRadius: 30,
        marginHorizontal: 14,
    },
    muteIcon: {
        height: "100%",
        width: "100%"
    },
});
