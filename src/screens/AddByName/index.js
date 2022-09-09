import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
    FlatList, TextInput,
} from 'react-native';
import * as commonApi from '../../ServiceRequests/serviceContest';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import assests from '../../common/assests';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import { LoaderAction } from '../../redux/action';
import RenderUser from './components/RenderUser';
import color from '../../utils/color';
import { Loader } from '../../components/customComponent';

const AddByName = (props) => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.authReducer.loader);

    const searchTextRef = useRef(null);

    // page number for pagination of getting users
    const [pageNum, setpageNum] = useState(0);

    const [addbyNameList, setaddbyNameList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setsearchText] = useState('');
    searchTextRef.current = searchText;

    useEffect(() => {
        setTimeout(() => {
            console.log("my room id id => ", props.roomId);
            fetchMyAPI();
        }, 500);
    }, []);

    const fetchMyAPI = async (fromSearch = false) => {

        if (pageNum === 0) dispatch(LoaderAction(true))

        const userID = await AsyncStorage.getItem('userid')

        let response;
        if (props?.isFriend) {
            response = await commonApi.yourFriend(userID, searchTextRef.current, 0, dispatch, props.roomId);
        } else {
            response = await commonApi.userInviteGetAPI(pageNum, searchTextRef.current, dispatch, props.roomId);
        }

        console.log("respose of user invited => ", JSON.stringify(response));

        if (response['status']) {
            if ((fromSearch && pageNum === 0) || props?.isFriend) {
                setaddbyNameList(response.data);
            } else {
                setaddbyNameList([...addbyNameList, ...response.data]);
            }
        }
    }

    useEffect(() => {
        if (pageNum !== 0) fetchMyAPI();
    }, [pageNum])

    const seperatorItem = () => (
        <View
            style={{ height: 0.4, backgroundColor: 'gray', width: '100%', marginVertical: 18 }}
        />
    );

    const _callAtEndReach = () => {
        if (!props?.isFriend) {
            setpageNum(pageNum + 1);
        }
    }

    const _onDoneSerach = () => {
        setpageNum(0);
        const newData = addbyNameList.filter(
            (item) => {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = searchText.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
        console.log(newData, 'Filtered Data======')
        setFilteredData(newData);
        setsearchText(searchText);
        // fetchMyAPI(true);
    }

    const onCrossClick = () => {
        setsearchText('')
        setpageNum(0);
        setaddbyNameList([]);
        setFilteredData([]);
        fetchMyAPI();
    }

    const emptyListView = () => {
        return (
            !loader
                ?
                <TouchableOpacity
                    style={styles.emptyViewLabel}
                    onPress={() => Actions.createScreen()}
                    disabled
                >
                    {/* <Image
                        source={assests.create}
                        style={{ alignSelf: 'center' }}
                    /> */}

                    {/* <View height={18} /> */}

                    <Text style={{ fontSize: 18, color: color.white }}>No data found</Text>
                </TouchableOpacity>
                :
                null
            // <Text style={styless.emptyViewLabel}>{ ? 'No data found' : ''}</Text>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader isLoading={loader} />

            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={props?.isFriend ? 'Your Friends' : 'Search by Name'}
            />

            <View style={[styles.searchComponent, styles.bottomBorder]}>
                <Image source={assests.search} resizeMode='contain' style={{ alignSelf: 'center' }} />
                <TextInput
                    placeholder={'Search'}
                    placeholderTextColor={'#ADBAC1'}
                    style={[styles.searchInput]}
                    value={searchText}
                    onChangeText={(text) => setsearchText(text)}
                    onSubmitEditing={_onDoneSerach}
                />
                {
                    searchText.length > 0 ?
                        <TouchableOpacity onPress={() => onCrossClick()}
                            style={{ alignSelf: 'center' }}>
                            <Image source={assests.close_pink} resizeMode='contain' style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        : null
                }
            </View>


            <View style={styles.innerContainer}>
                {
                    addbyNameList.length > 0 && <Text style={styles.listTitle}>Add to Invite</Text>
                }

                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={searchText ? filteredData : addbyNameList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <RenderUser item={{ ...item, index, roomId: props.roomId }} />}
                    ItemSeparatorComponent={() => seperatorItem()}
                    ListEmptyComponent={() => emptyListView()}
                    onEndReachedThreshold={0.3}
                    onEndReached={() => _callAtEndReach()}
                />
            </View>
        </SafeAreaView>
    )
}

export default AddByName;
