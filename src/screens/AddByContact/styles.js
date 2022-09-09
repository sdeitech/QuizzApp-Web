import { StyleSheet } from 'react-native';

import { dynamicSize } from '../../utils/responsive';
import color from '../../utils/color';
import * as fontFamily from './../../utils/fontFamily';
import appConstants from './../../common/appConstants';

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
        paddingTop: 20,
    },
    parentScrollView: {
    },
    listTitle: {
        color: color.goldenColor,
        fontFamily: fontFamily.avenirLight,
        fontSize: 16,
        marginBottom: 18,
    },
	bottomBorder: {
		borderBottomColor: '#ADBAC1',
		// borderBottomColor: 'red',
        borderBottomWidth: 1,
        width: "80%",
    },
    searchInput: {
		fontFamily: appConstants.AirbnbCerealAppLight,
		fontSize: 16,
		color: '#ADBAC1',
		paddingVertical: 12,
		flex: 1,
		paddingHorizontal: 10,
    },
    searchComponent: {
        backgroundColor: '#324B55',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: -10,
        marginBottom: 18,
        width: "84%",
    }
});
