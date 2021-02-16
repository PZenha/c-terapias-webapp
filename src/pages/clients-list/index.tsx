import React, { FC, useEffect, useState, SyntheticEvent } from 'react'
import { TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MainLayout from '../../layout/main-layout'
import { Formik } from 'formik'
import getClients from '../../graphql/queries/search-clients'
import { IClient, ISearchClientsQueryResult } from '../../types'
import { Link } from 'react-router-dom' 
import { GenerateTable } from './components/table'
import NoResults from '../../assets/no-results'

import { string, object } from 'yup'
import './list.scss'

const validationSchema = object().shape({
  name: string().min(3).required()
})

export const SearchClients: FC = () => {
  const [clientsData, setClientsData] = useState<ISearchClientsQueryResult[] | null>(null)
  const [isSearchResultEmpty, setIsSearchResultEmpty] = useState(false)
  
  return (
    <>
    <div style={{width:'100%', minHeight: '100vh'}}>
      <div className="search-input">
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setIsSearchResultEmpty(false)
            setClientsData(null)
            const { data, error, loading } = await getClients(values.name)
            
            const clients = data?.clients || []
          
            if(clients.length === 0 || error){
              setIsSearchResultEmpty(true)
              return
            }
            
            setClientsData(clients)
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
                label="Nome ou Telm."
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


      {clientsData && clientsData.length > 0 && ( <>
      <div style={{padding:'0px',margin:10, maxWidth:'100%', overflow:'hidden'}}>
      <GenerateTable clients={clientsData || []}/>
      </div>
      </>
    )}

    {!clientsData && isSearchResultEmpty && (
        <div className='search-no-results'>
          <NoResults /> 
        <span>Não foram encontrados resultados!</span>
        </div>
      
    )}
    </div>
    </>
)
      }

export default MainLayout(SearchClients)