import React, { memo } from 'react';
import {
    StyleSheet, Text, View,
    ActivityIndicator,
} from 'react-native';

import color from '../../../utils/color';

const WaiingLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <View width={10} />
            <Text style={styles.waitingText}>Waiting for host...</Text>
        </View >
    )
}

export default memo(WaiingLoader);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    waitingText: {
        color: color.white,
    },
});
