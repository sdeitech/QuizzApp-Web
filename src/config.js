import {reactLocalStorage} from 'reactjs-localstorage';
var jwt = require('jsonwebtoken');

const config = {
    appName: 'Murabbo',
    // baseURL: 'http://localhost:3019/api/app/',
    // APIbaseURL: 'http://localhost:3019/api/',
    baseURL: 'https://dev-api.murabbo.com/api/app/',
    APIbaseURL: 'https://dev-api.murabbo.com/api/',

    saveTokenData(data,done) {
        var token = this.generateToken(data);
        reactLocalStorage.set('token', token);
        reactLocalStorage.set('clientToken', data.accessToken);
        reactLocalStorage.set('userData', JSON.stringify(data));
        reactLocalStorage.set('is_login', 'true');
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
    }
};

export default config;