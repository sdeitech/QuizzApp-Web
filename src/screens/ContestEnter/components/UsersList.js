import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import color from './../../../utils/color';
import * as fontFamily from './../../../utils/fontFamily';

const UsersList = ({ title, data }) => {
    const _renderItem = ({ item, index }) => {
        const { name, isOnline } = item;

        return (
            <View style={styles.renderContainer}>
                <View style={styles.trimedIcon}>
                    <Text style={styles.trimedText}>{name.slice(0, 2).toUpperCase()}</Text>
                    
                    {/* status component */}
                    <View
                        style={[styles.status, {
                            backgroundColor: isOnline ? color.onlineGreen : color.offlineGray,
                        }]}
                    />
                </View>

                {/* seperator */}
                <View width={18} />

                <Text style={styles.renderName}>{name}</Text>
            </View>
        );
    };

    const _renderSeperator = () => (
        <View style={{ width: "100%", height: 0.3, backgroundColor: "gray" }} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.listTitle}>{title}</Text>

            {/* seperator */}
            <View height={8} />

            <FlatList
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                data={data}
                renderItem={_renderItem}
                ItemSeparatorComponent={_renderSeperator}
            />
        </View>
    )
}

export default UsersList;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    listTitle: {
        color: color.goldenColor,
        fontFamily: fontFamily.avenirMedium,
    },
    renderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
    },
    renderName: {
        color: '#fff',
        fontSize: 20,
        fontFamily: fontFamily.avenirMedium
    },
    trimedIcon: {
        backgroundColor: color.goldenColor,
        padding: 12,
        borderRadius: 50,
    },
    trimedText: {
        fontFamily: fontFamily.avenirMedium,
    },
    status: {
        height: 14,
        width: 14,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: color.statusBar,
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
});
