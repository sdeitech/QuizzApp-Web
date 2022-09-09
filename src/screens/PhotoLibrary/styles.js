import { StyleSheet } from 'react-native';
import appConstants from '../../common/appConstants';

import { dynamicSize } from '../../utils/responsive';
import color from '../../utils/color';

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
        // backgroundColor: 'red',
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#22343C',
        padding: 20,
    },
    listContentStyle: {
        paddingBottom: 20,
    },
    parentScrollView: {
    },
    renderItemViewContainer: {
        width: "33%",
        height: 130,
        marginBottom: 18,
    },
    renderItemContainer: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginBottom: 10,
        // backgroundColor: "blue",
    },
    image: {
        width: "100%",
        height: 90,
        backgroundColor: color.offlineGray,
        borderColor: color.goldenColor,
    },
    itemContainer: {
        width: "95%",
        height: "100%",
        borderColor: color.goldenColor,
        backgroundColor: '#324B55',
        overflow: "hidden",
    },
    audio: {
        width: "95%",
        height: 95,
        // backgroundColor: color.offlineGray,
        // borderColor: '#ADBAC1',
    },
    video: {
        width: "100%",
        height: 100,
        // backgroundColor: color.offlineGray,
        // borderColor: '#ADBAC1',
    },
    emptyViewLabel: {
        fontSize: 20,
        marginLeft: 13,
      
        color: '#ADBAC1',
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: appConstants.AirbnbCerealAppLight
    },
    titleLabel: {
        fontSize: 13,
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        color: '#fff',
        paddingLeft:5,
       
        paddingRight:5,
        fontFamily: appConstants.AirbnbCerealAppLight
    },
    doneButton: {
        borderRadius: dynamicSize(6),
		backgroundColor: '#88D8B8',
        alignItems: 'center',
        justifyContent: 'center',
		// bottom: 30,
		// left: 30,
		// right: 30,
		// position: 'absolute',
	},
    playVideoIcon: {
		position: 'absolute',
		top: 40,
		alignSelf: 'center',
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
