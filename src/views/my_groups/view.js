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
  import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
var jwt = require('jsonwebtoken');

class MyGroups extends Component {
	constructor(props) {
        super(props);
        this.state = { 
		};
	}

	componentDidMount(){
        

    }

    handleUploadProfile(type, ev) {
        let fields = this.state.fields;
        fields['image'] = 'image';
        this.setState({fields});
        // console.log(this.uploadInput.files)
    }

    handleChange(field, e){   

        let fields = this.state.fields;
        if (field === 'availabilityStatus') {
                fields[field] = parseInt(e.target.value); 
        }
        else
        {
            fields[field] = e.target.value; 
        }
        this.setState({fields});
        let errors = {};

        if(field === 'name' && fields["name"].trim() === ''){
            errors["name"] = "Please enter name";
        }

        if(field === 'userStatus' && !fields["userStatus"]){
            errors["userStatus"] = "Please enter status";
        }

        if(field === 'availabilityStatus' && !fields["availabilityStatus"]){
            errors["availabilityStatus"] = "Please select availability status";
        }

        if(field === 'image' && !fields["image"]){
            errors["image"] = "Please select image";
        }

        this.setState({errors: errors});

    }

    updateHandler(e)
    {
        let fields = this.state.fields;
        let formIsValid = true;

        let errors = {};
        if(fields["name"].trim() === ''){
            errors["name"] = "Please enter name";formIsValid = false;
        }

        if(!fields["userStatus"]){
            errors["userStatus"] = "Please enter status";formIsValid = false;
        }

        if(!fields["availabilityStatus"]){
            errors["availabilityStatus"] = "Please select availability status";formIsValid = false;
        }

        if(!fields["image"]){
            errors["image"] = "Please select image";formIsValid = false;
        }
        this.setState({errors: errors});

        if(formIsValid){
            // console.log(JSON.parse(reactLocalStorage.get('userData')).userId);
            const data = new FormData();
            data.append('id',this.state.fields._id);
            data.append('name',this.state.fields.name);
            data.append('userStatus',this.state.fields.userStatus);
            data.append('availabilityStatus',this.state.fields.availabilityStatus);
            if(this.state.fields.image === 'image'){
                data.append('image', this.uploadInput.files[0]);
            } 
            // console.log(data);
            fetch(configuration.baseURL+"user/userProfile", {
                method: "PUT",
                headers: {
                    'contentType': "application/json",
                    'Authorization': 'Bearer ' + reactLocalStorage.get('clientToken'),
                },
                body:data
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.code === 200){
                    this.setState({editModel:!this.state.editModel});
                }
                else
                {
                    return toast.error(data.message);
                }
                
            });
        }
    }

    handleChangeChangePassword(field, e){    
        var userId = JSON.parse(reactLocalStorage.get('userData')).userId;
        let fields = this.state.changePasswordFields;
        fields[field] = e.target.value;        
        fields['userId'] = userId;        
        this.setState({changePasswordFields:fields});

        let errors = {};
        
        if(field === 'oldPassword' && fields["oldPassword"].trim() === ''){
            errors["oldPassword"] = "Please enter old password";
        }

        if(field === 'password' && fields["password"].trim() === ''){
            errors["password"] = "Please enter password";
        }
        else{
            let re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[0-9])(?=.*[A-Za-z\d@$!%*#?&])(?=.{8,})/;
            if(field === 'password' && !re.test(fields["password"])){
                errors["password"] = "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.";
            }
        }

        if(field === 'confirm_password' && fields["confirm_password"].trim() === ''){
            errors["confirm_password"] = "Please enter confirm password";
        }
        if(field === 'confirm_password' && fields["confirm_password"]){
            if(fields["password"]!==fields["confirm_password"]){
                errors["confirm_password"] = "Password and confirm password not matched";
            }
        }

        this.setState({changePasswordErrors: errors});
    }

    changePasswordHandler(){
        let fields = this.state.changePasswordFields;
        let errors = {};
        let formIsValid = true;
        
        if(fields["oldPassword"].trim() === ''){
            formIsValid = false;
            errors["oldPassword"] = "Please enter old password";
        }

        if(fields["password"].trim() === ''){
            formIsValid = false;
            errors["password"] = "Please enter password";
        }
        else{
            let re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[0-9])(?=.*[A-Za-z\d@$!%*#?&])(?=.{8,})/;
            if(!re.test(fields["password"])){
                formIsValid = false;
                errors["password"] = "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.";
            }
        }

        if(fields["confirm_password"].trim() === ''){
            formIsValid = false;
            errors["confirm_password"] = "Please enter confirm password";
        }
        if(fields["confirm_password"]){
            if(fields["password"]!==fields["confirm_password"]){
                formIsValid = false;
                errors["confirm_password"] = "Password and confirm password not matched";
            }
        }

        this.setState({changePasswordErrors: errors});
        if(formIsValid){            
            fetch(configuration.baseURL+"user/changePassword", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(this.state.changePasswordFields)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.code === 200){
                    this.setState({changePasswordModel:!this.state.changePasswordModel})
                    fields.oldPassword = '';
                    fields.password = '';
                    fields.confirm_password = '';
                    this.setState({changePasswordFields:fields});
                    return toast.info(data.message);
                }
                else{
                    this.setState({tosterMsg:data.message});
                    return false;
                }
                
            });
        }
    }

	render() {

        $(document).ready(function() {
            var readURL = function(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        // console.log(e.target.result);
                        $('.display-profile-pic').attr('src', e.target.result);
                        $('.display-profile-pic').show();
                        $('#start').hide();
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }
            $(".file-upload").on('change', function(){
                readURL(this);
            });
            $(".upload-button").on('click', function() {
                $(".file-upload").click();
            });
        });

		return (
			<>
				<TheHeaderInner />				
					<main id="main">
                    <ToastContainer position="top-right" autoClose={25000} style={{top:'80px'}}/>
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
                                        <a href="javascript:void(0)"><li><img src="./murabbo/img/union.svg"/> Online Friend</li></a>
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
                                            <a href="javascript:void(0)" onClick={() => {this.setState({changePasswordModel:!this.state.changePasswordModel})}}><div class="profile-setting">
                                                <img src="./murabbo/img/password_.svg"/>
                                                <h3>Change Password <img class="arrow-right" src="./murabbo/img/arrow-right.svg"/></h3>
                                                
                                                <img class="position_right" src="./murabbo/img/password_2.svg"/>
                                            </div></a>
                                        </div>
                                        <div class="col-lg-4 col-md-6">
                                            <a href="javascript:void(0)" onClick={() => {this.setState({editModel:!this.state.editModel})}}><div class="profile-setting">
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
            <CModal size="lg" show={this.state.editModel} onClose={() => this.setState({editModel:!this.state.editModel})} color="danger"  centered>
                <CModalBody className="model-bg">

                <div>
                    <div className="modal-body">
                        <button type="button" className="close"  onClick={()=> this.setState({editModel:false})}>
                        <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                    </button>
                        <div className="model_data">
                            <div className="model-title">
                                <h3>Edit Profile</h3>
                            </div>
                            <div className="contest editprofile">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="profile-img">
                                            <form id="file-upload-form" className="uploader">
                                              <input id="file-upload" type="file" name="fileUpload" className="file-upload" accept="image/*" onChange={this.handleUploadProfile.bind(this,'image')} ref={(ref) => { this.uploadInput = ref; }}  />

                                              <label for="file-upload" id="file-drag">
                                                <img id="file-image"   src="#" alt="Preview" className="hidden"/>
                                                <div className="edit-pencil">
                                                    <img src="/img/pen.svg" />
                                                </div>
                                                <img className="display-profile-pic" src={this.state.fields['image']} alt=""  />
                                                <div id="start">
                                                    {(this.state.fields['image'] === '') ? <div><img className="profile-pic" src='./murabbo/img/upload.svg' alt=""  />
                                                  
                                                  <div id="add_image">Add Image</div></div> : null}
                                                  
                                                </div>
                                                <div id="response" className="hidden">
                                                  <div id="messages"></div>
                                                  
                                                </div>
                                              </label>
                                            </form>
                                        </div>

                                        <span  className="error-msg">{this.state.errors["image"]}</span>

                                        
                                    </div>
                                </div>
                                <div className="cus_input status_input input_wrap">
                                    <select className="floating-select" onChange={this.handleChange.bind(this,'availabilityStatus')} value={this.state.fields['availabilityStatus']} required>
                                        <option value="1">Online</option>
                                        <option value="2">Away</option>
                                        <option value="3">Do not disturb</option>
                                        <option value="4">Invisible</option>
                                    </select>
                                </div>
                                <span  className="error-msg">{this.state.errors["availabilityStatus"]}</span>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        
                                        <div className="cus_input input_wrap">
                                            <img src="./murabbo/img/username.svg" alt="Upload"/> <input type="text" required name="" onChange={this.handleChange.bind(this,'name')} value={this.state.fields['name']} />
                                            <label>Name</label>
                                        </div>
                                        <span  className="error-msg">{this.state.errors["name"]}</span>
                                        <div className="cus_input input_wrap">
                                            <img src="./murabbo/img/email.svg" alt="Upload"/> <input type="text" required name="" value={this.state.fields['email']} readonly />
                                            <label>Email</label>
                                        </div>

                                        <div className="cus_input input_wrap">
                                            <img src="./murabbo/img/title.svg" alt="Upload"/> <input type="text" required onChange={this.handleChange.bind(this,'userStatus')} name="" value={this.state.fields['userStatus']} />
                                            <label>Status</label>
                                        </div>
                                        <span  className="error-msg">{this.state.errors["userStatus"]}</span>
                                        
                                       
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' , float:'left'}} className="col-md-12 footer-btn">
                                    <button className="yellow_btn" type="button" onClick={()=> this.setState({editModel:false})} >Cancel</button>
                                
                                    <button className="pink_btn" type="button"  onClick={this.updateHandler.bind(this) } >Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </CModalBody>
            </CModal>

            <CModal size="lg" show={this.state.changePasswordModel} onClose={() => this.setState({changePasswordModel:!this.state.changePasswordModel})} color="danger"  centered>
                <CModalBody className="model-bg">

                <div>
                    <div className="modal-body">
                        <button type="button" className="close"  onClick={()=> this.setState({changePasswordModel:false})}>
                        <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                    </button>
                        <div className="model_data">
                            <div className="model-title">
                                <h3>ChangePassword</h3>
                            </div>
                            <div className="contest editprofile">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        {(this.state.tosterMsg != '') ? (
                                            <div className="tosterMsg">
                                                <button type="button" className="close"  onClick={() => { this.setState({tosterMsg:''})}}>
                                                    <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                                                </button>
                                                <span>{this.state.tosterMsg}</span>
                                            </div>) : null
                                        }
                                        <div className="cus_input input_wrap">
                                            <img src="./murabbo/img/password.svg" /> <input required type="password"  onChange={this.handleChangeChangePassword.bind(this, "oldPassword")} value={this.state.changePasswordFields["oldPassword"]}/>
                                            <label>Old Password</label>
                                        </div>
                                        <span className="error-msg">{this.state.changePasswordErrors["oldPassword"]}</span>
                                        <div className="cus_input input_wrap">
                                            <img src="./murabbo/img/password.svg" /> <input required type="password"  onChange={this.handleChangeChangePassword.bind(this, "password")} value={this.state.changePasswordFields["password"]}/>
                                            <label>New Password</label>
                                        </div> 
                                        <span className="error-msg">{this.state.changePasswordErrors["password"]}</span>
                                        <div className="cus_input input_wrap">
                                            <img src="./murabbo/img/password.svg" /> <input required type="password"  onChange={this.handleChangeChangePassword.bind(this, "confirm_password")} value={this.state.changePasswordFields["confirm_password"]}/>
                                            <label>Confirm Password</label>
                                        </div>
                                        <span className="error-msg">{this.state.changePasswordErrors["confirm_password"]}</span>
                                       
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' , float:'left'}} className="col-md-12 footer-btn">
                                    <button className="yellow_btn" type="button" onClick={()=> this.setState({changePasswordModel:false})} >Cancel</button>
                                
                                    <button className="blue_btn light_blue_btn" type="button"  onClick={this.changePasswordHandler.bind(this) } >Change</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </CModalBody>
            </CModal>
        </main>
		    </>
		)
	}
}

export default MyGroups
