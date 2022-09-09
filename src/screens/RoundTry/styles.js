import { Dimensions } from 'react-native';
import appConstants from '../../common/appConstants';
import { dynamicSize, getFontSize } from '../../utils/responsive'
import color from '../../utils/color'
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
		marginHorizontal: 30,
		marginBottom: 30,
	},
	signupButton: {
		marginTop: 20,//dynamicSize(40),
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: dynamicSize(70),
		borderRadius: dynamicSize(10),
		marginBottom: dynamicSize(0),
		width: dynamicSize(93),


	},
	bottomBoxInnerView: {
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 20,
		backgroundColor: '#93DEC0',
		width: '100%',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#000000A6',
		shadowOffset: {
			width: 0,
			height: 14
		},
		shadowRadius: 5,
		shadowOpacity: 1.0,
		zIndex: 999,

	},
	boxLogo: {
		position: 'absolute',
		right: 0,
		top: 0,
		tintColor: color.littleTransperentBG,
		// backgroundColor: 'red',
	},
	crossLogo: {
		position: 'absolute',
		right: 0.5,
		top: 0.5
	},
	bottomBoxTypeText: {
		fontSize: getFontSize(12),
		color: '#000',
		// position: 'absolute',
		textAlign: 'center',
		fontFamily: appConstants.AirbnbCerealAppMedium
	},
	bottomBoxText: {
		fontSize: 10,
		color: color.black,
		textAlign: 'center',
		fontFamily: appConstants.AirbnbCerealAppMedium,
	},
};
export default styles;