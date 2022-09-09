import React, { memo, useState } from 'react';
import {
    StyleSheet, Text, View,
    Image, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import color from './../../../utils/color';
import assets from './../../../common/assests';
import * as fontFamily from './../../../utils/fontFamily';
import { Button } from '../../../components/customComponent';
import * as commonApi from './../../../ServiceRequests/serviceContest';
import { PopUpScreen } from '../../../common/alertPop';
import { LoaderAction, setPlayRoundList } from '../../../redux/action';
import appConstants from '../../../common/appConstants';
import BlueBorderView from '../../../common/BlueBorderView';

const InviteView = (props) => {
    const dispatch = useDispatch();

    const [invitationStatus, setinvitationStatus] = useState(undefined);
    const [errorMsgText, setErrorMsgText] = useState('');
    const [visiblerror, setVisibleError] = useState(false);

    const {
        title, index, inviteRoomId,
        inviteContestId, invitedByImage = "",
        invitedByName,
    } = props.item || {};

    const backgroundColor = ((index) % 2) !== 0 ? undefined : color.transparentBGColor1;

    const _getContestDetail = async () => {
        try {
            dispatch(LoaderAction(true));

            console.log("item of invite => ", JSON.stringify(props.item));

            const response = await commonApi.saveContestGetAPI(0, dispatch, "", "", "", inviteContestId, true);
            // dispatch(LoaderAction(false))
            console.log("data of my games => ", JSON.stringify(response.data))

            if (response['status']) {
                console.log('data of getting contest => ', response.data[0]);
                _getRoomDetails(response.data[0]);
            }
        } catch (error) {
            console.log("error is => ", error);
        }
    }

    const _getRoomDetails = async (contestInfo) => {
        try {
            dispatch(LoaderAction(true));

            // console.log("user id => ", data);
            const response = await commonApi.roomListing("", inviteRoomId, dispatch);
            // dispatch(LoaderAction(false))
            console.log("data of my rooms => ", JSON.stringify(response.data))

            const roomResponse = response.data.jsonData.data[0];
            const { gamePin, password, roomId, displayName, gameId, _id } = roomResponse;

            if (response['status']) {

                //! bottom line will be open if user need to redirect to game directly
                // _getRoundList({ contestInfo: { ...contestInfo, response: { gamePin, password, roomId, displayName, _id } }, gameId });
                // console.log("contest info which is sending => ", JSON.stringify({ contestInfo: { ...contestInfo, response: { gamePin, password, roomId, displayName } } }));
                //* bottom line will be open if user need to redirect to information screen
                Actions.contestEnter({ contestInfo: { ...contestInfo, response: { gamePin, password, roomId, displayName, _id } }, gameData: { _id: gameId } });
            }
        } catch (error) {
            console.log("error is => ", error);
        }
    }

    const _getRoundList = async ({ contestInfo, gameId }) => {
        try {
            dispatch(LoaderAction(true));

            console.log("get round list 123 => ", contestInfo, gameId);
            const response = await commonApi.getRoundList(dispatch, 0, contestInfo._id);
            console.log("arrData====", JSON.stringify(response));

            if (response['status']) {
                const properData = response?.data.filter((item) => item.title);

                // dispatch(setCurrentRound(0));
                dispatch(setPlayRoundList(properData));
                // dispatch(LoaderAction(true));

                // const gameData = await _createGame("", contestInfo._id);

                // console.log("game data from join click => ", JSON.stringify(gameData));

                Actions.admContestPlayNew({ contestInfo: { ...contestInfo }, gameData: { _id: gameId } });
            }
            else {
                setTimeout(() => {
                    setErrorMsgText(response.message);
                    setVisibleError(true);
                }, 1000);
            }
        } catch (error) {
            setTimeout(() => {
                setErrorMsgText(error);
                setVisibleError(true);
            }, 1000);
        }
    }

    const onAccept = async () => {
        try {
            setinvitationStatus(true);
            const userid = await AsyncStorage.getItem('userid');

            console.log("data for notification => roomId => " + inviteRoomId + "contestid => " + inviteContestId);

            const formData = new FormData();

            formData.append("userId", userid);
            formData.append("roomId", inviteRoomId);

            // console.log("user id => ", data);
            const response = await commonApi.userInviteAcceptAPI(formData, dispatch);

            // dispatch(LoaderAction(false))
            console.log("data of my notifications => ", JSON.stringify(response));

            if (response['status']) {
                _getContestDetail();
            } else {
                setinvitationStatus(undefined);
                setErrorMsgText(response['message'])
                setVisibleError(true)
            }
        } catch (error) {
            setinvitationStatus(undefined);
            setErrorMsgText(error)
            setVisibleError(true)
        }
    }

    const onDecline = async () => {
        try {
            setinvitationStatus(false);
            const userid = await AsyncStorage.getItem('userid');

            const formData = new FormData();

            formData.append("userId", userid);
            formData.append("roomId", inviteRoomId);

            // console.log("user id => ", data);
            const response = await commonApi.userInviteDeclineAPI(formData, dispatch);

            // dispatch(LoaderAction(false))
            console.log("data of my notifications => ", JSON.stringify(response));

            if (response['status']) {
            } else {
                setinvitationStatus(undefined);
                setErrorMsgText(response['message'])
                setVisibleError(true)
            }
        } catch (error) {
            setinvitationStatus(undefined);
            setErrorMsgText(error)
            setVisibleError(true)
        }
    }

    return (
        <BlueBorderView
            // style={[styles.container, { backgroundColor }]}
            onPress={onAccept}
        >
            <Image
                source={{ uri: invitedByImage }}
                style={styles.notificationImage}
                defaultSource={assets.vCallPlaceholder}
            />

            <View width={20} />

            <View style={styles.rightContainer}>
                <Text style={styles.inviterName} numberOfLines={1}>{invitedByName || "John Doe"}</Text>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                {/* <View height={6} /> */}

                {/* <View style={styles.rightBottomContainer}>
                    {
                        invitationStatus === false
                            ?
                            null
                            :
                            <Button
                                title={invitationStatus === true ? 'Accepted' : 'Accept'}
                                textStyle={styles.buttonText}
                                style={[styles.addButton, {
                                    backgroundColor: color.buttonColor1,
                                    flex: invitationStatus === true ? 1 : undefined
                                }]}
                                disabled={invitationStatus !== undefined}
                                onPress={onAccept}
                            />
                    }

                    <View width={6} />

                    {
                        invitationStatus === true
                            ?
                            null
                            :
                            <Button
                                title={invitationStatus === false ? 'Declined' : 'Decline'}
                                textStyle={styles.buttonText}
                                style={[styles.addButton, {
                                    backgroundColor: color.fadeRedColor,
                                    flex: invitationStatus === false ? 1 : undefined
                                }]}
                                disabled={invitationStatus !== undefined}
                                onPress={onDecline}
                            />
                    }
                </View> */}

                <PopUpScreen
                    isModalVisible={visiblerror}
                    msgText={errorMsgText}
                    isError={true}
                    onCloseModal={() => setVisibleError(false)}
                    _applyAction={() => setVisibleError(false)}
                />
            </View>
        </BlueBorderView>
    )
}

export default memo(InviteView);

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: "5%",
        flexDirection: 'row',
        borderBottomColor: color.seperatorLineColor,
        borderBottomWidth: 2,
    },
    notificationImage: {
        height: 50,
        width: 50,
        borderRadius: 36,
    },
    rightContainer: {
        flex: 1
    },
    inviterName: {
        color: color.hangmanColor,
        fontSize: 18,
		letterSpacing: 0.8,
		fontFamily: appConstants.fontBold,
		fontWeight: '800',
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        fontFamily: fontFamily.avenirMedium,
        color: '#fff',
    },
    rightBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    buttonText: {
        fontSize: 14,
        color: '#22343C',
        letterSpacing: 3.09,
        fontFamily: appConstants.fontBold
    },
    addButton: {
        backgroundColor: '#FCD274',
        height: undefined,
        // flex: 0.6,
        paddingVertical: 8,
        paddingHorizontal: 14,
        justifyContent: 'flex-start'
    },
})
