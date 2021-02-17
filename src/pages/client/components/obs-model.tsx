import React, { FC, useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent, Button, Switch } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { Formik } from 'formik'
import { ISearchClientsQueryResult } from '../../../types'
import MutationAddObservation from '../../../graphql/mutations/add-observation'


export interface IModalProps  {
    client_id: string
    openModal: boolean
    handleClose: () => void
    refetchData: (data: any) => void
}

const ObsModal: FC<IModalProps> = (props: IModalProps) => {

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
                    description: ''
                }}
                onSubmit={ async (values) => {
                    const res = await MutationAddObservation({description: values.description, client_id: props.client_id})
                    console.log(res)
                    props.handleClose()
                    
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
              <>
              <div>

              <form onSubmit={handleSubmit}>
                
                  <TextField
                    name="description"
                    multiline
                    rows={10}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="description"
                    label="Nova observação"
                    variant="outlined"
                    style={{width: '100%'}}
                  />
                
                  <Button
                    type="submit"
                    disabled={false}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >Adicionar</Button>
              </form>
              </div>
              </>
          )}

            </Formik>
           </DialogContent>
        </Dialog>
        
        </div>
    )
}

export default ObsModal