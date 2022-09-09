import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
    ScrollView, DeviceEventEmitter,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import assests from '../../common/assests';
import * as commonApi from '../../ServiceRequests/serviceAuth'
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import constants from './../../utils/appConstants';
import { LoaderAction } from '../../redux/action';
import { Loader } from '../../components/customComponent';
import { getLoginData } from '../../utils/session';

const titles = [
    { id: 1, name: "Membership" },
    // { id: 2, name: "Social Accounts" },
    { id: 3, name: "Privacy Policy" },
    { id: 6, name: "Terms & Condition" },
    { id: 4, name: "Preferred Category" },
    { id: 5, name: "Change Password" },
];

const ViewProfile = (props) => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.authReducer.loader);

    const [isSocial, setisSocial] = useState(false);

    useEffect(() => {
        // _getPreferdCategory()
        _getUserData();
    }, []);

    const _getUserData = async () => {
        try {
            let userData = await getLoginData();

            if (userData.registerType !== "email") {
                setisSocial(true);
            }
        } catch (error) {
        }
    }

    const headerRight = () => {
        return (
            <TouchableOpacity
                // style={{ right: 0, position: 'absolute' }}
                onPress={() => Actions.editProfile({ ...props.userProfile, userName: props.userProfile.name, _getProfileData: props._getProfileData })}
            >
                <Text style={[styles.editBtnSty]}>{'Edit'}</Text>
            </TouchableOpacity>
        );
    }

    const profileUppercontainer = () => (
        <View style={styles.upperProfileInfoContainer}>
            {/* profile pic container */}
            <View style={styles.profilePictureContainer}>
                <Image
                    style={styles.profilePicture}
                    source={props?.userProfile?.image ? { uri: props.userProfile.image } : assests.vCallPlaceholder}
                    defaultSource={assests.vCallPlaceholder}
                />

                {/* <View style={styles.profileStatus} /> */}
                <Image
                    source={getStatusIcon(props.userProfile.availabilityStatus)}
                    style={styles.profileStatus}
                />
            </View>

            <View width={20} />

            <View style={{ top: -10, flex: 1 }}>
                <Text style={styles.nameText}>{props.userProfile.name || ""}</Text>

                <View height={8} />

                <Text style={styles.statusText}>{props.userProfile.userStatus || ""}</Text>

                {/*
                    <View style={styles.profileRightInfoContainer}>
                        <Image style={styles.iconRightInfo} source={assests.instagram} />
                        <Text style={styles.usernameText}>jamespati</Text>
                    </View>

                    <View style={styles.profileRightInfoContainer}>
                        <Image style={styles.iconRightInfo} source={assests.diamond} />
                        <Text style={styles.statusText}>Best Performer</Text>
                    </View>
                */}
            </View>
        </View>

    );

    const _selectedCategory = (data) => {
        const ids = data.map((item) => item._id).join(',');
        _addCategory(ids);
    }

    const _addCategory = async (ids) => {
        try {
            const userId = await AsyncStorage.getItem('userid');

            console.log("add category userid => ", userId);
            console.log("add category ids => ", ids);

            dispatch(LoaderAction(true))

            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("categoryId", ids);

            console.log("my form data is => ", formData);

            const response = await commonApi.addPrefCategory(formData, dispatch);
            if (response['status']) {
                Actions.pop();
                props._getProfileData();
            } else {
                // alert(response.message);
            }
        } catch (error) {
            // alert(error);
        }
    }

    const _clickOptions = (id) => {
        switch (id) {
            case 1:
                Actions.membership();
                break;
            case 3:
                Actions.privacyPolicy({ isPolicy: true });
                break;
            case 6:
                Actions.privacyPolicy();
                break;
            case 5:
                Actions.changePassword();
                break;
            case 4:
                Actions.catergoryList({
                    categorySeleList: props.prefCategory,
                    completionBlock: (data) => _selectedCategory(data)
                })
                break;
            default:
                break;
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 1:
                return assests.online;
            case 2:
                return assests.away;
            case 3:
                return assests.donotdisturb;
            default:
                return assests.invisible;
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
                style={{ justifyContent: 'space-between' }}
                title={''}
                right={headerRight()}
            />
            <View style={styles.innerContainer}>
                <ScrollView style={styles.parentScrollView}>

                    {/* upper container */}
                    <View style={styles.upperContainer}>
                        {profileUppercontainer()}

                        <View
                            style={styles.hrLine}
                        />

                        {/* upper container information list */}
                        <View style={styles.profileInfoScreen}>
                            <Image
                                source={assests.cup}
                                style={styles.cupImage}
                            />

                            <View width={28} />

                            <View style={styles.profileInfoRight}>
                                <Text
                                    style={styles.currentRankText}
                                >
                                    {constants.CURRENT_SCORE}
                                </Text>

                                <View style={styles.profileInfoRightPointsContain}>
                                    <Text style={styles.profileInfoRightPoints}>
                                        {props?.userProfile?.currentScore || 0}
                                        <Text style={styles.profileInfoRightPointsLight}>{' '}pt</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.subMenuContainer}>
                        {
                            titles.map((item, index) => {

                                const _rightComponent = () => {
                                    if (item.name === "Social Accounts") {
                                        return (
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image
                                                    style={[styles.socialIcons, {
                                                        width: 32,
                                                        height: 22,
                                                    }]}
                                                    source={assests.gplusIcon}
                                                    resizeMode={'stretch'}
                                                />

                                                <View width={8} />

                                                <Image style={styles.socialIcons} source={assests.facebookProfile} />
                                            </View>
                                        );
                                    }
                                    return (<Image style={styles.rightIcon} source={assests.rightIcon} />);
                                }

                                // if (isSocial && item.name === "Change Password") {
                                //     return null;
                                // }

                                return (
                                    <TouchableOpacity
                                        key={index.toString()}
                                        onPress={() => _clickOptions(item.id)}
                                    >
                                        <View style={styles.subMenu} >
                                            <Text style={styles.subMenuText}>{item.name}</Text>

                                            {
                                                _rightComponent()
                                            }
                                        </View>
                                        {
                                            titles.length - 1 !== index &&
                                            <View style={{ height: 0.8, backgroundColor: '#324B55', marginVertical: 14 }} />
                                        }
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </ScrollView>
            </View>

            <Loader isLoading={loader} />
        </SafeAreaView>
    )
}

export default ViewProfile;
