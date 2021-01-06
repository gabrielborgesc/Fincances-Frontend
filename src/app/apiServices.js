import axios from 'axios'
import AuthService from './service/authService'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: 'http://58413d165c54.ngrok.io',
    // baseURL: 'https://sprnping-finances-api.herokuapp.com',

})

class ApiService {

    constructor(api_url){
        this.api_url = api_url
    }

    post(url, object){
        const token = AuthService.userLoggedIn() ? AuthService.userLoggedIn().token : ''
        return httpClient.post(this.api_url + url, object, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
            )
    }

    put(url, object){
        const token = AuthService.userLoggedIn() ? AuthService.userLoggedIn().token : ''
        return httpClient.put(this.api_url + url, object, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    delete(url){
        const token = AuthService.userLoggedIn() ? AuthService.userLoggedIn().token : ''
        return httpClient.delete(this.api_url + url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    get(url){
        const token = AuthService.userLoggedIn() ? AuthService.userLoggedIn().token : ''
        console.log(token)
        return httpClient.get(this.api_url + url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
            )
    }
}

export default ApiService