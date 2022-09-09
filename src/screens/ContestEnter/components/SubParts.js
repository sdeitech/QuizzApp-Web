import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as fontFamily from './../../../utils/fontFamily';

const SubParts = ({ title, value, valueStyle }) => {
    return (
        <View style={styles.container}>
            <Text
                style={styles.titleText}
            >
                {title}
            </Text>

            <Text
                style={[styles.valueText, valueStyle]}
            >
                {value}
            </Text>
        </View>
    )
}

export default SubParts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    titleText: {
        color: "#fff",
        fontFamily: fontFamily.avenirSemiBold,
        fontSize: 14,
        letterSpacing: 1,
    },
    valueText: {
        marginTop: 6,
        color: "#fff",
        fontFamily: fontFamily.avenirLight,
        fontSize: 18,
    },
});
