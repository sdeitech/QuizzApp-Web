import React, { useState } from 'react'
import { Modal, TouchableOpacity, View, Text, Image, Dimensions, TouchableWithoutFeedback, TextInput, Keyboard, InputAccessoryView, ActivityIndicator, Platform } from 'react-native'
import { TextField } from '../common/@ubaids/react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import commonStyle from './commonStyle'
// import { Dropdown } from 'react-native-material-dropdown';
import { getFontSize, dynamicSize } from '../utils/responsive'
import { consoleLog } from './helper';
import color from '../utils/color';
import appConstants from '../utils/appConstants';
import { useDispatch } from 'react-redux';
import appConstant from '../common/appConstants';
import { useSafeArea, SafeAreaView } from 'react-native-safe-area-context';
import assests from '../common/assests'
// import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window')
export const TouchableIcon = ({ onPress, icon, containerStyle, imageStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[commonStyle['touchableIcon'], containerStyle]}>
            <Image source={icon} resizeMode='contain' style={imageStyle} />
        </TouchableOpacity>
    )
}
// <!--        android:windowSoftInputMode="adjustResize"-->
export const KeyboardAwareScroll = ({ children, style }) => {
    const _disableKeyboard = () => Keyboard.dismiss()
    return (
        <View style={commonStyle['mainContainer']}>
            <TouchableWithoutFeedback onPress={_disableKeyboard}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" extraScrollHeight={20} enableOnAndroid={true} contentContainerStyle={[commonStyle['keyboardContainer'], style]} showsVerticalScrollIndicator={false}>
                    {children}
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </View>
    )

}

export const Input = React.forwardRef((props, ref) => {

    const { isBorderVisible, labelColor, autoCapitalize, defaultValue, setValue, errorMessage, onChangeText, numberOfLines, multiline, textStyle, editable, blurOnSubmit, placeholder, value, isFiledImage, onSubmitEditing, icon, style, onFocus, onBlur, autoFocus, secureTextEntry, returnKeyType, returnTypeLabel, keyboardType, iconStyle, source, subSource, onCrossPress, imageContainer, isPassword } = props

    const [visible, setVisible] = useState(true);

    return (
        <View style={[isBorderVisible ? commonStyle['withoutBorderTextFieldContainer'] : commonStyle['textFieldContainer'], style]}>
            {isFiledImage &&
                <View style={commonStyle['imageContainer']}>
                    <Image source={icon} resizeMode='contain' />
                </View>
            }
            <View style={{ width: isFiledImage ? source ? '75%' : '85%' : '100%', marginLeft: isFiledImage ? 5 : 0 }}>
                <TextField
                    labelTextStyle={{
                        fontFamily: appConstant.appConstant,
                        fontSize: getFontSize(16)
                    }}
                    style={[{
                        fontFamily: appConstant.appConstant,
                        fontSize: getFontSize(20), color: '#747474',
                    },

                        textStyle]
                    }
                    ref={ref}
                    baseColor={'#fff'} //Placeholder color
                    editable={editable}
                    label={placeholder ? placeholder : ''}
                    lineWidth={0}

                    defaultValue={defaultValue}
                    value={value}
                    setValue={setValue}
                    multiline={multiline}
                    activeLineWidth={0}
                    animationDuration={300}
                    autoCapitalize={autoCapitalize}
                    containerStyle={{ height: dynamicSize(50), marginBottom: Platform.OS === 'ios' ? dynamicSize(13) : dynamicSize(10) }}
                    tintColor={'#fff' || '#fff'} //label color
                    fontSize={getFontSize(16)}
                    textColor={'#fff'}
                    labelFontSize={getFontSize(12)}
                    secureTextEntry={secureTextEntry && visible}
                    keyboardType={keyboardType || 'default'}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    numberOfLines={numberOfLines}
                    onChangeText={onChangeText}
                    autoFocus={autoFocus}
                    blurOnSubmit={blurOnSubmit}
                    // clearButtonMode='while-editing'
                    returnKeyType={returnKeyType || 'next'}
                    returnKeyLabel={returnTypeLabel || 'next'}
                    onSubmitEditing={onSubmitEditing}
                    error={errorMessage}
                    errorColor={color['fadeRedColor']}
                />
            </View>

            {source ?
                <TouchableOpacity onPress={onCrossPress} style={{ marginRight: 12 }}>
                    <Image source={source} resizeMode='contain' style={{ alignSelf: 'center', marginBottom: 10 }} />
                </TouchableOpacity>
                :
                null
            }
            {subSource ?
                <TouchableOpacity onPress={onCrossPress} style={{ right: 6, marginRight: 12 }}>
                    <Image source={subSource} resizeMode='contain' style={{ alignSelf: 'center', marginBottom: 10 }} />
                </TouchableOpacity>
                :
                null
            }
            {isPassword ?
                <TouchableOpacity onPress={() => setVisible(!visible)} style={{ right: 12, top: 4 }}>
                    <Image
                        source={visible ? assests.hideEye : assests.eye}
                        resizeMode='stretch'
                        style={{ alignSelf: 'center', marginBottom: 10 }}
                    />
                </TouchableOpacity>
                :
                null
            }
        </View>
    )
})

export const InputCreteContest = React.forwardRef((props, ref) => {
    const {
        labelColor, autoCapitalize, onPress,
        defaultValue, errorMessage, onChangeText,
        numberOfLines, multiline, textStyle,
        editable, blurOnSubmit, placeholder,
        value, isFiledImage, onSubmitEditing,
        icon, style, onFocus,
        onBlur, autoFocus, secureTextEntry, returnKeyType,
        returnTypeLabel, keyboardType, iconStyle, source,
        onCrossPress, imageContainer, defaultTitle } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[commonStyle['textFieldContainer'], style,]}>
                {isFiledImage &&
                    <View style={commonStyle['imageContainer']}>
                        <Image source={icon} resizeMode='contain' />
                    </View>
                }
                <View style={{ width: isFiledImage ? '83%' : '100%', marginLeft: isFiledImage ? 5 : 0 }}>
                    <Text
                        style={{
                            fontSize: 14,
                            marginBottom: dynamicSize(4),
                            color: '#fff'
                        }}
                    >
                        {placeholder === defaultTitle || !defaultTitle ? null : defaultTitle}
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        marginBottom: dynamicSize(placeholder === defaultTitle || !defaultTitle ? 10 : 6),
                        padding: 0,
                        marginLeft: value != '' ? value : dynamicSize(2),
                        color: placeholder === defaultTitle || !defaultTitle ? '#fff' : '#747474',
                    }}>{placeholder || null}</Text>
                </View>
                {source ?
                    <TouchableOpacity onPress={onCrossPress} style={{ marginRight: 10 }}>
                        <Image source={source} resizeMode='contain' style={{ alignSelf: 'center', marginBottom: 10 }} />
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
            <View style={{ marginTop: -dynamicSize(20), marginLeft: dynamicSize(30) }}>
                <Text style={{ color: color['fadeRedColor'], fontSize: 12 }}>{errorMessage}</Text>
            </View>
        </TouchableOpacity>
    )
})




export const InputIcons = React.forwardRef((props, ref) => {

    const { icon, title, placeholder, containerStyle, touch, onPress, value, info, onChangeText, keyboardType } = props
    return (
        <View>
            <View style={[{ marginTop: dynamicSize(20), flexDirection: 'row', alignItems: 'center' }, { containerStyle }]}>
                <Image source={icon} />
                <Text style={{ fontSize: 13, letterSpacing: 1.33, textAlign: 'left', fontFamily: appConstants.AirbnbCerealAppMedium, color: '#fff', marginLeft: dynamicSize(12) }}>{title}</Text>
                {info ?
                    <TouchableOpacity>
                        <Image style={{ marginLeft: 5 }} source={assests.info2} />
                    </TouchableOpacity>
                    : null}

            </View>
            <TouchableOpacity onPress={onPress}>
                {!touch ?
                    <TextInput
                        onChangeText={onChangeText}
                        placeholderTextColor={'#747474'}
                        value={value}
                        style={{
                            fontSize: 18,
                            color: '#747474',
                            marginTop: dynamicSize(10),
                            marginLeft: dynamicSize(29.8)
                        }}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                    />
                    :
                    <Text style={{
                        fontSize: 18,
                        color: '#747474',
                        marginTop: dynamicSize(10),
                        marginLeft: dynamicSize(29.8)

                    }}>{value}</Text>



                }
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: '#fff', width: '100%', marginTop: dynamicSize(10) }} />
        </View>
    )
})



export const PhoneInput = React.forwardRef((props, ref) => {
    const { textInputStyle, style, onChangeText, autoFocus, onSubmitEditing, errorMessage, containerStyle } = props
    return (
        <View style={[{ borderBottomWidth: 1, borderBottomColor: color['white'], height: dynamicSize(40) }, containerStyle]} >
            <View style={[{ width: '100%', alignItems: 'flex-start', justifyContent: 'center', height: dynamicSize(38) }, style]}>
                <TextInput
                    {...props}
                    ref={ref}
                    style={[commonStyle['phoneTextInput'], textInputStyle]}
                    returnKeyType={'done'}
                    onChangeText={onChangeText}
                    autoFocus={autoFocus}
                    blurOnSubmit={false}
                    clearButtonMode='while-editing'
                    maxLength={12}
                    keyboardType='phone-pad'
                    onSubmitEditing={() => Keyboard.dismiss()}
                />
            </View>
            {errorMessage !== '' && <CommonText text={errorMessage} style={commonStyle['errorMessage']} />}
        </View>
    )
})

export const OtpInput = React.forwardRef((props, ref) => {
    const { onKeyPress, onChangeText, onFocus, onBlur, returnKeyType, returnTypeLabel, style, onSubmitEditing, blurOnSubmit, autoFocus } = props
    return (
        <View style={[commonStyle['optContainer'], style]}>
            <TextInput
                ref={ref}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                style={commonStyle['otptextStyle']}
                keyboardType='number-pad'
                maxLength={1}
                autoFocus={autoFocus}
                onKeyPress={onKeyPress}
                blurOnSubmit={blurOnSubmit}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType || 'next'}
                returnKeyLabel={returnTypeLabel || 'next'}
            />
        </View>
    )
})

export const CommonText = props => {
    const { text, style, onPress } = props
    return (
        <Text onPress={onPress}
            style={[{
                // fontFamily: avenir, 
                fontSize: getFontSize(12)
            }, style]} >{text}</Text>
    )
}

export const Button = ({ title, onPress, style, textStyle, dob, ...rest }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[commonStyle['buttonContainer'], style]} {...rest} >
            <CommonText style={[commonStyle['buttonText'], textStyle]}
                text={title && title.toUpperCase() || dob ? title : appConstants['SUMBIT']} />
        </TouchableOpacity>
    )
}

export const ButtonSecondary = ({ title, onPress, style, textStyle, icon, imageStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[commonStyle['secondaryButtonContainer'], style]}>
            <Image source={icon} resizeMode='contain' style={imageStyle} />

            <CommonText style={[commonStyle['secondaryButtonText'], textStyle]} text={title || appConstants['SUMBIT']} />
        </TouchableOpacity>
    )
}

export const TouchableText = ({ text, onPress, style }) => {
    return (<CommonText text={text} onPress={onPress} style={[commonStyle['linkText'], style]} />)
}

export const CustomModal = props => {
    const { isModalVisible, children, style } = props
    return (
        <Modal
            visible={isModalVisible}
            transparent={true}
            // animationType="fade"
            onRequestClose={() => consoleLog('On request close pressed.')} >
            <View style={[{ flex: 1, backgroundColor: color['translucentDarkBule'], alignItems: 'center', justifyContent: 'center' }, style]}>
                {children}
            </View>
        </Modal>
    )
}

// export const CustomDropDown = props => {
//     const { renderBase, valueExtractor, labelExtractor, errorMessage, data, label, value, error, onChange, style, placeholder, icon, containerStyle } = props

//     const _renderIcon = () => {
//         return (
//             <Image source={icons['downArrow']} resizeMode='contain' style={{ marginVertical: dynamicSize(5), marginLeft: dynamicSize(2) }} />
//         )
//     }
// debugger
//     return (
//         <Dropdown
//             renderBase={renderBase}
//             valueExtractor={valueExtractor}
//             placeholderTextColor={color['white']}
//             value={value}
//             labelExtractor={labelExtractor}
//             // labelTextStyle={{ fontFamily: avenir, color: 'red' }}
//             // itemTextStyle={{ fontFamily: avenir }}
//             containerStyle={[commonStyle['dropDownContainer'], style]}
//             labelFontSize={getFontSize(12)}
//             fontSize={getFontSize(16)}
//             // fontFamily={avenir}
//             error={error}
//             baseColor={color['translucentDarkBule']}
//             label={label || ''}
//             itemColor={color['inactiveTextColor']}
//             textColor={color['white']}
//             data={data}
//             selectedItemColor={color['white']}
//             inputContainerStyle={[{ borderBottomColor: color['mediumLightGrey'], borderBottomWidth: 1 }, containerStyle]}
//             renderAccessory={icon || _renderIcon}
//             placeholder={placeholder}
//             onChangeText={onChange}
//             error={errorMessage}
//             errorColor={color['fadeRedColor']}
//         />
//     )
// }
export const CommonView = props => {
    const { style, children } = props
    return (
        <View style={[commonStyle['commonViewContainer'], style]}>
            {children}
        </View>
    )
}



export const CardComponent = props => {
    const { style, children } = props
    return (
        <View style={[commonStyle['cardViewStyle'], style]}>
            {children}
        </View>
    )
}

export const Card = props => {
    const { onPress, style, children, onPressIn, onPressOut } = props
    return (
        <TouchableOpacity {...props} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={[commonStyle['cardViewStyleOne'], style]}>
            {children}
        </TouchableOpacity>
    )
}

export const SearchComponent = props => {
    const { onFocus, onBlur, onChangeText, placeholder, searchContainerStyle, onSubmitEditing } = props
    return (
        <View style={[commonStyle['searchContainer'], searchContainerStyle]}>
            <TextInput
                onChangeText={onChangeText}
                placeholder={placeholder || appConstants['SEARCH']}
                placeholderTextColor={color['inactiveTextColor']}
                style={commonStyle['textInput']}
                returnKeyType={"search"}
                returnKeyLabel={"Search"}
                onFocus={onFocus}
                onBlur={onBlur}
                onSubmitEditing={onSubmitEditing}
                clearButtonMode='while-editing'
            />
            <TouchableOpacity style={commonStyle['searchIconContainer']}>
                {/* <Image source={icons['search']} resizeMode='contain' /> */}
            </TouchableOpacity>
        </View>
    )
}

export const ChatTextInput = React.forwardRef((props, ref) => {
    const { onPress, onChangeText, inputStyle, style, onFocus, onBlur, numberOfLines, onContentSizeChange, value } = props
    return (

        <View style={[commonStyle['chatInputContainer'], style]}>
            <TextInput
                value={value}
                numberOfLines={numberOfLines}
                ref={ref}
                style={[commonStyle['chatInputStyle'], inputStyle]}
                multiline
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                blurOnSubmit={false}
                onContentSizeChange={onContentSizeChange}
                placeholder={appConstants['TYPE_A_MESSAGE']}
                placeholderTextColor={color['chatTxtColor']}
            />
            {/* <TouchableIcon icon={icons['sendIcon']} onPress={onPress} /> */}
        </View>
    )
})

export const Loader = props => {
    const { isLoading } = props
    return (
        <CustomModal isModalVisible={isLoading} >
            <ActivityIndicator size={'large'} color={color['white']} />
        </CustomModal>
    )
}

export const CustomActivityIndicator = props => {
    const { size, key } = props
    return (
        <ActivityIndicator key={key} size={size || 'large'} color={color['white']} />
    )
}

export const EmptyData = props => {
    const { noDataMessage } = props
    return <CommonText text={noDataMessage} style={commonStyle['emptyMessageStyle']} />
}

export const PleaseWait = () => {
    return <CommonText text={appConstants['PLEASE_WAIT']} style={commonStyle['emptyMessageStyle']} />
}

export const LabelValueComponent = props => {
    const { label, value, style } = props
    return (
        <View style={[commonStyle['bottomLine'], style]}>
            <CommonText text={label} style={commonStyle['labelStyle']} />
            <CommonText text={value} style={commonStyle['valueStyle']} />
        </View>
    )
}

export const CustomAlert = (props) => {
    const { isVisible, message, isMoreButton, onCancelPress, onOkPress, onPress, cancelText, okText, children, msgStyle } = props
    return (
        <CustomModal isModalVisible={isVisible} >
            <View style={commonStyle['modalContainer']}>
                <CommonText style={[commonStyle['alertMessage'], { marginBottom: dynamicSize(20) }, msgStyle]} text={message} />
                {children}
                {isMoreButton ?
                    <View style={commonStyle['alertButtonContainer']}>
                        <Button style={commonStyle['alertButtonStyle']} title={cancelText || appConstants['CANCEL']} onPress={onCancelPress} textStyle={commonStyle['alertTextStyle']} />
                        <Button style={commonStyle['alertButtonStyle']} title={okText || appConstants['OK']} onPress={onOkPress} textStyle={commonStyle['alertTextStyle']} />
                    </View>
                    :
                    <View style={commonStyle['alertButtonContainer']}>
                        <Button style={commonStyle['alertButtonStyle']} title={appConstants['OK']} onPress={onPress} textStyle={commonStyle['alertTextStyle']} />
                    </View>
                }

            </View>
        </CustomModal>
    )
}

export const ThemeImage = props => {
    const { source, style } = props
    return (
        <Image source={source} resizeMode='contain' style={[commonStyle['imageTheme'], style]} />
    )
}

export const RadioComponent = props => {
    const { label, icon, onPress, style, iconStyle, labelStyle, onPressIn } = props

    return (
        <TouchableOpacity style={[{ flexDirection: 'row', alignItems: 'center' }, style]} onPress={onPress} onPressIn={onPressIn}>
            <ThemeImage source={icon} style={[commonStyle['radioIcon'], iconStyle]} />
            <CommonText style={[commonStyle['radioText'], { marginLeft: dynamicSize(10) }, labelStyle]} text={label} />
        </TouchableOpacity>
    )
}

export const SafeArea = props => {
    const insets = useSafeArea()
    return (
        <SafeAreaView style={{ paddingBottom: insets.bottom, paddingTop: 0, backgroundColor: color['white'] }} />
    )
}

