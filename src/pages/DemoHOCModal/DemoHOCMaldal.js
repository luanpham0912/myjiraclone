// import React from 'react'
// import { useDispatch } from 'react-redux'
// import SlideDown from '../../HOC/HOCModal/SlideDown'
// import Login from '../Login/Login'
// import Register from '../Register/Register'

// export default function DemoHOCMaldal() {
//     const slideDownUseSpring = new SlideDown(Login)
//     let dispatch = useDispatch()
//     return (
//         <div>
//             <button type="button"  className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId" onClick={()=>{
//                 dispatch({
//                     type: "OPEN_MODAL",
//                     component: <Login/>
//                 })
//             }}>
//                 Login
//             </button>
//             <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId"  onClick={()=>{
//                 dispatch({
//                     type: "OPEN_MODAL",
//                     component: <Register/>
//                 })
//             }}>
//                 Register
//             </button>
//             {slideDownUseSpring}
//         </div>
//     )
// }
