import React, { FC, useEffect, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MaterialTable, { Column } from 'material-table'
import MainLayout from '../../layout/main-layout'
import { Formik } from 'formik'
import {
  getClient,
  ISearchRes,
} from '../../graphql/queries/search-client'
import { IClient } from '../../types'
import { MutationUpdateClient } from '../../graphql/mutations/update-client'
import './list.scss'

interface IProps {
  data: ISearchRes
}

interface TableState {
  data: IClient[]
}
export const SearchClients: FC = () => {
  const [data, setData] = useState<ISearchRes>()
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

      {data && <Table data={data} />}
    </>
  )
}

const Table: FC<IProps> = (props: { data: ISearchRes }) => {
  const editableData = props.data.searchClients.map((client) => ({ ...client }))
  const [state, setState] = useState<TableState>({data: editableData})
 
  useEffect(() => {
    setState({data: editableData})
  },[editableData.length])
  console.log(`state: ${JSON.stringify(state,null,2)}`)
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
        ]}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(async () => {
                resolve()
                if (oldData) {
                  console.log(
                    `newData: ${JSON.stringify(newData, null, 2)}`,
                  )
                  await MutationUpdateClient(newData)
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
              setTimeout(() => {
                resolve()
                setState((prevState) => {
                  const data = [...prevState.data]
                  data.splice(data.indexOf(oldData), 1)
                  return { ...prevState, data }
                })
              }, 600)
            }),
        }}
      />
      </div>
    </>
  )
}

export default MainLayout(SearchClients)
