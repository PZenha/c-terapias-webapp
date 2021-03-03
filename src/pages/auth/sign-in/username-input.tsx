import React, { FC } from 'react'
import { TextField, Dialog, DialogContent, Button, Switch } from '@material-ui/core'
import { Formik } from 'formik'
import { client as ApolloClient } from '../../../graphql/client'
import SEND_CODE from '../../../graphql/mutations/send-code'
import useStyles from './styles-hook'

const UsernameInput:FC<{onCodeSent?: (username: string)=> void}> = ({onCodeSent}) => {
	const classes = useStyles()
  
	return(
		<>
			<Formik
				initialValues={{
					username: ''
				}}
				onSubmit={async (values) => {
					await ApolloClient.mutate({
						mutation: SEND_CODE,
						variables: {
							username: values.username
						}
					})
					onCodeSent?.(values.username)
				}}
			>
				{({
					values,
					handleChange,
					handleSubmit,
					isSubmitting,
				}) => (
					<form className={classes.form} onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Utilizador"
							value={values.username}
							onChange={handleChange}
							name="username"
							autoFocus
						/>
						<Button
							type="submit"
              
							variant="contained"
							color="primary"
							className={classes.submit}
						>
              Enviar código
						</Button>
					</form>
            
				)}
            
			</Formik>
          
		</>
	)
}

export default UsernameInput