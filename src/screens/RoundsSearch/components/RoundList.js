import React, { memo } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

import RoundItem from './RoundItem';

const RoundList = (props) => {

    const emptyListView = () => {
        return (
            <Text style={styles.emptyViewLabel}>{!props.loader ? 'No data found' : ''}</Text>
        );
    }


    return (
        <FlatList
            contentContainerStyle={styles.container}
            numColumns={2}
            data={props.data}
            renderItem={({ item, index }) => (
                <RoundItem
                    item={item}
                    index={index}
                />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={props.retrieveMore}
            onEndReachedThreshold={0.3}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => emptyListView()}
        />
    )
}

export default memo(RoundList);

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    emptyViewLabel: {
        fontSize: 20,
        // marginLeft: 13,
        marginTop: 240,
        color: '#ADBAC1',
        justifyContent: 'center',
        alignSelf: 'center',
        // fontFamily: appConstants.AirbnbCerealAppLight,
        // backgroundColor: "red"
    },
});
