import React, {Component} from 'react'
import {
    TheFooter,
    TheHeaderInner
} from '../../containers/index'
import {reactLocalStorage} from 'reactjs-localstorage';
import configuration from '../../config';
import {
    CModal,
    CModalBody,
  } from '@coreui/react';
var jwt = require('jsonwebtoken');

class MyAccount extends Component {
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

	render() {
		return (
			<>
				<TheHeaderInner />				
					<main id="main">
            <section id="contest" class="d-flex align-items-center">
                <div class="container">
                    <div style={{ marginTop: '30px'}} class="contest-info">
                        <div class="row">
                            <div style={{ padding: '0'}} class="col-lg-3 col-md-4">
                                <div class="sidebar-dashboard">
                                    <ul>
                                        <a href="javascript:void(0)"><li onClick={() => this.props.history.push('/my_account')} class="active_side"><img src="./murabbo/img/username.svg"/>  My Profile</li></a>
                                        <a href="javascript:void(0)l"><li onClick={() => this.props.history.push('/contest')}><img src="./murabbo/img/console.svg"/> My Games</li></a>
                                        <a href="javascript:void(0)"><li onClick={() => this.props.history.push('/contest')}><img src="./murabbo/img/calendar.svg"/> Game History</li></a>
                                        <a href="javascript:void(0)"><li><img src="./murabbo/img/leaderboard.svg"/> Leaderboard</li></a>
                                        <a href="javascript:void(0)"><li><img src="./murabbo/img/union.svg"/> Online Frined</li></a>
                                        <a href="javascript:void(0)"><li><img src="./murabbo/img/invitation.svg"/> Invite Friend</li></a>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-9 col-md-8">
                                <div class="main_title_">
                                    <h3>My Profile</h3>  
                                </div>   

                                <div class="profile_info">
                                    <div class="row">
                                        <div style={{ marginTop: '20px'}} class="col-lg-8 col-md-6">
                                            <div class="inline">
                                                <img src={ this.state.profile_picture }/> 
                                            </div>
                                            <div class="inline social-info">
                                                <h3>{ this.state.name }</h3>
                                                <img src="./murabbo/img/instagram.svg"/> <span>{ this.state.name }</span><br />
                                                <img src="./murabbo/img/diamond.svg"/> <span>Best performer</span>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-6">
                                            <div class="scrore">
                                                <img src="./murabbo/img/tropy.svg"/>
                                                <p>Current Score</p>
                                                <h2>5,587 <span>pt</span></h2>
                                            </div>    
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-4 col-md-6">
                                            <a href="javascript:void(0)"><div class="profile-setting">
                                                <img src="./murabbo/img/member-card.svg"/>
                                                <h3>Membership <img class="arrow-right" src="./murabbo/img/arrow-right.svg"/></h3>
                                                
                                                <img class="position_right" src="./murabbo/img/member-card2.svg"/>
                                            </div></a>
                                        </div>
                                        <div class="col-lg-4 col-md-6">
                                            <a href="javascript:void(0)"><div class="profile-setting">
                                                <img src="./murabbo/img/account.svg"/>
                                                <h3>Social Accounts <img class="arrow-right" src="./murabbo/img/arrow-right.svg"/></h3>
                                                
                                                <img class="position_right" src="./murabbo/img/account2.svg"/>
                                            </div></a>
                                        </div>
                                        <div class="col-lg-4 col-md-6">
                                            <a href="javascript:void(0)"><div class="profile-setting">
                                                <img src="./murabbo/img/security.svg"/>
                                                <h3>Privacy & Security <img class="arrow-right" src="./murabbo/img/arrow-right.svg"/></h3>
                                                
                                                <img class="position_right" src="./murabbo/img/security2.svg"/>
                                            </div></a>
                                        </div>
                                        <div class="col-lg-4 col-md-6">
                                            <a href="javascript:void(0)"><div class="profile-setting">
                                                <img src="./murabbo/img/pref.svg"/>
                                                <h3>Preferences <img class="arrow-right" src="./murabbo/img/arrow-right.svg"/></h3>
                                                
                                                <img class="position_right" src="./murabbo/img/pref2.svg"/>
                                            </div></a>
                                        </div>
                                        <div class="col-lg-4 col-md-6">
                                            <a href="javascript:void(0)"><div class="profile-setting">
                                                <img src="./murabbo/img/password_.svg"/>
                                                <h3>Change Password <img class="arrow-right" src="./murabbo/img/arrow-right.svg"/></h3>
                                                
                                                <img class="position_right" src="./murabbo/img/password_2.svg"/>
                                            </div></a>
                                        </div>
                                        <div class="col-lg-4 col-md-6">
                                            <a href="javascript:void(0)"><div class="profile-setting">
                                                <img src="./murabbo/img/resume.svg"/>
                                                <h3>Edit Profile <img class="arrow-right" src="./murabbo/img/arrow-right.svg"/></h3>
                                                
                                                <img class="position_right" src="./murabbo/img/resume2.svg"/>
                                            </div></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
		    </>
		)
	}
}

export default MyAccount
