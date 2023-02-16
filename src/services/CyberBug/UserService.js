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
    getAllUser = () => {
        return this.get(`Users/getUser`)
    }
    getUserByProject = (projectId) => {
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`)
    }
}

export const userService = new UserService()