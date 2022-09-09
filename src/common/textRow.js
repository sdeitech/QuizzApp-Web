import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window');
const TextRow = (props) => {
    return (
        <View style={styles.textRowContainer}>
            <Text style={styles.rowText}>{props.option}</Text>
            <Text onPress={props.onPress} style={[styles.rowText, { color: props.color }]}>{props.value}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    textRowContainer: {
        width: width - 30,
        paddingVertical: 8,
        borderBottomWidth: 1.5,
        borderBottomColor: '#E5E5E5',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    rowText: {
        fontSize: 11,
        fontWeight: '400',
        color: '#000'
    }
})

export default TextRow;