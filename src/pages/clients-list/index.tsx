import React, { FC, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MaterialTable, { Column } from 'material-table'
import MainLayout from '../../layout/main-layout'
import { Formik } from 'formik'
import { Search } from '@material-ui/icons'
import {
  getClient,
  ISearchRes,
} from '../../graphql/queries/search-client'
import { IClient } from '../../graphql/mutations/add-client'

interface IProps {
  data: ISearchRes
}

interface TableState {
  columns: Array<Column<IClient>>
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
            console.log(JSON.stringify(res.data, null, 2))
            setData(res.data)
            console.log(values.name)
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
              <TextField
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                id="name"
                label="Nome"
                variant="outlined"
              />
              <div className="submit-buttin">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  <SearchIcon />
                </Button>
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
  const editableData = props.data.searchClients.map((o) => ({ ...o }))
  const [state, setState] = useState<TableState>({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Data de Nascimento', field: 'dob', type: 'date' },
      { title: 'email', field: 'email' },
      { title: 'Contacto', field: 'phone' },
      { title: 'Género', field: 'gender' },
      { title: 'Cidade', field: 'address.city' },
      { title: 'Morada', field: 'address.street' },
      { title: 'Codigo postal', field: 'address.zipcode' },
      { title: 'Recomendação', field: 'advisedBy' },
    ],
    data: editableData,
  })

  return (
    <>
      <MaterialTable
        title="Tabela de clientes"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve()
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data]
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
    </>
  )
}

export default MainLayout(SearchClients)
