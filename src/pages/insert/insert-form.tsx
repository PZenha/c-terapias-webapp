import React, { FC, useState, SyntheticEvent } from 'react';
import { Formik } from 'formik';
import { TextField, Button, Container } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { MutationAddNewClient } from '../../graphql/mutations/add-client';
import './insert.scss';

const ClientForm: FC = () => {
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [success, setSuccess] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Container fixed>
        <div className="formInput">
          <Formik
            initialValues={{
              name: '',
              gender: 'MALE' as const,
              dob: new Date(),
              email: '',
              phone: '',
              address: {
                city: '',
                zipcode: '',
                street: '',
              },
              advisedBy: '',
              observation: '',
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values);
              await MutationAddNewClient(values);
              setSuccess('success');
              setSuccessMessage(
                'Novo paciente adicionado com sucesso!',
              );
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="name"
                  label="Nome"
                  variant="outlined"
                />
                <TextField
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="telemovel"
                  label="Telemovel"
                  variant="outlined"
                />
                <TextField
                  name="dob"
                  value={values.dob}
                  onChange={handleChange}
                  id="date"
                  label="Data de Nascimento"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
                <TextField
                  name="address.street"
                  value={values.address.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="street"
                  label="Morada"
                  variant="outlined"
                />
                <TextField
                  name="address.zipcode"
                  value={values.address.zipcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="zipcode"
                  label="Codigo Postal"
                  variant="outlined"
                />
                <TextField
                  name="address.city"
                  value={values.address.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="city"
                  label="Cidade"
                  variant="outlined"
                />
                <TextField
                  name="advisedBy"
                  value={values.advisedBy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="advisedBy"
                  label="Quem recomendou"
                  variant="outlined"
                />
                <TextField
                  multiline
                  name="observation"
                  value={values.observation}
                  rows={4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="observation"
                  label="Observação"
                  variant="outlined"
                />

                <div className="submitButton">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleClick}
                  >
                    Adicionar
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Alert onClose={handleClose} severity={success}>
                      {successMessage}
                    </Alert>
                  </Snackbar>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default ClientForm;
