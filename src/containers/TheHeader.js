import React, {Component} from 'react'
import configuration from '../config';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import {
    CModal,
    CModalBody,
  } from '@coreui/react';
import $ from 'jquery';
class TheHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
			errors: {},
            loginFields:{},
            loginErrors:{},
            forgotFields:{},
            forgotErrors:{},
            resetFields:{},
            resetErrors:{},
            openModelForgot:false,
            openModelRegister:false,
            openModelLogin:false,
            openModelReset:false,
            openModelCongratulation:false,
            checkbox:false
        };
    } 
    
    toggle(type) {
        if(type === 'login')
        {
            this.setState({
                openModelLogin: !this.state.openModelLogin
            });
        }
        else
        {
            this.setState({
                openModelRegister: !this.state.openModelRegister
            });
        }
    }

    handleClick(stateName,value,stateName1,value1,e) {
        $('body').addClass('modal-open');
        this.setState({
            fields: {name:'',email:'',password:'',confirm_password:''},
            errors: {name:'',email:'',password:'',confirm_password:''},
            loginFields:{email:'',password:''},
            loginErrors:{email:'',password:''},
            forgotFields:{email:''},
            forgotErrors:{email:''},
            resetFields:{otp:'',password:'',confirm_password:''},
            resetErrors:{otp:'',password:'',confirm_password:''},
        });

        if (stateName === 'openModelForgot') {
            this.setState({openModelForgot:value});
        }
        else if (stateName === 'openModelRegister') {
            this.setState({openModelRegister:value});
        }
        else if (stateName === 'openModelLogin') {
            this.setState({openModelLogin:value});
        }
        else if (stateName === 'openModelReset') {
            this.setState({openModelReset:value});
        }


        if (stateName1 === 'openModelRegister') {
            this.setState({openModelRegister:value1});
        }
        else if (stateName1 === 'openModelLogin') {
            this.setState({openModelLogin:value1});
        }
    }

    handleCloseClick(e) {
        $('body').removeClass('modal-open');

        this.setState({
            openModelForgot:false,
            openModelRegister:false,
            openModelLogin:false,
            openModelReset:false,
            openModelCongratulation:false
        });
    }
    handleChangeRegister(field, e){    
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});

        let errors = {};
        
        if(field === 'name' && fields["name"].trim() === ''){
            errors["name"] = "Please enter name";
        }

        if(field === 'email' && fields["email"].trim() === ''){
            errors["email"] = "Please enter email";
        }
        else if(field === 'email' && typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                errors["email"] = "Please enter valid email";
            }
        }

        if(field === 'password' && fields["password"].trim() === ''){
            errors["password"] = "Please enter password";
        }
        else{
            let re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[0-9])(?=.*[A-Za-z\d@$!%*#?&])(?=.{8,})/;
            if(field === 'password' && !re.test(fields["password"])){
                errors["password"] = "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters";
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

        this.setState({errors: errors});
    }

    handleChangeLogin(field, e){         
        let loginFields = this.state.loginFields;
        loginFields[field] = e.target.value;        
        this.setState({loginFields});

        let fields = this.state.loginFields;
        let errors = {};
        if(field === 'email' && fields["email"].trim() === ''){
            errors["email"] = "Please enter email";
        }
        else if(field === 'email' && typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                errors["email"] = "Please enter valid email";
            }
        }

        if(field === 'password' && fields["password"].trim() === ''){
            errors["password"] = "Please enter password";
        }

        this.setState({loginErrors: errors});

    }

    handleChangeForgotPassword(field, e){         
        let forgotFields = this.state.forgotFields;
        forgotFields[field] = e.target.value;        
        this.setState({forgotFields});   
        reactLocalStorage.set('forgot_email',e.target.value) 

        let fields = this.state.forgotFields;
        let errors = {};
        if(field === 'email' && fields["email"].trim() === ''){
            errors["email"] = "Please enter email.";
        }
        else if(field === 'email' && typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                errors["email"] = "Please enter valid email";
            }
        }
        this.setState({forgotErrors: errors});

    }

    handleChangeResetPassword(field, e){         
        let resetFields = this.state.resetFields;
        resetFields[field] = e.target.value;        
        this.setState({resetFields});

        let fields = this.state.resetFields;
        let errors = {};
        let formIsValid = true;
        

        if(field === 'otp' && fields["otp"].trim() === ''){
            errors["otp"] = "Please enter OTP";
        }
        else{
            let re = /^(\s*\d{6}\s*)(,\s*\d{6}\s*)*,?\s*$/;
            if(field === 'otp' && !re.test(fields["otp"])){
                errors["otp"] = "Please enter valid OTP";
            }
        }
        

        if(field === 'password' && fields["password"].trim() === ''){
            errors["password"] = "Please enter password";
        }
        else{
            let re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[0-9])(?=.*[A-Za-z\d@$!%*#?&])(?=.{8,})/;
            if(field === 'password' && !re.test(fields["password"])){
                errors["password"] = "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters";
            }
        }

        if(field === 'confirm_password' && fields["confirm_password"].trim() === ''){
            errors["confirm_password"] = "Please enter confirm password";
        }

        if(field === 'confirm_password' &&  fields["confirm_password"]){
            if(fields["password"]!==fields["confirm_password"]){
                errors["confirm_password"] = "Password and confirm password not matched";
            }
        }


        this.setState({resetErrors: errors});

    }

    handleResetPasswordSubmit(){
        let fields = this.state.resetFields;
        let errors = {};
        let formIsValid = true;
        

        if(fields["otp"].trim() === ''){
            formIsValid = false;
            errors["otp"] = "Please enter OTP";
        }
        else{
            let re = /^(\s*\d{6}\s*)(,\s*\d{6}\s*)*,?\s*$/;
            if(!re.test(fields["otp"])){
                errors["otp"] = "Please enter valid OTP";
            }
        }
        

        if(fields["password"].trim() === ''){
            formIsValid = false;
            errors["password"] = "Please enter password";
        }
        else{
            let re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[0-9])(?=.*[A-Za-z\d@$!%*#?&])(?=.{8,})/;
            if(!re.test(fields["password"])){
                formIsValid = false;
                errors["password"] = "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters";
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


        this.setState({resetErrors: errors});
        if(formIsValid){
            fields.roleId = '2';
            fields.email = reactLocalStorage.get('forgot_email')
            this.setState({resetFields:fields});
            fetch(configuration.baseURL+"user/resetPassword", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(this.state.resetFields)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.code === 200){
                    this.setState({openModelForgot:false,openModelReset:false,openModelCongratulation:true})
                    fields.otp = '';
                    fields.password = '';
                    fields.confirm_password = '';
                    this.setState({resetFields:fields});                    
                    this.handleCloseClick();
                }
                else if(data.code === 400){
                    return toast.error('Invalid OTP!');
                }
                else
                {
                    return toast.error(data.message);
                }
                
            });
        }
    }

    handleForgotPasswordSubmit(){
        let fields = this.state.forgotFields;
        let errors = {};
        let formIsValid = true;
        if(fields["email"].trim() === ''){
            formIsValid = false;
            errors["email"] = "Please enter email.";
        }
        else if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            	formIsValid = false;
            	errors["email"] = "Please enter valid email";
            }
        }
        this.setState({forgotErrors: errors});
        if(formIsValid){
            fields.roleId = '2';
            this.setState({forgotFields:fields});
            fetch(configuration.baseURL+"user/forgotPassword", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(this.state.forgotFields)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.code === 200){
                    this.setState({resetFields:{},resetErrors: {}});
                    this.setState({openModelForgot:!this.state.openModelForgot,openModelReset:!this.state.openModelReset})
                    fields.email = '';
                    this.setState({forgotFields:fields});
                }
                else
                {
                    return toast.error(data.message);
                }
                
            });
        }
    }


    handleLoginSubmit(){
        let fields = this.state.loginFields;
        let errors = {};
        let formIsValid = true;
        if(fields["email"].trim() === ''){
            formIsValid = false;
            errors["email"] = "Please enter email";
        }
        else if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            	formIsValid = false;
            	errors["email"] = "Please enter valid email";
            }
        }

        if(fields["password"].trim() === ''){
            formIsValid = false;
            errors["password"] = "Please enter password";
        }

        this.setState({loginErrors: errors});
        if(formIsValid){
            fields.roleId = '2';
            this.setState({loginFields:fields});
            fetch(configuration.baseURL+"user/userLogin", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(this.state.loginFields)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.code === 200){
                    this.setState({openModelLogin:!this.state.openModelLogin})
                    fields.password = '';
                    fields.email = '';
                    this.setState({loginFields:fields});
                    configuration.saveTokenData(data.data,function(payload){
                        window.location.href = '/#/contest'
                    });
                }
                else
                {
                    return toast.error(data.message);
                }
                
            });
        }
    }


    handleRegisterSubmit(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        if(fields["name"].trim() === ''){
            formIsValid = false;
            errors["name"] = "Please enter name";
        }
        if(fields["email"].trim() === ''){
            formIsValid = false;
            errors["email"] = "Please enter email";
        }
        else if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            	formIsValid = false;
            	errors["email"] = "Please enter valid email";
            }
        }

        if(fields["password"].trim() === ''){
            formIsValid = false;
            errors["password"] = "Please enter password";
        }
        else{
            let re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[0-9])(?=.*[A-Za-z\d@$!%*#?&])(?=.{8,})/;
            if(!re.test(fields["password"])){
                formIsValid = false;
                errors["password"] = "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters";
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



        // if(!this.state.checkbox){
        //     formIsValid = false;
        //     errors["checkbox"] = "Please agree terms & conditions.";
        // }

        this.setState({errors: errors});
        if(formIsValid){
            fields.roleId = '2';
            this.setState({fields});
            
            fetch(configuration.baseURL+"user/userSignup", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(this.state.fields)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.code === 409) {
                    return toast.error('Email already registered. Please try another one');
                }else if(data.code === 200){
                    this.setState({openModelRegister:!this.state.openModelRegister})
                    fields.name = '';
                    fields.password = '';
                    fields.email = '';
                    fields.confirm_password = '';
                    this.setState({fields});
                    this.handleCloseClick();
                    return toast.info('Your are register successfully');
                }
                
            });
        }
    }

    render() {
        return (
            <div>
                <ToastContainer position="top-right" autoClose={5000} style={{top:'80px'}}/>
                
                <header id="header" className="fixed-top">
                    <div className="container align-items-center">
                        <nav className="navbar navbar-expand-lg navbar-dark">
                            <h1 className="logo mr-auto">
                                <a href="javascript:void(0);">
                                    <img src="./murabbo/img/logo.svg" alt="logo"/>
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
                                <form className="form-inline my-2 my-lg-0">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <button onClick={this.handleClick.bind(this,'openModelLogin',true) } className="nav-link pink_btn" type="button" ><img src="./murabbo/img/login.svg" alt="Login" /> Login</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link blue_btn" type="button" onClick={this.handleClick.bind(this,'openModelRegister',true) }> <img src="./murabbo/img/create.svg" alt="Login" /> Register</button>
                                        </li>
                                        {/* <li className="nav-item">
                                            <a data-toggle="modal" data-target="#setpin" className="nav-link" href="javascript:void(0);">
                                                <button className="yellow_btn" type="button"><img src="./murabbo/img/pin.svg" alt="Pin"/> Set Pin</button>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link " href="#/contest">
                                                <button className="blue_btn" type="button"><img src="./murabbo/img/create.svg" alt="Create"/> Create</button>
                                            </a>
                                        </li> */}
                                    </ul>
                                </form>
                            </div>
                        </nav>
                    </div>
                </header>
                <div className={(this.state.openModelRegister) ? 'stopScorll' : ''}>
                    <CModal show={this.state.openModelRegister}  closeOnBackdrop={false} onClose={this.handleCloseClick.bind(this) }
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">
                            <button onClick={this.handleCloseClick.bind(this) } style={{position: 'absolute',right: '0',padding: '0 20px',cursor: 'pointer',zIndex: '999'}} type="button" className="close">
                            <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                            <div className="modal-body">
                                <div className="model_data">
                                    <div className="model-title">
                                        <h3>Welcome to Murrabbo!</h3>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg" />
                                    <img className="shape3" src="./murabbo/img/shape3.svg" />
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/username.svg" /> 
                                                <input required type="text"  onChange={this.handleChangeRegister.bind(this, "name")} value={this.state.fields["name"]}/>
                                                <label>Name</label>
                                            </div> 
                                            <span className="error-msg">{this.state.errors["name"]}</span>
                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/email.svg" /> <input required type="text"  onChange={this.handleChangeRegister.bind(this, "email")} value={this.state.fields["email"]}/>
                                                <label>Email</label>
                                            </div>
                                            <span className="error-msg">{this.state.errors["email"]}</span>
                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/password.svg" /> <input required type="password"  onChange={this.handleChangeRegister.bind(this, "password")} value={this.state.fields["password"]}/>
                                                <label>Password</label>
                                            </div> 
                                            <span className="error-msg">{this.state.errors["password"]}</span>
                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/password.svg" /> <input required type="password"  onChange={this.handleChangeRegister.bind(this, "confirm_password")} value={this.state.fields["confirm_password"]}/>
                                                <label>Confirm Password</label>
                                            </div> 
                                            <span className="error-msg">{this.state.errors["confirm_password"]}</span>
                                            {/*<p className="check_">
                                                <input required type="checkbox" id="test1" onClick={()=> this.setState({checkbox:!this.state.checkbox})} checked={this.state.checkbox}/>
                                                <label for="test1">By Signup you are agree to our <a style={{ color: '#fff',textDecoration: 'underline' }} href="#">Terms & Policy</a></label>
                                            </p>
                                            <span className="error-msg">{this.state.errors["checkbox"]}</span>*/}
                                            <div className="full_btn">
                                                <button className="yellow_btn" type="button"  onClick={this.handleRegisterSubmit.bind(this)}>Signup</button>
                                            </div>
                                
                                            <div className="social-login">
                                                <a href="#"><img src="./murabbo/img/facebook.svg" /></a>
                                                <a href="#"><img src="./murabbo/img/google.svg"/></a>
                                            </div>

                                            <div className="full_btn mt50">
                                                <button className="blue_btn" type="button" onClick={this.handleClick.bind(this,'openModelLogin',true,'openModelRegister',false) } >Go To Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CModalBody>
                    </CModal>
                </div>

                <div className={(this.state.openModelLogin) ? 'stopScorll' : ''}>
                    <CModal show={this.state.openModelLogin}  aria-hidden="true" closeOnBackdrop={false} onClose={this.handleCloseClick.bind(this) }
                    color="danger"  
                    centered >
                        <CModalBody className="model-bg">

                        <div>
                                
                            <div className="modal-body">
                                <button type="button" className="close"  onClick={this.handleCloseClick.bind(this) }>
                                    <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                                </button>
                                <div className="model_data">
                                    <div className="model-title">
                                        <h3>Login</h3>
                                    </div>
                                    <img className="shape1" src="./murabbo/img/shape.svg"/>
                                    <img className="shape1_" src="./murabbo/img/shape.svg"/>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/email.svg" /> 
                                                <input required type="text" onChange={this.handleChangeLogin.bind(this, "email")} value={this.state.loginFields["email"]}/>
                                                <label>Email</label>
                                            </div>  
                                                <span className="error-msg">{this.state.loginErrors["email"]}</span>
                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/password.svg" /> <input required type="password"  onChange={this.handleChangeLogin.bind(this, "password")} value={this.state.loginFields["password"]}/>
                                                <label>Password</label>
                                            </div> 
                                            <span className="error-msg">{this.state.loginErrors["password"]}</span>
                                            <div className="full_btn">
                                                <button className="yellow_btn" type="button" onClick={this.handleLoginSubmit.bind(this)}>Login</button>
                                            </div>
                                            <div className="forgot">
                                                <span style={{ cursor:'pointer'}} onClick={this.handleClick.bind(this,'openModelForgot',true,'openModelLogin',false) } >Forgot password?</span>
                                            </div>
                                            <div className="social-login">
                                                <a href="#"><img src="./murabbo/img/facebook.svg"/></a>
                                                <a href="#"><img src="./murabbo/img/google.svg"/></a>
                                            </div>

                                            <div className="full_btn mt50">
                                                <button onClick={this.handleClick.bind(this,'openModelLogin',false,'openModelRegister',true) } className="blue_btn" type="button">Create Account</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>
                </div>
                      
                <div className={(this.state.openModelForgot) ? 'stopScorll' : ''}>
                    <CModal show={this.state.openModelForgot}  closeOnBackdrop={false} onClose={this.handleCloseClick.bind(this) }
                    color="danger" 
                    centered >
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"  onClick={this.handleCloseClick.bind(this) }>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                    <h3>Reset Password!</h3>
                                    <p>Please enter your registered mail and we will send OTP for same.</p>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/email.svg" /> 
                                                <input required type="text"  onChange={this.handleChangeForgotPassword.bind(this, "email")} value={this.state.forgotFields["email"]}/>
                                                <label>Email</label>
                                                
                                            </div>  <span className="error-msg">{this.state.forgotErrors["email"]}</span>

                                            <div className="full_btn">
                                                <button className="yellow_btn" type="button" onClick={this.handleForgotPasswordSubmit.bind(this)}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>
                </div>
                
                <div className={(this.state.openModelReset) ? 'stopScorll' : ''}>
                    <CModal show={this.state.openModelReset}  closeOnBackdrop={false} onClose={this.handleCloseClick.bind(this) }
                    color="danger" 
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"  onClick={this.handleCloseClick.bind(this) }>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                    <h3>Enter OTP!</h3>
                                    <p>Please enter your OTP sent to mail {reactLocalStorage.get('forgot_email')}</p>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/otp.svg" /> 
                                                <input required type="text"  onChange={this.handleChangeResetPassword.bind(this, "otp")} value={this.state.resetFields["otp"]}/>
                                                <label>Enter OTP</label>
                                            </div> 
                                                <span className="error-msg">{this.state.resetErrors["otp"]}</span>

                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/password.svg" /> <input required type="password"  onChange={this.handleChangeResetPassword.bind(this, "password")} value={this.state.resetFields["password"]}/>
                                                <label>Password</label>
                                            </div> 
                                            <span className="error-msg">{this.state.resetErrors["password"]}</span>
                                            <div className="cus_input input_wrap">
                                                <img src="./murabbo/img/password.svg" /> <input required type="password"  onChange={this.handleChangeResetPassword.bind(this, "confirm_password")} value={this.state.resetFields["confirm_password"]}/>
                                                <label>Confirm Password</label>
                                            </div>  
                                            <span className="error-msg">{this.state.resetErrors["confirm_password"]}</span>

                                            <div className="full_btn">
                                                <button className="yellow_btn" type="button" onClick={this.handleResetPasswordSubmit.bind(this)}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>
                </div>

                <div className={(this.state.openModelCongratulation) ? 'stopScorll' : ''}>
                    <CModal show={this.state.openModelCongratulation}  closeOnBackdrop={false} onClose={this.handleCloseClick.bind(this) }
                    color="danger" 
                    centered>
                        <CModalBody className="model-bg">

                        <div>
                            <div className="modal-body">
                                <button type="button" className="close"  onClick={this.handleCloseClick.bind(this) }>
                                <span aria-hidden="true"><img src="./murabbo/img/close.svg" /></span>
                            </button>
                                <div className="model_data">
                                    <div className="model-title">
                                    <h3>Congratulations!</h3>
                                    <p>Your password has been changed successfully.</p>
                                    </div>
                                    <img className="shape2" src="./murabbo/img/shape2.svg"/>
                                    <img className="shape3" src="./murabbo/img/shape3.svg"/>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <div className="full_btn">
                                                <button className="yellow_btn" type="button" onClick={()=> this.setState({openModelCongratulation:false})}>Done</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </CModalBody>
                    </CModal>
                </div>
            
            </div>
        )
    }
}

export default TheHeader
