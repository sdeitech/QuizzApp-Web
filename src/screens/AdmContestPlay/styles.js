import { StyleSheet } from 'react-native';

import color from '../../utils/color';
import * as fontFamily from '../../utils/fontFamily';
import { dynamicSize } from '../../utils/responsive';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#324B55',
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#22343C',
    },
    upperTitle: {
        paddingTop: 18,
        paddingHorizontal: 22,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    contestants: {
        color: color.textGray,
        fontFamily: fontFamily.avenirLigh,
        fontSize: 16,
    },
    downTitle: {
        paddingTop: 20,
        marginBottom: 10,
        paddingHorizontal: 22,
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    upperArrowConteiner: {
        paddingLeft: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    upIcon: {
        height: 7,
        width: 14,
    },
    buttonText: {
        fontSize: 17,
        color: '#22343C',
        letterSpacing: 3.09,
        fontFamily: appConstants.fontBold
    },
    submitButton: {
        marginTop: dynamicSize(20),
        // marginBottom: dynamicSize(45),
        backgroundColor: '#88D8B8',
        width: "86%",
        alignSelf: 'center',
    },
});
