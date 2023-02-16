import { takeLatest, put, call, delay ,select} from 'redux-saga/effects'
import { priorityService } from '../../../services/CyberBug/PriorityService'
import { statusService } from '../../../services/CyberBug/StatusService'

function * getAllPrioritySaga (action){
    const {data,status} = yield call(()=> priorityService.getAllPriority())
    yield put({
        type: 'GET_ALL_PRIORITY',
        arrPriority : data.content
    })
}
export function * theoDoiGetAllPrioritySaga(){
    yield takeLatest('GET_ALL_PRIORITY_SAGA',getAllPrioritySaga)
}