import React, { FC, useState } from 'react'
import { gql } from '@apollo/client'
import { client as APolloClient } from '../../../graphql/client'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField, Dialog, DialogContent, Button, Switch } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Formik } from 'formik'
import moment from 'moment'



export interface IModalProps  {
    client_id: string
    openModal: boolean
    handleClose: () => void
}

const CREATE_APPOINTMENT = gql`
    mutation createAppointment($client_id: ID, $scheduled_to: Date){
        appointment: createAppointment(client_id: $client_id, scheduled_to: $scheduled_to){
            _id
        }
    }
`

const CreateAppointmentModal: FC<IModalProps> = (props: IModalProps) => {
	console.log(moment().format('YYYY-MM-DDThh:mm').toString())
	return (
		<div>
			<Dialog
				fullWidth
				open={props.openModal}
				onClose={props.handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
			>
				<DialogContent>
					<Formik
						initialValues={{
							scheduled_to: moment().format('YYYY-MM-DDThh:mm').toString()
						}}
						onSubmit={ async (values) => {
							const appointment = await APolloClient.mutate<{client_id: string, scheduled_to: Date}>({
								mutation: CREATE_APPOINTMENT,
								variables: {
									client_id: props.client_id,
									scheduled_to: moment(values.scheduled_to).toDate()
								}
							})
							props.handleClose()
                    
						}}
					>
						{({
							values,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => (
							<>
								<div>

									<form onSubmit={handleSubmit}>
                
										<TextField
											name='scheduled_to'
											value={values.scheduled_to}
											onChange={handleChange}
											onBlur={handleBlur}
											id='scheduled_to'
											label='Próxima marcação'
											type='datetime-local'
											defaultValue="2017-05-24T10:30"
											style={{width: '100%'}}
											InputLabelProps={{
												shrink: true,
											}}
										/>
                
										<Button
											type='submit'
											disabled={false}
											variant='contained'
											color='primary'
											startIcon={<AddIcon />}
										>Adicionar</Button>
									</form>
								</div>
							</>
						)}

					</Formik>
				</DialogContent>
			</Dialog>
        
		</div>
	)
}

export default CreateAppointmentModal