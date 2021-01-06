class SessionStorageService {

    static addItem(key, value){
        const now = new Date()
        const item = {
            value: value,
            // expiration: now.getTime() + 1*3600*1000 //1 hora em ms
            expiration: now.getTime() + 5000 //1 hora em ms
        }
        sessionStorage.setItem(key, JSON.stringify(item))
    }

    static getItem(key){
        const now = new Date()
        const item = JSON.parse(sessionStorage.getItem(key))
        if(!item || item.expiration <= now.getTime()){
            this.removeItem(key)
            return null
        }
            return item.value
        
    }

    static removeItem(key){
        sessionStorage.removeItem(key)
    }

}

export default SessionStorageService