import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    Image,
    View,
    StatusBar,
    Text
}
    from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './styles';
import assests from '../../common/assests';


import { SafeAreaView } from 'react-native-safe-area-context';
function OtpSuccess() {
    useEffect(() => {
        setTimeout(() => {
            Actions.Tabs()
        }, 2000);
    },[])
  
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#68C1D2' }}>
                <StatusBar backgroundColor={'transparent'} hidden={false} />
                <View style={{ alignItems: 'center', marginTop: 10,justifyContent:'center',flex:1,marginHorizontal:30 }}>
                    <Image  resizeMode={'contain'} source={assests.checkmark} />
                    <Text style={styles['smallText']}>Congratulations! </Text>
                    <Text style={styles['smallOtp']}>Your password has been changed successfully.</Text>
                </View>
            </SafeAreaView>
        </>
    );
}
export default OtpSuccess

