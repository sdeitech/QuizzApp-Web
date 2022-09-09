import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Text,
    ScrollView,
    Touchable,
    Modal,
    FlatList,
    TouchableOpacity, DeviceEventEmitter
} from 'react-native';
import { styles } from './styles';
// components
import appConstants from '../../common/appConstants';
import appStrConstants from '../../utils/appConstants';
import MaineHeader from '../../common/headerSearch'
import assests from '../../common/assests';
import { Actions } from 'react-native-router-flux';
import BoxList from './BoxList'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { LoaderAction } from '../../redux/action'
import * as commonApi from '../../ServiceRequests/serviceContest'
import { Alert, PopUpScreen } from '../../common/alertPop'
import commonSty from '../../common/styles';
import { Button, Loader } from '../../components/customComponent';
import * as actionType from '../../redux/action';
import isUserAuthorizedItem from '../../utils/helpers/isUserAuthorizedItem';

function RoundQuestion(props) {
    const categoryUseRef = useRef(null);
    const dispatch = useDispatch()
    const loader = useSelector(state => state.authReducer.loader)

    //Error Dialog
    const [isDialogVisible, setDialogVisible] = useState(false)
    const [visiblerror, setVisibleError] = useState(false)

    // subscription alert dialog
    const [subscriptionAlert, setsubscriptionAlert] = useState(false);

    const { categoryList } = useSelector(state => ({
        categoryList: state.contestReducer.categoryList,
    }), shallowEqual);

    categoryUseRef.current = categoryList;

    const imageData = [
        { key: 'Brand1', isPress: false, icon: assests.gear },
        { key: 'Brand2', isPress: false, icon: assests.brand1 },
        { key: 'Brand3', isPress: false, icon: assests.brand1 },
        { key: 'Brand4', isPress: false, icon: assests.gear },
        { key: 'Brand5', isPress: false, icon: assests.brand1 },
        { key: 'Brand6', isPress: false, icon: assests.brand1 },
    ];

    const [metaData, setMetaData] = useState(false)

    const [selectedQuestion, setSelectedQuestion] = useState('')
    const [count1, setCount1] = useState(0)
    const [showCount, setShowCount] = useState(false)
    const [visibleCount1, isVisibleCount1] = useState(false)
    const [editButton, setEditButton] = useState('')

    const [visible, setVisible] = useState(false)
    const [errorMsgText, setErrorMsgText] = useState('')

    const [search, setSearch] = useState('')//Search
    const [searchdata, setSearchData] = useState([])

    useEffect(() => {
        DeviceEventEmitter.addListener(
            'setSearchData', () => {
                setSearch('')
            },
        )
        if (categoryUseRef.current.length == 0) {
            getCategoryListData()
        } else {
            let arrList = [...categoryUseRef.current];
            if (props.categorySeleList.length > 0) {
                console.log('++++++++', props.categorySeleList, arrList);
                let newArray = [];

                arrList.forEach((get) => {
                    get.data.forEach((map) => {
                        props.categorySeleList.forEach((set) => {
                            if (map._id === set._id) {
                                // arrList
                                // console.log("my new object set => ", map);mainTitle
                                const mainLableIndex = arrList.findIndex(x => x.mainTitle === get.mainTitle);


                                const subIndex = get.data.findIndex(x => x._id === set._id);

                                // console.log("whole get data object => ", JSON.stringify(get.data));
                                // console.log("whole get data object => index ", subIndex);


                                if (mainLableIndex > -1) {
                                    console.log("is it true data =>", JSON.stringify(get));
                                    // console.log("is it true data => ", JSON.stringify(arrList[mainLableIndex].data[subIndex]));
                                    arrList[mainLableIndex].data[subIndex].isSelected = true;
                                }

                                // console.log("my gettable data => ", arrList);
                                // arrList[mainLableIndex].data;
                            }
                        })
                    })
                })
            } else {
                arrList.map((item, i) => {
                    item.data.forEach((itemData, j) => {
                        itemData.isSelected = false
                    })
                })
            }

            dispatch(actionType.setCategoryList(arrList))
            // console.log("new edited array => ", arrList);
            setMetaData(!metaData)
        }
        console.log("calling category");
    }, [props.categorySeleList])

    const _applyAction = () => {
        setVisible(false),
            errorMsgText ? null : Actions.pop()
    }


    /**
     * Handle Back Click
     */
    const handleBackClick = () => {
        // let seleList = [];
        // categoryList.forEach((item, i) => {
        //     const newList = item.data.filter(ele => ele.isSelected)
        //     item.data.map(element => {
        //         if (element.isSelected) {
        //             seleList.push(element)
        //         }
        //     })
        // })
        // console.log('seleList::', seleList);
        // props.completionBlock(seleList)
        Actions.pop();
    }

    /**
     * Handle Done Click
     */
    const handleDoneClick = () => {
        let seleList = [];
        categoryList.forEach((item, i) => {
            const newList = item.data.filter(ele => ele.isSelected)
            item.data.map(element => {
                if (element.isSelected) {
                    seleList.push(element)
                }
            })
        })
        console.log('seleList::', seleList);
        props.completionBlock(seleList)

        // deselect
        let arrList = [...categoryUseRef.current];
        arrList.map((item, i) => {
            item.data.forEach((itemData, j) => {
                itemData.isSelected = false
            })
        })
        dispatch(actionType.setCategoryList(arrList))

        if (!props.noBack) {
            Actions.pop()
        }
    }

    function filterData(searchText) {
        var data = [...categoryList];

        searchText = searchText.trim().toLowerCase();

        let filteredData = data.map((element) => {
            const subData = element.data.filter((subElement) => subElement.name.toLowerCase().match(searchText));
            if (subData.length > 0) return { ...element, data: subData };
        }).filter((fItem) => fItem?.data?.length > 0);

        setSearchData(filteredData)
    }

    function filterCategory(text) {
        setSearch(text)
        if (text !== '') {
            filterData(text);
        } else {
            setSearchData([])
        }
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

    const _headerSkipButton = () => {
        return (
            <Button
                title={'Skip'}
                textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                style={styles['skipButton']}
                onPress={() => props.onSkipClick()}
            />
        );
    }
 
    return (
        <SafeAreaView style={styles.safeArea}>
            <MaineHeader
                isBack={!props.noBack}
                subHeaderTextS={{ color: '#fff' }}
                title={'Choose Category'}
                subTitle={'Search Category'}
                onBackClick={() => handleBackClick()}
                onChangeText={(text) => filterCategory(text)}
                search={search}
            // right={_headerRightButton()}
            />
            <PopUpScreen
                isModalVisible={visible}
                msgText={errorMsgText}
                isError={true}
                onCloseModal={() => setVisible(false)}
                _applyAction={() => _applyAction()}
            />
            <Loader isLoading={loader} />
            <View style={{ backgroundColor: '#22343C', flex: 1, }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingTop: 20 }}
                    keyboardShouldPersistTaps="always"
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={{ alignSelf: 'flex-end', position: 'absolute', right: 0, top: -20 }}>
                        <Image resizeMode={'contain'} source={assests.backLogo} />
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            (searchdata.length == 0 && search != '') ?
                                <Text style={{
                                    fontSize: 20,
                                    marginLeft: 13,
                                    color: '#ADBAC1',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    fontFamily: appConstants.AirbnbCerealAppLight
                                }}>No category available</Text>
                                : (searchdata.length > 0 && search != '') ?
                                    searchdata.map((item, i) => {
                                        return (
                                            <View key={i}>
                                                <BoxList
                                                    title={item.mainTitle}
                                                    data={item.data}
                                                    handleClick={(index, item) => handleBrandCLickFilter(searchdata, i, index, item)}
                                                    search={search}
                                                />
                                            </View>
                                        )
                                    }) : categoryList.length > 0 ?
                                        categoryList.map((item, i) => {
                                            return (
                                                <View key={i}>
                                                    <BoxList
                                                        title={item.mainTitle}
                                                        data={item.data}
                                                        handleClick={(index, item) => handleBrandCLick(categoryList, i, index, item)}
                                                        search={search}
                                                    />
                                                </View>
                                            )
                                        })
                                        : null
                        }
                    </View>

                    {/* <BoxList
                        title={'General'}
                    />
                    <BoxList
                        title={'Entertainment'}
                    />
                    <BoxList
                        title={'Business'}
                    /> */}
                    <View style={{ marginBottom: 100 }}>

                    </View>
                    <PopUpScreen
                        isModalVisible={visiblerror}
                        msgText={errorMsgText}
                        isError={true}
                        onCloseModal={() => setVisibleError(false)}
                        _applyAction={() => _applyAction()}
                    />
                </ScrollView>

                <View style={{ height: 20 }} />

                <View style={styles.bottomButtonsView}>
                    {_headerRightButton()}
                    {props.noBack &&
                        <>
                            <View width={20} />

                            {_headerSkipButton()}
                        </>
                    }
                </View>
            </View>

            {/* alert for subscription */}
            <Alert
                // title={'Are you sure!'}
                heading={appStrConstants.SUBSCRIPTION_MESSAGE}
                isModalVisible={subscriptionAlert}
                buttonTitle={'OK'}
                customYesTitle
                cancleTitle={'No'}
                isHideCancel
                onCancel={() => setsubscriptionAlert(false)}
                logout={() => setsubscriptionAlert(false)}
            />
        </SafeAreaView>
    );

    function renderNoData() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'red' }}>
                <Text style={commonSty.noDataTextSty}>{'No data availables'}</Text>
            </View>
        )
    }

    /**
     * Handle Brand Click 
     */
    function handleBrandCLick(categoryData, sectionIndex, rowIndex, rowItem) {

        // if (rowItem)
        // setsubscriptionAlert(true);

        // console.log("new category item on press => ", JSON.stringify(rowItem));

        if (isUserAuthorizedItem(rowItem?.subscriptionType)) {
            let arrList = categoryData;
            arrList[sectionIndex].data[rowIndex].isSelected = !arrList[sectionIndex].data[rowIndex].isSelected
            dispatch(actionType.setCategoryList(arrList))
            setMetaData(!metaData)
        } else {
            setsubscriptionAlert(true);
        }
    }

    function handleBrandCLickFilter(categoryData, sectionIndex, rowIndex, rowItem) {
        let arrList = categoryData;
        arrList[sectionIndex].data[rowIndex].isSelected = !arrList[sectionIndex].data[rowIndex].isSelected
        setMetaData(!metaData)
    }

    /**
     * Get CategoryList Data
     */
    async function getCategoryListData() {
        dispatch(LoaderAction(true))
        const response = await commonApi.getCategoryList(dispatch)

        console.log("get category data from server => ", JSON.stringify(response));

        if (response['status']) {
            const arrData = response.data
            let titleList = [];
            arrData.map(item => {
                if (titleList.indexOf(item.mainLabel) === -1) {
                    titleList.push(item.mainLabel)
                }
            })
            console.log('titleList::', titleList);
            let categoryArrList = [];
            if (titleList.length > 0) {
                titleList.forEach(element => {
                    let filterData = arrData.filter(item => item.mainLabel === element)
                    for (var i in filterData) {
                        var datum = filterData[i];
                        datum.isSelected = false
                    }
                    console.log('filterData::', filterData);
                    let object = {
                        mainTitle: element,
                        data: filterData,
                    }
                    categoryArrList.push(object)
                })
                console.log('categoryArrList::', JSON.stringify(categoryArrList));
                if (categoryArrList.length > 0) {
                    dispatch(actionType.setCategoryList(categoryArrList))
                    // setCategoryListData(categoryArrList)
                } else {
                    setTimeout(() => {
                        setErrorMsgText('No data available')
                        setVisible(true)
                    }, 1000);
                }
            }
            //console.log('response.data::', response.data);
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
