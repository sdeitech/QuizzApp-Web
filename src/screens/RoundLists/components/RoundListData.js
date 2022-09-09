import React, { memo } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import RoundItem from './RoundItem';

const RoundListData = (props) => {
    const { data, onEndReached } = props;

    return (
        <>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <RoundItem item={{ ...item, index }} contestInfo={{ ...props.contestInfo }} />}
                keyExtractor={item => item._id}
                onEndReached={() => onEndReached()}
                onEndReachedThreshold={0.3}
            />
        </>
    )
}

export default memo(RoundListData);

const styles = StyleSheet.create({});
