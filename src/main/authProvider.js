import React from 'react'
import AuthService from '../app/service/authService'
import * as popUp from '../components/toastr'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
const AuthProvider = AuthContext.Provider


class AuthenticationProvider extends React.Component {

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