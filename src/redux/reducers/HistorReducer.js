let stateHisory = {
    history : {}
}

export const HistoryReducer = (state = stateHisory,action) =>{
    switch(action.type) {
        case "ADD_HISTORY" : {
            state.history = action.history
            return {...state}
        }
        default : return {...state}
    }
}