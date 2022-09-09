import { Dimensions } from 'react-native';
import appConstants from './appConstants'
import { dynamicSize, getFontSize } from '../utils/responsive'

export const styles = {
	safeArea: {
		flex: 1,
		backgroundColor: appConstants.AppTheamColor
	},
	bottomSubView: {
		flexDirection: 'row',
		marginHorizontal: 40,
		marginTop: 10
	},
	bottomText: {
		alignSelf: 'center',
		fontSize: 14,
		color: appConstants.white,
		lineHeight: 16,
		fontFamily: appConstants.fontReqular,

	},
	subHeaderText: {
		fontSize: 14,
		color: appConstants.white,
		lineHeight: 16,
		textAlign: 'center',
		marginLeft: 10,
		fontFamily: appConstants.fontRomant,


	},

	container: {

		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		borderColor: '#ddd',
		backgroundColor: '#fff',
		paddingHorizontal: 15,
		paddingBottom: 15,
		backgroundColor: '#fff',
		height: 70,
		flexWrap: 'nowrap',
		borderTopWidth: 1
	},
	individualContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	imageContainer: {
		flex: 0.6,
		justifyContent: 'center',
		alignItems: 'center',


	},
	textContainer: {
		flex: 0.4,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	text: {
		color: '#606060',
		fontSize: 13
	},
	iconView: {
		flexDirection: 'column',
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
	},
	iconText: {
		color: appConstants.AppTheamColor,
		fontSize: 10,
		fontFamily: appConstants.fontReqular
	},
	addIconView: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
	},
	middleButtonView: {
		justifyContent: 'center',
		alignItems: 'center',
		resizeMode: 'cover',
		backgroundColor: '#fff',
		height: 60,
		width: 60,
		top: -30,
		shadowColor: '#000',
		borderRadius: 60,
		shadowOffset: {
			width: 0.5, height: 0.5
		},
		shadowOpacity: 0.2,
		shadowRadius: 14,
		elevation: 1,
	},
	tabBar: {
		backgroundColor: '#fff',
		height: 70,
		flexWrap: 'nowrap',
		shadowColor: '#000',
		shadowOffset: { width: 10, height: 9 },
		shadowOpacity: 0.7,
		shadowRadius: 14,
		elevation: 1,
	},
	tabIcon: {
		marginVertical: 5,
		marginHorizontal: 10,
		width: 25,
		height: 30,
		resizeMode: 'contain'
	},
	textIn: {
		textAlign: 'center',
		color: '#fff',
		fontFamily: appConstants.fontBold
	},
	internetPop: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 60,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center'
	},
	img_container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	innerView: {
		flex: 0.65,
		paddingTop: 30
	},
	customView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingRight: 20,
		alignItems: 'center',
		paddingVertical: 15,
		height: Dimensions.get('screen').height * 0.08
	},
	customTitle: {
		fontFamily: appConstants.SFUIDisplayLight,
		fontSize: 14,
		color: '#626262'
	},
	lineView: {
		height: 1,
		backgroundColor: '#E1E3E6',
	},
	userName: {
		fontFamily: appConstants.SFUIDisplayMedium,
		fontSize: 18,
		color: appConstants.AppTheamColor
	},
	subView: {
		marginHorizontal: 15,
		marginBottom: 25,
		//flexDirection:'row',
		borderWidth: 1,
		borderColor: '#E1E3E6',

	},
	modalView: {
		margin: 0,
		flex: 1,
		marginHorizontal: 25,
		borderRadius: 5
	},
	modalInnerView: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#324B55',
		// backgroundColor: 'red',
		borderRadius: 5

	},
	modalHeaderView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		marginBottom: 16
	},
	filterText: {
		fontFamily: appConstants.AirbnbCerealAppLight,
		color: '#ffff',
		fontSize: 30,
		textAlign: 'center'
	},
	categoryView: {
		marginTop: 20,
		paddingHorizontal: 15
	},
	categoryText: {
		fontFamily: appConstants.fontLight,
		color: '#fff',
		fontSize: 16,
		marginTop: 9,
		paddingHorizontal: 50,
		textAlign: 'center',
		lineHeight: 26
	},
	eventView: {
		borderRadius: 15,
		flexDirection: 'row',
		padding: 15,
		alignItems: 'center',
		marginTop: 10,
	},
	eventText: {
		fontFamily: appConstants.fontReqular,
		fontSize: 14,
		marginLeft: 10,
		opacity: 0.8
	},
	modalBottomView: {
		flexDirection: 'row',
		marginTop: 36,
		marginBottom: 22,
		width: "100%",
	},
	innerSubview: {
		flex: 1,
		marginLeft: 10,
	},
	imgList: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	img: {
		height: 15,
		width: 15,
		resizeMode: 'contain',
		marginRight: 3
	},
	imgLoader: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 10,
		bottom: 0,
		opacity: 0.7,
		justifyContent: "center",
		alignItems: "center",
	},
	modalBottomViewUpload: {
		flexDirection: 'row',
		marginBottom: 22
	},
	questionaryView: {
		backgroundColor: '#fff',
		borderRadius: 15,
		paddingHorizontal: 15

	},
	down_arrow: {
		height: 10,
		width: 18,
		marginTop: 12
	},
	TextInputStyleClass: {
		paddingHorizontal: 15,
		height: 50,
		borderWidth: 2,
		borderColor: '#9E9E9E',
		borderRadius: 10,
		backgroundColor: "#FFFFFF",
		height: 150,
		marginTop: 15

	},
	doneButton: {
		marginBottom: dynamicSize(5),
		backgroundColor: '#88D8B8',
		paddingHorizontal: 10,
		height: 50,
		// flex: 1,
	},

	noDataTextSty: {
		fontFamily: appConstants.AirbnbCerealAppMedium,
		fontSize: 18,
		color: appConstants.AppTheamColor
	},
};

export default styles;