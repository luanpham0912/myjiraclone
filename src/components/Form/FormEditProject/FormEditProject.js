import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

function FormEditProject(props) {
    let arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: "GET_ALL_PROJECTCATEGORY_SAGA",
      
          })
    }, [])


    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;


    useEffect(() => {
        dispatch({
            type: 'SET_SUBMIT_EDIT_PROJECT',
            submitfuncion: handleSubmit
        })


    }, [])

    return (
        <form onSubmit={handleSubmit} >
            <div className='container'>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <p>ID</p>
                        <input onChange={handleChange} value={values.id} disabled name='id' className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <p>Project Name</p>
                        <input onChange={handleChange} value={values.projectName} name='projectName' className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <p>Category</p>

                        <select name='categoryId' value={values.categoryId} onChange={handleChange}>
                            {arrProjectCategory?.map((item, index) => {
                                return <option value={item.id} key={index}>
                                    {item.projectCategoryName}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 form-group'>
                        <p>Description</p>
                        <Editor
                            name='description1'
                            // initialValue={values.description}
                            value={values.description}
                            apiKey='your-api-key'
                            onEditorChange={(newValue, editor) => {

                                setFieldValue('description', newValue)
                                // setValue(newValue);
                                // setText(editor.getContent({format: 'text'}));
                            }}

                            init={{
                                height: 400,
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
                    </div>
                </div>
            </div>
        </form>
    )
}
const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

        console.log("props",props.editProject)
        return {
            id: props.editProject.id,
            projectName: props.editProject.projectName,
            description: props.editProject.description,
            categoryId: props.editProject.categoryId

        }
    },

    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log("value",values)
        props.dispatch({
            type: "UPDATE_PROJECT_SAGA",
            projectUpdate : values
        })

    },

    displayName: 'FormEditProject',
})(FormEditProject);


const mapStatetoprops = (state) => {
    return {
        editProject: state.ProjectReducer.editProject
    }
}

export default connect(mapStatetoprops)(editProjectForm)