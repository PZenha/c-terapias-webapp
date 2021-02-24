import { gql } from '@apollo/client'


const SEND_CODE = gql`
    mutation sendCode($username: String){
        code: sendCode(username: $username)
    }
`
export default SEND_CODE
