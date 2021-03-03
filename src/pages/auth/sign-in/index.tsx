import React, { useState, FC } from 'react'
import { Formik } from 'formik'
import mutationSignIn from '../../../graphql/mutations/sign-in'

import CodeInput from './code-input'
import useStyles from './styles-hook'
import ResetPassword from './reset-password-input'
import UsernameInput from './username-input'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'


const SignInSide:FC = () => {
	const classes = useStyles()
	const [step, setStep] = useState<'SIGN_IN' | 'SEND_CODE' | 'VERIFY_CODE' | 'RESET_PASSWORD'>('SIGN_IN')
	const [recoveryToken, setRecoveryToken] = useState<string|null>(null)
	const [usernameToReset, setUsername] = useState('')
	return (
		<>
			<Grid container component="main" className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							{step === 'SIGN_IN' && 'Sign in'}
							{step === 'SEND_CODE' && 'Insira o seu nome de utilizador'}
							{step === 'VERIFY_CODE' && 'Insira o códido que foi enviado para o seu email'}
							{step === 'RESET_PASSWORD' && 'Insira a nova password'}
						</Typography>
          
						{step === 'SIGN_IN' && (
							<>
								<Formik
									initialValues={{
										username: '',
										password: ''
									}}
									onSubmit={async (values) => {
										const { username, password } = values
										const tokens = await mutationSignIn({username, password})
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
											<TextField
												variant="outlined"
												margin="normal"
												required
												fullWidth
												onChange={handleChange}
												name="password"
												label="Password"
												value={values.password}
												type="password"
												id="password"
											/>
											<Button
												type="submit"
												variant="contained"
												color="primary"
												className={classes.submit}
											>
              									Sign In
											</Button>
											<Grid container>
												<Grid item xs>
													<Link href="#" variant="body2" onClick={() => setStep('SEND_CODE')} >
                  										Recuperar password?
													</Link>
												</Grid>
											</Grid>
										</form>
									)}
								</Formik>
							</>
						)}
						
						{step === 'SEND_CODE' && (
							<>
								<UsernameInput onCodeSent={(username) => {
									setUsername(username)
									setStep('VERIFY_CODE')
								}}/>
							</>
						)}

						{step === 'VERIFY_CODE' && (
							<>
								<CodeInput 
									username={usernameToReset}
									handleSuccess={(token) => {
										setStep('RESET_PASSWORD')
										setRecoveryToken(token)
									}}
								/>
							</>
						)}

						{step === 'RESET_PASSWORD' && (
							<>
								<ResetPassword recoveryToken={recoveryToken || ''}/>
							</>
						)}
         
					</div>
				</Grid>
			</Grid>
		</>
	)
}


export default SignInSide


