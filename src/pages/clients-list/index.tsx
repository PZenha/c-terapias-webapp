import React, { FC, useEffect, useState, SyntheticEvent } from 'react'
import { TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MainLayout from '../../layout/main-layout'
import { Formik } from 'formik'
import {
  getClient,
  ISearchRes,
} from '../../graphql/queries/search-client'
import { IClient, ISearchClientsQueryResult } from '../../types'
import { MutationUpdateClient } from '../../graphql/mutations/update-client'
import { MutationDeleteClient } from '../../graphql/mutations/delete-client'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom' 
import { GenerateTable, ITableProps } from './components/table'
import './list.scss'

const mockedData = 
[
 {
        name: 'Pedro Zenha',
        dob: new Date,
        phone: '915828955',
        email: 'pedrozenha12@gmail.com',
        created_at: new Date(),
        address: {
            city: 'Gaia',
            zipcode: '4415',
            street: '25 de Abril'
        },
        advisedBy: 'Por mim',
        observations_count: 4
        
    },
     {
        name: 'Pedro Zenha',
        dob: new Date,
        phone: '915828955',
        email: 'pedrozenha12@gmail.com',
        created_at: new Date(),
        address: {
            city: 'Gaia',
            zipcode: '4415',
            street: '25 de Abril'
        },
        advisedBy: 'Por mim',
        observations_count: 4
        
    }
]
   


interface IProps {
  data: ISearchRes
  onProcess: (action: ICallbackProps) => void
}

interface ICallbackProps {
  success: 'success' | 'info' | 'warning' | 'error'
  successMessage: string
}

interface TableState {
  data: ISearchClientsQueryResult[]
}
export const SearchClients: FC = () => {
  const [data, setData] = useState<ISearchRes>()
  const [open, setOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [success, setSuccess] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success')

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  
  return (
    <>
    <div style={{width:'100%'}}>
      <div className="search-input">
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await getClient(values.name)
            setData(res.data)
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
            <form onSubmit={handleSubmit}>
              <div className="search-wraper">
              <div className="text-input">
              <TextField
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                id="name"
                label="Nome"
                variant="outlined"
                style={{width: '100%'}}
              />
               </div>
              <div className="submit-button">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  <SearchIcon />
                </Button>
              </div>
              </div>
            </form>
          )}
        </Formik>
      </div>

      {true && ( <>
      <div style={{padding:'0px',margin:10, maxWidth:'100%', overflow:'auto', border: '1px solid red'}}>
      <GenerateTable data={mockedData}/>
      </div>
      </>
    )}
    </div>
    </>
)
      }

export default MainLayout(SearchClients)