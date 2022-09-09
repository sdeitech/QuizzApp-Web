import React, { useState } from 'react';
import {
    SafeAreaView, StatusBar, View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch } from 'react-redux';

import assests from '../../common/assests';
import { getLoginToken } from '../../utils/session';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import ScoringList from './components/ScoringList';
import { useEffect } from 'react/cjs/react.development';
import * as commonApi from '../../ServiceRequests/serviceContest';
import axios from 'axios';

const GiveScore = (props) => {
    const [usersData, setusersData] = useState([]);
    const [formData, setFormData] = useState([]);

    const dispatch = useDispatch();
    const _onSelectPoint = (point, userIndex) => {
        const userList = [...usersData];
        userList[userIndex].score = point;
        userList[userIndex].gameId = props.gameId;
        userList[userIndex].selectedPoint = point;
        setusersData(userList);
        console.log(userList,'check the game')
        setFormData(userList);
    };

    useEffect(()=>{
        fetchMyAPI()
    },[])

    const fetchMyAPI = async () => {
        try {
            const response = await commonApi.activeMember(props.roomId, dispatch, props.gameId);
            // dispatch(LoaderAction(false))

            console.log("Active Member data => ", JSON.stringify(response));

            if (response['status']) {
            //     setuserInfo(response?.data?.userInfo);
                    setusersData(response.data)
            //     if (response.data.leaderBoard.length > 0) {
            //         // setdata([...data, ...response.data.leaderBoard]);

            //         if (pageNo === 1) {
            //             setdata(response.data.leaderBoard);
            //         } else {
            //             setdata([...data, ...response.data.leaderBoard]);
            //         }


            //         // setInterval(() => {
            //         //     setpageNo(prev => prev + 1);
            //         // }, 1000);
            //     }
            }
        } catch (error) {
            alert(error);
        } finally {
            // setapiProcess(false);
        }
    }

    const submitScore = async () => {
            console.log(formData,'formData')
        try {

            const url = `https://dev-api.murabbo.com/api/app/game/blankRoundScore`;
            let tokenStr = await getLoginToken()

            axios.post(url, JSON.parse(JSON.stringify(formData)),
            { headers: {"Authorization" : `Bearer ${tokenStr}`} })
            .then((res) => {
                console.log("Score Submitted data => ", JSON.stringify(res))
                Actions.pop()
            })
            .catch(function (error) {
              console.log('error my catch for score submission', error);
            });
            // console.log("Score Submitted data => ", JSON.stringify(response));

            // if (response['status']) {
            //         // setusersData(response.data)
            //         Actions.pop()
            // }
        } catch (error) {
            alert(error);
        } finally {
            // setapiProcess(false);
        }
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
                title={'Give Score'}
            />

            {/* main body */}
            <View style={styles.innerContainer}>
                <ScoringList
                    data={usersData}
                    isGiveScoreScreen={Actions.currentScene=='giveScore'}
                    onSelect={(point, userIndex) => _onSelectPoint(point, userIndex)}
                    onSubmit={() => submitScore}
                />
            </View>
        </SafeAreaView>
    )
}

export default GiveScore;
