import { StyleSheet, Dimensions, Platform } from 'react-native'
import { dynamicSize, getFontSize } from '../utils/responsive'
import color from '../utils/color'
import appConstants from '../common/appConstants'
const { width, height } = Dimensions.get('window')
export default commonStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonContainer: {
        alignItems: 'center',
    },
    labelText: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        color: '#fff',
        fontSize: getFontSize(16),
    },
    commonViewContainer: {
        flex: 1,
        // paddingTop:dynamicSize(45),
        alignItems: 'center'
    },
    keyboardContainer: {
        alignItems: 'center',
    },
    touchableIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: dynamicSize(40),
        height: dynamicSize(40),
    },
    withoutBorderTextFieldContainer:{
        // borderBottomWidth: 1,
        borderBottomColor: color['lightGrey'],
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: width - dynamicSize(70),
        marginBottom: dynamicSize(20)
    },
    textFieldContainer: {
        borderBottomWidth: 1,
        borderBottomColor: color['lightGrey'],
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: width - dynamicSize(70),
        marginBottom: dynamicSize(20)
    },
    inputView: {
        marginHorizontal: dynamicSize(36),
        width: width,
        height: 25,
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomWidth: 0,
    },
    imageContainer: {
        paddingTop: dynamicSize(10),
        height: dynamicSize(50),
        justifyContent: 'center',
        width: '8%',
        paddingLeft: dynamicSize(5),
        alignItems: 'flex-start',
    },
    textInput: {
        color: color['white'],
        fontSize: getFontSize(16),
        height: dynamicSize(40),
    },
    phoneTextInput: {
        width: '100%',
        height: dynamicSize(38),
        fontSize: getFontSize(16),
        color: color['white'],
    },
    buttonContainer: {
        paddingHorizontal: dynamicSize(20),
        borderRadius: dynamicSize(6),
        height: dynamicSize(50),
        backgroundColor: color['appColor'],
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: dynamicSize(1.5)
    },
    secondaryButtonContainer: {
        paddingVertical: dynamicSize(10),
        paddingHorizontal: dynamicSize(20),
        borderRadius: dynamicSize(10),
        height: dynamicSize(50),
        backgroundColor: color['white'],
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: dynamicSize(1.5),
        flexDirection:'row'
    },
    secondaryButtonText: {
        fontSize: getFontSize(12),
        color: color['white'],
        textAlign: 'center',
        marginLeft:5,
        fontFamily:appConstants.fontBold,
        fontWeight:'bold'

    },
    buttonText: {
        fontSize: getFontSize(14),
        color: color['white'],
        textAlign: 'center',
        fontFamily:appConstants.fontBold,
        fontWeight:'bold'
    },
    rowContainer: {
        flexDirection: 'row',
    },
    smallText: {
        fontSize: getFontSize(13),
        color: color['appColor'],
        fontFamily: appConstants.fontBold,
        fontWeight:'bold'

    },
    mediumBoldText: {
        color: color['white'],
        fontSize: getFontSize(21),
        fontFamily: appConstants.fontBold
    },
    optContainer: {
        width: width / 7,
        paddingHorizontal: dynamicSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    otptextStyle: {
        justifyContent: 'center',
        color: color['black'],
        textAlign: 'center',
        width: '100%',
        fontSize: getFontSize(40),
        fontFamily: appConstants.fontBold
    },
    dropDownContainer: {
        width: width - dynamicSize(70),
    },
    codeContainer: {
        flexDirection: 'column',
        width: '31%',
        height: dynamicSize(53),
        borderBottomWidth: 1
    },
    countryCodeView: {
        marginTop: dynamicSize(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    fieldLabel: {
        fontSize: getFontSize(14),
        color: color['white']
    },
    flagIcon: {
        resizeMode: 'contain',
        width: dynamicSize(30),
        height: dynamicSize(30)
    },
    dialCodeText: {
        marginLeft: dynamicSize(10),
        color: color['white'],
        fontFamily: appConstants.fontBold,
        fontSize: getFontSize(16)
    },
    buttonStyle: {
        marginVertical: dynamicSize(20),
        width: width - dynamicSize(40)
    },
    cardViewStyle: {
        paddingHorizontal: dynamicSize(5),
        paddingVertical: dynamicSize(5),
        borderRadius: dynamicSize(5),
        width: width - dynamicSize(40),
        elevation: 3,
        backgroundColor: color['white'],
        shadowColor: color['shadowColor'],
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: dynamicSize(3), height: dynamicSize(3) },
    },
    cardViewStyleOne: {
        borderRadius: dynamicSize(5),
        elevation: 3,
        width: width - dynamicSize(40),
        backgroundColor: color['white'],
        shadowColor: color['shadowColor'],
        shadowOpacity: 1,
        shadowRadius: 8,
        shadowOffset: { width: dynamicSize(3), height: dynamicSize(3) },
    },
    barClickStyle: {
        marginRight: dynamicSize(25),
        justifyContent: 'center',
    },
    dotTextContainer: {
        justifyContent: 'flex-end'
    },
    barDotStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: dynamicSize(5),
        height: dynamicSize(5)
    },
    barLabelStyle: {
        fontFamily: appConstants.fontReqular,
        fontSize: getFontSize(15),
        paddingRight: dynamicSize(5)
    },
    activeLineTab: {
        borderRadius: dynamicSize(5),
        borderBottomWidth: 3,
        top: dynamicSize(5),
        width: '60%'
    },
    searchContainer: {
        marginVertical: dynamicSize(10),
        backgroundColor: color['blueShadow'],
        width: width - dynamicSize(40),
        paddingHorizontal: dynamicSize(5),
        paddingVertical: dynamicSize(5),
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: dynamicSize(10),
        justifyContent: 'space-between'
    },
    textInput: {
        fontSize: getFontSize(14),
        color: color['white'],
        fontFamily: appConstants.fontReqular,
        width: '85%',
        paddingHorizontal: dynamicSize(10),
        backgroundColor: color['blueShadow'],
        height: dynamicSize(35),
        alignSelf: 'flex-end'
    },
    searchIconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatInputContainer: {
        borderRadius: dynamicSize(50),
        backgroundColor: color['white'],
        paddingLeft: dynamicSize(30),
        // maxHeight: dynamicSize(100),
        paddingVertical: dynamicSize(5),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dynamicSize(5)
    },
    chatInputStyle: {
        fontFamily: appConstants.fontReqular,
        fontSize: getFontSize(14),
        color: color['chatTxtColor'],
        width: '85%',
        //height: 'auto',
        maxHeight: dynamicSize(65)
    },
    barStyle: {
        width: (width - dynamicSize(40)) / 4,
        justifyContent: 'center',
    },
    activeTabStyle: {
        borderRadius: dynamicSize(5),
        borderBottomWidth: 3,
        top: dynamicSize(5),
        width: '40%'
    },
    barDotStyle_Company: {
        position: 'absolute',
        top: 0,
        right: '47%',
        width: dynamicSize(5),
        height: dynamicSize(5)
    },
    addText: {
        color: color['green'],
        fontSize: getFontSize(14),
        fontFamily: appConstants.fontReqular,
        textAlign: 'left',
        alignSelf: 'flex-start',
        paddingBottom: dynamicSize(10),
        paddingRight: dynamicSize(10)
    },
    userImage: {
        width: dynamicSize(40),
        height: dynamicSize(40),
        borderRadius: dynamicSize(20)
    },
    nameStyle: {
        color: color['white'],
        fontFamily: appConstants.fontReqular,
        fontSize: getFontSize(14),
        marginLeft: dynamicSize(14)
    },
    companyName: {
        alignSelf: 'flex-start',
        fontSize: getFontSize(30),
        fontFamily: appConstants.fontBold,
        color: color['white']
    },
    laborUnderLine: {
        borderBottomColor: color['green'],
        borderRadius: dynamicSize(5),
        borderBottomWidth: 3,
        marginVertical: dynamicSize(5),
        alignSelf: 'flex-start',
        width: dynamicSize(25)
    },
    laborCount: {
        fontFamily: appConstants.fontReqular,
        alignSelf: 'flex-start',
        color: color['inactiveTextColor']
    },
    emptyMessageStyle: {
        marginVertical: dynamicSize(30),
        textAlign: 'center',
        color: color['white'],
        fontSize: getFontSize(16),
        fontFamily: appConstants.fontReqular
    },
    userImageView: {
        width: dynamicSize(40),
        height: dynamicSize(40),
        borderRadius: dynamicSize(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    userImageStyle: {
        width: dynamicSize(40),
        height: dynamicSize(40),
        borderRadius: dynamicSize(20),
    },
    cardContainer: {
        borderWidth: 1,
        borderRadius: dynamicSize(10),
        paddingHorizontal: dynamicSize(13),
        paddingVertical: dynamicSize(13),
    },
    msgText: {
        fontSize: getFontSize(15),
        fontFamily: appConstants.fontReqular
    },
    labelStyle: {
        fontSize: Platform.OS === 'ios' ? getFontSize(14) : getFontSize(11),
        color: color['translucentDarkBule']
    },
    valueStyle: {
        fontSize: getFontSize(16),
        fontFamily: appConstants.fontReqular,
        color: color['white'],
    },
    bottomLine: {
        paddingVertical: dynamicSize(10),
        paddingHorizontal: dynamicSize(15),
        borderBottomColor: color['grey'],
        borderBottomWidth: 1
    },
    modalContainer: {
        width: width - dynamicSize(60),
        padding: dynamicSize(20),
        backgroundColor: color['white'],
        borderRadius: dynamicSize(5)
    },
    alertMessage: {
        fontFamily: appConstants.fontBold,
        color: color['white'],
        fontSize: getFontSize(14),
        textAlign: 'left'
    },
    alertButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: dynamicSize(10)
    },
    alertButtonStyle: {
        width: null,
        height: dynamicSize(30),
        marginLeft: dynamicSize(10),
        paddingHorizontal: dynamicSize(20),
        borderRadius: dynamicSize(5)
    },
    alertTextStyle: {
        fontFamily: appConstants.fontReqular,
        fontSize: getFontSize(12)
    },
    leftSwipeContainer: {
        flex: 1,
        borderTopLeftRadius: dynamicSize(5),
        borderBottomLeftRadius: dynamicSize(5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color['green'],
    },
    rightSwipeContainer: {
        flex: 1,
        borderTopRightRadius: dynamicSize(5),
        borderBottomRightRadius: dynamicSize(5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color['fadeRedColor'],
    },
    takePhotoView: {
        padding: dynamicSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        width: width - dynamicSize(50),
        backgroundColor: color['white'],
        borderTopLeftRadius: dynamicSize(5),
        borderTopRightRadius: dynamicSize(5)
    },
    chooseFromLibrary: {
        padding: dynamicSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        width: width - dynamicSize(50),
        backgroundColor: color['white'],
        borderBottomLeftRadius: dynamicSize(5),
        borderBottomRightRadius: dynamicSize(5)
    },
    cancelButton: {
        marginVertical: dynamicSize(10),
        padding: dynamicSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        width: width - dynamicSize(50),
        backgroundColor: color['white'],
        borderRadius: dynamicSize(5)
    },
    imageTheme: {
        tintColor: color['white']
    },
    radioIcon: {
        width: dynamicSize(17),
        height: dynamicSize(17)
    },
    radioText: {
        fontSize: getFontSize(16),
        fontFamily: appConstants.fontReqular
    },
    addDocButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: dynamicSize(20),
    },
    uploadImageStyle: {
        width: width - dynamicSize(70),
        height: dynamicSize(180),
        borderRadius: dynamicSize(10),
    },
    uploadButton: {
        width: width - dynamicSize(90),
        marginTop: dynamicSize(35)
    },
    noThanksButton: {
        width: width - dynamicSize(90),
        marginVertical: dynamicSize(20)
    },
    errorMessage: {
        paddingVertical: dynamicSize(2),
        fontFamily: appConstants.fontReqular,
        color: colors['fadeRedColor'],
        fontSize: getFontSize(12),
    },
    typeMySelf: {
        fontFamily: appConstants.fontReqular,
        color: color['white'],
        fontSize: getFontSize(13),
        textAlign: 'left'
    },
    noThanksText:{
        fontFamily: appConstants.fontReqular,
        fontWeight:'bold'
    },
    commonContainer: {
        alignItems: 'center',
        flex:1,
    },
    errorTextPopup: {
        paddingHorizontal: 16,
        color: 'rgb(213, 0, 0)', marginTop: 5, fontFamily: appConstants.AirbnbCerealAppBook, fontSize: 14
    }
})