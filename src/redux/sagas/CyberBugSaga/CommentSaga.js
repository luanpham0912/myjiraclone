import { takeLatest, put, call, delay ,select} from 'redux-saga/effects'
import {commentService} from '../../../services/CyberBug/CommentService'
function * insertCommentSaga(action){
    try{
        const {data, status} = yield call(()=> commentService.insertComment(action.newComment))
    
        // yield put({
        //     type : 'GET_TASK_DETAIL_SAGA',
        //     taskId : data.content.taskId
        // })
        yield put({
            type: "GET_ALL_COMMENT_SAGA",
            taskId : data.content.taskId
        })

    }catch (err){

    }
}
export function * theoDoiInsertCommentSaga(){
    yield takeLatest('INSERT_COMMENT_SAGA',insertCommentSaga)
}


function * removeCommentSaga(action){
    try{
        const {data, status} = yield call(()=> commentService.removeComment(action.idComment))
        let { taskDetailModal } = yield select(state => state.TaskReducer)
        // yield put({
        //     type : 'GET_TASK_DETAIL_SAGA',
        //     taskId : taskDetailModal.taskId
        // })
        yield put({
            type: "GET_ALL_COMMENT_SAGA",
            taskId :  taskDetailModal.taskId
        })


    }catch (err){

    }
}

export function * theoDoiRemoveCommentSaga(){
    yield takeLatest('REMOVE_COMMENT_SAGA',removeCommentSaga)
}



function * getAllCommentSaga(action){
    try{
        const {data, status} = yield call(()=> commentService.getAllComment(action.taskId))
   
        yield put({
            type : 'GET_ALL_COMMENT',
            arrComt : data.content
        })

    }catch (err){

    }
}

export function * theoDoiGetAllCommentSaga(){
    yield takeLatest('GET_ALL_COMMENT_SAGA',getAllCommentSaga)
}

function * editCommentSaga(action){
    try{
        const {data, status} = yield call(()=> commentService.editComment(action.id,action.newComt))
        console.log("EDIT",data.content)
        yield put({
            type: "GET_ALL_COMMENT_SAGA",
            taskId :  data.content.taskId
        })

    }catch (err){

    }
}

export function * theoDoiEditCommentSaga(){
    yield takeLatest('EDIT_COMMENT_SAGA',editCommentSaga)
}