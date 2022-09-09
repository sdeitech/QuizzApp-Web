import React, { useMemo, memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import appConstants from '../../../common/appConstants';

import color from '../../../utils/color';

const RowSelectionBox = ({ matchItRows, item, setmatchItRows }) => {

    const isSelected = useMemo(() => {
        return matchItRows === item;
    }, [matchItRows]);

    return (
        <TouchableOpacity
            style={[styles.container, {
                borderColor: isSelected ? color.goldenColor : undefined,
                borderWidth: isSelected ? 2 : undefined
            }]}
            onPress={() => setmatchItRows(item)}
        >
            <Text
                style={styles.text}
            >
                {item}
            </Text>
        </TouchableOpacity>
    )
}

export default memo(RowSelectionBox);

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        paddingHorizontal: 18,
        paddingVertical: 14,
        backgroundColor: color.translucentWhite,
    },
    text: {
        top: 2,
        color: '#fff',
        fontFamily: appConstants.fontReqular,
    }
});
