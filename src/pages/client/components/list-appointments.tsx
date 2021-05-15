import React, { FC, useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { client as APolloClient } from '../../../graphql/client'
import { Paper, Radio, Button, TextField, Dialog, DialogContent, Switch } from '@material-ui/core'
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ScheduleIcon from '@material-ui/icons/Schedule'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import InfoWrapper from '../../../components/info-wrapper'
import { IAppointment } from '../../../types'
import { Formik } from 'formik'

import '../client-info.scss'
import { isNullableType } from 'graphql'

interface IConfirmationModal {
	_id?: string
	showed_up?: boolean
	open: boolean
	handleClose: () => void
}

const FIND_APPOINTMENT_BY_CLIENT_ID = gql`
    query FindAppointmentByClientID($client_id: ID){
        appointments: findAppointmentByClient(client_id: $client_id){
            _id
            scheduled_to
        }
    }
`

const CONFIRM_APPOINTMENT = gql`
	mutation SetAppointmentShowedUp($_id: ID, $showed_up: Boolean){
		showedUp: setAppointmentShowedUp(_id: $_id, showed_up: $showed_up)
	}
`

const ListAppointments:FC<{appointments: IAppointment[]}> = ({appointments}) => {
	const [showedUp, setShowedUp] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [confirmationData, setConfirmationData] = useState<{_id: string, showed_up: boolean}>()
	const appts = appointments.slice().sort((a,b) => moment(b.scheduled_to).valueOf() - moment(a.scheduled_to).valueOf()).reverse()
	
	const [backgroundColor, setBackgroundColor] = useState<'#FFC2C2' | 'C4FFBF' | 'white'>('white')
	
	
	useEffect(() => {
		setBackgroundColor(!showedUp && '#FFC2C2' || showedUp && 'C4FFBF' || 'white')
	})
	return(
		<>
        	<div style={{width:'100%', marginTop:'16px'}} className="appointments-list">
				{appts.map((app)=> (
					<>
						<Paper style={{marginBottom:'15px'}} elevation={2}>
							<div className='paper-wrapper'>
								<h4 >{moment(app.scheduled_to).utc().format('DD/MM/YYYY - HH:mm')}</h4>

								<div className='flex-position'>
									<div className='flex-position'>
										<span>Confirmar presença</span>
										<CheckIcon 
											style={{color: 'green'}} 
											onClick={() => {
												setOpenModal(true)
												setConfirmationData({_id: app._id, showed_up: true})
											}}
										/>
										<CloseIcon 
											style={{color: 'red'}}
											onClick={() => {
												setOpenModal(true)
												setConfirmationData({_id: app._id, showed_up: false})
											}}	
										/>
									</div>
									<div style={{marginLeft: '20px'}}>
										<EditIcon />
										<DeleteIcon />
									</div>
									
								</div>

							</div>
						</Paper>
					</>
				))}
			</div>

			<ConfirmationModal 
				_id={confirmationData?._id}
				showed_up={confirmationData?.showed_up}
				open={openModal}
				handleClose={() => setOpenModal(false)}
			/>
		</>
	)
}

async function confirmAppointmentPresence(_id: string, showed_up: boolean){
	return await APolloClient.mutate({
		mutation: CONFIRM_APPOINTMENT,
		variables: {
			_id,
			showed_up
		}
	})
}


const ConfirmationModal: FC<IConfirmationModal> = (props: IConfirmationModal) => (
	<div>
		<Dialog
			fullWidth
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<DialogContent
				style={
					{
						width:'100%',
						height: '250px'
					}
				}
			>
				<span>Confirma que o paciente</span> {
					props.showed_up 
						? (<span style={{color:'green'}}>compareceu?</span>) 
						: (<span style={{color:'red'}}>não compareceu?</span>)}
			</DialogContent>
		</Dialog>
	</div>
)

export default ListAppointments