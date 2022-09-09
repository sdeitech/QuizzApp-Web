import React from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity,Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import appConstants from './appConstants';
import assests from './assests';
const Header = (props) => {
    return (
        <View style={[styles.header]}>
          <Image style = {{height:40}} source={assests.loginLogo} 
          resizeMode='contain' 
          />
          <View style = {{
              height: 0.5,
              width:'100%',
        backgroundColor: 'gray',
        position:'absolute',
        bottom:0,
		opacity: 0.5}}/>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        backgroundColor: appConstants.AppTheamColor
    },
    title: {
        flex: 1,
        alignItems: 'flex-start',

    },
    headerText: {
        marginLeft:10,
        fontSize: 12,
        color: '#fff',
        fontFamily: appConstants.fontBold
    },
    subHeaderText: {
        marginLeft:10,
        fontSize: 10,
        color: '#fff',
        fontFamily: appConstants.fontReqular
    },


})

export default Header;