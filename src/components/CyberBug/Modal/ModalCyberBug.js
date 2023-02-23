import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import parse from 'html-react-parser'
import { Editor } from '@tinymce/tinymce-react'
import { Select } from 'antd';
export default function ModalCyberBug(props) {

    const { taskDetailModal } = useSelector(state => state.TaskReducer)
    const { projectDetail } = useSelector(state => state.ProjectReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer)
    const { arrType } = useSelector(state => state.TypeReducer)
    const { arrComt } = useSelector(state => state.CommentReducer)
    const { editComt } = useSelector(state => state.CommentReducer)


    const dispatch = useDispatch()
    const [visible, setVisible] = useState(true)
    const [content, setcontent] = useState(taskDetailModal.description)
    const [comment, setComment] = useState('')
    const [isvisible, setIsVisible] = useState(true)
    const [isvisibleEdit, setIsVisibleEdit] = useState(false)

    useEffect(() => {
        setComment(editComt.contentComment)
    }, [editComt])

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
    }, [])


    const renderTimeTracking = () => {
        const { timeTrackingRemaining, timeTrackingSpent } = taskDetailModal;
        const max = Number(timeTrackingRemaining) + Number(timeTrackingSpent)
        const persent = Math.round((Number(timeTrackingSpent) / max) * 100)
        return <div style={{ display: 'flex' }}>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${persent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                    <p className="estimate-time">{Number(timeTrackingRemaining)}h estimated</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input style={{ width: "40%" }} name='timeTrackingSpent' value={timeTrackingSpent} onChange={handChange} />
                    <input style={{ width: "40%" }} name='timeTrackingRemaining' value={timeTrackingRemaining} onChange={handChange} />

                </div>

            </div>
        </div>
    }

    const handChange = (e) => {
        dispatch({
            type: 'UPDATE_TASK_SAGA_API',
            typeSaga: "CHANGE_TASK_MODAL",
            value: e.target.value,
            name: e.target.name
        })
    }


    const renderDescription = () => {
        const jsxDescription = parse(`${taskDetailModal.description}`)
        return <div style={{ cursor: "pointer" }}>
            {visible ? <div className='py-2' onClick={() => { setVisible(false) }}>{jsxDescription}</div> : <div>
                <Editor

                    name='description'
                    apiKey='8n50oayin2bzp97moof00naoprj8or9kss104w74509cpnfv'
                    onEditorChange={(newValue, editor) => {
                        setcontent(newValue)

                        //   setFieldValue('description',newValue)
                        // setValue(newValue);
                        // setText(editor.getContent({format: 'text'}));
                    }}
                    // initialValue=""
                    initialValue={taskDetailModal.description}
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
                <div className='mt-2' >
                    <button className='btn btn-primary mr-2' onClick={() => {
                        setVisible(true)
                        dispatch({
                            type: 'UPDATE_TASK_SAGA_API',
                            typeSaga: "CHANGE_TASK_MODAL",
                            value: content,
                            name: 'description'
                        })
                    }}>Lưu</button>
                    <button className='btn btn-danger ' onClick={() => { setVisible(true) }}>Đóng</button>
                </div>
            </div>
            }

        </div>
    }



    const handleSubmit = (e) => {
        e.preventDefault()

        if (comment !== '') {
            dispatch({
                type: "INSERT_COMMENT_SAGA",
                newComment: {
                    taskId: taskDetailModal.taskId,
                    contentComment: comment,

                }
            })
            setComment('')
            setIsVisible(true)
        } else {
            return
        }

    }


    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">

                            <i className="fa fa-bookmark" />
                            <select value={taskDetailModal?.typeId} name='typeId' onChange={handChange} style={{ outline: "none", border: "none" }}>
                                {arrType.map((item, index) => {
                                    return <option key={item.id} value={item.id}>{item.taskType}</option>
                                })}
                            </select>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fa fa-location-arrow"></i>
                                <span style={{ paddingRight: 20 }}> Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}> Copy link</span>
                            </div>
                            <i onClick={() => {
                                if(window.confirm(`You want to remove task: " ${taskDetailModal.taskName} " ?`)){
                                    dispatch({
                                        type: "REMOVE_TASK_SAGA",
                                        taskDetailModal: taskDetailModal
                                    })
                                }
                            }} className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">{taskDetailModal.taskName}</p>
                                    <div className="description">
                                        <p className='font-weight-bold'>Description</p>
                                        {renderDescription()}
                                    </div>

                                    <div className="comment mt-2">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={require("../../..//assets/img/download (1).jfif")} alt='1' />
                                            </div>
                                            <div className="input-comment" >
                                                {isvisible ? <input type="text" defaultValue='' className='form-control' placeholder="Add a comment ..." onClick={() => { setIsVisible(false) }} /> : <Editor
                                                    name='Comment'
                                                    // initialValue={values.description}
                                                    value={comment}
                                                    apiKey='8n50oayin2bzp97moof00naoprj8or9kss104w74509cpnfv'
                                                    onEditorChange={(newValue, editor) => {
                                                        setComment(newValue)
                                                        // setFieldValue('description', newValue)
                                                        // setValue(newValue);
                                                        // setText(editor.getContent({format: 'text'}));
                                                    }}

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
                                                />}
                                                {isvisibleEdit ? <button type='button' style={{ fontSize: "12px" }} className='mr-2 btn btn-outline-success mt-2 ' onClick={() => {
                                                    setIsVisibleEdit(false)
                                                    setIsVisible(true)
                                                    dispatch({
                                                        type: "EDIT_COMMENT_SAGA",
                                                        id: editComt.id,
                                                        newComt: comment
                                                    })
                                                    setComment('')

                                                }}>Edit</button> : <button type='submit' style={{ fontSize: "12px" }} className='mt-2 mr-2 btn btn-outline-primary' onClick={handleSubmit}>Comment</button>}

                                                <button type='button' onClick={() => {
                                                    setIsVisible(true)
                                                    setIsVisibleEdit(false)
                                                    dispatch({
                                                        type: "EDIT_COMMENT",
                                                        editComt: ''
                                                    })
                                                }} style={{ fontSize: "12px" }} className='btn btn-outline-danger mt-2 '>Cancel</button>

                                            </div>
                                        </div>
                                        <div className="Comment ">
                                            {arrComt.slice(0).reverse().map((cmt, index) => {
                                                return <div key={cmt.id} className="comment-item mt-2">
                                                    <div className="display-comment" style={{ display: 'flex' }}>
                                                        <div className="avatar">
                                                            <img src={cmt.user.avatar} alt='1' />
                                                        </div>
                                                        <div>
                                                            <p style={{ marginBottom: 5, fontSize: "12px", fontWeight: "bold" }}>
                                                                {cmt.user.name}
                                                            </p>
                                                            <div style={{ marginBottom: 1 }}>
                                                                {parse(`${cmt.contentComment}`)}
                                                            </div>
                                                            <div className='d-flex' style={{ fontSize: "12px", cursor: "pointer" }}>
                                                                <div className='mr-2 text-primary' onClick={() => {
                                                                    setIsVisible(false)
                                                                    setIsVisibleEdit(true)
                                                                    dispatch({
                                                                        type: "EDIT_COMMENT",
                                                                        editComt: cmt
                                                                    })
                                                                }}>Edit</div>
                                                                <div className='text-danger' onClick={() => {
                                                                    dispatch({
                                                                        type: "REMOVE_COMMENT_SAGA",
                                                                        idComment: cmt.id
                                                                    })
                                                                }}>Delete</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select" value={taskDetailModal?.statusId} name='statusId' onChange={
                                            handChange
                                        }>
                                            {arrStatus.map((status, index) => {
                                                return <option key={status.statusId} value={status.statusId}>{status.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className='row'>
                                            {taskDetailModal.assigness.map((mem, index) => {
                                                return <div style={{ backgroundColor: "gray", margin: "auto", maxWidth: "45%", borderRadius: "4px" }} key={index} className="col-6 mt-2 p-1">
                                                    <img style={{ width: 30, marginRight: "5px", borderRadius: "50%" }} src={mem.avatar} alt='1' />
                                                    <span style={{ fontSize: "12px" }}>
                                                        {mem.name}
                                                        <span onClick={() => {
                                                            dispatch({
                                                                type: 'UPDATE_TASK_SAGA_API',
                                                                typeSaga: "REMOVE_USER_ASSIGNESS",
                                                                userId: mem.id
                                                            })
                                                        }} style={{ fontSize: "16px", padding: "10px", cursor: "pointer", fontWeight: "bold" }}>x</span>
                                                    </span>
                                                </div>
                                            })}
                                            <Select

                                                style={{
                                                    width: "50%",
                                                    margin: "10px 0",
                                                    display: "block"
                                                }}

                                                defaultValue='+ ADD MORE'

                                                options={projectDetail.members?.filter(mem => {
                                                    let index = taskDetailModal.assigness?.findIndex(item => item.id === mem.userId)
                                                    if (index !== -1) {
                                                        return false
                                                    }
                                                    return true
                                                }).map((item, index) => {
                                                    return { label: item.name, value: item.userId }
                                                })
                                                }
                                                optionFilterProp="label"
                                                onSelect={(value) => {
                                                  
                                                    if (value === "0") {
                                                        return;
                                                    }
                                                    let userSelected = projectDetail.members?.find(mem => mem.userId == value);
                                                    userSelected = { ...userSelected, id: userSelected.userId }
                                                    dispatch({
                                                        type: 'UPDATE_TASK_SAGA_API',
                                                        typeSaga: 'CHANGE_ASSIGNESS',
                                                        userSelected
                                                    })
                                                }}

                                            />
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select value={taskDetailModal?.priorityId} name='priorityId' onChange={handChange}>
                                            {arrPriority.map((item, index) => {
                                                return <option key={item.priorityId} value={item.priorityId}>{item.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" value={taskDetailModal.originalEstimate} name='originalEstimate' className="estimate-hours" onChange={handChange} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTimeTracking()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
