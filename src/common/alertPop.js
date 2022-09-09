import React, { useEffect, useState, useRef } from 'react';
import {
    Image,
    View,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList, Switch, ScrollView,
    ActivityIndicator,
} from 'react-native';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-community/async-storage';

import { Button, Input, InputIcons } from '../components/customComponent';
import * as commonApi from './../ServiceRequests/serviceAuth';
import styles from './styles';
import assests from './assests';
import appConstants from './appConstants'
import constants from './../utils/appConstants'
import { BoxBottomView, BottomBoxView, BottomBox } from '../screens/HomeScreen/Dashboard/bottomBox'
import { dynamicSize, getFontSize } from '../utils/responsive';
import * as validation from '../utils/validation';
import colors from '../utils/color';
import commonStyle from '../components/commonStyle';
import appStrings from '../utils/appConstants';
import color from '../utils/color';
import * as fontFamily from './../utils/fontFamily';

export const PopUpScreen = (props) => {
    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={styles.modalInnerView}>
                {
                    // props.isError
                    // &&
                    <TouchableOpacity
                        onPress={() => props.onCloseModal ? props.onCloseModal() : props._applyAction()}
                        style={{ width: 40, height: 40, top: 4, right: 4, position: "absolute", zIndex: 3 }}
                    >
                        <Image
                            source={assests.crossCir}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </TouchableOpacity>
                }
                <SafeAreaView>
                    <View style={styles.modalHeaderView}>
                        <Image
                            resizeMode={'contain'}
                            style={{
                                height: 90,
                                width: 90,
                            }}
                            source={props.isError ? assests.xMark : assests.checkmark}
                        />
                    </View>
                    <Text style={styles.filterText}>{props.isError ? "Error!" : 'Congratulations!'}</Text>
                    <Text style={styles.categoryText}>{typeof props.msgText === "string" ? props.msgText : JSON.stringify(props.msgText)}</Text>
                    <View style={styles.modalBottomView}>
                        {
                            // !props.isError
                            // &&
                            <View style={{ flex: 1, alignItems: 'center', alignSelf: 'stretch' }}>
                                <Button
                                    style={{ backgroundColor: '#FCD274', width: '50%' }}
                                    textStyle={{ color: '#22343C', fontFamily: appConstants.AirbnbCerealAppLight, letterSpacing: 3.09, fontWeight: '700', fontSize: 16 }}
                                    onPress={() => props._applyAction()}
                                    title={'Done'}
                                />
                            </View>
                        }
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export const RoundTry = (props) => {
    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={styles.modalInnerView}>
                <SafeAreaView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 23, marginLeft: 16, marginRight: 12 }}>
                        <Text style={{ fontSize: 22, color: '#FCD274', fontFamily: appConstants.AirbnbCerealAppBook }}>Add Rounds</Text>
                        <TouchableOpacity onPress={() => props.onCancel()}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 16 }}>
                        <BoxBottomView
                            icons={assests.imgbackground}
                            icons1={assests.imgBackgroundPink}
                            icons2={assests.imgBackgroundRed}
                            color={colors.hangmanColor}
                            color2={colors.matchItColor}
                            color3={colors.unscrambleColor}
                            showCount={props.showCount}
                            count1={props.count1}
                            setCount1={props.setCount1}
                            setMinCount1={props.setMinCount1}
                            visibleCount1={props.visibleCount1}
                            setShowCount={props.isVisibleCount1}


                            visibleCount2={props.visibleCount2}
                            setShowCount2={props.isVisibleCount2}
                            count2={props.count2}
                            setCount2={props.setCount2}
                            setMinCount2={props.setMinCount2}

                            visibleCount3={props.visibleCount3}
                            setShowCount3={props.isVisibleCount3}
                            count3={props.count3}
                            setCount3={props.setCount3}
                            setMinCount3={props.setMinCount3}

                            setIscount1={props.setIscount1}
                            isCount1={props.isCount1}
                            isCount2
                            isCount3
                            boxStyle={{ marginTop: 23 }}

                            // the array of added rounds
                            arrRound={props.arrRound}
                        />

                        <BottomBoxView
                            icons={assests.imgBackgounddYello}
                            icons1={assests.imgBg_gibberish}
                            icons2={assests.imgBackgoundGreen}
                            color={colors.guessGoColor}
                            color2={colors.gibberishColor}
                            color3={colors.bingoColor}
                            showCount={props.showCount}

                            visibleCount4={props.visibleCount4}
                            setShowCount4={props.isVisibleCount4}
                            count4={props.count4}
                            setCount4={props.setCount4}
                            setMinCount4={props.setMinCount4}


                            visibleCount5={props.visibleCount5}
                            setShowCount5={props.isVisibleCount5}
                            count5={props.count5}
                            setCount5={props.setCount5}
                            setMinCount5={props.setMinCount5}


                            visibleCount6={props.visibleCount6}
                            setShowCount6={props.isVisibleCount6}
                            count6={props.count6}
                            setCount6={props.setCount6}
                            setMinCount6={props.setMinCount6}

                            visibleCount7={props.visibleCount7}
                            setShowCount7={props.isVisibleCount7}
                            count7={props.count7}
                            setCount7={props.setCount7}
                            setMinCount7={props.setMinCount7}

                            boxStyle={{ marginTop: 20, marginBottom: 20 }}

                            // the array of added rounds
                            arrRound={props.arrRound}

                            playerType={props.playerType}
                        />

                        {
                            (props.playerType !== 1) &&
                            <BottomBox
                                icons={assests.imgBg_quiz}
                                icons1={assests.imgBackgroundTaboo}
                                icons2={assests.imgBackgroundYe}
                                color={colors.quizzColor}
                                color2={colors.tabooColor}
                                color3={'rgb(40,69,81)'}
                                boxStyle={{ marginTop: 0, marginBottom: 20 }}

                                showCount={props.showCount}

                                visibleCount7={props.visibleCount7}
                                setShowCount7={props.isVisibleCount7}
                                count7={props.count7}
                                setCount7={props.setCount7}
                                setMinCount7={props.setMinCount7}

                                visibleCount8={props.visibleCount8}
                                setShowCount8={props.isVisibleCount8}
                                count8={props.count8}
                                setCount8={props.setCount8}
                                setMinCount8={props.setMinCount8}

                                visibleCount9={props.visibleCount9}
                                setShowCount9={props.isVisibleCount9}
                                count9={props.count9}
                                setCount9={props.setCount9}
                                setMinCount9={props.setMinCount9}

                                // the array of added rounds
                                arrRound={props.arrRound}

                                playerType={props.playerType}

                            // visibleCount5={props.visibleCount5}
                            // setShowCount5={props.isVisibleCount5}
                            // count5={props.count5}
                            // setCount5={props.setCount5}
                            // setMinCount5={props.setMinCount5}
                            />
                        }

                        <Button
                            title={'Done'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], { backgroundColor: '#FCD274', alignSelf: 'center', marginBottom: 20, width: '60%' }]}
                            onPress={() => props._applyAction()}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export const SaveTo = (props) => {
    const [saveto, setsaveto] = useState(props.selectedSaveTo);
    const [savetoName, setsavetoName] = useState('');
    const [getSaveTo, setgetSaveTo] = useState(true);
    const [saveToData, setsaveToData] = useState([]);

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = async () => {
        try {
            const userID = await AsyncStorage.getItem('userid')

            const response = await commonApi.getMyGroups(userID, props.dispatch);

            if (response['status']) {
                // alert(JSON.stringify(response.data.saveTo));
                setsaveToData(response.data.saveTo)
                setgetSaveTo(false);
            } else {
                // alert(response.message)
            }
        } catch (error) {
            // alert(error);
        }
    }

    useEffect(() => {
        if (props.selectedSaveTo && saveToData.length > 0) {
            setsaveto(props.selectedSaveTo);
            const saveToName = saveToData?.find(x => x.saveToId === props.selectedSaveTo);
            setsavetoName(saveToName?.saveToTitle || "");

            if (props.selectedSaveTo) {
                const saveToName = saveToData.find(x => x.saveToId === props.selectedSaveTo);
                setsavetoName(saveToName?.saveToTitle || "");
                props.saveToDataLoad(saveToName?.saveToTitle);
            }
        }
    }, [props.selectedSaveTo, saveToData]);

    const onCancel = () => {
        setsaveto(props.selectedSaveTo);
        setsavetoName('');
        props.onCancel();
    }

    const btnWitdh = saveToData.length > 0 ? '80%' : '45%';
    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55' }}>
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 23, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 22, color: '#FCD274', fontFamily: appConstants.AirbnbCerealAppBook }}>{'Save To'}</Text>
                        <TouchableOpacity onPress={() => onCancel()}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <View style={{ flexDirection: 'row', marginVertical: 15, paddingHorizontal: 16, flexWrap: 'wrap' }}>
                            {
                                saveToData.length > 0
                                    ?
                                    saveToData.map((item, index) => (
                                        <TouchableOpacity
                                            key={item.saveToId}
                                            onPress={() => { setsaveto(item.saveToId); setsavetoName(item.saveToTitle); }}
                                            style={{
                                                marginRight: 16,
                                                backgroundColor: saveto == item.saveToId ? '#608697' : '#22343C',
                                                borderRadius: 5,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                width: "40%",
                                                height: 36,
                                                marginBottom: 20,
                                                paddingHorizontal: 6
                                            }}>
                                            <Text
                                                style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}
                                                numberOfLines={1}
                                            >
                                                {item.saveToTitle}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                    :
                                    <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.fontLight, }}>{constants.SAVE_TO_NOT_FOUND}</Text>
                            }
                        </View>
                    </ScrollView>
                    <View style={saveToData.length > 0 ? { marginHorizontal: 16 } : { marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* <Button
                            title={'Add More'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], { backgroundColor: '#88D8B8', alignSelf: 'center', marginTop: 20, width: '60%', marginBottom: 0, }]}
                            onPress={() => props.onDonePress()}
                        /> */}
                        <Button
                            title={'Done'}
                            textStyle={{ fontSize: 15, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], {
                                backgroundColor: '#FCD274', alignSelf: 'center', marginBottom: 20, marginTop: 15, width: btnWitdh,
                            }]}
                            onPress={() => props.onDonePress(savetoName, saveto)}
                        />
                        {saveToData.length <= 0 && <Button
                            title={'Add Group'}
                            textStyle={{ fontSize: 15, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], {
                                backgroundColor: '#FCD274', alignSelf: 'center', marginBottom: 20, marginTop: 15, width: '45%',
                            }]}
                            onPress={() => props.onAddPress(savetoName, saveto)}
                        />}
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export const LanguagePop = (props) => {
    const [selectedLanguage, setselectedLanguage] = useState(props.selectedLangauge);

    useEffect(() => {
        setselectedLanguage(setselectedLanguage);
    }, [props.selectedLangauge]);

    const onCancle = () => {
        setselectedLanguage(props.selectedLangauge);
        props.onCancel();
    }

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55' }}>
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 23, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 22, color: '#FCD274', fontFamily: appConstants.AirbnbCerealAppBook }}>{'Language'}</Text>
                        <TouchableOpacity onPress={() => onCancle()}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 15, paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => setselectedLanguage('English')}
                            style={{
                                marginRight: 16,
                                backgroundColor: selectedLanguage == 'English' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setselectedLanguage('Hindi')}
                            style={{
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36,
                                backgroundColor: selectedLanguage == 'Hindi' ? '#608697' : '#22343C',
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>Hindi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => setselectedLanguage('Gujarati')}
                            style={{
                                marginRight: 16,
                                backgroundColor: selectedLanguage == 'Gujarati' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118, height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Gujarati</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setselectedLanguage('Marathi')}
                            style={{
                                backgroundColor: selectedLanguage == 'Marathi' ? '#608697' : '#22343C',
                                marginBottom: 15,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>Marathi</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => setselectedLanguage('Tamil')}
                            style={{
                                marginRight: 16,
                                backgroundColor: selectedLanguage == 'Tamil' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118, height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Tamil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setselectedLanguage('Punjabi')}
                            style={{
                                backgroundColor: selectedLanguage == 'Punjabi' ? '#608697' : '#22343C',
                                marginBottom: 15,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>Punjabi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => setselectedLanguage('Spanish')}
                            style={{
                                marginRight: 16,
                                backgroundColor: selectedLanguage == 'Spanish' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118, height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Spanish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setselectedLanguage('Bhojpuri')}
                            style={{
                                backgroundColor: selectedLanguage == 'Bhojpuri' ? '#608697' : '#22343C',
                                marginBottom: 15,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>Bhojpuri</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => setselectedLanguage('Telugu')}
                            style={{
                                marginRight: 16,
                                backgroundColor: selectedLanguage == 'Telugu' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118, height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Telugu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setselectedLanguage('Other')}
                            style={{
                                backgroundColor: selectedLanguage == 'Other' ? '#608697' : '#22343C',
                                marginBottom: 15,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>Other</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View>
                        <FlatList
                            data={['English', 'Hindi']}
                            numColumns={2}
                            renderItem={renderLanguageList}
                        />
                    </View> */}

                    <View style={{ marginHorizontal: 16 }}>
                        <Button
                            title={'Done'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], {
                                backgroundColor: '#FCD274', alignSelf: 'center', marginBottom: 20, marginTop: 15, width: '60%',
                            }]}
                            onPress={() => props.onDonePress(selectedLanguage)}
                        />

                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export const WariningPopUp = (props) => {

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55' }}>
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 23, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 22, color: '#FCD274', fontFamily: appConstants.AirbnbCerealAppBook }}>Save To</Text>
                        <TouchableOpacity onPress={() => props.onCancel()}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppLight, marginHorizontal: 30, marginVertical: 15 }}>Save your data otherwise you will loss it</Text>
                    <View style={{ marginHorizontal: 16 }}>
                        <Button
                            title={'Done'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], { backgroundColor: '#88D8B8', alignSelf: 'center', marginTop: 20, width: '60%', marginBottom: 0, }]}
                            onPress={() => props.onDonePress()}
                        />

                        <Button
                            title={'Cancel'}
                            textStyle={{ fontSize: 17, color: '#FCD274', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, marginHorizontal: 60, borderRadius: 8 }}
                            style={[styles['doneButton'], { backgroundColor: '#324B55', alignSelf: 'center', marginBottom: 20 }]}
                            onPress={() => props.onCancel()}
                        />

                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export const AddImage = (props) => {

    return (
        <Modal
            style={{ backgroundColor: 'red', position: 'absolute', bottom: -20, left: -20, width: "100%" }}
            isVisible={props.isModalVisible}
            hideModalContentWhileAnimating={true}
        >
            <View style={{ backgroundColor: '#324B55', }}>
                {/* <SafeAreaView> */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 23, paddingHorizontal: 16 }}>
                    <TouchableOpacity onPress={() => props.onCancel()}>
                        <Image resizeMode='contain' source={assests.crossCir} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => props.onCamera()} style={{ flexDirection: 'row', marginVertical: 15, marginHorizontal: 30, alignItems: 'center' }}>
                    <Image resizeMode='contain' source={assests.cameraWhite} />
                    <Text style={{ fontSize: 22, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppBook, marginLeft: 12 }}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.onGallery()}
                    style={{
                        flexDirection: 'row',
                        marginVertical: 15,
                        marginHorizontal: 30,
                        alignItems: 'center',
                        marginBottom: (props.isAuido || props.isPhotoLib) ? 15 : 50
                    }}>
                    <Image resizeMode='contain' source={assests.gallary} />
                    <Text style={{ fontSize: 22, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppBook, marginLeft: 12 }}>Gallery</Text>
                </TouchableOpacity>

                {
                    props.isPhotoLib &&
                    <TouchableOpacity
                        onPress={() => props.onPhotoGallery()}
                        style={{ flexDirection: 'row', marginVertical: 15, marginHorizontal: 30, alignItems: 'center', marginBottom: 50 }}
                    >
                        <Image resizeMode='contain' source={assests.gallary} />
                        <Text style={{ fontSize: 22, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppBook, marginLeft: 12 }}>Photo Library</Text>
                    </TouchableOpacity>
                }

                {props.isAuido ?
                    <View>
                        <TouchableOpacity
                            onPress={() => props.onPhotoGallery()}
                            style={{ flexDirection: 'row', marginVertical: 15, marginHorizontal: 30, alignItems: 'center' }}
                        >
                            <Image resizeMode='contain' source={assests.gallary} />
                            <Text style={{ fontSize: 22, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppBook, marginLeft: 12 }}>Photo Library</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.onAudio()}
                            style={{ flexDirection: 'row', marginVertical: 15, marginHorizontal: 30, alignItems: 'center' }}
                        >
                            <Image resizeMode='contain' source={assests.audio} />
                            <Text style={{ fontSize: 22, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppBook, marginLeft: 12 }}>Audio Library</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.onVideo()}
                            style={{ flexDirection: 'row', marginVertical: 15, marginHorizontal: 30, alignItems: 'center' }}
                        >
                            <Image resizeMode='contain' source={assests.video} style={{ width: 26, height: 26 }} />
                            <Text style={{ fontSize: 22, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppBook, marginLeft: 12 }}>Video Library</Text>
                        </TouchableOpacity>

                        <View height={30} />

                        {/* <TouchableOpacity
                            onPress={() => props.onYoutube()}
                            style={{ flexDirection: 'row', marginVertical: 15, marginHorizontal: 30, alignItems: 'center', marginBottom: 50 }}
                        >
                            <Image resizeMode='contain' source={assests.video} style={{ width: 26, height: 26 }} />
                            <Text style={{ fontSize: 22, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppBook, marginLeft: 12 }}>Youtube URL</Text>
                        </TouchableOpacity> */}
                    </View>
                    : null}

                {/* </SafeAreaView> */}
            </View>
        </Modal>
    )
}

export const Alert = (props) => {

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55', borderRadius: 10 }}>
                <SafeAreaView>
                    {console.log('icon::', props.icon)}

                    {
                        !props.isCloseHide &&
                        <TouchableOpacity
                            onPress={() => props.onCancel ? props.onCancel() : props.logout()}
                            style={{ width: 40, height: 40, top: 4, right: 4, position: "absolute", zIndex: 3 }}
                        >
                            <Image
                                source={assests.crossCir}
                                style={{ height: "100%", width: "100%" }}
                            />
                        </TouchableOpacity>
                    }


                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 23, paddingHorizontal: 15 }}>

                        <Image
                            source={assests.warning} // {props.icon ? props.icon : assests.warning}
                            resizeMode={'contain'}
                            style={{ width: 80, height: 80, marginBottom: 20 }}
                        />

                        <Text
                            style={{
                                fontSize: 30,
                                textAlign: 'center',
                                color: '#ffffff',
                                fontFamily: appConstants.AirbnbCerealAppLight,
                                marginBottom: 15
                            }}
                        >
                            Warning
                        </Text>
                        {
                            props?.title &&
                            <Text style={{ fontSize: 20, textAlign: 'center', color: '#ffffff', fontFamily: appConstants.AirbnbCerealAppMedium, marginBottom: 15 }}>
                                {
                                    props.title
                                }
                            </Text>
                        }
                        {/* <TouchableOpacity onPress={() => props.onCancel()}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity> */}
                    </View>
                    {/** Message */}
                    {
                        validation.isEmpty(props.heading) == false ?
                            <Text style={{
                                fontSize: 18, color: '#ffff', textAlign: 'center',
                                fontFamily: appConstants.AirbnbCerealAppBook, marginHorizontal: 30, marginBottom: 15
                            }}>
                                {props.heading}</Text>
                            : null
                    }

                    <View style={{ marginBottom: 15, marginTop: 18, width: "100%", flexDirection: 'row', width: "82%", alignSelf: 'center' }}>
                        <Button
                            title={props?.customYesTitle ? props?.buttonTitle : 'Yes'}
                            textStyle={{
                                fontSize: 17,
                                color: '#22343C',
                                letterSpacing: 3.09,
                                fontFamily: appConstants.AirbnbCerealAppBook,
                                // marginHorizontal: 60,
                                borderRadius: 8
                            }}
                            style={[styles['doneButton'], { backgroundColor: '#FCD274', alignSelf: 'center', flex: 1 }]}
                            onPress={() => props.logout()}
                        />

                        <View width={16} />

                        {
                            props.isHideCancel == undefined ?
                                <Button
                                    title={'No'}
                                    textStyle={{
                                        fontSize: 17,
                                        color: '#22343C',
                                        letterSpacing: 3.09,
                                        fontFamily: appConstants.AirbnbCerealAppBook,
                                        // marginHorizontal: 60,
                                        borderRadius: 8
                                    }}
                                    style={[styles['doneButton'], { backgroundColor: color.fadeRedColor, alignSelf: 'center', marginBottom: 20, marginTop: 20, flex: 1 }]}
                                    onPress={() => props.onCancel()}
                                /> : null
                        }
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export const RoundPopUp = (props) => {

    const [selectedValue, setSelectedValue] = useState('')
    const [isError, setError] = useState('')

    const { option2Disabled } = props;

    /**
     * ClickType == 1 then option 1
     * ClickType == 2 then option 2
     */
    const handleDoneClick = () => {
        props.onDonePress(selectedValue)
        setError(false)
    }

    useEffect(() => {
        setSelectedValue(props.selectedLangauge)
    }, [props])

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55' }}>
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 22, color: '#FCD274', fontFamily: appConstants.AirbnbCerealAppBook, alignSelf: 'center' }}>{props.title}</Text>
                        <TouchableOpacity style={{ backgroundColor: '', padding: 10 }}
                            onPress={() => {
                                setError(false)
                                props.onCancel()
                            }}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginVertical: 15,
                            paddingHorizontal: 16,
                            flexWrap: "wrap"
                        }}
                    >
                        <TouchableOpacity onPress={() => setSelectedValue(props.option1)}
                            style={{
                                marginRight: 16,
                                backgroundColor: selectedValue == props.option1 ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                //  width: 118,
                                height: 36,
                                paddingHorizontal: 15,
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>{props.option1}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setSelectedValue(props.option2)}
                            style={{
                                borderRadius: 5,
                                marginRight: 16,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                //  width: 118,
                                height: 36,
                                paddingHorizontal: 15,
                                backgroundColor: selectedValue == props.option2 ? '#608697' : '#22343C',
                                opacity: option2Disabled ? 0.5 : 1,
                            }}
                            disabled={option2Disabled}
                        >
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>{props.option2}</Text>
                        </TouchableOpacity>

                        {
                            props.option3 &&
                            <TouchableOpacity onPress={() => setSelectedValue(props.option3)}
                                style={{
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    //  width: 118,
                                    height: 36,
                                    paddingHorizontal: 15,
                                    backgroundColor: selectedValue == props.option3 ? '#608697' : '#22343C',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#ffff',
                                        fontFamily: appConstants.AirbnbCerealAppMedium
                                    }}
                                >
                                    {props.option3}
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                    {
                        isError ? <Text
                            style={commonStyle.errorTextPopup}>{appStrings.PLEASE_SELECT_ANY_OPTION}</Text>
                            : null
                    }
                    <View style={{ marginHorizontal: 16 }}>
                        <Button
                            title={'Done'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], {
                                backgroundColor: '#FCD274', alignSelf: 'center', marginBottom: 20, marginTop: 15, width: '60%',
                            }]}
                            onPress={() => handleDoneClick()}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export const HashTag = (props) => {

    const [inputValue, setInputValue] = useState()
    const [isError, setIsError] = useState(false)

    const handleDoneClick = () => {
        console.log('inputValue::', inputValue);
        if (validation.isEmpty(inputValue)) {
            setIsError(true)
        } else {
            props.onDonePress()
            setInputValue('')
            setIsError(false)
        }
    }

    const handleOnChangeText = (value) => {
        setInputValue(value)
        setIsError(false)
        props.onChangeText(value)
    }

    const handleCancelClick = () => {
        setInputValue('')
        setIsError(false)
        props.onCancel()
    }

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55' }}>
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 23, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 22, color: '#FCD274', fontFamily: appConstants.AirbnbCerealAppBook }}>{props.title}</Text>
                        <TouchableOpacity onPress={() => handleCancelClick()}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 16 }}>
                        <TextInput
                            placeholderTextColor={'#747474'}
                            value={props.value}
                            onChangeText={(text) => handleOnChangeText(text)}
                            style={{
                                fontSize: 18,
                                color: '#747474',
                                marginTop: 10,
                            }}
                            placeholder={'Type hashtag'}
                        />
                        <View style={{ height: 1, backgroundColor: '#fff', width: '100%', marginTop: 10 }} />
                        {
                            isError ?
                                <Text style={commonStyle.errorTextPopup}>{'Please type hashtag'}</Text>
                                : null
                        }
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginVertical: 15, paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => props.onSetLanguage(props.option1)}
                            style={{
                                marginRight: 16,
                                backgroundColor: props.selectedLangauge == props.option1 ? '#22343C' : '#608697',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>{props.option1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.onSetLanguage(props.option2)}
                            style={{
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36,
                                backgroundColor: props.selectedLangauge == props.option2 ? '#22343C' : '#608697',
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>{props.option2}</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ marginHorizontal: 16 }}>

                        <Button
                            title={'Done'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], {
                                backgroundColor: '#FCD274', alignSelf: 'center', marginBottom: 20, marginTop: 15, width: '60%',
                            }]}
                            onPress={() => handleDoneClick()}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export const AnswersPop = (props) => {

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleDoneClick = () => {
        props.onDonePress()
    }

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55' }}>
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 23, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 22, color: '#FCD274', fontFamily: appConstants.AirbnbCerealAppBook }}>{props.title}</Text>
                        <TouchableOpacity onPress={() => props.onCancel()}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 16 }}>
                        <TextInput
                            placeholderTextColor={'#747474'}
                            value={props.value}
                            onChangeText={props.onChangeText}
                            style={{
                                fontSize: 18,
                                color: '#FFFFFF',
                                marginTop: 10,
                                fontFamily: appConstants.AirbnbCerealAppBook,
                            }}
                            placeholder={props.placeHolder}   //{'Type hashtag'}
                            multiline={true}
                        />
                        <View style={{ height: 1, backgroundColor: '#fff', width: '100%', marginTop: 10 }} />

                    </View>

                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 20 }}>
                        <Image source={assests.global} style={{ marginRight: 12, alignSelf: 'center' }} />
                        <Text style={{
                            fontSize: getFontSize(16),
                            color: '#FFFFFF',
                            fontFamily: appConstants.AirbnbCerealAppMedium,
                            flex: 1, alignSelf: 'center'
                        }}>{'Show Correct Answer'}</Text>
                        <Switch
                            trackColor={{ false: "#22343C", true: "#22343C" }}
                            thumbColor={isEnabled ? "#88D8B8" : "#88D8B8"}
                            ios_backgroundColor="#22343C"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View> */}

                    <View style={{ marginHorizontal: 16 }}>

                        <Button
                            title={props.buttonText || 'Done'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], {
                                backgroundColor: '#FCD274', alignSelf: 'center', marginBottom: 20, marginTop: 15, width: '60%',
                            }]}
                            onPress={() => props.onDonePress()}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export const PreDefinedPop = (props) => {

    const [isErrorShow, setErrorShow] = useState(false)

    const setSelectedValue = (value) => {
        setErrorShow(false)
        props.onSetLanguage(value)
    }

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55' }}>
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 23, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 22, color: '#FCD274', fontFamily: appConstants.AirbnbCerealAppBook }}>{'Predefined Text Type'}</Text>
                        <TouchableOpacity onPress={() => {
                            props.onCancel()
                            setErrorShow(false)
                        }}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => setSelectedValue('Guess the Celebrity')}
                            style={{
                                marginRight: 16,
                                backgroundColor: props.selectedLangauge == 'Guess the Celebrity' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 200,
                                height: 50
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Guess the Celebrity</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedValue('Guess the Spot')}
                            style={{
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 200,
                                height: 50,
                                marginTop: 10,
                                marginRight: 16,

                                backgroundColor: props.selectedLangauge == 'Guess the Spot' ? '#608697' : '#22343C',
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>Guess the Spot</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setSelectedValue('Guess the Movie')}
                            style={{
                                marginRight: 16,
                                backgroundColor: props.selectedLangauge == 'Guess the Movie' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 200,
                                height: 50,
                                marginTop: 10
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Guess the Movie</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setSelectedValue('Identify the Location')}
                            style={{
                                marginRight: 16,
                                backgroundColor: props.selectedLangauge == 'Identify the Location' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 200,
                                height: 50,
                                marginTop: 10
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Identify the Location</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setSelectedValue('Identify the country from flag')}
                            style={{
                                marginRight: 16,
                                backgroundColor: props.selectedLangauge == 'Identify the country from flag' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 200,
                                height: 50,
                                marginTop: 10
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, textAlign: 'center' }}>Identify the country from flag</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setSelectedValue('Identify the inventor')}
                            style={{
                                marginRight: 16,
                                backgroundColor: props.selectedLangauge == 'Identify the inventor' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 200,
                                height: 50,
                                marginTop: 10
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, textAlign: 'center' }}>Identify the inventor</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        isErrorShow ?
                            <Text style={commonStyle.errorTextPopup}>{appStrings.PLEASE_SELECT_ANY_OPTION}</Text>
                            : null
                    }

                    <View style={{ marginHorizontal: 16 }}>
                        <Button
                            title={'Done'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], {
                                backgroundColor: '#FCD274', alignSelf: 'center', marginBottom: 20, marginTop: 15, width: '60%',
                            }]}
                            onPress={() => {
                                if (validation.isEmpty(props.selectedLangauge)) {
                                    setErrorShow(true); return
                                }
                                props.onDonePress()
                            }}
                        />

                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}


export const QuestionTypePop = (props) => {

    const [isErrorShow, setErrorShow] = useState(false)

    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => {
        setSelectedValue(props.selectedLangauge)
    }, [props])

    const handleDoneClick = () => {
        props.onDonePress(selectedValue)
    }

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55' }}>
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 23, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 22, color: '#FCD274', fontFamily: appConstants.AirbnbCerealAppBook }}>{'Question Type'}</Text>
                        <TouchableOpacity onPress={() => {
                            props.onCancel()
                            setErrorShow(false)
                        }}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 15, paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => setSelectedValue('Single Select')}
                            style={{
                                marginRight: 16,
                                backgroundColor: selectedValue == 'Single Select' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Single Select</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedValue('Multi Select')}
                            style={{
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36,
                                backgroundColor: selectedValue == 'Multi Select' ? '#608697' : '#22343C',
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>Multi Select</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 16, }}>
                        <TouchableOpacity onPress={() => setSelectedValue('Free Text')}
                            style={{
                                marginRight: 16,
                                backgroundColor: selectedValue == 'Free Text' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Free Text</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedValue('Flashcard')}
                            style={{
                                opacity: props?.scoringType === "Automatic" ? 0.5 : 1,
                                backgroundColor: selectedValue == 'Flashcard' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}
                            disabled={props?.scoringType === "Automatic"}
                        >
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Flashcard</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginTop: 15 }}>
                        <TouchableOpacity onPress={() => setSelectedValue('True or False')}
                            style={{
                                marginRight: 16,
                                backgroundColor: selectedValue == 'True or False' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>True or False</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        isErrorShow ?
                            <Text style={commonStyle.errorTextPopup}>{appStrings.PLEASE_SELECT_ANY_OPTION}</Text>
                            : null
                    }

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            title={'Done'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], {
                                backgroundColor: '#FCD274', alignSelf: 'center', marginBottom: 20, marginTop: 15, width: '60%',
                            }]}
                            onPress={() => handleDoneClick()}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

export const QuestionCat = (props) => {

    const [isErrorShow, setErrorShow] = useState(false)
    const setSelectedValue = (value) => {
        setErrorShow(false)
        props.onSetLanguage(value)
    }

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55' }}>
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 23, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 22, color: '#FCD274', fontFamily: appConstants.AirbnbCerealAppBook }}>{props.title}</Text>
                        <TouchableOpacity onPress={() => {
                            props.onCancel()
                            setErrorShow(false)
                        }}>
                            <Image resizeMode='contain' source={assests.crossCir} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 15, paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => setSelectedValue('Audio')}
                            style={{
                                marginRight: 16,
                                backgroundColor: props.selectedLangauge == 'Audio' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Audio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedValue('Video')}
                            style={{
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36,
                                backgroundColor: props.selectedLangauge == 'Video' ? '#608697' : '#22343C',
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>Video</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                        <TouchableOpacity onPress={() => setSelectedValue('Image')}
                            style={{
                                marginRight: 16,
                                backgroundColor: props.selectedLangauge == 'Image' ? '#608697' : '#22343C',
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118, height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium, }}>Image</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => setSelectedValue('Quiz')}
                            style={{
                                backgroundColor: props.selectedLangauge == 'Quiz' ? '#608697' : '#22343C',
                                marginBottom: 15,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: 118,
                                height: 36
                            }}>
                            <Text style={{ fontSize: 16, color: '#ffff', fontFamily: appConstants.AirbnbCerealAppMedium }}>Quiz</Text>
                        </TouchableOpacity> */}
                    </View>
                    {
                        isErrorShow ?
                            <Text style={commonStyle.errorTextPopup}>{appStrings.PLEASE_SELECT_ANY_OPTION}</Text>
                            : null
                    }

                    <View style={{ marginHorizontal: 16 }}>
                        <Button
                            title={'Done'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, borderRadius: 8 }}
                            style={[styles['doneButton'], {
                                backgroundColor: '#FCD274', alignSelf: 'center', marginBottom: 20, marginTop: 15, width: '60%',
                            }]}
                            onPress={() => {
                                console.log('props.selectedLangauge::', props.selectedLangauge);
                                if (validation.isEmpty(props.selectedLangauge)) {
                                    setErrorShow(true); return
                                }
                                props.onDonePress()
                            }}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    )
}

// contest details set password open after click on play button
export const SetPasswordAlert = (props) => {
    const [password, setpassword] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [clicked, setclicked] = useState(false);

    const [isPassVisible, setisPassVisible] = useState(false);

    useEffect(() => {
        if (!props.isModalVisible) {
            setclicked(false);
            setpassword('');
            setdisplayName('');
        }
    }, [props.isModalVisible])

    const _onPasswordChange = (text) => {
        setclicked(true);
        setpassword(text);
    }

    const _onNameChange = (text) => {
        setclicked(true);
        setdisplayName(text);
    }

    const _onValidation = () => {
        setclicked(true);
        if (!validation.isEmpty(displayName) && (validation.isEmpty(password) || password.length >= 6)) {
            props.onDoneClick(displayName, password);
        }
    }

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55', borderRadius: 6 }}>
                <SafeAreaView>
                    {/* top heading view */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 23 }}>
                        <Text
                            style={{
                                fontSize: 30,
                                textAlign: 'center',
                                color: '#ffffff',
                                fontFamily: appConstants.fontBold,
                            }}
                        >
                            {props.title || ""}
                        </Text>

                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                                color: '#ffffff',
                                fontFamily: appConstants.AirbnbCerealAppLight,
                                marginHorizontal: 20,
                                marginBottom: 20,
                                display: !props.desc ? 'none' : undefined
                            }}
                        >
                            {props.desc || ""}
                        </Text>
                    </View>

                    {/* game display name view */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, paddingHorizontal: 4 }}>
                        <View style={{ width: "90%", paddingBottom: 10, borderBottomWidth: 0.6, borderBottomColor: '#fff' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Image
                                    style={{ height: 16, width: 14 }}
                                    source={assests.title}
                                    resizeMode='contain'
                                />
                                <Text style={{
                                    left: 6,
                                    fontFamily: appConstants.AirbnbCerealAppBold,
                                    color: '#fff',
                                    letterSpacing: 1
                                }} >Display Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 }}>
                                <TextInput
                                    value={displayName}
                                    onChangeText={_onNameChange}
                                    style={{ color: '#747474', fontSize: 16, flex: 1, marginRight: 10, paddingVertical: 0 }}
                                />
                                <Image
                                    source={validation.isEmpty(displayName) ? (clicked ? assests.info : '') : assests.check}
                                    style={{ height: 16, width: 16 }}
                                    resizeMode={'stretch'}
                                />
                            </View>
                        </View>
                        {
                            validation.isEmpty(displayName) && clicked &&
                            <Text style={{ textAlign: 'left', width: '90%', top: 6, left: 4, color: colors.fadeRedColor }}>
                                Please enter Display Name
                            </Text>
                        }
                    </View>

                    {/* seperator view */}
                    <View height={18} />

                    {/* game password input view */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, paddingHorizontal: 4 }}>
                        <View style={{ width: "90%", paddingBottom: 10, borderBottomWidth: 0.6, borderBottomColor: '#fff' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Image
                                    style={{ height: 16, width: 16 }}
                                    source={assests.lock}
                                    resizeMode='contain'
                                />
                                <Text style={{
                                    left: 6,
                                    fontFamily: appConstants.AirbnbCerealAppBold,
                                    color: '#fff',
                                    letterSpacing: 1
                                }} >Game Password</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 }}>
                                <TextInput
                                    value={password}
                                    onChangeText={_onPasswordChange}
                                    style={{ color: 'gray', fontSize: 16, flex: 1, marginRight: 10, paddingVertical: 0 }}
                                    secureTextEntry={!isPassVisible}
                                />
                                <Image
                                    source={(password.length < 6) ? (clicked && password !== '' ? assests.info : '') : assests.check}
                                    style={{ height: 16, width: 16, marginRight: 10 }}
                                    resizeMode={'stretch'}
                                />
                                <TouchableOpacity onPress={() => setisPassVisible(!isPassVisible)} style={{ marginRight: 10 }}>
                                    <Image source={!isPassVisible ? assests.hideEye : assests.eye} resizeMode='stretch' style={{ alignSelf: 'center' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            password !== '' && password.length < 6 && clicked &&
                            <Text style={{ textAlign: 'left', width: '90%', top: 6, left: 4, color: colors.fadeRedColor }}>
                                Please Game Password minimum size must me 6
                            </Text>
                        }
                    </View>


                    <View style={{ marginBottom: 26, marginTop: 16 }}>
                        <Button
                            title={props.buttonTitle}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, marginHorizontal: 60, borderRadius: 8 }}
                            style={[styles['doneButton'], { backgroundColor: '#88D8B8', alignSelf: 'center', width: "90%" }]}
                            onPress={() => _onValidation()}
                        />

                        <View height={10} />

                        <Button
                            title={props.cancelTitle}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, marginHorizontal: 60, borderRadius: 8 }}
                            style={[styles['doneButton'], { backgroundColor: color.fadeRedColor, alignSelf: 'center', width: "90%" }]}
                            onPress={() => props.onBackClick()}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}

// contest details set password open after click on play button
export const ReportModal = (props) => {
    const [feedback, setFeedback] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [clicked, setclicked] = useState(false);

    // * state for show report message
    const [repoerErrorMessage, setrepoerErrorMessage] = useState("");

    useEffect(() => {
        if (!props.isModalVisible) {
            setclicked(false);
            setFeedback('');
            setdisplayName('');
        }
    }, [props.isModalVisible])

    const _onDetailChange = (text) => {
        setclicked(true);
        setFeedback(text);
    }

    const _onValidation = () => {
        setclicked(true);
        setrepoerErrorMessage("");
        if (!validation.isEmpty(feedback)) {
            props.onDoneClick(feedback);
        } else {
            setrepoerErrorMessage("Please enter valid details");
        }
    }

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55', borderRadius: 6 }}>
                <SafeAreaView>
                    {/* top heading view */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 23 }}>
                        <Text
                            style={{
                                fontSize: 30,
                                textAlign: 'center',
                                color: '#ffffff',
                                fontFamily: appConstants.fontBold,
                            }}
                        >
                            {props.title || ""}
                        </Text>

                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                                color: '#ffffff',
                                fontFamily: appConstants.AirbnbCerealAppLight,
                                marginHorizontal: 20,
                                marginBottom: 20,
                                display: !props.desc ? 'none' : undefined
                            }}
                        >
                            {props.desc || ""}
                        </Text>
                    </View>

                    {/* game display report view */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, paddingHorizontal: 4 }}>
                        <View style={{ width: "90%", paddingBottom: 10, borderBottomWidth: 0.6, borderBottomColor: '#fff' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{
                                    left: 6,
                                    fontFamily: appConstants.AirbnbCerealAppBold,
                                    color: '#fff',
                                    letterSpacing: 1
                                }} >Report details</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 }}>
                                <TextInput
                                    value={feedback}
                                    multiline={true}
                                    onChangeText={_onDetailChange}
                                    style={{ color: '#747474', fontSize: 16, flex: 1, marginRight: 10, paddingVertical: 0 }}
                                />
                            </View>
                        </View>
                        {
                            repoerErrorMessage.length !== 0 &&
                            <Text
                                style={{
                                    color: color.fadeRedColorDark,
                                    marginTop: 10,
                                    textAlign: 'left',
                                    alignSelf: "stretch",
                                    paddingHorizontal: 14,
                                }}
                            >
                                {repoerErrorMessage}
                            </Text>
                        }
                    </View>

                    {/* seperator view */}
                    <View height={18} />

                    {
                        props?.reportStatusLoading
                            ?
                            <ActivityIndicator style={{ marginBottom: 40, marginTop: 16 }} color={color['white']} />
                            :
                            <View style={{ marginBottom: 26, marginTop: 16 }}>
                                <Button
                                    title={'Report'}
                                    textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, marginHorizontal: 60, borderRadius: 8 }}
                                    style={[styles['doneButton'], { backgroundColor: '#88D8B8', alignSelf: 'center', width: "90%" }]}
                                    onPress={() => _onValidation()}
                                />

                                <View height={10} />

                                <Button
                                    title={props.cancelTitle}
                                    textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, marginHorizontal: 60, borderRadius: 8 }}
                                    style={[styles['doneButton'], { backgroundColor: color.fadeRedColor, alignSelf: 'center', width: "90%" }]}
                                    onPress={() => props.onBackClick()}
                                />
                            </View>
                    }
                </SafeAreaView>
            </View>
        </Modal>
    );
}

// add my group popup
export const AddMyGroupPopUp = (props) => {
    const [name, setname] = useState('');
    const [clicked, setclicked] = useState(false);

    useEffect(() => {
        if (!props.isModalVisible) {
            setclicked(false);
            setname('');
        } else {
            if (props.updateText) {
                setname(props.updateText);
            }
        }
    }, [props.isModalVisible])

    const _onNameChange = (text) => {
        setclicked(true);
        setname(text);
    }

    const _onValidation = () => {
        setclicked(true);
        if (!validation.isEmpty(name)) {
            if (props.updateText) {
                props.onUpdateClick(name);
            } else {
                props.onDoneClick(name);
            }
        }
    }

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55', borderRadius: 6 }}>
                <SafeAreaView>
                    {/* top heading view */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 23 }}>
                        <Text
                            style={{
                                fontSize: 30,
                                textAlign: 'center',
                                color: '#ffffff',
                                fontFamily: appConstants.fontBold,
                            }}
                        >
                            {props.title || ""}
                        </Text>

                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                                color: '#ffffff',
                                fontFamily: appConstants.AirbnbCerealAppLight,
                                marginHorizontal: 20,
                                marginBottom: 20,
                                display: !props.desc ? 'none' : undefined
                            }}
                        >
                            {props.desc || ""}
                        </Text>
                    </View>

                    {/* game display name view */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, paddingHorizontal: 4 }}>
                        <View style={{ width: "90%", paddingBottom: 10, borderBottomWidth: 0.6, borderBottomColor: '#fff' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Image
                                    style={{ height: 16, width: 14 }}
                                    source={assests.title}
                                    resizeMode='contain'
                                />
                                <Text style={{
                                    left: 6,
                                    fontFamily: appConstants.AirbnbCerealAppBold,
                                    color: '#fff',
                                    letterSpacing: 1
                                }} >Group Name</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 }}>
                                <TextInput
                                    value={name}
                                    onChangeText={_onNameChange}
                                    style={{ color: 'gray', fontSize: 16, flex: 1, marginRight: 10, paddingVertical: 0 }}
                                />
                                <Image
                                    source={validation.isEmpty(name) ? (clicked ? assests.info : '') : assests.check}
                                    style={{ height: 16, width: 16 }}
                                    resizeMode={'stretch'}
                                />
                            </View>
                        </View>
                        {
                            validation.isEmpty(name) && clicked &&
                            <Text style={{ textAlign: 'left', width: '90%', top: 6, left: 4, color: colors.fadeRedColor }}>
                                Please enter name
                            </Text>
                        }
                    </View>

                    <View style={{ marginBottom: 26, marginTop: 16 }}>
                        <Button
                            title={props.buttonTitle}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, marginHorizontal: 60, borderRadius: 8 }}
                            style={[styles['doneButton'], { backgroundColor: '#88D8B8', alignSelf: 'center', width: "90%" }]}
                            onPress={() => _onValidation()}
                        />

                        <View height={10} />

                        <Button
                            title={props.cancelTitle}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.AirbnbCerealAppBook, marginHorizontal: 60, borderRadius: 8 }}
                            style={[styles['doneButton'], { backgroundColor: color.fadeRedColor, alignSelf: 'center', width: "90%" }]}
                            onPress={() => props.onBackClick()}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}


// Invite friends popup
export const InviteFriendsAlert = (props) => {
    const seperatorItem = () => (
        <View
            style={{ height: 0.3, backgroundColor: 'gray', width: '90%', marginVertical: 18 }}
        />
    );

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55', borderRadius: 6 }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            top: -10,
                            right: -10,
                            position: 'absolute'
                        }}
                        onPress={() => props.onBack()}
                    >
                        <Image
                            source={assests.close_pink}
                            style={{
                                tintColor: color.white,
                                height: 30,
                                width: 30,
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 23 }}>
                        <Text
                            style={{
                                fontSize: 30,
                                textAlign: 'center',
                                color: '#ffffff',
                                fontFamily: appConstants.AirbnbCerealAppLight,
                                marginBottom: 20
                            }}
                        >
                            {props.title}
                        </Text>
                    </View>

                    <View height={20} />

                    {/* add by name option */}
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: "85%" }}
                        onPress={() => props.addByNamePress()}
                    >
                        <Image
                            source={assests.searchWhite}
                            style={{ height: 25, width: 25 }}
                        />
                        <Text
                            style={{
                                flex: 1,
                                marginHorizontal: 24,
                                fontFamily: appConstants.AirbnbCerealAppMedium,
                                color: '#fff',
                                fontSize: 19
                            }}
                        >
                            Search by Name
                        </Text>
                        <Image source={assests.rightIcon} style={{ height: 12, width: 6, tintColor: "white" }} />
                    </TouchableOpacity>

                    {seperatorItem()}

                    {/* add from contacts option */}
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: "85%" }}
                        onPress={() => props.addByContactPress()}>
                        <Image
                            source={assests.user}
                            style={{ height: 25, width: 25 }}
                        />
                        <Text
                            style={{
                                flex: 1,
                                marginHorizontal: 24,
                                fontFamily: appConstants.AirbnbCerealAppMedium,
                                color: '#fff',
                                fontSize: 19
                            }}
                        >
                            Your Friends
                        </Text>
                        <Image source={assests.rightIcon} style={{ height: 12, width: 6, tintColor: "white" }} />
                    </TouchableOpacity>

                    {seperatorItem()}

                    {/* all facebook friends option */}
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: "85%" }}
                        onPress={() => props.addByFacebookPress()}
                        // onPress={() => props.addByFacebookPress()}
                    >
                        <Image
                            source={assests.invitation}
                            style={{ height: 25, width: 25 }}
                        />
                        <Text
                            style={{
                                flex: 1,
                                marginHorizontal: 24,
                                fontFamily: appConstants.AirbnbCerealAppMedium,
                                color: '#fff',
                                fontSize: 19
                            }}
                        >
                            Invite Others
                        </Text>
                        <Image source={assests.rightIcon} style={{ height: 12, width: 6, tintColor: "white" }} />
                    </TouchableOpacity>

                    <View height={20} />

                    <View style={{ marginBottom: 40, marginTop: 30, width: '100%' }}>
                        <Button
                            title={props.buttonTitle}
                            textStyle={{
                                fontSize: 17,
                                color: '#22343C',
                                letterSpacing: 3.09,
                                fontFamily: appConstants.AirbnbCerealAppExtraBold,
                                borderRadius: 8
                            }}
                            style={[styles['doneButton'], { backgroundColor: '#88D8B8', alignSelf: 'center', width: "80%" }]}
                            onPress={() => props.onDoneClick()}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}

// Pick a room and Play new button Options
export const PickAndPlayAlert = (props) => {

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}>
            <View style={{ backgroundColor: '#324B55', borderRadius: 6 }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                    <View style={{ marginBottom: 30, marginTop: 30, width: '100%' }}>
                        {
                            <View style={{ alignSelf: 'center', width: "80%" }}>
                                <Image
                                    source={assests.checkmark}
                                    style={{ alignSelf: 'center' }}
                                />

                                <View height={16} />

                                <Text
                                    style={{
                                        color: color.white,
                                        textAlign: "center",
                                        fontSize: 30,
                                        fontFamily: fontFamily.avenirLight,
                                    }}
                                >
                                    {props.title}
                                </Text>
                                <View height={10} />

                                <Text
                                    style={{
                                        color: color.white,
                                        textAlign: "center",
                                        fontSize: 16,
                                        fontFamily: fontFamily.avenirLight,
                                    }}
                                >
                                    {props.desc}
                                </Text>
                                <View height={16} />
                            </View>
                        }

                        <Button
                            title={props.pickButtontitle}
                            textStyle={{
                                fontSize: 17,
                                color: '#22343C',
                                letterSpacing: 3.09,
                                fontFamily: appConstants.AirbnbCerealAppExtraBold,
                                borderRadius: 8
                            }}
                            style={[styles['doneButton'], { backgroundColor: '#88D8B8', alignSelf: 'center', width: "80%" }]}
                            onPress={() => props.onPlayClick()}
                        />

                        <View height={14} />

                        <Button
                            title={props.playButtontitle}
                            textStyle={{
                                fontSize: 17,
                                color: '#22343C',
                                letterSpacing: 3.09,
                                fontFamily: appConstants.AirbnbCerealAppExtraBold,
                                borderRadius: 8
                            }}
                            style={[styles['doneButton'], { backgroundColor: color.goldenColor, alignSelf: 'center', width: "80%" }]}
                            onPress={() => props.onPickClick()}
                        />

                        <View height={14} />

                        <Button
                            title={props.cancleButtontitle}
                            textStyle={{
                                fontSize: 17,
                                color: '#22343C',
                                letterSpacing: 3.09,
                                fontFamily: appConstants.AirbnbCerealAppExtraBold,
                                borderRadius: 8
                            }}
                            style={[styles['doneButton'], { backgroundColor: color.fadeRedColor, alignSelf: 'center', width: "80%" }]}
                            onPress={() => props.onCancelClick()}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}

// Question Alert Contant
export const QuestionContantAlert = (props) => {

    const quesStyles = StyleSheet.create({
        ansMainContainer: {
            borderRadius: 10,
            overflow: 'hidden'
        },
        answerContainer: {
            alignSelf: 'center',
            justifyContent: 'center',
            padding: 20,
            width: '100%',
        },
        questionTextTitle: {
            color: '#fff',
            marginTop: 14,
            fontSize: 20,
            letterSpacing: 0.4,
        },
        questionSubText: {
            color: '#fff',
            marginTop: 36,
            fontSize: 12,
            letterSpacing: 0.4,
        },
    });

    return (
        <Modal style={styles.modalView}
            isVisible={props.isModalVisible}
            onBackdropPress={props.onBackClick}
        >
            <View style={{ backgroundColor: '#324B55', borderRadius: 6 }}>
                <SafeAreaView style={{ alignItems: 'center' }}>
                    <View style={{ marginBottom: 30, marginTop: 10, width: '100%', paddingHorizontal: 20 }}>
                        <Text
                            style={quesStyles.questionTextTitle}
                        >
                            {constants.QUESTION + " "}
                            {props.currentQueNo + '/'}
                            <Text
                                style={quesStyles.questionSubText}
                            >
                                {props.totalQuestion}
                            </Text>
                        </Text>

                        <PageIndicator
                            totalQuestion={props.totalQuestion}
                            doneQuestion={props.currentQueNo}
                        />

                        <View height={20} />

                        <View style={quesStyles.ansMainContainer}>
                            {
                                props.answerData.map((items, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index.toString()}
                                            style={[
                                                quesStyles.answerContainer, {
                                                    backgroundColor: index === 0 ? color.hangmanColor : '#fff'
                                                }
                                            ]}
                                        >
                                            <Text>{items.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

                        <View style={{ width: "100%", flexDirection: 'row', paddingHorizontal: 12, marginTop: 10 }}>
                            <Button
                                title={'Correct'}
                                textStyle={{
                                    fontSize: 16,
                                    color: '#22343C',
                                    letterSpacing: 3.09,
                                    fontFamily: appConstants.AirbnbCerealAppExtraBold,
                                    borderRadius: 8
                                }}
                                style={[styles['doneButton'], {
                                    backgroundColor: '#88D8B8', alignSelf: 'center', flex: 1
                                }]}
                                onPress={() => { }}
                            />

                            <View width={10} />

                            <Button
                                title={'Next'}
                                textStyle={{
                                    fontSize: 16,
                                    color: '#22343C',
                                    letterSpacing: 3.09,
                                    fontFamily: appConstants.AirbnbCerealAppExtraBold,
                                    borderRadius: 8
                                }}
                                style={[styles['doneButton'], {
                                    backgroundColor: color.fadeRedColor, alignSelf: 'center', flex: 1
                                }]}
                                onPress={() => { }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}

const PageIndicator = (props) => {
    const pageIndigatorRef = useRef([]);


    const indeStyles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            marginTop: 16,
            // backgroundColor: 'red',
        },
        subContainer: {
            height: 10,
        },
        subColoredContainer: {
            width: "100%",
            height: "100%",
            borderRadius: 7,
        },
    })

    const newView = (i) => {
        const viewWidth = 100 / props.totalQuestion;

        return (
            <View key={i.toString()}
                // style={[styles.subContainer, { width: viewWidth - (i + 1 !== props.totalQuestion ? 4 : 0), marginRight: i + 1 !== props.totalQuestion ? 4 : undefined }]}
                style={[indeStyles.subContainer, { width: `${viewWidth}%`, paddingHorizontal: 2 }]}
            >
                <View
                    style={[
                        indeStyles.subColoredContainer,
                        {
                            backgroundColor: i < props.doneQuestion ? color.bingoColor : 'gray',
                        }
                    ]}
                />
            </View>
        );
    }

    for (let i = 0; i < props.totalQuestion; i++) {
        pageIndigatorRef.current = [...pageIndigatorRef.current, newView(i)];
    }

    return (
        <View style={indeStyles.container}>
            {
                pageIndigatorRef.current
            }
        </View>
    )
}

