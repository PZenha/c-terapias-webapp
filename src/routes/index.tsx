import React from 'react'
import {
	Switch,
	Route,
} from 'react-router-dom'
import { Router } from 'react-router'
import history from '../history'

const Routes = () => (
	<Router history={history}>
		<Switch>
			<Route
				path="/home"
				exact
				component={require('../pages/home').default}
			/>
			<Route
				path="/clients"
				exact
				component={require('../pages/clients-list').default}
			/>
			<Route
				path="/insert"
				exact
				component={require('../pages/insert').default}
			/>
			<Route
				path="/schedule"
				exact
				component={require('../pages/schedule').default}
			/>
			<Route
				path="/client/:id"
				exact
				component={require('../pages/client').default}
			/>
			<Route
				path="/"
				exact
				component={require('../pages/auth/sign-in').default}
			/>
		</Switch>
	</Router>
)

export default Routes
