import { takeLatest, put, call, delay ,select} from 'redux-saga/effects'
import { statusService } from '../../../services/CyberBug/StatusService'

function* getStatusSaga (action){
    const {data,status} = yield call(() => statusService.getAllStatus())
    yield put({
        type : "GET_ALL_STATUS",
        status : data.content
    })
}

export function* theoDoiGetStatusSaga(){
    yield takeLatest("GET_ALL_STATUS_SAGA",getStatusSaga)
}