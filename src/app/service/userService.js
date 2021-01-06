import ApiService from "../apiServices";


class UserService extends ApiService {

    constructor() {
        super('/api/users')
    }

    auth(credentials){
        return this.post('/authenticate', credentials)
    }

    signUp(userData){
        return this.post('/signUp', userData)
    }

    getBalance(id){
        return this.get('/balance/' + id)
    }
    getAllUsers() {
        return this.get('/getUsers')
    }
}

export default UserService