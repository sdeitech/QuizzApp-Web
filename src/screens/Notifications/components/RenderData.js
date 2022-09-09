import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import InviteView from './InviteView';
import NormalView from './NormalView';

const RenderData = (props) => {
    const { item } = props;
    switch (item.type) {
        case 1:
            return <InviteView item={item} />
        case 2:
            return <NormalView item={item} />
        default:
            return;
    }
}

export default React.memo(RenderData);

const styles = StyleSheet.create({})
