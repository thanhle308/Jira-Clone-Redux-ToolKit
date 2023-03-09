import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getProjectCategoryAction } from '../../../redux/action/categoryAction';
import { set_submit } from '../../../redux/reducer/drawerHOCReducer';
import { updateProjectAction } from '../../../redux/action/projectAction';

const FormEditProject = (props) => {
    const { arrProjectCategory } = useSelector(state => state.projectCategoryReducer);
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        // Goi api category
        dispatch(getProjectCategoryAction())
        // //Load event submit len drawer nut submit
        dispatch(set_submit(handleSubmit))
    }, []);


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }
    return (
        <form className='container-fuild' onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <p className='font-weight-boil mb-2'>Project ID</p>
                        <input value={values.id} disabled className='form-control' name='id' />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className='font-weight-boil mb-2'>Project Name</p>
                        <input value={values.projectName} className='form-control' name='projectName' onChange={handleChange} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className='font-weight-boil mb-2'>Project Category</p>
                        <select name="categoryId" className="form-control" value={values.categoryId} onChange={handleChange}>
                            {arrProjectCategory.map((item, index) => {
                                return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p >Description</p>
                        <Editor
                            name='description'
                            value={values.description}
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
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props;
        return {
            id: projectEdit?.id,
            projectName: projectEdit?.projectName,
            description: projectEdit?.description,
            categoryId: projectEdit?.categoryId
        }
    },
    validationSchema: Yup.object({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(updateProjectAction(values.id,values));
    },

    displayName: 'editProjectForm',
})(FormEditProject);

const mapStateToProps = (state) => {
    return {
        projectEdit: state.projectReducer.projectEdit
    }
}
export default connect(mapStateToProps)(editProjectForm);

