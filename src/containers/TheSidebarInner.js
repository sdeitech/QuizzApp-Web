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
            profile_picture:'avatars/placeholder-user.png',
            first_name:'',
            last_name:'',
            fields:{}
        };
    }

    componentDidMount(){
        let that = this;
        var token = reactLocalStorage.get('token');
        jwt.verify(token, configuration.appName , function (err, decoded){
            // console.log(reactLocalStorage.get('userData'));
            if (err){
                decoded = null;
                window.location.href = '/#/login'
            }
            if(decoded){
                that.setState({profile_picture: (JSON.parse(reactLocalStorage.get('userData')).profile_picture === '' ? 'avatars/placeholder-user.png' : JSON.parse(reactLocalStorage.get('userData')).profile_picture), first_name:JSON.parse(reactLocalStorage.get('userData')).first_name,last_name:JSON.parse(reactLocalStorage.get('userData')).last_name })
            }
        });
    }

    handleUploadProfile(type, ev) {
        let fields = this.state.fields;
        fields[type] = type;
        this.setState({fields});

		var advisor_id = reactLocalStorage.get('advisor_id');
        var data = new FormData(); 
        data.append('code', 'EN');
        data.append('advisor_id', advisor_id);
            
        if (this.state.fields['profile_picture'] === 'profile_picture' || this.state.fields['profile_picture']===''){
            data.append('profile_picture', this.uploadInput.files[0]);
        }

        fetch(configuration.baseURL+"advisor/update-advisor-profile", {
            method: "post",
            headers: {
                'contentType': "application/json",
            },
            body:data
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if(data.status===200){
                reactLocalStorage.set('userData', JSON.stringify(data.payload));
                return toast.success('Profile updated successfully.');
            }
            
        });
    }

    
    render (){

        $(document).ready(function() {
            var readURL = function(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        console.log(e.target.result);
                        $('.edit-profile-pic').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }
            $(".edit-file-upload").on('change', function(){
                readURL(this);
            });
        });

        return <div className="col-md-4 col-lg-3">
            <ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
            <div className="sidebar">


               

                <div style={{ display: 'inline-block'}}>
                    <div  className="col-responsive">
                        <div className="edit-circle">                                        
                            <img className="edit-profile-pic" alt="" src={this.state.profile_picture} />
                                <img className="edit-mask" alt="" src="img/mask.svg" style={{ cursor:'pointer'}} />
                            <div className="edit-p-image" >
                                <img className="edit-pen" alt="" src="img/pen.svg" style={{ cursor:'pointer'}} />
                                <input type="file" id="file" className="edit-file-upload" onChange={this.handleUploadProfile.bind(this,'profile_picture')} ref={(ref) => { this.uploadInput = ref; }}  accept="image/x-png,image/gif,image/jpeg" style={{ cursor:'pointer'}}  />
                            </div>
                        </div>
                    </div>
                </div>

                <h4>{this.state.first_name} {this.state.last_name} &nbsp;<img src="img/setting.svg" alt="" onClick={()=> window.location.href = '/#/account-setting'} style={ { cursor:'pointer'}} /> </h4>

                <div className="side-menu">
                    <a className="dropdown-item" href="/#/workstation"><img src="img/user.svg" alt=""/> <span>Upcoming Sessions</span></a>
                    <a className="dropdown-item" href="/#/past-session"><img src="img/dashboard.svg" alt=""/> <span>Past Sessions</span></a>
                    <a className="dropdown-item" href="/#/cancelation"><img src="img/calendar.svg" alt=""/> <span>Cancellations</span></a>
                    <a className="dropdown-item" href="/#/rating"><img src="img/chat.svg" alt=""/> <span>My Ratings</span></a>
                </div>
            </div>
        </div>
    }
}

export default TheSidebarInner
