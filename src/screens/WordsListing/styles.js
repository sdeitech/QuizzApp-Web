import { StyleSheet } from 'react-native';

import { dynamicSize } from '../../utils/responsive';
import color from '../../utils/color';
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
        paddingHorizontal: 30,
    },
    parentScrollView: {
    },
    signupButton: {
        marginTop: dynamicSize(10),
        marginBottom: dynamicSize(20),
        width: '100%',
        backgroundColor: '#88D8B8',
    },
    questionButton: {
        marginBottom: dynamicSize(20),
        width: '100%',
        backgroundColor: color.goldenColor,
    },
    emptyViewLabel: {
        fontSize: 20,
		marginTop: 100,
        marginBottom: 100,
		color: '#ADBAC1',
		justifyContent: 'center',
		alignSelf: 'stretch',
        textAlign: 'center',
        width: "100%",
		bottom: 80,
    },
    bottomButtons: {
        // bottom: 20,
        // position: "absolute",
    },
});
