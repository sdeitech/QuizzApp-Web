import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import appConstants from './appConstants';
import assests from './assests';

const Header = (props) => {
    return (
        <View style={[styles.header, props.style]}>
            {
                props.backButton ?
                    <View>
                        {props.isSearch ?
                            <TouchableOpacity
                                hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                                style={{ marginLeft: 20, }}
                                onPress={props.onBack}
                            >
                                <Image source={props.black ? assests.back_dark : assests.back}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                                style={{ marginLeft: 20, }}
                                onPress={() => props.isSearch ? props.onBack : Actions.pop({ backscreen: true })}
                            >
                                <Image source={props.black ? assests.back_dark : assests.back}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        }
                    </View>
                    : null}
            <View style={[styles.title, props.backButton ? (props.isChat || props.clear_notification || props.editScreen ? { alignItems: 'center' } : { alignItems: 'center', marginRight: 44, }) : { alignItems: 'center', }]}>
                <Text style={[styles.subHeaderText, props.subHeaderTextS,]}>{props.textInput}</Text>
            </View>
         
              


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
        backgroundColor: '#fff'
    },
    title: {
        flex: 1,
        alignItems: 'flex-start',
    },
    subHeaderText: {
        fontSize: 16,
        color: appConstants.white,
        fontFamily: appConstants.fontBold,
        fontWeight:'bold'
    },
})

export default Header;