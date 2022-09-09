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
	doneButton: {
		borderRadius: dynamicSize(6),
		backgroundColor: '#88D8B8',
        alignItems: 'center',
        justifyContent: 'center',
		flex: 1,
		// marginBottom: 10,
		// marginHorizontal: 30,
		// position: 'absolute',
	},
	skipButton: {
		borderRadius: dynamicSize(6),
		backgroundColor: color.goldenColor,
        alignItems: 'center',
        justifyContent: 'center',
		flex: 1,
		// marginBottom: 10,
		// marginHorizontal: 30,
		// bottom: 80,
		// left: 30,
		// right: 30,
		// position: 'absolute',
	},
	innerContainer: {
		marginHorizontal:13,
        marginBottom:20,
        paddingHorizontal:15,
		backgroundColor: '#324B55',
		paddingBottom:20,
		// backgroundColor: 'red',

	},
	boxContainer:{
		marginTop:dynamicSize(12),
		flexDirection:'row',
		width:dynamicSize(147),
		marginRight:dynamicSize(22),
	//	alignItems: 'center',
	},
	innerBox:{
		borderWidth:1,
		borderColor:'#68C1D2',
		alignItems:'center',
		borderRadius:dynamicSize(10),
		width:'100%',
		shadowColor: '#000000A6',
		elevation: 1,
		marginRight:dynamicSize(10),
		shadowColor: '#0000003B',
		shadowOffset: {
		  width: 0,
		  height: 14
		},
		shadowRadius: 5,
		shadowOpacity: 1.0
	},
	boxImage:{
		width:'100%',
		height:dynamicSize(70),
		resizeMode:'cover',
		borderTopLeftRadius:dynamicSize(10),
		borderTopRightRadius:dynamicSize(10),
		shadowColor: '#0000003B',
		elevation: 1,
		shadowOffset: { width: 0, height: dynamicSize(10) },	
	},
	questionText:{
		fontSize:getFontSize(15),
		letterSpacing: 0.8,
		marginTop:dynamicSize(8),
		fontFamily:appConstants.AirbnbCerealAppMedium,
		marginBottom:dynamicSize(17)
	},
	gamename:{
		fontSize:12,
		color:'#fff',
		marginTop:1,
		fontFamily:appConstants.fontReqular,

	},
	autherText:{
		fontSize:getFontSize(12),
		color:'#C0C9CE',
		marginTop:dynamicSize(4),
		marginBottom:dynamicSize(10),
		fontFamily:appConstants.fontReqular,

	},
	bottomBoxContainer:{
		flexDirection:'row',
		justifyContent:'space-between',
	},
	bottomButtonsView: {
		marginBottom: 10,
		marginHorizontal: 30,
		flexDirection: "row",
	},

};
export default styles;