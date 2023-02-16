const initialState = {
    editProject : {
        "id": 9868,
        "projectName": "Test Swagger",
        "description": "Connect and authorize",
        "categoryID": '3',
    },
    projectDetail : {

    }
}

export default (state = initialState,action) => {
  switch (action.type) {

    case "EDIT_PROJECT" :{
        state.editProject = action.projecteditmodal
        return {...state}
    }
    case "PUT_PROJECT_DETAIL" : {
      state.projectDetail = action.projectDetail
      return {...state}
    }


  default: return  {...state}
  }
}
