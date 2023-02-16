import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
const { Option } = Select;

export default function ModalCyberBug(props) {
    const {visible,ComponentContentDrawer,callbackSubmit,title} = useSelector(state => state.DrawerCyberbug)
    const dispatch = useDispatch()

    const showDrawer = () => {
        dispatch({type: "OPEN_DRAWER"})
    };
    const onClose = () => {
       dispatch({
        type: "CLOSE_DRAWER"
       })
    };
    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                open={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                footer={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callbackSubmit} type="submit">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {ComponentContentDrawer}
               
            </Drawer>
        </>
    )
}
