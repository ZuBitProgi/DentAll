import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import List from '../components/SmjestajList'
import PrijevoznikAddForm from './Index/PrijevoznikAddForm'
import PrijevoznikList from '../components/PrijevoznikList'

function TransportAdminView(props) {

    const location = useLocation()
    const username = location.state.username  

return (
    <div className='korisnik-overlay'>
        <div className='header-info'>
            <label className='logo-text'>DentAll</label>
            <div className='user-info'>
                <label className='user-name'>{username}</label>
                <label>Prijevozni administrator</label>
            </div>
        </div>
        {/*<p>Dobrodošli {username}</p>
        <p>Vaša uloga je Prijevozni administrator</p>*/}
        <PrijevoznikList path="transport"></PrijevoznikList>
    </div>
  )
}

export default TransportAdminView
