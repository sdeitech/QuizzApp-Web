import React, { Component } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import configuration from "./config";
var jwt = require("jsonwebtoken");

class ViewSession extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //  checkLogin(){

    //     try {
    //         if(reactLocalStorage.get('is_login') === 'true'){
    //             window.location.href = '/#/dashboard'
    //             return true;

    //         }else{
    //             reactLocalStorage.set('is_login','false');
    // 			window.location.href = '/#/'
    //             return false;
    // 		}
    //     } catch(err) {

    //         reactLocalStorage.set('is_login','false');
    //        window.location.href = '/#/'
    //        return false;
    //     }
    // }

    componentDidMount() {
        try {
            // let check = this.checkLogin();
            // if(check){
            //     return;
            // }
            if (reactLocalStorage.get("is_login") === "true") {
                var token = reactLocalStorage.get("token");
                jwt.verify(
                    token,
                    configuration.appName,
                    function (err, decoded) {
                        if (err) {
                            decoded = null;
                            reactLocalStorage.set("is_login", "false");
                            window.location.href = "/#/";
                        }
                        if (decoded) {
                            if (reactLocalStorage.get("redirect") == "true") {
                                window.location.href = "/#/dashboard";
                                reactLocalStorage.set("redirect", "false");
                            }
                            // reactLocalStorage.set('is_login','false');
                        }
                    }
                );
            } else {
                // reactLocalStorage.set('is_login','false');
                reactLocalStorage.set("token", "");
                reactLocalStorage.set("userData", "");
                reactLocalStorage.set("is_login", "false");
                window.location.href = "/#/";
                if (reactLocalStorage.get("reload") === "true") {
                    window.location.reload();
                    reactLocalStorage.set("reload", "false");
                }
            }
        } catch (err) {
            // reactLocalStorage.set('is_login','false');
            reactLocalStorage.set("token", "");
            reactLocalStorage.set("userData", "");
            reactLocalStorage.set("is_login", "false");
            window.location.href = "/#/";
        }
    }

    render() {
        return <div className="animated fadeIn"></div>;
    }
}

export default ViewSession;
