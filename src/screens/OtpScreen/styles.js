import { StyleSheet, Dimensions } from 'react-native'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import color from '../../utils/color'
const { width, height } = Dimensions.get('window')
export const styles = {
    imageStyle: {
        marginTop:Dimensions.get('window').height/6,
        width:Dimensions.get('window').width/2,
        marginBottom:Dimensions.get('window').height/10
    },
    loginButton: {
        marginTop: dynamicSize(35),
        marginBottom: dynamicSize(30),
        width: width - dynamicSize(70),
        backgroundColor:'#88D8B8'
    },
    signupButton: {
        marginTop: dynamicSize(35),
        marginBottom: dynamicSize(30),
        width: width - dynamicSize(70),
        backgroundColor:'#88D8B8',
        opcity:0.3
    },
    smallText: {
        fontSize: getFontSize(32),
        color: '#fff',
        marginTop:dynamicSize(24),
    },
    smallOtp: {
        fontSize: getFontSize(19),
        color: '#fff',
        marginTop:dynamicSize(12),
        textAlign:'center'
    },
    subText: {
        fontSize: getFontSize(18),
        color: '#C0C9CE',
        marginTop:dynamicSize(11),
        textAlign:'center'
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
    signupButton: {
        marginTop: dynamicSize(10),
        marginBottom: dynamicSize(30),
        width: width - dynamicSize(70),
        backgroundColor:'#5E5B3E',
        opcity:0.3
    },
}



