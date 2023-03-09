import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Tag, Space, Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectDetailAction } from '../../redux/action/projectAction';
import parse from 'html-react-parser';
import { getAllStatusAction } from '../../redux/action/statusAction';


const ProjectDetail = (props) => {
    const { projectDetail } = useSelector(state => state.projectReducer)
    const { taskDetailModal } = useSelector(state => state.taskModalReducer)
    const { listStatus } = useSelector(state => state.statusReducer);
    console.log({ taskDetailModal })
    const dispatch = useDispatch();


    const [open, setOpen] = useState(false);
    const color = ["magenta", "purple", "cyan", "green"]

    const ColumTask = () => {
        return projectDetail.lstTask?.map((colum, index) => {
            return <Col key={index} span={6} >
                <Card title={<Tag color={`${color[index]}`}>{colum.statusName}</Tag>} bordered={true} style={{ backgroundColor: '#F5F5F5' }}>
                    {colum.lstTaskDeTail.length > 0 ? (colum.lstTaskDeTail.map((task, index) => {
                        return <Card className='mb-2' onClick={() => setOpen(true)} key={index} title={task.taskName} bordered={true} style={{ backgroundColor: '#FFFFFF', cursor: 'pointer' }}>
                            <Space size={[0, 8]} wrap>
                                {task.taskTypeDetail.id === 1 ? <Tag color="#f50">{task.taskTypeDetail.taskType}</Tag> : <Tag color="#108ee9">{task.taskTypeDetail.taskType}</Tag>}
                                <Tag color="#2db7f5">{task.priorityTask.priority}</Tag>
                            </Space>
                        </Card>
                    })) : ''}
                </Card>
            </Col>
        })
    }


    const renderTaskDescription = () => {
        const jsxDescription = parse(taskDetailModal.description);
        return jsxDescription;
    }




    useEffect(() => {
        const { projectId } = props.match.params;
        dispatch(getProjectDetailAction(projectId));
        dispatch(getAllStatusAction())
    }, [])
    return (
        <div>
            <h1 className='mb-5'>Project Detail</h1>
            <Row gutter={16} >
                {ColumTask()}
            </Row>
            <Modal
                title="Modal 1000px width"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Row>
                    <Col span={16}>
                        <Row>
                            <Col span={24}>
                                <h5>Discription</h5>
                                {renderTaskDescription()}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Col span={24}>
                            <div className="form-group">
                                <h5>Status</h5>
                                <select name='statusId' className='form-control' value={listStatus} >
                                    {listStatus.map((status, index) => {
                                        return <option key={index} value={status.statusId}>
                                            {status.statusName}
                                        </option>
                                    })}
                                </select>
                            </div>

                        </Col>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default ProjectDetail;
