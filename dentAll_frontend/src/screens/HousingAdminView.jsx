import React from 'react'
import { useState } from 'react'
import HoteliLista from './Index/HoteliLista'
import { useLocation } from "react-router-dom"

function HousingAdminView(props) {
const [hoteli, setHoteli] = useState([
    {
      id: 1,
      name: 'Hotel Esplanade'
    },
    {
      id: 2,
      name: 'Hotel Sheraton'
    },
    {
      id: 3,
      name: 'Hotel Westin'
    },

  ])
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
