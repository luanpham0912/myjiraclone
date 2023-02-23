import { Editor } from '@tinymce/tinymce-react'
import * as Yup from 'yup'
import { withFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Radio, Select, Slider } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';


function FormCreateTask(props) {
    const { arrStatus } = useSelector(state => state.StatusReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer)
    const { arrType } = useSelector(state => state.TypeReducer)
    const { projectList } = useSelector(state => state.ProjectCyberBugReducer)
    const { arrUser } = useSelector(state => state.UsersCyberBugReducer)
  
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'GET_ALL_STATUS_SAGA'
        })
        dispatch({
            type: 'GET_ALL_PRIORITY_SAGA'
        })
        dispatch({
            type: 'GET_ALL_TASKTYPE_SAGA'
        })
        dispatch({
            type: 'GETLIST_PROJECT_SAGA'
        })
        dispatch({
            type: "SET_SUBMIT_CREATE_PROJECT",
            submitfuncion : handleSubmit
        })

        
    }, [])
    

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: '0',
        timeTrackingRemaing: '0',
    })

    return (
        <div className='container '>
            <div className='form-group'>
                <p>Project</p>
                <select name="projectId" className='form-control' value={values.projectId} onChange={(e)=>{
                   
                    dispatch({
                        type: "GET_USERS_BYPROJECT_SAGA",
                        projectId : e.target.value
                    })
                    setFieldValue('projectId',e.target.value)
                   
                    
                }}>
                   {projectList.map((item,index)=>{
                        return <option key={index} value={item.id}>{item.projectName}</option>
                   })}
                </select>
            </div>
            <div className='form-group'>
                <div className='row mb-2'>
                    <div className='col-6'>
                        <p>Task Name</p>
                        <input name='taskName' className='form-control' onChange={handleChange}/>
                    </div>
                    <div className='col-6'>
                        <p>Status Task</p>
                        <select className='form-control' name='statusId' value={values.statusId} onChange={handleChange}>
                        {arrStatus.map((item, index) => {
                                return <option key={index} value={item.statusId}>{item.statusName}</option>
                            })} 
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <p>Task Type</p>
                        <select className='form-control' value={values.typeId} name='typeId' onChange={(e)=>{
                            setFieldValue('typeId',e.target.value)
                        }}>
                            {arrType.map((item, index) => {
                                return <option key={index}  value={item.id}>{item.taskType}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Priority</p>
                        <select className='form-control' name='priorityId' value={values.priorityId} onChange={handleChange}>
                        {arrPriority.map((item, index) => {
                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                            })} 
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                           
                            placeholder="Please select"
                            
                            onChange={(values)=>{
                                setFieldValue("listUserAsign",values)
                            }}
                            style={{
                                width: '100%',
                            }}
                            options={arrUser.map((user,item)=>{
                                return {label : user.name, value : user.userId}
                            })}
                            // onSelect={(values)=>{
                            //     setFieldValue("listUserAsign",values)
                            // }}
                           
                        />
                    </div>
                    <div className='col-6'>
                        <p>Time Tracking</p>
                        <Slider max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaing)} value={timeTracking.timeTrackingSpent} defaultValue={0} tooltip={{ open: false }} onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Original Estimate</p>
                        <input name='originalEstimate' defaultValue='0' className='form-control' onChange={handleChange}/>
                    </div>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-6'>
                                <p>Time Spend</p>
                                <input name='timeTrackingSpent' className='form-control' defaultValue={0} min='0' onChange={(event) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: event.target.value,
                                        
                                    })
                                    handleChange(event)
                                }} />
                            </div>
                            <div className='col-6'>
                                <p>Time Remaining</p>
                                <input name='timeTrackingRemaining' className='form-control' defaultValue={0} min='0' onChange={(event) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaing: event.target.value,
                                      
                                    })
                                    handleChange(event)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <p>Description</p>
                <Editor
                    name='descriptionCreateTask'
                    // initialValue={values.description}
                    // value={values.description}
                    apiKey='8n50oayin2bzp97moof00naoprj8or9kss104w74509cpnfv'
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
    )
}

const createProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

    
        return {
            

                taskName: "",
                description: "",
                statusId: props.arrStatus[0]?.statusId,
                originalEstimate: 0,
                timeTrackingSpent: 0,
                timeTrackingRemaining: 0,
                projectId: props.projectList[0]?.id,
                typeId: props.arrType[0]?.id,
                priorityId: props.arrPriority[0]?.priorityId,
                listUserAsign: []
                
              
        }
    },

    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: "CREATE_TASK_SAGA",
            newTask: values
        })

    },

    displayName: 'FormCreateTask',
})(FormCreateTask);


const mapStatetoprops = (state) => {
    return {
        arrStatus: state.StatusReducer.arrStatus,
        arrPriority: state.PriorityReducer.arrPriority,
        arrType: state.TypeReducer.arrType,
        projectList : state.ProjectCyberBugReducer.projectList,
        arrUser  : state.UsersCyberBugReducer.arrUser

    }
}

export default connect(mapStatetoprops)(createProjectForm)