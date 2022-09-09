import { StyleSheet } from 'react-native';
import appConstants from '../../common/appConstants';

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

    // search box style
    bottomBorder: {
		borderBottomColor: '#ADBAC1',
		borderBottomWidth: 1,
	},
    textInputSty: {
		fontFamily: appConstants.AirbnbCerealAppLight,
		fontSize: 16,
		color: '#ADBAC1',
		paddingVertical: 12,
		flex: 1,
		paddingHorizontal: 10,
	},
});
