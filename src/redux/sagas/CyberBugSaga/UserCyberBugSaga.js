
import { call, delay,  takeLatest, put, select } from 'redux-saga/effects'
import { cyberbugService } from '../../../services/CyberBug/CyberBugService';
import { userService } from '../../../services/CyberBug/UserService';
import { history, STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { notifyFunction } from '../../../util/Notification/Notification';
import { SIGNIN_API, SIGNUP_API, USLOGIN } from '../../constants/CyberBugConst';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst'

function * SignInSaga(action) {
    yield put({
        type : DISPLAY_LOADING
    })
    yield delay(500);
    try
    {
        const {data} = yield call(()=>{ return cyberbugService.signinCyberBug(action.userLogin)})
        localStorage.setItem(TOKEN,data.content.accessToken)
        localStorage.setItem(USER_LOGIN,JSON.stringify(data.content))

       
        yield put({
            type: USLOGIN,
            userLogin : data.content
        })
        history.push("/projectmanager")

    }catch(err){
        if(err.response?.status == 400){
            // alert('tài khoản hoặc mật khẩu không đúng')
            notifyFunction('error','Tài khoản hoặc mật khẩu không !')
        }
        console.log(err.response.status)
    }
    yield put({
        type : HIDE_LOADING
    })
}

export function * theoDoiSingin(){
    yield takeLatest(SIGNIN_API,SignInSaga)
}


function * SignUpSaga(action) {
    yield put({
        type : DISPLAY_LOADING
    })
    yield delay(500);
    try
    {
        const {data} = yield call(()=>{ return cyberbugService.signupCyberBug(action.userRegister)})
      
       

        history.push("/login")

    }catch(err){
        console.log(err.response)
        if(err.response?.status !== 200){
            notifyFunction("error","Email đã tồn tại!")
        }
    }
    yield put({
        type : HIDE_LOADING
    })
}

export function * theoDoiSignUpSaga(){
    yield takeLatest(SIGNUP_API,SignUpSaga)
}








function * getUserSaga(action) {

    try
    {
        const {data} = yield call(()=>{ return userService.getUser(action.keyWord)})
        yield put({
            type: "GET_USER_SEARCH",
            userSearchList : data.content
        })


    }catch(err){
        console.log(err.response)
    }

}

export function * theoDoiGetUsers(){
    yield takeLatest("GET_USERS_SAGA",getUserSaga)
}

function * assignUserProjectSaga(action) {

    try
    {
        const {data} = yield call(()=>{ return userService.assignUserProject(action.userProject)})
        yield put({
            type: "GETLIST_PROJECT_SAGA",
        })


    }catch(err){
        console.log(err.response)
    }

}

export function * theoDoiAssginUsersProject(){
    yield takeLatest("ASSIGN_USERS_PROJECT_SAGA",assignUserProjectSaga)
}

function * removeUserFromProjectSaga(action) {

    try
    {
        const {data} = yield call(()=>{ return userService.removeUserFromProject(action.userProject)})
        yield put({
            type: "GETLIST_PROJECT_SAGA",
        })


    }catch(err){
        console.log(err.response)
    }

}

export function * theoDoiRemoveUsersFromProject(){
    yield takeLatest("REMOVE_USERS_FROM_PROJECT_SAGA",removeUserFromProjectSaga)
}


function * getAllUserSaga(action) {

    try
    {
        const {data} = yield call(()=>{ return userService.getAllUser(action.keyword)})
      
        yield put({
            type: "GET_USER",
            arrUser : data.content
        })


    }catch(err){
        console.log(err.response)
    }

}

export function * theoDoiGetAllUsers(){
    yield takeLatest("GET_ALL_USERS_SAGA",getAllUserSaga)
}

function * getUserByProjectSaga(action) {
    
    try
    {
        const {data,status} = yield call(()=>{ return userService.getUserByProject(action.projectId)})
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: "GET_USER_BYPROJECT",
                arrUser : data.content
            })
           
        }
       


    }catch(err){
        console.log(err.response)
        if(err.response?.data.statusCode === STATUS_CODE.NOT_FOUND){         
                yield put({
                    type: "GET_USER_BYPROJECT",
                    arrUser : []
                })  
        }
    }

}

export function * theoDoiGetUserByProjectSaga(){
    yield takeLatest("GET_USERS_BYPROJECT_SAGA",getUserByProjectSaga)
}

function * editUserSaga(action) {
    
    try
    {
        const {data,status} = yield call(()=>{ return userService.editUser(action.user)})
      
        if(status === STATUS_CODE.SUCCESS){
            notifyFunction("success","Edit Completed!")
           history.push('/usermanager')
        }
       
    }catch(err){
        console.log(err.response)
    }

}

export function * theoDoiEditUserSaga(){
    yield takeLatest("EDIT_USER_SAGA",editUserSaga)
}

function * deleteUserSaga(action) {
    
    try
    {
        const {data,status} = yield call(()=>{ return userService.deleteUser(action.id)})
      
        if(status === STATUS_CODE.SUCCESS){
          
            yield put({
                type: "GET_ALL_USERS_SAGA",
                keyword : ''
            })
        }
        notifyFunction("success","Delete Completed!")
    }catch(err){
        console.log(err.response)
    }

}

export function * theoDoiDeleteUserSaga(){
    yield takeLatest("DELETE_USER_SAGA",deleteUserSaga)
}