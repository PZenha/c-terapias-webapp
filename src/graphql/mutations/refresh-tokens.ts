import { gql } from '@apollo/client'
import { client as ApolloClient } from '../client'
import { ITokens } from '../../types'
import { getRefreshToken, saveTokens } from '../../store/authentication'

const REFRESH_TOKENS = gql`
    mutation refreshTokens($refreshToken: String){
        tokens: refreshTokens(refreshToken: $refreshToken){
            accessToken
            refreshToken
        }
    }
`

const refreshTokens = async () => {
	const refreshToken = getRefreshToken()

	const res =  await ApolloClient.mutate<{tokens: ITokens }, {refreshToken: string}>({
		mutation: REFRESH_TOKENS,
		variables: {
			refreshToken
		}
	})

	if(res.data && !res.errors){
		saveTokens(
			{
				accessToken: res.data.tokens.accessToken,
				refreshToken: res.data.tokens.refreshToken
			}
		)
	}

}

export default refreshTokens