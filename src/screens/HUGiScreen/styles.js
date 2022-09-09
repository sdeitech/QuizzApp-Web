import { StyleSheet } from 'react-native';

import { dynamicSize } from '../../utils/responsive';
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
    },
    innerContainerScrollView: {
        flex: 1,
        marginHorizontal: 30,
    },

    timeLimitContainer: {
        marginTop: 29,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    timeLimitText: {
        fontSize: 13,
        letterSpacing: 1.33,
        textAlign: 'left',
        fontFamily: appConstants.fontReqular,
        color: '#fff',
        marginLeft: 10,
    },
    basePointText: {
        color: '#fff',
        fontFamily: appConstants.fontReqular,
        fontSize: 13,
        letterSpacing: 1.33
    },
    timeMinSec: {
        fontSize: 20,
        fontFamily: appConstants.fontReqular,
        letterSpacing: 2.04,
        textAlign: 'left',
        marginLeft: 8,
        color: '#fff',
    },
    sliderTxt: {
        fontSize: 17,
        color: '#FCD274',
        letterSpacing: 3.09,
        fontFamily: appConstants.AirbnbCerealAppMedium,
        alignSelf: 'center',
        marginStart: 10
    },
    onDemandNagPointsText: {
        color: '#fff',
        fontFamily: appConstants.fontReqular,
        fontSize: 13,
        letterSpacing: 1.33
    },
    submitButton: {
        marginTop: dynamicSize(35),
        marginBottom: dynamicSize(20),
        width: '100%',
        backgroundColor:'#88D8B8',
    },
    buttonText:{
		fontSize: 17, 
		color: 'black', 
		letterSpacing: 3.09, 
		fontFamily: appConstants.AirbnbCerealAppMedium
	},
});
