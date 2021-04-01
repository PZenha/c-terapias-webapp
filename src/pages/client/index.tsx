import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import MainLayout from '../../layout/main-layout'
import ObsModal from './components/obs-model'
import { useQuery, gql } from '@apollo/client'
//import nl2br from 'nl2br'

import { Card, CardContent } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone'
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone'
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone'
import PhoneIphoneTwoToneIcon from '@material-ui/icons/PhoneIphoneTwoTone'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { ISearchClientsQueryResult } from '../../types'
import getClient from '../../graphql/queries/get-client'
import './client-info.scss'


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		heading: {
			fontSize: theme.typography.pxToRem(16),
			flexBasis: '33.33%',
			flexShrink: 0,
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
	}),
)

const FIND_CLIENT = gql`
  query findClient($_id: ID) {
    client: findClient(_id: $_id) {
      _id
      name
      dob
      email
      phone
      address {
        city
        zipcode
        street
      }
      advisedBy
      observations{
        _id
       description
       created_at
      }
    }
  }
`


const ClientView: FC = () => {
	const [openModal, setOpenModal] = useState(false)
	const classes = useStyles()
	console.log('ui')
	//const [client, setClient] = useState<ISearchClientsQueryResult | null>(null)
	const params = useParams<{id: string}>()
	const _id = params?.id

	console.log(params)

	const { data } = useQuery<{client: ISearchClientsQueryResult}>(FIND_CLIENT, { variables: {_id}})
	const client = data?.client
      
	const observations = client?.observations.slice().sort((a,b) => +new Date(b.created_at) - +new Date(a.created_at))
	const info = [
		{
			icon: <EventTwoToneIcon fontSize='large' color='primary' />,
			info: `${moment(client?.dob).format('DD/MM/YYYY')} - ${moment().diff(client?.dob, 'years')} anos`
		},
		{
			icon: <EmailTwoToneIcon fontSize='large' color='primary'/>,
			info: client?.email || ''
		},
		{
			icon: <PhoneIphoneTwoToneIcon fontSize='large' color='primary' />,
			info: client?.phone || ''
		},
		{
			icon: <LocationOnTwoToneIcon fontSize='large' color='primary' />,
			info: `${client?.address?.street || ''}, ${client?.address?.city || ''}  ${client?.address?.zipcode || ''}`
		}
	]

	return(
		<>
			<div className="content-grid">
				<div className="cards-wrapper">
					<div className="card">
						<Card>
							<CardContent>
								<div className="card-wrapper">
									<h2>{client?.name}</h2>
									<div className="info-wrapper-column">
										{info.map((i) => (
											i.info && (
												<InfoWrapper icon={i.icon} info={i.info}/>
											)
										))}
           
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

    
				</div>            

				<div className="accordion">
					<div className="add-obs-wrapper" onClick={() => setOpenModal(true)}>
						<AddCircleIcon color="primary" fontSize='large'/>
						<span>Adicionar nova observação</span>
					</div>
          
					{(observations || []).map( (obs, index) => (
						<>
							<Accordion defaultExpanded={index === 0}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									id={obs._id}
								>
									<Typography className={classes.heading}>{moment(obs.created_at).format('DD/MM/YYYY HH:mm')}</Typography>
									<Typography className={classes.secondaryHeading}>{`${obs.description.toString().slice(0,40)}...`}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<span>{obs.description}</span>
								</AccordionDetails>
							</Accordion>
						</>
					))}
				</div>
			</div>

			<ObsModal 
				openModal={openModal} 
				handleClose={() =>  setOpenModal(false)} 
				client_id={client?._id || ''} 
				refetchData={(data) => console.log(data)}
			/>
		</>
	)
}


const InfoWrapper: FC<{icon: JSX.Element, info: string}> = ({icon, info}) => (
	<div className="info-wrapper">
		{icon}
		<span>{info}</span>
	</div>
)

export default MainLayout(ClientView)