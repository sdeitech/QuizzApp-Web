
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Keyboard, DeviceEventEmitter } from 'react-native';
import { Actions } from 'react-native-router-flux';
import appConstants from './appConstants';
import assests from './assests';
import { dynamicSize, getFontSize } from '../utils/responsive'

const Header = (props) => {

    const [searchKeyword, setSearchKeyword] = useState('')
    const [isIconShow, setIconShow] = useState(false)
    const [Show, setShow] = useState(false)
    /**
       * Search Keyword
       */
    if (props.search.length > 0 && Show == false) {
        setIconShow(true)
        setShow(true)
    }
    if (props.search.length == 0 && Show == true) {
        setIconShow(false)
        setShow(false)
    }
    const handleOnSeachKeyword = (searchStr) => {
        if (searchStr.length > 0) {
            setIconShow(true)
        } else {
            setIconShow(false)
        }
        setSearchKeyword(searchStr)
    }

    /**
   * search cross click
   */
    const handleCloseClick = () => {
        Keyboard.dismiss()
        setIconShow(false)
        setSearchKeyword('')
        DeviceEventEmitter.emit('setSearchData')
        if (props.handleCloseClick) {
            props.handleCloseClick();
        }
    }

    return (
        <View style={{ backgroundColor: '#324B55' }}>
            <View style={[styles.header, props.style]}>
                {
                    props.isBack ?
                        <TouchableOpacity style={{ position: 'absolute', left: 30 }} onPress={() => props.onBackClick != undefined ? props.onBackClick() : Actions.pop()} >
                            <Image source={assests.backArrow} resizeMode='contain' />
                        </TouchableOpacity>
                        : null}
                <Text style={styles.headerText}>{props.title}</Text>
                {props.right ? props.right : null}
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 30, height: dynamicSize(25) }}>
                <Image source={assests.searchWhite} resizeMode='cover' />
                <TextInput
                    placeholderTextColor={'#ADBAC1'}
                    placeholder={props.subTitle}
                    style={{ flex: 1, color: '#ADBAC1', fontSize: 16, padding: 0, fontFamily: appConstants.AirbnbCerealAppLight, marginLeft: 13 }}
                    value={props.search}
                    // onChangeText={(text) => handleOnSeachKeyword(text)}
                    onChangeText={props.onChangeText}
                    onSubmitEditing={props.onSubmit}
                    blurOnSubmit={false}
                >
                </TextInput>
                {
                    isIconShow ?
                        <TouchableOpacity onPress={() => handleCloseClick()}
                            style={{ alignSelf: 'center', }}>
                            <Image source={assests.close_pink} resizeMode='contain' style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        : null
                }
            </View>
            <View style={{ height: 1, backgroundColor: '#DFDFDF', marginVertical: 15, marginHorizontal: 30 }}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#324B55'
    },
    title: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 38
    },
    headerText: {
        fontSize: 26,
        marginLeft: 13,
        color: appConstants.white,
        fontFamily: appConstants.AirbnbCerealAppLight
    },

})

export default Header;