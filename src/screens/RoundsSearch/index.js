import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import assests from '../../common/assests';
import styles from './styles';
import MaineHeader from '../../common/headerSearch';
import RoundList from './components/RoundList';
import * as commonApi from './../../ServiceRequests/serviceContest';
import { LoaderAction } from '../../redux/action';

const RoundSearch = ({ gameType = "" }) => {
    const dispatch = useDispatch();

    const loader = useSelector(state => state.authReducer.loader);

    const [search, setsearch] = useState('');
    const [roundData, setroundData] = useState([]);

    const [pageno, setpageno] = useState(1);

    useEffect(() => {
        getRoundList();
    }, [pageno]);

    const getRoundList = async (searchKey) => {
        try {
            dispatch(LoaderAction(true));

            const response = await commonApi.getRoundDetailsSearch({ gameType, pageno, dispatch, searchKey });
            console.log("response of round search api => ", JSON.stringify(response));

            if (response['status']) {
                if (pageno === 1) {
                    setroundData(response.data);
                } else {
                    setroundData(prev => [...prev, ...response.data]);
                }
            } else {
            }
        } catch (error) {
            // alert(error);
        } finally {
            dispatch(LoaderAction(false));
        }
    }

    const _onSearchEnter = () => {
        getRoundList(search);
    }

    const _onSearchClose = () => {
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />
            {/* <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Rounds'}
            /> */}
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Rounds'}
                subTitle={`Search Rounds`}
                onChangeText={(text) => setsearch(text)}
                onSubmit={() => _onSearchEnter()}
                handleCloseClick={() => _onSearchClose()}
                search={search}
            />

            <View style={styles.innerContainer}>
                <RoundList
                    data={roundData}
                    // retrieveMore={() => setpageno(prev => prev + 1)}
                    loader={loader}
                />
            </View>
        </SafeAreaView>
    )
}

export default RoundSearch;
