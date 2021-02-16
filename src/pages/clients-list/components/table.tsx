import React, { Children, FC, useState } from 'react'
import moment from 'moment'
import TableModal, { SimpleModal } from './table-modal'
import { IClientData } from '../../../types'
import EditIcon from '@material-ui/icons/Edit';
import { ISearchClientsQueryResult } from '../../../types'
import { useHistory } from 'react-router-dom'
import './table.scss'


const Table: FC = ({children}) => {

    return(
        <>
        <table className='table'>
            {children}
        </table>
        </>
    )
}

export const TableHeader: FC = ({children}) => (
    <thead>
        <tr className='table-header'>
            {children}
        </tr>
    </thead>
   
)

export const HeaderColumn: FC = ({children}) => (
    <th>
        {children}
    </th>
)

export const TableBody: FC = ({children}) => (
    <tbody className="table-body">
        {children}
    </tbody>
)

export const Row: FC<{navigateOnDClick: () => void}> = ({children, navigateOnDClick}) => (
    <tr className='row-style' onDoubleClick={() => navigateOnDClick()}>
        {children}
    </tr>
)

export const RowCell: FC<{displayEditIcon?: () => void, hideEditIcon?: () => void}> = ({children, displayEditIcon, hideEditIcon}) => (
    <td 
        className='row-cell-style' 
        onMouseEnter={() => displayEditIcon?.()}
        onMouseLeave={() => hideEditIcon?.()}
    >
        {children}
    </td>
)

export const GenerateTable: FC<{clients: ISearchClientsQueryResult[]}> = ({clients}) => {
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false)
    const [showEditIcon, setShowEditIcon] = useState('')
    const [selectedData, setSelectedData] = useState<ISearchClientsQueryResult | null>(null)
    return (
        <div className='tabble-wrapper'>
        <Table>
          <TableHeader>
              <HeaderColumn>Nome</HeaderColumn>
              <HeaderColumn>Idade</HeaderColumn>
              <HeaderColumn>Morada</HeaderColumn>
              <HeaderColumn>E-Mail</HeaderColumn>
              <HeaderColumn>Telm.</HeaderColumn>
              <HeaderColumn>Recomendação</HeaderColumn>
              <HeaderColumn>Observações</HeaderColumn>
          </TableHeader>
          <TableBody>
          {clients.map( data => (
            <Row navigateOnDClick={() => history.push(`/client/${data._id}`)}>
              <RowCell 
                key={data._id} 
                displayEditIcon={() => {
                    setShowEditIcon(data._id)
                }}
                hideEditIcon={() => setShowEditIcon('')}
            
                >{
                  <div style={{display:'flex'}}>
                {showEditIcon === data._id && (<div onClick={() => {
                    setOpenModal(true)
                    setSelectedData(data)
                }
                    } style={{marginRight: '5px', cursor: 'pointer'}}><EditIcon fontSize={'small'}/></div>)}
                  <span 
                   
                    >{data.name}</span>
                  </div>
                  }
                  </RowCell>
              <RowCell>{`${moment(data.dob).format('DD/MM/YYYY')} - ${moment().diff(data.dob, 'years')}`}</RowCell>
              <RowCell>{data.address.city}</RowCell>
              <RowCell>{data.email}</RowCell>
              <RowCell>{data.phone}</RowCell>
              <RowCell>{data.advisedBy}</RowCell>
              <RowCell>{data.observations.length}</RowCell>
          </Row>
         
          ))}
           </TableBody>
      </Table>
      <TableModal data={selectedData as ISearchClientsQueryResult} openModal={openModal} handleClose={() => setOpenModal(false)}/>
      </div>
    )
}
export default Table