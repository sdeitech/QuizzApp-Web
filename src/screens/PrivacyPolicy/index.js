import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    SafeAreaView
} from 'react-native';
import axios from 'axios';
// redux Action 

import appConstants from '../../common/appConstants';
import styles from './styles'
import MaineHeader from '../../common/headerWithText';
import { WebView } from 'react-native-webview'

function PrivacyPolicy(props) {

    const [htmlData, setResponse] = useState();

    // const webViewUrl = () => {
    //     // let displayUrl = 'https://dev-api.murabbo.com/api/app/cms/cms?cmsCode=TERMS_CONDITION';
    //     if (props.isPolicy) {
    //         displayUrl = 'https://dev-api.murabbo.com/api/uploads/assets/PRIVACY_POLICY.html'; 
    //     }else{
    //         displayUrl = 'https://dev-api.murabbo.com/api/app/cms/cms?cmsCode=TERMS_CONDITION';
    //     }
    //     return displayUrl;
    // }

    const privacyLink = 'https://dev-api.murabbo.com/api/app/cms/cms?cmsCode=PRIVACY_POLICY';
    const termsLink = 'https://dev-api.murabbo.com/api/app/cms/cms?cmsCode=TERMS_CONDITION';
    useEffect(() => {
        axios.get(props.isPolicy?privacyLink:termsLink)
            .then((response) => {
                setResponse('<div style="color: white">'+response.data.data.description+ '</div>')
            })
            .catch(function (error) {
              console.log('error catch', error);
            });
    },[])

    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar
                backgroundColor={appConstants.AppTheamColor}
                barStyle="dark-content"
            /> */}
            <View style={styles.container}>
                <MaineHeader
                    isBack
                    subHeaderTextS={{ color: '#fff' }}
                    title={props.isPolicy ? 'Privacy Policy' : 'Terms & Condition'}
                />
                {/* <View style={{ flex: 1, backgroundColor: '#fff' }}> */}
                    <WebView
                        originWhitelist={['*']}
                        
                        source={{ html: htmlData }}
                        style={{
                            backgroundColor: '#22343C',
                            color:'white'
                          }}
                        // startInLoadingState
                        androidHardwareAccelerationDisabled={true}
                    />
                {/* </View> */}
            </View>
        </SafeAreaView>
    );
}
export default PrivacyPolicy;

