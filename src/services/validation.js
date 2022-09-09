import { EmailBlankMsg, EmailErrMsg, PassBlankMsg, NameBlankMsg, NameErrMsg, ConfirmPassMsg, ConfirmPassMatchMsg, PasswordLengthMsg,LNameBlankMsg,LNameErrMsg } from '../assets/default_text';

export function validateEmail(data) { // validation for email
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data) return { status: false, message: EmailBlankMsg }
    else if (!emailRegex.test(data)) return { status: false, message: EmailErrMsg }
    else return { status: true, message: '' }
}

export function validatePassword(data) { // validation for password
    if (!data) return { status: false, message:  PassBlankMsg}
    else if(data.length < 6) return {status: false, message: PasswordLengthMsg}
    else return { status: true, message: '' }
}

export function validatName(data) { // validation for name.
    let nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    
    if (!data) return { status: false, message:  NameBlankMsg}
    else if(data.length < 3) return {status: false, message: NameErrMsg}

    else if(!nameRegex.test(data)) return {status: false, message: NameErrMsg}
    else return { status: true, message: '' }
}
export function validatlastName(data) { // validation for name.
    let nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    if (!data) return { status: false, message:  LNameBlankMsg}
    else if(data.length < 3) return {status: false, message: LNameErrMsg}
    else if(!nameRegex.test(data)) return {status: false, message: LNameErrMsg}
    else return { status: true, message: '' }
}

export function validatConfirmPass(pass, confirmPass) { // validation for confirm password.
    if (!confirmPass) return { status: false, message:  ConfirmPassMsg}
    else if(pass !== confirmPass) return {status: false, message: ConfirmPassMatchMsg}
    else return { status: true, message: '' }
}