const initialState = {
    arrComt : [],
    editComt : {}
}

export  const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_COMMENT": {
        state.arrComt = action.arrComt
        return {...state}
    }
    case "EDIT_COMMENT" : {
        state.editComt = action.editComt
        return {...state}
    }
  
  default:
    return {...state}
  }
}
