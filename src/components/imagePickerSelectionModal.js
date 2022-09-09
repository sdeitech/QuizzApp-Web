import React, { useState } from 'react'
import { CustomModal, CommonText } from './customComponent'
import ImagePicker from 'react-native-image-crop-picker';
import { View, TouchableOpacity, Dimensions, Platform } from 'react-native'
import commonStyle from './commonStyle'
import appConstants from '../utils/appConstants'
import color from '../utils/color'
import { getFontSize, dynamicSize } from '../utils/responsive'
import { avenirBold } from '../utils/fontFamily'
import { consoleLog } from './helper';
const { width, height } = Dimensions.get('window')

const ImagePickerSelection = props => {
    const { onCancelPress, pickerModal, closeModalOnSelection, selectedImageUri, selectedFormDataObj } = props

    const _openCamera = () => {
        closeModalOnSelection(false)
        ImagePicker.openCamera({
            cropperStatusBarColor: color['darkblueTheme'],
            cropperToolbarColor: color['green'],
            cropping: false,
            smartAlbums: Platform.OS === 'ios' && ['UserLibrary', 'PhotoStream', 'Bursts', 'Screenshots'],
            mediaType: 'photo'
        }).then(image => {
            consoleLog('image from camera', image)
            let fileName = image.path.split('/').filter(item => {
                if (item.includes('.jpeg') || item.includes('.jpg') || item.includes('.png'))
                    return item
            })
            selectedImageUri(image.path)
            selectedFormDataObj({ 'uri': image.path, 'type': image.mime, 'name': fileName.toString() })
        });
    }

    const _openPicker = () => {
        // closeModalOnSelection(false)
        ImagePicker.openPicker({
            cropping: false,
            cropperStatusBarColor: color['darkblueTheme'],
            cropperToolbarColor: color['green'],
            smartAlbums: Platform.OS === 'ios' && ['UserLibrary', 'PhotoStream', 'Bursts', 'Screenshots'],
            mediaType: 'photo'
        }).then(image => {
            closeModalOnSelection(false)
            consoleLog('image from camera', image)
            let fileName = image.path.split('/').filter(item => {
                if (item.includes('.jpeg') || item.includes('.jpg') || item.includes('.png'))
                    return item
            })
            selectedImageUri(image.path)
            selectedFormDataObj({ 'uri': image.path, 'type': image.mime, 'name': fileName.toString() })
        });
    }

    return (
        <CustomModal
            isModalVisible={pickerModal}
            style={{ justifyContent: 'flex-end' }}
        >
            <View style={{ padding: dynamicSize(10), alignItems: 'center' }}>
                <TouchableOpacity style={{ flex: 1, width }} onPress={onCancelPress} />
                <TouchableOpacity onPress={_openCamera} style={commonStyle['takePhotoView']}>
                    <CommonText text={appConstants['TAKE_PHOTO']} style={{ color: color['darkblueTheme'], fontSize: getFontSize(20) }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={_openPicker} style={commonStyle['chooseFromLibrary']}>
                    <CommonText text={appConstants['CHOOSE_FROM_LIBRARY']} style={{ color: color['darkblueTheme'], fontSize: getFontSize(20) }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onCancelPress} style={commonStyle['cancelButton']}>
                    <CommonText text={appConstants['CANCEL']} style={{ color: color['fadeRedColor'], fontSize: getFontSize(20), fontFamily: avenirBold }} />
                </TouchableOpacity>
            </View>
        </CustomModal>
    )
}

export default ImagePickerSelection