import React from 'react'
import {
    StyleSheet, Text, View,
    Image,
} from 'react-native'

import { Button } from '../../../components/customComponent';
import color from './../../../utils/color';
import assests from './../../../common/assests';

const RoundInfoScreen = (props) => {
    const {
        image, title, description,
        totalQuestions, gameType
    } = props.item;

    // console.log("round detail item =>>> ", props.item);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Image
                    source={
                        image
                            ?
                            { uri: image }
                            :
                            assests.bigPlaceHolder
                    }
                    style={styles.image}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.title}>
                        {`${title} (${gameType})`}
                    </Text>

                    <Text style={styles.totalQText}>
                        {totalQuestions} Questions
                    </Text>

                    {
                        description
                            ?
                            <Text style={styles.desc}>
                                {description}
                            </Text>
                            :
                            <View height={18} />
                    }
                </View>
            </View>

            <Button
                title={'Start Round'}
                textStyle={{
                    fontSize: 17,
                    color: '#22343C',
                    letterSpacing: 3.09,
                    fontFamily: appConstants.fontBold
                }}
                style={styles['playButton']}
                onPress={() => props.onPlayClick()}
            />

            <Button
                title={'End Game'}
                textStyle={{
                    fontSize: 17,
                    color: '#22343C',
                    letterSpacing: 3.09,
                    fontFamily: appConstants.fontBold,
                }}
                style={styles['endGameButton']}
                onPress={() => props.onEndClick()}
            />
        </View>
    )
}

export default RoundInfoScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    container: {
        marginTop: 20,
        marginHorizontal: 20,
        width: "100%",
        backgroundColor: color.questionBGColor,
        borderRadius: 6,
        overflow: 'hidden',
    },
    infoContainer: {
        paddingHorizontal: 18,
    },
    image: {
        height: 180,
        width: "100%",
        resizeMode: 'cover',
        backgroundColor: 'red',
    },
    title: {
        marginTop: 16,
        color: '#fff',
        fontSize: 30,
    },
    desc: {
        marginVertical: 16,
        color: '#fff',
        fontSize: 16
    },
    totalQText: {
        marginTop: 16,
        color: '#fff',
        fontSize: 16
    },
    playButton: {
        marginTop: 28,
        width: "100%",
        backgroundColor: color.goldenColor,
    },
    endGameButton: {
        marginTop: 16,
        width: "100%",
        backgroundColor: color.fadeRedColor
    },
})
