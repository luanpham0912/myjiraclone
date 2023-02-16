const initialState = {
    arrType : []
}

export const TypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_TASKTYPE" : {
        state.arrType = action.arrType
        return {...state}
    }

 
  default:
    return {...state}
  }
}
