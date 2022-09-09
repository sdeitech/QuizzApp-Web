import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import SortableList from 'react-native-sortable-list';
import appConstants from '../../../common/appConstants';

import WordListItem from './WordListItem';

const WordList = ({ data, loader, newChangeData, onDeleteClick, optionId, setoptionId, hideOption, onEditClick }) => {
    const [scrollEnable, setscrollEnable] = useState(true)

    const _releaseNewList = (changedData) => {
        setscrollEnable(true);

        const oldData = [...data];

        let tempChangedArray = [];
        changedData.forEach((index) => {
            const indexNumber = parseInt(index);
            tempChangedArray = [...tempChangedArray, oldData[indexNumber]];
        });

        newChangeData(tempChangedArray);
    }

    if (data.length === 0) {
        return <Text style={styles.emptyViewLabel}>{loader ? 'No data found' : ''}</Text>;
    }

    return (
        <ScrollView
            scrollEnabled={scrollEnable}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
        >
            <SortableList
                scrollEnabled={false}
                onActivateRow={() => setscrollEnable(false)}
                onReleaseRow={(_, newOrder) => { _releaseNewList(newOrder) }}
                style={{ flex: 1 }}
                data={data}
                renderRow={({ data }) => (
                    <WordListItem
                        data={data}
                        onDeleteClick={(id) => onDeleteClick(id)}
                        optionId={optionId}
                        setoptionId={id => setoptionId(id)}
                        hideOption={hideOption}
                        onEditClick={onEditClick}
                    />
                )}
            />
        </ScrollView>
    )
}

export default WordList;

const styles = StyleSheet.create({
    emptyViewLabel: {
        fontSize: 20,
        marginTop: "50%",
        width: "100%",
        color: '#ADBAC1',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: appConstants.AirbnbCerealAppLight,

    },
});
