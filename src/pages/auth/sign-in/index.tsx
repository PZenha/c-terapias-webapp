import React, { useState, FC } from 'react'
import { Formik } from 'formik'
import mutationSignIn from '../../../graphql/mutations/sign-in'
import SEND_CODE from '../../../graphql/mutations/send-code'
import { client as ApolloClient } from '../../../graphql/client'
import CodeInput from './code-input-modal'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import mainBackground from '../../../assets/sign-in-pic.jpg'


const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: `url(${mainBackground})`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function SignInSide() {
	const classes = useStyles()
	const [step, setStep] = useState<'SIGN_IN' | 'SEND_CODE' | 'VERIFY_CODE' | 'RESET_PASSWORD'>('SIGN_IN')
	const [recoveryToken, setRecoveryToken] = useState<string|null>(null)
	const [forgotView, setForgorView] = useState(false)
	const [codeView, setCodeView] = useState(false)
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
							{!forgotView ? 'Sign in' : 'Recuperar password'}
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
										console.log(tokens)
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
												label="Username"
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
                  										Forgot password?
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
								<ForgotPassword onCodeSent={(username) => {
									setUsername(username)
									setStep('VERIFY_CODE')
								}}/>
							</>
						)}

						{step === 'VERIFY_CODE' && (
							<>
								<CodeInput 
									username={usernameToReset}
									handleSuccess={(token) => setStep('RESET_PASSWORD')}
								/>
							</>
						)}

						{step === 'RESET_PASSWORD' && (
							<>
							</>
						)}
         
					</div>
				</Grid>
			</Grid>
		</>
	)
}


const ForgotPassword:FC<{onCodeSent?: (username: string)=> void}> = ({onCodeSent}) => {
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
							label="Username"
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

