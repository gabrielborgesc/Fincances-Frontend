import ApiService from "../apiServices";


class UserService extends ApiService {

    constructor() {
        super('/api/users')
    }

    signUp(userData){
        return this.post('/signUp', userData)
    }

    getBalance(){
        return this.get('/balance')
    }
    getAllUsers() {
        return this.get('/getUsers')
    }

    changePassword(userData){
        return this.put('/changePassword', userData)
    }

    getUserFromHash(hash){
        let params = `?`
        params = `${params}&hash=${hash}`
        return this.get(`/getUserFromHash${params}`)
    }

    redefinePassword(hash, userData){
        let params = `?`
        params = `${params}&hash=${hash}`
        return this.put(`/redefinePassword${params}`, userData)
    }

}

export default UserService