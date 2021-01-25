import React, {Component} from 'react'
import Session from '../session';
import {reactLocalStorage} from 'reactjs-localstorage';
import configuration from '../config';
var jwt = require('jsonwebtoken');
class TheHeaderInner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile_picture:'avatars/placeholder-user.png',
            name:''
        };
    }

    componentDidMount(){
        let that = this;
        var token = reactLocalStorage.get('token');
        jwt.verify(token, configuration.appName , function (err, decoded){
            if (err){
                decoded = null;
                reactLocalStorage.set('token', '');
                reactLocalStorage.set('userData', '');
                reactLocalStorage.set('is_login', 'false');
                window.location.href = '/#/'
            }
            if(decoded){
                that.setState({profilePic: (JSON.parse(reactLocalStorage.get('userData')).profilePic === '' ? 'avatars/placeholder-user.png' : JSON.parse(reactLocalStorage.get('userData')).profilePic), name:JSON.parse(reactLocalStorage.get('userData')).name})
            }
        });
    }

    handleLogout()
    {
        reactLocalStorage.set('token', '');
        reactLocalStorage.set('userData', '');
        reactLocalStorage.set('is_login', 'false');
        window.location.href = '/#/'
    }    
    render() {
        return (
        <header id="header" class="fixed-top">
            <Session/>
            <div class="container align-items-center">
                <nav class="navbar navbar-expand-lg navbar-dark">
                    <h1 class="logo mr-auto">
                        <a href="redirect">
                            <img src="./murabbo/img/logo.svg" alt="logo"/>
                        </a>
                    </h1>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">

                          <li style={{ width: '100%' }} class="nav-item">
                            <div class="search">
                                <input placeholder="Search by keywords" type="text" /><i class='bx bx-search'></i>
                            </div>
                          </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <ul class="navbar-nav mr-auto">
                                <div class="dropdown">
                                    <div class="dropdown-toggle cus_img" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src={ this.state.profile_picture } alt="Team"/> {this.state.name}
                                    </div>
                                    <div class="dropdown-menu drop_menu" aria-labelledby="dropdownMenu2">
                                        <a href="javascript:void(0);"><li><i class='bx bx-user'></i> My Account</li></a>
                                        <a href="#/contest"><li><i class='bx bx-user'></i> List Contest</li></a>
                                        <a href="#/add_contest"><li><i class='bx bx-user'></i> Add Contest</li></a>
                                        <span style={{ cursor:'pointer'}} onClick={this.handleLogout.bind(this)}><li><i class='bx bx-log-in' ></i> Logout</li></span>
                                    </div>
                                </div>
                                <li class="nav-item">
                                    <a data-toggle="modal" data-target="#setpin" class="nav-link" href="javascript:void(0);">
                                        <button class="yellow_btn" type="button"><img src="./murabbo/img/pin.svg" alt="Pin"/> Set Pin</button>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link " href="#/add_contest">
                                        <button class="blue_btn" type="button"><img src="./murabbo/img/create.svg" alt="Create"/> Create</button>
                                    </a>
                                </li>
                            </ul>
                        </form>
                      </div>
                </nav>
            </div>
        </header>
    )
}
}

export default TheHeaderInner
