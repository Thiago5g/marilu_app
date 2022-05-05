import React from 'react'

import { Router, Switch, Route } from 'react-router'

import Admin from '../layouts/Admin/Admin'
import Login from '../layouts/Login/Login'

const Routes = () => (
    <Routes>
        <Switch>
            <Route component={Login} exact path="/login" />
            <Route component={Admin} exact path="/"/>
        </Switch>
    </Routes>
)