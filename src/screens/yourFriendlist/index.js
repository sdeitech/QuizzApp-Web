import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Text,
    FlatList,
    DeviceEventEmitter
} from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
// components
import MaineHeader from '../../common/headerSearch'
import assests from '../../common/assests';
import { Actions } from 'react-native-router-flux';
// import BoxList from './BoxList'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Alert, PopUpScreen } from '../../common/alertPop'
import { getLoginToken } from '../../utils/session';
import commonSty from '../../common/styles';
import { Button, Loader } from '../../components/customComponent';
import * as actionType from '../../redux/action';
import constants from '../../utils/appConstants';
import isUserAuthorizedItem from '../../utils/helpers/isUserAuthorizedItem';

const YourFriend = (props) => {
    const categoryUseRef = useRef(null);
    const loader = useSelector(state => state.authReducer.loader)

    const [apiProcess, setapiProcess] = useState(false);

    // subscription alert dialog
    
    const { categoryList } = useSelector(state => ({
        categoryList: state.contestReducer.categoryList,
    }), shallowEqual);

    categoryUseRef.current = categoryList;

    const [visible, setVisible] = useState(false)
    const [errorMsgText, setErrorMsgText] = useState('')

    const [search, setSearch] = useState('')//Search
    const [filterData, setFilteredData] = useState([])

    const [frndList, setFrndList] = useState([]);

    const [pageNo, setpageNo] = useState(1);
    useEffect(() => {
        DeviceEventEmitter.addListener(
            'setSearchData', () => {
                setSearch('')
            },
        )
        fetchMyAPI();
        
    }, [pageNo])

    const _applyAction = () => {
        setVisible(false),
            errorMsgText ? null : Actions.pop()
    }

    const fetchMyAPI = async () => {
        try {
            setapiProcess(true);

            if (apiProcess) return;

            const userId = await AsyncStorage.getItem('userid');
           
            let tokenStr = await getLoginToken()
            axios.get(`https://dev-api.murabbo.com/api/app/user/friends?userId=${userId}&page=${pageNo}&size=10`,
            { headers: {"Authorization" : `Bearer ${tokenStr}`} })
            .then((res) => {
                console.log(res.data.data,'frnds')
                let list = res.data.data

                setFrndList(list);
                
            })
            .catch(function (error) {
              console.log('error my catch', error);
            });

            // if (response['status']) {
                // setuserInfo(response?.data?.userInfo);

                // if (response.data.length > 0) {
                //     setFrndList([...frndList, ...response.data]);

                //     if (pageNo === 1) {
                //         setFrndList(response.data);
                //     } else {
                //         setFrndList([...frndList, ...response.data]);
                //     }
                // }
            // }
        } catch (error) {
            alert(error);
        } finally {
            setapiProcess(false);
        }
    }


    /**
     * Handle Back Click
     */
    const handleBackClick = () => {
        Actions.pop();
    }

    const filterFunc = (searchText) => {
        const newData = frndList.filter(
            (item) => {
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = searchText.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        console.log(newData,'Filtered Data======')
        setFilteredData(newData);
    }

    const filterCategory = (text) => {
        setSearch(text)
        if (text !== '') {
            filterFunc(text);
        } else {
            // setSearchData([])
        }
    }

    const emptyListView = () => {
        return (
            <Text style={styles.emptyViewLabel}>{!loader ? 'No data found' : ''}</Text>
        );
    }

    const _renderItems = (item, index) => {
        return (
            <View key={item._id} style={[styles.renderItemView]}>
                {/* <Text style={[styles.leaderBoardNumber]}>
                    {index + 1}
                </Text> */}
                <View width={16} />

                <View style={styles.renderTextContainer}>
                    <Image
                        style={styles.renderListImage}
                        source={item.image ? { uri: item.image } : assests.vCallPlaceholder}
                        defaultSource={assests.vCallPlaceholder}
                    />

                    <View width={18} />

                    <View>
                        <Text style={[styles.renderName]}>{item.name}</Text>
                        <Text style={[styles.renderPoints]}>{item.currentScore} pt</Text>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <MaineHeader
                isBack={!props.noBack}
                subHeaderTextS={{ color: '#fff' }}
                title={'My Friends'}
                subTitle={'Search'}
                onBackClick={() => handleBackClick()}
                onChangeText={(text) => filterCategory(text)}
                search={search}
            />
            <PopUpScreen
                isModalVisible={visible}
                msgText={errorMsgText}
                isError={true}
                onCloseModal={() => setVisible(false)}
                _applyAction={() => _applyAction()}
            />
            <Loader isLoading={loader} />
            <View style={styles.bottomList}>
                {
                    frndList.length > 0
                        ?
                        <>
                            <FlatList
                                data={ search? filterData : frndList }
                                renderItem={({ item, index }) => _renderItems(item, index)}
                                onEndReached={() => setpageNo(prev => prev + 1)}
                                onEndReachedThreshold={0.3}
                            />
                            {apiProcess && <Text style={styles.loadingText}>{constants.LOADING}</Text>}
                        </>
                        :
                        emptyListView()
                }
            </View>
        </SafeAreaView>
    );
}
export default YourFriend;
