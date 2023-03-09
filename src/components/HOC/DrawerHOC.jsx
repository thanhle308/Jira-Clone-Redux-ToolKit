import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close_drawer, open_drawer } from '../../redux/reducer/drawerHOCReducer';
import  './DrawerHOC.css'
const { Option } = Select;

const DrawerHOC = () => {
    const { visible, ComponentContentDrawer, callBackSubmit ,title } = useSelector(state => state.drawerHOCReducer)
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(close_drawer())
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
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => {
                             callBackSubmit();
                            onClose();
                        }} className="bg-primary text-white ml-2 m-4 mb-5">
                            Submit
                        </Button>
                    </div>
                }
            >
                {ComponentContentDrawer}
            </Drawer>
        </>
    );
}

export default DrawerHOC;
