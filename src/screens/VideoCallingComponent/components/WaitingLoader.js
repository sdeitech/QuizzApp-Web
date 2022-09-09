import React, { memo } from 'react'
import {
    StyleSheet, Text, View,
    ActivityIndicator
} from 'react-native'
import color from '../../../utils/color';

const WaitingLoader = () => {
    return (
        <View style={[styles.container]}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={color.white} />

                <View height={8} />

                <Text>Waiting...</Text>
            </View>
        </View>
    )
}

export default memo(WaitingLoader);

const styles = StyleSheet.create({
    container: {
        top: '40%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    loadingContainer: {
        padding: 26,
        borderRadius: 6,
        backgroundColor: color.midGrey,
    },
});
