import React, { memo } from 'react';
import {
    StyleSheet, Text, View,
    Image,
} from 'react-native';

import color from './../../../utils/color';
import assets from './../../../common/assests';
import * as fontFamily from './../../../utils/fontFamily';
import appConstants from '../../../common/appConstants';
import BlueBorderView from '../../../common/BlueBorderView';

const NormalView = (props) => {
    const { title, invitedByName, index, invitedByImage = "" } = props.item || {};

    const backgroundColor = undefined; // ((index) % 2) !== 0 ? undefined : color.transparentBGColor1;

    return (
        // <View style={[styles.container, { backgroundColor }]}>
        <BlueBorderView
            disabled
        >
            <Image
                source={{ uri: invitedByImage }}
                style={styles.notificationImage}
                defaultSource={assets.vCallPlaceholder}
            />

            <View width={20} />

            <View style={styles.rightContainer}>
                <Text style={styles.inviterName} numberOfLines={1}>{invitedByName || ""}</Text>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>

                {/* <View height={6} />

                <Text style={styles.message}>{description}</Text> */}
            </View>
        </BlueBorderView>
        // </View>
    )
}

export default memo(NormalView);

const styles = StyleSheet.create({
    container: {
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
    message: {
        fontSize: 14,
        fontFamily: fontFamily.avenirLight,
        color: '#fff',
    },
});
