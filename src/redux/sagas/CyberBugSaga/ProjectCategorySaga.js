import { call, delay,  takeLatest, put, select } from 'redux-saga/effects'
import { cyberbugService } from '../../../services/CyberBug/CyberBugService'



function * getProjectCategory (action){
    try
    {
        const {data} = yield call(()=>{ return cyberbugService.getAllProjectCategory()})
     
    
        yield put({
            type: "GET_ALL_PROJECTCATEGORY",
            data: data.content
        })
     

    }catch(err){
        console.log(err.response)
    }
}

export function* theoDoiAllProjectCategory (){
    yield takeLatest("GET_ALL_PROJECTCATEGORY_SAGA",getProjectCategory)
}