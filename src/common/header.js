import React from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity,Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import appConstants from './appConstants';
import assests from './assests';

const Header = (props) => {
    return (
        <View  style={[styles.header]}>
          <Image
        style={styles.imgView}
        source={props.profileImage != '' ? {uri : props.profileImage} : assests.dummyProfile}
        resizeMode={'cover'}
        defaultSource={assests.dummyProfile}
    />
          <View>
                <Text style={styles.headerText}>{props.textInputname}</Text>
                <Text style={styles.subHeaderText}>{props.textInputemail}</Text>
                </View>
        </View>
    )
}
const setImage = (userPicture) => {
    if (userPicture != '') {
        return { uri: userPicture }
    }
    else {
        return assests.profile1
    }
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal:15,
        backgroundColor: '#fff'
    },
    title: {
        flex: 1,
        alignItems: 'flex-start',

    },
    headerText: {
        marginLeft:10,
        fontSize: 12,
        color: '#000',
        fontFamily: appConstants.fontBold
    },
    subHeaderText: {
        marginLeft:10,
        fontSize: 10,
        color: '#000',
        fontFamily: appConstants.fontReqular
    },
    imgView:{
        height:Dimensions.get('window').height *0.10,
        width:Dimensions.get('window').height *0.10,
        borderRadius:Dimensions.get('window').height *0.10/2,
        overflow: 'hidden',
        // borderColor: 'green', 
        // borderWidth:1 
    }


})

export default Header;