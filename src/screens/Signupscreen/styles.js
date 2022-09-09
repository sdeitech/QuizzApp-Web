import { StyleSheet, Dimensions } from 'react-native'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import color from '../../utils/color'
import appConstants from '../../common/appConstants'
const { width, height } = Dimensions.get('window')
export const styles = {
    imageStyle: {
        marginTop:Dimensions.get('window').height/6,
        width:Dimensions.get('window').width/2,
        marginBottom:Dimensions.get('window').height/10
    },
    loginButton: {
        marginTop: dynamicSize(20),
        marginBottom: dynamicSize(30),
        width: width - dynamicSize(70),
        backgroundColor:'#FFC542'
    },
    signupButton: {
        marginTop: dynamicSize(30),
        marginBottom: dynamicSize(20),
        width: width - dynamicSize(70),
        backgroundColor:'#39636D',
        opcity:0.3,

    },
    smallText: {
        fontSize: getFontSize(28),
        color: '#fff',
        marginTop:dynamicSize(20),
        marginBottom:dynamicSize(20),
        fontFamily: appConstants.fontReqular
    },
    forgotText: {
        marginBottom: dynamicSize(10)
    },
   
    fieldLabel: {
        fontSize: getFontSize(14),
        color: color['mediumLightGrey'],
        fontFamily: appConstants.fontReqular,

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
}



