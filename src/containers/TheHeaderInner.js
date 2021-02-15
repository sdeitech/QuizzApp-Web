import React, {Component} from 'react'
import Session from '../session';
import {reactLocalStorage} from 'reactjs-localstorage';
import configuration from '../config';
import {
    CModal,
    CModalBody,
  } from '@coreui/react';
var jwt = require('jsonwebtoken');
class TheHeaderInner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile_picture:'avatars/placeholder-user.png',
            name:'',
            confirmationModel:false
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
 

    handleLogout(check,e)
    {
        if (check) {
            reactLocalStorage.set('token', '');
            reactLocalStorage.set('userData', '');
            reactLocalStorage.set('is_login', 'false');
            window.location.href = '/#/'
        }
        else
        {
            this.setState({confirmationModel:true});
        }
    }
    render() {
        return (
        <header id="header" class="fixed-top">
            <Session/>
            <div class="container align-items-center">
                <nav class="navbar navbar-expand-lg navbar-dark">
                    <h1 class="logo mr-auto">
                        <a href="#/contest">
                            <img src="./murabbo/img/logo.png" alt="logo"/>
                        </a>
                    </h1>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">

                          <li style={{ width: '100%' }} class="nav-item">
                            {/*<div class="search">
                                <input placeholder="Search by keywords" type="text" /><i class='bx bx-search'></i>
                            </div>*/}
                          </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <ul class="navbar-nav mr-auto">
                                <div class="dropdown">
                                    <div class="dropdown-toggle cus_img" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src={ this.state.profile_picture } alt="Team"/> {this.state.name}
                                    </div>
                                    <div class="dropdown-menu drop_menu" aria-labelledby="dropdownMenu2">
                                        <a href="#/my_account"><li><i class='bx bx-user'></i> My Account</li></a>
                                        <a href="#/contest"><li><i class='bx bx-detail'></i> My Games</li></a>
                                        <a href="#/contest"><li><i class='bx bx-detail'></i> Games History</li></a>
                                        <span style={{ cursor:'pointer'}}><li><i class='bx bx-bookmark'></i> Leaderboard</li></span>
                                        <span style={{ cursor:'pointer'}}><li><i class='bx bx-bell'></i> Notifications</li></span>
                                        <span style={{ cursor:'pointer'}}><li><i class='bx bx-user'></i> Online Friend</li></span>

                                        <span style={{ cursor:'pointer'}} onClick={this.handleLogout.bind(this,false)}><li><i class='bx bx-log-in' ></i> Logout</li></span>
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
            <CModal show={this.state.confirmationModel}  closeOnBackdrop={false}  onClose={()=> this.setState({confirmationModel:false})}
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"   onClick={()=> this.setState({confirmationModel:false})}>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <img src='./murabbo/img/exit.png' alt=""  />
                                        <h3>Logout</h3>
                                        <h4>Do you want to logout?</h4>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">

                                            <div style={{ textAlign: 'center' , float:'left',marginRight:'10px' }} className="">
                                                <button  style={{minWidth: '150px'}}  className="yellow_btn" type="button"  onClick={this.handleLogout.bind(this,true)} >Logout</button>
                                            </div>
                                            <div style={{ textAlign: 'center' , float:'left'}} className="">
                                                <button  style={{minWidth: '150px',color: '#f8c84e',fontWeight: '500'}}  className="btn" type="button"  onClick={()=> this.setState({confirmationModel:false})} >Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>
        </header>
    )
}
}

export default TheHeaderInner
