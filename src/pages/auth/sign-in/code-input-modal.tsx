import React, { FC } from 'react'
import { TextField, Dialog, DialogContent, Button, Switch } from '@material-ui/core'
import { Formik } from 'formik'
import {client as ApolloClient} from '../../../graphql/client'
import VERIFY_CODE, { verifyCodeVariables } from '../../../graphql/mutations/verify-code'

export interface IModalProps  {
    openModal: boolean
    username: string
    handleClose: () => void
    handleSuccess: (token: string) => void
}


const CodeInputModal:FC<IModalProps> = (props: IModalProps) =>{
	return(
		<>
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
							code: ''
						}}
						onSubmit={async (values) => {
							const res = await ApolloClient.mutate<{recoveryToken: string}, {input: verifyCodeVariables}>({
								mutation: VERIFY_CODE,
								variables:{
									input:{
										code: values.code,
										username: props.username
									}
								}
							})
							if(res.data && res.data.recoveryToken.length > 0){
								props.handleSuccess(res.data.recoveryToken)
							}
						}}
					>
						{({
							values,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => (
							<div>
								<form onSubmit={handleSubmit}>
									<TextField
										name="code"
										value={values.code}
										onChange={handleChange}
										onBlur={handleBlur}
										id="code"
										label="Código"
										variant="outlined"
										style={{width: '100%'}}
									/>
                
									<Button
										type="submit"
										disabled={false}
										variant="contained"
										color="primary"
									>Verificar</Button>
								</form>
							</div>
						)}
					</Formik>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default CodeInputModal