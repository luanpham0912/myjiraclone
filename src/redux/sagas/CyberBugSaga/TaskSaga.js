import { takeLatest, put, call, delay ,select} from 'redux-saga/effects'
import { taskService } from '../../../services/CyberBug/TaskService'
import { notifyFunction } from '../../../util/Notification/Notification'
function * getTaskDetailSaga(action) {
   try{
    const {data,status} = yield call(()=> taskService.getTaskDetail(action.taskId))
 
    yield put({
        type : 'GET_TASK_DETAIL',
        taskDetailModal : data.content
    })
   }catch(err){
    console.log(err)
   }
}
export function * theoDoiGetTaskDetailSaga(){
    yield takeLatest('GET_TASK_DETAIL_SAGA',getTaskDetailSaga)
}

function * updateTaskSaga(action) {
  
    switch(action.typeSaga) {
        case "CHANGE_TASK_MODAL" : {
            const {value,name} = action
            yield put({
                type : "CHANGE_TASK_MODAL" ,
                value,
                name
            })
        }break
        case "CHANGE_ASSIGNESS" : {
            yield put({
                type : "CHANGE_ASSIGNESS" ,
                userSelected : action.userSelected
            });
        }break
        case "REMOVE_USER_ASSIGNESS" : {
            yield put({
                type : "REMOVE_USER_ASSIGNESS" ,
                userId : action.userId
            })
        }break
        default : return
    }

    let { taskDetailModal } = yield select(state => state.TaskReducer)

    let listUserAsign = taskDetailModal.assigness?.map((mem,index) => {
        return mem.id
    })
    console.log('taskDetailModalSAGA',taskDetailModal)
    console.log('listUserAssign',listUserAsign)

    const taskUpdate = {...taskDetailModal,listUserAsign}

    try{
     const {data,status} = yield call(()=> taskService.updateTask(taskUpdate))
     yield put({
         type : 'GET_TASK_DETAIL_SAGA',
         taskId : taskUpdate.taskId
     })
    yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId :  taskUpdate.projectId
    })
    }catch(err){
     console.log(err.response)
    }
 }
 export function * theoDoiUpdateTaskSaga(){
     yield takeLatest('UPDATE_TASK_SAGA_API',updateTaskSaga)
 }


 function * createTaskSaga(action) {
    try{
     const {data,status} = yield call(()=> taskService.createTask(action.newTask))

     
     yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId : action.newTask.projectId
    })
    
    }catch(err){
     console.log(err)
    }
    yield put({
        type: "CLOSE_DRAWER",
    })
 }
 export function * theoDoiCreateTaskSaga(){
     yield takeLatest('CREATE_TASK_SAGA',createTaskSaga)
 }


 function * removeTaskSaga(action) {
    try{
     const {data,status} = yield call(()=> taskService.removeTask(action.taskDetailModal.taskId))


     yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId : action.taskDetailModal.projectId
    })
    notifyFunction("success","Remove Task successfully!")
    }catch(err){
     console.log(err)
    }
    yield put({
        type: "CLOSE_DRAWER",
    })
 }
 export function * theoDoiRemoveTaskSaga(){
     yield takeLatest('REMOVE_TASK_SAGA',removeTaskSaga)
 }