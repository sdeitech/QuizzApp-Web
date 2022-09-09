import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    SafeAreaView
} from 'react-native';
// redux Action 

import appConstants from '../../common/appConstants';
import styles from './styles'
import { Actions } from 'react-native-router-flux';
import MaineHeader from '../../common/mainHeader'
import { useSelector, useDispatch } from 'react-redux'
import { WebView } from 'react-native-webview'
import { termsConditions, ClearAction } from "../../actions/authAction";

function PrivacyPolicy() {
    const userData = useSelector(state => state.auth.userData)
    const status = useSelector(state => state.auth.status)
    const loader = useSelector(state => state.auth.loader)
    let err_Message = useSelector(state =>state.auth.err_Message)
    let termsData = useSelector(state =>state.auth.termsData)

    const action = useDispatch()
    const toastRef = useRef();
    const clearAction = () => action(ClearAction())
    const getprivacy = (data) => action(termsConditions(data))
    useEffect(()=>{
        getprivacy('TERMS_CONDITION')
    },[]);

    useEffect(()=>{
        if (Actions.currentScene == "termsCondtions"){
         if (status == 'TERMS_DATA') {
             let data = termsData
             // debugger
                 clearAction();
            }
            else  if (status == 'TERMS_DATA_FAILURE') {
                clearAction();
           }
        }
    });
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={appConstants.AppTheamColor}
                barStyle="dark-content"
            />
            <View style={styles.container}>
                <MaineHeader
                    style={{ backgroundColor: appConstants.AppTheamColor }}
                    backButton
                    textInput={'Terms and conditions'}
                    subHeaderTextS={{ color: '#fff' }}
                />
                <View style = {{flex:1,backgroundColor:'#fff'}}>
                    {termsData ?
                <WebView
                    originWhitelist={['*']}
                    style = {{margin:20}}
                    source={{html:termsData.body}}
                    androidHardwareAccelerationDisabled={true}
                />
                :
                null
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}
export default PrivacyPolicy;

