import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Text,
    ScrollView,
    StatusBar,
    FlatList,
    TextInput,
    TouchableOpacity,
    ActionSheetIOS,
    BackHandler,
    DeviceEventEmitter
} from 'react-native';
import { styles } from './styles';
// components
import appConstants from '../../../common/appConstants';
import MaineHeader from '../../../common/headerWithText'
import assests from '../../../common/assests';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import {
    Button,
    InputIcons, Input, InputCreteContest
} from '../../../components/customComponent';
import { AddImage, SaveTo, LanguagePop, HashTag, Alert, RoundPopUp, AddMyGroupPopUp } from '../../../common/alertPop'
import color from '../../../utils/color';
import * as validation from '../../../utils/validation';
import { getFontSize, dynamicSize } from '../../../utils/responsive'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setBrandList, setSeleCategoryList } from '../../../redux/action';
import { Loader } from '../../../components/customComponent';
import * as actionType from '../../../redux/action';
import { PLAYER_TYPE } from '../../../utils/enum';
import { consoleLog, getData } from '../../../components/helper';
import { LoaderAction } from '../../../redux/action'
import * as commonApi from '../../../ServiceRequests/serviceContest';
import * as apiCall from '../../../ServiceRequests/serviceAuth';
import localKey from '../../../utils/localStorageKey';
import { getLoginData } from '../../../utils/session';
import { PopUpScreen } from '../../../common/alertPop';
import AsyncStorage from '@react-native-community/async-storage';
import Slider from '@react-native-community/slider';

function DiscussionDetails(props) {
    const brandListRef = useRef(null);

    const imageData = [
        { key: 'Android' },
        { key: 'Android' },
    ];

    const dispatch = useDispatch()

    const loader = useSelector(state => state.authReducer.loader)

    const { brandList } = useSelector(state => ({
        brandList: state.contestReducer.brandList,
    }));

    brandListRef.current = brandList;

    const [image, setImage] = useState('');
    const [imageFromPicker, setImageFromPicker] = useState(false);
    const [myGroupdialog, setmyGroupdialog] = useState(false);
    const [isScore, setisScore] = useState(false);
    const [popUpTitle, setPopTitle] = useState('');
    const [saveTo, setSaveTo] = useState('Save To');
    const [saveToName, setSaveToName] = useState('Save To');

    const [isAddImage, setAddImage] = useState(false) //Picker Model show/hide
    const [languageModal, setLanguageModal] = useState(false)
    const [setLanguage, onSetLanguage] = useState('English')
    const [getLangauge, setlangauge] = useState('English')
    const [getSave, setSave] = useState('')
    const [getSaveName, setSaveName] = useState('');

    const [hashTagData, setHashTagData] = useState('');
    const [hastag, sethashTag] = useState(false);
    const [hashTagText, setHashTagText] = useState('');

    const [playerType, setPlayerType] = useState(1) //1: Single, 2: Multi
    const [visibility, setVisibility] = useState(2) //1: All, 2: Only Me

    const [selectedBrandList, setSelectedBrandList] = useState([]);
    const [metaData, setMetaData] = useState(false)
    const [selectedCategoryList, setSelectedCategoryList] = useState([]);

    //Error Dialog
    const [isDialogVisible, setDialogVisible] = useState(false)
    const [errorMsgText, setErrorMsgText] = useState('')
    const [visiblerror, setVisibleError] = useState(false)

    const [titleStatus, setTitleStatus] = useState({ status: true, error: '' })
    const [isVaildTitlw, setIsVaildTitle] = useState(false)

    const [descriptionStatus, setDescriptionStatus] = useState({ status: true, error: '' })
    const [isVailddescription, setIsVaildDescription] = useState(false)

    const [languageStatus, setlanguadeStatus] = useState({ status: true, error: '' })
    const [isVaildlanguage, setIsVaildlanguage] = useState(false)

    // const [saveToStatus, setsaveToStatus] = useState({ status: true, error: '' })
    // const [isVaildSaveTo, setIsVaildSaveTo] = useState(false)

    const [chooseCategoryStatus, setchooseCategoryStatus] = useState({ status: true, error: '' })
    const [isValidChooseCategory, setisValidChooseCategory] = useState(false)

    const [chooseBrandStatus, setchooseBrandStatus] = useState({ status: true, error: '' })
    const [isValidChooseBrand, setisValidChooseBrand] = useState(false)

    const [imageStatus, setimageStatus] = useState({ status: true, error: '' })

    const [alertPopUp, setalertPopUp] = useState(false);

    const [title, setTitle] = useState('')
    const [discription, setDiscription] = useState('')


    useEffect(() => {
        // comment this code because of live validation has issue from this condition
        // setTitleStatus({ status: false, error: '' })
        // setIsVaildTitle(false)
    }, [title, discription, getSave]);

    useEffect(() => {
        // setalertPopUp(true);

        // setErrorMsgText("New Error display here!");
        // setVisibleError(true);

        setOldDataForUpdate();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    // run when only come for update the data
    const setOldDataForUpdate = async () => {
        console.log("edit contest data => entr => ", JSON.stringify(props.createScreen));
        if (props.createScreen != undefined && props.createScreen != null) {
            console.log("edit contest data => ", JSON.stringify(props.createScreen));
            // convert array based on last array for screen conpatable
            const hashData = props.createScreen.hashtag.join(','); // map((hashtag) => ({ 'key': hashtag }));
            // console.log("props.createScreen => ", JSON.stringify(props.createScreen.categoryIds));

            // get category
            const categoryResponse = await commonApi.getCategoryList(dispatch);


            // convert array based on last array for screen conpatable
            const category = props.createScreen.categoryIds.map(({ categoryId, mainLabelId }) => {
                let returnObj = null;
                categoryResponse.data.forEach((categoryObj) => {
                    if (categoryObj._id === categoryId) {
                        returnObj = { '_id': categoryId, 'mainLabel': mainLabelId, name: categoryObj.name };
                    }
                })
                if (returnObj) return returnObj;
            });

            console.log("category response get => ", category);

            // convert array based on last array for screen conpatable
            await getBransListData();

            const brands = props.createScreen.brandIds.map((brandId) => {
                if (brandId) {
                    return { ...brandListRef.current.find(brandObj => brandObj._id === brandId), isSelected: true };
                }
            }).filter((brandsData) => { if (brandsData) return true });


            setTitle(props.createScreen.title);
            setDiscription(props.createScreen.description);

            onSetLanguage(props.createScreen.language)
            setlangauge(props.createScreen.language);

            // console.log("saveToId => ", JSON.stringify(props.createScreen));

            if (props.createScreen.saveToId) setSave(props.createScreen.saveToId);

            setPlayerType(props.createScreen.playerType);

            setVisibility(props.createScreen.visibility);

            setHashTagData(hashData); // [...hashTagData, { 'key': hashTagText }]

            // let object = {
            //     categoryId: item._id,
            //     mainLabelId: item.mainLabel
            // }
            // alert(JSON.stringify(category));
            setSelectedCategoryList(category);

            setSelectedBrandList(brands);

            setImage(props.createScreen.image);
            // console.log("my create screen props => ", JSON.stringify(props.createScreen));
        }
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

    const imagePickerAcion = (isCamera) => {
        // setTimeout(() => {
        setAddImage(false);
        // }, 3000);
        setTimeout(() => {
            if (isCamera) {
                ImagePicker.openCamera({
                    cropping: true,
                    width: 400,
                    height: 250,
                }).then(image => {
                    console.log(image);
                    setimageStatus({ status: false, error: '' })
                    setImage(image.path)
                    setAddImage(false)
                    setImageFromPicker(true);
                });
            }
            else {
                ImagePicker.openPicker({
                    cropping: true,
                    width: 400,
                    height: 250,
                }).then(image => {
                    // debugger
                    console.log(image);
                    setimageStatus({ status: false, error: '' })
                    setImage(image.path)
                    setAddImage(false)
                    setImageFromPicker(true);
                });
            }
        }, 1000);
    }

    // remove the close button on the image
    const removeImage = () => {
        try {
            setimageStatus({ status: true, error: '' });
            setImage('');
            setAddImage(false);
            setImageFromPicker(false);
        } catch (error) {
        }
    }

    const _onLangaugeSelection = (language) => {
        setLanguageModal(false)
        if (language !== '') {
            setlangauge(language);
            setlanguadeStatus({ status: false, error: '' })
            setIsVaildlanguage(false)
            onSetLanguage(language)
        } else {
            onSetLanguage('English')
            setlangauge('English');
        }
    }

    const _onSavePressed = (savetoName, savetoId) => {
        setSave(savetoId);
        setSaveToName(savetoName);
        setSaveName(savetoName);
        setisScore(false)
        setSaveTo(savetoId)
    }

    const _onHashTagSelect = () => {
        // debugger
        if (validation.isEmpty(hashTagText) == false) {
            setHashTagData([...hashTagData, { 'key': hashTagText }]);
        }
        sethashTag(false)
        setHashTagText('')
    }

    /**
     * Handle Popup Click
     */
    const _applyAction = () => {
        // setDialogVisible(false)
        setVisibleError(false),
            errorMsgText ? null : Actions.pop()
    }

    /**
     * Validate Input on update
     */
    const onChangeTextVaidation = (title) => (text) => {
        const error = `Please enter ${title}`;
        if (title === "title") {
            setTitle(text);
            if (validation.isEmpty(text)) {
                setTitleStatus({ status: true, error })
                setIsVaildTitle(true)

            } else {
                setTitleStatus({ status: false, error: '' })
                setIsVaildTitle(false)
            }
        } else if (title === "description") {
            setDiscription(text);
            if (validation.isEmpty(text)) {
                setDescriptionStatus({ status: true, error });
                setIsVaildDescription(true);
            } else {
                setDescriptionStatus({ status: false, error: '' })
                setIsVaildDescription(false)
            }
        } else if (title === "hashtag") {
            setHashTagData(text);
            // if (validation.isEmpty(text)) {
            // setDescriptionStatus({ status: true, error });
            // setIsVaildDescription(true);
            // } else {
            // setDescriptionStatus({ status: false, error: '' })
            // setIsVaildDescription(false)
            // }
        }
    }

    /**
     * Select language from modal
     */
    const selectLanguageFromModal = (language) => {
        setlangauge(language);
        setlanguadeStatus({ status: false, error: '' })
        setIsVaildlanguage(false)
    }

    const onHeaderBack = () => {
        if (!props.createScreen || props.forFirstUpdate) {
            setalertPopUp(true);
        } else {
            Actions.pop();
        }
    }

    const handleBackButtonClick = () => {
        if (!props.createScreen || props.forFirstUpdate) {
            setalertPopUp(true);
        } else {
            Actions.pop();
        }
        return true
    }
    
    const onDonePress = () => {
        Actions.reset('Tabs');
    }

    const _onAddDonePress = (name) => {
        setmyGroupdialog(false);
        addGroupAPI(name);
    }

    const addGroupAPI = async (name) => {
        try {
            const userID = await AsyncStorage.getItem('userid');
            // dispatch(LoaderAction(true));

            const formData = new FormData();

            formData.append("userId", userID);
            formData.append("saveToTitle", name);

            console.log("formdata send to => ", formData);

            const response = await apiCall.addMyGroups(formData, dispatch);

            if (response['status']) {
                dispatch(actionType.setGameList(response.data));
                // setgroupData(response.data);
                Actions.refresh({ key: 'createScreen',})
                setisScore(true);
            } else {
                // seterrorVisible(true);
                setErrorMsgText(response.message);
            }
        } catch (error) {
            alert(error);
            // seterrorVisible(true);
            setErrorMsgText("Something went wrong!");
        }
    }

    return (
        // console.log('//////////////Text', title, discription, getSave),
        <SafeAreaView style={[styles.safeArea,]}>
            <StatusBar backgroundColor={color.statusBar} barStyle="light-content" />
            <MaineHeader
                isBack//={props.createScreen}
                subHeaderTextS={{ color: '#fff' }}
                title={'Contest Details'}
                onBack={() => onHeaderBack()}
            />

            <Loader isLoading={loader} />
            <Alert
                title={errorMsgText}
                isModalVisible={isDialogVisible}
                buttonTitle={'Ok'}
                heading={''}
                isHideCancel={true}
                onCancel={() => setSaveTo(false)}
                logout={() => _applyAction()}
            />
            <View style={{ backgroundColor: '#22343C', flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingTop: 20 }}>
                    <View style={{ alignSelf: 'flex-end', position: 'absolute', right: 0, top: -20 }}>
                        <Image resizeMode={'contain'} source={assests.backLogo} />
                    </View>
                    <View style={styles.innerContainer}>
                        <TouchableOpacity onPress={() => setAddImage(true)} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#324B55', height: 152, borderRadius: 10 }}>
                            {
                                image
                                    ?
                                    <View style={{ width: '100%' }}>
                                        <Image imageStyle={{ borderRadius: 10 }} style={{ height: '100%', width: '100%', borderRadius: 10 }} source={{ uri: image }} />


                                        <TouchableOpacity
                                            onPress={() => {
                                                removeImage()
                                            }}
                                            style={{
                                                backgroundColor: color.goldenColor,
                                                padding: 5,
                                                borderRadius: 10,
                                                position: 'absolute',
                                                right: 10,
                                                top: 10
                                            }}
                                        >
                                            <Image style={{ height: 10, width: 10 }} resizeMode={'contain'} source={assests.crossSmall}/>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View>
                                        <Image style={{ alignSelf: 'center' }} source={assests.upload} />
                                        <Text style={{ marginTop: 8.5, color: '#ADBAC1', fontFamily: appConstants.AirbnbCerealAppBook, fontSize: 16 }}>Add Image</Text>
                                    </View>
                            }
                        </TouchableOpacity>
                        <Text style={styles.bottomErrorStyle}>
                            {imageStatus.error}
                        </Text>

                        <Input
                            // containerStyle={{ marginTop: 40 }}
                            // icon={assests.title}
                            // title={'Title'}
                            // placeholder={'Type Input'}
                            // value={title}
                            // onChangeText={(text) => setTitle(text)}

                            onChangeText={onChangeTextVaidation("title")}
                            value={props.createScreen?.title || title || ''}
                            defaultValue={props.createScreen?.title || title || ''}
                            setValue={title}
                            keyboardType={'default'}
                            style={{ width: '100%' }}
                            blurOnSubmit={false}
                            placeholder={'Title'}
                            icon={assests.title}
                            isFiledImage
                            // autoCapitalize={'none'}
                            // source={!isVaildTitlw ? assests.check : (titleStatus['error'] ? assests.info : '')}
                            source={isVaildTitlw ? assests.info : (validation.isEmpty(title) ? '' : assests.check)}
                            labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                            errorMessage={titleStatus['error']}
                        />

                        <Input
                            // icon={assests.paper}
                            // title={'Description'}
                            // placeholder={'Type here...'}
                            // value={discription}
                            // onChangeText={(text) => setDiscription(text)}

                            onChangeText={onChangeTextVaidation("description")}
                            value={props.createScreen?.description || discription || ''}
                            keyboardType={'default'}
                            style={{ width: '100%', height: dynamicSize(50) }}
                            blurOnSubmit={false}
                            placeholder={'Description'}
                            icon={assests.paper}
                            isFiledImage
                            // autoCapitalize={'none'}
                            // source={isVailddescription ? assests.info : (validation.isEmpty(discription) ? '' : assests.check)}
                            source={validation.isEmpty(discription) ? '' : assests.check}
                            labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        // errorMessage={descriptionStatus['error']}
                        />


                        {/* new hashtag component */}
                        <Input
                            onChangeText={onChangeTextVaidation("hashtag")}
                            value={props?.createScreen?.hashtag.join(',') || hashTagData || ''}
                            keyboardType={'default'}
                            style={{ width: '100%', height: dynamicSize(50) }}
                            blurOnSubmit={false}
                            placeholder={'Hashtag'}
                            icon={assests.hashtag}
                            isFiledImage
                            // autoCapitalize={'none'}
                            // source={isVailddescription ? assests.info : (validation.isEmpty(discription) ? '' : assests.check)}
                            source={validation.isEmpty(hashTagData) ? '' : assests.check}
                            labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        // errorMessage={descriptionStatus['error']}
                        />


                        {/* <InputIcons
                            icon={assests.hashtag}
                            title={'Hashtag'}
                            placeholder={'Type here...'}
                            onChangeText={(text) => sethashTagText(text)}
                        /> */}
                        {/* <InputIcons
                            icon={assests.global}
                            title={'Language'}
                            touch={true}
                            value={setLanguage}
                            onPress={() => setLanguageModal(true)}
                            placeholder={'Choose language'}
                        /> */}
                        <InputCreteContest
                            style={{ width: '100%', height: dynamicSize(50) }}
                            placeholder={getLangauge || "Language"} // setLanguage
                            defaultTitle={"Language"}
                            icon={assests.global}
                            isFiledImage
                            source={isVaildlanguage ? assests.info : ''}
                            errorMessage={languageStatus['error']}
                            onPress={() => setLanguageModal(true)}
                        />
                        {/* <InputIcons
                            icon={assests.saveTo}
                            title={'Save To'}
                            touch={true}
                            value={saveTo}
                            onPress={() => setisScore(true)}
                            placeholder={'Select save to'}
                        /> */}
                        <InputCreteContest
                            style={{ width: '100%', height: dynamicSize(50) }}
                            placeholder={getSaveName === '' ? saveToName : getSaveName}
                            defaultTitle={'Save To'}
                            icon={assests.saveTo}
                            isFiledImage
                            // source={isVaildlanguage ? assests.info : ''}
                            // errorMessage={languageStatus['error']}
                            onPress={() => setisScore(true)}
                        />
                        {/** Player Type Selection */}
                        <View style={{ flexDirection: 'row', marginTop: dynamicSize(20), }}>
                            <Image source={assests.mygames} style={{ alignSelf: 'center', }} />
                            <Text style={styles.subTitleSty}>{'Player Type'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 16 }}>
                            <View style={{ width: '50%' }}>
                                <TouchableOpacity onPress={() => setPlayerType(1)}
                                    style={{ justifyContent: 'flex-start', flexDirection: 'row', marginStart: 20 }}>
                                    <Image source={playerType == 1 ? assests.radio_btn_sel : assests.radio_btn_unselect} style={{ width: 18, height: 18, alignSelf: 'center', tintColor: '#ADBAC1' }} />
                                    <Text style={{ fontSize: 16, fontFamily: appConstants.AirbnbCerealAppLight, color: '#FFFFFF', marginStart: 10, }}>
                                        {'Single'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%', }}>
                                <TouchableOpacity onPress={() => setPlayerType(2)}
                                    style={{ justifyContent: 'flex-start', flexDirection: 'row', }}>
                                    <Image source={playerType == 2 ? assests.radio_btn_sel : assests.radio_btn_unselect} style={{ width: 18, height: 18, alignSelf: 'center', tintColor: '#ADBAC1' }} />
                                    <Text style={{ fontSize: 16, fontFamily: appConstants.AirbnbCerealAppLight, color: '#FFFFFF', marginStart: 10, }}>
                                        {'Multiplayer'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/** Visibility Selection */}
                        <View style={{ flexDirection: 'row', marginTop: dynamicSize(20), }}>
                            <Image source={assests.enable} style={{ alignSelf: 'center', }} />
                            <Text style={styles.subTitleSty}>{'Visibility'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 16 }}>
                            <View style={{ width: '50%' }}>
                                <TouchableOpacity onPress={() => setVisibility(2)}
                                    style={{ justifyContent: 'flex-start', flexDirection: 'row', marginStart: 20 }}>
                                    <Image source={visibility == 2 ? assests.radio_btn_sel : assests.radio_btn_unselect} style={{ width: 18, height: 18, alignSelf: 'center', tintColor: '#ADBAC1' }} />
                                    <Text style={{ fontSize: 16, fontFamily: appConstants.AirbnbCerealAppLight, color: '#FFFFFF', marginStart: 10, }}>
                                        {'All'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '50%', }}>
                                <TouchableOpacity onPress={() => setVisibility(1)}
                                    style={{ justifyContent: 'flex-start', flexDirection: 'row', }}>
                                    <Image source={visibility == 1 ? assests.radio_btn_sel : assests.radio_btn_unselect} style={{ width: 18, height: 18, alignSelf: 'center', tintColor: '#ADBAC1' }} />
                                    <Text style={{ fontSize: 16, fontFamily: appConstants.AirbnbCerealAppLight, color: '#FFFFFF', marginStart: 10, }}>
                                        {'Only Me'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/** HashTag */}
                        {/* <View style={{ flexDirection: 'row', marginTop: 27 }}>
                            <Text style={{ fontFamily: appConstants.AirbnbCerealAppMedium, fontSize: 16, color: '#FCD274', marginRight: 10 }}>Hashtag</Text>
                            <TouchableOpacity onPress={() => sethashTag(true)}>
                                <Image source={assests.plusY} />
                            </TouchableOpacity>
                        </View>
                        {hashTagData.length > 0 ?
                            < FlatList
                                showsHorizontalScrollIndicator={false}
                                data={hashTagData}
                                horizontal={true}
                                renderItem={({ item, index }) => (
                                    <View style={styles.categoryContainer}>
                                        <Text style={styles.categoryText}>{item.key}</Text>
                                        <TouchableOpacity onPress={() => handleDeleteHashTagClick(index)}
                                            style={{ padding: 8, }}
                                        >
                                            <Image source={assests.crossCircle} />
                                        </TouchableOpacity>

                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            /> : null} */}

                        {/** Choose Category */}
                        <View style={{ flexDirection: 'row', marginTop: 27 }}>
                            <Text style={{ fontFamily: appConstants.AirbnbCerealAppMedium, fontSize: 16, color: '#FCD274', marginRight: 10 }}>Choose Category</Text>
                            <TouchableOpacity onPress={() => Actions.catergoryList(
                                {
                                    categorySeleList: selectedCategoryList,
                                    completionBlock: (data) => updateCategoryData(data)
                                }
                            )}>
                                <Image source={assests.plusY} />
                            </TouchableOpacity>
                        </View>


                        {selectedCategoryList.length > 0 ?
                            <FlatList
                                key={'category'}
                                showsHorizontalScrollIndicator={false}
                                data={selectedCategoryList}
                                horizontal={true}
                                renderItem={({ item, index }) => (
                                    <View style={styles.categoryContainer}>
                                        <Text style={styles.categoryText}>{item?.name || ""}</Text>
                                        <TouchableOpacity onPress={() => handleDeleteCategoryClick(index)}
                                            style={{ padding: 8, }}
                                        >
                                            <Image source={assests.crossCircle} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            /> : null}
                        {
                            chooseCategoryStatus.error
                                ?
                                <Text style={styles.bottomErrorStyle}>
                                    {chooseCategoryStatus.error}
                                </Text>
                                :
                                null
                        }


                        {/** Choose Brand */}
                        <View style={{ flexDirection: 'row', marginTop: 27 }}>
                            <Text style={{ fontFamily: appConstants.AirbnbCerealAppMedium, fontSize: 16, color: '#FCD274', marginRight: 10 }}>Choose Brand</Text>
                            <TouchableOpacity onPress={() =>
                                Actions.brandList(
                                    {
                                        brandSeleList: selectedBrandList,
                                        completionBlock: (data) => updateBrandListData(data)
                                    }
                                )}>
                                <Image source={assests.plusY} />
                            </TouchableOpacity>
                        </View>

                        {selectedBrandList.length > 0 ?
                            <FlatList
                                key={'brand'}
                                showsHorizontalScrollIndicator={false}
                                data={selectedBrandList}
                                horizontal={true}
                                renderItem={({ item, index }) => (
                                    <View style={styles.categoryContainer}>
                                        <Text style={[styles.categoryText]}>{item.name}</Text>
                                        <TouchableOpacity onPress={() => handleDeleteBrandClick(index)}
                                            style={{ padding: 8, }} >
                                            <Image source={assests.crossCircle} style={{}} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            /> : null}
                        {
                            chooseBrandStatus.error
                                ?
                                <Text style={styles.bottomErrorStyle}>
                                    {chooseBrandStatus.error}
                                </Text>
                                :
                                null
                        }
                        <Button
                            title={'Save & Next'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                            style={styles['signupButton']}
                            onPress={() => saveContestClick()}
                        />
                        <AddImage
                            isModalVisible={isAddImage}
                            onCancel={() => setAddImage(false)}
                            onCamera={() => imagePickerAcion(true)}
                            onGallery={() => imagePickerAcion(false)}
                        />
                        <SaveTo
                            isModalVisible={isScore}
                            onCancel={() => setisScore(false)}
                            selectedSaveTo={getSave}
                            onAddPress={()=>{
                                setisScore(false);
                                setmyGroupdialog(true);
                            }}
                            saveToDataLoad={(selectedName) => {
                                setSaveToName(selectedName);
                                setSaveName(selectedName);
                            }}
                            // onSetLanguage={(language) => setSave(language)}
                            onDonePress={(savetoName, savetoId) => _onSavePressed(savetoName, savetoId)}
                            dispatch={dispatch}
                        />
                        <AddMyGroupPopUp
                            title={'Add Group'}
                            buttonTitle={'Add'}
                            cancelTitle={'Cancel'}
                            isModalVisible={myGroupdialog}
                            onBackClick={() => setmyGroupdialog(false)}
                            onDoneClick={(name) => _onAddDonePress(name)}
                        />
                        <LanguagePop
                            selectedLangauge={getLangauge || 'English'}//getLangauge}
                            // onSetLanguage={(language) => selectLanguageFromModal(language)}
                            onDonePress={(language) => _onLangaugeSelection(language)}
                            isModalVisible={languageModal}
                            onCancel={() => setLanguageModal(false)}
                        />
                        {/* <HashTag
                            hashtagValue={''}
                            title={'Hashtag'}
                            placeHolder={'Type hashtag'}
                            value={hashTagText}
                            onChangeText={(text) => setHashTagText(text)}
                            onDonePress={() => _onHashTagSelect()}
                            isModalVisible={hastag}
                            onCancel={() => {
                                setHashTagText('')
                                sethashTag(false)
                            }}
                        /> */}
                    </View>

                    <Alert
                        // title={'Are you sure!'}
                        heading={'Are you sure, you want to exit?'}
                        isModalVisible={alertPopUp}
                        buttonTitle={'Yes'}
                        cancleTitle={'No'}
                        onCancel={() => setalertPopUp(false)}
                        logout={() => onDonePress()}
                    />

                    <PopUpScreen
                        isModalVisible={visiblerror}
                        msgText={errorMsgText}
                        isError={true}
                        onCloseModal={() => setVisibleError(false)}
                        _applyAction={() => _applyAction()}
                    />
                </ScrollView>
            </View>

        </SafeAreaView>
    );

    /**
     * Update BrandList Data
     */
    function updateCategoryData(arrList) {
        console.log('category updated => ' + JSON.stringify(arrList));
        setSelectedCategoryList(arrList)
        if (arrList.length > 0) {
            setchooseCategoryStatus({ status: false, error: '' });
            setisValidChooseCategory(false);
        }
        setMetaData(!metaData)
    }

    /**
    * Delete Category Click
    */
    function handleDeleteHashTagClick(rowIndex) {
        let arrList = hashTagData
        arrList.splice(rowIndex, 1)
        setHashTagData(arrList)
        setMetaData(!metaData)
    }

    /**
    * Delete Category Click
    */
    function handleDeleteCategoryClick(rowIndex) {
        let arrList = selectedCategoryList
        arrList.splice(rowIndex, 1)
        setSeleCategoryList(arrList)
        if (arrList.length === 0) {
            setchooseCategoryStatus({ status: true, error: 'Please select category' });
            setisValidChooseCategory(true);
        }
        setMetaData(!metaData)
    }


    /**
     * Update BrandList Data
     */
    function updateBrandListData(arrList) {
        setSelectedBrandList(arrList)
        // console.log("category updated =>", arrList);
        if (arrList.length > 0) {
            setchooseBrandStatus({ status: false, error: '' });
            setisValidChooseBrand(false);
        }
        setMetaData(!metaData)
    }

    /**
     * Delete Brand Click
     */
    function handleDeleteBrandClick(rowIndex) {
        let arrList = selectedBrandList
        arrList.splice(rowIndex, 1)
        setSelectedBrandList(arrList)
        if (arrList.length === 0) {
            // setchooseBrandStatus({ status: true, error: 'Please select brand' });
            // setisValidChooseBrand(true);
        }
        setMetaData(!metaData)
    }

    /**
     * Save and Next Contest Click
     */
    async function saveContestClick() {
        try {
            // Actions.roundTryScreen()
            // return

            setTitleStatus({ status: false, error: '' })
            setIsVaildTitle(false)

            setDescriptionStatus({ status: false, error: '' })
            setIsVaildDescription(false)

            setlanguadeStatus({ status: false, error: '' })
            setIsVaildlanguage(false)

            setchooseCategoryStatus({ status: false, error: '' });
            setisValidChooseCategory(false);

            setchooseBrandStatus({ status: false, error: '' });
            setisValidChooseBrand(false);

            setimageStatus({ status: false, error: '' })

            if (validation.isEmpty(title)) {
                setTitleStatus({ status: true, error: 'Please enter title' })
                setIsVaildTitle(true)
            }
            // else if (validation.isEmpty(discription)) {
            //     setDescriptionStatus({ status: true, error: 'Please enter description' })
            //     setIsVaildDescription(true)
            // }
            else if (!getLangauge || setLanguage == '') {
                setlanguadeStatus({ status: true, error: 'Please select language' })
                setIsVaildlanguage(true)
            }
            // else if (getSave == '') {
            //     setlanguadeStatus({ status: true, error: 'Please select save to' })
            //     setIsVaildlanguage(true)
            // }
            else if (playerType == 0) {
                setTimeout(() => {
                    setErrorMsgText('Please select player type');
                    setVisibleError(true);
                }, 300);

            } else if (visibility == 0) {
                setTimeout(() => {
                    setErrorMsgText('Please select visibility');
                    setVisibleError(true);
                }, 300);
            }
            // else if (hashTagData.length == 0) {
            //     setTimeout(() => {
            //         setErrorMsgText('Please enter hashTag')
            //         setVisibleError(true)
            //     }, 300);
            // }
            else if (selectedCategoryList.length == 0) {
                setTimeout(() => {
                    setchooseCategoryStatus({ status: true, error: 'Please select category' });
                    setisValidChooseCategory(true);
                    // setErrorMsgText('Please select category')
                    // setVisibleError(true)
                }, 300);
            }
            // else if (selectedBrandList.length == 0) {
            //     setTimeout(() => {
            //         setchooseBrandStatus({ status: true, error: 'Please select brand' });
            //         setisValidChooseBrand(true);
            //         // setErrorMsgText('Please select brand')
            //         // setVisibleError(true)
            //     }, 300);
            // }
            // else if (validation.isEmpty(image)) {
            //     // setTimeout(() => {
            //     //     setErrorMsgText('Please add image')
            //     //     setVisibleError(true)
            //     // }, 300);
            //     setimageStatus({ status: true, error: 'Please add image' })
            // }
            else {

                // let hashTagStr = hashTagData.join(',')
                // let hashTagStr = []
                // let hashTagStrObject = {}
                // hashTagData.forEach(item => {
                //     hashTagStr.push(item.key)
                // })
                // hashTagStrObject = hashTagStr.join(',')
                //Category
                let arrCategory = [];
                selectedCategoryList.forEach(item => {
                    let object = {
                        categoryId: item._id,
                        mainLabelId: item.mainLabel
                    }
                    arrCategory.push(object)
                })
                //BrandList
                let arrBrand = selectedBrandList.map(item => item._id)
                let brandStr = arrBrand.join(',')

                let userData = await getLoginData()
                console.log('userData::', userData);
                console.log('userId::', userData.userId);

                let formData = new FormData()
                formData.append('title', title)
                formData.append('description', discription);
                formData.append('playerType', playerType)
                formData.append('createdBy', userData.userId)
                formData.append('visibility', visibility)
                formData.append('saveToId', getSave);
                formData.append('language', setLanguage)
                formData.append('hashtag', hashTagData)
                formData.append('categoryIds', JSON.stringify(arrCategory))
                formData.append('brandIds', brandStr)

                if (validation.isEmpty(image) == false && imageFromPicker) {
                    let res1 = image.split("/");
                    let spltDot = res1[res1.length - 1].split(".");
                    var timeStamp = Math.floor(Date.now());
                    formData.append("image", {
                        uri: Platform.OS == 'ios' ? 'file://' + image : image,
                        type: "image/jpeg",
                        name: timeStamp + "." + spltDot[spltDot.length - 1]
                    });
                    //  formData.append('media', 'file://' + feedImage)
                }
                else {
                    // // formData.append("image", '')
                    // setTimeout(() => {
                    //     setErrorMsgText('Please add image')
                    //     setVisibleError(true)
                    // }, 300);
                }

                console.log('formData::', formData);

                dispatch(LoaderAction(true))
                let response = {};
                let fromCreate = false;
                if (props.createScreen) {
                    const id = props.createScreen._id;
                    // alert(id);
                    // console.log("id =>>>>>> update the data" + id);
                    response = await commonApi.updateContestDetailsAPI(formData, dispatch, id)
                    try {
                        DeviceEventEmitter.emit('MyGameList');
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    // console.log("id =>>>>>> create the data");
                    response = await commonApi.saveContestAPI(formData, dispatch);

                    console.log("create contest response => ", JSON.stringify(response));


                    fromCreate = true;

                    console.log("create response => ", JSON.stringify(response.data.jsonData.data));
                }

                if (response['status']) {
                    await AsyncStorage.setItem("categoryid", response.data.jsonData.data._id)
                    if (!props.createScreen) {
                        // setTitle('')
                        // setDiscription('')
                        // setPlayerType(1)
                        // setVisibility(1)
                        // setImage('')
                        // setHashTagData([])
                        // onSetLanguage('English')
                        // setSave('')
                        // setSelectedCategoryList([])
                        // setSelectedBrandList({})
                    }
                    // console.log("create screen => ", JSON.stringify(response.jsonData.data));
                    // if (!props.createScreen) Actions.roundTryScreen();
                    // else { Actions.popTo("mygames"); }
                    setTimeout(() => {
                        let sendObject = {
                            fromCreate,
                            playerType
                        };

                        if (fromCreate) {
                            sendObject = { ...sendObject, contestInfo: response.data.jsonData.data };
                        }

                        Actions.roundTryScreen(sendObject);
                    }, 1000);
                }
                else {
                    setTimeout(() => {
                        setErrorMsgText(response['message'])
                        setVisibleError(true)
                    }, 1000);
                }
            }
        } catch (error) {
            console.log("create contest error => ", error);
            setTimeout(() => {
                setErrorMsgText(error)
                setVisibleError(true)
            }, 1000);
        }
    }
}

export default DiscussionDetails;
