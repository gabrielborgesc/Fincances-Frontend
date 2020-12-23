import ApiService from "../apiServices";


class UserService extends ApiService {

    constructor() {
        super('/api/users')
    }

    auth(credentials){
        return this.post('/auth', credentials)
    }

    signUp(userData){
        return this.post('/signUp', userData)
    }

    getBalance(id){
        return this.get("/balance/" + id)
    }
}

export default UserService