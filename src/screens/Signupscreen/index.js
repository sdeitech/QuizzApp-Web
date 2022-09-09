import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    Image,
    View,
    Platform,
    Alert,
    StatusBar,
    Text
}
    from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './styles';
import appConstants from '../../common/appConstants';
import appString from '../../utils/appConstants';
import assests from '../../common/assests';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken } from "react-native-fbsdk";

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
import { validateEmail, validatePassword, isEmpty } from '../../utils/validation';
import { PopUpScreen } from '../../common/alertPop'
import { SafeAreaView } from 'react-native-safe-area-context';
import { dynamicSize } from '../../utils/responsive';
import { ScrollView } from 'react-native-gesture-handler';
function SignupScreen(props) {
    const [password, setPassword] = useState('')
    const [confirmpassowrd, setConfirmPassword] = useState('')
    const [isError, setIserror] = useState(false)
    const [isValidName, setIsValidName] = useState(false)

    const [isErrorPass, setIserrorPass] = useState(false)
    const [isValidPass, setIsValidPass] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidConfirmPass, setIsValidConfirmPass] = useState(false)

    const [isErrorName, setIserrorName] = useState(false)
    const [isErrorCofirmPass, setIserrorConfirmPass] = useState(false)
    const [email, setEmail] = useState(props?.user?.email || '');
    const [name, setName] = useState(props?.user?.name || '');
    const [passwordStatus, setPasswordStatus] = useState({ status: true, error: '' })
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState({ status: true, error: '' })
    const [emailStatus, setEmailStatus] = useState({ status: true, error: '' })
    const [nameStatus, setNameStatus] = useState({ status: true, error: '' })

    const loader = useSelector(state => state.authReducer.loader)
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [msgText, setMsgText] = useState('')
    const [isErrorMsg, setIsErrorMsg] = useState(false)

    // const { user } = props;

    useEffect(() => {
        if (props?.user) {
            setEmail(props?.user?.email);
            setName(props?.user?.name);
        }
    }, []);

    // useEffect(()=>{
    //     console.log(props.email,'heye',props.user_name,'aaaaaaa',name, email)


    // })
    const _validate = () => {
        console.log('name:', name);
        // debugger
        isEmpty(name) == false ?
            validateEmail(email).status ?
                validatePassword(password).status ?
                    confirmpassowrd.length != 0 ?
                        password == confirmpassowrd ?
                            _signUp()
                            :
                            (
                                setConfirmPasswordStatus(true),
                                setConfirmPasswordStatus({ status: true, error: 'Password and confirm password not matched' })
                            )
                        :
                        (
                            setIserrorConfirmPass(true),
                            setConfirmPasswordStatus({ status: true, error: 'Please enter confirm password' })
                        )
                    :

                    (
                        setIserrorPass(true),
                        setPasswordStatus({ status: true, error: isEmpty(password) ? 'Please enter password' : appString['PASSWORD_VALIDATE'] })
                    )

                :
                (
                    setIserror(true),
                    setEmailStatus({ status: true, error: isEmpty(email) ? 'Please enter email' : 'Enter valid email' })
                )
            :
            (
                setIserrorName(true),
                setNameStatus({ status: true, error: 'Please enter name' })
            )
    }

    const _signUp = async () => {
        dispatch(LoaderAction(true));

        if (props?.loginType) {
            _signUpWithSocial(props?.user, props?.loginType);
            return null;
        }

        let formData = {
            name,
            email,
            password,
            "roleId": 2
        };

        console.log("regester formData :: ", formData);

        const response = await commonApi.singupUser(JSON.stringify(formData), dispatch);
        consoleLog('response==>', response)

        if (response['status']) {
            setTimeout(() => {
                setIsErrorMsg(false)
                setMsgText(response['message'])
                setVisible(true)
            }, 1000);

            // ShowToast(response['message'],'long')
        }
        else {
            setTimeout(() => {
                setMsgText(response['message'])
                setVisible(true)
                setIsErrorMsg(true)
            }, 200);
        }
    }

    const _onChangeText = type => text => {

        if (type == 'name') {
            setName(text)
            if (text != '') {
                setIsValidName(true)
                setNameStatus({ status: true, error: '' })
            }
            else {
                setIsValidName(false)
            }
        }
        else if (type === 'email') {
            setEmail(text)
            // setIserror(true)
            const _validateEmail = validateEmail(text)
            if (_validateEmail['status']) {
                setEmailStatus({ status: true, error: '' })
                setIsValidEmail(true)
            }
            else {
                setEmailStatus({ status: true, error: isEmpty(text) ? 'Please enter email' : 'Please enter vaild email' })
                setIsValidEmail(false)

            }
            // else setEmailStatus({ status: true, error: _validateEmail['error'] })
        }
        else if (type === 'password') {
            // setIserrorPass(true)
            setPassword(text)

            if (text == '') {
                setIserrorPass(false)
                setPasswordStatus({ status: true, error: 'Please enter password' })
                setIsValidPass(false)
                // setIsVaildPass(false)
                // setPasswordStatus({ status: true, error: 'Enter vaild password' })
            } else if (validatePassword(text).status == false) {
                setIserrorPass(false);
                setPasswordStatus({ status: true, error: appString['PASSWORD_VALIDATE'] })
                setIsValidPass(false)
            } else {
                setIserrorPass(false)
                setPasswordStatus({ status: true, error: '' })
                setIsValidPass(true)
            }

            // const _validateName = validatePassword(text)
            // setIsValidConfirmPass(false)
            // if (text == confirmpassowrd) {
            //     setIsValidConfirmPass(true)

            // }
            // if (_validateName['status']) {
            //     alert()
            //     setIserrorPass(true)
            //     setPasswordStatus({ status: true, error: appString['PASSWORD_STRONG_ERROR'] })
            //     // setIsValidPass(true)
            //     // setPasswordStatus({ status: true, error: 'note' })

            // }
            // else {
            //     setIsValidPass(false)

            // }
        }
        else if (type === 'confrimPassword') {
            setConfirmPassword(text)
            // debugger
            if (password == text) {
                setIsValidConfirmPass(true)
                setConfirmPasswordStatus({ status: false, error: '' })

            }
            else {
                setIsValidConfirmPass(false)
                setConfirmPasswordStatus({ status: true, error: isEmpty(text) ? 'Please enter confirm password' : 'Password and confirm password not matched' })
            }
        }
    }

    const loginFbAction = () => { // facebook login functionality.
        setLoader(true)
        LoginManager.logOut();
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                setLoader(false)
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log("Login success with permissions: ");
                    AccessToken.getCurrentAccessToken().then((data) => { // get facebook access token
                        const { accessToken } = data;
                        let token = accessToken.toString();
                        setTimeout(() => {
                            _facebookLoginSuccess(token);
                        }, 200)
                    })
                }
            },
            function (error) {
                setLoader(false)
                console.log("Login fail with error: " + error);
            }
        );
    }

    const _facebookLoginSuccess = (token) => {
        appConstants.isMap = true
        // get user detail from facebook by token.
        return fetch('https://graph.facebook.com/v5.0/me?fields=email,id,name,first_name,last_name,picture.width(800).height(800)&access_token=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json()
                .then(facebookData => {
                    console.log("Facebook data========>" + facebookData)
                    setLoader(false)
                    if (response.ok == true) {

                    } else {
                    }
                }))
            .catch((err) => {
                setLoader(false)
            })
    }

    const _applyAction = () => {
        setVisible(false),
            isErrorMsg ? null : Actions.pop()

    }


    const _signUpWithSocial = async (user, registerType) => {

        const { name, email, socialId } = user;

        dispatch(LoaderAction(true));

        let formData = {
            name,
            email,
            "password": props?.loginType ? password : "",
            social_id: socialId,
            registerType,
            "roleId": 2
        };

        consoleLog('formData :: ', formData);

        const response = await commonApi.singupUser(JSON.stringify(formData), dispatch)
        consoleLog('response==>', response)

        if (response['status']) {
            setTimeout(() => {
                setIsErrorMsg(false)
                setMsgText(response['message'])
                setVisible(true)
            }, 1000);
            return response.data;
        }
        else {
            alert(JSON.stringify(response['message']));
            return false;
        }
    }

    const _checkSocial = async (socialId) => {
        try {
            dispatch(LoaderAction(true))
            let formData = new FormData()
            formData.append('socialId', socialId);
            const response = await commonApi.checkSocial(formData, dispatch);
            if (response['status']) {
                return response.data;
            } else {
                // console.log("check social => error => ", response.message);
                return false;
            }
        } catch (error) {
            // console.log("check social => error => ", error);
            return false;
        }
    }

    const _sendDeviceInfo = async (id) => {
        try {
            const deviceName = await DeviceInfo.getDeviceName();
            const deviceType = Platform.OS === 'ios' ? 'ios' : 'android';
            const token = await messaging().getToken();

            if (!token) {
                AsyncStorage.setItem('FCMToken', token);
            }

            let formData = new FormData()
            formData.append('id', id);
            formData.append('deviceName', deviceName);
            formData.append('deviceType', deviceType);
            formData.append('deviceToken', token);

            const response = await commonApi.updateDeviceInformation(formData, dispatch);

            if (response['status']) {
                // Actions.Tabs();
            }
            else {
                // await AsyncStorage.clear();
                setTimeout(() => {
                    // setErrorMsgText(response['message']);
                    // setVisible(true)
                }, 1000);
            }
        } catch (error) {
            // await AsyncStorage.clear();
            setTimeout(() => {
                // setErrorMsgText(error);
                // setVisible(true)
            }, 1000);
        }
    }


    const onAppleButtonPress = async () => {
        try {
            // Start the sign-in request
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw 'Apple Sign-In failed - no identify token returned';
            }

            // alert(JSON.stringify(appleAuthRequestResponse));
            console.log("apple login response => ", JSON.stringify(appleAuthRequestResponse));

            // // Create a Firebase credential from the response
            // const { identityToken, nonce } = appleAuthRequestResponse;
            // const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

            // // Sign the user in with the credential
            // return auth().signInWithCredential(appleCredential);
        } catch (error) {
            setVisible(true);
            setErrorMsgText("error");
            // alert(error);
        }
    }

    const onGoogleButtonPress = async () => {
        try {
            if (Platform.OS === 'android') {
                GoogleSignin.configure({
                    forceCodeForRefreshToken: true,
                })
            } else {
                GoogleSignin.configure({
                    webClientId: '678213145366-es08r89ef0a2kcdhfjjfv6s3othq0jeg.apps.googleusercontent.com',
                    forceCodeForRefreshToken: true,
                })
            }

            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signOut();
            const userInfo = await GoogleSignin.signIn();

            console.log("google button press => ", JSON.stringify(userInfo));

            if (userInfo?.user?.id) {
                const isAvailable = await _checkSocial(userInfo?.user?.id);

                console.log("google button press => is available => ", JSON.stringify(isAvailable));
                if (!isAvailable) {
                    const user = {
                        user_name: `${userInfo?.user?.givenName} ${userInfo?.user?.familyName}`,
                        email: userInfo?.user?.email,
                        socialId: userInfo?.user?.id
                    };

                    // Actions.refresh(user)
                    // setEmail(props.email);
                    // setEmailStatus({ status: true, error: '' })
                    // setIsValidEmail(true)
                    // setName(props.user_name);
                    // setIsValidName(true)
                    // setNameStatus({ status: true, error: '' })
                    const signUpData = await _signUpWithSocial(user, 'google');

                    if (signUpData) {
                        await AsyncStorage.setItem("userid", signUpData.id);
                        Actions.Tabs();
                        _sendDeviceInfo(signUpData.id);
                    } else {
                        throw "Something went wrong!";
                    }
                } else {
                    await AsyncStorage.setItem("userid", isAvailable?._id);
                    Actions.Tabs();
                    _sendDeviceInfo(isAvailable?._id);
                }
            } else {
                throw "Something went wrong!";
            }

            // alert("user loged in with google");
        } catch (error) {
            console.log("error of google => ", JSON.stringify(error));

            let errorMessage = error;
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                errorMessage = "Something went wrong!";
                // errorMessage = "Login cancelled by user";
                // alert("SIGN_IN_CANCELLED");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                errorMessage = "In Progress";
                // alert("IN_PROGRESS");
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                errorMessage = "Play service not available";
                // alert("PLAY_SERVICES_NOT_AVAILABLE");
                // play services not available or outdated
            } else {
                errorMessage = "Something went wrong!";
                // alert(error);
                // some other error happened
            }

            setVisible(true);
            setErrorMsgText(errorMessage);
        }
    }

    const onFacebookButtonPress = async () => {
        try {
            LoginManager.logInWithPermissions(["public_profile", "email", "user_about_me", "publish_actions"])
                .then(async (result) => {
                    if (result.isCancelled) {
                        console.log("Login cancelled");
                    } else {
                        const data = await AccessToken.getCurrentAccessToken();

                        console.log("access token => ", data.accessToken);

                        if (!data) {
                            throw 'Something went wrong obtaining access token';
                        } else {
                            const response = await fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name&access_token=' + data.accessToken);
                            const responseData = await response.json();

                            if (responseData?.id) {
                                const isAvailable = await _checkSocial(responseData?.id);
                                if (!isAvailable) {
                                    const user = {
                                        name: `${responseData?.first_name} ${responseData?.last_name}`,
                                        email: responseData?.email,
                                        socialId: responseData?.id
                                    };
                                    const signUpData = await _signUpWithSocial(user, 'fb');

                                    if (signUpData) {
                                        await AsyncStorage.setItem("userid", signUpData.id);
                                        Actions.Tabs();
                                        _sendDeviceInfo(signUpData.id);
                                    } else {
                                        throw "Something went wrong!";
                                    }
                                } else {
                                    await AsyncStorage.setItem("userid", isAvailable._id);
                                    Actions.Tabs();
                                    _sendDeviceInfo(isAvailable._id);
                                }
                            } else {
                                throw "Something went wrong!";
                            }
                        }

                        console.log(
                            "Login success with permissions: " +
                            result.grantedPermissions.toString()
                        );
                    }
                },
                    function (error) {
                        setErrorMsgText(error);
                        setVisible(true);
                        console.log("Login fail with error: " + error);
                    }
                );
        } catch (error) {
            setErrorMsgText(error);
            setVisible(true);
            // alert(error);
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#22343C' }}>
                <StatusBar backgroundColor={color.statusBar} hidden={false} />
                <View style={{ alignSelf: 'flex-end', position: 'absolute', right: 0, top: 0 }}>
                    <Image resizeMode={'contain'} source={assests.backLogo} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ alignItems: 'center', marginHorizontal: dynamicSize(30) }}>
                    <Loader isLoading={loader} />
                    <Image style={{ marginTop: 15 }} resizeMode={'contain'} source={assests.loginLogo} />
                    <Text style={styles['smallText']}>Welcome to
                        <Text> </Text>
                        <Text style={styles['smallText'], { fontWeight: '800' }}>Murabbo!</Text>
                    </Text>
                    <Input
                        // ref={nameRef}
                        focusColor={color['red']}
                        onChangeText={_onChangeText('name')}
                        value={props?.user?.name || name}
                        style={{ width: '100%', }}
                        blurOnSubmit={false}
                        placeholder={'Name'}
                        icon={assests.user}
                        isFiledImage
                        source={isValidName ? assests.check : (nameStatus['error'] ? assests.info : '')}
                        labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        errorMessage={nameStatus['error']}
                    />
                    <Input
                        onChangeText={_onChangeText('email')}
                        value={props?.user?.email || email}
                        keyboardType={'email-address'}
                        style={{ width: '100%', }}
                        blurOnSubmit={false}
                        placeholder={'Email'}
                        icon={assests.email}
                        autoCapitalize={'none'}
                        isFiledImage
                        source={isValidEmail ? assests.check : (emailStatus['error'] ? assests.info : '')}
                        labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        errorMessage={emailStatus['error']}
                    />
                    <Input
                        onChangeText={_onChangeText('password')}
                        value={password}
                        style={{ width: '100%', }}
                        blurOnSubmit={false}
                        placeholder={'Password'}
                        icon={assests.lock}
                        isFiledImage
                        isPassword={true}
                        secureTextEntry
                        source={isValidPass ? assests.check : (passwordStatus['error'] ? assests.info : '')}
                        labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        errorMessage={passwordStatus['error']}
                    />
                    <View style={{ marginTop: passwordStatus['error'] ? dynamicSize(18) : null, width: '100%' }}>
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
                            isPassword={true}
                            isFiledImage
                            secureTextEntry
                            source={isValidConfirmPass ? assests.check : (confirmPasswordStatus['error'] ? assests.info : '')}
                            labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                            errorMessage={confirmPasswordStatus['error']}
                        />
                    </View>
                    <Button
                        title={'Signup'}
                        textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppExtraBold }}
                        style={styles['loginButton']}
                        onPress={() => _validate()}
                    />
                    {/* <View style={{ marginTop: dynamicSize(37), flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableIcon
                            containerStyle={{ marginRight: dynamicSize(60) }}
                            icon={assests.facebook}
                            onPress={() => onFacebookButtonPress()}
                        />
                        <TouchableIcon
                            containerStyle={{ marginRight: Platform.OS === 'ios' ? dynamicSize(60) : undefined }}
                            icon={assests.gmail}
                            onPress={() => onGoogleButtonPress()}
                        />

                        {
                            Platform.OS === 'ios' &&
                            <TouchableIcon
                                icon={assests.apple}
                                onPress={() => onAppleButtonPress()}
                            />
                        }
                    </View> */}
                    <View >
                        <Button
                            title={'Go to Login'}
                            textStyle={{ fontSize: 17, color: '#56D8F1', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppExtraBold }}
                            style={styles['signupButton']}
                            onPress={() => Actions.pop()}
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
export default SignupScreen

