import { Dimensions } from 'react-native';
import appConstants from '../../../common/appConstants';
import { dynamicSize, getFontSize } from '../../../utils/responsive'
import color from '../../../utils/color'
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
	innerContainer: {
		flex: 1,
		backgroundColor: '#22343C',
		marginHorizontal: 30,
	},
	bottomErrorStyle: {
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
	signupButton: {
		marginTop: dynamicSize(40),
		marginBottom: dynamicSize(45),
		width: '100%',
		backgroundColor: '#88D8B8',
	},
	saveButton: {
		marginBottom: dynamicSize(30),
		width: '100%',
		backgroundColor: '#88D8B8',
	},
	categoryContainer: {
		borderRadius: 2,
		backgroundColor: '#608697',
		paddingStart: 10,
		paddingVertical: 8,
		justifyContent: 'space-between',
		marginTop: 8,
		marginRight: 8,
		flexDirection: 'row',
		alignItems: 'center',
		//	width: dynamicSize(130)
	},
	categoryText: {
		fontSize: 16,
		fontFamily: appConstants.AirbnbCerealAppLight,
		color: '#FFFFFF'
	},
	subTitleSty: {
		fontSize: 13,
		letterSpacing: 1.33,
		textAlign: 'left',
		fontFamily: appConstants.AirbnbCerealAppMedium,
		color: '#fff',
		marginLeft: dynamicSize(12)
	},
	sliderTxt: {
		fontSize: 17, 
		color: '#FCD274', 
		letterSpacing: 3.09, 
		fontFamily: appConstants.AirbnbCerealAppMedium,
		alignSelf: 'center',
		marginStart: 10
	}


};
export default styles;