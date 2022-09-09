import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    Image,
    View,
    Alert,
    ScrollView,
    StatusBar,
    Platform,
    Text,
}
    from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import VersionInfo from 'react-native-version-info';
import AsyncStorage from '@react-native-community/async-storage';
// import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken, GraphRequest } from "react-native-fbsdk";

import { styles } from './styles';
import appConstants from '../../common/appConstants';
import assests from '../../common/assests';
import appString from '../../utils/appConstants';
import { useSelector, useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { PopUpScreen } from '../../common/alertPop';
import { SafeAreaView } from 'react-native-safe-area-context';

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
import { validateEmail, validatePassword, requirePassword, isEmpty } from '../../utils/validation';

import { dynamicSize } from '../../utils/responsive';

function LoginScreen() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordStatus, setPasswordStatus] = useState({ status: true, error: '' });
    const [emailStatus, setEmailStatus] = useState({ status: true, error: '' });
    const loader = useSelector(state => state.authReducer.loader);
    const [isError, setIserror] = useState(false);
    const [isVaildEmail, setIsVaildEmail] = useState(false);
    const [isErrorPass, setIserrorPass] = useState(false);
    const [isVaildPass, setIsVaildPass] = useState(false);
    const [visible, setVisible] = useState(false);
    const [errorMsgText, setErrorMsgText] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            // SplashScreen.hide();
        }, 3000);
    }, []);

    const _validate = () => {
        validateEmail(email).status ?
            password == '' ?
                (setIserrorPass(true),
                    setPasswordStatus({ status: true, error: isEmpty(password) ? 'Please enter password' : 'Please enter password' })
                ) :
                requirePassword(password).status && password !== '' ? _login() : setPasswordStatus({ status: true, error: appString['PASSWORD_REQUIRED'] })
            // : (setIsVaildPass(false),
            //     setPasswordStatus({ status: true, error: appString['PASSWORD_REQUIRED'] }))
            : (setIserror(true),
                setEmailStatus({ status: true, error: isEmpty(email) ? 'Please enter email' : 'Please enter vaild email' })

            )

    }

    const _login = async () => {
        dispatch(LoaderAction(true))
        let formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        formData.append('roleId', '2')
        console.log('login', formData);
        const response = await commonApi.loginUser(formData, dispatch)
        consoleLog('response==> 😀', response)

        if (response['status']) {
            await AsyncStorage.setItem("userid", response.data.userId);
            _redirectNavigation(response?.data?.isFirstTimeLogin);
            _sendDeviceInfo(response.data.userId);
        }
        else {
            setTimeout(() => {
                setErrorMsgText(response['message']);
                setVisible(true)
            }, 1000);
        }
    }

    const _selectedCategory = (data) => {
        const ids = data.map((item) => item._id).join(',');
        _addCategory(ids);
    }

    const _addCategory = async (ids) => {
        try {
            const userId = await AsyncStorage.getItem('userid');

            console.log("add category userid => ", userId);
            console.log("add category ids => ", ids);

            dispatch(LoaderAction(true))

            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("categoryId", ids);

            console.log("my form data is => ", formData);

            const response = await commonApi.addPrefCategory(formData, dispatch);
            if (response['status']) {
                await AsyncStorage.setItem("askedCategory", "yes");
                Actions.Tabs();
            } else {
                await AsyncStorage.setItem("askedCategory", "yes");
                Actions.Tabs();
                // alert(response.message);
            }
        } catch (error) {
            await AsyncStorage.setItem("askedCategory", "yes");
            Actions.Tabs();
            // alert(error);
        }
    }

    const _onSkipClick = async () => {
        try {
            await AsyncStorage.setItem("askedCategory", "yes");
            Actions.Tabs();
        } catch (error) {
            console.log("error => ", error);
        }
    }

    const _redirectNavigation = async (isFirstTimeLogin = false) => {
        try {
            const isAsked = await AsyncStorage.getItem("askedCategory");
            if (isAsked || isFirstTimeLogin === false) {
                Actions.Tabs();
            } else {
                Actions.firstCategoryList({
                    categorySeleList: [],
                    completionBlock: (data) => _selectedCategory(data),
                    onSkipClick: () => _onSkipClick(),
                    noBack: true
                })
            }
        } catch (error) {
        }
    }

    const _signUpWithSocial = async (user, registerType) => {

        const { name, email, socialId } = user;

        dispatch(LoaderAction(true));

        let formData = {
            name,
            email,
            "password": "",
            socialId,
            registerType,
            "roleId": 2
        };

        const response = await commonApi.singupUser(JSON.stringify(formData), dispatch)
        consoleLog('response==>', response)

        if (response['status']) {
            return response.data;
        }
        else {
            return false;
        }
    }

    const _checkSocial = async (formData) => {
        try {
            dispatch(LoaderAction(true))
            const response = await commonApi.checkSocial(formData, dispatch);
            if (response['status']) {
                return response.data;
            } else {
                console.log("check social => error => mm ", response.message);
                return false;
            }
        } catch (error) {
            console.log("check social => error => ", error);
            return false;
        }
    }

    const _sendDeviceInfo = async (id) => {
        try {
            const deviceName = await DeviceInfo.getDeviceName();
            const deviceType = Platform.OS === 'ios' ? 'ios' : 'android';
            const token = await messaging().getToken();

            if (token) {
                await AsyncStorage.setItem('FCMToken', token);
            }

            console.log("device token => ", token);

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
            alert(error);
            // await AsyncStorage.clear();
            setTimeout(() => {
                // setErrorMsgText(error);
                // setVisible(true)
            }, 1000);
        }
    }

    const _onChangeText = type => text => {
        if (type === 'password') {
            setPassword(text)
            if (text == '') {
                setIsVaildPass(false)
                setPasswordStatus({ status: true, error: 'Please enter password' })
            } else if (requirePassword(text).status == false) {
                setIsVaildPass(false),
                    setPasswordStatus({ status: true, error: appString['PASSWORD_REQUIRED'] })
            }
            else {
                setIsVaildPass(true)
                setPasswordStatus({ status: true, error: '' })
            }
        }
        else if (type === 'email') {
            setEmail(text)
            const _validateEmail = validateEmail(text)
            if (_validateEmail['status']) {
                setEmailStatus({ status: true, error: '' })
                setIsVaildEmail(true)
            }
            else {
                setEmailStatus({ status: true, error: isEmpty(text) ? 'Please enter email' : 'Please enter vaild email' })
                setIsVaildEmail(false)
            }
            // else setEmailStatus({ status: true, error: _validateEmail['error'] })
        }
    }

    const _applyAction = () => {
        setVisible(false),
            errorMsgText ? null : Actions.pop()
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
            if (appleAuthRequestResponse?.user) {
                let formData = new FormData();
                formData.append('socialId', appleAuthRequestResponse?.user);
                formData.append('name', `${appleAuthRequestResponse?.fullName?.givenName} ${appleAuthRequestResponse?.fullName?.familyName}`);
                formData.append('email', appleAuthRequestResponse?.email);
                formData.append('registerType', 'apple');
                formData.append('roleId', 2);

                const isAvailable = await _checkSocial(formData);

                // const isAvailable = await _checkSocial(appleAuthRequestResponse?.user);

                console.log("apple button press => is available => ", JSON.stringify(isAvailable));
                if (!isAvailable) {
                    const user = {
                        name: `${appleAuthRequestResponse?.fullName?.givenName || ""} ${appleAuthRequestResponse?.fullName?.familyName || ""}`,
                        email: appleAuthRequestResponse?.email,
                        socialId: appleAuthRequestResponse?.user
                    };

                    Actions.signup({ user: user, loginType: 'apple' });

                    // const signUpData = await _signUpWithSocial(user, 'apple');

                    // if (signUpData) {
                    //     await AsyncStorage.setItem("userid", signUpData.id);
                    //     Actions.Tabs();
                    //     _sendDeviceInfo(signUpData.id);
                    // } else {
                    //     throw "Something went wrong!";
                    // }
                } else {
                    await AsyncStorage.setItem("userid", isAvailable?.userId);
                    _redirectNavigation();
                    _sendDeviceInfo(isAvailable?.userId);
                }
            } else {
                throw "Something went wrong!";
            }

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
                    webClientId: '625895329090-f63jr1dlmns7tcg0tth5dv7iu6tebt8q.apps.googleusercontent.com',
                    forceCodeForRefreshToken: true,
                })
            }

            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signOut();
            const userInfo = await GoogleSignin.signIn();

            console.log("google button press => ", JSON.stringify(userInfo));

            if (userInfo?.user?.id) {
                let formData = new FormData();
                formData.append('socialId', userInfo?.user?.id);
                formData.append('name', `${userInfo?.user?.givenName} ${userInfo?.user?.familyName}`);
                formData.append('email', userInfo?.user?.email);
                formData.append('registerType', 'google');
                formData.append('roleId', 2);

                const isAvailable = await _checkSocial(formData);
                // const isAvailable = await _checkSocial(userInfo?.user?.id);

                console.log("google button press => is available => ", JSON.stringify(isAvailable));
                if (!isAvailable) {
                    const user = {
                        name: `${userInfo?.user?.givenName} ${userInfo?.user?.familyName}`,
                        email: userInfo?.user?.email,
                        socialId: userInfo?.user?.id
                    };
                    Actions.signup({ user: user, loginType: 'google' });

                    // const signUpData = await _signUpWithSocial(user, 'google');

                    // if (signUpData) {
                    //     await AsyncStorage.setItem("userid", signUpData.id);
                    //     Actions.Tabs();
                    //     _sendDeviceInfo(signUpData.id);
                    // } else {
                    //     throw "Something went wrong!";
                    // }
                } else {
                    await AsyncStorage.setItem("userid", isAvailable?.userId);

                    _redirectNavigation()
                    // Actions.Tabs();

                    _sendDeviceInfo(isAvailable?.userId);
                }
            } else {
                throw "Something went wrong!";
            }

            // alert("user loged in with google");
        } catch (error) {
            console.log("error of google => ", error);

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
        return;
        try {
            LoginManager.logInWithPermissions(["public_profile", "email"])
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
                                let formData = new FormData();
                                formData.append('socialId', responseData?.id);
                                formData.append('name', `${responseData?.first_name} ${responseData?.last_name}`);
                                formData.append('email', responseData?.email);
                                formData.append('registerType', 'fb');
                                formData.append('roleId', 2);

                                console.log(`formData :: `, formData);

                                const isAvailable = await _checkSocial(formData);
                                if (!isAvailable) {
                                    const user = {
                                        name: `${responseData?.first_name} ${responseData?.last_name}`,
                                        email: responseData?.email,
                                        socialId: responseData?.id
                                    };
                                    console.log("login feature => ", user);
                                    Actions.signup({ user: user, loginType: 'fb' });
                                    // const signUpData = await _signUpWithSocial(user, 'fb');

                                    // if (signUpData) {
                                    //     await AsyncStorage.setItem("userid", signUpData.id);
                                    //     Actions.Tabs();
                                    //     _sendDeviceInfo(signUpData.id);
                                    // } else {
                                    //     throw "Something went wrong!";
                                    // }
                                } else {
                                    await AsyncStorage.setItem("userid", isAvailable.userId);
                                    _redirectNavigation();
                                    _sendDeviceInfo(isAvailable.userId);
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
                        // setErrorMsgText(error);
                        // setVisible(true);
                        console.log("facebook login error => pre =>" + error);
                    }
                );
        } catch (error) {
            // setErrorMsgText(error);
            // setVisible(true);
            console.log("facebook login error => ", error);
        }
    }

    return (
        <>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar translucent backgroundColor={color.statusBar} barStyle="light-content" />
                <View style={styles.backgroundLogo}>
                    <Image resizeMode={'contain'} source={assests.backLogo} />
                </View>
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}>
                    <Loader isLoading={loader} />
                    <Image style={styles.logoImg} resizeMode={'contain'} source={assests.loginLogo} />

                    <Input
                        onChangeText={_onChangeText('email')}
                        value={email}
                        keyboardType={'email-address'}
                        style={{ width: '100%', }}
                        blurOnSubmit={false}
                        placeholder={'Email'}
                        icon={assests.email}
                        isFiledImage
                        autoCapitalize={'none'}
                        source={isVaildEmail ? assests.check : (emailStatus['error'] ? assests.info : '')}
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
                        secureTextEntry
                        isPassword={true}
                        source={isVaildPass ? assests.check : (passwordStatus['error'] ? assests.info : '')}
                        textStyle={{ fontSize: 14, letterSpacing: 3.09, marginLeft: 5 }}
                        errorMessage={passwordStatus['error']}
                    />

                    <View style={styles['phoneNumberContainer']}>
                    </View>

                    <Button
                        title={'Login'}
                        textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppExtraBold }}
                        style={styles['loginButton']}
                        onPress={() => _validate()}
                    />

                    <View style={styles['rowContainer']}>
                        <TouchableText
                            onPress={() => Actions.resetPassword()}
                            text={"Forgot password?"}
                            style={styles['smallText']} />
                    </View>
                    <View style={{ marginTop: dynamicSize(37), flexDirection: 'row', justifyContent: 'space-around' }}>
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
                    </View>

                    <View style={{ marginTop: dynamicSize(40), marginBottom: 40 }}>
                        <Button
                            title={'Create Account'}
                            textStyle={{ fontSize: 17, color: '#FFC542', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppExtraBold }}
                            style={styles['signupButton']}
                            onPress={() => Actions.signup()}
                        />

                        <Text
                            style={
                                [styles['smallText'],
                                { alignSelf: "center" }]
                            }
                        >
                            Version - {VersionInfo.appVersion} ({VersionInfo.buildVersion})
                        </Text>
                    </View>

                    <PopUpScreen
                        isModalVisible={visible}
                        msgText={errorMsgText}
                        isError={true}
                        onCloseModal={() => setVisible(false)}
                        _applyAction={() => _applyAction()}
                    />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
export default LoginScreen

