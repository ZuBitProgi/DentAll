import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import KorisnikAddForm from './Index/KorisnikAddForm'

function UserAdminView(props) {
    const location = useLocation()
    const username = location.state.username
    const [showAdd, setShowAdd]= useState(false)
    const closeForm = () => {
      setShowAdd(false)
    }
  return (
    <div>
        <p>Dobrodošli {username}</p>
        <p>Vaša uloga je Korisnički administrator</p>
        {showAdd && <KorisnikAddForm onClose={closeForm}/>}
        {!showAdd && <div className='button-overlay'> <button onClick={() => setShowAdd(!showAdd)}>  dodaj </button> </div>}
    </div>
  )
}

export default UserAdminView