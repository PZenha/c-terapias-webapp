import React, { FC } from 'react'
import { useFormik } from 'formik'
import { TextField } from '@material-ui/core'

const ClientForm: FC = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            gender: 'MALE',
            dob: '',
            email: '',
            phone: '',
            address: {
                city: '',
                zipcode: '',
                street: ''
            },
            advidedBy: '',
            observation: ''
        },
        onSubmit: () => console.log("waa")
    })
    return (
        <>
            <div>
                <TextField id='outlined-basic' label='Nome' variant='outlined' />
            </div>
        </>
    )
}

export default ClientForm