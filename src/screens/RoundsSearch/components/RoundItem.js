import React, { memo } from 'react'
import {
    StyleSheet, Text, TouchableOpacity,
    View, Image,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import assests from '../../../common/assests';

import { dynamicSize, getFontSize } from '../../../utils/responsive';

const RoundItem = ({ item, index }) => {
    const roundTitle = () => {
        if (item.totalRound > 1) {
            return `${item.totalRound || 0} Questions`;
        }
        return `${item.totalRound || 0} Question`;
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    marginLeft: (index) % 2 ? "8%" : undefined,
                    // backgroundColor:  (index) % 2 ? "blue" : "red"
                }
            ]}
            onPress={() => {
                const test = {};
                // console.log(test.should.crash);
                Actions.contestInfo({ contestInfo: item })
            }}
            // disabled
        >
            <View style={[styles.innerBox, { borderColor: '#68C1D2', height: '100%' }]}>
                <Image
                    style={styles.boxImage}
                    source={item.image ? { uri: item.image } : assests.smallPlaceholder}
                    resizeMode="cover"
                />
                {/* <View style={{ alignSelf: 'center', alignItems: 'center'}}> */}
                <Text numberOfLines={1} style={[styles.questionText, { color: '#68C1D2' }]}>{item.title}</Text>
                <Text numberOfLines={1} style={styles.gamename}>{roundTitle() || ""}</Text>
                <Text numberOfLines={1} style={styles.gameCreator}>{item.createdBy || ""}</Text>
                {/* </View> */}
            </View>
        </TouchableOpacity>
    )
}

export default memo(RoundItem)

const styles = StyleSheet.create({
    container: {
        marginTop: dynamicSize(15),
        flexDirection: 'row',
        // width: dynamicSize(158),
        width: "46%",
        height: 'auto',
    },
    innerBox: {
        borderWidth: 1,
        borderColor: '#68C1D2',
        alignItems: 'center',
        borderRadius: dynamicSize(10),
        width: '100%',
        shadowColor: '#000000A6',
        elevation: 1,
        marginRight: dynamicSize(10),
        shadowColor: '#0000003B',
        shadowOffset: {
            width: 0,
            height: 14
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    boxImage: {
        width: '100%',
        height: dynamicSize(80),
        resizeMode: 'cover',
        borderTopLeftRadius: dynamicSize(10),
        borderTopRightRadius: dynamicSize(10),
        shadowColor: '#0000003B',
        elevation: 1,
        shadowOffset: { width: 0, height: dynamicSize(10) },
    },
    questionText: {
        fontSize: getFontSize(16),
        letterSpacing: 0.8,
        marginTop: dynamicSize(10),
        marginHorizontal: dynamicSize(8),
        fontFamily: appConstants.fontBold,
        fontWeight: '800',
    },
    gamename: {
        fontSize: 14,
        color: '#ADBAC1',
        marginTop: dynamicSize(6),
        fontFamily: appConstants.fontReqular,
        paddingHorizontal: 5,
        textAlign: 'center',
    },
    gameCreator: {
        marginBottom: 10,
        fontSize: 13,
        color: '#ADBAC1',
        marginTop: 6,
        fontFamily: appConstants.fontReqular,
        paddingHorizontal: 5,
        textAlign: 'center',
    },
})
