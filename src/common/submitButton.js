import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import appConstants from './appConstants';

const Button = (props) => {
    return (
        <View style={[styles.loginButtonView, props.styles]}>
            <TouchableOpacity style={[styles.buttonLogin, props.buttonStyle]} onPress={props.onPress}>
                <Text style={[styles.loginText,props.buttonTextStyle]}>{props.buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    loginButtonView:{
        justifyContent:'center',
        alignItems:'center',
        width:'40%',
    },
    buttonLogin:{
    	backgroundColor:appConstants.pinkColor,
    	width:'100%',
    	padding:10,
        borderRadius:4,
        flexDirection:'row',
        justifyContent:'center',

    },
	loginText:{
		color:'white',
        fontSize:14,
        fontFamily:appConstants.fontBold,
	},
})

export default Button;