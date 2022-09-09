import React from 'react';
import {
    StyleSheet, Text, View,
    FlatList,
} from 'react-native';

import RenderData from './RenderData';

const DataList = (props) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={props.data}
                renderItem={({ item, index }) => <RenderData item={{ ...item, index }} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default React.memo(DataList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
