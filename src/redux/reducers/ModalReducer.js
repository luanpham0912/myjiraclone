import React from "react"
const initialState = {
    component : <p> Modal mặc định </p>
}

export default (state = initialState,action) => {
  switch (action.type) {
    case 'OPEN_MODAL' : {
        state.component = action.component
        return {...state}
    }

  default:
    return {...state}
  }
}
