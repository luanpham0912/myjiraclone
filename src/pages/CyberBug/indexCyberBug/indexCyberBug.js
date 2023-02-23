import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import ReactHtmlParser from 'react-html-parser';
import parse from 'html-react-parser'
import { Avatar } from 'antd'


export default function IndexCyberBug(props) {


    const {projectDetail} = useSelector(state => state.ProjectReducer)
    
    const dispatch = useDispatch();
    useEffect(() => {
        let {projectId} = props.match.params
        dispatch({
            type: "GET_PROJECT_DETAIL_SAGA",
            projectId
        })
    }, [])
    
    const renderAvatarMembers = () => {
        return projectDetail.members?.map((member,index) => {
            return  <div key={index} className="avatar">
            <img src={member.avatar} alt='1' />
        </div>
        })
    }

    const renderCardTaskList = () =>{
        return projectDetail.lstTask?.map((task,index)=>{
            return  <div key={task.statusId} className="card pb-2 " style={{ width: '15rem', height: 'auto' }}>
            <div className="card-header font-weight-bold">
             {task.statusName}
            </div>
            <ul className="list-group list-group-flush">
                {task.lstTaskDeTail.map((taskDt,index)=>{
                    return <li key={index} className="list-group-item " data-toggle="modal" data-target="#infoModal" onClick={() => {
                        dispatch({
                            type:"GET_TASK_DETAIL_SAGA",
                            taskId : taskDt.taskId
                        })
                        dispatch({
                            type: "GET_ALL_COMMENT_SAGA",
                            taskId : taskDt.taskId
                        })
                    }}>
                    <p>
                       {taskDt.taskName}
                    </p>
                    <div className="block" style={{ display: 'flex' }}>
                        <div className="block-left">
                               <p className='text-danger'> {taskDt.priorityTask.priority}</p>
                        </div>
                        <div className="block-right">
                            <div className="avatar-group" style={{ display: 'flex' }}>
                                {taskDt.assigness.slice(0,3).map((mem,index)=> {
                                    return <div key={index } className="avatar">
                                    <img src={mem.avatar} alt='1' />
                                </div>
                                })}
                                  {taskDt.assigness?.length > 3 ? <Avatar style={{width : "40px", height:"40px"}}>...</Avatar> : ''}
                            </div>
                        </div>
                    </div>
                </li>
                })}
            </ul>
        </div>
        })
    }


    return (

        <div className="main">
            <div className="header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                        <li className="breadcrumb-item">Project</li>
                        <li className="breadcrumb-item">CyberLearn</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {projectDetail.projectName}
                           
                        </li>
                    </ol>
                </nav>
            </div>
            {/* <h3>{projectDetail.projectName}</h3> */}
            {parse(`${projectDetail.description}`)}
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatarMembers()}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
            <div className="content" style={{ display: 'flex' }}>
                {renderCardTaskList()}

            </div>
        </div>

    )
}
