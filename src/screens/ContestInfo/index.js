import React, { useEffect, useState } from 'react';
import {
    StatusBar, SafeAreaView, Image,
    Text, View, ScrollView,
    TouchableOpacity, DeviceEventEmitter,
    Alert as RnAlert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';

import MaineHeader from '../../common/headerWithText';
import styles from './styles';
import assests from '../../common/assests';
import { LoaderAction, setPlayRoundList, setCurrentRound } from '../../redux/action';
import * as commonApi from '../../ServiceRequests/serviceContest';
import { Button } from '../../components/customComponent';
import { Alert, PopUpScreen, SetPasswordAlert, PickAndPlayAlert } from '../../common/alertPop';
import constrants from '../../utils/appConstants';
import isUserAuthorizedItem from '../../utils/helpers/isUserAuthorizedItem';
import appConstants from '../../utils/appConstants';
import { _flushPlayedGameData } from '../../redux/action/gameActions';
import { _flushVideoStoreData } from '../../redux/action/videoActions';

const ContestInfo = (props) => {
    const [isCurrentUserCreated, setisCurrentUserCreated] = useState(false);
    const [showOption, setshowOption] = useState(false);

    const [visible, setVisible] = useState(false);
    const [errorMsgText, setErrorMsgText] = useState('');

    const [isDeleteDialog, setisDeleteDialog] = useState(false);
    const [isPublishDialog, setisPublishDialog] = useState(false);
    const [isPasswordDialog, setisPasswordDialog] = useState(false);
    const [pickAndPlayDialog, setpickAndPlayDialog] = useState(false);

    // subscription alert dialog
    const [subscriptionAlert, setsubscriptionAlert] = useState(false);

    const dispatch = useDispatch();

    const headerTitle = props.isRound ? `Round` : `Contest`;

    useEffect(() => {
        console.log("get all contest info => ", JSON.stringify(props.contestInfo));
        userChecking();

        // flush old game data
        dispatch(_flushPlayedGameData());
        dispatch(_flushVideoStoreData());
    }, []);

    const userChecking = async () => {
        const data = await AsyncStorage.getItem('userid');
        if (data === props.contestInfo.createdBy) setisCurrentUserCreated(true);
    };

    const onDetailClick = async () => {
        await AsyncStorage.setItem("categoryid", props.contestInfo._id);
        Actions.roundTryScreen();
    }

    const hideEditPopup = () => {
        setshowOption(false);
    }

    const onEditClick = () => {
        console.log("contestinfo param => ", JSON.stringify(props.contestInfo));
        setshowOption(false);
        Actions.push("createScreen", { createScreen: props.contestInfo });
    }

    const onPublishClick = async () => {
        setshowOption(false);
        setisPublishDialog(false);
        dispatch(LoaderAction(true))
        const response = await commonApi.publishContestAPI(dispatch, props.contestInfo._id);
        if (response['status']) {
            // alert(item._id);
            if (props.fromMyGames) {
                DeviceEventEmitter.emit('MyGameList');

                setTimeout(() => {
                    Actions.popTo("mygames");
                });
            } else {

                Actions.reset("Tabs");
            }
            // Actions.pop();
            // Actions.pop();
        } else {
            setTimeout(() => {
                setErrorMsgText(response['message']);
                setVisible(true)
            }, 1000);
        }
    }

    const onRemoveClick = async () => {
        setshowOption(false);
        setisDeleteDialog(false);
        dispatch(LoaderAction(true))
        dispatch(LoaderAction(false))
        const response = await commonApi.deleteContestDetailsAPI({}, dispatch, props.contestInfo._id);
        if (response['status']) {
            if (props.fromMyGames) {
                DeviceEventEmitter.emit('MyGameList');
                setTimeout(() => {
                    Actions.popTo("mygames");
                }, 800);
            } else {
                Actions.popTo("Tabs");
            }
        }
    }


    const _applyAction = () => {
        setVisible(false),
            errorMsgText ? null : Actions.pop()
    }

    const headerRight = () => {
        return (
            <TouchableOpacity onPress={() => onEditClick()} style={[styles.headerRightContainer]}>
                <Image source={assests.edit} />
            </TouchableOpacity>
        );
    }

    const handleDeleteContestData = () => {
        setshowOption(false);
        setisDeleteDialog(true);
    }

    const handleUpdateContestData = () => {
        setshowOption(false);
        setisPublishDialog(true);
    }

    const _onPasswordDonePress = async (displayName, password) => {
        const userId = await AsyncStorage.getItem('userid');
        const { _id } = props.contestInfo;

        setisPasswordDialog(false);

        const formData = new FormData();

        formData.append('contestId', _id);
        formData.append('displayName', displayName);
        formData.append('password', password);
        formData.append('createdBy', userId);

        const response = await commonApi.roomCreate(formData, dispatch);

        console.log("room create data response::", JSON.stringify(response.data.jsonData.data));

        if (response['status']) {
            Actions.contestEnter({
                contestInfo: {
                    ...props.contestInfo,
                    response: response.data.jsonData.data,
                    password,
                },
                isModerator: true
            });
        } else {
            setTimeout(() => {
                setErrorMsgText(response['message']);
                setVisible(true)
            }, 1000);
        }
    }

    const onPlayClick = () => {
        if (props.contestInfo.playerType === 1) {
            if (isUserAuthorizedItem(props?.contestInfo?.subscriptionType)) {
                _getRoundList();
            } else {
                setsubscriptionAlert(true);
            }
        } else {
            console.log('33333333333333333333333')
            setpickAndPlayDialog(true);
        }
    }

    const _onMultiplayerPlayClick = () => {
        try {
            if (isUserAuthorizedItem(props?.contestInfo?.subscriptionType)) {
                console.log('444444444444444444444')
                setpickAndPlayDialog(false);
                Actions.roomListing({ contestId: props.contestInfo._id });

            } else {
                console.log('55555555555555555')
                setpickAndPlayDialog(false);
                setTimeout(() => {
                    setsubscriptionAlert(true);
                }, 1000);
            }
        } catch (error) {
            console.log('66666666666666666')
            alert(error);
        }
    }


    const _createGame = async (roundId = "", contestId = "") => {
        try {
            // dispatch(LoaderAction(true))

            const data = await AsyncStorage.getItem('userid');
            console.log("create game detail => ", data, roundId, contestId);

            const formData = {
                "contestId": contestId,
                "roundId": roundId,
                "createdBy": data
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

    const _getRoundList = async () => {
        try {
            dispatch(LoaderAction(true));
            const response = await commonApi.getRoundList(dispatch, 0, props.contestInfo._id);
            console.log("arrData====", JSON.stringify(response));

            if (response['status']) {
                const properData = response?.data.filter((item) => item.title);

                // dispatch(setCurrentRound(0));
                dispatch(setPlayRoundList(properData));
                dispatch(LoaderAction(true));

                const gameData = await _createGame("", props.contestInfo._id);

                Actions.admContestPlayNew({ contestInfo: { ...props.contestInfo }, gameData });
            }
            else {
                setTimeout(() => {
                    setErrorMsgText(response.message);
                    setVisible(true);
                }, 1000);
            }
        } catch (error) {
            setTimeout(() => {
                setErrorMsgText(error);
                setVisible(true);
            }, 1000);
        }
    }

    const _itemCountNumber = () => {
        const numVariable = props?.isRound ? "numberOfQuestions" : "totalRound";
        const singular = props?.contestInfo[numVariable] > 1
        // alert(singular)
        return `${props?.contestInfo[numVariable] || 0} ${props?.isRound ? singular?"Questions":"Question" : singular?"Rounds":"Round"}`
    }

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: '#324B55' }]}
            onStartShouldSetResponder={evt => {
                evt.persist();
                hideEditPopup()
            }}
        >
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />

            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={`${headerTitle} Detail`}
                right={isCurrentUserCreated && !props.contestInfo.isPublish ? headerRight() : undefined}
            />

            <ScrollView style={styles.parentScrollView}>
                <View style={styles.upperView}>
                    <Image
                        source={
                            props.contestInfo.image
                                ?
                                { uri: props.contestInfo.image }
                                :
                                assests.bigPlaceHolder
                        }
                        style={styles.image}
                    />
                    <Text style={styles.title}>
                        {props?.contestInfo?.title}
                    </Text>
                    <Text style={styles.desc}>
                        {props?.contestInfo?.description}
                    </Text>
                    <Text style={styles.viewRoundText}>
                        {_itemCountNumber()}
                    </Text>
                    {/* <TouchableOpacity onPress={onDetailClick}>
                        <Text style={styles.viewRoundText}>
                            {'View Round Detail  >'}
                        </Text>
                    </TouchableOpacity> */}

                </View>

                {
                    (props.contestInfo.isPublish || props.isRound) &&
                    <>
                        <Button
                            title={'Play'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                            style={styles['playButton']}
                            onPress={() => { onPlayClick(); }}
                        />

                        {/*
                            <Button
                                title={'Join'}
                                textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                                style={[styles['playButton'], { backgroundColor: '#fcd274', marginTop: 14 }]}
                                onPress={() => {
                                    Actions.testVideoCalling({ roomId: props.contestInfo._id, title: props.contestInfo.title });
                                }}
                            />
                        */}
                    </>
                }

                {
                    isCurrentUserCreated && !props.contestInfo.isPublish &&
                    <>
                        <Button
                            title={'Publish'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                            style={styles['publishButton']}
                            onPress={() => { handleUpdateContestData() }}
                        />

                        <Button
                            title={'Remove'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                            style={styles['removeButton']}
                            onPress={() => { handleDeleteContestData() }}
                        />
                    </>
                }
            </ScrollView>

            <Alert
                // icon={assests.close_pink}
                // title={'Are you sure!'}
                isModalVisible={isDeleteDialog}
                buttonTitle={'Done'}
                cancleTitle={'Cancel'}
                heading={'Are you sure, you want to delete?'}
                onCancel={() => {
                    setisDeleteDialog(false)
                }}
                logout={() => onRemoveClick()}
            />

            <Alert
                // icon={assests.close_pink}
                // title={'Are you sure!'}
                isModalVisible={isPublishDialog}
                buttonTitle={'Yes'}
                cancleTitle={'No'}
                heading={'Are you sure, you want to publish?'}
                onCancel={() => {
                    setisPublishDialog(false)
                }}
                logout={() => onPublishClick()}
            />

            <SetPasswordAlert
                title={'Set Password'}
                desc={constrants.SET_PASSWORD_DESCRIPTION}
                isModalVisible={isPasswordDialog}
                buttonTitle={'Next'}
                cancelTitle={'Cancel'}
                onBackClick={() => setisPasswordDialog(false)}
                onDoneClick={(displayName, password) => _onPasswordDonePress(displayName, password)}
            />

            <PickAndPlayAlert
                title={'Select Game Type'}
                desc={'You can go already existing room to play or Go for new room.'}
                isModalVisible={pickAndPlayDialog}
                pickButtontitle={'Pick a Room'}
                playButtontitle={'Play New'}
                cancleButtontitle={'Cancel'}
                onCancelClick={() => setpickAndPlayDialog(false)}
                onPlayClick={() => {
                    _onMultiplayerPlayClick();
                }}
                onPickClick={() => {
                    setpickAndPlayDialog(false);
                    setTimeout(() => {
                        setisPasswordDialog(true)
                    }, 600);
                }}
            />

            <PopUpScreen
                isModalVisible={visible}
                msgText={errorMsgText}
                isError={true}
                onCloseModal={() => setVisible(false)}
                _applyAction={() => _applyAction()}
            />

            {/* alert for subscription */}
            <Alert
                // title={'Are you sure!'}
                heading={appConstants.SUBSCRIPTION_MESSAGE}
                isModalVisible={subscriptionAlert}
                buttonTitle={'Yes'}
                cancleTitle={'No'}
                onCancel={() => setsubscriptionAlert(false)}
                logout={() => setsubscriptionAlert(false)}
            />
        </SafeAreaView>
    )
}

export default ContestInfo;
