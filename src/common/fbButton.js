import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import appConstants from './appConstants';
import assests from './assests';

const Button = (props) => {
    return (
        <View style={[styles.loginButtonView, props.styles]}>
            <TouchableOpacity style={[styles.buttonLogin, props.buttonStyle]} onPress={props.onPress}>
            <Image resizeMode='contain' style = {{height:20,width:16,marginRight:10}} source={assests.facebook} />
                <Text style={[styles.loginText,props.buttonTextStyle]}>{props.buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    loginButtonView:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor:appConstants.blue,
        borderRadius: 30,
    },
    buttonLogin: {
        width: '100%',
        flexDirection: 'row',
        marginVertical:15,
        justifyContent:'center'
    },
    loginText: {
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center',
        color:appConstants.white,
        fontFamily:appConstants.fontBold,
    },
})

export default Button;