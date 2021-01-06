import { warningPopUp, errorPopUp } from "../../components/toastr"

class HandleErrorService {

    static handleError(push, error){
        const response = error.response
        if(response){
            if(response.status === 401){
            push('/login')
            warningPopUp('Login expirado')
             }
            else {
                errorPopUp(response.data)
            }
        }
    }

}

export default HandleErrorService