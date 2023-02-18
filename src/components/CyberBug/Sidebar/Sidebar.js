import React, { Fragment, useState } from 'react'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useDispatch } from 'react-redux';
import FormCreateTask from '../../Form/FormCreateTask/FormCreateTask';

const { Header, Sider, Content } = Layout;





export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(true)
    const dispatch = useDispatch()
    return (
        <Fragment>
            <Sider width={150} trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                 
                style={{height: "660px" , paddingTop : "50px", position : "relative", top: 0, left : 0, zIndex : 10}}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <PlusOutlined/>,
                            label: 'Create Task',
                            onClick : () =>{
                                dispatch({
                                    type: "OPEN_FORM_CREATE_TASK",
                                    Component : <FormCreateTask/>,
                                    title : 'Create Task' 
                                })
                                
                            }
                        },
                        // {
                        //     key: '2',
                        //     icon: <SearchOutlined />,
                        //     label: 'Search',
                        // },

                    ]}
                />
            </Sider>
            <Header style={{ padding: 0, color: "white" , position:"absolute" , top: 0, zIndex : 100, left :"2%"}}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                })}
            </Header>
        </Fragment>

    )
}
