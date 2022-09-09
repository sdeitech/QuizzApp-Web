import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Text,
    ScrollView,
    ImageBackground,
    Alert,
    TouchableOpacity,
    TextInput
} from 'react-native';

import { styles } from './styles';
// components
import appConstants from '../../common/appConstants';
import { SLIDER } from './../../utils/enum';
import MaineHeader from '../../common/headerWithText'
import assests from '../../common/assests';
import { Actions } from 'react-native-router-flux';
import { useSelector, useDispatch } from 'react-redux'
import Slider from '@react-native-community/slider';
import {
    CommonText,
    TouchableIcon,
    KeyboardAwareScroll,
    Button,
    InputIcons,
    Input,
    Loader,
} from '../../components/customComponent';
import { PreDefinedPop, QuestionTypePop, QuestionCat } from '../../common/alertPop'

function DiscussionDetails(props) {

    const [isPreDefined, setisPreDefined] = useState(false);
    const [selectedPre, setselectedPre] = useState('');
    const [preDefineText, setPreDefineText] = useState('Choose Type');

    const [questionType, setquestionType] = useState(false);
    const [selectedQuestionType, setselectedQuestionType] = useState('Single Select');
    const [questionTypeText, setQuestionTypeText] = useState('Single Select');

    const [questionCatType, setquestionCatType] = useState(false);
    const [selectedQuestionCatType, setselectedQuestionCatType] = useState('');
    const [questionTypeCatText, setQuestionTypeCatText] = useState('Choose Category');

    const [popUpTitle, setPopTitle] = useState('');

    const [maxQueValue, setMaxQueValue] = useState(0)
    const [maxBasePointValue, setMaxBasePointValue] = useState(0)
    const [maxNegBasePointValue, setNegBasePointValue] = useState(0)

    const _onQuestionType = (value) => {
        setselectedQuestionType(value)
        // setQuestionTypeText(selectedQuestionType)
        setquestionType(false)
    }

    const _onQuestionCatType = () => {
        setQuestionTypeCatText(selectedQuestionCatType)
        setquestionCatType(false)
    }

    const _onPreDefindedText = () => {
        setPreDefineText(selectedPre)
        setisPreDefined(false)
    }
    const _selectCat = () => {
        setPopTitle('Select Question category')
        setisScore(true)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Generate Questions'}
            />
            <ScrollView style={{ flex: 1, backgroundColor: '#22343C' }}>
                <View style={styles.innerContainer}>
                    <InputIcons
                        containerStyle={{ marginTop: 40 }}
                        icon={assests.help}
                        title={'Question Category'}
                        placeholder={'Quiz'}
                        info={true}
                        value={questionTypeCatText}
                        onPress={() => setquestionCatType(true)}
                        touch={true}
                    />
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ color: '#fff', fontFamily: appConstants.fontReqular, fontSize: 13, letterSpacing: 1.33 }}>Number of Questions (1-30)</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Slider
                                minimumValue={0}
                                maximumValue={30}
                                step={SLIDER.steps}
                                onValueChange={(value) => setMaxQueValue(value)}
                                maximumTrackTintColor={'#274552'}
                                minimumTrackTintColor={'#FCD274'}
                                style={{ width: '100%', marginTop: 13, flex: 1, }}
                            />
                            <Text style={[styles.sliderTxt, { marginTop: 10, }]}>{maxQueValue}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ color: '#fff', fontFamily: appConstants.fontReqular, fontSize: 13, letterSpacing: 1.33 }}>Base Points (0-100)</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Slider
                                minimumValue={0}
                                maximumValue={100}
                                step={SLIDER.steps}
                                onValueChange={(value) => setMaxBasePointValue(value)}
                                maximumTrackTintColor={'#274552'}
                                minimumTrackTintColor={'#FCD274'}
                                style={{ width: '100%', marginTop: 13, flex: 1, }} />
                            <Text style={[styles.sliderTxt, { marginTop: 10, }]}>{maxBasePointValue}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ color: '#fff', fontFamily: appConstants.fontReqular, fontSize: 13, letterSpacing: 1.33 }}>Negative Base Points (0-100)</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Slider
                                minimumValue={0}
                                maximumValue={100}
                                step={SLIDER.steps}
                                onValueChange={(value) => setNegBasePointValue(value)}
                                maximumTrackTintColor={'#274552'}
                                minimumTrackTintColor={'#FCD274'}
                                style={{ width: '100%', marginTop: 13, flex: 1, }}
                            />
                            <Text style={[styles.sliderTxt, { marginTop: 10, }]}>{maxNegBasePointValue}</Text>
                        </View>
                    </View>

                    <InputIcons
                        containerStyle={{ marginTop: 40 }}
                        icon={assests.help}
                        title={'Select Question Type'}
                        onPress={() => setquestionType(true)}
                        touch={true}
                        info={true}
                        value={selectedQuestionType}
                        placeholder={'Single Select'}
                    />
                    <InputIcons
                        containerStyle={{ marginTop: 40 }}
                        icon={assests.title}
                        title={'Predefined Text Type'}
                        placeholder={'Choose type'}
                        onPress={() => setisPreDefined(true)}
                        touch={true}
                        info={true}
                        value={preDefineText}

                    />
                    <Button
                        title={'Submit'}
                        textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppMedium }}
                        style={styles['signupButton']}
                        onPress={() => console.log('')}
                    />
                </View>

            </ScrollView>
            <PreDefinedPop
                title={popUpTitle}
                isModalVisible={isPreDefined}
                onCancel={() => setisPreDefined(false)}
                selectedLangauge={selectedPre}
                onSetLanguage={(language) => setselectedPre(language)}
                onDonePress={() => _onPreDefindedText()}

            />
            <QuestionTypePop
                title={''}
                isModalVisible={questionType}
                onCancel={() => setquestionType(false)}
                selectedLangauge={selectedQuestionType}
                onSetLanguage={(language) => setselectedQuestionType(language)}
                onDonePress={(text) => _onQuestionType(text)}
            />
            <QuestionCat
                title={'Question Category'}
                isModalVisible={questionCatType}
                onCancel={() => setquestionCatType(false)}
                selectedLangauge={selectedQuestionCatType}
                onSetLanguage={(language) => setselectedQuestionCatType(language)}
                onDonePress={() => _onQuestionCatType()}
            />
        </SafeAreaView>
    );
}
export default DiscussionDetails;
