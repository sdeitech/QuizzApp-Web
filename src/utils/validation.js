import { consoleLog } from "../components/helper";
import appConstants from "./appConstants";

/* To handle first name validation*/
export const validateName = (name) => {
    var nameRegex = /^[a-zA-Z ]+$/;
    var name = name.trim();
    if (name == "" || name == undefined || name == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_NAME'] };
    }
    else if (!nameRegex.test(name)) {
        return { status: false, error: appConstants['PLEASE_ENTER_VALID_NAME'] };
    }
    else if (name.length < 2) {
        return { status: false, error: appConstants['NAME_MUST_CONTAIN_ATLEAST_TWO_CHARACTER'] }
    }
    else {
        return { status: true, error: '' };
    }
}

export const validateAddress = (address) => {
    var address = address.trim();
    if (address == "" || address == undefined || address == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_ADDRESS'] };
    }
    else if (address.length < 3) {
        return { status: false, error: appConstants['ADDRESS_MUST_CONTAIN_ATLEAST_THREE_CHARACTER'] }
    }
    else {
        return { status: true, error: '' };
    }
}

export const validatePosition = (position) => {
    var nameRegex = /^[a-zA-Z ]+$/;
    var position = position.trim();
    if (position == "" || position == undefined || position == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_POSITION'] };
    }
    else if (!nameRegex.test(position)) {
        return { status: false, error: appConstants['PLEASE_ENTER_VALID_POSITION_NAME'] };
    }
    else if (position.length < 2) {
        return { status: false, error: appConstants['POSITION_NAME_MUST_CONTAIN_ATLEAST_TWO_CHARACTER'] }
    }
    else {
        return { status: true, error: '' };
    }
}

export const validateEmployerName = (employer) => {
    var nameRegex = /^[a-zA-Z ]+$/;
    var employer = employer.trim();
    if (employer == "" || employer == undefined || employer == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_EMPLOYER_NAME'] };
    }
    else if (!nameRegex.test(employer)) {
        return { status: false, error: appConstants['PLEASE_ENTER_VALID_EMPLOYER_NAME'] };
    }
    else if (employer.length < 2) {
        return { status: false, error: appConstants['EMPLOYER_NAME_MUST_CONTAIN_ATLEAST_TWO_CHARACTER'] }
    }
    else {
        return { status: true, error: '' };
    }
}

export const validateCompanyName = name => {
    var nameRegex = /^[a-zA-Z ]+$/;
    var name = name.trim();
    if (name == "" || name == undefined || name == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_COMPANY_NAME'] };
    }
    else if (!nameRegex.test(name)) {
        return { status: false, error: appConstants['PLEASE_ENTER_VALID_COMPANY_NAME'] };
    }
    else if (name.length < 2) {
        return { status: false, error: appConstants['COMPANY_NAME_MUST_CONTAIN_ATLEAST_TWO_CHARACTER'] }
    }
    else {
        return { status: true, error: '' };
    }
}

/* To handle email validation */
export const validateEmail = email => {
    var emailRegex = /^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i;
    email = email.trim();
    if (email == "" || email == undefined || email == null) {
        return { status: false, error: appConstants['PLEASE_ENTER_EMAIL'] };
    }
    else if (!emailRegex.test(email)) {
        return { status: false, error: appConstants['PLEASE_ENTER_VALID_EMAIL'] };
    }
    else {
        return { status: true, error: '' };
    }
}


/* To validate password 
RegEx	Description
^	The password string will start this way
(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
(?=.*[0-9])	The string must contain at least 1 numeric character
(?=.[!@#$%^&])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
(?=.{8,})	The string must be eight characters or longer
*/

export const validatePassword = (password) => {

    // var passwordRegex = /^ (?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
    const strongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");

    password = password.trim();
    console.log('password::',strongRegex.test(password));
    if (password == "" || password == undefined || password == null) {
        return { status: false, error: appConstants['PASSWORD_REQUIRED'] }
    }
    else if (password.length < 6 || strongRegex.test(password) == false) {
        return { status: false, error: "Password must contain must be six characters atleast 1 lowercase, 1 uppercase, 1 numeric, 1 special character."}
    }
    else {
        return { status: true, error: '' }
    }
}


/* To validate Mobile No. */

export const validateMobileNo = (mobileNo) => {
    var numberRegex = /^[1-9][0-9]{8,12}$/;
    mobileNo = mobileNo.trim()
    if (mobileNo == "" || mobileNo == undefined || mobileNo == null) {
        return { status: false, error: appConstants['EMPTY_PHONE_FIELD_MESSAGE'] }
    } else if (!numberRegex.test(mobileNo)) {
        return { status: false, error: appConstants['VALID_PHONE_MESSAGE'] }
    } else {
        return { status: true, error: '' }
    }
}

export const validateWeight = (weight) => {
    var numberRegex = /^((?!(0))[0-9]{2,3})$/g;
    weight = weight.trim();
    if (weight == "" || weight == undefined || weight == null) {
        return { status: false, error: "Please enter weight." }
    } else if (!numberRegex.test(weight)) {
        return { status: false, error: "Please enter valid weight." }
    } else {
        return { status: true, error: '' }
    }
}

export const validateGoals = (goals) => {
    var numberRegex = /^((?!(0))[0-9]{2,3})$/g;
    goals = goals.trim();
    if (goals == "" || goals == undefined || goals == null) {
        return { status: false, error: "Please enter your daily goal limit" }
    } else if (!numberRegex.test(goals)) {
        return { status: false, error: "Please enter valid goal limit" }
    } else {
        return { status: true, error: '' }
    }
}
/* To handle email mobile validation */
export const validateEmailMobile = (email) => {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var numberRegex = /^[1-9][0-9]{9,12}$/;
    console.log('Email==>>', emailRegex.test(email))
    console.log('MObile==>>', numberRegex.test(email))
    email = email.trim();
    if (email == "" || email == undefined || email == null) {
        return { status: false, error: "Please enter Email ID." };
    }
    else if (emailRegex.test(email) || numberRegex.test(email)) {
        //    return { status: false, error: "Please enter valid Email Address." };
        return { status: true, error: '' };
    }
    else {
        //    return { status: true, error: '' };
        return { status: false, error: "Please enter valid Email Address." };
    }
}
/* To Handle email mobile validation on Login */

export const requireEmail = userId => {
    let userEmail = userId.toString().trim()
    if (userEmail == '' || userEmail == undefined || userEmail == null) {
        return { status: false, error: appConstants['EMAIL_REQUIRED'] };
    }
    else return { status: true, error: '' }
}

/* To Handle Password validation on Login */

export const requirePassword = password => {
    let userPassword = password.toString().trim()
    if (userPassword == "" || userPassword == undefined || userPassword == null) {
        return { status: false, error: appConstants['PASSWORD_REQUIRED'] }
    }
    else return { status: true, error: '' }

}
export const  validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

/*
    Check If value is empty or not...
*/
export const isEmpty = (isFieldEmpty) => {
    if (isFieldEmpty.trim() == "") {
        return true;
    }
    else {
        return false;
    }
}

/*
    Check If value is number or not...
*/
export const isNumber = (fieldValue) => {
    if (/\D/.test(fieldValue)) {
        return true;
    }
    return false;
}