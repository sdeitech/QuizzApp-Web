import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/customComponent';
import color from './../../../utils/color';
import * as fontFamily from './../../../utils/fontFamily';
import * as commonApi from './../../../ServiceRequests/serviceContest';

const RenderUser = (props) => {
    const dispatch = useDispatch();
    const { name, is_invited, _id, roomId, image } = props.item || {};

    const [invited, setinvited] = useState(is_invited);

    const _onInvite = async () => {
        try {
            setinvited(true);
            const formData = new FormData();
            formData.append("inviteUserId", _id);
            formData.append("roomId", roomId);
            const response = await commonApi.userInviteSendAPI(formData, dispatch);

            if (response['status']) {
            }
            else {
                setinvited(false);
            }
        } catch (error) {
            setinvited(false);
        }
    }

    return (
        <View style={styles.renderContainer}>
            <View style={styles.userNameContainer}>
                {
                    image
                        ?
                        <Image
                            style={styles.trimedIcon}
                            source={{ uri: image }}
                        />
                        :
                        <View style={styles.trimedIcon}>
                            <Text style={styles.trimedText}>{name.slice(0, 2).toUpperCase()}</Text>
                        </View>
                }
                <View width={18} />
                <Text style={styles.renderName}>{name}</Text>
            </View>

            <Button
                title={invited ? 'Invited' : 'Add'}
                textStyle={[styles.buttonText, {
                    color: invited ? color.white : color.statusBar
                }]}
                style={[styles.addButton, {
                    backgroundColor: invited ? color.subBordorColor : color.goldenColor,
                    paddingHorizontal: invited ? 14 : 30,
                }]}
                onPress={() => _onInvite()}
                disabled={invited}
            />
        </View>
    )
}

export default RenderUser

const styles = StyleSheet.create({
    renderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userNameContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    trimedIcon: {
        backgroundColor: color.goldenColor,
        height: 40,
        width: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    trimedText: {
        fontFamily: fontFamily.avenirMedium,
    },
    renderName: {
        flex: 1,
        color: '#fff',
        fontSize: 20,
        fontFamily: fontFamily.avenirMedium
    },
    buttonText: {
        fontSize: 15,
        letterSpacing: 3.09,
        fontFamily: appConstants.fontBold
    },
    addButton: {
        height: undefined,
        // paddingHorizontal: 10,
        paddingVertical: 8,
        justifyContent: 'flex-start'
    },
})
