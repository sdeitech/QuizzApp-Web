import { StyleSheet } from 'react-native';

import { dynamicSize } from '../../utils/responsive';
import color from './../../utils/color';
import * as fontFamily from './../../utils/fontFamily';
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
    topImageContainer: {
        flexDirection: 'row',
    },
    topMainImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#324B55',
        height: 200,
        marginRight: 14,
        flex: 1,
    },
    rightComponents: {
        width: 80,
    },
    rightTops: {
        backgroundColor: '#324B55',
        paddingVertical: 18,
        height: 54.67,
        width: 80,
    },
    rightSmallImages: {
        alignSelf: 'center',
        height: "100%",
        width: 22.87,
        height: 21,
    },
    addMore: {
        color: color.offlineGray,
        fontSize: 11,
        top: -2,
        textAlign: 'center',
        fontFamily: fontFamily.avenirLight,
    },
	sliderTxt: {
		fontSize: 17, 
		color: '#FCD274', 
		letterSpacing: 3.09, 
		fontFamily: appConstants.AirbnbCerealAppMedium,
		alignSelf: 'center',
		marginStart: 10
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
