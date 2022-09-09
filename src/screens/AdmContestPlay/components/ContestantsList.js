import React from 'react'
import {
    StyleSheet, Image, View,
    ScrollView, useWindowDimensions, TouchableOpacity
} from 'react-native'

import assests from './../../../common/assests';
import color from './../../../utils/color';

const ContestantsList = (props) => {
    const { width } = useWindowDimensions();

    const splitToChunks = (array, n) => {
        let [...arr] = array;
        var res = [];
        while (arr.length) {
            res.push(arr.splice(0, n));
        }
        return res;
    }

    const pageWithList = () => {
        try {
            const splittedData = [...splitToChunks(props.data, 6)];
            return splittedData.map((item, index) => (
                <View
                    key={index.toString()}
                    style={styles.renderContestants(width)}
                >
                    {
                        item.map((item, index) => {
                            return (
                                <View
                                    key={index.toString()}
                                    style={[
                                        styles.renderContestantsItem,
                                        {
                                            marginLeft: (index % 2) !== 0 ? "4%" : 0,
                                            marginRight: (index % 2) === 0 ? "4%" : 0,
                                        }
                                    ]}
                                >
                                    <Image
                                        style={styles.contestantsImage}
                                        source={assests.tempProfile}
                                    />
                                    <View style={styles.bottomView}>
                                        <TouchableOpacity>
                                            <Image
                                                source={assests.callRight}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity>
                                            <Image
                                                source={assests.callMic}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { }}>
                                            <Image
                                                source={assests.callCam}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    }
                </View>
            ));
        } catch (error) {
            alert(error);
        }
    }

    return (
        <ScrollView
            horizontal
            pagingEnabled
            style={styles.listingData}
            showsHorizontalScrollIndicator={false}
        >
            {
                pageWithList()
            }
        </ScrollView>
    )
}

export default ContestantsList;

const styles = StyleSheet.create({
    listingData: {
        flex: 1,
        // backgroundColor: "blue",
    },
    renderContestants: (width) => ({
        width,
        // backgroundColor: "pink",
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: "4%",
        marginBottom: 58,
    }),
    renderContestantsItem: {
        height: "29%",
        width: "46%",
        // marginHorizontal: "6%",
        marginVertical: "3%",
        backgroundColor: color.subBordorColor,
        borderRadius: 8,
        overflow: 'hidden',
    },
    contestantsImage: {
        width: "100%",
        height: "62%",
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})
