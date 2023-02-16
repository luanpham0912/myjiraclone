import { SIGNIN_API, SIGNUP_API } from "../constants/CyberBugConst"

export const signinCyberBugAction = (email, password) =>{
  return{  
    type : SIGNIN_API,
    userLogin : {
        email : email,
        password : password
    }}
}

export const signUpCyberBugAction = (email, password,name,phone) =>{
  return{  
    type : SIGNUP_API,
    userLogin : {
        email : email,
        password : password,
        name : name,
        phone : phone
    }}
}