import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import KorisnikAddForm from './Index/KorisnikAddForm'
import UserList from "../components/UserList"

function UserAdminView(props) {

  const navigate = useNavigate();
  const location = useLocation()
  const [username, setUsername] = useState("");

  useEffect(() => {
      if (location.state === null || localStorage.getItem("token") === null) {
          navigate("/")
      } else {
          setUsername(location.state.username)
      }

  }, [])
  const [showAdd, setShowAdd] = useState(false)
  const closeForm = () => {
    setShowAdd(false)
  }

  function handleOdjava() {
    localStorage.clear();
    navigate("/")
  }

  return (
    <div className='korisnik-overlay'>
      <div className='header-info'>
        <label className='logo-text' onClick={()=>{navigate("/")}} style={{cursor: 'pointer'}}>DentAll</label>
        <button onClick={handleOdjava}>Odjava</button>
        <div className='user-info'>
          <label className='user-name'>{username}</label>
          <label>Korisnički administrator</label>
        </div>
      </div>
      <UserList path="user"></UserList>
    </div>
  )
}

export default UserAdminView