import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Text,
    ScrollView,
    Touchable,
    FlatList,
    TouchableOpacity, TouchableWithoutFeedback, DeviceEventEmitter
} from 'react-native';
import { styles } from './styles';
// components
import appConstants from '../../common/appConstants';
import MaineHeader from '../../common/headerWithText'
import assests from '../../common/assests';
import { Actions } from 'react-native-router-flux';
import {
    Button,
} from '../../components/customComponent';
import { Alert, RoundTry } from '../../common/alertPop'
import color from '../../utils/color';
import DraggableFlatList from 'react-native-draggable-flatlist'
import { dynamicSize, getFontSize } from '../../utils/responsive';
import * as validate from '../../utils/validation';
import { useSelector, useDispatch } from 'react-redux';
import { LoaderAction } from '../../redux/action';
import AsyncStorage from '@react-native-community/async-storage';
import * as commonApi from '../../ServiceRequests/serviceContest';
import TrueFalseView from './components/TrueFalseView';
import gameTypes from '../../utils/gameTypes';

function RoundQuestion(props) {

    const isTaboo = () => props.gameType === gameTypes.Taboo;

    const [imageData, setImageData] = useState([
        // { key: 'Android1', isPress: false, isMusic: false, isVideo: false },
        // { key: 'Android2', isPress: false, isMusic: true, isVideo: false },
        // { key: 'Android3', isPress: false, isMusic: false, isVideo: true },
        // { key: 'Android4', isPress: false, isMusic: false, isVideo: false },
    ])
    const [selectedQuestion, setSelectedQuestion] = useState('')
    const [count1, setCount1] = useState(0)
    const [showCount, setShowCount] = useState(false)
    const [visibleCount1, isVisibleCount1] = useState(false)
    const [editButton, setEditButton] = useState('')
    const [apicount, setApicount] = useState(1)

    const [deleteId, setdeleteId] = useState(undefined);

    const [canDisplay, setcanDisplay] = useState(false);
    const [isDeleteDialog, setisDeleteDialog] = useState(false);

    // alert modal status for max number of question
    const [maxQuestionAlert, setmaxQuestionAlert] = useState(false);

    const [dragging, setdragging] = useState(false);

    const loader = useSelector(state => state.authReducer.loader);
    const maxQuestionNumber = useSelector(state => state.questionReducer.maxQuestionNumber);

    const dispatch = useDispatch()

    useEffect(() => {
        DeviceEventEmitter.addListener(
            'QuestionUpdate', async () => {
                await fetchMyAPI();
            });

        // getTredRouds();

        fetchMyAPI()
    }, [])


    const fetchMyAPI = async () => {
        const data = await AsyncStorage.getItem('userid')
        const id = await AsyncStorage.getItem('roundid')
        const name = await AsyncStorage.getItem('roundname')
        console.log("round id => ", id);
        dispatch(LoaderAction(true));

        const response = await commonApi.RoundquestionsAPI(0, dispatch, id, props.gameType);

        if (response['status']) {
            if (response.data != null && response.data != undefined) {
                console.log('data1111', response.data);
                var datafilter = response.data;

                console.log("response of sort quiz => 0 ", JSON.stringify(datafilter));

                // if (datafilter.length != 0) {
                setImageData(datafilter);
                setTimeout(() => {
                    setcanDisplay(true);
                }, 500);
                // } else {
                //     Actions.createQuestion();
                // }
                // datafilter = datafilter.filter((l) => {
                //     if (l.title !== null) {
                //         return (
                //             l.title == name
                //         );
                //     }
                // });
                // datafilter.map((map) => AsyncStorage.setItem("roundidRead", map._id))
                // response.data.map((map) => { if (map.contestId == data) { setRoundid(map._id) } })
            }
        }
    }

    // const getTredRouds = async () => {
    //     dispatch(LoaderAction(true))
    //     const response = await commonApi.getTredRoundList('', dispatch, 0)
    //     if (response['status']) {
    //         const arrData = response.data
    //         setImageData(arrData);
    //     }
    // }

    async function CallApi() {
        setApicount(apicount + 1)
        // // const data = await AsyncStorage.getItem('userid')
        // dispatch(LoaderAction(true))
        // const response = await commonApi.getTredRoundList('', dispatch, apicount)
        // if (response['status']) {
        //     if (response.data != null) {
        //         response.data.map((data) => imageData.push(data))
        //     }
        // }
        const data = await AsyncStorage.getItem('userid')
        const id = await AsyncStorage.getItem('roundid')
        const name = await AsyncStorage.getItem('roundname')
        dispatch(LoaderAction(true))
        const response = await commonApi.RoundquestionsAPI(apicount, dispatch, id)

        if (response['status']) {
            if (response.data != null) {
                response.data.map((data) => imageData.push(data))
            }
        }
    }

    const onDeleteClick = (item, index) => {
        hideEditPopup();
        setisDeleteDialog(true);
        setdeleteId(item._id);
    }

    const onEditClick = (item, index) => {
        hideEditPopup();
        Actions.createQuestion({ params: props.params, item, gameType: props.gameType });
    }

    const getQuestiontype = (id) => {
        switch (id) {
            case 1:
                return "Single Select";
            case 2:
                return "Multi Select";
            case 3:
                return "Free Text";
            case 4:
                return "Flashcard";
            case 5:
                return "True or False";
            default:
                return "Single Select";
        }
    }

    const renderItem = ({ item, index, drag, isActive }) => {
        return (
            <TouchableOpacity onPress={() => {
                // setEditButton('')}
                // if (item.answerType !== 5) {
                if (editButton == '') {
                    selectedQuestion == item._id ?
                        setSelectedQuestion('') : setSelectedQuestion(item._id);
                }
                setEditButton('')
                // }
            }}
                onLongPress={drag}
            >
                <View style={[styles.bottomBoxContainer,]}>
                    <View style={[styles.bottomBoxInnerView,]}>

                        {/* symbol for media type */}
                        <View style={[styles.boxLogo, {
                            justifyContent: 'center',
                            backgroundColor: '#324B55',
                            borderBottomLeftRadius: selectedQuestion == item._id ? 0 : 10,
                            display: props.gameType === gameTypes.Taboo ? 'none' : undefined,
                        }]} >
                            {item.file ?
                                <Image resizeMode={'cover'} style={[styles.boxLogo, { opacity: item.isVideo ? 0.4 : 1, borderBottomLeftRadius: selectedQuestion == item._id ? 0 : 10 }]} source={{ uri: item.file }} />
                                : <Image resizeMode={'cover'} style={[styles.boxLogo, { opacity: item.isVideo ? 0.4 : 1, borderBottomLeftRadius: selectedQuestion == item._id ? 0 : 10 }]} source={assests.questionPlaceholder} />}
                            {item.fileType === 'audio' ?
                                <Image style={{ position: 'absolute', alignSelf: 'center' }} source={assests.music} /> : null
                            }
                            {item.fileType === 'video' ?
                                <Image style={{ position: 'absolute', alignSelf: 'center' }} source={assests.play} /> : null
                            }
                            {item.fileType === 'link' ?
                                <Image style={{ position: 'absolute', alignSelf: 'center', height: "100%", width: "100%" }} source={assests.tempYoutubeIcon} resizeMode="contain" /> : null
                            }
                        </View>

                        {/* three dots place */}
                        <View
                            style={styles.rightContainer}
                        >
                            <TouchableOpacity onPress={() => onDeleteClick(item, index)}>
                                <Image
                                    source={assests.mark}
                                    style={styles.rightIcon}
                                />
                            </TouchableOpacity>

                            <View height={10} />

                            <TouchableOpacity onPress={() => onEditClick(item, index)}>
                                <Image
                                    source={assests.edit}
                                    style={styles.rightIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* <TouchableOpacity onPress={() => setEditButton(item._id)} style={[styles.crossLogo, { padding: 10 }]}>
                            {
                                editButton !== item._id && <Image source={assests.dot} />
                            }
                        </TouchableOpacity> */}

                        {/* middle component for display text */}
                        <View style={{ marginLeft: 15, marginVertical: 14, flex: 1, marginRight: 40 }}>
                            <TouchableOpacity onPress={() => {
                                // if (item.answerType !== 5) {
                                if (editButton == '') {
                                    selectedQuestion == item._id
                                        ?
                                        setSelectedQuestion('')
                                        :
                                        setSelectedQuestion(item._id);
                                    setEditButton('')
                                }
                                // }
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.bottomBoxText} numberOfLines={2}>{item.question}</Text>
                                    {/* <Image source={assests.downArrow} /> */}
                                </View>

                                {/* if its true or false answer */}
                            </TouchableOpacity>

                            <Text style={styles.bottomBoxTextType}>
                                {getQuestiontype(item.answerType)}
                            </Text>

                            {
                                selectedQuestion == item.key
                                    ?
                                    <Text style={[styles.bottomBoxText, { color: '#fff' }]}>Question Title ?</Text>
                                    :
                                    null
                            }
                            {/* <Text style={styles.descriptionText}>{""}</Text> */}
                        </View>
                    </View>
                    {selectedQuestion == item._id ?
                        <View>
                            {
                                item.answerType === 5
                                    ?
                                    <TrueFalseView item={item} />
                                    :
                                    item.answers.map((ans, index) => {
                                        return (
                                            <View key={index.toString()} style={styles.questionView}>
                                                <Text style={[styles.questionText, { flex: 1 }]}>{ans.answer}</Text>
                                                {
                                                    !isTaboo() && ans.correctAnswer
                                                        ?
                                                        <View style={{
                                                            backgroundColor: '#192930',
                                                            justifyContent: 'center', marginRight: 10, borderRadius: 20,
                                                            height: 34, width: 34
                                                        }}>
                                                            <Image style={{ alignSelf: 'center' }} source={assests.checkMarkSelected} />
                                                        </View>
                                                        :
                                                        <View style={{ height: 34 }} />
                                                }
                                            </View>
                                        )
                                    })
                            }
                            <View height={10} />
                            {/* <View style={[styles.questionView, { marginBottom: 10 }]}>
                                <Text style={styles.questionText}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,</Text>
                            </View> */}
                        </View>
                        : null}
                    {
                        editButton == item._id ?
                            <View style={{ position: 'absolute', right: -1, top: -1, backgroundColor: '#324B55', borderRadius: 5, width: 130 }}>

                                <TouchableOpacity onPress={() => onEditClick(item, index)}
                                    style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10, alignItems: 'center' }}>
                                    <Image source={assests.edit} style={{ width: 18, height: 18 }} />
                                    <Text style={{ color: '#FAFAFA', fontFamily: appConstants.AirbnbCerealAppLight, fontSize: 18, marginLeft: 15 }}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => onDeleteClick(item, index)}
                                    style={{ flexDirection: 'row', marginLeft: 10, marginTop: 14, alignItems: 'center', marginBottom: 10 }}>
                                    <Image source={assests.crossWhite} style={{ width: 18, height: 18 }} />
                                    <Text style={{ color: '#FAFAFA', fontFamily: appConstants.AirbnbCerealAppLight, fontSize: 18, marginLeft: 15 }}>Remove</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => setEditButton('')}
                                    style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10, alignItems: 'center', marginBottom: 10 }}>
                                    <Image source={assests.infoWhite} style={{ width: 16, height: 16 }} />
                                    <Text style={{ color: '#FAFAFA', fontFamily: appConstants.AirbnbCerealAppLight, fontSize: 16, marginLeft: 25 }}>More Info</Text>
                                </TouchableOpacity> */}
                            </View>
                            : null
                    }
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * Hide Edit Popup if shown
     */
    const hideEditPopup = () => {
        if (validate.isEmpty(editButton) == false) {
            setEditButton('')
        }
    }

    const handleDeleteQuestionData = async () => {
        try {
            setisDeleteDialog(false);
            dispatch(LoaderAction(true));
            const id = await AsyncStorage.getItem('roundid')
            console.log("round id => ", id);

            const response = await commonApi.deleteQuestionDetailsAPI({}, dispatch, deleteId, id, props.gameType);

            if (response['status']) {
                fetchMyAPI();
            } else {
                // alert(response.message);
            }
        } catch (error) {
            // alert(error);
        }
    }

    const _addMoreQuestion = () => {
        if (imageData.length >= maxQuestionNumber) {
            setmaxQuestionAlert(true);
        } else {
            hideEditPopup();
            Actions.createQuestion({ ...props })
        }
    }


    const emptyListView = () => {
        return (
            <Text style={styles.emptyViewLabel}>{!loader && canDisplay ? 'No data found' : ''}</Text>
        );
    }

    const _roundListing = async () => {
        // imageData
        try {
            const newArrangedData = imageData.map((data, index) => ({ "questionId": data._id, "displayOrder": index + 1 }));
            let sortedData = {
                "sortingList": [...newArrangedData]
            };

            // console.log("response of sort quiz => 1 ", sortedData);

            const response = await commonApi.saveSortquizAPI(sortedData, dispatch);

            // console.log("response of sort quiz => 2 ", JSON.stringify(response));

            Actions.pop();
        } catch (error) {
            // alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={`Round ${isTaboo() ? "Taboo" : "Questions"}`}
            // onBack={() => Actions.popTo("roundTryScreen")}
            />
            <View onStartShouldSetResponder={evt => {
                evt.persist();
                hideEditPopup();
            }}
                style={{ backgroundColor: '#22343C', flex: 1 }}>
                <View showsVerticalScrollIndicator={false} style={{ flex: 1, paddingTop: 20, backgroundColor: '#22343C' }}>
                    <View style={{ alignSelf: 'flex-end', position: "absolute", right: 0, top: 0, zIndex: imageData.length > 0 ? undefined : 1 }}>
                        <Image resizeMode={'contain'} source={assests.backLogo} />
                    </View>
                    <View style={styles.innerContainer}>
                        <DraggableFlatList
                            showsVerticalScrollIndicator={false}
                            data={imageData}
                            onDragBegin={() => {
                                setdragging(true);
                            }}
                            onDragEnd={({ data }) => {
                                setImageData(data);
                                setdragging(false);
                            }}
                            keyExtractor={(item, index) => item._id.toString()}
                            renderItem={renderItem}
                            ListEmptyComponent={() => emptyListView()}
                        // scrollEnabled={!dragging}
                        />
                        {/* <FlatList
                            showsVerticalScrollIndicator={false}
                            data={imageData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        // onEndReached={() => CallApi()}
                        // onEndReachedThreshold={0.5}
                        /> */}
                        {
                            canDisplay &&
                            <>
                                <Button
                                    title={`Add${imageData.length > 0 ? ' More ' : ' '}Questions`}
                                    textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                                    style={styles['signupButton']}
                                    onPress={() => {
                                        _addMoreQuestion();
                                    }}
                                />

                                <Button
                                    title={'Save & Exit'}
                                    textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                                    style={[styles['questionButton'], { backgroundColor: '#FF5485' }]}
                                    onPress={() => _roundListing()}
                                />
                            </>
                        }
                    </View>
                </View>
            </View>
            <Alert
                icon={assests.close_pink}
                // title={'Are you sure!'}
                heading={'Are you sure, you want to delete?'}
                isModalVisible={isDeleteDialog}
                buttonTitle={'Done'}
                cancleTitle={'Cancel'}
                onCancel={() => {
                    setisDeleteDialog(false)
                }}
                logout={() => handleDeleteQuestionData()}
            />

            <Alert
                // title={'Are you sure!'}
                heading={`You can't add more than ${maxQuestionNumber} questions in a round`}
                isModalVisible={maxQuestionAlert}
                buttonTitle={'OK'}
                customYesTitle
                cancleTitle={'No'}
                isHideCancel
                onCancel={() => setmaxQuestionAlert(false)}
                logout={() => setmaxQuestionAlert(false)}
            />
        </SafeAreaView>
    );
}
export default RoundQuestion;
