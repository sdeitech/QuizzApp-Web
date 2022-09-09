import { StyleSheet } from 'react-native';

import { dynamicSize } from '../../utils/responsive';
import color from '../../utils/color';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.walkThrowColor,
    },
    skipButtonContainer: {
        top: 40,
        position: "absolute",
        alignSelf: 'flex-start',
        right: 35,
        zIndex: 3,
    },
    skipButton: {
        color: color.walkSkipText,
    },
    crossLogo: {
        position: 'absolute',
        right: dynamicSize(0),
        padding: dynamicSize(10),
        // backgroundColor: "blue",
    },
    pagerView: {
        flex: 1,
    },
});
