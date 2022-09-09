import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image, ScrollView, FlatList,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

import assests from '../../common/assests';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import { Button } from '../../components/customComponent';
import * as commonApi from '../../ServiceRequests/serviceContest';
import { AddImage, Alert, AnswersPop } from '../../common/alertPop';
import { LoaderAction } from '../../redux/action';
import matchItTypes from '../../utils/matchItTypes';
import ImageList from './components/ImageList';
import WordList from './components/WordList';

const MB_ImageListing = (props) => {
    const dispatch = useDispatch();

    const loader = useSelector(state => state.authReducer.loader);


    const isImageType = () => {
        if (props.matchItType === 2) {
            return true;
        }
        return false;
    }

    const [canDisplay, setcanDisplay] = useState(false);

    const [data, setData] = useState([]);

    // can visible delete confirm alert
    const [isDeleteDialog, setisDeleteDialog] = useState(false);

    const [newEntryText, setnewEntryText] = useState("");

    // words state

    // ------- open option modal for perticular item
    const [optionId, setoptionId] = useState("");

    // save delete id for modal
    const [deleteId, setdeleteId] = useState("");

    // save edit id for modal
    const [editId, seteditId] = useState("");

    // save edit display order id for modal
    const [editDisplayOrder, seteditDisplayOrder] = useState("");

    const [showWordPopup, setshowWordPopup] = useState(false);
    //!------------ words state

    //------- image state
    const [isAddImage, setAddImage] = useState(false);
    //!------- image state

    useEffect(() => {
        fetchMyAPI();
    }, []);

    const imagePickerAcion = (isCamera) => {
        // setTimeout(() => {
        setAddImage(false);
        // }, 3000);



        setTimeout(() => {
            const popUpType = isCamera ? "openCamera" : "openPicker";

            ImagePicker[popUpType]({
                cropping: true,
                width: 250,
                height: 250,
            }).then(async (image) => {
                setAddImage(false);
                const fileUrl = await uploadImageGetUrl(image.path);
                if (fileUrl) {
                    _onAnswerSelection(fileUrl);
                }
            });
        }, 1000);
    }

    const uploadImageGetUrl = async (file) => {
        try {
            dispatch(LoaderAction(true));

            const formData = new FormData();

            let res1 = file.split("/");
            let spltDot = res1[res1.length - 1].split(".");
            var timeStamp = Math.floor(Date.now());

            formData.append("media", {
                uri: Platform.OS == 'ios' ? 'file://' + file : file,
                type: "image/jpeg",
                name: timeStamp + "." + spltDot[spltDot.length - 1]
            });
            formData.append('type', "round");

            console.log("formData::", formData);

            const response = await commonApi.uploadImageAPI(formData, dispatch);

            if (response['status']) {
                return response.data.jsonData.data.url;
            } else {
                console.log("response of sort quiz => 0 error => ", response.message);

                return response.message;
            }
        } catch (error) {
            console.log("response of sort quiz => 0 error => ", error);
            return error;
        }
    }


    const fetchMyAPI = async () => {
        try {
            const id = await AsyncStorage.getItem('roundid')
            console.log("round id => ", id);
            dispatch(LoaderAction(true));

            const response = await commonApi.RoundquestionsAPI(0, dispatch, id, props.gameType);

            if (response['status']) {
                if (response.data != null && response.data != undefined) {
                    console.log('data1111', response.data);
                    var datafilter = response.data;

                    console.log("response of sort quiz => 0 ", JSON.stringify(datafilter));

                    setData(datafilter);

                    setTimeout(() => {
                        setcanDisplay(true);
                    }, 500);
                }
            } else {
                console.log("response of sort quiz => 0 error => ", response.message);
            }
        } catch (error) {
            console.log("response of sort quiz => 0 error => ", error);
        }
    }

    const _onAnswerSelection = async (imageUrl) => {
        try {
            setshowWordPopup(false);

            if (imageUrl || newEntryText.trim().length > 0) {
                dispatch(LoaderAction(true));

                const id = await AsyncStorage.getItem('roundid')

                console.log("_onAnswerSelection formData:: data => ", data);

                let newDisplayOrder;
                if (data.length !== 0) {
                    newDisplayOrder = data[data.length - 1].displayOrder + 1;
                }

                const formData = new FormData();

                // const t = minutes + ':' + seconds;

                // console.log("formData: collom time stamp => ", t);

                // const r = Number(t.split(':')[0]) * 60 + Number(t.split(':')[1]) * 1000;
                // const r = parseInt(minutes * 60000) + parseInt(seconds * 1000);

                formData.append('roundId', id);
                formData.append('title', imageUrl || newEntryText);
                formData.append('gameType', props.gameType);
                formData.append('type', props.matchItType);
                formData.append('questionType', 2);
                formData.append('displayOrder', editDisplayOrder || newDisplayOrder || 0);
                // formData.append('timeLimit', r);

                console.log("_onAnswerSelection formData::", formData);

                let response;

                if (editId) {
                    response = await commonApi.updateQuestionDetailsAPI(formData, dispatch, editId);
                } else {
                    response = await commonApi.savecreatequizAPI(formData, dispatch);
                }

                if (response.status) {
                    if (editId) {
                        setData(response.data.jsonData.data);
                    } else {
                        fetchMyAPI();
                    }
                } else {
                    console.log("response of image add => ", response);
                    // alert(response.message);
                }
            }
        } catch (error) {
            console.log("response of image add => ", error);
            // alert(error);
        } finally {
            _removeEditableStates();
        }
    };

    const _onAnswerModalClose = () => {
        setshowWordPopup(false);
        _removeEditableStates();
    }

    const _hideOptions = () => {
        setoptionId("");
    }

    const onDeleteClick = (id) => {
        _hideOptions();
        setisDeleteDialog(true);
        setdeleteId(id);
    }

    const onEditClick = (item) => {
        _hideOptions();
        setshowWordPopup(true);
        setnewEntryText(item.title);
        seteditId(item.item_id);
        seteditDisplayOrder(item.displayOrder);
    }

    const _removeEditableStates = () => {
        setnewEntryText("");
        seteditId("");
        seteditDisplayOrder("");
    }

    const handleDeleteQuestionData = async () => {
        try {
            setisDeleteDialog(false);
            dispatch(LoaderAction(true));
            const id = await AsyncStorage.getItem('roundid')
            console.log("round id => ", id);

            // const formData = new FormData();

            // formData.append('roundId', id);
            // formData.append('gameType', props.gameType);

            // console.log("formData::", formData, deleteId);

            const response = await commonApi.deleteQuestionDetailsAPI({}, dispatch, deleteId, id, props.gameType);

            if (response['status']) {
                // alert("success");
                console.log("delete response => ", response);
                setData(response.data.jsonData.data);
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error);
        }
    }

    const _addMorePress = () => {
        if (isImageType()) {
            setAddImage(true);
        } else {
            setshowWordPopup(true);
        }
    }

    const onPhotoGallery = () => {
        try {
            setAddImage(false);
            Actions.photoLibrary({
                mediaType: 'image',
                onSelect: (imagePath) => _onAnswerSelection(imagePath)
            });
        } catch (error) {
            // alert(error);
        }
    }


    const _saveNewListing = async () => {
        // imageData
        try {
            // dispatch(LoaderAction(true));

            console.log("new listing 0");

            const newArrangedData = data.map((item, index) => ({ "questionId": item.item_id, "displayOrder": index }));

            console.log("new listing 1");

            const id = await AsyncStorage.getItem('roundid')

            let sortedData = {
                "roundId": id,
                "sortingList": [...newArrangedData]
            };

            console.log("new listing 2 => ", JSON.stringify(sortedData));

            // console.log("response of sort quiz => 1 ", sortedData);

            const response = await commonApi.saveSortMatchitBingoAPI(sortedData, dispatch);

            console.log("new listing 3");

            // console.log("response of sort quiz => 2 ", JSON.stringify(response));

            if (response.status) {
                // alert("success");
            } else {
                alert(response.message);
            }

            // Actions.pop();
        } catch (error) {
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />
            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={`Round ${isImageType() ? 'Images' : 'Words'}`}
            />

            <View
                style={styles.innerContainer}
                onStartShouldSetResponder={evt => {
                    evt.persist();
                    _hideOptions();
                }}
            >
                <View style={{ alignSelf: 'flex-end', position: "absolute", right: 0, top: 1 }}>
                    <Image resizeMode={'contain'} source={assests.backLogo} />
                </View>

                <View style={{ width: "100%" }}>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: 20, width: "100%" }}>
                        {
                            isImageType()
                                ?
                                <ImageList
                                    data={data}
                                    loader={!loader && canDisplay}
                                    newChangeData={(newData) => setData(newData)}
                                    onDeleteClick={(id) => onDeleteClick(id)}
                                />
                                :
                                <WordList
                                    data={data}
                                    loader={!loader && canDisplay}
                                    newChangeData={(newData) => setData(newData)}
                                    onDeleteClick={(id) => onDeleteClick(id)}
                                    onEditClick={(item) => onEditClick(item)}
                                    optionId={optionId}
                                    setoptionId={id => setoptionId(id)}
                                    hideOption={_hideOptions}
                                />
                        }
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title={`Add${data.length > 0 ? ' More ' : ' '}${isImageType() ? 'Images' : 'Words'}`}
                        textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                        style={styles['signupButton']}
                        onPress={() => {
                            _addMorePress()
                            // Actions.matchIt({ ...props });
                        }}
                    />

                    <Button
                        title={'Save'}
                        textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                        style={[styles['questionButton']]}
                        onPress={() => _saveNewListing()}
                    />
                </View>

                <AddImage
                    isModalVisible={isAddImage}
                    onCancel={() => setAddImage(false)}
                    onCamera={() => imagePickerAcion(true)}
                    onGallery={() => imagePickerAcion(false)}
                    isPhotoLib
                    onPhotoGallery={() => onPhotoGallery()}
                />

                <AnswersPop
                    hashtagValue={''}
                    title={'Add Words'}
                    buttonText={'Done'}
                    placeHolder={'Type word'}
                    value={newEntryText}
                    onChangeText={(text) => setnewEntryText(text)}
                    onDonePress={() => _onAnswerSelection()}
                    onCancel={() => _onAnswerModalClose()}
                    isModalVisible={showWordPopup}
                />

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
            </View>
        </SafeAreaView>
    )
}

export default MB_ImageListing;
