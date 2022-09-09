import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useSelector } from 'react-redux';

import * as fontFamily from './../utils/fontFamily';
import color from './../utils/color';

const EmptyRoundComponent = (props) => {

    // game socket selector
    const gameReducer = useSelector(state => state.gameReducer);

    const {
        image, title, description,
        totalQuestions, gameType, noOfQuestions,
    } = props.roundDetail;

    const { timeLimit, setcurentQuizTime } = props;

    useEffect(() => {
        let newTimeLimit;
        if (timeLimit < 1000) {
            newTimeLimit = timeLimit * 1000;
        } else {
            newTimeLimit = timeLimit;
        }
        setcurentQuizTime(newTimeLimit);
    }, []);

    console.log("my console is => ", props.roundDetail);

    return null;

    return (
        <View style={styles.topViewContainer}>
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
                // resizeMode={'stretch'}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.title}>
                        {`${title}`}
                    </Text>

                    <Text style={styles.roundType}>
                        {gameType}
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
        </View>
    )
}

export default EmptyRoundComponent

const styles = StyleSheet.create({
    // 1
    topViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        width: "100%",
    },
    container: {
        marginTop: 20,
        marginHorizontal: 20,
        width: "100%",
        backgroundColor: color.subBordorColor, // color.questionBGColor,
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
    },
    title: {
        marginTop: 16,
        color: '#fff',
        fontSize: 30,
    },
    desc: {
        marginVertical: 14,
        color: '#fff',
        fontSize: 16
    },
    roundType: {
        marginTop: 10,
        color: '#fff',
        fontSize: 18,
        fontFamily: fontFamily.avenirBold,
    },
});
