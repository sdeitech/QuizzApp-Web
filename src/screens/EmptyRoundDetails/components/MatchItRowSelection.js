import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import RowSelectionBox from './RowSelectionBox';

const gridNumbers = [4, 5, 8];

const MatchItRowSelection = (props) => {
    return (
        <View style={styles.container}>
            {
                gridNumbers.map(item => (
                    <RowSelectionBox
                        key={item.toString()}
                        item={item}
                        {...props}
                    />
                ))
            }
        </View>
    )
}

export default memo(MatchItRowSelection);

const styles = StyleSheet.create({
    container: {
        marginTop: 18,
        flexDirection: 'row'
    },
})
