import { client as ApolloClient } from '../client'
import { gql } from '@apollo/client'
import { IClient, ISearchClientsQueryResult } from '../../types'

export const FIND_CLIENT = gql`
  query findClient($_id: ID) {
    client: findClient(_id: $_id) {
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

export default async function getClient(_id: string) {
  try {
    const res = await ApolloClient.query<{client: ISearchClientsQueryResult}, {_id: string}>({
      query: FIND_CLIENT,
      variables: {
        _id,
      },
    })
    return res
  } catch (err) {
    throw new Error(err)
  }
}
