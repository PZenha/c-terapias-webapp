import React, { Children, FC, useState } from 'react'
import moment from 'moment'
import TableModal, { SimpleModal } from './table-modal'
import './table.scss'



export interface ITableProps {
    data:{
 name: string
        dob: Date
        phone?: string
        email: string
        address: {
            city: string
            zipcode: string
            street: string
        }  
        created_at: Date
        advisedBy: string
        observations_count: number
    }[]
       
}

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
    <tr className='table-header'>
        {children}
    </tr>
)

export const HeaderColumn: FC = ({children}) => (
    <th>
        {children}
    </th>
)

export const Row: FC<{data: any, onProceed: () => void}> = ({children, data, onProceed}) => (
    <tr className='row-style' onClick={() => onProceed()}>
        {children}
    </tr>
)

export const RowCell: FC = ({children}) => (
    <td className='row-cell-style'>
        {children}
    </td>
)

export const GenerateTable: FC<ITableProps> = (props: ITableProps) => {
    //const { name, dob, email, phone, created_at, address, advisedBy, observations_count} = props.data
    const [openModal, setOpenModal] = useState(false)
    const twenty = moment().subtract(20, 'years')
    return (
        <>
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
          {props.data.map( data => (
            <Row data={data} onProceed={() => setOpenModal(true)}>
              <RowCell>{data.name}</RowCell>
              <RowCell>{`${moment(data.dob).format('DD/MM/YYYY')} - ${moment().diff(twenty, 'years')}`}</RowCell>
              <RowCell>{data.address.city}</RowCell>
              <RowCell>{data.email}</RowCell>
              <RowCell>{data.phone}</RowCell>
              <RowCell>{data.advisedBy}</RowCell>
              <RowCell>{data.observations_count}</RowCell>
          </Row>
          ))}
          
      </Table>
      <TableModal data={props.data} openModal={openModal} handleClose={() => setOpenModal(false)}/>
      {/* <SimpleModal /> */}
      </>
    )
}
export default Table