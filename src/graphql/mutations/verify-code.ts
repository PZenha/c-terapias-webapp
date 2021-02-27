import { gql } from '@apollo/client'

export interface verifyCodeVariables {
    code: string
    username: string
}

const VERIFY_CODE = gql`
    mutation verifyCode($input: verifyCodeInput){
        recoveryToken: verifyCode(input: $input)
    }
`

export default VERIFY_CODE