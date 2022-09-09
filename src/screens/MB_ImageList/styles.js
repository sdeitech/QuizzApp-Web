import { StyleSheet } from 'react-native';

import { dynamicSize } from '../../utils/responsive';
import color from '../../utils/color';
import * as fontFamily from '../../utils/fontFamily';
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
        paddingHorizontal: 20,
    },
    parentScrollView: {
    },
    signupButton: {
        marginTop: dynamicSize(40),
        marginBottom: dynamicSize(20),
        width: '100%',
        backgroundColor: '#88D8B8',
    },
    questionButton: {
        marginBottom: dynamicSize(20),
        width: '100%',
        backgroundColor: color.goldenColor,
    },
    wordContainer: {
        padding: 14,
        backgroundColor: color.subBordorColor,
        marginRight: 18,
        borderRadius: 5,
        marginTop: 16
    },
    wordText: {
        color: color.white,
        letterSpacing: 0.4,
        fontSize: 15,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        width: "100%",
    },

});
