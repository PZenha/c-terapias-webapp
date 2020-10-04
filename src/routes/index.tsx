import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={require('../pages/insert').default} />
            <Route path="/clients-list" exact component={require('../pages/clients-list').default} />
        </Switch>
    </Router>
)

export default Routes