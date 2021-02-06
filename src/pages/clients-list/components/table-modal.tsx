import React, { FC, useState } from 'react'
//import { ITableProps } from './table'
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent, Button, Switch } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { Formik } from 'formik'
import { ISearchClientsQueryResult } from '../../../types'
import './table.scss'

interface IModalProps  {
    data?: ISearchClientsQueryResult
    openModal: boolean
    handleClose: () => void
}

const TableModal: FC<IModalProps> = (props: IModalProps) => {
  const [readOnly, setReadOnly] = useState<boolean>(true)
  const { data } = props
    return (
        <div>
        <Dialog
            fullWidth
            open={props.openModal}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
           <DialogContent>
                <Formik
                initialValues={{
                    name: data?.name,
                    dob: data?.dob,
                    city: data?.address.city,
                    zipcode: data?.address.zipcode,
                    street: data?.address.street,
                    email: data?.email,
                    phone: data?.phone,
                    advisedBy: data?.advisedBy,
                }}
                onSubmit={ () => console.log('submit from modal')}
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
              <>
              <form onSubmit={handleSubmit}>
                <div className="toggle-edit"> 
                  <Switch checked={!readOnly} onChange={() => setReadOnly(!readOnly)} color="primary"/>
                </div>
                
                  <TextField
                    name="name"
                    inputProps={{
                      readOnly
                    }}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="name"
                    label="Nome"
                    variant="outlined"
                    style={{width: '100%'}}
                  />
                  <TextField
                  name="dob"
                   inputProps={{
                      readOnly
                    }}
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
                    name="phone"
                     inputProps={{
                      readOnly
                    }}
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="phone"
                    label="Número Tel."
                    variant="outlined"
                    style={{width: '100%'}}
                  />
                   <TextField
                    name="email"
                     inputProps={{
                      readOnly
                    }}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="email"
                    label="E-mail"
                    variant="outlined"
                    style={{width: '100%'}}
                  />
                   <TextField
                    name="city"
                     inputProps={{
                      readOnly
                    }}
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="city"
                    label="Cidade"
                    variant="outlined"
                    style={{width: '100%'}}
                  />
                  <TextField
                    name="zipcode"
                     inputProps={{
                      readOnly
                    }}
                    value={values.zipcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="zipcode"
                    label="Código Postal"
                    variant="outlined"
                    style={{width: '100%'}}
                  />
                  <TextField
                    name="street"
                     inputProps={{
                      readOnly
                    }}
                    value={values.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="street"
                    label="Rua"
                    variant="outlined"
                    style={{width: '100%'}}
                  />
                  <TextField
                    name="advisedBy"
                     inputProps={{
                      readOnly
                    }}
                    value={values.advisedBy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="advisedBy"
                    label="Recomendado por"
                    variant="outlined"
                    style={{width: '100%'}}
                  />
                  <Button
                    type="submit"
                    disabled={readOnly}
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                  >Editar</Button>
              </form>
              </>
          )}

            </Formik>
           </DialogContent>
        </Dialog>
        
        </div>
    )
}



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default TableModal