import React, { FC } from 'react'
import { ITableProps } from './table'
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent } from '@material-ui/core'
import { Formik } from 'formik'

interface IModalProps extends ITableProps {
    openModal: boolean
    handleClose: () => void
}

const TableModal: FC<IModalProps> = (props: IModalProps) => {

    return (
        <>
        <Dialog
            open={props.openModal}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
           <DialogContent>
                <Formik
                initialValues={{
                    name: '',
                    age: 0,
                    address: '',
                    email: '',
                    phone: '',
                    advisedBy: '',
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
                  <TextField 
                    name="name"
                    value={'Pedro'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="name"
                    label="Nome"
                    variant="outlined"
                    style={{width: '100%'}}
                  />
              </form>
              </>
          )}

            </Formik>
            
         <div>
             {props.data[0].name}
         </div>
           </DialogContent>
        </Dialog>
        
        </>
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