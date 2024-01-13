import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import List from '../components/List'
import PrijevoznikAddForm from './Index/PrijevoznikAddForm'

function TransportAdminView(props) {

    const location = useLocation()
    const username = location.state.username  

    const [showAdd, setShowAdd]= useState(false)
    const closeForm = () => {
        setShowAdd(false)
      }
return (
    <div className='korisnik-overlay'>
        <p>Dobrodošli {username}</p>
        <p>Vaša uloga je Prijevozni administrator</p>
        <List path="transport"></List>
        {showAdd && <PrijevoznikAddForm onClose={closeForm}/>}
        {!showAdd && <div className='button-overlay'> <button onClick={() => setShowAdd(!showAdd)}>  dodaj </button> </div>}
    </div>
  )
}

export default TransportAdminView
