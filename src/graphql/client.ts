import {
	ApolloClient,
	InMemoryCache,
	DefaultOptions,
	createHttpLink,
	ApolloLink
} from '@apollo/client'
import { onError } from 'apollo-link-error'
import { setContext } from '@apollo/client/link/context'
import { fromPromise, toPromise, Operation, NextLink } from 'apollo-link'
import { getAccessToken } from '../store/authentication'
import refreshTokens from '../graphql/mutations/refresh-tokens'
import history from '../history'

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
}

const httpLink = createHttpLink({
	uri: 'http://127.0.0.1:5000/graphql'
})

const authLink = setContext((_, { headers }) => {
	const token = getAccessToken()

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}

	}
})

const errorLink = onError(({ operation, graphQLErrors, forward}) => {
	if(graphQLErrors){
		for(const graphQLError of graphQLErrors){
			if(graphQLError.message.includes('Not Authorised!')){
				return refreshTokensPromise(operation, forward)
			}
		}
	}
})


const refreshTokensPromise = (operation: Operation, forward: NextLink) => {
	return fromPromise( (async () => {
		try{
			await refreshTokens()
		}catch(err){
			console.log(err)
			history.push('/')
			return {}
		}
		return toPromise(forward(operation))
	})())
}

export const client = new ApolloClient({
	link: ApolloLink.from([errorLink as any ,authLink,httpLink]),
	//link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		addTypename: false,
	}),
})
