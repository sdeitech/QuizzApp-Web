import React, { memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import color from './../../../utils/color';

const pointsList = [-10, -5, 0, 5, 10];

const PointBoxList = (props) => {
    const { onSelect, userIndex, selectedPoint, score } = props;

    return (
        <View style={styles.container}>
            {
                pointsList.map((item, index) => {
                    const isSelected = selectedPoint === item || score === item;
                    return (
                        <TouchableOpacity
                            key={index.toString()}
                            onPress={() => onSelect(item, userIndex)}
                            style={[styles.pointBox, {
                                backgroundColor: isSelected
                                    ?
                                    color.buttonColor1
                                    :
                                    color.subBordorColor
                            }]}
                        >
                            <Text style={{
                                color: isSelected
                                    ?
                                    color.black
                                    :
                                    color.white
                            }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default memo(PointBoxList);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 14,
    },
    pointBox: {
        backgroundColor: 'gray',
        width: "18%",
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
