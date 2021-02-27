import { gql } from '@apollo/client'
import { client as ApolloClient } from '../client'
import { IClient } from '../../types'
import { FIND_CLIENT } from '../queries/get-client'


export const ADD_OBSERVATION = gql`
  mutation addObservation($observation: AddObservationInput) {
    addObservation(observation: $observation)
  }
`

export const MutationAddObservation = async ({description, client_id}: {description: string, client_id: string}) => {
	const variables = {
		observation: {
			description,
			client_id
		}
	}
	try {
		const res = await ApolloClient.mutate<{description: string, client_id: string}>({
			mutation: ADD_OBSERVATION,
			variables,
			refetchQueries: [{query: FIND_CLIENT, variables: { _id: client_id}}]
		})
		return res
	} catch (err) {
		return err
	}
}

export default MutationAddObservation