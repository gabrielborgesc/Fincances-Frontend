import { errorPopUp } from "../../components/toastr"

class HandleErrorService {

    handleError(push, error){
        if(error.response){
            errorPopUp(error.response.data)
        }
        else {
            push('/signUp')
        }
    }

}

export default HandleErrorService