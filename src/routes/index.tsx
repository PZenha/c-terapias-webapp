import React, { FC } from 'react'
import {
	Switch,
	Route,
} from 'react-router-dom'
import { Router, RouteProps, Redirect } from 'react-router'
import decode from 'jwt-decode'
import history from '../history'
import { getTokens } from '../store/authentication'

const checkAuth = () =>{
	const { accessToken, refreshToken } = getTokens() 
	if(!accessToken || !refreshToken){
		return false
	}

	try{
		const decoded: { exp: number } = decode(accessToken)
		if(decoded.exp < new Date().getTime() / 1000){
			return false
		}
	}catch(err){
		return false
	}

	return true
}

const AuthRoute: FC<RouteProps & {
	component: any
	shielded: boolean
}> = ({component: Component, shielded ,...RouteProps}) => (
	<Route render={props => (
		shielded ? (checkAuth() ? (<Component {...props}/>) : (<Redirect to={{pathname: '/'}} />)) : (
			(!checkAuth() ? (<Component {...props}/>) : (<Redirect to={{pathname: '/home'}} />))
		)
	)}/>
)

const Routes = () => (
	<Router history={history}>
		<Switch>
			<AuthRoute
				shielded
				path="/home"
				exact
				component={require('../pages/home').default}
			/>
			<AuthRoute
				shielded
				path="/clients"
				exact
				component={require('../pages/clients-list').default}
			/>
			<AuthRoute
				shielded
				path="/insert"
				exact
				component={require('../pages/insert').default}
			/>
			<AuthRoute
				shielded
				path="/schedule"
				exact
				component={require('../pages/schedule').default}
			/>
			<AuthRoute
				shielded
				path="/client/:id"
				exact
				component={require('../pages/client').default}
			/>
			<AuthRoute
				shielded={false}
				path="/sign-in"
				exact
				component={require('../pages/auth/sign-in').default}
			/>
			<Redirect to={{pathname: '/home'}}/>
		</Switch>
	</Router>
)

export default Routes
