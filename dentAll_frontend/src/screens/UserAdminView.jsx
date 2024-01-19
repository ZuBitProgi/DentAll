import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserList from "../components/UserList"
import "../styles/UserAdminView.css"
import { FaTooth } from "react-icons/fa";
import { IconContext } from "react-icons";

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
        <div className='container2'>
        <IconContext.Provider value={{ color: "black", size: "5em", className: "global-class-name" }}>
          <div>
            <FaTooth />
          </div>
        </IconContext.Provider>
        <label className='logo-text' onClick={()=>{navigate("/")}} style={{cursor: 'pointer'}}>DentAll</label>
        </div>
        <div className='user-info'>
          <label id="admin">Korisnički administrator</label>
          <label className='user-name'>Korisnik: <span className='username'>{username}</span></label>
          <button className="odjava" onClick={handleOdjava}>Odjava</button>
        </div>
      </div>
      <div className='frame'>
      <UserList path="user"></UserList>
      </div>
    </div>
  )
}

export default UserAdminView