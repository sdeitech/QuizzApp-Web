import React, { Component } from 'react'
import Session from '../session';
import { reactLocalStorage } from 'reactjs-localstorage';
import configuration from '../config';
import { ToastContainer, toast } from "react-toastify";

import {
    CModal,
    CModalBody,
} from '@coreui/react';
var jwt = require('jsonwebtoken');
class TheHeaderInner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile_picture: 'avatars/placeholder-user.png',
            name: '',
            confirmationModel: false,
            errorsPlay: {},
            fieldsPlay: { display_name: '', password: '' },
            playNewContestModel: false,
            searchKey:'',
            hiddenPassword:true,

        };
    }

    componentDidMount() {
        let that = this;
        var token = reactLocalStorage.get('token');
        jwt.verify(token, configuration.appName, function (err, decoded) {
            if (err) {
                decoded = null;
                reactLocalStorage.set('token', '');
                reactLocalStorage.set('userData', '');
                reactLocalStorage.set('is_login', 'false');
                window.location.href = '/#/'
            }
            if (decoded) {
                that.setState({ profilePic: (JSON.parse(reactLocalStorage.get('userData')).profilePic === '' ? 'avatars/placeholder-user.png' : JSON.parse(reactLocalStorage.get('userData')).profilePic), name: JSON.parse(reactLocalStorage.get('userData')).name })
            }
        });


        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
        fetch(configuration.baseURL + "user/userProfile?userId=" + userId, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            var data = data.data;
            if (data.image === '') {
                this.setState({ profile_picture: 'avatars/placeholder-user.png', name: data.name })
            }
            else {
                this.setState({ profile_picture: data.image, name: data.name })
            }
        });

        console.log("checkkkkk",this.props);
    }


    handleChangePlay(field, e) {
        let fields = this.state.fieldsPlay;
        fields[field] = e.target.value;
        this.setState({ fieldsPlay: fields });

        let errors = {};
        if (field === 'display_name' && fields["display_name"].trim() === '') {
            errors["display_name"] = "Please enter Game PIN";
        }

        if (field === 'password' && fields["password"].trim() === '') {
            errors["password"] = "Please enter Game Password";
        }
        this.setState({ errorsPlay: errors });
    }

    toggleShowPassword() {
        this.setState({ hiddenPassword: !this.state.hiddenPassword });
      }

    handleNext() {
        let fields = this.state.fieldsPlay;
        let errors = {};
        let formIsValid = true;
        if (fields["display_name"].trim() === '') {
            formIsValid = false;
            errors["display_name"] = "Please enter Game PIN";
        }

        if (fields["password"].trim() === '') {
            errors["password"] = "Please enter Game Password";
        }

        this.setState({ errorsPlay: errors });
        // if (formIsValid) {
        //     this.setState({ playNewContestModel: false });
            
        //      const data = new FormData();
        //      data.append('gamePin',fields["display_name"]);
        //      data.append('password',fields["password"]);
        //      data.append('createdBy',JSON.parse(reactLocalStorage.get('userData')).userId);
        //      data.append('contestId',fields["contestId"]) ;

        //      fetch(configuration.baseURL+"room/pinPassword?gamePin="+fields["display_name"]+"&password="+fields["password"]+"", {
        //          method: "GET",
        //          headers: {
        //              'contentType': "application/json",
        //              'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
        //          }
        //      }).then((response) => {
        //          return response.json();
        //      }).then((data) => {
        //          if(data.code === 200){

        //             console.log("checkkkkk",this.props);

        //              this.props.history.push('/detail-contest/'+data.data[0].contestDetails.parentId+'?'+data.data[0]._id);
        //          }
        //          else
        //          {
        //              return toast.error(data.message);
        //          }

        //      });

        // }
    }
    searchData(e){
        this.setState({searchKey:e.target.value})
    }

    handleLogout(check, e) {
        if (check) {
            reactLocalStorage.set('token', '');
            reactLocalStorage.set('userData', '');
            reactLocalStorage.set('is_login', 'false');
            window.location.href = '/#/'
        }
        else {
            this.setState({ confirmationModel: true });
        }
    }
    render() {
        return (
            <header id="header" className="fixed-top">
                <Session />
                <div className="container align-items-center">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <h1 className="logo mr-auto">
                            <a href="#/dashboard">
                                <img src="./murabbo/img/logo.png" alt="logo" />
                            </a>
                        </h1>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">

                                <li style={{ width: '100%' }} className="nav-item">
                                    {/*<div className="search">
                                <input placeholder="Search by keywords" type="text" /><i className='bx bx-search'></i>
                            </div>*/}
                                    
                                </li>
                            </ul>

                            <div style={{marginRight:"22px",position:"relative"}}>
                                        {/* <input className="form-control form-control-sm mr-3 w-100" onChange={this.searchData.bind(this)} type="text" placeholder="Search"
                                            aria-label="Search" /> */}


                                        <a  href={`#/searchRound?${this.state.searchKey}`} style={{color:"#fff"}}>

                                           Search  <i className="fas fa-search" aria-hidden="true" style={{
                                                position: "absolute",
                                                left: "-23px",
                                                top: "2px",
                                                fontSize: '18px',
                                                cursor: "pointer"
                                            }}></i>
                                        </a>

                            </div>


                            <form className="form-inline my-2 my-lg-0">
                                <ul className="navbar-nav mr-auto">
                                    <div className="dropdown">
                                        <div className="dropdown-toggle cus_img" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src={this.state.profile_picture} alt="Team" /> {this.state.name}
                                        </div>
                                        <div className="dropdown-menu drop_menu" aria-labelledby="dropdownMenu2">
                                            <a href="#/my_account"><li><i className='bx bx-user'></i> My Account</li></a>
                                            <a href="#/dashboard"><li><i className='bx bx-abacus'></i> Dashboard</li></a>
                                            <a href="#/contest"><li><i className='bx bx-game'></i> My Games</li></a>
                                            <a href="#/games_history"><li><i className='bx bx-calendar-star'></i> Games History</li></a>
                                            <a href="#/leaderboard"><li><i className='bx bx-bookmark'></i> Leaderboard</li></a>
                                            <a href="#/my_groups"><li><i className='bx bx-group'></i> My Groups</li></a>
                                            <a href="#/notification"><li><i className='bx bx-bell'></i> Notifications</li></a>
                                            <a href="#/yourfriends"><li><i className='bx bx-user'></i> Your Friends</li></a>

                                            <span style={{ cursor: 'pointer' }}><li><i className='bx bx-user-circle'></i> Online Friend</li></span>

                                            <span style={{ cursor: 'pointer' }} onClick={this.handleLogout.bind(this, false)}><li><i className='bx bx-log-in' ></i> Logout</li></span>
                                        </div>
                                    </div>

                                    <li className="nav-item">
                                        <button className="yellow_btn" type="button" onClick={() => this.setState({ playNewContestModel: true })}><img src="./murabbo/img/pin.svg" alt="Pin" /> Enter Pin</button>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link " href="#/add_contest">
                                            <button className="blue_btn" type="button"><img src="./murabbo/img/create.svg" alt="Create" /> Create</button>
                                        </a>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </nav>
                </div>

                <CModal show={this.state.playNewContestModel} closeOnBackdrop={false} onClose={() => this.setState({ playNewContestModel: false })}
                    color="danger"
                    centered>
                    <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close" onClick={() => this.setState({ playNewContestModel: false })}>
                                    <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <h3>Enter Contest PIN</h3>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg" />
                                    <img className="shape3" src="./murabbo/img/shape3.svg" />
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">

                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/title.svg" />
                                                <input required type="text" onChange={this.handleChangePlay.bind(this, "display_name")} value={this.state.fieldsPlay["display_name"]} />
                                                <label>Game PIN</label>
                                            </div>
                                            <span className="error-msg">{this.state.errorsPlay["display_name"]}</span>

                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/password.svg" />
                                                <input required type={this.state.hiddenPassword ? "password": "text"} onChange={this.handleChangePlay.bind(this, "password")} value={this.state.fieldsPlay["password"]} />
                                                <label>Game Password</label>
                                                <span style={{
                                                position: "absolute",
                                                right: "27px",
                                                top: "47px"
                                                    }}>
                                                
                                                {this.state.hiddenPassword  ? (<img src="./murabbo/img/eye-hide.png" alt="eyeicon" onClick={this.toggleShowPassword.bind(this)} />):(<img src="./murabbo/img/eye.png" alt="eyeicon" onClick={this.toggleShowPassword.bind(this)}  />)}
                                            </span>
                                            </div>
                                            <span className="error-msg">{this.state.errorsPlay["password"]}</span>
                                        </div>
                                        <div className="col-md-10 offset-md-1">

                                            <div style={{ textAlign: 'center', float: 'left', marginRight: '10px' }} className="">
                                                <button style={{ minWidth: '150px' }} className="blue_btn light_blue_btn" type="button" onClick={this.handleNext.bind(this)}>Next</button>
                                            </div>
                                            <div style={{ textAlign: 'center' }} className="">
                                                <button style={{ minWidth: '150px', float: 'left' }} className="pink_btn" type="button" onClick={() => this.setState({ playNewContestModel: false })} >Cancel</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CModalBody>
                </CModal>

                <CModal show={this.state.confirmationModel} closeOnBackdrop={false} onClose={() => this.setState({ confirmationModel: false })}
                    color="danger"
                    centered>
                    <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close" onClick={() => this.setState({ confirmationModel: false })}>
                                    <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <img src='./murabbo/img/exit.png' alt="" />
                                        <h3>Logout</h3>
                                        <h4>Do you want to logout?</h4>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg" />
                                    <img className="shape3" src="./murabbo/img/shape3.svg" />
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">

                                            <div style={{ textAlign: 'center', float: 'left', marginRight: '10px' }} className="">
                                                <button style={{ minWidth: '150px' }} className="pink_btn" type="button" onClick={this.handleLogout.bind(this, true)} >Logout</button>
                                            </div>
                                            <div style={{ textAlign: 'center', float: 'left' }} className="">
                                                <button style={{ minWidth: '150px'}} className="blue_btn" type="button" onClick={() => this.setState({ confirmationModel: false })} >Cancel</button>
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
