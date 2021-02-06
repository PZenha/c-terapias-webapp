import React, { Children, FC, useState } from 'react'
import moment from 'moment'
import TableModal, { SimpleModal } from './table-modal'
import { IClientData } from '../../../types'
import EditIcon from '@material-ui/icons/Edit';
import { ISearchClientsQueryResult } from '../../../types'
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

export const Row: FC = ({children}) => (
    <tr className='row-style'>
        {children}
    </tr>
)

export const RowCell: FC<{onProceed?: () => void}> = ({children, onProceed}) => (
    <td className='row-cell-style' onClick={() => onProceed?.()}>
        {children}
    </td>
)

export const GenerateTable: FC<{clients: ISearchClientsQueryResult[]}> = ({clients}) => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedData, setSelectedData] = useState<ISearchClientsQueryResult | null>(null)
    const twenty = moment().subtract(20, 'years')
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
            <Row>
              <RowCell onProceed={() => {
                  setOpenModal(true)
                setSelectedData(data)
              }}>{<span style={{textDecoration:"underline", cursor:"pointer", color:"CaptionText"}}>{data.name}</span>}</RowCell>
              <RowCell>{`${moment(data.dob).format('DD/MM/YYYY')} - ${moment().diff(twenty, 'years')}`}</RowCell>
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
      {/* <SimpleModal /> */}
      </div>
    )
}
export default Table