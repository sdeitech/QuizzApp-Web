import { Dimensions } from 'react-native';
import { dynamicSize, getFontSize } from '../../utils/responsive'
const { width, height } = Dimensions.get('window')
import appConstants from '../../common/appConstants';

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
		marginHorizontal:30,
		marginBottom:30
	},
	signupButton: {
        marginTop: dynamicSize(35),
        marginBottom: dynamicSize(20),
        width: '100%',
        backgroundColor:'#88D8B8',
    },
	saveButton: {
        marginBottom: dynamicSize(30),
        width: '100%',
        backgroundColor:'#88D8B8',
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