import React, { FC } from 'react'
import ClientForm from './insert-form'
import MainLayout from '../../layout/main-layout'
import './insert.scss'

const InsertClient: FC = () => {
	return (
		<div className="formContainer">
			<ClientForm />
		</div>
        
  
	)
}

export default MainLayout(InsertClient)
