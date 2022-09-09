import { header } from '../utils/serviceConstants'
import appConstants from '../utils/appConstants'

import { consoleLog } from './helper'

const apiRequest = (variables, URL, apiMethod) => {
    consoleLog('request >> url ===>', URL)
    consoleLog('request >> header ===>', header)
    consoleLog('request >> postData ===>', variables)

    var init = apiMethod === 'POST' ?
        {
            method: apiMethod,
            headers: header,
            body: variables
        }
        : apiMethod === 'PUT' ?
            {
                method: apiMethod,
                headers: header,
                body: variables
            } :
            {
                method: apiMethod,
                headers: header
            }

    console.log("creating my temp method::", URL, init);

    return fetch(`${URL}`, init).then(resp => resp.json()
      
        .then(data => {
            let jsonResp = {
                status: resp.status,
                jsonData: data
            } 
            console.log("respo",jsonResp);
            return jsonResp
            
        }))
        .catch((error) => {
            consoleLog(error);
            consoleLog('catch Error of service request==>', error)
            let catchErr = {
                status: 900,
                jsonData: { message: appConstants['NETWORK_ERROR'] }
            }
            consoleLog('catcherr=<<', catchErr)
            return catchErr
        })
        
}

export default apiRequest
