import React, { useState } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
    ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import assests from '../../common/assests';
import constants from '../../utils/appConstants';
import color from '../../utils/color';
import * as commonApi from '../../ServiceRequests/serviceAuth'
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import { Button, Input, Loader } from '../../components/customComponent';
import { validatePassword, isEmpty } from '../../utils/validation';
import { PopUpScreen } from '../../common/alertPop';
import { LoaderAction } from '../../redux/action';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.authReducer.loader);

    const [oldPass, setoldPass] = useState('');
    const [oldPassStatus, setoldPassStatus] = useState({ status: true, error: '' });
    const [isOldPassErrorVaild, setIsOldPassErrorVaild] = useState(false);

    const [newPass, setnewPass] = useState('');
    const [newPassStatus, setnewPassStatus] = useState({ status: true, error: '' });
    const [isNewPassErrorVaild, setIsNewPassErrorVaild] = useState(false);

    const [conPass, setconPass] = useState('');
    const [conPassStatus, setconPassStatus] = useState({ status: true, error: '' });
    const [isConPassErrorVaild, setIsConPassErrorVaild] = useState(false);

    const [visible, setVisible] = useState(false);
    const [msgText, setMsgText] = useState('');

    const _validateOldPassword = (text) => {
        const _validateOldPass = !isEmpty(text);
        if (_validateOldPass) {
            setIsOldPassErrorVaild(true)
            setoldPassStatus({ status: true, error: '' })
        } else {
            setIsOldPassErrorVaild(false)
            setoldPassStatus({ status: true, error: constants.PLEASE_ENTER_OLD_PASSWORD })
        }
    }

    const _validateNewPassword = (text) => {
        const _validateNewPass = validatePassword(text);
        if (_validateNewPass['status']) {
            setIsNewPassErrorVaild(true);
            setnewPassStatus({ status: true, error: '' });
        } else if (isEmpty(text)) {
            setIsNewPassErrorVaild(false)
            setnewPassStatus({ status: true, error: constants.PLEASE_ENTER_NEW_PASSWORD })
        } else {
            setIsNewPassErrorVaild(false);
            setnewPassStatus({ status: true, error: constants.PASSWORD_VALIDATE });
        }
    }

    const _validateConfirmPassword = (text) => {
        if (newPass == text && !isEmpty(text)) {
            setIsConPassErrorVaild(true)
            setconPassStatus({ status: true, error: '' })
        } else if (isEmpty(text)) {
            setIsConPassErrorVaild(false)
            setconPassStatus({ status: true, error: constants.PLEASE_ENTER_CONFIRM_PASSWORD })
        } else {
            setIsConPassErrorVaild(false)
            setconPassStatus({ status: true, error: constants.MATCH_PASSWORD })
        }
    }

    const _validate = () => {
        _validateOldPassword(oldPass);
        _validateNewPassword(newPass);
        _validateConfirmPassword(conPass);

        if (isOldPassErrorVaild, isNewPassErrorVaild, isConPassErrorVaild) {
            _reset();
        }
    }

    const _onChangeText = (type) => (text) => {
        if (type === 'oldPass') {
            setoldPass(text);
            _validateOldPassword(text);
        } else if (type === 'newPass') {
            setnewPass(text);
            _validateNewPassword(text);
        } else if (type === 'confirmPass') {
            setconPass(text);
            _validateConfirmPassword(text);
        }
    }

    const _reset = async () => {
        try {
            const userId = await AsyncStorage.getItem('userid');

            dispatch(LoaderAction(true))
            let formData = new FormData()
            formData.append('userId', userId);
            formData.append('oldPassword', oldPass);
            formData.append('password', newPass);

            const response = await commonApi.changePassword(formData, dispatch)

            if (response['status']) {
                Actions.pop();
            }
            else {
                // debugger
                // alert('response.message') 
                setTimeout(() => {
                    setMsgText(response['message'])
                    setVisible(true)
                }, 200);
            }
        } catch (error) {
            alert(error);
        }
    }

    const _applyAction = () => {
        setVisible(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                style={{ zIndex: 2 }}
                title={'Change Password'}
            />
            <View style={styles.innerContainer}>
                <Image
                    style={styles.bgImageIcon}
                    resizeMode={'contain'}
                    source={assests.backLogo}
                />
                {/* <Text style={styles.headingText}>{constants.CHANGE_PASSWORD_DESC}</Text> */}

                {/* seperator */}
                {/* <View height={20} /> */}
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    showsVerticalScrollIndicator={false}
                >
                    <Input
                        focusColor={color['red']}
                        onChangeText={_onChangeText('oldPass')}
                        value={oldPass}
                        style={{ width: '98%', }}
                        blurOnSubmit={false}
                        placeholder={'Old Password'}
                        icon={assests.lock}
                        isFiledImage
                        autoCapitalize={'none'}
                        source={isOldPassErrorVaild ? assests.check : (oldPassStatus['error'] ? assests.info : '')}
                        labelTextStyle={{ fontSize: 14, marginLeft: 5 }}
                        errorMessage={oldPassStatus['error']}
                        secureTextEntry
                        isPassword={true}
                    />



                    <Input
                        focusColor={color['red']}
                        onChangeText={_onChangeText('newPass')}
                        value={newPass}
                        style={{ width: '98%', }}
                        blurOnSubmit={false}
                        placeholder={'New Password'}
                        icon={assests.lock}
                        isFiledImage
                        autoCapitalize={'none'}
                        source={isNewPassErrorVaild ? assests.check : (newPassStatus['error'] ? assests.info : '')}
                        labelTextStyle={{ fontSize: 14, marginLeft: 5 }}
                        errorMessage={newPassStatus['error']}
                        secureTextEntry
                        isPassword={true}
                    />

                    {
                        newPassStatus['error'].length > 0 &&
                        <View height={16} />
                    }

                    <Input
                        focusColor={color['red']}
                        onChangeText={_onChangeText('confirmPass')}
                        value={conPass}
                        style={{ width: '98%', }}
                        blurOnSubmit={false}
                        placeholder={'Confirm Password'}
                        icon={assests.lock}
                        isFiledImage
                        autoCapitalize={'none'}
                        source={isConPassErrorVaild ? assests.check : (conPassStatus['error'] ? assests.info : '')}
                        labelTextStyle={{ fontSize: 14, marginLeft: 5 }}
                        errorMessage={conPassStatus['error']}
                        secureTextEntry
                        isPassword={true}
                    />

                    <Button
                        title={constants.CHANGE_PASSWORD_BUTTON}
                        textStyle={styles.changeButtonText}
                        style={styles['changeButton']}
                        onPress={() => { _validate() }}
                    />
                </ScrollView>
                <Loader
                    isLoading={loader}
                />
                <PopUpScreen
                    isModalVisible={visible}
                    msgText={msgText}
                    isError={true}
                    onCloseModal={() => setVisible(false)}
                    _applyAction={() => _applyAction()}
                />
            </View>
        </SafeAreaView>
    )
}

export default ChangePassword;
