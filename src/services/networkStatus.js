import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";

// check the net is available or not.
export function networkStatus(){
     return new Promise((resolve, reject) => {
         NetInfo.fetch().then(state => {
          if(state.isConnected) {
                resolve(state.isConnected);
          }
        else{
            resolve(state.isConnected);
        }
          });
    })
}