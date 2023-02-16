import React from 'react'
import { useSelector } from 'react-redux'

export default function Home(props) {

    let userLogin = useSelector(state => state.UsersCyberBugReducer.userLogin)
    return (
        <div>
            {userLogin?.name}
            {<img src={userLogin?.avatar} alt='avatar'/>}
        </div>
    )
}



