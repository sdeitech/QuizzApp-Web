import { ready } from 'jquery';
import {reactLocalStorage} from 'reactjs-localstorage';
var jwt = require('jsonwebtoken');

const config = {
    appName: 'Murabbo',
    fbAppId: "218767566802676",
    // baseURL: 'http://localhost:9002/api/app/',
    // APIbaseURL: 'http://localhost:9002/api/',

    //  baseURL: 'http://192.168.1.25:9002/api/app/',
    //  APIbaseURL: 'http://192.168.1.25:9002/api/',

    // APIbaseURL: 'http://localhost:9002/api/',
     baseURL: 'https://dev-api.murabbo.com/api/app/',
     APIbaseURL: 'https://dev-api.murabbo.com/api/',
    // baseURL: 'http://590d368c4afb.ngrok.io/api/app/',
    // APIbaseURL: 'http://590d368c4afb.ngrok.io/api/',
    sliderScore:5,
    
    saveTokenData(data,done) {
        var token = this.generateToken(data);
        reactLocalStorage.set('token', token);
        reactLocalStorage.set('clientToken', data.accessToken);
        reactLocalStorage.set('userData', JSON.stringify(data));
        reactLocalStorage.set('is_login', 'true');

        if(data.userId)
        {
            fetch(config.baseURL+"subscription/getusersubscription?userId="+data.userId, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                }
            }).then((response) =>{
                return response.json();
            }).then((data)=> {
                if(data)
                {
                    var res = data.data;
                    reactLocalStorage.set('subscriptionCode', res.currentPlan.subscriptionCode);
                }
            });
        }
        done({})
    },


    generateToken(user) {
        var object = {
            user_id: user.userId,
            email: user.email,
            name:user.name,
            profile_picture:user.profile_picture || '',
        };
        return jwt.sign(object, 'Murabbo', {
            expiresIn: '1d'
        });
    },
    checkUserHasAccess(subscriptionCodeItem) {
        var subscriptionCode = reactLocalStorage.get('subscriptionCode');
        console.log("User Subscription : "+subscriptionCode);
        console.log("Item Subscription : "+subscriptionCodeItem);
        if(subscriptionCode === 'PREMIUM')
        {
            return true;
        }
        else if(subscriptionCode === 'PRO')
        {
            if(subscriptionCodeItem === 'PREMIUM'){
                return false;
            }
            else if(subscriptionCodeItem === 'PRO' || subscriptionCodeItem === 'BASIC'){
                return true;    
            }
        }
        else if(subscriptionCode === 'BASIC')
        {
            if(subscriptionCodeItem === 'PRO' || subscriptionCodeItem === 'PREMIUM'){
                return false;
            }
            else{
                return true;
            }
        }
        else{
            if(subscriptionCodeItem !== 'PRO' && subscriptionCodeItem !== 'PREMIUM'){
                return true;
            }
        }
    }
};

export default config;