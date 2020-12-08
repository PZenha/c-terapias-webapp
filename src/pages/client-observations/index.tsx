import MainLayout from '../../layout/main-layout'
import React, { FC } from 'react'
import { Card, CardContent } from '@material-ui/core'
import ObsCard from '../../components/observation-card'
import './client.scss'

export const Oh4servatiosList: FC = () => {
    const data = {
        "_id": "5f9c95f630613d85fcc99625",
        "name": "ines",
        "dob": "2020-10-22T00:00:00.000Z",
        "email": "ines@gmail.com",
        "phone": "91837332",
        "gender": "MALE",
        "address": {
            "city": "Gaia",
            "zipcode": "4415",
            "street": "Rua ines"
        },
        "advisedby": "Eu",
        "observations_id": "5f9c95f630613d85fcc99623",
        "observations": {
            "_id": "5f9c95f630613d85fcc99623",
            "observations": [{
                "created_at": "2020-10-30T22:38:46.485Z",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }]
        }
    }

    return(
        <>
        <div className="oh4s-wrapper">
            <div className="client-info">
               <Card style={{width: "50%"}}>
                   <CardContent>
                       <div className="info">
                           <h4 className="field">Nome: </h4>
                           <h4 className="text">{data.name}</h4>
                       </div>
                       <div className="info">
                           <h4 className="field">Data de Nascimento: </h4>
                           <h4 className="text">{data.dob}</h4>
                       </div>
                       <div className="info">
                           <h4 className="field">Email: </h4>
                           <h4 className="text">{data.email}</h4>

                           <h4 className="field">Contacto: </h4>
                           <h4 className="text">{data.phone}</h4>
                       </div> <div className="info">
                           <h4 className="field">Morada: </h4>
                           <h4 className="text">{data.address.street}</h4>
                       </div>
                       <div className="info">
                           <h4 className="field">Código Postal: </h4>
                           <h4 className="text">{data.address.zipcode}</h4>

                           <h4 className="field">Cidade: </h4>
                           <h4 className="text">{data.address.city}</h4>
                       </div>
                       <div className="info">
                           
                       </div>
                      
                   </CardContent>
               </Card>
                
            </div>
            {data.observations.observations.map( item => {
                return <ObsCard created_at={item.created_at} description={item.description} />
            })}
        </div>
        </>
    )
}

export default MainLayout(Oh4servatiosList)