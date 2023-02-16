import React from "react"
const initialState = {
    visible : false,
    title : '',
    ComponentContentDrawer : <p>default content</p>,
    callbackSubmit : () => { alert("Demo Submit")}

}

export const DrawerCyberbug = (state = initialState, action) => {
  switch (action.type) {

  case "OPEN_DRAWER": {   
    return { ...state,visible : true }
  }
  case "CLOSE_DRAWER": {   
    return { ...state,visible : false }
  }
  case "OPEN_FORM" : {
     console.log(action)
     state.visible = true
     state.title = action.title
     state.ComponentContentDrawer = action.Component
     return {...state}
  }
  case 'SET_SUBMIT_EDIT_PROJECT' : {
    state.callbackSubmit = action.submitfuncion
    return {...state}
  }
  case 'SET_SUBMIT_CREATE_PROJECT' : {
    state.callbackSubmit = action.submitfuncion
    return {...state}
  }
  case 'OPEN_FORM_CREATE_TASK' : {
    state.visible =true
    state.ComponentContentDrawer = action.Component
    state.title =action.title

    return {...state}
  }

  default:
    return {...state}
  }
}
