import React, { useState, useEffect, memo } from 'react'
import { FlatList, TouchableOpacity, Image, View, Dimensions } from 'react-native'
import { CommonText, Button, CustomModal } from './customComponent'
import countryCode from './countryCode'
import { getFontSize, dynamicSize } from '../utils/responsive'
import commonStyle from './commonStyle'
import appConstants from '../utils/appConstants'
import color from '../utils/color'
import { consoleLog } from './helper'
const { width, height } = Dimensions.get('window')
export const CountryPicker = props => {
    const { style } = props

    const _openCountryModal = () => setCountryModal(true)

    const _closeCountryModal = () => setCountryModal(false)

    const [countryModal, setCountryModal] = useState(false)

    const [selectedCode, setCountryCode] = useState({ icon: countryCode[0]['icon'], dialCode: props.value ? props.value : countryCode[0]['dialCode'] })

    const _setCountryCode = (item, index) => () => {
        props.value && (props.value = item['dialCode'])
        setCountryCode({ icon: item['icon'], dialCode: item['dialCode'] })
        _closeCountryModal()
    }

    useEffect(() => {
        props.countryCode(selectedCode['dialCode'])
        props.value && setCountryCode({ ...selectedCode, icon: countryCode.find(x => x.dialCode === props.value).icon })
    }, [])
    const _keyExtractor = (item, index) => index.toString()

    const _renderCountryCode = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={5}
                onPress={_setCountryCode(item, index)}
                style={{ flexDirection: "row", backgroundColor: color['white'], width: width - dynamicSize(40), justifyContent: 'space-between', paddingHorizontal: dynamicSize(15) }}
            >
                <Image source={item.icon} style={{ alignSelf: "center", marginVertical: dynamicSize(10), width: dynamicSize(30), height: dynamicSize(30) }} resizeMode='contain' />
                <CommonText style={{ fontSize: getFontSize(14), alignSelf: "center", marginVertical: dynamicSize(10), width: width - dynamicSize(160) }} text={item.name} />
                <CommonText style={{ fontSize: getFontSize(14), alignSelf: "center", marginVertical: dynamicSize(10), height: dynamicSize(20), paddingHorizontal: dynamicSize(2.5) }} text={item.dialCode} />
            </TouchableOpacity>
        )
    }

    return (
        <>
            <TouchableOpacity onPress={_openCountryModal} style={[commonStyle['codeContainer'], style]}>
                <CommonText text={appConstants['PHONE']} style={commonStyle['fieldLabel']} />
                <View style={commonStyle['countryCodeView']}>
                    <Image source={selectedCode['icon']} style={commonStyle['flagIcon']} />
                    <CommonText text={props.value ? `+${props.value}` : `+${selectedCode['dialCode']}`} style={commonStyle['dialCodeText']} />
                </View>
            </TouchableOpacity>
            <CustomModal isModalVisible={countryModal}>
                <View style={{ height: height - dynamicSize(200), borderRadius: dynamicSize(10) }}>
                    <FlatList
                        contentContainerStyle={{ paddingVertical: dynamicSize(10) }}
                        data={countryCode}
                        renderItem={_renderCountryCode}
                        keyExtractor={_keyExtractor}
                    />
                </View>
                <Button style={commonStyle['buttonStyle']} title={appConstants['CLOSE']} onPress={_closeCountryModal} />
            </CustomModal>
        </>
    )
}