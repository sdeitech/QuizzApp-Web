import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    Image, View, FlatList,
    StatusBar, SafeAreaView, Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from './styles';
import colors from '../../utils/color';
import * as commonApi from '../../ServiceRequests/serviceContest';

import MaineHeader from '../../common/headerWithText';
import { LoaderAction } from '../../redux/action';
import assests from '../../common/assests';

function GameHistory(props) {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.authReducer.loader);

    const [pageNo, setpageNo] = useState(0);
    const [historyData, sethistoryData] = useState([]);

    useEffect(() => {
        fetchMyAPI();
    }, [pageNo]);

    const fetchMyAPI = async () => {
        try {
            const userId = await AsyncStorage.getItem('userid');
            // console.log("user id => ", data);

            dispatch(LoaderAction(true));

            const response = await commonApi.getContestHistoryAPI(userId, dispatch);

            console.log("history data response => ", response);

            if (response['status']) {
                sethistoryData(response.data);
            } else {
            }
        } catch (error) {
        }
    }

    // const _renderItem = (item) => {
    //     return (
    //         <View style={styles.renderItem}>
    //             <Image
    //                 source={item?.gameInfo?.contestImage ? { uri: item?.gameInfo?.contestImage } : assests.tempProfile}
    //                 style={styles.renderItemImage}
    //             />

    //             <View width={20} />

    //             <View style={styles.rightContainer}>
    //                 <Text style={styles.renderText}>Name: {item.gameInfo.contestName}</Text>

    //                 <View height={10} />

    //                 <Text style={styles.renderText}>Score: {item.gameInfo.totalScore}</Text>
    //             </View>
    //         </View>
    //     );
    // }

    const _renderItem = (item, index) => {
        return (
            <View
                style={[
                    styles.boxContainer,
                    {
                        marginLeft: (index) % 2 ? "8%" : undefined,
                    }
                ]}
            >
                <View style={[styles.innerBox, { borderColor: '#68C1D2', height: '100%' }]}>
                    <Image
                        source={item?.gameInfo?.contestImage ? { uri: item?.gameInfo?.contestImage } : assests.tempProfile}
                        style={styles.boxImage}
                    />

                    <View style={{ width: "100%", marginVertical: 8 }}>
                        <Text
                            style={[styles.questionText, { color: '#68C1D2' }]}
                            numberOfLines={1}
                        >
                            {item?.gameInfo?.contestName}
                        </Text>

                        <Text numberOfLines={2} style={styles.gamename}>Point: {item?.gameInfo?.totalScore}</Text>
                    </View>
                </View>
            </View>
        );
    }

    const emptyListView = () => {
        return (
            <Text style={styles.emptyViewLabel}>{!loader ? 'No data found' : ''}</Text>
        );
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: '#324B55' }]}>

            <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Game History'}
            />

            <View style={{ backgroundColor: '#22343C', flex: 1 }}>
                {

                }
                <FlatList
                    data={historyData}
                    renderItem={({ item, index }) => _renderItem(item, index)}
                    numColumns={2}
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, index) => (index.toString())}
                    ListEmptyComponent={emptyListView}
                />
            </View>
        </SafeAreaView>

    )
}

export default GameHistory;