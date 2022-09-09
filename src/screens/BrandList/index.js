import React, { useEffect, useState, useRef } from 'react';
import {
    View, SafeAreaView, Image, Text,
    ScrollView, Touchable, FlatList, DeviceEventEmitter,
    TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native';

import { styles } from './styles';
// components
import appConstants from '../../common/appConstants';
import MaineHeader from '../../common/headerSearch'
import assests from '../../common/assests';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { LoaderAction } from '../../redux/action'
import * as commonApi from '../../ServiceRequests/serviceContest'
import { PopUpScreen } from '../../common/alertPop'
import { Button, Loader } from '../../components/customComponent';
import * as actionType from '../../redux/action';

function RoundQuestion(props) {

    const dispatch = useDispatch()
    const loader = useSelector(state => state.authReducer.loader)

    const { brandList } = useSelector(state => ({
        brandList: state.contestReducer.brandList,
    }), shallowEqual);


    const [selectedQuestion, setSelectedQuestion] = useState('')
    const [count1, setCount1] = useState(0)
    const [showCount, setShowCount] = useState(false)
    const [visibleCount1, isVisibleCount1] = useState(false)
    const [editButton, setEditButton] = useState('')

    const [visible, setVisible] = useState(false)
    const [errorMsgText, setErrorMsgText] = useState('')

    const [search, setSearch] = useState('')//Search
    const [searchdata, setSearchData] = useState([])

    // const [brandList, setBrandList] = useState([
    //     { key: 'Brand1', isPress: false, icon: assests.candy, isSelected: false },
    //     { key: 'Brand2', isPress: false, icon: assests.candy,  isSelected: false },
    //     { key: 'Brand3', isPress: false, icon: assests.candy,  isSelected: false },
    //     { key: 'Brand4', isPress: false, icon: assests.candy,  isSelected: false },
    //     { key: 'Brand5', isPress: false, icon: assests.candy ,  isSelected: false},
    //     { key: 'Brand6', isPress: false, icon: assests.candy,  isSelected: false },
    // ])

    //  const [brandList, setBrandList] = useState([])
    const [metaData, setMetaData] = useState(false)

    useEffect(() => {
        DeviceEventEmitter.addListener(
            'setSearchData', () => {
                setSearch('')
            },
        )
        if (brandList.length == 0) {
            getBransListData()
        } else {
            let arrList = brandList
            if (props.brandSeleList.length > 0) {
                // arrList.forEach((item, i) => {
                //     props.brandSeleList.forEach(element => {
                //         if (element._id == item._id) {
                //             arrList[i].isSelected = true
                //         } else {
                //             arrList[i].isSelected = false
                //         }
                //     })
                // })
                arrList.map((get) => {
                    props.brandSeleList.map((set) => {
                        if (get._id == set.id) {
                            arrList[get].isSelected = true
                        }
                    })
                })
            } else {
                arrList.map(item => {
                    item.isSelected = false
                })
            }
            dispatch(actionType.setBrandList(arrList))
            setMetaData(!metaData)
            console.log('arrList::', arrList);
        }
    }, [])


    const _applyAction = () => {
        setVisible(false),
            errorMsgText ? null : Actions.pop()
    }

    /**
     * Handle Back Click
     */
    const handleBackClick = () => {
        // let selBrandList = brandList.filter(item => item.isSelected)
        // props.completionBlock(selBrandList)
        Actions.pop()
    }

    function filterData(searchText) {
        var data = brandList;
        searchText = searchText.trim().toLowerCase();
        data = data.filter((l) => {
            if (l.name !== null) {
                return (
                    l.name.toLowerCase().match(searchText)
                );
            }
        });
        setSearchData(data)
        console.log('data', data);
    }

    function filterCategory(text) {
        setSearch(text)
        if (text !== '') {
            filterData(text);
        } else {
            setSearchData([])
        }
    }

    /**
     * Handle Done Click
     */
    const handleDoneClick = () => {
        let selBrandList = brandList.filter(item => item.isSelected)
        props.completionBlock(selBrandList)
        Actions.pop()
    }

    const _headerRightButton = () => {
        return (
            <Button
                title={'Done'}
                textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                style={styles['doneButton']}
                onPress={() => handleDoneClick()}
            />
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Choose Brand'}
                subTitle={'Search Brand'}
                onBackClick={() => handleBackClick()}
                onChangeText={(text) => filterCategory(text)}
                search={search}
                // right={_headerRightButton()}
            />
            <View style={{ backgroundColor: '#22343C', flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, paddingTop: 20 }}
                    keyboardShouldPersistTaps="always"
                >
                    <View style={{ alignSelf: 'flex-end', position: 'absolute', right: 0, top: -20 }}>
                        <Image resizeMode={'contain'} source={assests.backLogo} />
                    </View>
                    <View style={[styles.innerContainer, { alignContent: 'flex-start' }]}>
                        {(searchdata.length == 0 && search != '') ?
                            <Text style={{
                                fontSize: 20,
                                marginLeft: 13,
                                color: '#ADBAC1',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                fontFamily: appConstants.AirbnbCerealAppLight
                            }}>No brand available</Text>
                            : <FlatList
                                showsHorizontalScrollIndicator={false}
                                keyboardShouldPersistTaps={'always'}
                                data={searchdata.length > 0 ? searchdata : brandList}
                                key={'roundTry'}
                                numColumns={3}
                                renderItem={({ item, index }) => (
                                    <View style={{ marginBottom: 20, alignItems: 'center', width: '33%' }}>
                                        <TouchableWithoutFeedback onPress={() => search != '' ? handleRowClickfilter(index) : handleRowClick(index)}>
                                            <View
                                                style={[styles.bottomBoxContainer]}>
                                                {item.image != "" ?
                                                    <Image resizeMode={'cover'} style={{ height: '100%', width: '100%', borderRadius: 10, borderWidth: item.isSelected ? 4 : 4, borderColor: item.isSelected ? '#FCD274' : '#22343C' }} source={{ uri: item.image }} />
                                                    : <Image resizeMode={'cover'} style={{ height: '100%', width: '100%', borderRadius: 10, borderWidth: item.isSelected ? 4 : 4, borderColor: item.isSelected ? '#FCD274' : '#22343C' }} source={assests.candy} />}
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <Text style={[styles.bottomBoxText, { color: item.isSelected ? '#FCD274' : '#9CA3A5' }]}>{item.name}</Text>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />}
                    </View>
                </ScrollView>
                <View style={{ marginBottom: 100 }} />
                {_headerRightButton()}
            </View>
            <PopUpScreen
                isModalVisible={visible}
                msgText={errorMsgText}
                isError={true}
                onCloseModal={() => setVisible(false)}
                _applyAction={() => _applyAction()}
            />
            <Loader isLoading={loader} />
        </SafeAreaView>
    );

    /**
     * Handle Row Click
     */
    function handleRowClick(selectedIndex) {
        let arrList = brandList
        arrList[selectedIndex].isSelected = !arrList[selectedIndex].isSelected
        dispatch(actionType.setBrandList(arrList))
        //   setBrandList(arrList)
        setMetaData(!metaData)
        //   let selBrandList = arrList.filter(item => item.isSelected)
        //   dispatch(actionType.setBrandList(selBrandList))
    }
    function handleRowClickfilter(selectedIndex) {
        let arrList = searchdata
        arrList[selectedIndex].isSelected = !arrList[selectedIndex].isSelected
        setMetaData(!metaData)
        //   let selBrandList = arrList.filter(item => item.isSelected)
        //   dispatch(actionType.setBrandList(selBrandList))
    }


    /**
     * Get BrandList Data
     */
    async function getBransListData() {
        dispatch(LoaderAction(true))
        const response = await commonApi.getBrandList(dispatch)
        if (response['status']) {
            dispatch(actionType.setBrandList(response.data))
            // setBrandList(response.data)
            console.log('response.data::', response.data);
        }
        else {
            setTimeout(() => {
                setErrorMsgText(response['message'])
                setVisible(true)
            }, 1000);
        }
    }

}
export default RoundQuestion;
