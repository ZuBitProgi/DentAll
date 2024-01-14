import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import List from '../components/SmjestajList'
import PrijevoznikAddForm from './Index/PrijevoznikAddForm'
import PrijevoznikList from '../components/PrijevoznikList'

function TransportAdminView(props) {

    // const location = useLocation()
    // const username = location.state.username  

return (
    <div className='korisnik-overlay'>
        <p>Dobrodošli</p>
        <p>Vaša uloga je Prijevozni administrator</p>
        <PrijevoznikList path="transport"></PrijevoznikList>
    </div>
  )
}

export default TransportAdminView
