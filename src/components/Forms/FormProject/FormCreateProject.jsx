import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getProjectCategoryAction } from '../../../redux/action/categoryAction';
import { set_submit } from '../../../redux/reducer/drawerHOCReducer';
import { createProjectAuthorizeAction } from '../../../redux/action/projectAction';

function FormCreateProject(props) {
  const { arrProjectCategory } = useSelector(state => state.projectCategoryReducer);
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  useEffect(() => {
    //GỌI API để láy dữ liệu thẻ select
    dispatch(getProjectCategoryAction())
    // //Load event submit len drawer nut submit
    dispatch(set_submit(handleSubmit))
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue('description', content)
  }

  return (
    <form className="container-fuild" onSubmit={handleSubmit} onChange={handleChange}>
      <div className="form-group">
        <p>Name</p>
        <input className='form-control' name='projectName' />
      </div>

      <div className="form-group">
        <p>Discription</p>
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
          onEditorChange={handleEditorChange}
        />
      </div>

      <div className="form-group">
        <select name="categoryId" className='form-control' onChange={handleChange}>
          {arrProjectCategory.map((item, index) => {
            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
          })}
        </select>
      </div>
    </form>
  )
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: '',
      description: '',
      categoryId: props.arrProjectCategory[0]?.id,
    }
  },
  validationSchema: Yup.object({

  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    // console.log('value ne', values)
     props.dispatch(createProjectAuthorizeAction(values));
  },

  displayName: 'formCreateProjectForm',
})(FormCreateProject);

const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.projectCategoryReducer.arrProjectCategory
  }
}
export default connect(mapStateToProps)(createProjectForm);
