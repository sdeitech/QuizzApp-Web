import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';

import assests from '../../common/assests';
import * as commonApi from '../../ServiceRequests/serviceContest';
import * as actionType from '../../redux/action';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import DataList from './components/DataList';
import { Loader } from '../../components/customComponent';
import { PopUpScreen } from '../../common/alertPop';
import { Actions } from 'react-native-router-flux';

// 0 = invite
// 1 = reward
const tempNotifData = [];

const Notifications = () => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.authReducer.loader);

    const [data, setdata] = useState(tempNotifData);
    const [errorMsgText, setErrorMsgText] = useState('');
    const [visiblerror, setVisibleError] = useState(false);

    useEffect(() => {
        getNotificationData();
    }, []);

    const getNotificationData = async () => {
        try {
            const userid = await AsyncStorage.getItem('userid');

            dispatch(actionType.LoaderAction(true));

            // console.log("user id => ", data);
            const response = await commonApi.getNotifications(userid, dispatch);
            // dispatch(LoaderAction(false))
            console.log("data of my notifications => ", JSON.stringify(response));

            if (response['status']) {
                dispatch(actionType.setNotificationsList(response.data))
                setdata(response.data);
            } else {
                // alert(response.message);
                setErrorMsgText(response['message'])
                setVisibleError(true)
            }
        } catch (error) {
            setErrorMsgText(error)
            setVisibleError(true)
        }
    }

    const headerRight = () => {
        return (
            <TouchableOpacity onPress={() => { }} style={[styles.crossLogo]}>
                <Image source={assests.dot} />
            </TouchableOpacity>
        );
    }

    const emptyListView = () => {
        return (
            <Text style={styles.emptyViewLabel}>{!loader ? 'No data found' : ''}</Text>
        );
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
                style={{ zIndex: 1 }}
                title={'Notifications'}
                // right={headerRight()}
            />
            <View style={styles.innerContainer}>
                <Image
                    style={styles.bgImageIcon}
                    resizeMode={'contain'}
                    source={assests.backLogo}
                />

                {
                    !loader && data.length > 0
                        ?
                        <DataList
                            data={data}
                        />
                        :
                        emptyListView()
                }

                <Loader isLoading={loader} />

                <PopUpScreen
                    isModalVisible={visiblerror}
                    msgText={errorMsgText}
                    isError={true}
                    onCloseModal={() => setVisibleError(false)}
                    _applyAction={() => setVisibleError(false)}
                />
            </View>
        </SafeAreaView>
    )
}

export default Notifications;
