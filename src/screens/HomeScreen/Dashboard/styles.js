import { Dimensions, StyleSheet } from 'react-native';
import appConstants from '../../../common/appConstants';
import { dynamicSize, getFontSize } from '../../../utils/responsive'

export const styles = StyleSheet.create({
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
		marginHorizontal: dynamicSize(30),
		marginBottom: dynamicSize(30)
	},
	paggerView: {
		alignItems: 'center',
		// height: dynamicSize(118),
		marginTop: 28,
	},
	imageView: {
		height: '100%',
		width: '100%',
	},
	topButtonView: {
		position: 'absolute',
		top: dynamicSize(10),
		right: dynamicSize(10),
		borderRadius: dynamicSize(10),
	},
	topButton: {
		flexDirection: 'row',
		padding: dynamicSize(5),
		paddingHorizontal: dynamicSize(10),
		backgroundColor: '#fff',
		borderRadius: dynamicSize(10),
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	topButtonText: {
		color: appConstants.AppTheamColorSub,
		fontSize: 10,
		fontFamily: appConstants.fontSemiBold,
		marginRight: 5
	},
	iconImage: {
		height: dynamicSize(20),
		resizeMode: 'contain'
	},
	inviteImg: {
		height: Dimensions.get('screen').height * 0.04,
		resizeMode: 'contain'
	},

	textBold: {
		fontSize: 14,
		fontFamily: appConstants.fontBold
	},
	activeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
	},
	descriptionText: {
		color: '#000',
		fontSize: 10,
		paddingTop: 10,
		fontFamily: appConstants.fontLight,
	},
	chooseButton: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	activeChooseButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10
	},
	flatlist: {
		marginTop: 20,
	},
	listView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		// shadowColor: '#000',
		// shadowOffset: { width: 1, height: 0 },
		// shadowOpacity: 0.2,
		// shadowRadius: 1,
		marginBottom: 10,
		borderRadius: 15,
		padding: 10,
		// elevation: 1,
		borderWidth: 1,
		borderColor: '#ECECEC'
	},
	likedlistView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	listText: {
		color: '#000',
		fontSize: 14,
		fontFamily: appConstants.fontSemiBold,
		opacity: 0.6
	},
	likeRecuritText: {
		color: '#fff',
		fontSize: 10,
		fontFamily: appConstants.fontBold,
	},
	dateText: {
		color: '#000',
		fontSize: 10,
		fontFamily: appConstants.fontReqular,
	},
	inviteView: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	backTextWhite: {
		color: '#FFF',
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: dynamicSize(50),
	},
	rowBack: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: dynamicSize(15),
		padding: dynamicSize(10),
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		marginBottom: dynamicSize(20),
		borderRadius: dynamicSize(15),
		width: dynamicSize(75),

	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
	},
	backRightBtnRight: {
		backgroundColor: appConstants.AppTheamColor,
		right: 0,
	},
	boxContainer: {
		marginTop: dynamicSize(12),
		flexDirection: 'row',
		width: dynamicSize(135),
		marginRight: dynamicSize(26),
	},
	innerBox: {
		borderWidth: 1,
		borderColor: '#68C1D2',
		alignItems: 'center',
		borderRadius: dynamicSize(10),
		width: '100%',
		shadowColor: '#000000A6',
		elevation: 1,
		marginRight: dynamicSize(10),
		shadowColor: '#0000003B',
		shadowOffset: {
			width: 0,
			height: 14
		},
		shadowRadius: 5,
		shadowOpacity: 1.0,
		overflow: 'hidden',
	},
	boxImage: {
		width: '100%',
		height: dynamicSize(70),
		resizeMode: 'cover',
		// borderTopLeftRadius: dynamicSize(10),
		// borderTopRightRadius: dynamicSize(10),
		shadowColor: '#0000003B',
		//	elevation: 1,

		shadowOffset: { width: 0, height: dynamicSize(10) },
	},
	questionText: {
		fontSize: getFontSize(16),
		letterSpacing: 0.8,
		marginTop: dynamicSize(10),
		marginHorizontal: dynamicSize(8),
		fontFamily: appConstants.fontBold,
		fontWeight: '800',
	},
	gamename: {
		fontSize: 14,
		color: '#ADBAC1',
		marginTop: dynamicSize(6),
		fontFamily: appConstants.fontReqular,
		paddingHorizontal: 5,
		textAlign: 'center',
	},
	gameCreator: {
		marginBottom: 10,
		fontSize: 13,
		color: '#ADBAC1',
		marginTop: 6,
		fontFamily: appConstants.fontReqular,
		paddingHorizontal: 5,
		textAlign: 'center',
	},
	autherText: {
		fontSize: getFontSize(12),
		color: '#C0C9CE',
		marginTop: dynamicSize(4),
		marginBottom: dynamicSize(10),
		fontFamily: appConstants.fontReqular,

	},
	bottomBoxContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bottomBoxInnerView: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		elevation: 10,
		width: dynamicSize(90),
		height: dynamicSize(70),
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
	emptyListBox: {
		height: dynamicSize(148),
		width: "100%",
		marginLeft: dynamicSize(10),
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkMark: {
		position: 'absolute',
		width: dynamicSize(93),
		height: dynamicSize(70),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(104, 193, 210, 0.7)',
		borderRadius: 10,
		shadowColor: '#121D21FA',
		elevation: 10,
		shadowOffset: { width: 0, height: dynamicSize(14) },
		width: dynamicSize(93),
		zIndex: 999,
	},
	boxLogo: {
		position: 'absolute',
		right: 0,
		top: 0
	},
	bottomBoxText: {
		fontSize: getFontSize(12),
		color: '#000',
		position: 'absolute',
		textAlign: 'center',
		fontFamily: appConstants.AirbnbCerealAppMedium
	},

	multiview: {
		borderWidth: 1,
		borderColor: '#FF5485',
		shadowColor: '#0000003B',
		alignItems: 'center',
		borderRadius: dynamicSize(10),
		width: dynamicSize(147),
		marginRight: dynamicSize(10),
		marginTop: dynamicSize(10),
		shadowOffset: {
			width: 0,
			height: 14
		},
		shadowRadius: 5,
		shadowOpacity: 1.0
	},
	crossLogo: {
		position: 'absolute',
		right: 5,
		top: 5
	},

});
export default styles;