import React, { useEffect, useState, useMemo } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image, ScrollView, DeviceEventEmitter,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import SortableList from 'react-native-sortable-list';


import assests from '../../common/assests';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import { Button } from '../../components/customComponent';
import { LoaderAction } from '../../redux/action';
import * as commonApi from '../../ServiceRequests/serviceContest';
import RenderItem from './components/RenderItem';
import { Alert } from '../../common/alertPop';

const WordsListing = (props) => {
    const dispatch = useDispatch();

    const loader = useSelector(state => state.authReducer.loader);

    const [wordData, setwordData] = useState([]);
    const [scrollEnable, setscrollEnable] = useState(true);
    const [canDisplay, setcanDisplay] = useState(false);
    const [isDeleteDialog, setisDeleteDialog] = useState(false);
    const [deleteId, setdeleteId] = useState("");
    const [optionId, setoptionId] = useState("");

    useEffect(() => {
        DeviceEventEmitter.addListener(
            'QuestionUpdate', async () => {
                await fetchMyAPI();
            });

        fetchMyAPI()
    }, []);


    const fetchMyAPI = async () => {
        const id = await AsyncStorage.getItem('roundid')
        console.log("round id => ", id);
        dispatch(LoaderAction(true));

        const response = await commonApi.RoundquestionsAPI(0, dispatch, id, props.gameType);

        if (response['status']) {
            if (response.data != null && response.data != undefined) {
                console.log('data1111', response.data);
                var datafilter = response.data;

                console.log("response of sort quiz => 0 ", JSON.stringify(datafilter));

                setwordData(datafilter);
                setTimeout(() => {
                    setcanDisplay(true);
                }, 500);
            }
        } else {
            alert();
        }
    }

    const _releaseNewList = (changedData) => {
        setscrollEnable(true);

        const oldData = [...wordData];

        let tempChangedArray = [];
        changedData.forEach((index) => {
            const indexNumber = parseInt(index);
            tempChangedArray = [...tempChangedArray, oldData[indexNumber]];
        });

        setwordData(tempChangedArray);
    }

    const handleDeleteQuestionData = async () => {
        try {
            setisDeleteDialog(false);
            dispatch(LoaderAction(true));
            const id = await AsyncStorage.getItem('roundid')
            console.log("round id => ", id);

            const response = await commonApi.deleteQuestionDetailsAPI({}, dispatch, deleteId, id, props.gameType);

            if (response['status']) {
                // alert("success");
                fetchMyAPI();
            } else {
                // alert(response.message);
            }
        } catch (error) {
            // alert(error);
        }
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
        Actions.hugiScreen({ params: props.params, item, gameType: props.gameType });
    }

    const _roundListing = async () => {
        // imageData
        try {
            const newArrangedData = wordData.map((data, index) => ({ "questionId": data._id, "displayOrder": index + 1 }));
            let sortedData = {
                "sortingList": [...newArrangedData]
            };

            // console.log("response of sort quiz => 1 ", sortedData);

            const response = await commonApi.saveSortquizAPI(sortedData, dispatch);

            // console.log("response of sort quiz => 2 ", JSON.stringify(response));
            if (response.status) {
                Actions.pop();
            } else {
                alert(response.message);
            }

        } catch (error) {
            alert(error);
        }
    }

    const emptyListView = () => {
        return (
            <Text style={styles.emptyViewLabel}>{!loader && canDisplay ? 'No data found' : ''}</Text>
        );
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
                title={'Round Words'}
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

                <ScrollView
                    scrollEnabled={scrollEnable}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
                >
                    {
                        wordData.length === 0
                            ?
                            emptyListView()
                            :
                            <SortableList
                                scrollEnabled={false}
                                onActivateRow={() => setscrollEnable(false)}
                                onReleaseRow={(_, newOrder) => { _releaseNewList(newOrder) }}
                                style={{ flex: 1 }}
                                data={wordData}
                                renderRow={({ data }) => (
                                    <RenderItem
                                        data={data}
                                        onDeleteClick={(id) => onDeleteClick(id)}
                                        onEditClick={(item) => onEditClick(item)}
                                        onOption={(id) => setoptionId(id)}
                                        optIndex={optionId}
                                        hideOption={_hideOptions}
                                    />
                                )}
                            />
                    }
                </ScrollView>


                {
                    canDisplay &&
                    <View style={styles.bottomButtons}>
                        <Button
                            title={`Add${wordData.length > 0 ? ' More ' : ' '}Words`}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                            style={styles['signupButton']}
                            onPress={() => {
                                Actions.hugiScreen({ ...props });
                            }}
                        />

                        <Button
                            title={'Save'}
                            textStyle={{ fontSize: 17, color: '#22343C', letterSpacing: 3.09, fontFamily: appConstants.fontBold }}
                            style={[styles['questionButton']]}
                            onPress={() => _roundListing()}
                        />
                    </View>
                }
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
        </SafeAreaView>
    )
}

export default WordsListing;
