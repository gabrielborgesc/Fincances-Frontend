import React from 'react'
import Login from '../views/login'
import SingUp from '../views/signUp'
import Home from '../views/home'
import SearchEntry from '../views/entry/searchEntry'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import { AuthConsumer } from './authProvider'


function AuthRoute( {component: Component, isAuth, checkSession, ...props} ) {

    return(
        <Route {...props} render={(componentProps) => {

            if(props.path === '/'){
                if(isAuth){
                    return (
                        <Redirect to={ {pathname: '/home', state: {from: componentProps.location} } } />
                    )
                }
                else {
                    return (
                        <Redirect to={ {pathname: '/login', state: {from: componentProps.location} } } />
                    )
                }
            }
            else if(isAuth) {
                return (
                    <Component {...componentProps} />
                ) 
            } else{
                return(
                    <Redirect to={ {pathname: '/login', state: {from: componentProps.location} } } />
                )
            }
        } } />
    )
    
}

function Routes(props){
    return (
        <HashRouter>
            <Switch>
                <Route path = "/login" component = {Login} />
                <Route path = "/signUp" component = {SingUp} />
                <AuthRoute isAuth={props.isAuth} checkSession={props.checkSession} path = "/home/:name?/:email?" component = {Home} />
                <AuthRoute isAuth={props.isAuth} checkSession={props.checkSession} path = "/searchEntry" component = {SearchEntry} />
                <AuthRoute isAuth={props.isAuth} checkSession={props.checkSession} path = "/" />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => ( <Routes isAuth={context.isAuth} checkSession={context.checkSessionExpirationTime}/> ) }
    </AuthConsumer>
)