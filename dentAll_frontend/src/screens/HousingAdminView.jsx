import React from 'react'
import { useState } from 'react'
import HoteliLista from './Index/HoteliLista'

function HousingAdminView(props) {
    const location = useLocation()
    const username = location.state.username
  return (
    <div>
        <p>Dobrodošli {username}</p>
        <p>Vaša uloga je Smještajni administrator</p>
        <HoteliLista hoteli={hoteli}/>
    </div>
  )
}

export default HousingAdminView