import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
    DeviceEventEmitter,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import * as commonApi from '../../ServiceRequests/serviceAuth';
import assests from '../../common/assests';
import styles from './styles';
import { LoaderAction } from '../../redux/action';
import MaineHeader from '../../common/headerWithText';
import { Button, Loader } from '../../components/customComponent';
import GroupsList from './components/GroupsList';
import * as actionType from '../../redux/action';
import { AddMyGroupPopUp, PopUpScreen } from '../../common/alertPop';

const MyGroups = () => {
    // const itemref = useRef(null);
    const dispatch = useDispatch();
    const loader = useSelector(state => state.authReducer.loader);

    const [groupData, setgroupData] = useState([]);

    const [errorVisible, seterrorVisible] = useState(false);
    const [errorMsgText, setErrorMsgText] = useState('');

    const [myGroupdialog, setmyGroupdialog] = useState(false);

    // * for update save to OR Group for modal
    const [updateGroupText, setupdateGroupText] = useState("");
    const [updateGroupId, setupdateGroupId] = useState("");
    // ! for update save to OR Group


    const [editableView, seteditableView] = useState(false);
    const [editableViewTop, seteditableViewTop] = useState(0);
    const [popUpItem, setpopUpItem] = useState({});

    // itemref.current = popUpItem;

    useEffect(() => {
        // DeviceEventEmitter.addListener('MyGroupList', () => {
        //     getGroups();
        // });

        getGroups();
    }, []);

    const getGroups = async () => {
        try {
            const userID = await AsyncStorage.getItem('userid')

            dispatch(LoaderAction(true));

            console.log("my user id => ", userID);

            const response = await commonApi.getMyGroups(userID, dispatch);

            console.log("my new response => ", JSON.stringify(response.data.saveTo));

            if (response['status']) {
                dispatch(actionType.setGameList(response.data.saveTo));
                setgroupData(response.data.saveTo);
            } else {
            }
        } catch (error) {
        }
    }

    const emptyListView = () => {
        return (
            <Text style={styles.emptyViewLabel}>{!loader ? 'No data found' : ''}</Text>
        );
    }

    const _onAddDonePress = (name) => {
        setmyGroupdialog(false);
        setTimeout(() => {
            addGroupAPI(name);
        }, 500);
    }

    const _onEditDonePress = (name) => {

        // close dialog
        setmyGroupdialog(false);
        setTimeout(() => {
            updateGroupAPI(name);
        }, 500);
    }

    const updateGroupAPI = async (name) => {
        try {
            dispatch(LoaderAction(true));
            const userID = await AsyncStorage.getItem('userid');

            // dispatch(LoaderAction(true));

            const formData = new FormData();

            formData.append("userId", userID);
            formData.append("saveToTitle", name?.trim());
            formData.append("saveToId", updateGroupId);

            console.log("formdata send to => ", formData);

            const response = await commonApi.updateMyGroups(formData, dispatch);

            if (response['status']) {
                dispatch(actionType.setGameList(response.data));
                setgroupData(response.data);
                // getGroups();
            } else {
                seterrorVisible(true);
                setErrorMsgText(response.message);
            }
        } catch (error) {
            // alert(error);
            seterrorVisible(true);
            setErrorMsgText("Something went wrong!");
        } finally {
            // remove old data from edit relared items
            setupdateGroupText("");
            setupdateGroupId("");
        }
    }

    const addGroupAPI = async (name) => {
        try {
            dispatch(LoaderAction(true));
            const userID = await AsyncStorage.getItem('userid');
            // dispatch(LoaderAction(true));

            const formData = new FormData();

            formData.append("userId", userID);
            formData.append("saveToTitle", name?.trim());

            console.log("formdata send to => ", formData);

            const response = await commonApi.addMyGroups(formData, dispatch);

            console.log("formdata send to => response ::", response.data);

            if (response['status']) {
                dispatch(actionType.setGameList(response.data));
                // setgroupData(response.data);
                getGroups();
            } else {
                seterrorVisible(true);
                setErrorMsgText(response.message);
            }
        } catch (error) {
            alert(error);
            seterrorVisible(true);
            setErrorMsgText("Something went wrong!");
        }
    }

    const _swipeChangeData = async (newData, saveToId) => {
        const oldBackUpData = [...groupData];
        setgroupData(newData)
        try {
            const userId = await AsyncStorage.getItem('userid');

            const object = {
                userId,
                saveToId
            };

            const response = await commonApi.deleteMyGroups(object, dispatch);

            if (response['status']) {
            } else {
                // alert(response.message);
                setgroupData(oldBackUpData);
            }
        } catch (e) {
            // alert(e);
            setgroupData(oldBackUpData);
        }
    }

    const _onDeleteClick = async (saveToId) => {
        seteditableView(false);
        dispatch(LoaderAction(true));
        const oldBackUpData = [...groupData];
        let newGroupArray = groupData.filter(x => x.saveToId !== saveToId);
        newGroupArray = newGroupArray.map(group => {
            if (group.saveToTitle === "Favourite") {
                const oldSaveToData = groupData.find(x => x.saveToId === saveToId);
                group.contestNumber = group?.contestNumber + oldSaveToData?.contestNumber;
            }
            return group;
        });

        setgroupData(newGroupArray);
        try {
            const userId = await AsyncStorage.getItem('userid');

            const object = {
                userId,
                saveToId
            };

            const response = await commonApi.deleteMyGroups(object, dispatch);

            if (response['status']) {
            } else {
                // alert(response.message);
                setgroupData(oldBackUpData);
            }
        } catch (e) {
            // alert(e);
            setgroupData(oldBackUpData);
        }
    }

    const _onEditClick = (item) => {
        const { saveToId, saveToTitle } = item;

        // open update modal
        setmyGroupdialog(true);

        // close edit/delete popup
        seteditableView(false);

        setupdateGroupText(saveToTitle);
        setupdateGroupId(saveToId);
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
                title={'My Groups'}
            />



            <View
                onStartShouldSetResponder={evt => {
                    evt.persist();
                    seteditableView(false);
                    setpopUpItem({});
                }}
                style={styles.innerContainer}
            >
                <View style={{ flex: 1 }}>
                    {
                        editableView &&
                        <View
                            style={[styles.popUpView, { top: editableViewTop }]}
                        >
                            <TouchableOpacity
                                style={styles.touchContainer}
                                activeOpacity={0.9}
                                onPress={() => _onEditClick()}
                            >
                                <Image
                                    source={assests.edit}
                                    style={{ width: 16, height: 16 }}
                                    resizeMode="stretch"
                                />
                                <Text style={styles.popUpText}>Edit</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.touchContainer}
                                activeOpacity={0.9}
                                onPress={() => _onDeleteClick()}
                            >
                                <Image
                                    source={assests.crossWhite}
                                    style={{ width: 14, height: 14 }}
                                    resizeMode="stretch"
                                />
                                <Text style={styles.popUpText}>Remove</Text>

                            </TouchableOpacity>
                        </View>
                    }
                    {
                        !loader && groupData.length === 0
                            ?
                            emptyListView()
                            :
                            <GroupsList
                                data={groupData}
                                changedData={_swipeChangeData}
                                onEditClick={(item) => {
                                    // seteditableView(true);
                                    // seteditableViewTop(layout.y + 20);
                                    // // console.log("editable view data will be => ", layout);
                                    // setpopUpItem(item);
                                    _onEditClick(item);
                                }}
                                onDeleteClick={(id) => _onDeleteClick(id)}
                            />
                    }
                </View>

                <Button
                    title={'Add Group'}
                    textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                    style={styles.addGroupButton}
                    onPress={() => {
                        setupdateGroupText("");
                        setupdateGroupId("");
                        setmyGroupdialog(true)
                    }}
                />

                <AddMyGroupPopUp
                    title={updateGroupText ? 'Update Group' : 'Add Group'}
                    buttonTitle={updateGroupText ? 'Update' : 'Add'}
                    cancelTitle={'Cancel'}
                    isModalVisible={myGroupdialog}
                    onBackClick={() => setmyGroupdialog(false)}
                    onDoneClick={(name) => _onAddDonePress(name)}
                    onUpdateClick={(name) => _onEditDonePress(name)}
                    updateText={updateGroupText}
                    updateId={updateGroupId}
                />

                <PopUpScreen
                    isModalVisible={errorVisible}
                    msgText={errorMsgText}
                    isError={true}
                    onCloseModal={() => seterrorVisible(false)}
                    _applyAction={() => seterrorVisible(false)}
                />
            </View>
            <Loader isLoading={loader} />
        </SafeAreaView>
    )
}

export default MyGroups;
