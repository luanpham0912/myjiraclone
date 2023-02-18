import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { connect, useDispatch, useSelector } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
function CreateProject(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = props;
  let arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)

  let dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: "GET_ALL_PROJECTCATEGORY_SAGA",

    })
  }, []);

  return (
    <div className='container-fluid mt-5' style={{ width: "78%" }} onChange={handleChange}>
      <h3> Create Project </h3>
      <div className='container' >
        <div className='form-group'>
          <p>Name</p>
          <input className='form-control' name='projectName' onChange={handleChange} />
        </div>
        <p>Description</p>
        <Editor

          name='description'
          apiKey='8n50oayin2bzp97moof00naoprj8or9kss104w74509cpnfv'
          onEditorChange={(newValue, editor) => {

            setFieldValue('description', newValue)
            // setValue(newValue);
            // setText(editor.getContent({format: 'text'}));
          }}
          initialValue=""
          init={{
            height: 200,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
        <select name='categoryId' className='form-control mb-3' onChange={handleChange}>
          {arrProjectCategory.map((item, index) => {
            return <option value={item.id} key={index}>
              {item.projectCategoryName}
            </option>
          })}
        </select>

      </div>
      <button type='submit' onClick={handleSubmit} className='btn btn-outline-primary'>Create Project</button>

    </div>
  )
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {


    return {
      projectName: '',
      description: '',
      categoryId: props.arrProjectCategory[0]?.id

    }
  },

  validationSchema: Yup.object().shape({

  }),

  handleSubmit: (values, { props, setSubmitting }) => {

    props.dispatch({
      type: "CREATE_PROJECT_SAGA",
      newProject: values
    })
  },

  displayName: 'createProjectForm',
})(CreateProject);


const mapStatetoprops = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
  }
}

export default connect(mapStatetoprops)(createProjectForm)