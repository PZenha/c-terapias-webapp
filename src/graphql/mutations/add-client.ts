import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import { client as ApolloClient } from '../client'
import { IClient } from '../../types'


interface IClientVariables {
  client: IClient
  observation: string
}

export const ADD_CLIENT = gql`
  mutation addNewClient($client: ClientInput) {
    addNewClient(client: $client) {
      _id
    }
  }
`

export async function MutationAddNewClient(values: IClient) {
  const client: IClientVariables = {
    client: values,
    observation: values.observation!,
  }
  console.log(JSON.stringify(client, null, 2))

  const res = await ApolloClient.mutate<IClient, IClientVariables>({
    mutation: ADD_CLIENT,
    variables: client,
  })

  console.log(JSON.stringify(res, null, 2))
}
