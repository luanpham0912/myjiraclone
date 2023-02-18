
import React, { useEffect, useRef, useState } from 'react';
import { Table, Avatar, Button, Tag, Popconfirm, Popover, AutoComplete } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import FormEditProject from '../../../components/Form/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom';



export default function ProjectManager() {
    let searchRef = useRef(null)

    let [stateValue, setStateValue] = useState('')
    let dispatch = useDispatch()
    let data = useSelector(state => state.ProjectCyberBugReducer.projectList)
    useEffect(() => {
        dispatch({
            type: "GETLIST_PROJECT_SAGA"
        })
    }, [])
    let { userSearch } = useSelector(state => state.UsersCyberBugReducer)
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend'],

        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            render : (text,record,index) => {
                return <NavLink to={`/projectmanager/projectdetail/${record.id}`}>
                    {text}
                </NavLink>
            },
            sorter: (a, b) => {
                if (a.projectName?.trim().toLowerCase() < b.projectName?.trim().toLowerCase()) {
                    return -1;
                }
                return 1
            },

        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            sorter: (a, b) => {
                if (a.categoryName?.trim().toLowerCase() < b.categoryName?.trim().toLowerCase()) {
                    return -1;
                }
                return 1
            },
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            render: (text, record, index) => {
                return <Tag color="lime">
                    {record.creator?.name}
                </Tag>
            }
        },
        {
            title: 'Member',
            dataIndex: 'members',
            render: (text, record, index) => {
               
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return <Popover placement="bottom" title={'Members List'} key={index} content={() => {
                            return <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.members?.map((item,index)=>{
                                        return <tr key={index}>
                                            <td>{item.userId}</td>
                                            <td><img src={item.avatar} style={{width:20, height:20}} alt="1" /></td>
                                            <td>{item.name}</td>
                                            <td><button onClick={()=>{
                                                dispatch({
                                                    type : "REMOVE_USERS_FROM_PROJECT_SAGA",
                                                    userProject : {
                                                        "projectId": record.id ,
                                                        "userId" : item.userId, 
                                                    }
                                                })
                                            }} style={{borderRadius : '2px',fontSize:"12px"}} className='btn btn-danger'>x</button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }}
                         
                        >
                            <Avatar src={member.avatar} />
                        </Popover>
                    })}

                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
                    <Popover style={{width :"10px"}} placement="bottom" title={'Add User'} content={() => {
                        return <AutoComplete
                            onChange={(text) => {
                                setStateValue(text)
                            }}
                            value={stateValue}
                            onSelect={(valueSelec, option) => {
                 
                                setStateValue(option.label)
                                dispatch({
                                    type: "ASSIGN_USERS_PROJECT_SAGA",
                                    userProject: {
                                        'projectId': record.id,
                                        'userId': valueSelec
                                    }
                                })

                            }} options={userSearch?.map((item, index) => { 
                                return { label: item.name, value: item.userId.toString() }
                            })} onSearch={(value) => {                                 //debounce search
                                if(searchRef.current){
                                     clearTimeout(searchRef.current)
                                }
                                searchRef.current = setTimeout(()=>{
                                    dispatch({
                                        type: "GET_USERS_SAGA",
                                        keyWord: value
                                    })
                                },200)
                   
                            }} style={{ width: "100%" }} />
                    }} trigger="click">
                        <span style={{ display:"inline-block", borderRadius: "100%" ,width : "32px", height :"32px ",lineHeight :"32px" ,textAlign :"center" , backgroundColor :"#666", marginTop:"1px", padding : 0, cursor:"pointer" }}>+</span>
                    </Popover>
                </div>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {

                return <div className='container'>
                    <button className='btn btn-outline-primary mr-2' onClick={() => {
                        dispatch({
                            type: 'OPEN_FORM',
                            title : "Form Edit",
                            Component: <FormEditProject />
                        })
                        dispatch({
                            type: "EDIT_PROJECT",
                            projecteditmodal: record
                        })
                    }} >{<EditOutlined />}</button>
                    <Popconfirm
                        placement="topRight"
                        title='Are you sure to delete this project ?'
                        onConfirm={() => {
                            dispatch({
                                type: "DELETE_PROJECT_SAGA",
                                projectUpdate: record.id
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className='btn btn-outline-danger' >{<DeleteOutlined />}</button>
                    </Popconfirm>

                </div>
            },
        },


    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <>

            <Table size='small' columns={columns} rowKey={'id'} dataSource={data} onChange={onChange} className='container-fluid w-75 mt-5' />
        </>
    )
}
