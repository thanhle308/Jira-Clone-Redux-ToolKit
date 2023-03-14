import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Tag, Space, Button, Modal, Divider, Select, Input, Slider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectDetailAction, getTaskDetailAction, updateStatusAction, updateTaskAction } from '../../redux/action/projectAction';
import parse from 'html-react-parser';
import { getAllStatusAction } from '../../redux/action/statusAction';
import { getAllPriorityAction } from '../../redux/action/priorityAction';
import { change_all_task_modal, change_members_detail_task, change_members_detail_task_add, change_members_detail_task_remove, change_task_modal } from '../../redux/reducer/taskModalReducer';
import { Editor } from '@tinymce/tinymce-react';
import { CloseOutlined } from '@ant-design/icons/lib/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const ProjectDetail = (props) => {
    const { projectDetail } = useSelector(state => state.projectReducer)
    const { taskDetailModal } = useSelector(state => state.taskModalReducer)
    const { listStatus } = useSelector(state => state.statusReducer);
    const { listPriority } = useSelector(state => state.priorityReducer);

    const [visibleEditor, setvisibleEditor] = useState(false);
    const [historyContent, sethistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description);
    console.log('projectDetail', projectDetail)
    const dispatch = useDispatch();


    const [open, setOpen] = useState(false);
    const color = ["magenta", "purple", "cyan", "green"]

    const handleDragEnd = (result) => {
        let { destination, source } = result;
        //Neu diem den khong ton tai thi return
        if (!destination) {
            return;
        }
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }
        let statusChange = {
            'taskId': Number(result.draggableId),
            'statusId': destination.droppableId,
            'projectId': projectDetail?.id,
        }
        dispatch(updateStatusAction(statusChange))
    }

    const ColumTask = () => {
        return <DragDropContext onDragEnd={handleDragEnd} >
            {
                projectDetail.lstTask?.map((colum, index) => {
                    return <Droppable key={index} droppableId={colum.statusId}>
                        {(provided) => {
                            return <Col ref={provided.innerRef} {...provided.droppableProps} key={index} span={6} >
                                <Card title={<Tag color={`${color[index]}`}>{colum.statusName}</Tag>} bordered={true} style={{ backgroundColor: '#F5F5F5' }}>
                                    {colum.lstTaskDeTail.length > 0 ? (colum.lstTaskDeTail.map((task, index) => {
                                        return <Draggable key={task.taskId.toString()} index={index} draggableId={task.taskId.toString()} >
                                            {(provided) => {
                                                return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Card className='mb-2' onClick={() => {
                                                        dispatch(getTaskDetailAction(task.taskId))
                                                        console.log(task.taskId)
                                                        setOpen(true)
                                                    }} key={index} title={task.taskName} bordered={true} style={{ backgroundColor: '#FFFFFF' }}>
                                                        <Space size={[0, 8]} wrap>
                                                            {task.taskTypeDetail.id === 1 ? <Tag color="#f50">{task.taskTypeDetail.taskType}</Tag> : <Tag color="#108ee9">{task.taskTypeDetail.taskType}</Tag>}
                                                            <Tag color="#2db7f5">{task.priorityTask.priority}</Tag>
                                                        </Space>
                                                    </Card>
                                                </div>
                                            }}
                                        </Draggable>


                                    })) : ''}

                                </Card>

                                {provided.placeholder}

                            </Col>
                        }}

                    </Droppable>
                })
            }
        </DragDropContext>
    }



    const renderTaskDescription = () => {
        const jsxDescription = parse(taskDetailModal.description);
        return <div >
            {visibleEditor ? <div>
                <Editor
                    name='description'
                    initialValue={taskDetailModal.description}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(content, editor) => {
                        setContent(content);
                    }}

                />
                <Button className='btn btn-primary m-2' onClick={() => {
                    const name = 'description';
                    const value = content;
                    dispatch(change_task_modal({ name, value }));
                    sethistoryContent(content);
                    setvisibleEditor(false)
                }}>Save</Button>
                <Button className='btn btn-primary m-2' onClick={() => {
                    const name = 'description';
                    const value = historyContent;
                    dispatch(change_task_modal({ name, value }));
                    setvisibleEditor(false)
                }}>Close</Button>
            </div> : <div onClick={() => {
                setvisibleEditor(!visibleEditor);
            }}>{jsxDescription}</div>}

        </div>
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

    const handleChange = ({ name, value }) => {
        // console.log('valua ne', value)
        dispatch(updateTaskAction({ name, value, actionType: '1' }));
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
                    <Col span={12} offset={2}>
                        <Row>
                            <Col span={24}>
                                <Divider orientation="left">Discription</Divider>
                                {renderTaskDescription()}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8} offset={2}>
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
                                onChange={(value, name) => {

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
                                    handleChange({ name, value })
                                }}

                            />
                        </Col>

                        <Col span={24}>
                            <Divider orientation="left">Assignees</Divider>
                            {/* <Col span={24} className='mb-2'>
                                {taskDetailModal.assigness.map((mem, index) => {
                                    return <Tag key={index} className='m-1' color={`${color[index]}`}>{mem.name}<CloseOutlined className='ml-2 pb-1' /></Tag>
                                })}
                            </Col> */}
                            <Select
                                mode="multiple"
                                showArrow
                                tagRender={tagRender}
                                value={taskDetailModal.assigness.map((mem, index) => {
                                    return {
                                        value: mem.id,
                                        label: mem.name
                                    }
                                })}
                                style={{
                                    width: '100%',
                                }}
                                options={projectDetail.members?.filter((mem) => {
                                    let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId)
                                    if (index !== -1) {
                                        return false;
                                    }
                                    return true;
                                }).map((member, index) => {
                                    return {
                                        value: member.userId,
                                        label: member.name
                                    }
                                })}
                                onSelect={(value, option) => {
                                    //    const name = 'assigness';
                                    console.log('value', value)
                                    let userSelect = projectDetail.members.find(mem => mem.userId == value)
                                    userSelect = { ...userSelect, id: userSelect.userId }
                                    // dispatch(change_members_detail_task_add(userSelect))
                                    dispatch(updateTaskAction({ userSelect, actionType: '2' }))
                                    // console.log('op', option)
                                }}
                                onDeselect={(value, option) => {
                                    //    const name = 'assigness';
                                    console.log('value', value)
                                    let userSelect = projectDetail.members.find(mem => mem.userId == value)
                                    userSelect = { ...userSelect, userId: userSelect.userId }
                                    // dispatch(change_members_detail_task_remove(userSelect))
                                    dispatch(updateTaskAction({ userSelect, actionType: '3' }))

                                    // console.log('op', option)
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
                                        options={listPriority.map((priority, index) => {
                                            return {
                                                value: priority.priorityId,
                                                label: priority.priority
                                            }
                                        })
                                        }
                                        onChange={(value, options, name) => {
                                            name = 'priorityId'
                                            handleChange({ name, value })
                                        }}
                                    />
                                </Col>

                                <Col span={11} offset={2}>
                                    <Divider orientation="left">Estimate</Divider>
                                    <Input allowClear name='originalEstimate' value={taskDetailModal.originalEstimate} onChange={(e) => {
                                        const { name, value } = e.target;
                                        handleChange({ name, value })
                                    }} />
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
                                    const { name, value } = e.target;
                                    handleChange({ name, value })
                                }} />
                            </Col>
                            <Col span={11} offset={2}>
                                <Divider orientation="left">Time Remaining</Divider>
                                <Input name='timeTrackingRemaining' value={taskDetailModal.timeTrackingRemaining} onChange={(e) => {
                                    const { name, value } = e.target;
                                    handleChange({ name, value })
                                }} />
                            </Col>

                        </Row>

                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default ProjectDetail;
