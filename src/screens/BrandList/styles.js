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
	innerContainer: {
		flex: 1,
		marginHorizontal:30,
		marginBottom:30
	},
	signupButton: {
        marginTop: dynamicSize(40),
        marginBottom: dynamicSize(20),
        width: '100%',
        backgroundColor:'#88D8B8',
    },
	saveButton: {
        marginBottom: dynamicSize(20),
        width: '100%',
        backgroundColor:'#88D8B8',
	},
	bottomBoxContainer:{
		justifyContent:'center',
		height:dynamicSize(70),
		borderRadius:10,
		width:dynamicSize(94),

	},
	bottomBoxInnerView:{
		justifyContent:'center',
		alignItems:'center',
		elevation: 1,
        width:'100%',
        height:'100%',
		borderRadius:5,


	},
	boxLogo:{
	alignSelf:'center'
	},
	crossLogo:{
		position:'absolute',
		right:5,
		top:5
	},
	bottomBoxText:{
		fontSize:14,
		color:'#FCD274',
        textAlign:'center',
        marginTop:10,
		fontFamily:appConstants.AirbnbCerealAppMedium
	},
	doneButton: {
        borderRadius: dynamicSize(6),
		backgroundColor: '#88D8B8',
        alignItems: 'center',
        justifyContent: 'center',
		bottom: 10,
		left: 30,
		right: 30,
		position: 'absolute',
	},
};
export default styles;