import React, { useEffect, useState } from 'react'
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image
} from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import { Actions } from 'react-native-router-flux';

import { dynamicSize } from '../../../utils/responsive';
import color from './../../../utils/color';
import * as fontFamily from './../../../utils/fontFamily';
import assests from './../../../common/assests';


const AdmHeader = (props) => {
    const [timerText, settimerText] = useState("0:00");
    const [progressPercentage, setprogressPercentage] = useState(100);

    const {
        title, subTitle, notifyNumbers,
        timeLimits, donequestion, setcurentQuizTime,
        questionTimeEnd, totalTimer, doneClick,
    } = props;

    useEffect(() => {
        console.log("interval calling => from use effect =>");

        
        let interval = null;
        if (timeLimits > 0) {
            if (doneClick && interval) clearInterval(interval);
            interval = setInterval(() => {
                console.log("interval calling => ");

                const newMSeconds = timeLimits - 1000;

                setcurentQuizTime(newMSeconds);
                const total_seconds = parseInt(Math.floor(newMSeconds / 1000));
                const total_minutes = parseInt(Math.floor(total_seconds / 60));
                settimerText(`${total_minutes}:${total_seconds}`);

                const timerPercent = (newMSeconds * 100) / totalTimer;
                setprogressPercentage(Math.ceil(timerPercent));

                if (newMSeconds === 0) {
                    questionTimeEnd();
                    if (interval) {
                        clearInterval(interval);
                        interval = null;
                    }
                }
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }
    }, [donequestion, timeLimits, doneClick]);

    return (
        <View style={styles.header}>
            {/* left side component */}
            <View onPress={() => { }} style={[styles.headerLeftStyle]}>
                <ProgressCircle
                    percent={progressPercentage}
                    radius={20}
                    borderWidth={3}
                    color={color.hangmanColor}
                    shadowColor={'#fff'}
                    bgColor="#324B55"
                >
                    <Text style={styles.headerCircleVal}>{timerText}</Text>
                </ProgressCircle>
            </View>

            {/* center component */}
            <View style={styles.titlesContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
            </View>

            {/* right side component */}
            <TouchableOpacity onPress={() => { Actions.notifications() }}>
                <Image
                    source={assests.bell}
                    style={styles.iconBell}
                />
                {
                    notifyNumbers > 0 &&
                    <Text style={styles.countTxtSty}>{notifyNumbers}</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default AdmHeader

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#324B55',
        
    },

    // left
    headerLeftStyle: {
        // backgroundColor: "red",
        // position: 'absolute',
        // padding: dynamicSize(10),
        // backgroundColor: "blue",
    },
    headerCircleVal: {
        fontFamily: fontFamily.avenirBold,
        fontSize: 11,
        color: '#fff',
    },

    // center
    titlesContainer: {
        left: -6,
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: fontFamily.avenirLight,
        fontSize: 18,
    },
    subTitle: {
        color: color.textGray,
        textAlign: 'center',
        fontFamily: fontFamily.avenirLight,
        fontSize: 15.5,
    },
    iconBell: {
        right: 10,
        width: 20,
        height: 26,
    },
    countTxtSty: {
        backgroundColor: color.fadeRedColor,
        // textAlign: 'center',
        fontFamily: appConstants.AirbnbCerealAppLight,
        fontSize: 12,
        color: '#ffffff',
        // paddingHorizontal: 10,
        paddingVertical: 2,
        paddingRight: 14,
        paddingLeft: 6,
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginEnd: 10,
        overflow: 'hidden',
        position: 'absolute',
        top: -6,
        right: -9,
    },
})
