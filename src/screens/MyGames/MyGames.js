import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    Image,
    View,
    Alert, Text,
    ScrollView, StyleSheet, FlatList,
    StatusBar, SafeAreaView,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from './styles';
import appConstants from '../../common/appConstants';
import assests from '../../common/assests';
import colors from '../../utils/color';
import MaineHeader from '../../common/headerSearch'
import GameList from '../HomeScreen/Search/GameList';
import * as commonApi from '../../ServiceRequests/serviceContest';
import { PopUpScreen } from '../../common/alertPop';
import { LoaderAction } from '../../redux/action'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import * as actionType from '../../redux/action';
import { Loader } from '../../components/customComponent';
import color from '../../utils/color';

function MyGames(props) {

    const dispatch = useDispatch()
    const loader = useSelector(state => state.authReducer.loader)

    const [errorMsgText, setErrorMsgText] = useState('') //error
    const [visiblerror, setVisibleError] = useState(false)

    const [editButton, setEditButton] = useState()

    const [listarr, setListarr] = useState(false) //API data
    const [apicount, setApicount] = useState(1)

    const [search, setsearch] = useState('');

    useEffect(() => {
        DeviceEventEmitter.addListener('MyGameList', () => {
            fetchMyAPI();
        });
        fetchMyAPI();
    }, []);

    const fetchMyAPI = async (searchText) => {
        const data = await AsyncStorage.getItem('userid');
        // console.log("user id => ", data);

        dispatch(LoaderAction(true));

        // console.log("user id => ", data);
        const response = await commonApi.saveContestGetAPI(0, dispatch, data, props.saveToId, searchText);
        // dispatch(LoaderAction(false))
        console.log("data of my games => ", JSON.stringify(response.data))

        if (response['status']) {
            console.log('data', response.data);
            dispatch(actionType.setGameList(response.data))
            if (response.data != null && response.data != undefined) {
                setListarr(response.data);
            }
        }
    }

    async function CallApi(searchText) {
        setApicount(apicount + 1);
        const data = await AsyncStorage.getItem('userid');
        dispatch(LoaderAction(true));
        const response = await commonApi.saveContestGetAPI(apicount, dispatch, data, props.saveToId, searchText);

        console.log("new object data =>  ", JSON.stringify(response.data));

        if (response['status']) {
            if (response.data != null && response.data != undefined) {
                // response.data.map((data) => listarr.push(data))
                setListarr([...listarr, ...response.data]);
            }
        }
    }

    const hideEditPopup = () => {
        setEditButton('');
    }

    const gameList = [
        { title: '1', image: assests.candy, gamename: "Hangman", isBoarder: true, autherText: 'Draft' },
        { title: '2', image: assests.counter, gamename: 'Quizz', isBoarder: true, autherText: 'published' },
    ]

    const onEditClick = (item, index) => {
        setEditButton('');
        Actions.push("createScreen", { createScreen: item });
    }

    const onRemoveClick = async (item, index) => {
        setEditButton('');
        dispatch(LoaderAction(true))
        response = await commonApi.deleteContestDetailsAPI({}, dispatch, item._id);
        if (response['status']) {
            console.log("id =>", item);
            // alert(item._id);
            await fetchMyAPI();
        }
    }

    const renderListRow = ({ item, index }) => {
        const roundTitle = () => {
            if (item.totalRound > 1) {
                return `${item.totalRound} Rounds`;
            }
            return `${item.totalRound} Round`;
        }

        return (
            <TouchableOpacity
                style={[
                    styless.boxContainer,
                    {
                        marginLeft: (index) % 2 ? "8%" : undefined,
                        // backgroundColor:  (index) % 2 ? "blue" : "red"
                    }
                ]}
                onPress={() => {
                    Actions.contestInfo({ contestInfo: item, fromMyGames: true })
                    // setListarr(false);
                }}
            >
                <View style={[styless.innerBox, { borderColor: '#68C1D2', borderWidth: item.gamename == 'Quizz' ? 1.5 : 1, height: '100%' }]}>
                    {item.image != '' ?
                        <Image style={styless.boxImage} source={{ uri: item.image }} /> :
                        <Image style={styless.boxImage} source={assests.smallPlaceholder} />}
                    {/* <View style={{ alignSelf: 'center', alignItems: 'center'}}> */}
                    <View style={{ width: "100%" }}>
                        <Text
                            style={[styless.questionText, { color: '#68C1D2' }]}
                            numberOfLines={1}
                        >
                            {item.title}
                        </Text>
                        <Text numberOfLines={2} style={styless.gamename}>{roundTitle()}</Text>
                        {/* <TouchableOpacity onPress={() => setEditButton(item._id)} style={[styles.crossLogo]}>
                            <Image source={assests.dot} />
                        </TouchableOpacity> */}
                    </View>
                    <Text style={[styless.authorTextSel,
                    {
                        backgroundColor: item.isPublish ? color.appColor : color.fadeRedColor
                    }]}>
                        {item.isPublish ? 'Published' : 'Draft'}
                    </Text>
                    {/* </View> */}
                    {/* {
                        editButton == item._id ?
                            <View style={{ position: 'absolute', right: -2, top: 80, backgroundColor: '#324B55', borderRadius: 5, width: 100 }}>
                                <TouchableOpacity onPress={() => onEditClick(item, index)}
                                    style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5, alignItems: 'center' }}>
                                    <Image source={assests.edit} style={{ width: 10, height: 10 }} />
                                    <Text style={{ color: '#FAFAFA', fontFamily: appConstants.AirbnbCerealAppLight, fontSize: 12, marginLeft: 18 }}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onRemoveClick(item, index)}
                                    style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10, alignItems: 'center', marginBottom: 8 }}>
                                    <Image source={assests.crossWhite} style={{ width: 10, height: 10 }} />
                                    <Text style={{ color: '#FAFAFA', fontFamily: appConstants.AirbnbCerealAppLight, fontSize: 12, marginLeft: 18 }}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                            : null
                    } */}
                </View>
            </TouchableOpacity>
        )
    }

    const emptyListView = () => {
        return (
            !loader
                ?
                <TouchableOpacity
                    style={styless.emptyViewLabel}
                    onPress={() => Actions.createScreen()}
                >
                    <Image
                        source={assests.create}
                        style={{ alignSelf: 'center' }}
                    />

                    <View height={18} />

                    <Text style={{ fontSize: 18, color: color.white }}>Add Contest</Text>
                </TouchableOpacity>
                :
                null
            // <Text style={styless.emptyViewLabel}>{ ? 'No data found' : ''}</Text>
        );
    }

    const headerTitle = (isSearchText) => {
        // props.saveToId
        if (props.history) {
            return 'Games History';
        } else {
            if (props.saveToId && !isSearchText) {
                return (
                    <Text>
                        {/* {`My Group\n`}
                        <Text style={{ fontSize: 12 }}>
                            {`           ` + props.groupName}
                        </Text> */}
                        {props.groupName || ""}
                    </Text>);
            }
            return 'My Games';
        }
    }

    const filterCategory = (text) => {
        setsearch(text);
        if (!text) {
            fetchMyAPI();
        }
    }

    const onSearchEnter = () => {
        fetchMyAPI(search);
    }

    const _onSearchClose = () => {
        setsearch('');
        fetchMyAPI();
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: '#324B55' }]}>
            <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />
            <Loader isLoading={loader} />
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={headerTitle()}
                subTitle={`Search ${headerTitle(true)}`}
                onChangeText={(text) => filterCategory(text)}
                onSubmit={() => onSearchEnter()}
                handleCloseClick={() => _onSearchClose()}
                search={search}
            />
            <View
                style={{ backgroundColor: '#22343C', flex: 1, paddingBottom: dynamicSize(15), paddingHorizontal: 30 }}
                onStartShouldSetResponder={evt => {
                    evt.persist();
                    hideEditPopup()
                }}
            >
                {listarr != null ?
                    <FlatList
                        numColumns={2}
                        data={listarr}
                        renderItem={renderListRow}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={() => CallApi(search)}
                        onEndReachedThreshold={0.3}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={emptyListView}
                    />
                    : <GameList
                        data={gameList}
                    />
                }
            </View>
        </SafeAreaView>

    )
}

export default MyGames;

const styless = StyleSheet.create({

    boxContainer: {
        marginTop: dynamicSize(15),
        flexDirection: 'row',
        // width: dynamicSize(158),
        width: "46%",
        height: 'auto',
        //	aspectRatio: 1 / 1,
        // marginHorizontal: dynamicSize(10),
    },
    innerBox: {
        borderWidth: 1,
        borderColor: '#68C1D2',
        alignItems: 'center',
        borderRadius: dynamicSize(10),
        width: '100%',
        shadowColor: '#000000A6',
        elevation: 1,
        marginRight: dynamicSize(10),
        shadowColor: '#0000003B',
        shadowOffset: {
            width: 0,
            height: 14
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    boxImage: {
        width: '100%',
        height: dynamicSize(80),
        resizeMode: 'cover',
        borderTopLeftRadius: dynamicSize(10),
        borderTopRightRadius: dynamicSize(10),
        shadowColor: '#0000003B',
        elevation: 1,
        shadowOffset: { width: 0, height: dynamicSize(10) },
    },
    questionText: {
        fontSize: getFontSize(16),
        marginHorizontal: dynamicSize(8),
        letterSpacing: 0.8,
        marginVertical: dynamicSize(4),
        fontFamily: appConstants.fontBold,
        fontWeight: '800',
        textAlign: 'center'
    },
    emptyViewLabel: {
        fontSize: 20,
        // marginLeft: 13,
        marginTop: dynamicSize(240),
        // color: '#ADBAC1',
        justifyContent: 'center',
        alignSelf: 'center',
        // fontFamily: appConstants.AirbnbCerealAppLight,
        // backgroundColor: "red"
    },
    gamename: {
        fontSize: 12,
        color: '#fff',
        marginTop: 1,
        fontFamily: appConstants.fontReqular,
        textAlign: 'center'
    },
    autherText: {
        fontSize: getFontSize(12),
        color: '#C0C9CE',
        marginTop: dynamicSize(4),
        marginBottom: dynamicSize(10),
        fontFamily: appConstants.fontReqular,

    },
    authorTextSel: {
        fontSize: getFontSize(12),
        color: '#FFFFFF',
        marginTop: dynamicSize(6),
        marginBottom: dynamicSize(8),
        fontFamily: appConstants.fontReqular,
        backgroundColor: '#FF5485',
        paddingTop: 6,
        paddingBottom: 4,
        // paddingHorizontal: 10,
        borderRadius: 5,
        overflow: 'hidden',
        width: '56%',
        textAlign: 'center',
    },

})