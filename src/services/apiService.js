import appConstants from "../common/appConstants"
const baseUrl = "http://111.93.127.3:9005/"   // Staging url

export default function APIServices(variables, apiName, apiMethod, authorization, header) {
    console.log("apiRequest===>", variables)
    if (header == undefined) {
        header = "application/json"
    }
    else if (header === 'multipart/form-data') {
        header = "multipart/form-data"
    }
    let init = apiMethod == "GET" ? {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": apiName == 'social-login' ? '' : appConstants.token,
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    } :
        {
            method: apiMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': header,
                "Authorization": appConstants.token,
                "X-Requested-With": "XMLHttpRequest"
            },
            body: variables
        }
        // debugger
    console.log("header===>", JSON.stringify(init))
    console.log("url===>", baseUrl + apiName)
    return fetch(baseUrl + apiName, init)
        .then(res =>(
            res.json(res)
            .then(data => {
                // debugger
                console.log("data API " + JSON.stringify(data))
                var apiData = {
                    status: res.status,
                    data: data
                }
                return apiData;
            })
           
        ))
        .catch(err => {
            console.log("error " + err + '')
            var errData = {
                data: { status: 1002, responseMessage: "Network Request Failed." }
            }
            return errData;
        });
}