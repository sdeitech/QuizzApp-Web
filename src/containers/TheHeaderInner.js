import React, {Component} from 'react'
import Session from '../session';
import {reactLocalStorage} from 'reactjs-localstorage';

class TheHeaderInner extends Component {

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
                                <input placeholder="Search By keywords" type="text" /><i class='bx bx-search'></i>
                            </div>
                          </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <ul class="navbar-nav mr-auto">
                                <div class="dropdown">
                                    <div class="dropdown-toggle cus_img" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src="./murabbo/img/team-1.jpg" alt="Team"/> James Pati
                                    </div>
                                    <div class="dropdown-menu drop_menu" aria-labelledby="dropdownMenu2">
                                        <a href="redirect"><li><i class='bx bx-user'></i> My Account</li></a>
                                        <a href="#/contest"><li><i class='bx bx-user'></i> List Contest</li></a>
                                        <a href="#/add_contest"><li><i class='bx bx-user'></i> Add Contest</li></a>
                                        <span style={{ cursor:'pointer'}} onClick={this.handleLogout.bind(this)}><li><i class='bx bx-log-in' ></i> Logout</li></span>
                                    </div>
                                </div>
                                <li class="nav-item">
                                    <a data-toggle="modal" data-target="#setpin" class="nav-link" href="redirect">
                                        <button class="yellow_btn" type="button"><img src="./murabbo/img/pin.svg" alt="Pin"/> Set Pin</button>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link " href="redirect">
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
