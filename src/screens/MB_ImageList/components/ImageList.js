import React from 'react';
import {
    StyleSheet, Text,
} from 'react-native';
import SortableGridView from 'react-native-sortable-gridview'

import assests from '../../../common/assests';
import { dynamicSize } from '../../../utils/responsive';
import color from '../../../utils/color';
import ImageListItem from './ImageListItem';

const ImageList = ({ data, loader, newChangeData, onDeleteClick }) => {
    if (data.length === 0) {
        return <Text style={styles.emptyViewLabel}>{loader ? 'No data found' : ''}</Text>;
    }

    return (
        <SortableGridView
            style={{ width: "100%" }}
            data={data}
            onDragRelease={(newData) => newChangeData(newData)}
            numPerRow={3}
            gapWidth={1}
            paddingTop={1}
            paddingBottom={1}
            paddingLeft={1}
            paddingRight={1}
            renderItem={(item) => (
                <ImageListItem
                    data={item}
                    onDeleteClick={(id) => onDeleteClick(id)}
                />
            )}
        />
    )
}

export default ImageList

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
})
