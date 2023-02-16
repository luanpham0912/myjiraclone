import { BaseService } from "./BaseService";

export class CommentService extends BaseService {
    constructor (){
        super();
    }
    insertComment = (newComment) => {
        return this.post(`Comment/insertComment`,newComment);
    }
    removeComment = (idComment) => {
        return this.delete(`Comment/deleteComment?idComment=${idComment}`)
    }
    getAllComment = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`)
    }
    editComment = (id,newComt) => {
        return this.put(`Comment/updateComment?id=${id}&contentComment=${newComt}`)
    }
}


export const commentService = new CommentService()