import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet, Text, FlatList,
    View, useWindowDimensions, Dimensions,
    Animated
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import color from './../../../utils/color';
import * as fontFamily from './../../../utils/fontFamily';
import GroupItem from './GroupItem';

const GroupsList = (props) => {
    const rowTranslateAnimatedValues = useRef({});
    const animationIsRunning = useRef(false);

    const [isLoading, setisLoading] = useState(true);

    const [yAxesChange, setyAxesChange] = useState(0);

    const { width } = useWindowDimensions();

    useEffect(() => {
        props.data.forEach((_, i) => {
            rowTranslateAnimatedValues.current[`${_.saveToId}`] = new Animated.Value(1);
        });

        setTimeout(() => {
            setisLoading(false);
        }, 200);
    }, [props.data]);

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </View>
        </View>
    );

    const onSwipeValueChange = swipeData => {
        try {
            const { key, value } = swipeData;

            if (
                value < -Dimensions.get('window').width &&
                !animationIsRunning.current
            ) {
                animationIsRunning.current = true;

                Animated.timing(rowTranslateAnimatedValues.current[key], {
                    toValue: 0,
                    duration: 200,
                }).start(() => {
                    const newData = [...props.data];
                    const prevIndex = props.data.findIndex(item => item.saveToId === key);
                    newData.splice(prevIndex, 1);
                    props.changedData(newData, key);
                    animationIsRunning.current = false;
                });
            }
        } catch (error) {
            // alert(error);
        }
    };

    return (
        <View style={{ flex: 1, paddingTop: 20 }}>
            {
                !isLoading &&
                <FlatList
                    disableRightSwipe
                    data={props.data}
                    CellRendererComponent={({ item, index }) => (
                        <GroupItem
                            item={{
                                ...item,
                                index,
                                rowTranslateAnimatedValues: rowTranslateAnimatedValues.current
                            }}
                            onEditClick={props.onEditClick}
                            onDeleteClick={props.onDeleteClick}
                        />
                    )}
                    keyExtractor={item => item.saveToId + "okayDone"}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-width}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={true}
                    disableLeftSwipe // <----- disable left swipe
                    onScrollEndDrag={(event) => setyAxesChange(event.nativeEvent.contentOffset.y)}
                />
            }
        </View>
    )
}

export default GroupsList

const styles = StyleSheet.create({
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: color.lightPink,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        marginHorizontal: 22,
        paddingTop: 14,
        paddingBottom: 14,
        marginBottom: 28,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        fontFamily: fontFamily.avenirBold,
        backgroundColor: color.lightPink,
        right: 0,
    },
})
