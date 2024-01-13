import React from 'react'
import { useState } from 'react'
import HoteliLista from './Index/HoteliLista'
import SmjestajAddForm from './Index/SmjestajAddForm'
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
  const [showAdd, setShowAdd]= useState(false)
  const closeForm = () => {
    setShowAdd(false)
  }
  return (
    <div>
      <p>Dobrodošli {username}</p>
      <p>Vaša uloga je Smještajni administrator</p>
      <HoteliLista hoteli={hoteli} />
      {showAdd && <SmjestajAddForm onClose={closeForm}/>}
      {!showAdd && <div className='button-overlay'> <button onClick={() => setShowAdd(!showAdd)}>  dodaj </button> </div>}
    </div>
  )
}

export default HousingAdminView
