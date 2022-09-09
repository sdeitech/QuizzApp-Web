import React, { useState } from 'react';
import {
    Image, StyleSheet, Text,
    View, TouchableOpacity,
} from 'react-native';

import assests from '../../../common/assests';
import Colors from './../../../utils/color';

const WordListItem = ({ data, onDeleteClick, optionId, setoptionId, hideOption, onEditClick }) => {
    return (
        <View
            style={styles.wordContainer}
            onStartShouldSetResponder={e => {
                e.persist();
                hideOption();
            }}
        >
            <Text style={styles.wordText}>{data?.title || ""}</Text>

            {/* <TouchableOpacity>
                <Image
                    source={assests.edit}
                    style={styles.rightIcons}
                    resizeMode={"contain"}
                />
            </TouchableOpacity>

            <View width={20} /> */}

            <TouchableOpacity onPress={() => setoptionId(data.item_id)}>
                <Image
                    source={assests.dot}
                    style={styles.rightIcons}
                    resizeMode={"contain"}
                />
            </TouchableOpacity>

            {
                optionId == data.item_id ?
                    <View style={{ position: 'absolute', right: 4, top: 4, backgroundColor: '#22343C', borderRadius: 5, width: 110 }}>

                        <TouchableOpacity onPress={() => onEditClick(data)}
                            style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10, alignItems: 'center' }}>
                            <Image source={assests.edit} style={{ width: 14, height: 14 }} />
                            <Text style={{ color: '#FAFAFA', fontFamily: appConstants.AirbnbCerealAppLight, fontSize: 14, marginLeft: 15 }}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onDeleteClick(data.item_id)}
                            style={{ flexDirection: 'row', marginLeft: 10, marginTop: 14, alignItems: 'center', marginBottom: 10 }}>
                            <Image source={assests.crossWhite} style={{ width: 14, height: 14 }} />
                            <Text style={{ color: '#FAFAFA', fontFamily: appConstants.AirbnbCerealAppLight, fontSize: 14, marginLeft: 15 }}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                    : null
            }
        </View>
    )
}

export default WordListItem

const styles = StyleSheet.create({
    wordContainer: {
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 20,
        backgroundColor: Colors.subBordorColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.hangmanColor,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 80,
    },
    wordText: {
        color: Colors.white,
        letterSpacing: 0.4,
        fontSize: 15,
        flex: 1,
        // height: "100%",
    },
    rightIcons: {
        height: 18,
        width: 18,
    },
})
