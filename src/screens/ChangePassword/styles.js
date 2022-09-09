import { StyleSheet } from 'react-native';
import { dynamicSize } from '../../utils/responsive';

import color from './../../utils/color';
import * as fontFamily from './../../utils/fontFamily';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#324B55',
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#22343C',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 28,
    },
    headingText: {
        fontFamily: fontFamily.avenirLight,
        color: color.textLightGray,
        paddingHorizontal: 12,
        textAlign: 'center',
        fontSize: 18,
    },
    changeButton: {
        marginTop: dynamicSize(35),
        height: 50,
        width: "100%",
        backgroundColor:'#88D8B8'
    },
    changeButtonText: {
        fontSize: 17,
        color: '#22343C',
        letterSpacing: 3.09,
        fontFamily: fontFamily.avenirBold
    },
    bgImageIcon: {
        right: 0,
        top: -60,
        position: 'absolute',
    },
});
