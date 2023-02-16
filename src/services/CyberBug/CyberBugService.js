import Axios from "axios"
import {DOMAIN_CYBERBUG, TOKEN} from '../../util/constants/settingSystem'

export const cyberbugService = {
    signinCyberBug  : (userLogin) =>{
       return Axios({
            url: `${DOMAIN_CYBERBUG}/users/signin`,
            method : "POST",
            data: userLogin
        })
    },
    signupCyberBug  : (userRegister) =>{
        return Axios({
             url: `${DOMAIN_CYBERBUG}/users/signin`,
             method : "POST",
             data: userRegister
         })
     },
    getAllProjectCategory : () => {
        return Axios({
            url : `${DOMAIN_CYBERBUG}/ProjectCategory`,
            method : "GET"
        })
    },
    createProjectAuthorization : (newProject) =>{
        return Axios({
            url : `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
            method : "POST",
            data : newProject,
            headers :{
                "Authorization" : "Bearer " + localStorage.getItem(TOKEN)
            }

        })
    },
    getAllProjecAuthorization : () => {
        return Axios ({
            url : `${DOMAIN_CYBERBUG}/Project/getAllProject`,
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem(TOKEN)
            }
        })
    },
    updateProject :(projectUpdate) => {
        return Axios ({
            url : `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
            method : "PUT",
            data :  projectUpdate,

            headers :{
                "Authorization" : "Bearer " + localStorage.getItem(TOKEN)
            }
        })
    }

}