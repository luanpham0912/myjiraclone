import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/CyberBugConst";

let usLogin = {};
if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}


let usersCyberBug = {
    userLogin : usLogin,
    userSearch : [],
    arrUser :[]
}

export const UsersCyberBugReducer = (state = usersCyberBug,action) => {
    switch(action.type){
        case USLOGIN : {
            state.userLogin = action.userLogin
            return {...state}
        }
        case "GET_USER_SEARCH" : {
            state.userSearch = action.userSearchList
            return {...state}
        }
        case "GET_USER_BYPROJECT" : {
            state.arrUser = action.arrUser
            return {...state}
        }
        default : return {...state}
    }
}