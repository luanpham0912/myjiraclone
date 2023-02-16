import React from 'react'
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';

import { Button, Input } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux'
import { signinCyberBugAction, signUpCyberBugAction } from '../../../redux/actions/CyberBugActions';
function RegisterCyberBug(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
    return (
        <form onSubmit={handleSubmit} className='container'>
            <div style={{ height: window.innerHeight }} className='d-flex justify-content-center align-items-center flex-column'>
                <h3 className='text-center'> Register  </h3>
                <Input onChange={handleChange}  type='email' size="large" name='email' placeholder="email" prefix={<UserOutlined />} style={{ width: "50%", marginBottom: "20px" }} />
                <div className='text-danger'>{errors.email}</div>
                <Input  onChange={handleChange} type='password' size="large" name='password' placeholder="password" prefix={<LockOutlined />} style={{ width: "50%", marginBottom: "40px" }} />
                <div className='text-danger'>{errors.password}</div>
                <Input  onChange={handleChange} type='password' size="large" name='name' placeholder="name" prefix={<LockOutlined />} style={{ width: "50%", marginBottom: "40px" }} />
                <div className='text-danger'>{errors.password}</div>
                <Input  onChange={handleChange} type='password' size="large" name='phone' placeholder="phone" prefix={<LockOutlined />} style={{ width: "50%", marginBottom: "40px" }} />
                <div className='text-danger'>{errors.password}</div>

                <Button  htmlType='submit' style={{ color: "white", width: "50%", backgroundColor: "rgba(102,117,223)" }}>Register</Button>
               
                <div className='social' style={{ marginTop: "30px" }}>
                    <Button type="primary" shape="circle" icon={<FacebookOutlined />} style={{ marginRight: "10px", backgroundColor: "rgba(59,89,152)", color: "#fff" }} />
                    <Button type="primary" shape="circle" icon={<TwitterOutlined />} />

                </div>
            </div>
        </form>
    )
}

const mapLoginCyberBugWithFormik = withFormik({
    mapPropsToValues: () => ({ email: '' ,password : '',name : "", phone : ""}),
  
    validationSchema : Yup.object().shape({
        email: Yup.string().required('Required')
          .email('email is invalid!'),
          
        password: Yup.string()
          .min(6, 'Too Short!')
          .max(32, 'Too Long!')
      }),
  
    handleSubmit: ({email, password,name,phone}, { props ,setSubmitting }) => {
       props.dispatch(signUpCyberBugAction(email, password,name ,phone))
    },
  
    displayName: 'Register CyberBug',
  })(RegisterCyberBug);

  export default connect ()(mapLoginCyberBugWithFormik)
  