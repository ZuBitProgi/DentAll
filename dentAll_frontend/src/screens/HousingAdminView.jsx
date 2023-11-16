import React from 'react'
import { useState } from 'react'

function HousingAdminView(props) {
    const location = useLocation()
    const username = location.state.username
  return (
    <div>
        <p>Dobrodošli {username}</p>
        <p>Vaša uloga je Smještajni administrator</p>
    </div>
  )
}

export default HousingAdminView