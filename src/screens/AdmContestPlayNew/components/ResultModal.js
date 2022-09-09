import React, { useEffect, useState, useMemo } from 'react';
import {
    ActivityIndicator, Image, StyleSheet,
    Text, View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

import { LoaderAction } from '../../../redux/action';
import color from '../../../utils/color';
import * as fontFamily from '../../../utils/fontFamily';
import * as commonApi from './../../../ServiceRequests/serviceContest';
import { PopUpScreen } from '../../../common/alertPop';
import { Button } from '../../../components/customComponent';
import assests from '../../../common/assests';

const ResultModal = (props) => {
    const dispatch = useDispatch();

    const [userScore, setUserScore] = useState([]);

    const [myUserId, setmyUserId] = useState("");

    const [errorMsgText, setErrorMsgText] = useState('');
    const [visiblerror, setVisibleError] = useState(false);

    useEffect(() => {
        getScore();
    }, []);

    useEffect(() => {
        // if (Object.keys(userScore).length !== 0) {
        if (userScore.length !== 0) {
            setTimeout(() => {
                props.onDoneClick();
            }, 3000);
        }
    }, [userScore]);

    const getScore = async () => {
        try {
            // dispatch(LoaderAction(true));

            // console.log("roundID ==>>> ", roundId);gameData._id
            const userId = await AsyncStorage.getItem('userid');

            // save user id for get my points
            setmyUserId(userId);

            console.log("score params => ", props.gameData._id, userId);
            const response = await commonApi.getGamePoint(props.gameData._id, dispatch);

            console.log("response change => ", JSON.stringify(response));

            if (response['status']) {
                setUserScore(response.data);
            } else {
                console.log("response change => error msg => ", response.message);

                setTimeout(() => {
                    setErrorMsgText(response.message);
                    setVisibleError(true);
                }, 1000);
            }
        } catch (error) {
            console.log("response change => error => ", error);

            setTimeout(() => {
                setErrorMsgText(error);
                setVisibleError(true);
            }, 1000);
        }
    }

    const _myScore = useMemo(() => {
        let updatedScore = "0";

        const getUserFromList = userScore.find(user => user.userId === myUserId);

        const getUserIndex = userScore.findIndex(user => user.userId === myUserId);

        if (getUserFromList !== -1) {
            updatedScore = getUserFromList?.totalScore;
        }

        if (getUserIndex === 0) {
            return `You win ${updatedScore || 0} pt`;
        }

        return `Your score is ${updatedScore || 0} pt`;
    }, [myUserId, userScore]);

    const _userDataRender = (user, index) => {
        return (
            <View
                style={styles.scoreUserContainer}
                key={user?.userId}
            >
                <Text style={[styles.leaderBoardNumber]}>
                    {index + 1}
                </Text>

                <View width={10} />

                <View style={styles.scoreUserRightContainer}>
                    <Image
                        source={user?.profile_picture ? { uri: user?.profile_picture } : assests.vCallPlaceholder}
                        style={styles.renderListImage}
                        defaultSource={assests.vCallPlaceholder}
                    />

                    <View width={18} />

                    <View style={{ flex: 1 }}>
                        <Text style={styles.userName} numberOfLines={2}>{user?.userName || ""}</Text>
                        <Text style={styles.userBoxScore} numberOfLines={2}>{user.totalScore || "0"} pt</Text>
                    </View>
                </View>
            </View>
        );
    }

    const _goToDashboard = async () => {
        await props.deleteRoom();
    }


    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                {
                    // Object.keys(userScore).length !== 0
                    userScore.length !== 0
                        ?
                        <>
                            <Image
                                source={assests.cup}
                                style={styles.cupImage}
                            />

                            {/* seperator */}
                            <View height={20} />

                            <Text style={styles.scoreText}>
                                {
                                    props.isLastRound ? "Contest completed " : "Round completed"
                                }
                            </Text>
                            <Text style={styles.scoreText}>{_myScore}</Text>
                            <Text style={styles.roundName}>{props.roundDetail.title} Score</Text>

                            {/* seperator */}
                            <View height={20} />

                            {userScore.map(_userDataRender)}
                        </>
                        :
                        <ActivityIndicator />
                }
            </View>

            {
                props.isLastRound &&
                <>
                    <Button
                        title={'Go to Dashboard'}
                        textStyle={{
                            fontSize: 17,
                            color: '#22343C',
                            letterSpacing: 3.09,
                            fontFamily: appConstants.fontBold
                        }}
                        style={styles['dashboardButton']}
                        onPress={() => _goToDashboard()}
                    />

                    {/* <Button
                        title={'Go to Leaderboard'}
                        textStyle={{
                            fontSize: 17,
                            color: '#22343C',
                            letterSpacing: 3.09,
                            fontFamily: appConstants.fontBold
                        }}
                        style={styles['leaderBoardButton']}
                        onPress={() => Actions.leaderBoard({ comeFrom: 'game' })}
                    /> */}
                </>
            }
        </View>
    )
}


export default ResultModal;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        justifyContent: "center",
        flex: 1,
    },
    topContainer: {
        backgroundColor: color.subBordorColor,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    cupImage: {
        height: 60,
        width: 60,
    },
    scoreText: {
        color: color.goldenColor,
        fontSize: 28,
        fontFamily: fontFamily.avenirBold,
    },
    roundName: {
        color: color.textLightGray,
        fontSize: 20,
    },
    dashboardButton: {
        marginTop: 30,
        backgroundColor: color.buttonColor1,
        // marginHorizontal: 4,
    },
    leaderBoardButton: {
        marginTop: 20,
        backgroundColor: color.goldenColor,
        // marginHorizontal: 4,
    },
    scoreUserContainer: {
        borderWidth: 1.2,
        borderRadius: 6,
        paddingHorizontal: 18,
        paddingVertical: 12,
        marginTop: 18,
        marginHorizontal: 18,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.hangmanColor,
    },
    renderListImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    scoreUserRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    userName: {
        fontFamily: fontFamily.avenirSemiBold,
        fontSize: 20,
        color: color.hangmanColor,
        flex: 1
    },
    userBoxScore: {
        fontFamily: fontFamily.avenirMedium,
        fontSize: 18,
        color: color.hangmanColor,
        flex: 1
    },
    leaderBoardNumber: {
        width: "12%",
        fontFamily: fontFamily.avenirSemiBold,
        fontSize: 32,
        color: color.hangmanColor,
        textAlign: 'center',
    },
});
