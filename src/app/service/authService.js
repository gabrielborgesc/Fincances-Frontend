import LocalStorageService from './localStorageService'
import SessionStorageService from './sessionStorageService'

export const userLoggedIn = 'userLoggedIn'

export default class AuthService {

    static isUserLoggedIn(){
        // const user = LocalStorageService.getItem(userLoggedIn)
        const user = SessionStorageService.getItem(userLoggedIn)
        return user && user.id
    }

    static userLoggedIn(){
        // return LocalStorageService.getItem(userLoggedIn)
        return SessionStorageService.getItem(userLoggedIn)
    }

    static login(user) {
        // LocalStorageService.addItem(userLoggedIn, user)
        SessionStorageService.addItem(userLoggedIn, user)
    }

    static logOut(){
        // LocalStorageService.removeItem(userLoggedIn)
        SessionStorageService.removeItem(userLoggedIn)
    }

}