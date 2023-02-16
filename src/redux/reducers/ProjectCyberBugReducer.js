const initialState = {
    projectList : []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case "ALL_PROJECTLIST" : {
      state.projectList = action.data
      console.log("data", state.projectList)
      return {...state}
    }


  default:
    return {...state}
  }
}
