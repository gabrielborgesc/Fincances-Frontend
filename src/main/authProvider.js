import React from 'react'
import AuthService from '../app/service/authService'
import JwtService from '../app/service/jwtService'
import UserService from '../app/service/userService'
import * as popUp from '../components/toastr'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
const AuthProvider = AuthContext.Provider


class AuthenticationProvider extends React.Component {

    constructor(){
        super();
        this.jwtService = new JwtService();
    }

    state = {
        userLoggedIn: AuthService.userLoggedIn(),
        isAuth: AuthService.isUserLoggedIn()
    }
    
    beginSession = (data) => {
        const user = data.user
        const token = data.token
        AuthService.login(user, token)
        this.setState({isAuth: true, userLoggedIn: user})
    }

    endSession = () => {
        AuthService.logOut()
        this.setState({isAuth: false, userLoggedIn: null})
    }

    checkSessionExpirationTime = () => {
        if(AuthService.token()){
            this.jwtService.checkSession()
            .then(response => {
            }).catch(error => {
                this.endSession()
                popUp.warningPopUp('Login Expirado')
            })
        }
    }

    render() {

        const context = {
            userLoggedIn: this.state.userLoggedIn,
            isAuth: this.state.isAuth,
            beginSession: this.beginSession,
            endSession: this.endSession,
            checkSessionExpirationTime: this.checkSessionExpirationTime
        }

        return (
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default AuthenticationProvider