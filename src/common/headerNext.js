import React from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import appConstants from './appConstants';
import assests from './assests';
const Header = (props) => {
    return (
        <View style={[styles.header, props.style]}>
            <View style={[styles.title]}> 
            <Image source={assests.logoText} resizeMode='contain'  />
            </View>
            <TouchableOpacity style={{ marginRight: 38, }} onPress={props.onNextAction} >
                <Image source={assests.bell} resizeMode='contain' />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#324B55'
    },
    title: {
        flex: 1,
        alignItems: 'center',
        marginLeft:38
    },
    subHeaderText: {
        fontSize: 14,
        color: appConstants.headerColor,
        fontFamily: appConstants.fontBold
    },
})

export default Header;