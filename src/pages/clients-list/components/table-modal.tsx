import React, { FC, useState } from 'react'
//import { ITableProps } from './table'
import Modal from '@material-ui/core/Modal'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField, Dialog, DialogContent, Button, Switch } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Formik } from 'formik'
import { IClient, ISearchClientsQueryResult } from '../../../types'
import { MutationUpdateClient } from '../../../graphql/mutations/update-client'
import { MutationDeleteClient } from '../../../graphql/mutations/delete-client'

import './table.scss'

interface IModalProps  {
    data?: ISearchClientsQueryResult
    openModal: boolean
    handleClose: () => void
}

const TableModal: FC<IModalProps> = (props: IModalProps) => {
	const [readOnly, setReadOnly] = useState<boolean>(true)
	const { data } = props
	return (
		<div>
			<Dialog
				fullWidth
				open={props.openModal}
				onClose={props.handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<DialogContent>
					<Formik
						initialValues={{
							name: data?.name,
							dob: data?.dob,
							city: data?.address.city,
							zipcode: data?.address.zipcode,
							street: data?.address.street,
							email: data?.email,
							phone: data?.phone,
							advisedBy: data?.advisedBy
						}}
						onSubmit={ async (values) => {
							const client: IClient = {
								_id: data?._id,
								address: {
									city: values.city,
									zipcode: values.zipcode,
									street: values.street
								},
								name: values.name,
								dob: values.dob,
								email: values.email,
								phone: values.phone,
								advisedBy: values.advisedBy
							}
							const res = await MutationUpdateClient(client)
							if (!res.errors){
								return
							}
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<>
								<form onSubmit={handleSubmit}>
									<div className="toggle-edit"> 
										<Switch checked={!readOnly} onChange={() => setReadOnly(!readOnly)} color="primary"/>
									</div>
                
									<TextField
										name="name"
										inputProps={{
											readOnly
										}}
										value={values.name}
										onChange={handleChange}
										onBlur={handleBlur}
										id="name"
										label="Nome"
										variant="outlined"
										style={{width: '100%'}}
									/>
									<TextField
										name="dob"
										inputProps={{
											readOnly
										}}
										value={values.dob}
										onChange={handleChange}
										id="date"
										label="Data de Nascimento"
										type="date"
										InputLabelProps={{
											shrink: true,
										}}
										variant="outlined"
									/>
          
									<TextField
										name="phone"
										inputProps={{
											readOnly
										}}
										value={values.phone}
										onChange={handleChange}
										onBlur={handleBlur}
										id="phone"
										label="Número Tel."
										variant="outlined"
										style={{width: '100%'}}
									/>
									<TextField
										name="email"
										inputProps={{
											readOnly
										}}
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										id="email"
										label="E-mail"
										variant="outlined"
										style={{width: '100%'}}
									/>
									<TextField
										name="city"
										inputProps={{
											readOnly
										}}
										value={values.city}
										onChange={handleChange}
										onBlur={handleBlur}
										id="city"
										label="Cidade"
										variant="outlined"
										style={{width: '100%'}}
									/>
									<TextField
										name="zipcode"
										inputProps={{
											readOnly
										}}
										value={values.zipcode}
										onChange={handleChange}
										onBlur={handleBlur}
										id="zipcode"
										label="Código Postal"
										variant="outlined"
										style={{width: '100%'}}
									/>
									<TextField
										name="street"
										inputProps={{
											readOnly
										}}
										value={values.street}
										onChange={handleChange}
										onBlur={handleBlur}
										id="street"
										label="Rua"
										variant="outlined"
										style={{width: '100%'}}
									/>
									<TextField
										name="advisedBy"
										inputProps={{
											readOnly
										}}
										value={values.advisedBy}
										onChange={handleChange}
										onBlur={handleBlur}
										id="advisedBy"
										label="Recomendado por"
										variant="outlined"
										style={{width: '100%'}}
									/>
									<div className='modal-buttons'>
										<Button
											type="submit"
											disabled={readOnly}
											variant="contained"
											color="primary"
											startIcon={<EditIcon />}
										>Editar</Button>
										<Button
											disabled={readOnly}
											variant="contained"
											style={{background:'#FF0E0E', marginLeft: 10}}
											startIcon={<DeleteIcon />}
											onClick={async () => await MutationDeleteClient(data?._id || '')}
										>Remover</Button>
									</div>
									
								</form>
							</>
						)}

					</Formik>
				</DialogContent>
			</Dialog>
        
		</div>
	)
}

export default TableModal