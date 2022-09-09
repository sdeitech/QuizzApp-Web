import React, { useEffect, useState } from 'react'
import {
    StyleSheet, Text, View,
    TouchableOpacity, Image,Dimensions
} from 'react-native'
import ProgressCircle from 'react-native-progress-circle';

import color from './../../../utils/color';
import * as fontFamily from './../../../utils/fontFamily';
import assests from './../../../common/assests';


const windowHeight = Dimensions.get('window').height;
const AdmHeader = (props) => {
    const {
        title, subTitle, notifyNumbers,
        timeLimits, donequestion, setcurentQuizTime,
        questionTimeEnd, totalTimer, doneClick, isModerator,
        bodyDisplayType, // bodyDisplayType is one type of currently displaying current main view
    } = props;

    const [timerText, settimerText] = useState("0:00");
    const [progressPercentage, setprogressPercentage] = useState(100);


    useEffect(() => {
        let interval = null;

        try {
            if ((timeLimits > 0 || donequestion === 0) && (bodyDisplayType !== 0 && bodyDisplayType !== -1)) {
                console.log("adm header details => ");
                if (interval && doneClick) {
                    console.log("adm header details => clear");
                    clearInterval(interval);
                }
                interval = setInterval(() => {

                    const newMSeconds = timeLimits - 1000;

                    setcurentQuizTime(newMSeconds);
                    // let total_seconds = parseInt(Math.floor(newMSeconds / 1000));
                    // let total_minutes = parseInt(Math.floor(total_seconds / 60));

                    // total_seconds = total_seconds > -1 ? total_seconds : 0;
                    // total_minutes = total_minutes > -1 ? total_minutes : 0;
                    var total_minutes = Math.floor(newMSeconds / 60000);
                    var total_seconds = ((newMSeconds % 60000) / 1000).toFixed(0);

                    total_seconds = total_seconds > -1 ? total_seconds : 0;
                    total_minutes = total_minutes > -1 ? total_minutes : 0;

                    settimerText(`${total_minutes}:${total_seconds}`);

                    const timerPercent = (newMSeconds * 100) / totalTimer;

                    console.log("interval calling timer parent => ", timerPercent);
                    console.log("interval calling new m seconds => ", newMSeconds);
                    console.log("interval calling => total timer => ", totalTimer);

                    setprogressPercentage(Math.ceil(timerPercent));

                    if (newMSeconds === 0) {
                        if (bodyDisplayType !== 0 && bodyDisplayType !== -1) {
                            questionTimeEnd();
                        }

                        if (interval) {
                            clearInterval(interval);
                            interval = null;
                        }
                    }
                }, 1000);
            }
        } catch (error) {
            alert(error)
        }

        return () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }
    }, [donequestion, timeLimits, doneClick, bodyDisplayType]);

    return (
        <View style={styles.header}>
            {/* left side component */}
            <View onPress={() => { }} style={[styles.headerLeftStyle]}>
                {
                    !doneClick && bodyDisplayType !== 0 && bodyDisplayType !== -1 &&
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
                }
            </View>

            {/* center component */}
            <View style={styles.titlesContainer}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
            </View>

            {/* right side component */}
            {
                // !props.isSingle && isModerator
                //     ?
                <TouchableOpacity
                    onPress={() => { props.toggleModeratorOption(true) }}
                    style={styles.dotsContainer}
                >
                    <Image
                        // source={(props.isSingle || !isModerator) ? assests.report_flag : assests.dot}
                        // style={(props.isSingle || !isModerator) ? styles.flagReport : styles.iconDots}
                        source={(props.isSingle) ? assests.report_flag : assests.dot}
                        style={(props.isSingle) ? styles.flagReport : styles.iconDots}
                        resizeMode={"contain"}
                    />
                    {/* {
                            notifyNumbers > 0 &&
                            <Text style={styles.countTxtSty}>{notifyNumbers}</Text>
                        } */}
                </TouchableOpacity>
                // :
                // <View />
            }
        </View >
    )
}

export default AdmHeader

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,                  //15 thi phle
        backgroundColor: '#324B55',
        //height:'7%' , //  
         zIndex:100,
         position:'absolute',
                          
        
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
        left: 4,
        flex: 1,
        paddingHorizontal: 10,
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
    dotsContainer: {
        right: 4,
        width: 20,
        height: 20,
        alignItems: "center",
    },
    iconDots: {
        width: 8,
        height: "100%",
    },
    flagReport: {
        width: "100%",
        height: "100%",
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
