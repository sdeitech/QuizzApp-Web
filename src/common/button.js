import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import appConstants from './appConstants';

const Button = (props) => {
    return (
        <TouchableOpacity  onPress={props.onPress} style={[styles.loginButtonView, props.styles]}>
                <View style={[styles.buttonLogin,props.loginView]}>
                    <Text style={[styles.loginText, props.buttonTextStyle]}>{props.buttonTitle}</Text>
                </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    loginButtonView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor:appConstants.AppTheamColor,
        borderRadius: 10,

    },
    buttonLogin: {
        width: '100%',
        flexDirection: 'row',
        marginVertical:15,
        justifyContent: 'center',
        alignItems: 'center',
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