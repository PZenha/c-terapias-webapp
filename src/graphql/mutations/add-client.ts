import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import { client as ApolloClient } from '../client'

export interface IClient {
  name?: string
  dob?: Date
  email?: string
  phone?: string
  gender: 'MALE' | 'FEMALE'
  address?: {
    city?: string
    zipcode?: string
    street?: string
  }
  created_at?: Date
  advisedBy?: string
  observation?: string
}

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
