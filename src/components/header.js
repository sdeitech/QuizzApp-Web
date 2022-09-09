import AsyncStorage from '@react-native-community/async-storage';
import icons from './icons';
import color from '../utils/color';
import Toast from 'react-native-tiny-toast'
import { Platform, Dimensions } from 'react-native';
const { height } = Dimensions.get('window')
export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(`${key}`, value ? value.toString() : null)
    } catch (e) {
        consoleLog(`Error in storing ${key} to localstotage.`)
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`${key}`)
        if (value !== null) {
            return value
        }
    } catch (e) {
        consoleLog(`Error in getting ${key} from localstotage.`)
    }
}

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(`${key}`)
    } catch (e) {
        consoleLog(`Error in removing ${key} from localstotage.`)
    }
}

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        consoleLog(`Error in clearing localstotage.`)
    }
}

export const consoleLog = (param1, param2) => {
    const isLog = true;
    return isLog && console.log(param1, param2);
}



export const SuccessSnackBar = (msg) => {
    return Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color['green'],
        textColor: color['white'],
    });
}

export const ErrorSnackBar = (msg) => {
    return Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color['fadeRedColor'],
        textColor: color['white'],
    });
}

export const ShowToast = (msg) => {
    return Toast.show(`${msg}`, {
        position: height / 8,
        containerStyle: { backgroundColor: color['green'] },
        textStyle: {  color: color['white'] }
    })
}

export const ShowErrorToast = (msg) => {
    return Toast.show(`${msg}`, {
        position: height / 8,
        containerStyle: { backgroundColor: color['fadeRedColor'] },
        textStyle: {  color: color['white'] }
    })
}

export const capitalizeFirstAlpha = text => {
    return text && text[0].toUpperCase() + text.slice(1);
}

export const getDotIcon = (item) => {
    // if (item['statusCode'] === 0) return icons['yellowDot']
    // if (item['statusCode'] === 1) return icons['orangeDot']
    // if (item['statusCode'] === 2) return icons['redDot']
    // if (item['statusCode'] === 3) return icons['greyDot']
    if (item['statusCode'] === 0) return icons['yellowDot']
    if (item['statusCode'] === 1) return icons['warning']
    if (item['statusCode'] === 2) return icons['warning']
    if (item['statusCode'] === 3) return icons['greyDot']
}

export const getcolorStatus = (item) => {
    if (item['statusCode'] === 0) return color['yellowIconColor']
    if (item['statusCode'] === 1) return color['orangeIconColor']
    if (item['statusCode'] === 2) return color['redIconColor']
    if (item['statusCode'] === 3) return color['greyIconColor']
}





export const CreateReceiveMsgHistory = (receiveMsg, history, id) => {
    if (receiveMsg.hasOwnProperty('message') && receiveMsg.hasOwnProperty('from')) {
        let newMessageHistory = [...history]
        newMessageHistory.push({
            body: receiveMsg['message'],
            participant_id: id,
            date_time: getDateTime()
        })
        return newMessageHistory
    }
}

export const CreateSendMsgHistory = (sendMessage, history, id) => {
    let newMessageHistory = [...history]
    newMessageHistory.push({
        body: sendMessage,
        participant_id: id,
        date_time: getDateTime()
    })
    return newMessageHistory
}



