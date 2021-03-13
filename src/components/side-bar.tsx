import React, { FC } from 'react'
import { RouteProps, Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/Add'
import PersonIcon from '@material-ui/icons/Person'
import EventIcon from '@material-ui/icons/Event'
import '../App.css'

const sideBarData = [
	{
		title: 'Página principal',
		icon: <HomeIcon />,
		link: '/home',
	},
	{
		title: 'Inserir',
		icon: <AddIcon />,
		link: '/insert',
	},
	{
		title: 'Clientes',
		icon: <PersonIcon />,
		link: '/clients',
	},
	{
		title: 'Marcações',
		icon: <EventIcon />,
		link: '/schedule',
	},
]

const SideBar: FC = () => {
	return (
		<>
			<div className="SideBar">
				<ul className="SideBarList">
					{sideBarData.map((val, key) => {
						return (
							<Link to={val.link}>
								<li
									key={key}
									className="SideBarRow"
									id={
										window.location.pathname === val.link
											? 'active'
											: ''
									}
								>
									<div id="icon">{val.icon}</div>
									<div id="title">{val.title}</div>
								</li>
							</Link>
						)
					})}
				</ul>
			</div>
		</>
	)
}

export default SideBar
