import React, { useState, useLayoutEffect } from 'react';
import {
    SafeAreaView, StatusBar, Text,
    View, TouchableOpacity, Image,
    ScrollView, useWindowDimensions, ImageBackground,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

import * as commonApi from './../../ServiceRequests/serviceAuth';
import assests from '../../common/assests';
import color from '../../utils/color';
import styles from './styles';
import MaineHeader from '../../common/headerWithText';
import { Button, Input, Loader } from '../../components/customComponent';
import { dynamicSize } from '../../utils/responsive';
import { LoaderAction } from '../../redux/action';
import { isEmpty } from '../../utils/validation';
import { AddImage, PopUpScreen } from '../../common/alertPop';

const statusDropDownList = [
    { _id: 1, name: "Online" },
    { _id: 2, name: "Away" },
    { _id: 3, name: "Do not disturb" },
    { _id: 4, name: "Invisible" },
];

const EditProfile = (props) => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.authReducer.loader);

    const [email, setemail] = useState(props.email || "");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [emailStatus, setEmailStatus] = useState({ status: true, error: '' });

    const [name, setname] = useState(props.userName || "");
    const [nameStatus, setNameStatus] = useState({ status: true, error: '' });
    const [isValidName, setIsValidName] = useState(false);

    const [status, setstatus] = useState(props?.userStatus?.trim() || "");
    const [statusStatus, setstatusStatus] = useState({ status: true, error: '' });
    const [isValidStatus, setIsValidStatus] = useState(false);

    const [dropStatus, setdropStatus] = useState("Online");
    const [dropVisible, setdropVisible] = useState(false);

    const [image, setImage] = useState(props.image || '');
    const [imageFromPicker, setImageFromPicker] = useState(false);
    const [isAddImage, setAddImage] = useState(false); //Picker Model show/hide
    const [imageStatus, setimageStatus] = useState({ status: true, error: '' });

    const [successAlert, setsuccessAlert] = useState(false);

    useLayoutEffect(() => {
        const dropStatus = statusDropDownList.find(x => x._id === props.availabilityStatus)?.name || "";
        setdropStatus(dropStatus);
    }, [])

    const _checkValidName = (text) => {
        if (isEmpty(text)) {
            setIsValidName(false);
            setNameStatus({ status: true, error: 'Please enter name' });
            return false;
        } else {
            setIsValidName(true);
            setNameStatus({ status: true, error: '' });
            return true;
        }
    }

    const _checkValidStatus = (text) => {
        if (isEmpty(text)) {
            setIsValidStatus(false);
            setstatusStatus({ status: true, error: 'Please enter status' });
            return false;
        } else {
            setIsValidStatus(true);
            setstatusStatus({ status: true, error: '' });
            return true;
        }

    }

    const _onChangeText = (type) => (text) => {
        if (type === "name") {
            setname(text);
            _checkValidName(text);
        } else if (type === "status") {
            setstatus(text);
            // _checkValidStatus(text);
        }
    }

    const _updateProfile = async () => {
        try {
            if (_checkValidName(name)) {

                const availabilityStatus = statusDropDownList.find(x => x.name === dropStatus)._id;

                dispatch(LoaderAction(true));

                const userId = await AsyncStorage.getItem('userid');

                const formData = new FormData();

                formData.append("id", userId);
                formData.append("name", name);
                formData.append("userStatus", status || " ");
                formData.append("availabilityStatus", availabilityStatus);

                if (!isEmpty(image)) {
                    if (imageFromPicker) {
                        let res1 = image.split("/");
                        let spltDot = res1[res1.length - 1].split(".");
                        var timeStamp = Math.floor(Date.now());
                        formData.append("image", {
                            uri: Platform.OS == 'ios' ? 'file://' + image : image,
                            type: "image/jpeg",
                            name: timeStamp + "." + spltDot[spltDot.length - 1]
                        });
                    } else if (props.image) {
                        formData.append("image", props.image);
                    }
                }

                const response = await commonApi.updateUserProfile(formData, dispatch);

                if (response['status']) {
                    setTimeout(() => {
                        setsuccessAlert(true);
                    }, 600);
                    // props._getProfileData();
                } else {
                    // alert(response.message);
                }
            }
        } catch (error) {
            // alert(error);
        }
    }

    const _onItemClick = (item) => {
        setdropStatus(item.name);
        setdropVisible(false);
    }

    const imagePickerAcion = (isCamera) => {
        // setTimeout(() => {
        setAddImage(false);
        // }, 3000);
        setTimeout(() => {
            if (isCamera) {
                ImagePicker.openCamera({
                    cropping: true,
                    width: 250,
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
                    width: 250,
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

    const removeImage = () => {
        try {
            setimageStatus({ status: true, error: '' });
            setImage('');
            setAddImage(false);
            setImageFromPicker(false);
        } catch (error) {
        }
    }

    const getStatusIcon = (title) => {
        switch (title.toLowerCase()) {
            case "online":
                return assests.online;
            case "away":
                return assests.away;
            case "do not disturb":
                return assests.donotdisturb;
            default:
                return assests.invisible;
        }
    }

    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="light-content"
            />

            <MaineHeader
                isBack
                subHeaderTextS={{ color: '#fff' }}
                title={'Edit Profile'}
            />
            <View style={styles.innerContainer}>
                <ScrollView style={styles.parentScrollView}>

                    {/* profile image */}
                    <View style={styles.upperProfilePic} />

                    <ImageBackground
                        source={image ? { uri: image } : assests.vCallPlaceholder}
                        defaultSource={assests.vCallPlaceholder}
                        style={styles.profileStyle}
                        imageStyle={styles.profileImageStyle}
                    >
                        {
                            image
                                ?
                                <View style={{ width: '100%' }}>
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
                                        <Image style={{ height: 10, width: 10 }} resizeMode={'contain'} source={assests.crossSmall} />
                                    </TouchableOpacity>
                                </View>
                                :
                                <TouchableOpacity
                                    style={styles.profileEditContainer}
                                    onPress={() => {
                                        setAddImage(true)
                                    }}
                                >
                                    <Image
                                        source={assests.edit}
                                        style={styles.profileEditStyle}
                                    />
                                </TouchableOpacity>
                        }
                    </ImageBackground>

                    <View height={140} />

                    <View style={styles.dropDownMainView}>
                        <TouchableOpacity style={styles.dropDownStatus} onPress={() => setdropVisible(!dropVisible)}>
                            <View style={styles.statusTextContainer}>
                                <Image
                                    source={getStatusIcon(dropStatus)}
                                    style={styles.statusImage}
                                />
                                <Text style={styles.statusText}>{dropStatus}</Text>
                            </View>

                            <View width={10} />

                            <Image
                                source={dropVisible ? assests.editStatusUp : assests.editStatusDown}
                                style={styles.dropDownIcon}
                            />
                        </TouchableOpacity>

                        {
                            dropVisible &&
                            <>
                                {
                                    statusDropDownList.map((item) => {
                                        if (item.name !== dropStatus) {
                                            return (
                                                <TouchableOpacity
                                                    key={item._id.toString()}
                                                    onPress={() => _onItemClick(item)}
                                                    style={styles.dropOptions}
                                                >
                                                    <Image
                                                        source={getStatusIcon(item.name)}
                                                        style={styles.statusImage}
                                                    />
                                                    <Text style={styles.statusText}>{item.name}</Text>
                                                </TouchableOpacity>
                                            );
                                        }
                                    })
                                }

                                <View height={6} />
                            </>
                        }
                    </View>

                    <View height={10} />

                    <Input
                        // ref={nameRef}
                        focusColor={color['red']}
                        onChangeText={_onChangeText('name')}
                        value={name}
                        style={{ width: width - 60, alignSelf: 'center' }}
                        blurOnSubmit={false}
                        placeholder={'Name'}
                        icon={assests.user}
                        isFiledImage
                        source={isValidName ? assests.check : (nameStatus['error'] ? assests.info : '')}
                        subSource={assests.edit}
                        labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        errorMessage={nameStatus['error']}
                    />

                    <Input
                        editable={false}
                        onChangeText={_onChangeText('email')}
                        value={email}
                        // isBorderVisible={true}
                        keyboardType={'email-address'}
                        style={{ width: width - 60, alignSelf: 'center' }}
                        blurOnSubmit={false}
                        placeholder={'Email'}
                        icon={assests.email}
                        autoCapitalize={'none'}
                        isFiledImage
                        source={isValidEmail ? assests.check : (emailStatus['error'] ? assests.info : '')}
                        labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        errorMessage={emailStatus['error']}
                    />

                    <Input
                        onChangeText={_onChangeText('status')}
                        value={props?.userStatus?.trim() || status}
                        keyboardType={'email-address'}
                        style={{ width: width - 60, maxHeight: 100, alignSelf: 'center' }}
                        blurOnSubmit={false}
                        placeholder={'Status'}
                        icon={assests.title}
                        autoCapitalize={'none'}
                        isFiledImage
                        source={isValidStatus ? assests.check : (statusStatus['error'] ? assests.info : '')}
                        subSource={assests.edit}
                        labelTextStyle={{ fontSize: 14, marginLeft: dynamicSize(5) }}
                        errorMessage={statusStatus['error']}
                    // multiline
                    />


                    <AddImage
                        isModalVisible={isAddImage}
                        onCancel={() => setAddImage(false)}
                        onCamera={() => imagePickerAcion(true)}
                        onGallery={() => imagePickerAcion(false)}
                    />

                    <Button
                        title={'Submit'}
                        textStyle={styles.submitButtonText}
                        style={styles.submitButton(width)}
                        onPress={() => _updateProfile()}
                    />

                    <PopUpScreen
                        isModalVisible={successAlert}
                        msgText={'Profile updated successfully'}
                        _applyAction={() => {
                            setsuccessAlert(false);
                            setTimeout(() => {
                                Actions.jump("more");
                                props._getProfileData();
                            }, 400);
                        }}
                        onCloseModal={() => { setsuccessAlert(false) }}
                    />

                    <Loader isLoading={loader} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile;
