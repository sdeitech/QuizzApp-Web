import localKey from './localStorageKey';
import { getData } from  '../components/helper';
import AsyncStorage from '@react-native-community/async-storage';




/*
    Check If value is empty or not...
*/
export const getLoginToken = async () => {

    let userData = await getData(localKey['LOGIN_TOKEN'])
    console.log('userData::',userData);
    if (userData != null || userData != undefined) {
        return userData;
    }else {
        return null;
    }
}


export const setUserData = async (value) => {
  //  AsyncStorage.setItem(localKey['LOGIN_USER_DATA'], JSON.stringify(value));
    try {
        await AsyncStorage.setItem(localKey['LOGIN_USER_DATA'], JSON.stringify(value))
    } catch (e) {
        consoleLog(`Error in storing ${key} to localstotage.`)
    }
}

/*
* Check If value is empty or not...
*/
export const getLoginData = async () => {

    let userData = await AsyncStorage.getItem(localKey['LOGIN_USER_DATA'])
    console.log('userData::', userData);
    if (userData != null || userData != undefined) {
        return  JSON.parse(userData);
    }else {
        return null;
    }
}
