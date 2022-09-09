import { Platform, StyleSheet } from 'react-native';

import color from '../../utils/color';
import * as fontFamily from '../../utils/fontFamily';
import { dynamicSize } from '../../utils/responsive';
import {Dimensions} from 'react-native'

const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#324B55',
     
    },
    innerContainer: {
        //flex: 1,
        //backgroundColor: "transparent",
        //backgroundColor: color.fadeRedColor,
         zIndex:10,
         height:'90%',
         width:'100%',
         position:'absolute'
    },
    mainBodyStyle: {
          flex: 1,
         // marginBottom: 76, //76
          //zIndex:20,
          //position:'absolute',
         // backgroundColor:'red',
          marginTop:'30%'
        
        
    },
    mainBodyScrollStyle: {
        justifyContent: 'center',
        // backgroundColor: 'blue',
        flexGrow: 1,
    },
    iconContainer: {
        height: 25,
        width: 75,
        borderRadius: 25,
        backgroundColor: color.buttonColor1,
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: "43%",
        width: "43%",
    },
    upperTitle: {
        paddingTop: 18,
        paddingHorizontal: 22,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    contestants: {
        color: color.textGray,
        fontFamily: fontFamily.avenirLigh,
        fontSize: 16,
    },
    downTitle: {
        paddingTop: 20,
        marginBottom: 10,
        paddingHorizontal: 22,
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    upperArrowConteiner: {
        paddingLeft: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    upIcon: {
        height: 7,
        width: 14,
    },
    buttonText: {
        fontSize: 17,
        color: '#22343C',
        letterSpacing: 3.09,
        fontFamily: appConstants.fontBold
    },
    submitButton: {
        marginTop: dynamicSize(20),
        // marginBottom: dynamicSize(45),
        backgroundColor: '#88D8B8',
        width: "86%",
        alignSelf: 'center',
    },
    play: {
        position:'absolute',
        marginTop: 28,
        width: "75%",
        backgroundColor: color.goldenColor,
        bottom:20
    },
    gameVisibleButtonContainer: {
        position:'absolute',
        top: Platform.OS === "ios" ? 110 : 70,
        right: 18,
        zIndex: 1,
        height: 50,
        width: 50,
    },
    gameVisibleButton: {
        height: "100%",
        width: "100%",
        alignSelf: 'center',
    },

    // bottom: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     height: Dimensions.get('window').height * 0.1,
    //     justifyContent: 'space-evenly',
    //     width: '100%',
    //     backgroundColor: 'transparent',
    //     position:'absolute',
    //     bottom:25,
    //     zIndex:100
    //   },
});
