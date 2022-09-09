import { Dimensions } from 'react-native';
import appConstants from '../../common/appConstants';
import color from '../../utils/color';
import { dynamicSize, getFontSize } from '../../utils/responsive'
const { width, height } = Dimensions.get('window')

export const styles = {
	safeArea: {
		flex: 1,
		backgroundColor: '#324B55'
	},
	container: {
		flex: 1,
		backgroundColor: '#22343C'
	},
	imageErrorStyle: {
		flex: 1,
		fontSize: 12,
		marginTop: 2,
		marginLeft: 8,
		backgroundColor: 'transparent',
		paddingVertical: 2,
		// marginVertical: 2,
		textAlign: 'left',
		color: color['fadeRedColor'],
	},
	sliderTxt: {
		fontSize: 17,
		color: '#FCD274',
		letterSpacing: 3.09,
		fontFamily: appConstants.AirbnbCerealAppMedium,
		alignSelf: 'center',
		marginStart: 10
	},
	innerContainer: {
		flex: 1,
		backgroundColor: '#22343C',
		marginHorizontal: 30,
	},
	signupButton: {
		marginTop: dynamicSize(40),
		width: '100%',
		backgroundColor: color.fadeRedColor,
	},
	saveButton: {
		width: '100%',
		backgroundColor: '#88D8B8',
	},
	questionButton: {
		marginTop: dynamicSize(20),
		width: '100%',
		backgroundColor: '#88D8B8',
	},
	categoryContainer: {
		borderRadius: 2,
		backgroundColor: '#608697',
		paddingHorizontal: 10,
		paddingVertical: 8,
		justifyContent: 'space-between',
		marginTop: 8,
		marginRight: 8,
		flexDirection: 'row',
		alignItems: 'center',
		width: dynamicSize(130)
	},
	categoryText: {
		fontSize: 16,
		fontFamily: appConstants.AirbnbCerealAppLight,
		color: '#FFFFFF'
	}

};
export default styles;