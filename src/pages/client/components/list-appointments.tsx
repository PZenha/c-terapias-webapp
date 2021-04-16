import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Paper, Radio } from '@material-ui/core'
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

const ListAppointments:FC<{appointments: IAppointment[]}> = ({appointments}) => {
    
	const appts = appointments.slice().sort((a,b) => moment(b.scheduled_to).valueOf() - moment(a.scheduled_to).valueOf()).reverse()

	return(
		<>
        	<div style={{width:'100%', marginTop:'16px'}} className="appointments-list">
				{appts.map((app)=> (
					<>
						
						<Paper style={{marginBottom:'15px'}} elevation={2}>
							<div className='paper-wrapper'>
								<h4 >{moment(app.scheduled_to).utc().format('DD/MM/YYYY - HH:mm')}</h4>
								<Radio value={true} />
							</div>
						</Paper>
					
						
					</>
				))}
			</div>
		</>
	)
}

export default ListAppointments