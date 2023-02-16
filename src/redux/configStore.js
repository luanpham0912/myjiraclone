import {applyMiddleware, combineReducers, createStore} from 'redux';
import ToDoListReducer from './reducers/ToDoListReducer'
import LoadingReducer from './reducers/LoadingReducer';
import ModalReducer from './reducers/ModalReducer';

import { HistoryReducer } from './reducers/HistorReducer';
import { UsersCyberBugReducer } from './reducers/UsersCyberBugReducer';
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer';
import ProjectCyberBugReducer from './reducers/ProjectCyberBugReducer';
import ProjectReducer from './reducers/ProjectReducer';
//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { DrawerCyberbug } from './reducers/DrawerCyberbug';
import { TaskReducer } from './reducers/TaskReducer';
import { StatusReducer } from './reducers/StatusReducer';
import {PriorityReducer} from './reducers/PriorityReducer'
import { TypeReducer } from './reducers/TypeReducer';
import { CommentReducer } from './reducers/CommentReducer';

const middleWareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    //reducer khai báo tại đây
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UsersCyberBugReducer,
    ProjectCategoryReducer,
    ProjectCyberBugReducer,
    DrawerCyberbug,
    ProjectReducer,
    TaskReducer,
    StatusReducer,
    PriorityReducer,
    TypeReducer,
    CommentReducer,

})

const store = createStore(rootReducer,applyMiddleware(middleWareSaga));

//Gọi saga
middleWareSaga.run(rootSaga);


export default store;

