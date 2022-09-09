import React, { useState, useEffect } from 'react';
import {
    Image, View, StatusBar,
    Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from './styles';
// Redux lib
import assests from '../../common/assests';
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../components/helper';
import localKey from '../../utils/localStorageKey'
import * as url from '../../utils/serviceConstants'
import color from '../../utils/color';

function Splash() {
    const [isLoading, setLoading] = useState(true)
    const [loginToken, setToken] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            const fetchLocal = async () => {
                // debugger
                const newToken = await getData(localKey['LOGIN_TOKEN'])
                console.log('newToken::', newToken);
                url.header['Authorization'] = `Bearer ${newToken}`
                if (newToken != null || newToken != undefined) {
                    setToken(newToken)

                    const fcmToken = await AsyncStorage.getItem('FCMToken');
                    console.log("token :: splash :: ", fcmToken);
                    if (!fcmToken) {
                        await _sendDeviceInfo();
                    }

                    Actions.Tabs()
                }
                else {
                    const isInitial = await AsyncStorage.getItem('isInitial');
                    if (isInitial) {
                        Actions.loginscreen();
                    } else {
                        Actions.walkthrough();
                    }
                }
            }
            fetchLocal()
        }, 3000);
    }, [])

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

    // }, [loginToken, isLoading])
    if (isLoading) {
        return (
            <View style={styles.img_container}>
                <StatusBar translucent backgroundColor={color.statusBar} barStyle="light-content" />
                <Image
                    resizeMode='cover'
                    source={assests.bgSplash}
                    style={styles.splash}
                />
                <View style={styles.logo}>
                    <Image
                        resizeMode='contain'
                        source={assests.logoSplash}
                    />
                </View>
            </View>
        )
    }
    return (
        <View style={styles.img_container}>
            <StatusBar translucent backgroundColor={color.statusBar} barStyle="light-content" />
            <Image
                resizeMode='cover'
                source={assests.bgSplash}
                style={styles.splash}
            />
            <View style={styles.logo}>
                <Image
                    resizeMode='contain'
                    source={assests.logoSplash}
                />
            </View>
        </View>
    );
}
export default Splash;