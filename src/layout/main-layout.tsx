import React from 'react'
import { RouteProps } from 'react-router-dom'
import NavBar from '../components/navbar'
import SideBar from '../components/side-bar'

const MainLayout = (Component: React.ComponentType<any>) => ({
	children,
}: RouteProps) => {
	return (
		<>
			<SideBar />

			<Component>{children}</Component>
		</>
	)
}

export default MainLayout
