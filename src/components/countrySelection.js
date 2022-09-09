import React, { useState, useEffect } from 'react'
import { CommonText, CustomModal, Button } from './customComponent'
import { TouchableOpacity, View, Image, FlatList, Dimensions, StyleSheet } from 'react-native'
import appConstants from '../utils/appConstants'
import icons from './icons'
import { dynamicSize, getFontSize } from '../utils/responsive'
import { avenirBold, avenirSemiBold } from '../utils/fontFamily'
import color from '../utils/color'
import Fade from './fade'
import { consoleLog } from './helper'
const { width } = Dimensions.get('window')
let index = 0
let interval
const CustomCountrySelection = (props) => {
    const { selectedCountry } = props
    const country = [
        {
            icon: icons['unitedKingdom'],
            value: appConstants['ENGLISH'],
            text: appConstants['PLEASE_SELECT_YOUR_LANGUAGE']
        },
        {
            icon: icons['burmese'],
            value: appConstants['MYANMAR'],
            text: 'ကျေးဇူးပြု၍ သင့်ဘာသာစကားရွေးပါ'
        },
        {
            icon: icons['combodian'],
            value: appConstants['CAMBODIA'],
            text: 'សូមជ្រើសរើសភាសារបស់អ្នក'
        },
        {
            icon: icons['laos'],
            value: appConstants['LAOS'],
            text: 'ກະລຸນາເລືອກພາສາຂອງທ່ານ'
        },
        {
            icon: icons['thai'],
            value: appConstants['THAI'],
            text: 'กรุณาเลือกภาษาของคุณ'
        },
    ]

    const [toggle, setToggle] = useState(true)
    const [textLanguage, setTextlanguage] = useState(country[0]['text'])




    useEffect(() => {
        interval = setInterval(() => {
            setToggle(!toggle)
            if (toggle) {
                if (index < 4) {
                    index = index + 1
                    setTextlanguage(country[index]['text'])
                }
                else {
                    setTextlanguage(country[0]['text'])
                    index = 0
                }
            }
        }, 1500);
        return () => { consoleLog('will unmount'), clearInterval(interval) }
    }, [])

    const [selectedLanguage, setLanguage] = useState({ icon: icons['unitedKingdom'], value: appConstants['ENGLISH'] })
    const [modal, setModal] = useState(false)

    const opneModal = () => setModal(true)

    const _closeModal = item => () => {
        selectedCountry(item['value'])
        setLanguage(item)
        setModal(false)
    }

    const _seperator = () => (<View style={styles['speerator']} />)

    const _keyExtractor = (item, index) => item + index

    const _renderDropDown = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} style={styles['container']} onPress={_closeModal(item)}>
                <Image source={item['icon']} style={styles['image']} />
                <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: dynamicSize(20) }}>
                    <CommonText text={item['value']} style={styles['dropDown']} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ marginVertical: dynamicSize(10), alignItems: 'center' }}>
            <Fade visible={toggle} style={{ height: dynamicSize(40), justifyContent: 'center', alignItems: 'center' }}>
                <CommonText text={textLanguage} style={styles['welcomeText']} />
            </Fade>
            <TouchableOpacity activeOpacity={1} style={styles['selected']} onPress={opneModal}>
                <Image source={selectedLanguage['icon']} style={styles['image']} />
                <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: dynamicSize(20) }}>
                    <CommonText text={selectedLanguage['value']} style={styles['dropDown']} />
                </View>
                <Image source={icons['downArrow']} />
            </TouchableOpacity>
            <CustomModal
                isModalVisible={modal}
            >
                <FlatList
                    data={country}
                    key='countryPicker'
                    keyExtractor={_keyExtractor}
                    contentContainerStyle={{ justifyContent: 'center', flex: 1, width, alignItems: 'center' }}
                    renderItem={_renderDropDown}
                    ItemSeparatorComponent={_seperator}
                />
            </CustomModal>
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        marginBottom: dynamicSize(30)
    },
    upperContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lowerContainer: {
        zIndex: 2,
        // position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end'
    },

    welcomeText: {
        color: color['darkblueTheme'],
        fontSize: getFontSize(21),
        fontFamily: avenirBold,
    },
    loginButtonStyle: {
        zIndex: 10,
        width: width - dynamicSize(100),
        marginTop: dynamicSize(33),
        marginBottom: dynamicSize(18),
    },
    welocmeBgStyle: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    speerator: {
        height: dynamicSize(5)
    },
    container: {
        paddingHorizontal: dynamicSize(10),
        borderRadius: dynamicSize(5),
        backgroundColor: color['white'],
        width: width - dynamicSize(70),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: dynamicSize(7)
    },
    selected: {
        borderColor: color['darkblueTheme'],
        borderWidth: 0.5,
        borderRadius: dynamicSize(5),
        marginTop: dynamicSize(30),
        paddingHorizontal: dynamicSize(10),
        backgroundColor: color['white'],
        width: width - dynamicSize(70),
        flexDirection: 'row',
        height: dynamicSize(53),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: dynamicSize(5)
    },
    image: {
        width: dynamicSize(50),
        height: dynamicSize(35)
    },
    dropDown: {
        fontSize: getFontSize(14),
        fontFamily: avenirSemiBold
    }
})

export default CustomCountrySelection