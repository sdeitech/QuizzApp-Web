import { StyleSheet } from 'react-native';

import { dynamicSize } from '../../utils/responsive';
import * as fontFamily from '../../utils/fontFamily';
import color from '../../utils/color';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#324B55',
    },
    headerRightStyle: {
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
    headerCircleVal: {
        fontFamily: fontFamily.avenirBold,
        fontSize: 11,
        color: '#fff',
    },
});
