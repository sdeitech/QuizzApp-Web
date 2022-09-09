import { StyleSheet } from 'react-native';

import { dynamicSize } from '../../utils/responsive';
import * as fontFamily from '../../utils/fontFamily';

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
    upperView: {
        width: "100%",
        padding: 18,
        backgroundColor: "#324B55",
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 150,
        width: "90%",
        borderRadius: 4,
        resizeMode: 'cover',
    },
    note: {
        marginTop: 20,
        marginBottom: -8,
        color: '#fff',
        fontSize: 18,
        fontFamily: fontFamily.avenirLight,
        width: "80%",
        textAlign: 'center',
    },
    upperMainPart: {
        borderTopWidth: 0.2,
        borderTopColor: 'gray',
        width: '100%',
        flexDirection: "row",
        backgroundColor: "#324B55",
    },
    seperator: {
        width: 0.1,
        height: "100%",
        backgroundColor: "gray",
    },
    inviteFriendsHere: {
        marginTop: dynamicSize(40),
        // marginBottom: dynamicSize(45),
        backgroundColor: '#88D8B8',
        width: "100%"
    },
    play: {
        marginTop: dynamicSize(20),
        // marginBottom: dynamicSize(45),
        backgroundColor: '#FCD274',
        width: "100%"
    },
    buttonText: {
        fontSize: 17,
        color: '#22343C',
        letterSpacing: 3.09,
        fontFamily: appConstants.fontBold
    },
    scrollBottom: {
        paddingHorizontal: "7%",
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
