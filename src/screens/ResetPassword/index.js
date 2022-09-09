import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    Image,
    View,
    Alert,
    ImageBackground,
    StatusBar,
    Text
}
    from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './styles';
import appConstants from '../../common/appConstants';
import assests from '../../common/assests';
import { useSelector, useDispatch } from 'react-redux'

import {
    CommonText,
    TouchableIcon,
    KeyboardAwareScroll,
    Button,
    TouchableText,
    Input,
    Loader,
} from '../../components/customComponent';
import color from '../../utils/color';
import { consoleLog, ShowToast, ShowErrorToast, SCREEN_HEIGHT } from '../../components/helper';
import commonStyle from '../../components/commonStyle';
import { LoaderAction } from '../../redux/action'
import * as commonApi from '../../ServiceRequests/serviceAuth'
// import { LoginManager, AccessToken } from "react-native-fbsdk";
import { validateEmail, isEmpty } from '../../utils/validation';
import { PopUpScreen } from '../../common/alertPop'

import { SafeAreaView } from 'react-native-safe-area-context';
import { dynamicSize } from '../../utils/responsive';
import { ScrollView } from 'react-native-gesture-handler';
function ResetPassword() {

    const [isError, setIserror] = useState(false)
    const [email, setEmail] = useState('')
    const [emailStatus, setEmailStatus] = useState({ status: true, error: '' })
    const loader = useSelector(state => state.authReducer.loader)
    const [isErrorVaild, setIsErrorVaild] = useState(false)
    const [visible, setVisible] = useState(false)
    const [msgText, setMsgText] = useState('')




    const dispatch = useDispatch()

    const _validate = () => {
        // debugger
        validateEmail(email).status ?
                _reset()
                : (
                    setIserror(true),
                    setEmailStatus({ status: true, error: isEmpty(email) ? 'Please enter email' : 'Please enter valid email' })
              )
    }

    const _reset = async() => {
        dispatch(LoaderAction(true))
        let formData = new FormData()
        formData.append('email', email)
        formData.append('roleId', '2')

        const response = await commonApi.forgotPassword(formData, dispatch)
        consoleLog('response==>', response)

        if (response['status']) {
            Actions.otpScreen({'email':email})


        }
        else {
            // debugger
            // alert('response.message')
            setTimeout(() => {
                setMsgText(response['message'])
                setVisible(true)
            }, 200);

        }
    }
    const _onChangeText = type => text => {
        if (type === 'email') {
            setEmail(text)
            // setIserror(true)
            const _validateEmail = validateEmail(text)
            if (_validateEmail['status'])
            {
                setIsErrorVaild(true)
                setEmailStatus({ status: true, error: '' })
            }
            else{
                setIsErrorVaild(false)
                setEmailStatus({ status: true, error: isEmpty(text) ? 'Please enter email' : 'Please enter valid email' })
            }

            // else setEmailStatus({ status: true, error: _validateEmail['error'] })
        }


    }

    const _applyAction = () => {
        setVisible(false)
    }
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#22343C' }}>
                <StatusBar backgroundColor={'transparent'} hidden={false} />
                <View style={{ alignSelf: 'flex-end', position: 'absolute', right: 0, top: 0 }}>
                    <Image resizeMode={'contain'} source={assests.backLogo} />
                </View>
                <ScrollView  bounces = {false} contentContainerStyle={{ alignItems: 'center', marginTop: 10, marginHorizontal: 30 }}>
                    <Loader isLoading={loader} />
                    <Image style={{ marginTop: 68 }} resizeMode={'contain'} source={assests.loginLogo} />
                    <Text style={styles['smallText']}>Reset Password! </Text>
                    <Text style={styles['smallOtp']}>Please enter your registered mail and we will send OTP for same. </Text>

                    <Input
                        // ref={nameRef}
                        focusColor={color['red']}
                        // onFocus={_focusField('name')}
                        // onSubmitEditing={_focusToNext('name')}
                        // onBlur={_clearFocus}
                        onChangeText={_onChangeText('email')}
                        value={email}
                        style={{ width: '100%', }}
                        blurOnSubmit={false}
                        placeholder={'Email'}
                        icon={assests.email}
                        isFiledImage
                        autoCapitalize = {'none'}
                        source = {isErrorVaild ? assests.check :(emailStatus['error'] ? assests.info:'') }
                        labelTextStyle={{ fontSize: 14,marginLeft: 5 }}
                        errorMessage={emailStatus['error']}
                    />
                    <Button
                        title={'Reset'}
                        textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09,fontFamily:appConstants.AirbnbCerealAppExtraBold }}
                        style={styles['loginButton']}
                        onPress={() => _validate()}
                    />
                     <View style={{ marginVertical: 15 }}>
                         <TouchableText onPress= {()=>Actions.pop()}
                         text= {"Go Back"}
                         style={{
                             fontSize: 12,
                            color: '#FCD274',
                            letterSpacing: 0.71,
                            fontFamily:appConstants.AirbnbCerealAppLight
                        }}
                         />
                    </View>
                    <PopUpScreen
                        isModalVisible={visible}
                        msgText={msgText}
                        isError = {true}
                        onCloseModal={() => setVisible(false)}
                        _applyAction={() => _applyAction()}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
export default ResetPassword

