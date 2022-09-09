import React, { useState } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
    FlatList, ScrollView
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { Actions } from 'react-native-router-flux';

import assests from '../../common/assests';
import appConstants from '../../utils/appConstants';
import color from './../../utils/color';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import FooterView from './components/FooterView';
import QuestionComponent from './../../components/QuestionComponent';

const QUESTION_LENGTH = 10;

const answers = [
    { option: "A", name: "Turtle", isSelected: false },
    { option: "B", name: "Cheetah", isSelected: false },
    { option: "C", name: "Rabit", isSelected: false },
    { option: "D", name: "Leapard", isSelected: false },
    { option: "E", name: "Tiger", isSelected: true },
    { option: "F", name: "Rattle Snack", isSelected: false },
];

const ContestPlay = () => {
    const [donequestion, setdonequestion] = useState(2);

    const [chackedIndex, setchackedIndex] = useState(1);

    const [myAnswers, setmyAnswers] = useState(answers);

    const headerRight = () => {
        return (
            <TouchableOpacity onPress={() => { }} style={[styles.headerRightStyle]}>
                <ProgressCircle
                    percent={85}
                    radius={20}
                    borderWidth={3}
                    color={color.goldenColor}
                    shadowColor={'#fff'}
                    bgColor="#324B55"
                >
                    <Text style={styles.headerCircleVal}>2:13</Text>
                </ProgressCircle>
            </TouchableOpacity>
        );
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
                title={'ABC Contest'}
                right={headerRight()}
            />

            {/* main body container */}
            <ScrollView style={styles.innerContainer}>

                <QuestionComponent
                    questionLength={QUESTION_LENGTH}
                    donequestion={donequestion}
                    myAnswers={myAnswers}
                />

                <FooterView />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ContestPlay;
