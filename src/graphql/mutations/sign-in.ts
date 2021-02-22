import { client as ApolloClient } from '../client'
import { gql } from '@apollo/client'

interface IInput{
        username: string
        password: string
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface ISignInVariables {
    input: IInput
}

const SIGN_IN = gql`
    mutation signIn($input: signInInput){
        tokens: signIn(input: $input){
            accessToken
            refreshToken
        }
    }
`   

export const mutationSignIn = async (values: IInput) => {
    const { username, password } = values
    const res = ApolloClient.mutate<{tokens: ITokens}, ISignInVariables>({
        mutation: SIGN_IN,
        variables: {
            input: {
                username,
                password
            }
        }
    })
    return res
}


export default mutationSignIn