import React, { useState } from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/customComponent';
import color from './../../../utils/color';
import * as fontFamily from './../../../utils/fontFamily';
import * as commonApi from './../../../ServiceRequests/serviceContest';

const RenderUser = (props) => {
    const dispatch = useDispatch();
    const { displayName, phoneNumbers, is_invited, _id, roomId, index } = props.item;

    const [invited, setinvited] = useState(is_invited);

    const _onInvite = async (number) => {
        // Linking.openURL(`sms:/open?addresses=${number}&body=`);
        Linking.openURL(`sms:${number}`)
    }

    return (
        <View style={styles.renderContainer}>
            <View style={styles.userNameContainer}>
                <View style={styles.trimedIcon}>
                    <Text style={styles.trimedText}>{displayName?.slice(0, 2)?.toUpperCase() || ""}</Text>
                </View>
                <View width={18} />
                <View>
                    <Text style={styles.renderName}>{displayName || ""}</Text>
                    <Text style={styles.renderName}>{phoneNumbers?.length ? phoneNumbers[0].number : ''}</Text>
                </View>

            </View>

            <Button
                title={invited ? 'Invited' : 'Add'}
                textStyle={[styles.buttonText, {
                    color: color.statusBar//invited ? color.white : color.statusBar
                }]}
                style={[styles.addButton, {
                    backgroundColor: color.goldenColor,//invited ? color.subBordorColor : color.goldenColor,
                    paddingHorizontal: invited ? 14 : 30,
                }]}
                onPress={() => _onInvite(phoneNumbers ? phoneNumbers[0].number : '')}
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
