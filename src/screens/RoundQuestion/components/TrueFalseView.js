import React from 'react';
import {
    Image, StyleSheet, Text,
    View,
} from 'react-native';

import assests from '../../../common/assests';

const TrueFalseView = ({ item }) => {
    return (
        <>
            {/* is true */}
            <View style={styles.questionView}>
                <Text style={[styles.questionText, { flex: 1 }]}>{"True"}</Text>
                {
                    item.answerTypeBoolean
                        ?
                        <View style={{
                            backgroundColor: '#192930',
                            justifyContent: 'center', marginRight: 10, borderRadius: 20,
                            height: 34, width: 34,
                        }}>
                            <Image style={{ alignSelf: 'center' }} source={assests.checkMarkSelected} />
                        </View>
                        :
                        <View style={{ height: 34 }} />
                }
            </View>

            {/* is false */}
            <View style={styles.questionView}>
                <Text style={[styles.questionText, { flex: 1 }]}>{"False"}</Text>
                {
                    !item.answerTypeBoolean
                        ?
                        <View style={{
                            backgroundColor: '#192930',
                            justifyContent: 'center', marginRight: 10, borderRadius: 20,
                            height: 34, width: 34,
                        }}>
                            <Image style={{ alignSelf: 'center' }} source={assests.checkMarkSelected} />
                        </View>
                        :
                        <View style={{ height: 34 }} />
                }
            </View>
        </>
    )
}

export default TrueFalseView;

const styles = StyleSheet.create({
    questionView: {
        marginHorizontal: 15,
        marginTop: 10,
        paddingVertical: 15,
        backgroundColor: '#324B55',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    questionText: {
        color: '#ffff',
        fontFamily: appConstants.AirbnbCerealAppMedium,
        fontSize: 14,
        marginHorizontal: 12
    },
});
