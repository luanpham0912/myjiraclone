import { BaseService } from "./BaseService";

export class TaskService extends BaseService {
    constructor (){
        super();
    }
    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }
    updateTask = (taskUpdate) => {
        return this.post(`Project/updateTask`,taskUpdate)  
    }
    createTask = (newTask) => {
        return this.post(`Project/createTask`,newTask)
    }   
     removeTask = (taskId) => {
        return this.delete(`Project/removeTask?taskId=${taskId}`)
    }
}


export const taskService = new TaskService()