import React from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import color from './../../../utils/color';
import * as fontFamily from './../../../utils/fontFamily';

const RoundItem = (props) => {
    const { _id, title, gameType } = props.item;

    const _onRoundClick = () => {
        const roundObject = {
            gameType,
            roundName: title,
            roundId: _id,
        };

        Actions.admContestPlay({ contestInfo: { ...props.contestInfo, ...roundObject } });
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => _onRoundClick()}
        >
            <Text style={styles.name}>
                {`${title} (${gameType})`}
            </Text>
        </TouchableOpacity>
    )
}

export default RoundItem;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        marginHorizontal: 16,
        paddingHorizontal: 4,
        borderBottomWidth: 0.4,
        borderBottomColor: color.white,
    },
    name: {
        color: color.white,
        fontFamily: fontFamily.avenirLight,
    },
});
