import { Dimensions } from 'react-native';
import appConstants from '../../common/appConstants';

export const styles = {
	safeArea: {
		flex: 1,
		backgroundColor: appConstants.AppTheamColor
	},
	topView: {
		flexDirection: 'row',
		alignItems: 'center',
        width:'100%',
        justifyContent: 'space-between',

	},
	topText: {
		fontSize: 16,
		color: '#000',
	},
	descriptionText: {
		fontSize: 12,
		color: '#000',
		marginRight:20
	},
	container: {
		flex: 1,
		backgroundColor: appConstants.AppTheamColor
	},
	innerContainer: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal:20
	},
	flatlist: {
		marginTop: 20,
	},
	listView: {
	marginBottom:30
	},
	likedlistView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'space-between',
		flex:1
	},
	listImg: {
		height: Dimensions.get('screen').height * 0.06,
		width: Dimensions.get('screen').height * 0.06,
		borderRadius: Dimensions.get('screen').height * 0.06 / 2,
		marginRight: 10
	},
	listText: {
		color: '#000',
		fontSize: 14,
		opacity: 0.6,
	},
	likeRecuritText: {
		color: '#fff',
		fontSize: 10,
		fontFamily: appConstants.fontBold,
	},
	searchView:{
		flexDirection: 'row',
		paddingLeft: 10,
		borderRadius: Dimensions.get('screen').height * 0.06/2,
		borderWidth: 0.5,
		borderColor: appConstants.fontColor,
		marginTop: 20,
		paddingHorizontal: 10,
		marginLeft:10,
		marginRight:10,
		height: Dimensions.get('screen').height * 0.06
	},
	recuritView:{
		flexDirection: 'row', 
		alignItems: 'center', 
		backgroundColor: appConstants.appColor, 
		borderRadius: 20, 
		paddingHorizontal: 10
	},
	search:{
		flexDirection: 'row',
		alignItems: 'center',
		height: '100%',
	},
	recuritButton:{
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:appConstants.appColor,
		borderRadius:20,
		paddingHorizontal:20,
		marginVertical:5,
		paddingVertical:8
	},
	emptyText: {
		color: '#000',
		fontSize:16,
	},
	emptyView:{
		flex:1, 
		justifyContent:'center', 
		alignItems:'center'
	},
	reviewImg: {
		width:Dimensions.get('window').width/4,
		height:Dimensions.get('window').width/4,
		borderRadius: 10,
		marginRight: 10
	},
};

export default styles;