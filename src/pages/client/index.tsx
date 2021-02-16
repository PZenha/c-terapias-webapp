import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import MainLayout from '../../layout/main-layout'

import { Card, CardContent } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIphoneRoundedIcon from '@material-ui/icons/PhoneIphoneRounded';

import { ISearchClientsQueryResult } from '../../types'
import getClient from '../../graphql/queries/get-client'
import './client-info.scss'



const ClientView: FC = () => {
    const [client, setClient] = useState<ISearchClientsQueryResult | null>(null)
    const params = useParams<{id: string}>()
    const _id = params?.id
    const info = [
      {
        icon: <EventRoundedIcon />,
        info: `${moment(client?.dob).format('DD/MM/YYYY')} - ${moment().diff(client?.dob, 'years')} anos`
      },
      {
        icon: <EmailIcon />,
        info: client?.email || ''
      },
      {
        icon: <PhoneIphoneRoundedIcon />,
        info: client?.phone || ''
      },
      {
        icon: <LocationOnIcon/>,
        info: `${client?.address.street}, ${client?.address.city}  ${client?.address.zipcode}`
      }
    ]

    useEffect(() => {
      const getClientData = async () => {
        const res = await getClient(_id)
        const clientData = res.data?.client || null
        setClient(clientData)
      }
     getClientData()
    },[])

    return(
        <div>
      <Card>
        <CardContent>
          <div className="card-wrapper">
            <PersonIcon />
            <div className="info-wrapper-column">
              {info.map((i) => (
                i.info && (
                  <InfoWrapper icon={i.icon} info={i.info}/>
                )
              ))}
           
             </div>
          </div>
        </CardContent>
      </Card>
        </div>
    )
}


const InfoWrapper: FC<{icon: JSX.Element, info: string}> = ({icon, info}) => (
  <div className="info-wrapper">
    {icon}
  <span>{info}</span>
  </div>
)

export default MainLayout(ClientView)