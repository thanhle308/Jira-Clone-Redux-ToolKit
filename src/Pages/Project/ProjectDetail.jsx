import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Tag, Space, Button, Modal, Divider, Select, Input, Slider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectDetailAction, getTaskDetailAction, updateStatusAction } from '../../redux/action/projectAction';
import parse from 'html-react-parser';
import { getAllStatusAction } from '../../redux/action/statusAction';
import { getAllPriorityAction } from '../../redux/action/priorityAction';
import { change_task_modal } from '../../redux/reducer/taskModalReducer';


const ProjectDetail = (props) => {
    const { projectDetail } = useSelector(state => state.projectReducer)
    const { taskDetailModal } = useSelector(state => state.taskModalReducer)
    const { listStatus } = useSelector(state => state.statusReducer);
    const { listPriority } = useSelector(state => state.priorityReducer);
    // console.log({ listStatus })
    const dispatch = useDispatch();


    const [open, setOpen] = useState(false);
    const color = ["magenta", "purple", "cyan", "green"]

    const ColumTask = () => {
        return projectDetail.lstTask?.map((colum, index) => {
            return <Col key={index} span={6} >
                <Card title={<Tag color={`${color[index]}`}>{colum.statusName}</Tag>} bordered={true} style={{ backgroundColor: '#F5F5F5' }}>
                    {colum.lstTaskDeTail.length > 0 ? (colum.lstTaskDeTail.map((task, index) => {
                        return <Card className='mb-2' onClick={() => {
                            dispatch(getTaskDetailAction(task.taskId))
                            setOpen(true)
                        }} key={index} title={task.taskName} bordered={true} style={{ backgroundColor: '#FFFFFF', cursor: 'pointer' }}>
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

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color='green'
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
    };

    const handleChange = ({name, value}) => {
        dispatch(change_task_modal({name,value}));
    }

    useEffect(() => {
        const { projectId } = props.match.params;
        dispatch(getProjectDetailAction(projectId));
        dispatch(getAllStatusAction())
        dispatch(getAllPriorityAction())
    }, [])
    return (
        <div>
            <h1 className='mb-5'>Project Detail</h1>
            <Row gutter={16} >
                {ColumTask()}
            </Row>
            <Modal
                title={taskDetailModal.taskName}
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={[]}

            >
                <Row>
                    <Col span={16}>
                        <Row>
                            <Col span={24}>
                                <Divider orientation="left">Discription</Divider>
                                {renderTaskDescription()}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Col span={24}>
                            <Divider orientation="left">Status</Divider>
                            <Select
                                name="statusId"
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                value={taskDetailModal.statusId}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                options={listStatus.map((status, index) => {
                                    return {
                                        value: status.statusId,
                                        label: status.statusName,
                                    }
                                })
                                }
                                onChange={(value,name) => {
                                    
                                    // c1 dung put 
                                    // const taskUpdateStatus ={
                                    //     taskId: taskDetailModal.taskId,
                                    //     statusId: value,
                                    //     projectId: taskDetailModal.projectId
                                    // }
                                    // dispatch(updateStatusAction(taskUpdateStatus))
                                    // console.log(value)

                                    // c2 
                                    name = "statusId";
                                    handleChange({name, value})
                                }}
                                
                            />
                        </Col>

                        <Col span={24}>
                            <Divider orientation="left">Assignees</Divider>
                            <Select
                                mode="multiple"
                                showArrow
                                tagRender={tagRender}
                                defaultValue={[]}
                                style={{
                                    width: '100%',
                                }}
                                options={taskDetailModal.assigness.map((member, index) => {
                                    return {
                                        value: member.id,
                                        label: member.name
                                    }
                                })}
                                onChange={(value, options,name) => {
                                    name = 'assigness'
                                    handleChange({name, value})
                                }}
                            />
                        </Col>

                        <Col span={24}>
                            <Row>
                                <Col span={11}>
                                    <Divider orientation="left">Priority</Divider>
                                    <Select
                                        showSearch
                                        style={{
                                            width: '100%',
                                        }}
                                        value={taskDetailModal.priorityId}
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={listPriority.map((priority, index) => {
                                            return {
                                                value: priority.priorityId,
                                                label: priority.priority
                                            }
                                        })
                                        }
                                        onChange={(value, options,name) => {
                                            name = 'priorityId'
                                            handleChange({name, value})
                                        }}
                                    />
                                </Col>

                                <Col span={11} offset={2}>
                                    <Divider orientation="left">Estimate</Divider>
                                    <Input allowClear name='originalEstimate' value={taskDetailModal.originalEstimate} onChange={(e) => {
                                        const {name, value} = e.target;
                                        handleChange({name, value})
                                    }}/>
                                </Col>

                            </Row>
                        </Col>
                        <Col span={24}>
                            <Divider orientation="left">Time Tracking</Divider>
                            <Slider
                                value={taskDetailModal.timeTrackingSpent}
                                max={Number(taskDetailModal.timeTrackingSpent) + Number(taskDetailModal.timeTrackingRemaining)}
                            />
                        </Col>
                        <Row>
                            <Col span={8} >{taskDetailModal.timeTrackingSpent}h logged</Col>
                            <Col span={8} offset={8}>{taskDetailModal.timeTrackingRemaining}h remaining</Col>
                        </Row>
                        <Row>
                            <Col span={11}>
                                <Divider orientation="left">Time spent</Divider>
                                <Input name='timeTrackingSpent' value={taskDetailModal.timeTrackingSpent} onChange={(e) => {
                                        const {name, value} = e.target;
                                        handleChange({name, value})
                                    }} />
                            </Col>
                            <Col span={11} offset={2}>
                                <Divider orientation="left">Time Remaining</Divider>
                                <Input name='timeTrackingRemaining' value={taskDetailModal.timeTrackingRemaining} onChange={(e) => {
                                        const {name, value} = e.target;
                                        handleChange({name, value})
                                    }}/>
                            </Col>

                        </Row>

                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default ProjectDetail;
