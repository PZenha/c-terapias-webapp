import { client as ApolloClient } from '../client'
import { gql } from '@apollo/client'
import { IClient, ISearchClientsQueryResult } from '../../types'

export const SEARCH_CLIENT = gql`
  query searchClients($name: String) {
    clients: searchClients(name: $name) {
      _id
      name
      dob
      email
      phone
      address {
        city
        zipcode
        street
      }
      advisedBy
      observations{
        _id
       description
       created_at
      }
    }
  }
`

export default async function getClients(name: string) {
  try {
    const res = await ApolloClient.query<{clients: ISearchClientsQueryResult[]}, {name: string}>({
      query: SEARCH_CLIENT,
      variables: {
        name: name,
      },
    })
    return res
  } catch (err) {
    throw new Error(`SearchClient error: ${err}`)
  }
}

