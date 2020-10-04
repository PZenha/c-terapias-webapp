import { client as ApolloClient } from '../client'
import { gql } from '@apollo/client'
import { IClient } from '../../types'

export const SEARCH_CLIENT = gql`
  query searchClients($name: String) {
    searchClients(name: $name) {
      _id
      name
      dob
      email
      phone
      gender
      address {
        city
        zipcode
        street
      }
      advisedBy
    }
  }
`

interface searchInput {
  name: string
}

export interface ISearchRes {
  searchClients: IClient[]
}

export async function getClient(name: string) {
  try {
    const res = await ApolloClient.query<ISearchRes, searchInput>({
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