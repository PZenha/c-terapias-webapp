import React, { FC, useEffect, useState, SyntheticEvent } from 'react'
import { TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MaterialTable, { Column } from 'material-table'
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
import './list.scss'

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

      {data && ( <>
      <Table data={data} onProcess={(action)=> {
        handleClick()
        setSuccess(action.success)
        setSuccessMessage(action.successMessage)
      }} />
      <ul>{data.searchClients.map( i => {
        return <li>
          <Link to={`client/${i.observations_id}`}>{i.observations._id}</Link>
          </li>
      })}</ul>
      </>
      )
      }
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={handleClose} severity={success}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

const Table: FC<IProps> = (props: { data: ISearchRes, onProcess: (action: ICallbackProps) => void }) => {
  const editableData = props.data.searchClients.map((client) => ({ ...client }))
  const [state, setState] = useState<TableState>({data: editableData})
  
 
  useEffect(() => {
    setState({data: editableData})
  },[editableData[0]?._id])
  
  return (
    <>
    <div className='table'>
      <MaterialTable
        title="Tabela de clientes"
        columns={[
          { title: 'Nome', field: 'name' },
          { title: 'Data de Nascimento', field: 'dob', type: 'date' },
          { title: 'e-mail', field: 'email' },
          { title: 'Contacto', field: 'phone' },
          { title: 'Cidade', field: 'address.city' },
          { title: 'Morada', field: 'address.street' },
          { title: 'Codigo postal', field: 'address.zipcode' },
          { title: 'Recomendação', field: 'advisedBy' },
          { title: 'Observações', field: 'observations.observations[0].description'}
        ]}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(async () => {
                resolve()
                if (oldData) {
                  const res = await MutationUpdateClient(newData)
                  if(res.errors){
                    props.onProcess({
                      success: 'error',
                      successMessage: 'Algo de errado aconteceu!'
                    })
                    return
                  }
                  props.onProcess({
                    success: 'success',
                    successMessage: 'Cliente editado com sucesso!'
                  })
                  setState((prevState) => {
                    const data = [...prevState.data]
                    console.log(`data: ${JSON.stringify(data,null,2)}`)
                    data[data.indexOf(oldData)] = newData
                    return { ...prevState, data }
                  })
                }
              }, 600)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(async () => {
                resolve()
                console.log(oldData.name)
                const res = await MutationDeleteClient(oldData._id!)
                if(res.errors){
                  props.onProcess({
                    success: 'error',
                    successMessage: 'Algo de errado aconteceu!'
                  })
                  return
                }
                props.onProcess({
                  success: 'success',
                  successMessage: 'Cliente removido com sucesso!'
                })
                setState((prevState) => {
                  const data = [...prevState.data]
                  data.splice(data.indexOf(oldData), 1)
                  return { ...prevState, data }
                })
              }, 600)
            }),
        }}
        onRowClick = {(event,data) => (
          <Link to={`/client/${data?._id}`} >
          </Link>
        )}
      />
      </div>
    </>
  )
}

export default MainLayout(SearchClients)
