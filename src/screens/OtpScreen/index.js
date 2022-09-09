import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    Image,
    View,
    Platform,
    ImageBackground,
    StatusBar,
    Text,
    Alert
}
    from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './styles';
import appConstants from '../../common/appConstants';
import appString from '../../utils/appConstants';
import assests from '../../common/assests';
import { useSelector, useDispatch } from 'react-redux'

import {
    Button,
    Input,
    Loader,
    TouchableText
} from '../../components/customComponent';
import color from '../../utils/color';
import { consoleLog, ShowToast, ShowErrorToast, SCREEN_HEIGHT } from '../../components/helper';
import commonStyle from '../../components/commonStyle';
import { LoaderAction } from '../../redux/action'
import * as commonApi from '../../ServiceRequests/serviceAuth'
// import { LoginManager, AccessToken } from "react-native-fbsdk";
import { isEmpty, validatePassword } from '../../utils/validation';

import { SafeAreaView } from 'react-native-safe-area-context';
import { dynamicSize } from '../../utils/responsive';
import { ScrollView } from 'react-native-gesture-handler';
import { PopUpScreen } from '../../common/alertPop'

function ResetPassword(props) {
    const [password, setPassword] = useState('')
    const [confirmpassowrd, setConfirmPassword] = useState('')
    const [isError, setIserror] = useState(false)
    const [isErrorPass, setIserrorPass] = useState(false)
    const [isValidOtp, setIsValidOtp] = useState(false)
    const [isvalidPassword, setIsvalidPassword] = useState(false)
    const [isvalidConfirm, setIsvalidConfirm] = useState(false)
    const [show, setShow] = useState(false)

    const [isErrorCofirmPass, setIserrorConfirmPass] = useState(false)
    const [otp, setOtp] = useState('')
    const [passwordStatus, setPasswordStatus] = useState({ status: true, error: '' })
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState({ status: true, error: '' })
    const [emailStatus, setEmailStatus] = useState({ status: true, error: '' })
    const [isErrorMsg, setIsErrorMsg] = useState(false)

    const loader = useSelector(state => state.authReducer.loader)

    const [visible, setVisible] = useState(false)
    const [msgText, setMsgText] = useState('')



    const dispatch = useDispatch()

    const _validate = () => {
        // debugger
        otp.length == 6 ?
            validatePassword(password).status ?
                confirmpassowrd.length != 0 ?
                    password == confirmpassowrd ?
                        _reset()
                        :
                        (
                            setConfirmPasswordStatus(true),
                            setConfirmPasswordStatus({ status: true, error: 'Password and confirm password not matched' })
                        )
                    :
                    (
                        setIserrorConfirmPass(true),
                        setConfirmPasswordStatus({ status: true, error: isEmpty(confirmpassowrd) ? 'Please enter confirm password' : 'Enter valid password' })
                    )

                :
                (
                    setIserrorPass(true),
                    setPasswordStatus({ status: true, error: isEmpty(password) ? 'Please enter password' : appString['PASSWORD_VALIDATE'] })
                )
            : (
                setIserror(true),
                setEmailStatus({ status: true, error: isEmpty(otp) ? 'Please enter OTP' : 'Enter valid OTP' })
            )
    }

    const _reset = async () => {
        dispatch(LoaderAction(true))
        let formData = new FormData()
        formData.append('email', props.email)
        formData.append('otp', otp)
        formData.append('password', password)

        formData.append('roleId', '2')

        const response = await commonApi.resetPassword(formData, dispatch)
        consoleLog('response==>', response)

        if (response['status']) {

            // alert(response['message'])
            // ShowToast(response['message'])
            const message = response['message'].charAt(0).toUpperCase() + response['message'].slice(1).toLowerCase();
            setTimeout(() => {
                setIsErrorMsg(false)
                setMsgText(message)
                setVisible(true)
            }, 1000);


        }
        else {
            // debugger
            // alert('response.message')
            setTimeout(() => {
                setIsErrorMsg(true)
                setMsgText(response['message'])
                setVisible(true)
            }, 200);

        }
    }
    const _onChangeText = type => text => {
        if (type == 'otp') {
            // setIserrorPass(true)
            setOtp(text)
            if (text.length == 6) {
                setIsValidOtp(true)
                setEmailStatus({ status: true, error: '' })
            }
            else {
                setIsValidOtp(false)
                setEmailStatus({ status: true, error: isEmpty(text) ? 'Please enter OTP' : 'Please enter valid OTP' })
            }
        }
        else if (type === 'password') {
            // setIserrorPass(true)
            setPassword(text)
            if (text == '') {
                setIsvalidPassword(false),setShow(false),
                setPasswordStatus({ status: true, error: 'Please enter password' })
                // setIsVaildPass(false)
                // setPasswordStatus({ status: true, error: 'Enter vaild password' })
            } else if (validatePassword(text).status == false) {
                setIsvalidPassword(false),setShow(true),
                    setPasswordStatus({ status: true, error: appString['PASSWORD_VALIDATE'] })
            }
            else {
                setIsvalidPassword(true),setShow(false),
                setPasswordStatus({ status: true, error: '' })
            }
            // const _validateName = validatePassword(text)
            // if (_validateName['status']) {
            //     setIsvalidPassword(true)
            //     setPasswordStatus({ status: true, error: '' })
            //     setIsvalidConfirm(false)
            // }
            // else {
            //     setIsvalidPassword(false)
            // }
            // else setPasswordStatus({ status: true, error: _validateName['error'] })
        }
        else if (type === 'confrimPassword') {
            setConfirmPassword(text)
            if (password == text) {
                setIsvalidConfirm(true)
                setConfirmPasswordStatus({ status: true, error: '' })

            }
            else {
                setIsvalidConfirm(false)
                setConfirmPasswordStatus({ status: true, error: isEmpty(text)? 'Please enter confirm password' : 'Password and confirm password not matched' })

            }

        }


    }


    const _applyAction = () => {
        setVisible(false),
            isErrorMsg ? null : Actions.reset('loginscreen')
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#22343C' }}>
                <StatusBar backgroundColor={'transparent'} hidden={false} />
                <View style={{ alignSelf: 'flex-end', position: 'absolute', right: 0, top: 0 }}>
                    <Image resizeMode={'contain'} source={assests.backLogo} />
                </View>
                <ScrollView bounces={false} contentContainerStyle={{ alignItems: 'center', marginTop: 10, marginHorizontal: 30 }}>
                    <Loader isLoading={loader} />
                    <Image style={{ marginTop: dynamicSize(60) }} resizeMode={'contain'} source={assests.loginLogo} />
                    <Text style={styles['smallText']}>Enter OTP! </Text>
                    <Text style={styles['subText']}>Please enter your OTP sent to mail {props.email}</Text>


                    <Input
                        // ref={nameRef}
                        focusColor={color['red']}
                        // onFocus={_focusField('name')}
                        // onSubmitEditing={_focusToNext('name')}
                        // onBlur={_clearFocus}
                        onChangeText={_onChangeText('otp')}
                        value={otp}
                        style={{ width: '100%', }}
                        blurOnSubmit={false}
                        placeholder={'OTP'}
                        icon={assests.phone}
                        keyboardType={'number-pad'}
                        isFiledImage
                        labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        source={isValidOtp ? assests.check : (emailStatus['error'] ? assests.info : '')}
                        errorMessage={emailStatus['error']}
                    />
                    <Input
                        // ref={nameRef}
                        focusColor={color['black']}
                        // onFocus={_focusField('name')}
                        // onSubmitEditing={_focusToNext('name')}
                        // onBlur={_clearFocus}
                        onChangeText={_onChangeText('password')}
                        value={password}
                        style={{ width: '100%', }}
                        blurOnSubmit={false}
                        placeholder={'Password'}
                        icon={assests.lock}
                        isFiledImage
                        secureTextEntry
                        isPassword={true}
                        source={isvalidPassword ? assests.check : (passwordStatus['error'] ? assests.info : '')}
                        labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        errorMessage={passwordStatus['error']}
                    />

                    <View style={{ marginTop: show ? dynamicSize(18):null,width:'100%' }}>
                    <Input
                            // ref={nameRef}
                            focusColor={color['black']}
                            // onFocus={_focusField('name')}
                            // onSubmitEditing={_focusToNext('name')}
                            // onBlur={_clearFocus}
                            onChangeText={_onChangeText('confrimPassword')}
                            value={confirmpassowrd}
                            style={{ width: '100%', }}
                            blurOnSubmit={false}
                            placeholder={'Confirm Password'}
                            icon={assests.lock}
                            isFiledImage
                            secureTextEntry
                            isPassword={true}
                            source={isvalidConfirm ? assests.check : (confirmPasswordStatus['error'] ? assests.info : '')}
                            labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                            errorMessage={confirmPasswordStatus['error']}
                    />
                    </View>

                    <Button
                        title={'Submit'}
                        textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppExtraBold }}
                        style={styles['loginButton']}
                        onPress={() => _validate()}
                    />
                    <View style={{ marginVertical: dynamicSize(15) }}>
                        <TouchableText onPress={() => Actions.pop()}
                            text={"Go Back"}
                            style={{
                                fontSize: 12,
                                color: '#FCD274',
                                letterSpacing: 0.71,
                                fontFamily: appConstants.AirbnbCerealAppLight
                            }}
                        />
                    </View>

                    <PopUpScreen
                        isModalVisible={visible}
                        msgText={msgText}
                        isError={isErrorMsg}
                        onCloseModal={() => setVisible(false)}
                        _applyAction={() => _applyAction()}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
export default ResetPassword

