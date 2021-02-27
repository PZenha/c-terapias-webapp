import { client as ApolloClient } from '../client'
import { gql } from '@apollo/client'
import { IClient,IUpdateClientInput } from '../../types'

interface ClientInput {
  client: IUpdateClientInput
}

export const EDIT_CLIENT = gql`
  mutation editClient($client: ClientInput) {
    editClient(client: $client) {
      _id
    }
  }
`

export async function MutationUpdateClient(client: IClient) {
	const newClient: ClientInput = {
		client: client
	}
	console.log(`newClient: ${JSON.stringify(newClient,null,2)}`)
	const res = await ApolloClient.mutate<IClient, ClientInput>({
		mutation: EDIT_CLIENT,
		variables: newClient,
	})
	return res
}
