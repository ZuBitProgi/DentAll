import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

function UserAdminView(props) {
    const location = useLocation()
    const username = location.state.username
  return (
    <div>
        <p>Dobrodošli {username}</p>
        <p>Vaša uloga je Korisnički administrator</p>
    </div>
  )
}

export default UserAdminView