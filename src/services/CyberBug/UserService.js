import { BaseService } from "./BaseService";

export class UserService extends BaseService {
    constructor (){
        super();
    }
    getUser = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`);
    }
    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`,userProject)
    }
    removeUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`,userProject)
    }
    getAllUser = (keyword) => {
     
            return this.get(`Users/getUser?keyword=${keyword}`)


    }
    getUserByProject = (projectId) => {
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`)
    }
    editUser = (user) => {
        return this.put(`Users/editUser`,user)
    }
    deleteUser = (id) =>{
        return this.delete(`Users/deleteUser?id=${id}`)
    }
}

export const userService = new UserService()