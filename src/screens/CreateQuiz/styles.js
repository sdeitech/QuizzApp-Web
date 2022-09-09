import { StyleSheet, Dimensions } from 'react-native';
import { dynamicSize, getFontSize } from '../../utils/responsive';
const { width, height } = Dimensions.get('window');
import appConstants from '../../common/appConstants';
import color from '../../utils/color';

export const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#324B55'
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
	container: {
		flex: 1,
		backgroundColor: '#22343C'
	},
	innerContainer: {
		flex: 1,
		// backgroundColor: '#22343C',
		marginHorizontal:30,
		marginBottom:30
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
	signupButton: {
        marginBottom: dynamicSize(20),
        width: '100%',
        backgroundColor:'#88D8B8',
    },
	saveButton: {
        marginBottom: dynamicSize(30),
        width: '100%',
        backgroundColor:'#88D8B8',
	},
	buttonText:{
		fontSize: 17, 
		color: '#22343C', 
		letterSpacing: 3.09, 
		fontFamily: appConstants.AirbnbCerealAppMedium
	},
	sliderTxt: {
		fontSize: 17, 
		color: '#FCD274', 
		letterSpacing: 3.09, 
		fontFamily: appConstants.AirbnbCerealAppMedium,
		alignSelf: 'center',
		marginStart: 10
	},
	playVideoIcon: {
		position: 'absolute',
		top: 80,
		alignSelf: 'center',
	},
	playAudioIcon: {
		// position: 'absolute',
		// top: 50,
		alignSelf: 'center',
	},
	trueFalseContainer: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	trueFalseButton: {
		flex: 1,
		paddingVertical: 16,
		backgroundColor: '#324B55',
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	trueFalseText: {
		color: '#ADBAC1',
		fontFamily: appConstants.fontReqular,
		fontSize: 16,
		flex: 1,
		alignSelf: 'center',
		paddingVertical: 10,
		top: 2,
	},
});

export default styles;