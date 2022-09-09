import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import appConstants from './appConstants';

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.loginButtonView, props.styles]}>
            <View >
                <View style={styles.buttonLogin}>
                    <Text style={[styles.loginText, props.buttonTextStyle]}>{props.buttonTitle}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    loginButtonView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        backgroundColor: appConstants.AppTheamColor,
        borderRadius: 30,
    },
    buttonLogin: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 10,
    },
    loginText: {
        fontSize: 12,
        alignSelf: 'center',
        textAlign: 'center',
        color: appConstants.white,
        fontFamily: appConstants.fontSemiBold,

    },

})

export default Button;