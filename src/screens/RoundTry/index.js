import React, { useEffect, useState, useRef } from 'react';
import {
    View, SafeAreaView, Image,
    Text, ScrollView, TouchableOpacity,
    TouchableWithoutFeedback, DeviceEventEmitter,
} from 'react-native';
import { styles } from './styles';
import SortableGridView from 'react-native-sortable-gridview'
import humanizeDuration from 'humanize-duration';

// components
import appConstants from '../../common/appConstants';
import MaineHeader from '../../common/headerWithText'
import assests from '../../common/assests';
import { Actions } from 'react-native-router-flux';
import {
    Button, Loader,
} from '../../components/customComponent';
import { RoundTry, WariningPopUp, Alert, PopUpScreen } from '../../common/alertPop'
import * as commonApi from '../../ServiceRequests/serviceContest';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { LoaderAction } from '../../redux/action';
import { FlatList } from 'react-native-gesture-handler';
import { dynamicSize } from '../../utils/responsive';
import color from '../../utils/color';
import gameTypes from '../../utils/gameTypes';

function RoundTryScreen(props) {
    const [imageData, setImageData] = useState([
        { key: 'one', color: '#68C1D2', name: 'HangMan', icon: assests.imgbackground },
        { key: 'five', color: '#EFB3FE', name: 'Match It', icon: assests.imgBackgroundPink },
        { key: 'three', color: '#FF5485', name: 'Unscramble', icon: assests.imgBackgroundRed },
        { key: 'six', color: '#F9B17F', name: 'Guess & Go', icon: assests.imgBackgounddYello },
        { key: 'seven', color: 'rgb(253,163,163)', name: 'Gibberish', icon: assests.imgBg_gibberish },
        { key: 'four', color: '#93DEC0', name: 'Bingo', icon: assests.imgBackgoundGreen },
        { key: 'two', color: '#FFC542', name: 'Quiz', icon: assests.imgBg_quiz },
        { key: 'eight', color: '#B2E698', name: 'Taboo', icon: assests.imgBackgroundTaboo },
        { key: 'nine', color: '#324B55', name: 'dot', icon: assests.imgBackgounddYello },
    ]);

    const [visible, setVisible] = useState(false)
    const [count1, setCount1] = useState(1)
    const [count2, setCount2] = useState(1)
    const [count3, setCount3] = useState(1)
    const [count4, setCount4] = useState(1)
    const [count5, setCount5] = useState(1)
    const [count6, setCount6] = useState(1)
    const [count7, setCount7] = useState(1)
    const [count8, setCount8] = useState(1)
    const [count9, setCount9] = useState(1)

    const [saveTo, setSaveTo] = useState(false);
    const [dashboard, setDashboard] = useState(false);
    const [showCount, setShowCount] = useState(false)
    const [visibleCount1, isVisibleCount1] = useState(false)
    const [visibleCount2, isVisibleCount2] = useState(false)
    const [visibleCount3, isVisibleCount3] = useState(false)
    const [visibleCount4, isVisibleCount4] = useState(false)
    const [visibleCount5, isVisibleCount5] = useState(false)
    const [visibleCount6, isVisibleCount6] = useState(false)
    const [visibleCount7, isVisibleCount7] = useState(false)
    const [visibleCount8, isVisibleCount8] = useState(false)
    const [visibleCount9, isVisibleCount9] = useState(false)

    const [isDeleteDialog, setDeleteDialog] = useState(false);

    const [gridSorting, setgridSorting] = useState(false);
    const [pressClosing, setpressClosing] = useState(false);

    const [newVisible, setnewVisible] = useState(true);

    const [categoryid, setCategoryid] = useState('')

    const [apicount, setApicount] = useState(1)

    const [arrRound, setArrRound] = useState([])
    const [ShowBtn, setShowBtn] = useState(false)
    const [clickitem, setClickItem] = useState('')

    const [deleteId, setdeleteId] = useState('');

    const [errorMsgText, setErrorMsgText] = useState('')
    const [visiblerror, setVisibleError] = useState(false)

    const dispatch = useDispatch()
    const loader = useSelector(state => state.authReducer.loader);

    useEffect(() => {
        DeviceEventEmitter.addListener(
            'RoundUpdate', () => {
                console.log("calling round update");
                fetchMyAPI()
            },
        )

        // async function fetchMyAPI() {
        //     const data = await AsyncStorage.getItem('userid')
        //     const id = await AsyncStorage.getItem('categoryid')
        //     dispatch(LoaderAction(true))
        //     const response = await commonApi.saveROUNDGetAPI(0, dispatch, id)

        //     if (response['status']) {
        //         if (response.data != null && response.data != undefined) {
        //             console.log('--------Rollllllll2', response.data);
        //             var datafilter = response.data;
        //             if (datafilter.length != 0) {
        //                 setArrRound(datafilter)
        //                 setShowBtn(false)
        //             } else {
        //                 setShowBtn(true)
        //             }
        //         }
        //     }
        // }

        fetchMyAPI()
    }, [apicount, categoryid, count8])

    const fetchMyAPI = async (isRefresh = false) => {
        // const data = await AsyncStorage.getItem('userid')
        const id = await AsyncStorage.getItem('categoryid');
        dispatch(LoaderAction(true))
        const response = await commonApi.saveROUNDGetAPI(0, dispatch, id);

        console.log("data id res::", id);
        console.log("my new type of response::", response);
        // fetch(`http://54.201.160.69:3051/api/round/round?contestId=${data}`, {
        //     method: "GET",
        //     headers: {
        //         "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTE4MjRhNTU2ODgzNTFjZGVjYTNhMCIsImVtYWlsIjoibWVldC5hZ2hlcmFAeG9uZ29sYWIuY29tIiwiaWF0IjoxNjA4NjI5Mzg0LCJleHAiOjE2MDg3MTU3ODR9.v68a1ARbOTO-WcRtV-CW0cEC22IoTYEzn-EPdAM5Tfo'
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data => alert(JSON.stringify(data)))
        //     .catch(error => alert(error));

        dispatch(LoaderAction(false))

        // setnewVisible(false);
        // setnewVisible(true);
        if (response['status']) {
            if (response.data != null && response.data != undefined) {
                console.log('--------Rollllllll2', response.data);
                var datafilter = [...response.data];
                if (datafilter.length != 0) {
                    setArrRound(datafilter)
                    setShowBtn(false)

                    setnewVisible(false);
                    setnewVisible(true);
                } else {
                    setArrRound([])
                    setShowBtn(true)
                }
            }
        }
    }


    /**
     * Delete Round Tray Data
     */
    const handleDeleteRoundData = async () => {
        try {
            setDeleteDialog(false);
            dispatch(LoaderAction(true));
            const response = await commonApi.deleteRoundAPI({}, dispatch, deleteId);

            // dispatch(LoaderAction(false))

            console.log("new response::", response);
            if (response['status']) {
                // Actions.refresh({ key: Math.random() });
                fetchMyAPI();
            } else {
                setTimeout(() => {
                    setErrorMsgText(response.message)
                    setVisibleError(true)
                }, 1000);
            }
        } catch (error) {
            setTimeout(() => {
                setErrorMsgText(response.message)
                setVisibleError(true)
            }, 1000);
        }
    }

    const getRoundColorFromType = (name) => {
        switch (name.toLowerCase()) {
            case gameTypes.Quiz.toLowerCase():
                return color.quizzColor;
            case gameTypes.Hangman.toLowerCase():
                return color.hangmanColor;
            case gameTypes.MatchIt.toLowerCase():
                return color.matchItColor;
            case gameTypes.Unscramble.toLowerCase():
                return color.unscrambleColor;
            case gameTypes.GuessAndGo.toLowerCase():
                return color.guessGoColor;
            case gameTypes.Gibberish.toLowerCase():
                return color.gibberishColor;
            case gameTypes.Bingo.toLowerCase():
                return color.bingoColor;
            case gameTypes.Taboo.toLowerCase():
                return color.tabooColor;
            case gameTypes.Blank.toLowerCase():
                return color.textGray;
            default:
                return color.quizzColor;
        }
    }

    const render_item01 = (item, index) => {
        console.log('-----------------', item);

        const _roundName = () => {
            switch (item.gameType) {
                case gameTypes.GuessAndGo:
                    return "Guess & Go";
                default:
                    return item.gameType;
            }
        }

        const _roundQnumbers = () => {
            switch (item.gameType) {
                case gameTypes.Blank:
                    return item?.timeLimit !== 0 ? humanizeDuration(item?.timeLimit || 0) : "";
                default:
                    if (item.noOfQuestions === 0) return "";
                    return item.noOfQuestions > 1 ? item.noOfQuestions + ' Qestions' : item.noOfQuestions + ' Question';
            }
        }

        return (
            <View
                uniqueKey={`${item._id}`}
                key={`${item._id}`}
                onTap={() => {
                    if (!gridSorting && !pressClosing) {
                        if (item.gameType === gameTypes.Blank) {
                            Actions.emptyRoundDetails({ RoundDetails: { item: { ...item } } });
                        } else {
                            Actions.roundDetails({ RoundDetails: { item: { ...item } } });
                        }
                    }
                }}
            >
                <View
                    style={[styles.bottomBoxContainer, { marginRight: dynamicSize(17) }]}>
                    {
                        // <View elevation={20} style={[styles.bottomBoxInnerView, { backgroundColor: '#324B55' }]}>
                        //     <Image source={assests.dot_horizontal} style={{ width: 40, height: 12 }} />
                        //     {/* </TouchableOpacity> */}
                        // </View> 
                        <View
                            elevation={20}
                            style={[styles.bottomBoxInnerView, {
                                backgroundColor: getRoundColorFromType(item.gameType)
                            }]}
                        >
                            <Image style={styles.boxLogo} source={assests.imgBg_quiz} />
                            <Text
                                numberOfLines={1}
                                style={[styles.bottomBoxTypeText, {
                                    // marginTop: item.title ? 4 : 0
                                }]}
                            >
                                {_roundName()}
                            </Text>

                            {
                                !!item.title &&
                                <Text
                                    numberOfLines={1}
                                    style={styles.bottomBoxText}
                                >
                                    {item.title || ""}
                                </Text>
                            }
                            {
                                _roundQnumbers() !== "" &&
                                <Text
                                    numberOfLines={1}
                                    style={[styles.bottomBoxTypeText, {
                                        fontSize: 10,
                                    }]}
                                >
                                    {_roundQnumbers()}
                                </Text>
                            }
                            <TouchableOpacity
                                onPressIn={() => setpressClosing(true)}
                                onPressOut={() => setpressClosing(false)}
                                onPress={() => {
                                    console.log("delete round => ", JSON.stringify(item))
                                    // selectedDeleteIndex = index
                                    setdeleteId(item._id);
                                    setDeleteDialog(true)
                                }}
                                style={[styles.crossLogo, { padding: 4 }]}>
                                <Image source={assests.crossCircle} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        );
    }

    const _onDataChange = (data) => {
        // debugger
        setgridSorting(false);
        setArrRound(data)

        // for drag and save
        _roundListing(data);
        // setShowCount(true)
    }

    const onDonePress = () => {
        // _roundListing();
        Actions.reset("Tabs");
    }

    const onDonePressModal = async () => {

        setVisible(false);
        dispatch(LoaderAction(true));

        const gameAddList = [];

        if (visibleCount1 == true) {
            gameAddList.push({ 'gameType': 'Hangman', 'noOfRounds': count1 });
        }

        if (visibleCount2 == true) {
            gameAddList.push({ 'gameType': 'MatchIt', 'noOfRounds': count2 });
        }

        if (visibleCount3 == true) {
            gameAddList.push({ 'gameType': 'Unscramble', 'noOfRounds': count3 });
        }

        if (visibleCount4 == true) {
            gameAddList.push({ 'gameType': 'GuessAndGo', 'noOfRounds': count4 });
        }

        if (visibleCount5 == true) {
            gameAddList.push({ 'gameType': 'Gibberish', 'noOfRounds': count5 });
        }

        if (visibleCount6 == true) {
            gameAddList.push({ 'gameType': 'Bingo', 'noOfRounds': count6 });
        }

        if (visibleCount7 == true) {
            gameAddList.push({ 'gameType': 'Quiz', 'noOfRounds': count7 });
        }

        if (visibleCount8 == true) {
            gameAddList.push({ 'gameType': 'Taboo', 'noOfRounds': count8 });
        }

        if (visibleCount9 == true) {
            gameAddList.push({ 'gameType': 'Blank', 'noOfRounds': count9 });
        }

        if (gameAddList.length > 0) {
            const id = await AsyncStorage.getItem('categoryid');

            let formData = {
                'contestId': id,
                'multipleRounds': gameAddList
            };

            const response = await commonApi.saveroundDetailsAPI(formData, dispatch);
            dispatch(LoaderAction(false));

            console.log('my response json => ', JSON.stringify(response.data));

            if (response['status']) {
                console.log('response.data::', response.data.jsonData.data._id);

                await fetchMyAPI();

                // setnewVisible(false);
                // setnewVisible(true);
                // Actions.roundTryScreen()
            } else {
                setTimeout(() => {
                    // alert(response['message']);
                    setErrorMsgText(response['message'])
                    setVisibleError(true)
                }, 1000);
            }
            // Actions.roundDetails({ShowBtnRound : true})
        }

        // if (visibleCount1 == true ||
        //     visibleCount2 == true ||
        //     visibleCount3 == true ||
        //     visibleCount4 == true ||
        //     visibleCount5 == true ||
        //     visibleCount6 == true ||
        //     visibleCount7 == true ||
        //     visibleCount8 == true) {
        //     // const data = await AsyncStorage.getItem('userid')

        //     // const formData = {
        //     //     contestId: data,
        //     //     gameType: 'Quiz',
        //     //     noOfRound: count7,
        //     // };




        //     // const response = await commonApi.saveroundDetailsAPI(formData, dispatch)
        //     dispatch(LoaderAction(false))
        //     console.log('my response json => ', JSON.stringify(response.data));
        //     if (response['status']) {
        //         console.log('response.data::', response.data.jsonData.data._id);

        //         await fetchMyAPI();

        //         setnewVisible(false);
        //         setnewVisible(true);
        //         // Actions.roundTryScreen()
        //     } else {
        //         setTimeout(() => {
        //             alert(response['message']);
        //             // setErrorMsgText(response['message'])
        //             // setVisibleError(true)
        //         }, 1000);
        //     }
        //     // Actions.roundDetails({ShowBtnRound : true})
        // }
        // Actions.home()
        setSaveTo(false)
        setVisible(false)
    }

    const onAddRoundClick = () => {
        setVisible(true);
        setCount1(1);
        setCount2(1);
        setCount3(1);
        setCount4(1);
        setCount5(1);
        setCount6(1);
        setCount7(1);
        setCount8(1);
        setCount9(1);
        isVisibleCount1(false);
        isVisibleCount2(false);
        isVisibleCount3(false);
        isVisibleCount4(false);
        isVisibleCount5(false);
        isVisibleCount6(false);
        isVisibleCount7(false);
        isVisibleCount8(false);
        isVisibleCount9(false);
    }

    const _roundListing = async (arrRoundData) => {
        // imageData
        try {
            // from state
            // const newArrangedData = arrRound.map((data, index) => ({ "roundId": data._id, "displayOrder": index + 1 }));
            const newArrangedData = arrRoundData.map((data, index) => ({ "roundId": data._id, "displayOrder": index + 1 }));
            let sortedData = {
                "sortingList": [...newArrangedData]
            };

            // console.log("response of sort quiz => 1 ", sortedData);

            const response = await commonApi.saveSortRoundAPI(sortedData, dispatch);

            setSaveTo(false)
            // Actions.reset("Tabs");
        } catch (error) {
            // alert(error);
        }
    }



    return (
        console.log(),
        <SafeAreaView style={styles.safeArea}>
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Rounds'}
                onBack={() => {
                    if (props.fromCreate) {
                        Actions.createScreen({ createScreen: props.contestInfo, forFirstUpdate: true });
                    } else {
                        Actions.pop();
                    }
                }}
            />
            <View style={{ backgroundColor: '#22343C', flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, paddingTop: 20 }}
                    scrollEnabled={!gridSorting}
                >
                    <View style={{ alignSelf: 'flex-end', position: 'absolute', right: 0, top: -20 }}>
                        <Image resizeMode={'contain'} source={assests.backLogo} />
                    </View>
                    <View style={styles.innerContainer}>
                        {arrRound.length > 0 && newVisible ?
                            <>
                                <SortableGridView
                                    style={{ width: "100%" }}
                                    data={arrRound}
                                    onDragStart={() => {
                                        setgridSorting(true);
                                    }}
                                    onDragRelease={(data) => _onDataChange(data)}
                                    renderItem={(item, index) => render_item01(item, index)}
                                    numPerRow={3}
                                    gapWidth={1}
                                    paddingTop={1}
                                    paddingBottom={1}
                                    paddingLeft={1}
                                    paddingRight={1}
                                />
                            </>
                            : null}


                        <Button
                            title={'Add Rounds'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                            style={styles['signupButton']}
                            onPress={() => onAddRoundClick()}
                        />
                        {/* <Button
                            title={'Save & Continue'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                            style={[styles['saveButton'], { backgroundColor: '#FCD274' }]}
                        // onPress={() => setSaveTo(true)}
                        /> */}

                        <Button
                            // title={'Save & Exit'}
                            title={'Exit'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                            style={[styles['saveButton'], { backgroundColor: '#FF5485' }]}
                            onPress={() => setSaveTo(true)}
                        />

                        <RoundTry
                            showCount={true}
                            visibleCount1={visibleCount1}
                            isVisibleCount1={() => isVisibleCount1(!visibleCount1)}
                            count1={count1}
                            setCount1={() => setCount1(count1 > 8 ? 9 : count1 + 1)}
                            setMinCount1={() => setCount1(count1 > 1 ? count1 - 1 : 1)}

                            visibleCount2={visibleCount2}
                            isVisibleCount2={() => isVisibleCount2(!visibleCount2)}
                            count2={count2}
                            setCount2={() => setCount2(count2 > 8 ? 9 : count2 + 1)}
                            setMinCount2={() => setCount2(count2 > 1 ? count2 - 1 : 1)}

                            visibleCount3={visibleCount3}
                            isVisibleCount3={() => isVisibleCount3(!visibleCount3)}
                            count3={count3}
                            setCount3={() => setCount3(count3 > 8 ? 9 : count3 + 1)}
                            setMinCount3={() => setCount3(count3 > 1 ? count3 - 1 : 1)}

                            visibleCount4={visibleCount4}
                            isVisibleCount4={() => isVisibleCount4(!visibleCount4)}
                            count4={count4}
                            setCount4={() => setCount4(count4 > 8 ? 9 : count4 + 1)}
                            setMinCount4={() => setCount4(count4 > 1 ? count4 - 1 : 1)}

                            visibleCount5={visibleCount5}
                            isVisibleCount5={() => isVisibleCount5(!visibleCount5)}
                            count5={count5}
                            setCount5={() => setCount5(count5 > 8 ? 9 : count5 + 1)}
                            setMinCount5={() => setCount5(count5 > 1 ? count5 - 1 : 1)}

                            visibleCount6={visibleCount6}
                            isVisibleCount6={() => isVisibleCount6(!visibleCount6)}
                            count6={count6}
                            setCount6={() => setCount6(count6 > 8 ? 9 : count6 + 1)}
                            setMinCount6={() => setCount6(count6 > 1 ? count6 - 1 : 1)}

                            count7={count7}
                            setCount7={() => setCount7(count7 > 8 ? 9 : count7 + 1)}
                            setMinCount7={() => setCount7(count7 > 1 ? count7 - 1 : 1)}
                            visibleCount7={visibleCount7}
                            isVisibleCount7={() => isVisibleCount7(!visibleCount7)}

                            count8={count8}
                            setCount8={() => setCount8(count8 > 8 ? 9 : count8 + 1)}
                            setMinCount8={() => setCount8(count8 > 1 ? count8 - 1 : 1)}
                            visibleCount8={visibleCount8}
                            isVisibleCount8={() => isVisibleCount8(!visibleCount8)}

                            count9={count9}
                            setCount9={() => setCount9(count9 > 8 ? 9 : count9 + 1)}
                            setMinCount9={() => setCount9(count9 > 1 ? count9 - 1 : 1)}
                            visibleCount9={visibleCount9}
                            isVisibleCount9={() => isVisibleCount9(!visibleCount9)}

                            setShowCount={() => isVisibleCount1(true)}
                            setIscount1={(count) => setCount1(count + 1)}
                            isModalVisible={visible}
                            onCancel={() => setVisible(false)}
                            _applyAction={() => onDonePressModal()}

                            // the array of added rounds
                            arrRound={arrRound}

                            playerType={props.playerType}
                        />
                        <WariningPopUp
                            isModalVisible={dashboard}
                            onCancel={() => setDashboard(false)}
                            onDonePress={() => onDonePress()}
                        />

                        <Alert
                            // title={'Are you sure!'}
                            heading={'Are you sure, you want to save?'}
                            isModalVisible={saveTo}
                            buttonTitle={'Yes'}
                            cancleTitle={'No'}
                            onCancel={() => setSaveTo(false)}
                            logout={() => onDonePress()}
                        />

                        <Alert
                            icon={assests.close_pink}
                            // title={'Are you sure!'}
                            heading={'Are you sure, you want to delete this round?'}
                            isModalVisible={isDeleteDialog}
                            buttonTitle={'Done'}
                            cancleTitle={'Cancel'}
                            onCancel={() => {
                                setDeleteDialog(false)
                            }}
                            logout={() => handleDeleteRoundData()}
                        />
                    </View>

                    <Loader isLoading={loader} />
                    <PopUpScreen
                        isModalVisible={visiblerror}
                        msgText={errorMsgText}
                        isError={true}
                        onCloseModal={() => setVisibleError(false)}
                        _applyAction={() => setVisibleError(false)}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
export default RoundTryScreen;
