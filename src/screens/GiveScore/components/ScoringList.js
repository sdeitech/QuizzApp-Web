import React, { memo } from 'react'
import { StyleSheet, FlatList } from 'react-native'

import color from './../../../utils/color';
import { Button } from '../../../components/customComponent';
import ScoringRender from './ScoringRender';
import appConstants from '../../../common/appConstants';

const ScoringList = (props) => {
    const { data, onSubmit, onSelect, isGiveScoreScreen } = props;

    const _bottomButton = () => {
        return (
            <Button
                title={'Submit'}
                textStyle={styles.bottomButtonText}
                style={styles.bottomButton}
                onPress={onSubmit()}
            />
        );
    }

    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) => <ScoringRender item={{ ...item, index, onSelect }} />}
            contentContainerStyle={styles.container}
            keyExtractor={(x, i) => i.toString()}
            ListFooterComponent={_bottomButton}
        />
    )
}

export default memo(ScoringList);

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 16,
    },
    bottomButton: {
        marginTop: 20,
        marginVertical: 20,
        backgroundColor: color.goldenColor,
        alignSelf: 'center',
        width: "80%",
    },
    bottomButtonText: {
        fontSize: 17,
        color: color.statusBar,
        letterSpacing: 4,
        fontFamily: appConstants.AirbnbCerealAppBook,
        marginHorizontal: 60,
        borderRadius: 8
    }
});
