import { StyleSheet, Dimensions } from 'react-native'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import color from '../../utils/color'
import appConstants from '../../common/appConstants'
const { width, height } = Dimensions.get('window')
export const styles = {
    safeArea:{
        flex: 1, 
        backgroundColor: '#22343C' 
    },
    imageStyle: {
        marginTop:Dimensions.get('window').height/6,
        width:Dimensions.get('window').width/2,
        marginBottom:Dimensions.get('window').height/10
    },
    loginButton: {
        marginTop: dynamicSize(35),
        marginBottom: dynamicSize(30),
        width: width - dynamicSize(70)
    },
    signupButton: {
        marginTop: dynamicSize(35),
        marginBottom: dynamicSize(30),
        width: width - dynamicSize(70),
        backgroundColor:'#5E5B3E',
        opcity:0.3
    },
    smallText: {
        marginRight: dynamicSize(5),
        fontSize: getFontSize(12),
        color: '#FCD274',
        marginTop:dynamicSize(24),
        letterSpacing: 0.71,
        fontFamily:appConstants.AirbnbCerealAppLight
    },
    forgotText: {
        marginBottom: dynamicSize(10)
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: width - dynamicSize(70),
        justifyContent: 'space-between',
    },
    codeContainer: {
        flexDirection: 'column',
        width: '31%',
        alignSelf: 'flex-start',
        height: dynamicSize(65),
        borderBottomWidth: 1
    },
    countryCodeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    fieldLabel: {
        fontSize: getFontSize(14),
        color: color['mediumLightGrey']
    },
    flagIcon: {
        resizeMode: 'contain',
        width: dynamicSize(30),
        height: dynamicSize(30)
    },
    dialCodeText: {
        color: color['darkblueTheme'],
        // fontFamily: avenirBold,
        fontSize: getFontSize(16)
    },
    textField: {
        width: '65%',
    },
    buttonStyle: {
        marginVertical: dynamicSize(20),
        width: width - dynamicSize(40)
    },
    seperator: {
        borderBottomWidth: 1,
        borderBottomColor: color['darkblueTheme'],
        height: dynamicSize(1),
        backgroundColor: color['white'],
        width: width - dynamicSize(40)
    },
    changePhobne: {
        marginVertical: dynamicSize(10),
        alignSelf: 'flex-end',
        textDecorationLine: 'underline',
    },
    loginWith: {
        marginTop: dynamicSize(35),
        marginBottom: dynamicSize(30),
        width: (width/2)- dynamicSize(35),
        marginRight:10,
    },
    rowContainer:{
        flexDirection: 'row',
        postion : 'absolute',
        bottom:20,
        alignItems: 'center',
        justifyContent:'center'

        

    },
    commonContainer: {
        alignItems: 'center',
        flex:1,
    },
    backgroundLogo:{
        alignSelf: 'flex-end', 
        position: 'absolute', 
     //   right: 0, 
     //   top: 0
    },
    scrollView:{
        alignItems: 'center', 
        marginTop: dynamicSize(10), 
        marginHorizontal: dynamicSize(30)
    },
    logoImg:{
        marginTop: dynamicSize(60),
        marginBottom: dynamicSize(40)
    }
}



