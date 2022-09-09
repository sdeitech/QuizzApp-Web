import React, { useRef, memo, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import color from '../utils/color';

const PageIndicator = (props) => {
    const newView = (i) => {
        const viewWidth = 100 / props.totalQuestion;

        const getIndecatorColor = () => {
            if (props.wrongQuestions.includes(i)) {
                return color.fadeRedColor;
            } else if (props.doneQuestion === i) {
                return color.goldenColor;
            } else if (i < props.doneQuestion) {
                return color.bingoColor;
            } else {
                return 'gray';
            }
        }

        return (
            <View key={i.toString()}
                // style={[styles.subContainer, { width: viewWidth - (i + 1 !== props.totalQuestion ? 4 : 0), marginRight: i + 1 !== props.totalQuestion ? 4 : undefined }]}
                style={[styles.subContainer, { width: `${viewWidth}%`, paddingHorizontal: 2 }]}
            >
                <View
                    style={[
                        styles.subColoredContainer,
                        {
                            backgroundColor: getIndecatorColor(),
                        }
                    ]}
                />
            </View>
        );
    }

    let newListComponent = [];
    for (let i = 0; i < props.totalQuestion; i++) {
        newListComponent = [...newListComponent, newView(i)];        
    }


    return (
        <View style={styles.container}>
            {
                newListComponent
            }
        </View>
    )
}

export default memo(PageIndicator);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 16,
        // backgroundColor: 'red',
    },
    subContainer: {
        height: 10,
    },
    subColoredContainer: {
        width: "100%",
        height: "100%",
        borderRadius: 7,
    },
})
