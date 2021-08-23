import { gql } from '@apollo/client'
import { client as ApolloClient } from '../client'
import { IClient,IUpdateClientInput } from '../../types'


interface IDelete {
    deleteClient: boolean
}

interface IDeleteInput {
    _id: string
}

export const DELETE_CLIENT = gql`
    mutation deleteClient($_id: ID){
        deleteClient(_id: $_id)
    }
`

export async function MutationDeleteClient(_id: string){

	if(!_id){
		throw new Error('No id provided')
	}
	try{
		const res = await ApolloClient.mutate<IDelete,IDeleteInput>({
			mutation: DELETE_CLIENT,
			variables: {
				_id: _id
			}
		})
		return res
	}catch(err){
		throw new Error(err)
	}
}
