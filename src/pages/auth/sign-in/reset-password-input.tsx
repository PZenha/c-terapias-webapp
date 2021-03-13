import React, { FC } from 'react'
import { TextField, Dialog, DialogContent, Button, Switch } from '@material-ui/core'
import { Formik } from 'formik'
import RESET_PASSWORD from '../../../graphql/mutations/reset-password'
import { client as ApolloClient } from '../../../graphql/client'
import { useHistory } from 'react-router-dom'
import { string, object } from 'yup'

import useStyles from './styles-hook'


const validationSchema = object().shape({
	newPassword: string().min(3).required(),
	repeated: string().min(3).required().test('is-repeated', 'As passwords têm de ser iguais', function(){
		if(this.parent.newPassword === this.parent.repeated){
			return true
		}
		return this.createError({path: this.path, message: 'As passwords têm de ser iguais'})
	})
})

const ResetPassword:FC<{recoveryToken: string}> = ({recoveryToken}) => {
	const history = useHistory()
	const classes = useStyles()
	return(
		<>
			<Formik
				initialValues={{
					newPassword: '',
					repeated: ''
				}}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					await ApolloClient.mutate<boolean,{input: {recoveryToken: string, password: string}}>({
						mutation: RESET_PASSWORD,
						variables: {
							input: {
								recoveryToken,
								password: values.newPassword
							}
						}
					})
					history.push('/home')
				}}
			>
				{({
					values,
					handleChange,
					handleSubmit
				}) => (
					<form className={classes.form} onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="newPassword"
							label="Nova password"
							value={values.newPassword}
							onChange={handleChange}
							name="newPassword"
							type="password"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="repeated"
							label="Repita a password"
							value={values.repeated}
							onChange={handleChange}
							name="repeated"
							type="password"
							autoFocus
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.submit}
						>
              		Submeter
						</Button>
					</form>
				)}
				
			</Formik>
		</>
	)
}

export default ResetPassword