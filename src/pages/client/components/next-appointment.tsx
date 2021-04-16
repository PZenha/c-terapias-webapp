import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Card, CardContent } from '@material-ui/core'
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ScheduleIcon from '@material-ui/icons/Schedule'
import moment from 'moment'
import InfoWrapper from '../../../components/info-wrapper'
import { IAppointment } from '../../../types'


import '../client-info.scss'

const FIND_APPOINTMENT_BY_CLIENT_ID = gql`
    query FindAppointmentByClientID($client_id: ID){
        appointments: findAppointmentByClient(client_id: $client_id){
            _id
            scheduled_to
        }
    }
`

const NextAppointment:FC<{appointments: IAppointment[], }> = ({appointments}) => {
	const today = moment().utc().toDate()
 
	const closest = appointments.reduce((a, b) => +new Date(a) - +today < +b.scheduled_to - +today ? new Date(a) : b.scheduled_to ,new Date()) || null

	return(
		<>
        	<div style={{marginRight:'25px'}} className="card">
				<Card style={{minHeight:'100%'}}>
					<CardContent style={{minHeight:'100%'}}>
						<div className="card-wrapper">
							
							{appointments.length > 0 ? (
								<>
									<h2 style={{color:'#58a832'}}>Próxima marcação</h2>
									<div className="info-wrapper-column">
										<InfoWrapper 
											info={moment(closest).utc().format('DD/MM/YYYY - HH:mm').toString() }
										/>
									</div> 
								</>): <h2 style={{color:'#757575'}}>Não tem marcações</h2> }
						</div>

					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default NextAppointment