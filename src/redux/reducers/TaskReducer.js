const initialState = {
    taskDetailModal :  {
        
    "priorityTask": {
      "priorityId": 1,
      "priority": "High"
    },
    "taskTypeDetail": {
      "id": 1,
      "taskType": "bug"
    },
    "assigness": [
      {
        "id": 3390,
        "avatar": "https://ui-avatars.com/api/?name=quang nguyen",
        "name": "quang nguyen",
        "alias": "quang-nguyen"
      },
      {
        "id": 3395,
        "avatar": "https://ui-avatars.com/api/?name=Nghia",
        "name": "Nghia",
        "alias": "nghia"
      },
      {
        "id": 3504,
        "avatar": "https://ui-avatars.com/api/?name=Nguyễn Văn Quân",
        "name": "Nguyễn Văn Quân",
        "alias": "nguyen-van-quan"
      }
    ],
    "lstComment": [
      {
        "id": 6772,
        "idUser": 3629,
        "name": "bc32movie@gmail.com",
        "avatar": "https://ui-avatars.com/api/?name=bc32movie@gmail.com",
        "commentContent": "xong rui"
      }
    ],
    "taskId": 7637,
    "taskName": "t asket gf fgnhgfnhn gjmhj m,",
    "alias": "t-asket-gf-fgnhgfnhn-gjmhj-m-",
    "description": "<p>xin chaof</p>",
    "statusId": "2",
    "originalEstimate": 2,
    "timeTrackingSpent": 10,
    "timeTrackingRemaining": 10,
    "typeId": 1,
    "priorityId": 1,
    "projectId": 10021
    }
}

export const TaskReducer = (state = initialState,action) => {
  switch (action.type) {

    case "GET_TASK_DETAIL" : {
      state.taskDetailModal = action.taskDetailModal
      return {...state}
    }
    case "CHANGE_TASK_MODAL" :{
      const {name,value} = action
      console.log("name",name)
      console.log("value",value)

      return {...state,taskDetailModal :{...state.taskDetailModal,[name] : value}
    }}
    case "CHANGE_ASSIGNESS" :{
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness,action.userSelected]
      return {...state}
    }
    case "REMOVE_USER_ASSIGNESS" :{
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(mem => mem.id !== action.userId)]
      return {...state}
    }
  default:
    return {...state}
  }
}
