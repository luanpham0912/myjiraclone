const initialState = {
    arrStatus : []
}

export const StatusReducer =  (state = initialState, action) => {
  switch (action.type) {

    case "GET_ALL_STATUS" : {
        state.arrStatus = action.status
        return {...state}
    }
  default:
    return {...state}
  }
}
