import { takeLatest, put, call, delay ,select} from 'redux-saga/effects'
import { typeService } from '../../../services/CyberBug/TypeService'



function * getTaskTypeSaga (action) {
    try{
        const {data} = yield call(()=> typeService.getAllType())
        yield put({
            type :"GET_ALL_TASKTYPE",
            arrType : data.content
        })
    }catch(err) {
        console.log(err)
    }
}

export function * theoDoiGetTaskTypeSaga(){
    yield takeLatest("GET_ALL_TASKTYPE_SAGA",getTaskTypeSaga)
}