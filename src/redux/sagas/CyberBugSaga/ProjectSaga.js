import { takeLatest, put, call, delay ,select} from 'redux-saga/effects'
import { cyberbugService } from '../../../services/CyberBug/CyberBugService'
import { projectService } from '../../../services/CyberBug/ProjectService'
import { history, STATUS_CODE } from '../../../util/constants/settingSystem'
import { notifyFunction } from '../../../util/Notification/Notification'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst'


function* createProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        let { data, status } = yield call(() => cyberbugService.createProjectAuthorization(action.newProject))
 
        

        if (status === STATUS_CODE.SUCCESS) {
            history.push("/projectmanager")
        }
    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoicreateProject() {
    yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga)
}

function* getListProjectSaga(action){


    try{
        let {data,status} = yield call(() => { return cyberbugService.getAllProjecAuthorization()})

        yield put({
            type: "ALL_PROJECTLIST",
            data : data.content
        })
        yield put({
            type: "GET_USERS_BYPROJECT_SAGA",
            projectId : data.content[0].id
        })
    }catch(err) {
        console.log(err)
    }

}

export function* theoDoigetListProject() {
    yield takeLatest("GETLIST_PROJECT_SAGA", getListProjectSaga)
}

function* updateProjectSaga(action){

    try{
        let {data,status} = yield call(()=>{ return cyberbugService.updateProject(action.projectUpdate)})
        if(status === STATUS_CODE.SUCCESS){
            console.log(data)
        }


    }catch(err) {
        
    }
    yield put({
        type: "GETLIST_PROJECT_SAGA",
    })

    yield put({
        type: "CLOSE_DRAWER",
    })
}

export function* theoDoiUpdateProject() {
    yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga)
}

function* deleteProjectSaga(action){

    try{
        let {data,status} = yield call(()=>{ return projectService.deleteProject(action.projectUpdate)})
        if(status === STATUS_CODE.SUCCESS){
     
            notifyFunction('success','Delete project successfully !')
        }
        else{
            notifyFunction('error','Delete project fail !')
        }

        yield put({
            type: "GETLIST_PROJECT_SAGA",
        })
    
    }catch(err) {
        notifyFunction('error','Delete project fail !')
        
    }


}

export function* theoDoiDeleteProject() {
    yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga)
}

function* getProjectDetailSaga(action){
    

    try{
        let {data,status} = yield call(()=>{ return projectService.getProjectDetail(action.projectId)})
        if(status === STATUS_CODE.SUCCESS){
       
            yield put({
                type: "PUT_PROJECT_DETAIL",
                projectDetail : data.content
            })
        }

   
    
    }catch(err) {
        console.log(err.response)
        history.push('/projectmanager')
    }


}

export function* theoDoiGetProjectDetail() {
    yield takeLatest("GET_PROJECT_DETAIL_SAGA", getProjectDetailSaga)
}