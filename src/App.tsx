import React from 'react'
import Routes from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './graphql/client'

function App() {
	return (
		<div className="App">
			<ApolloProvider client={client}>
				<Routes />
			</ApolloProvider>
		</div>
	)
}

export default App
