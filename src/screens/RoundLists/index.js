import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import * as commonApi from './../../ServiceRequests/serviceContest'
// import assests from '../../common/assests';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
// import RoundListData from './components/RoundListData';
import { LoaderAction } from '../../redux/action';
import RoundInfoScreen from './components/RoundInfoScreen';
import { Alert, PopUpScreen } from '../../common/alertPop';

const RoundList = (props) => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.authReducer.loader);

    const [roundData, setroundData] = useState([]);

    const [pageNo, setpageNo] = useState(0);

    const [currentRound, setcurrentRound] = useState(0);

    const [errorMsgText, setErrorMsgText] = useState('');
    const [visiblerror, setVisibleError] = useState(false);

    const [exitDialogShow, setexitDialogShow] = useState(false);

    useEffect(() => {
        // alert();
        getRoundList();
    }, [pageNo]);

    const getRoundList = async () => {
        try {
            dispatch(LoaderAction(true))
            const response = await commonApi.getRoundList(dispatch, pageNo, props.contestInfo._id);
            console.log("arrData====", JSON.stringify(response));

            if (response['status']) {
                const properData = response?.data.filter((item) => item.title);

                console.log("proper filtered data => ", JSON.stringify(properData));

                setroundData(properData);
            }
            else {
                setTimeout(() => {
                    setErrorMsgText(response.message);
                    setVisibleError(true);
                }, 1000);
            }
        } catch (error) {
            alert(error);
            setTimeout(() => {
                setErrorMsgText(error);
                setVisibleError(true);
            }, 1000);
        }
    }

    const _createGame = async (roundId, contestId) => {
        try {
            // dispatch(LoaderAction(true))

            const data = await AsyncStorage.getItem('userid');
            console.log("create game detail => ", data, roundId, contestId);

            const formData = {
                "contestId": contestId,
                "roundId": roundId,
                "createdBy": data,
            };

            console.log("my form data => ", JSON.stringify(formData));

            const response = await commonApi.createGame(formData, dispatch);

            if (response['status']) {
                console.log("proper filtered data => ", JSON.stringify(response?.data));

                return response?.data;
            }
            else {
                throw response.message;
                // setTimeout(() => {
                //     setErrorMsgText(response.message);
                //     setVisibleError(true);
                // }, 1000);
            }
        } catch (error) {
            throw error;
            // setTimeout(() => {
            //     setErrorMsgText(error);
            //     setVisibleError(true);
            // }, 1000);
        }
    }

    const _onRoundClick = async () => {
        try {
            const { _id, title, gameType } = roundData[currentRound];
            const roundObject = {
                gameType,
                roundName: title,
                roundId: _id,
            };

            const gameData = await _createGame(_id, props.contestInfo._id);

            // Actions.admContestPlay({
            //     contestInfo: { ...props.contestInfo, ...roundObject },
            //     gameData,
            // });
            Actions.admContestPlayNew({
                contestInfo: { ...props.contestInfo, ...roundObject },
                gameData,
            });
        } catch (error) {
            setTimeout(() => {
                setErrorMsgText(error);
                setVisibleError(true);
            }, 1000);
        }
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
                // isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Rounds'}
            />

            <View style={styles.innerContainer}>
                {
                    (loader && roundData.length === 0)
                        ?
                        emptyListView()
                        :
                        <RoundInfoScreen
                            item={{ ...roundData[currentRound] }}
                            onPlayClick={() => _onRoundClick()}
                            onEndClick={() => setexitDialogShow(true)}
                        />
                    // <RoundListData
                    //     data={roundData}
                    //     onEndReached={() => setpageNo(prev => prev + 1)}
                    //     contestInfo={{ ...props.contestInfo }}
                    // />
                }
            </View>

            <PopUpScreen
                isModalVisible={visiblerror}
                msgText={errorMsgText}
                isError={true}
                onCloseModal={() => setVisibleError(false)}
                _applyAction={() => setVisibleError(false)}
            />

            <Alert
                // title={'Are you sure!'}
                heading={'Are you sure, you want to leave?'}
                isModalVisible={exitDialogShow}
                buttonTitle={'Leave'}
                cancleTitle={'Cancel'}
                onCancel={() => { setexitDialogShow(false) }}
                logout={() => { Actions.reset("Tabs") }}
            />
        </SafeAreaView>
    )
}

export default RoundList;
