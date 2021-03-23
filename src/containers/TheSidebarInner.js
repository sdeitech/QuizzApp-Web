import React, { Component } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import configuration from '../config';
import $ from 'jquery';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var jwt = require('jsonwebtoken');


class TheSidebarInner extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    
    render (){


        return <ul>
            {/*class="active_side"*/}
                <a href="#/my_account"><li><img src="./murabbo/img/username.svg"/>  My Profile</li></a>
                <a href="#/contest"><li><img src="./murabbo/img/console.svg"/> My Games</li></a>
                <a href="#/contest"><li><img src="./murabbo/img/calendar.svg"/> Game History</li></a>
                <a href="#/leaderboard"><li><img src="./murabbo/img/leaderboard.svg"/> Leaderboard</li></a>
                <a href="javascript:void(0)"><li><img src="./murabbo/img/union.svg"/> Online Friend</li></a>
                <a href="javascript:void(0)"><li><img src="./murabbo/img/invitation.svg"/> Invite Friend</li></a>
            </ul>
    }
}

export default TheSidebarInner
