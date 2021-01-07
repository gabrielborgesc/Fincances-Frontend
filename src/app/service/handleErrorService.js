import { warningPopUp, errorPopUp } from "../../components/toastr"

class HandleErrorService {

    static handleError(push, error){
        var expiredTokenError = false
        const response = error.response
        if(response){
            if(response.status === 401){
            push('/login')
            warningPopUp('Login expirado')
            expiredTokenError = true
             }
            else {
                errorPopUp(response.data)
            }
        }
        return expiredTokenError
    }

}

export default HandleErrorService