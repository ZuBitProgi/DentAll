import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import KorisnikAddForm from './Index/KorisnikAddForm'
import UserList from "../components/UserList"

function UserAdminView(props) {
    const location = useLocation()
    const username = location.state.username
    const [showAdd, setShowAdd]= useState(false)
    const closeForm = () => {
      setShowAdd(false)
    }
  return (
    <div className='korisnik-overlay'>
        <p>Dobrodošli {username}</p>
        <p>Vaša uloga je Korisnički administrator</p>
        <UserList path="user"></UserList>
    </div>
  )
}

export default UserAdminView