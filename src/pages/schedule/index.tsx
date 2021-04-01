import React, { FC, useState, memo } from 'react'
import { Paper } from '@material-ui/core'
import moment from 'moment'
import MainLayout from '../../layout/main-layout'
import { gql, useQuery } from '@apollo/client'
import { AppointmentModel, ViewState, SchedulerDateTime } from '@devexpress/dx-react-scheduler'
import {
	Scheduler, WeekView, Appointments, Resources, Toolbar, DateNavigator
} from '@devexpress/dx-react-scheduler-material-ui'


// const resources = [{
// 	fieldName: 'type',
// 	title: 'Type',
// 	instances: [
// 		{ id: 'private', text: 'Private', color: '#EC407A' },
// 		{ id: 'work', text: 'Work', color: '#7E57C2' },
// 	],
// }]

interface IAppointmentsRes {
	scheduled_to: Date
	clientName: string
}

const APPOINTMENTS_QUERY = gql`
	query getAppointments($starts_at: Date, $ends_at: Date){
		appointments: findAppointmentByTimeInterval(starts_at: $starts_at, ends_at: $ends_at){
			client_id
			_id
			scheduled_to
			clientName
		}
	}
`

const Schedule: FC = () => {
	const [currentDate, setCurrentDate] = useState<SchedulerDateTime>(moment().toDate())
	const appointments: AppointmentModel[] = []

	 const res = useQuery<{appointments: IAppointmentsRes[]}, {starts_at: Date, ends_at: Date}>(APPOINTMENTS_QUERY,{
		 variables: {
			 starts_at: moment(currentDate).startOf('week').toDate(),
			 ends_at: moment(currentDate).endOf('week').toDate()
		 }
	 })

	 res.data?.appointments.map((app) => appointments.push(...appointments, {
		 startDate: moment(app.scheduled_to).toDate(),
		 endDate: moment(app.scheduled_to).add(30, 'minutes').toDate(),
		 title: app.clientName,
	}))
		

		
	return (
		<div style={{width:'100%'}}>
			<Paper style={{margin:'20px'}}>
				<Scheduler
					data={appointments}
					locale={'pt-PT'}
					height={'auto'}
				>
					<ViewState
						currentDate={currentDate}
						onCurrentDateChange={setCurrentDate}
					/>
					<WeekView
						startDayHour={9}
						endDayHour={20}
						excludedDays={[0]}
					/>
					  <Toolbar />
					<DateNavigator />
					<Appointments />
					<Resources
						//data={resources}
					/>
				</Scheduler>
			</Paper>
		</div>
	)
}


export default MainLayout(Schedule)