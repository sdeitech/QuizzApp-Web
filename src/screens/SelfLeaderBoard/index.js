import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, ScrollView, Image, FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import assests from '../../common/assests';
import * as commonApi from '../../ServiceRequests/serviceContest';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import color from './../../utils/color';
import constants from './../../utils/appConstants';
import { LoaderAction } from '../../redux/action';

const SelfLeaderBoard = (props) => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.authReducer.loader);

    const [userInfo, setuserInfo] = useState({});

    const [data, setdata] = useState([]);

    const [pageNo, setpageNo] = useState(1);

    const [apiProcess, setapiProcess] = useState(false);

    useEffect(() => {
        fetchMyAPI();
        console.log("page number pagination =>", pageNo);
    }, [pageNo]);

    const fetchMyAPI = async () => {
        try {
            setapiProcess(true);

            if (apiProcess) return;

            const userId = await AsyncStorage.getItem('userid');
            // console.log("user id => ", data);

            if (pageNo === 1) dispatch(LoaderAction(true));

            // console.log("user id => ", data);
            const response = await commonApi.leaderboardGetAPI(userId, pageNo, dispatch);
            // dispatch(LoaderAction(false))

            console.log("leaderboard data => ", JSON.stringify(response));

            if (response['status']) {
                setuserInfo(response?.data?.userInfo);

                if (response.data.leaderBoard.length > 0) {
                    // setdata([...data, ...response.data.leaderBoard]);

                    if (pageNo === 1) {
                        setdata(response.data.leaderBoard);
                    } else {
                        setdata([...data, ...response.data.leaderBoard]);
                    }


                    // setInterval(() => {
                    //     setpageNo(prev => prev + 1);
                    // }, 1000);
                }
            }
        } catch (error) {
            alert(error);
        } finally {
            setapiProcess(false);
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 1:
                return assests.online;
            case 2:
                return assests.away;
            case 3:
                return assests.donotdisturb;
            default:
                return assests.invisible;
        }
    }

    const _renderItems = (item, index) => {
        return (
            <View key={item._id} style={[styles.renderItemView]}>
                <Text style={[styles.leaderBoardNumber]}>
                    {index + 1}
                </Text>

                {/* <View width={2} />

                <Image
                    style={[styles.upArrowIcon, { tintColor: item.isUp ? undefined : color.arrowColor }]}
                    source={assests.upperArrow}
                /> */}

                <View width={16} />

                <View style={styles.renderTextContainer}>
                    <Image
                        style={styles.renderListImage}
                        source={item.image ? { uri: item.image } : assests.vCallPlaceholder}
                        defaultSource={assests.vCallPlaceholder}
                    />

                    <View width={18} />

                    <View>
                        <Text style={[styles.renderName]}>{item.name}</Text>
                        {/* <Text style={[styles.renderUsername]}>{item.username}</Text> */}
                        <Text style={[styles.renderPoints]}>{item?.currentScore} pt</Text>
                    </View>
                </View>
            </View>
        );
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const emptyListView = () => {
        return (
            <Text style={styles.emptyViewLabel}>{!loader ? 'No data found' : ''}</Text>
        );
    }

    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={color.statusBar}
                barStyle="light-content"
            />
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Leaderboard'}
            />
            <View style={styles.innerContainer}>
                {
                    !loader &&
                    <ScrollView
                        style={styles.parentScrollView}
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                
                                // setpageNo(prev => prev + 1);
                            }
                        }}
                        scrollEventThrottle={400}
                    >

                        {/* upper container */}
                        <View style={styles.topContainer}>

                            {/* upper container profile image */}
                            <View style={styles.profileImageContainer}>
                                <Image
                                    style={styles.profileImage}
                                    source={props?.profileImage ? { uri: props?.profileImage } : assests.vCallPlaceholder}
                                />
                                <View style={styles.profileRightBottomContainer}>

                                    <Image
                                        source={getStatusIcon(props.userstatus)}
                                        style={styles.profileRightBottom}
                                        resizeMode="stretch"
                                    />
                                </View>
                            </View>

                            {/* upper container information list */}
                            <View style={styles.profileInfoScreen}>
                                <Image
                                    source={assests.cup}
                                    style={styles.cupImage}
                                />

                                <View width={28} />

                                <View style={styles.profileInfoRight}>
                                    <Text
                                        style={styles.currentRankText}
                                    >
                                        {constants.CURRENT_RANK}:
                                        <Text style={styles.currentRankTextScore}> {userInfo?.rank || 0}</Text>
                                    </Text>

                                    <View style={styles.profileInfoRightPointsContain}>
                                        <Text style={styles.profileInfoRightPointsLight}>{constants.SCORE}</Text>
                                        <Text style={styles.profileInfoRightPoints}>
                                            {userInfo?.currentScore || 0}
                                            <Text style={styles.profileInfoRightPointsLight}>{' '}pt</Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.bottomList}>
                            {
                                data.length > 0
                                    ?
                                    <>
                                        <Text style={styles.topRankText}>{constants.TOP_RANKS}</Text>

                                        <FlatList
                                            data={data}
                                            renderItem={({ item, index }) => _renderItems(item, index)}
                                            onEndReached={() => pageNo < 3 && setpageNo(prev => prev + 1)}
                                            onEndReachedThreshold={0.3}
                                        />
                                        {apiProcess && <Text style={styles.loadingText}>{constants.LOADING}</Text>}
                                    </>
                                    :
                                    emptyListView()
                            }
                        </View>
                    </ScrollView>
                }
            </View>
        </SafeAreaView>
    )
}

export default SelfLeaderBoard;
