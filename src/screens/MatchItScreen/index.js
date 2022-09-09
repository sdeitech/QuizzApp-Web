import React, { useState } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
    ScrollView,
    Switch,
    DeviceEventEmitter,
} from 'react-native';
import Slider from '@react-native-community/slider';

import * as validation from '../../utils/validation';
import assests from '../../common/assests';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import TopImagesView from './components/TopImagesView';
import { Button, Input } from '../../components/customComponent';
import constants from './../../utils/appConstants';
import { dynamicSize } from '../../utils/responsive';
import { SLIDER } from './../../utils/enum';
import { Actions } from 'react-native-router-flux';

const basePointDefault = 40;

const MatchIt = (props) => {

    const [seconds, setSeconds] = useState("30");
    const [minutes, setMinutes] = useState("00");

    const [basePointValue, setbasePointValue] = useState(basePointDefault);

    const [isWords, setisWords] = useState(true);

    const [words, setwords] = useState("");
    const [wordStatus, setwordStatus] = useState({ status: true, error: '' });
    const [isVaildWords, setisVaildWords] = useState(false);

    /**
     * Type == 1  Positive
     * Type == 2  Negative
     */
     const handleTimerClick = (type) => {
        
        let valueMinutes = parseInt(minutes) * 60;
        let valueSecond = parseInt(seconds);

        valueSecond = valueMinutes + valueSecond;

        if (type == 1) {//Plus Click
            // if (parseInt(valueMinutes) == 5) { return }
            // if (valueSecond == 59) {
            //     valueSecond = "00"
            //     if (parseInt(valueMinutes) == 0) {
            //         valueMinutes = "01"
            //     } else if (parseInt(valueMinutes) == 1) {
            //         valueMinutes = "02"
            //     } else if (parseInt(valueMinutes) == 2) {
            //         valueMinutes = "03"
            //     } else if (parseInt(valueMinutes) == 3) {
            //         valueMinutes = "04"
            //     } else if (parseInt(valueMinutes) == 4) {
            //         valueMinutes = "05"
            //     }
            // } else {
            //     if (valueSecond < 9) {
            //         valueSecond = "0" + (valueSecond + 5)
            //     } else {
            //         valueSecond = valueSecond + 5
            //     }
            // }

            if (valueSecond < 300) valueSecond = valueSecond + 5;

        }
        else { //Minus Click
            // let valueMinutes = minutes
            // let valueSecond = parseInt(seconds)
            // if (parseInt(valueSecond) == 30 && parseInt(valueMinutes) == 0) { return }
            // if (valueSecond == 0) {
            //     valueSecond = 59
            //     if (parseInt(valueMinutes) == 1) {
            //         valueMinutes = "00"
            //     } else if (parseInt(valueMinutes) == 2) {
            //         valueMinutes = "01"
            //     } else if (parseInt(valueMinutes) == 3) {
            //         valueMinutes = "02"
            //     } else if (parseInt(valueMinutes) == 4) {
            //         valueMinutes = "03"
            //     } else if (parseInt(valueMinutes) == 5) {
            //         valueMinutes = "04"
            //     }
            // } else {
            //     if (valueSecond < 11) {
            //         valueSecond = "0" + (valueSecond - 5)
            //     } else {
            //         valueSecond = valueSecond - 5
            //     }
            // }
            // setSeconds(valueSecond.toString())
            // setMinutes(valueMinutes.toString())

            if (valueSecond > 30) valueSecond = valueSecond - 5;
        }

        console.log("value minutes => ", valueMinutes);
        console.log("value seconds => ", valueSecond);

        valueMinutes = new Date("", "", "", "", "", valueSecond).getMinutes();
        valueSecond = new Date("", "", "", "", "", valueSecond).getSeconds();

        if (valueMinutes < 10) valueMinutes = `0${valueMinutes}`;
        if (valueSecond < 10) valueSecond = `0${valueSecond}`;

        setMinutes(valueMinutes.toString())
        setSeconds(valueSecond.toString())
    }

    const onTextChange = () => () => {

    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'MatchIt'}
            />
            <View style={styles.innerContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, paddingTop: 20 }}
                >
                    <View style={{ marginHorizontal: 24 }}>


                        <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                            <Image source={assests.negativeSign} />
                            <Text style={{ fontSize: 13, letterSpacing: 1.33, textAlign: 'left', fontFamily: appConstants.AirbnbCerealAppMedium, color: '#fff', marginHorizontal: 8 }}>{'Words'}</Text>
                            <Switch
                                trackColor={{ false: "#324B55", true: "#88D8B8" }}
                                thumbColor={isWords ? 'white' : "#88D8B8"}
                                ios_backgroundColor="#324B55"
                                onValueChange={() => setisWords(!isWords)}
                                value={isWords}
                            />
                            <TouchableOpacity>
                                <Image style={{ marginLeft: 5 }} source={assests.info2} />
                            </TouchableOpacity>
                        </View>

                        <View height={20} />

                        {
                            isWords
                                ?
                                <Input
                                    onChangeText={onTextChange("title")}
                                    value={words}
                                    setValue={'11111'}
                                    keyboardType={'default'}
                                    style={{ width: '100%' }}
                                    blurOnSubmit={false}
                                    placeholder={constants.WORDS_TEXT}
                                    icon={assests.title}
                                    isFiledImage
                                    autoCapitalize={'none'}
                                    source={isVaildWords ? assests.info : (validation.isEmpty(words) ? '' : assests.check)}
                                    labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                                    errorMessage={wordStatus['error']}
                                />
                                :
                                <TopImagesView />
                        }

                        <View height={10} />

                        <View style={{ marginTop: 29, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <Image source={assests.clock} />
                            <Text style={{ fontSize: 13, letterSpacing: 1.33, textAlign: 'left', fontFamily: appConstants.fontReqular, color: '#fff', marginLeft: 10 }}>Time Limit</Text>
                            <TouchableOpacity onPress={() => handleTimerClick(2)} style={{ marginLeft: 17 }}>
                                {/* setTimerValue(timervalue > 1 ? timervalue - 1 : timervalue)}  */}
                                <Image source={assests.minus} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontFamily: appConstants.fontReqular, letterSpacing: 2.04, textAlign: 'left', marginLeft: 8, color: '#fff' }} placeholder={'00'}>
                                {minutes + ":" + seconds}
                            </Text>
                            <TouchableOpacity onPress={() => handleTimerClick(1)} style={{ marginLeft: 7, }}>
                                {/* setTimerValue(timervalue < 60 ? timervalue + 1 : timervalue) */}
                                <Image source={assests.pluss} />
                            </TouchableOpacity>
                        </View>


                        <View style={{ marginTop: 30 }}>
                            <Text style={{ color: '#fff', fontFamily: appConstants.fontReqular, fontSize: 13, letterSpacing: 1.33 }}>Base Points (0-100)</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={SLIDER.steps}
                                    onValueChange={(value) => setbasePointValue(value)}
                                    value={basePointValue}
                                    maximumTrackTintColor={'#274552'}
                                    minimumTrackTintColor={'#FCD274'}
                                    style={{ width: '100%', marginTop: 13, flex: 1, }} />
                                <Text style={[styles.sliderTxt, { marginTop: 10, }]}>{basePointValue}</Text>
                            </View>
                        </View>

                        <Button
                            title={'Submit'}
                            textStyle={styles.buttonText}
                            style={styles['submitButton']}
                            onPress={() => {
                                Actions.popTo("roundTryScreen");
                                DeviceEventEmitter.emit('RoundUpdate');
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default MatchIt;
