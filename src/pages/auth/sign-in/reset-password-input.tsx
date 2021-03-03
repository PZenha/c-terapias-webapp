import React, { FC } from 'react'
import { TextField, Dialog, DialogContent, Button, Switch } from '@material-ui/core'
import { Formik } from 'formik'
import RESET_PASSWORD from '../../../graphql/mutations/reset-password'
import { client as ApolloClient } from '../../../graphql/client'

import useStyles from './styles-hook'

const ResetPassword:FC<{recoveryToken: string}> = ({recoveryToken}) => {
	const classes = useStyles()
	return(
		<>
			<Formik
				initialValues={{
					newPassword: ''
				}}
				onSubmit={async (values) => {
					const res = await ApolloClient.mutate<boolean,{input: {recoveryToken: string, password: string}}>({
						mutation: RESET_PASSWORD,
						variables: {
							input: {
								recoveryToken,
								password: values.newPassword
							}
						}
					})
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