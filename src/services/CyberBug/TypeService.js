import { BaseService } from "./BaseService";


export class TypeService extends BaseService{
    constructor (){
        super()
    }
    getAllType = () => {
        return this.get(`TaskType/getAll`)
    }
    
}
export const typeService = new TypeService()