import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function UserEdit(props) {
    console.log(props.match.params.id)
    const dispatch = useDispatch()
    const { userSearch } = useSelector(state => state.UsersCyberBugReducer)
    console.log("first,", userSearch)
    useEffect(() => {
        dispatch({
            type: "GET_USERS_SAGA",
            keyWord: props.match.params.id
        })
    }, [])

    const editFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: userSearch[0]?.userId || '',
            passWord: "",
            email: userSearch[0]?.email || '',
            name: userSearch[0]?.name || '',
            phoneNumber: userSearch[0]?.phoneNumber || ''
        },
        onSubmit: (values) => {
            console.log("values", values)
            dispatch({
                type: "EDIT_USER_SAGA",
                user : values
            })
        }
    })
    console.log("editFormik.values", editFormik.values)
    return (
        <div style={{width: "70%" , }}>
            <h3 className='p-3 font-weight-bold'> Edit User - {userSearch[0]?.name} </h3>
            <form onSubmit={editFormik.handleSubmit} className='mx-auto' style={{width: "30%" , }}>
                <div className='form-group '>
                    <label>ID</label>
                    <input  className='form-control mb-3' disabled value={editFormik.values.id} name='id' onChange={editFormik.handleChange} />

                    <label>Name</label>
                    <input required className='form-control mb-3' value={editFormik.values.name} name='name' onChange={editFormik.handleChange} />

                    <label>Email</label>
                    <input disabled className='form-control mb-3' value={editFormik.values.email} name='email' onChange={editFormik.handleChange} />

                    <label>Phone number</label>
                    <input required className='form-control mb-3' value={editFormik.values.phoneNumber} name='phoneNumber' onChange={editFormik.handleChange} />

                    <label>Password</label>
                    <input required className='form-control mb-3' value={editFormik.values.passWord} name='passWord' onChange={editFormik.handleChange} />
                    <button type='submit' className='btn btn-primary'>Update</button>
                </div>
            </form>
        </div>
    )
}
