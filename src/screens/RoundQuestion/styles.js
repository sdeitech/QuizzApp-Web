import { Dimensions, StyleSheet } from 'react-native';
import color from './../../utils/color';
import appConstants from '../../common/appConstants';
import { dynamicSize, getFontSize } from '../../utils/responsive'
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#324B55'
	},
	container: {
		flex: 1,
		backgroundColor: '#22343C'
	},
	emptyViewLabel: {
		fontSize: 20,
		marginLeft: 13,
		marginTop: dynamicSize(300),
		color: '#ADBAC1',
		justifyContent: 'center',
		alignSelf: 'center',
		bottom: 80,
		fontFamily: appConstants.AirbnbCerealAppLight,
	},
	innerContainer: {
		flex: 1,
		marginHorizontal: 30,
		marginBottom: 30,
		// backgroundColor: '#22343C',
	},
	signupButton: {
		marginTop: dynamicSize(40),
		marginBottom: dynamicSize(20),
		width: '100%',
		backgroundColor: '#88D8B8',
	},
	saveButton: {
		marginBottom: dynamicSize(20),
		width: '100%',
		backgroundColor: '#88D8B8',
	},
	bottomBoxContainer: {
		justifyContent: 'space-between',
		borderRadius: 10,
		marginBottom: 20,
		borderWidth: 1,
		// borderColor: '#EFB3FE',
		borderColor: color.hangmanColor,

		backgroundColor: '#22343C',
	},
	bottomBoxInnerView: {
		shadowColor: '#121D21FA',
		elevation: 1,
		shadowOffset: { width: 0, height: 14 },
		width: '100%',
		borderRadius: dynamicSize(10),

		flexDirection: 'row',
		height: dynamicSize(83),
	},
	boxLogo: {
		height: '100%',
		width: dynamicSize(72),
		borderTopLeftRadius: dynamicSize(10),
		borderBottomLeftRadius: dynamicSize(10)
	},
	crossLogo: {
		position: 'absolute',
		right: dynamicSize(10),
		top: dynamicSize(10)
	},
	rightContainer: {
        paddingHorizontal: 10,
        width: 50,
        alignItems: "flex-end",
		position: 'absolute',
		right: dynamicSize(10),
		top: dynamicSize(10)
    },
	rightIcon: {
        height: 20,
        width: 20,
        // tintColor: color.matchItColor,
    },
	bottomBoxTextType: {
		fontSize: 13,
		color: color.textGray,
		marginRight: dynamicSize(5),
		fontFamily: appConstants.AirbnbCerealAppMedium,
		flex: 1,
	},
	bottomBoxText: {
		fontSize: 15,
		color: color.white,
		marginRight: dynamicSize(5),
		fontFamily: appConstants.AirbnbCerealAppMedium,
		flex: 1,
	},
	descriptionText: {
		fontSize: 0,
		color: '#ADBAC1',
		marginTop: 5,
		width: dynamicSize(185),
		fontFamily: appConstants.AirbnbCerealAppLight
	},
	questionView: {
		marginHorizontal: 15,
		marginTop: 10,
		paddingVertical: 15,
		backgroundColor: '#324B55',
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	questionText: {
		color: '#ffff',
		fontFamily: appConstants.AirbnbCerealAppMedium,
		fontSize: 14,
		marginHorizontal: 12
	},

	trueOrFalse: {
		fontSize: 10,
		color: color.white,
		marginRight: dynamicSize(5),
		fontFamily: appConstants.AirbnbCerealAppMedium,
	},
});
export default styles;