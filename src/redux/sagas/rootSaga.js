import { all } from "redux-saga/effects";
import * as UserCyberBugSaga from './CyberBugSaga/UserCyberBugSaga'
import * as ProjectCategory from './CyberBugSaga/ProjectCategorySaga'
import * as ProjectSaga from './CyberBugSaga/ProjectSaga'
import * as StatusSaga from './CyberBugSaga/StatusSaga'
import * as PrioritySaga from './CyberBugSaga/PrioritySaga'
import * as TaskSaga from './CyberBugSaga/TaskSaga'
import * as TaskTypeSaga from './CyberBugSaga/TaskTypeSaga'
import * as CommentSaga from './CyberBugSaga/CommentSaga'


// import {theoDoiActionGetTaskApi} from './ToDoListSaga'


export function* rootSaga() {

  yield all([
    //Nghiệp vụ theo dõi các action saga todolist

    //Nghiệp vụ theo dõi các action saga cyberbugs
    UserCyberBugSaga.theoDoiSingin(),
    UserCyberBugSaga.theoDoiSignUpSaga(),
    ProjectCategory.theoDoiAllProjectCategory(),
    ProjectSaga.theoDoicreateProject(),
    ProjectSaga.theoDoigetListProject(),
    ProjectSaga.theoDoiUpdateProject(),
    ProjectSaga.theoDoiDeleteProject(),
    ProjectSaga.theoDoiGetProjectDetail(),
    UserCyberBugSaga.theoDoiGetUsers(),
    UserCyberBugSaga.theoDoiAssginUsersProject(),
    UserCyberBugSaga.theoDoiRemoveUsersFromProject(),
    UserCyberBugSaga.theoDoiGetAllUsers(),
    UserCyberBugSaga.theoDoiGetUserByProjectSaga(),
    UserCyberBugSaga.theoDoiEditUserSaga(),
    UserCyberBugSaga.theoDoiDeleteUserSaga(),
    StatusSaga.theoDoiGetStatusSaga(),
    PrioritySaga.theoDoiGetAllPrioritySaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskSaga(),
    TaskSaga.theoDoiCreateTaskSaga(),
    TaskTypeSaga.theoDoiGetTaskTypeSaga(),
    CommentSaga.theoDoiInsertCommentSaga(),
    CommentSaga.theoDoiRemoveCommentSaga(),
    CommentSaga.theoDoiGetAllCommentSaga(),
    CommentSaga.theoDoiEditCommentSaga()


  ])


}