import { gql } from '@apollo/client'

const RESET_PASSWORD = gql`
    mutation updateSecret($input: updateSecretInput){
        is_reseted: updateSecret(input: $input)
    }
`

export default RESET_PASSWORD