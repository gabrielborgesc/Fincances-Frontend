class SessionStorageService {

    static addItem(key, value){
        const now = new Date()
        sessionStorage.setItem(key, JSON.stringify(value))
    }

    static getItem(key){
        const value = JSON.parse(sessionStorage.getItem(key))
        return value
        
    }

    static removeItem(key){
        sessionStorage.removeItem(key)
    }

}

export default SessionStorageService