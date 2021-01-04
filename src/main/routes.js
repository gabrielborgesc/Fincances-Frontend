import React from 'react'
import Login from '../views/login';
import SingUp from '../views/signUp'
import Home from '../views/home'
import SearchEntry from '../views/entry/searchEntry'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

const auth = () => {
    return true;
}

function AuthRoute( {component: Component, ...props} ) {

    return(
        <Route {...props} render={(componentProps) => {
            if(auth()) {
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

function Routes(){
    return (
        <HashRouter>
            <Switch>
                <Route path = "/login" component = {Login} />
                <Route path = "/signUp" component = {SingUp} />
                <AuthRoute path = "/home/:name?/:email?" component = {Home} />
                <AuthRoute path = "/searchEntry" component = {SearchEntry} />
            </Switch>
        </HashRouter>
    )
}

export default Routes