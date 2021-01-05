import axios from 'axios'

const httpClient = axios.create({
    // baseURL: 'http://192.168.1.50:8080'
    baseURL: 'https://spring-finances-api.herokuapp.com'
})

class ApiService {

    constructor(api_url){
        this.api_url = api_url
    }

    post(url, object){
        return httpClient.post(this.api_url + url, object)
    }

    put(url, object){
        return httpClient.put(this.api_url + url, object)
    }

    delete(url){
        return httpClient.delete(this.api_url + url)
    }

    get(url){
        return httpClient.get(this.api_url + url)
    }
}

export default ApiService