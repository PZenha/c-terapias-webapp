import React, { FC, useEffect, useState, SyntheticEvent } from 'react'
import { useParams } from 'react-router-dom'


const ClientView: FC = () => {
    const params = useParams<{id: string}>()
    const id = params?.id
    return(
        <>
      {id}
        </>
    )
}

export default ClientView