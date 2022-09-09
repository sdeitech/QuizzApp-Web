import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, ActivityIndicator } from 'react-native';
import appConstants from './appConstants';

const PickerButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.pickerContainer, { width: props.width,borderBottomWidth:props.borderWidth,opacity:props.opacity }]}>
            {props.loader ? <ActivityIndicator size="small" style={styles.loader} />
                : <Text style={[styles.dateText, { color: props.color }]}>{props.text}</Text>
            }
            {props.source ?
                <TouchableOpacity style={styles.icon} onPress={props.iconPress}>
                    <Image resizeMode="cover" source={props.source} style={{ width: 18, height: 18 }} />
                </TouchableOpacity>
                : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pickerContainer: {
        paddingVertical: Platform.OS == 'ios' ? 8 : 8,
        marginVertical: Platform.OS == 'ios' ? 10 : 10,
        alignSelf: 'center',
        borderBottomWidth:0.5,
        borderBottomColor:'#4C575E'

    },
    dateText: {
        fontWeight: '500',
        paddingRight: 30,
        color: appConstants.headerColor,
        borderBottomColor: appConstants.fontColor,
        fontFamily: appConstants.fontReqular,
        fontSize: 12,
    },
    icon: {
        position: 'absolute',
        right: 10,
        bottom: 8
    },
})

export default PickerButton;