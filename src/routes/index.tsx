import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={require('../pages/home').default} />
            <Route path="/clients" exact component={require('../pages/clients-list').default} />
            <Route path="/insert" exact component={require('../pages/insert').default}/>
            <Route path="/schedule" exact component={require('../pages/schedule').default}/>
        </Switch>
    </Router>
)

export default Routes