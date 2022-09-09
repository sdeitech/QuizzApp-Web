import { Share } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export function setUserData(data) { // set the token and manage login case.
    AsyncStorage.setItem('userData', data)
}
export const getUserData = async () => { // used for get token.
    return await AsyncStorage.getItem('userData')

 }

export function setToken(token) { // set the token and manage login case.
    AsyncStorage.setItem('bareer_key', token)
}


export const getToken = async () => { // used for get token.
   return await AsyncStorage.getItem('bareer_key')
}

// remove token from local storage.
export const removeToken = () => {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('bareer_key')
    AsyncStorage.removeItem('userData')
}

export const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'I am a Satisfied HOLR Customer, an On-Demand platform for Moving Furniture/Appliances, Point-to-Point Pickup Delivery and Vehicle Towing',
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
