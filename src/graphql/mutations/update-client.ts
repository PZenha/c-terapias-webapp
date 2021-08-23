import { client as ApolloClient } from '../client'
import { gql } from '@apollo/client'
import { IClient,IUpdateClientInput } from '../../types'

interface ClientInput {
  client: IUpdateClientInput
}

export const EDIT_CLIENT = gql`
  mutation updateClient($client: ClientInput) {
    updateClient(client: $client)
  }
`

export async function MutationUpdateClient(client: IClient) {

	const res = await ApolloClient.mutate<IClient, ClientInput>({
		mutation: EDIT_CLIENT,
		variables: {
			client
		},
	})
	return res
}
