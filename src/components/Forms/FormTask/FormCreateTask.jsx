import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { getAllStatusAction } from '../../../redux/action/statusAction';
import { getAllPriorityAction } from '../../../redux/action/priorityAction';
import { getAllTaskTypeAction } from '../../../redux/action/taskTypeAction';
import { getUserByProjectIdAction } from '../../../redux/action/userAction';
import { set_submit_create_task } from '../../../redux/reducer/drawerHOCReducer';
import { createTaskAction } from '../../../redux/action/projectAction';

const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};
function FormCreateTask(props) {
    // lay du lieu tu redux
    const { projectList } = useSelector(state => state.projectReducer);
    const { listStatus } = useSelector(state => state.statusReducer);
    const { listPriority } = useSelector(state => state.priorityReducer);
    const { listTaskTypes } = useSelector(state => state.taskTypeReducer);
    const { listUserFromProject } = useSelector(state => state.userReducer);
    
    // console.log('listTaskTypes',listTaskTypes)

    const optionUserSearch = listUserFromProject.map((item, index) => {
        return { value: item.userId, label: item.name }
    })
    const dispatch = useDispatch();
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = props; // cac prop sinh ra do formik => component
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })
    const [size, setSize] = useState('middle');
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    //hook 
    useEffect(() => {
        dispatch(getAllStatusAction())
        dispatch(getAllPriorityAction())
        dispatch(getAllTaskTypeAction())
        // //Đưa hàm handle submit lên drawer reducer lên để cập nhật lại sưj kiện cho nút Submit
        dispatch(set_submit_create_task(handleSubmit))
        // dispatch({ type: GET_USER_API, keyword: '' })
    }, [])
    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className="form-group">
                <p>Project</p>
                <select name="projectId" className='form-control' onChange={(e) => {
                    console.log('validationSchema', e.target.value);
                    //dispatch gia tri lam thay doi arruser
                    let { value } = e.target;
                    // dispatch len project duoc chon de lay thong tin project => user co trong project
                    dispatch(getUserByProjectIdAction(value))
                    // cap nhat gia tri project id
                    setFieldValue('projectId', e.target.value);
                }}>
                    {projectList.map((project, index) => {
                        return <option key={index} value={project.id}>
                            {project.projectName}
                        </option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <p>Task Name</p>
                <input name='taskName' className='form-control' onChange={handleChange} />
            </div>
            <div className="form-group">
                <p>Status</p>
                <select name='statusId' className='form-control' onChange={handleChange} >
                    {listStatus.map((status, index) => {
                        return <option key={index} value={status.statusId}>
                            {status.statusName}
                        </option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className='form-control' onChange={handleChange}>
                            {listPriority?.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task Type</p>
                        <select name="typeId" className='form-control' onChange={handleChange}>
                            {listTaskTypes?.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>
                                    {taskType.taskType}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            placeholder="Please select"
                            // defaultValue={['a10', 'c12']}
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values)
                            }}
                            optionFilterProp='label'
                            onSearch={(value) => {

                            }}
                            style={{
                                width: '100%',
                            }}
                            options={optionUserSearch}
                        />
                        <div className="row mt-4">
                            <div className="col-12">
                                <p className='mt-2'>Original Estimate</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='originalEstimate' onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <p>Time Tracking</p>
                        <Slider
                            defaultValue={30}
                            value={timeTracking.timeTrackingSpent}
                            max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                        // tooltip={{
                        //     open: true,
                        // }}
                        />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p className='mt-2'>Time spent</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='timeTrackingSpent' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    })
                                    setFieldValue('timeTrackingSpent', e.target.value)
                                }} />
                            </div>
                            <div className="col-6">
                                <p className='mt-2'>Time Remaining</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='timeTrackingRemaining' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    })
                                    setFieldValue('timeTrackingRemaining', e.target.value)
                                }} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name='description'
                    initialValue=""
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
                        setFieldValue('description', content)
                    }}
                />
            </div>
        </form>
    )
}

const createTaskForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectList, listTaskTypes, listPriority, listStatus } = props;
        if (projectList.lenght > 0) {
            // props.dispatch({ type: GET_USER_BY_PROJECT_SAGA, idProject: projectList[0]?.id })
        }
        return {
            taskName: "",
            description: "",
            statusId: listStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: projectList[0]?.id,
            typeId: listTaskTypes[0]?.id,
            priorityId: listPriority[0]?.priorityId,
            listUserAsign: []
        }
    },
    validationSchema: Yup.object({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log('value ne',values)
        props.dispatch(createTaskAction(values))
        
    },

    displayName: 'createTaskForm',
})(FormCreateTask);

const mapStateToProps = (state) => {
    return {
        projectList: state.projectReducer.projectList,
        listTaskTypes: state.taskTypeReducer.listTaskTypes,
        listPriority: state.priorityReducer.listPriority,
        listStatus: state.statusReducer.listStatus,
    }
}


export default connect(mapStateToProps)(createTaskForm);