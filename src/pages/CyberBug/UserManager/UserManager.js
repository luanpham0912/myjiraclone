

import React, { useRef, useState } from 'react'
import { AutoComplete, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, DiffOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import { Fragment } from 'react';

const { Search } = Input;


export default function UserManager(props) {

  const { arrUser } = useSelector(state => state.UsersCyberBugReducer)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
        type: "GET_ALL_USERS_SAGA",
        keyword : ''
    })

  }, [])
 
  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
  
      sorter: (a, b) => {

        if (a > b) {
          return 1
        }
        return -1

      },
    
      sortDirections: ['ascend'],

 
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',

     sorter: (a, b) => {
        let taiKhoanA = a.name.toLowerCase().trim()
        let taiKhoanB = b.name.toLowerCase().trim()
        if (taiKhoanA > taiKhoanB) {
          return 1
        }
        return -1

      },
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend'],
     
    },
    {

      title: 'email',
      dataIndex: 'email',
      key: 'email',

     
    },
    {

      title: 'phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',

      sortDirections: ['ascend'],
     
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
    render : (item,index)=>{
        return <img key={index.userId} src={item} style={{width: "32px"}} alt='avatar' />
    },

  

    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {
        return <Fragment>
          <NavLink key={1} to={`/usermanager/edit/${record.userId}`} className='btn btn-outline-primary mr-2'> <EditOutlined /></NavLink>
          <span key={2} onClick={() => {
            if (window.confirm("bạn có chắc xóa người dùng " + record.name)) {
              dispatch({
                type : "DELETE_USER_SAGA",
                id : record.userId
              })
            }
          }} className='btn btn-outline-danger'> <DeleteOutlined /></span>


        </Fragment>
      },


    },
  ];

  let searchRef = useRef(null)

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  const handleSearch = (value) => {
   
    //debounce search
    if (searchRef.current) {

      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => {
        dispatch({
            type: "GET_ALL_USERS_SAGA",
            keyword : value
        })
    }, 300)

  };

  return (
    <div className=' mt-4 mx-4' style={{width:"70%"}}>
  

      <AutoComplete
        style={{
            marginLeft :"auto",
          width: '80%',
          marginBottom: "10px"
        }}
        onSearch={handleSearch}
        allowClear
        placeholder="Nhập tên người dùng bạn muốn tìm kiếm"

      >
        {/* <Input.Search size="middle" placeholder="Nhập tên phim bạn muốn tìm kiếm" /> */}
      </AutoComplete>
      <span> <SearchOutlined className='text-blue-600' /></span>
      <Table size='small' rowKey={"userId"} columns={columns} dataSource={arrUser} onChange={onChange} />
    </div>
  )
}




