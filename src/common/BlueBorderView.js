import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import color from '../utils/color';

const BlueBorderView = (props = {}) => {
    return (
        <TouchableOpacity
            {
            ...props
            }
            style={[styles.container, props?.style]}
        >
            {props.children}
        </TouchableOpacity>
    )
}

export default BlueBorderView;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: "5%",
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderWidth: 1.2,
        borderRadius: 6,
        paddingVertical: 10,
        marginTop: 18,
        // width: "100%",
        flex: 1,
        alignItems: 'center',
        borderColor: color.hangmanColor,
        backgroundColor: color.statusBar,
    },
})
