import React from 'react'
import Login from '../views/login';
import SingUp from '../views/signUp'

import { Route, Switch, HashRouter } from 'react-router-dom'

function Routes(){
    return (
        <HashRouter>
            <Switch>
                <Route path = "/login" component = {Login} />
                <Route path = "/signUp" component = {SingUp} />
            </Switch>
        </HashRouter>
    )
}

export default Routes