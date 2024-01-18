import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import List from '../components/SmjestajList'
import PrijevoznikAddForm from './Index/PrijevoznikAddForm'
import PrijevoznikList from '../components/PrijevoznikList'
import "../styles/TransportAdminView.css"
import { FaTooth } from "react-icons/fa";
import { IconContext } from "react-icons";

function TransportAdminView(props) {

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

    function handleOdjava() {
        localStorage.clear();
        navigate("/")
      }
    
return (
    <div className='korisnik-overlay'>
        <div className='header-info'>
        <div className='container1'>
          <div className='container2'>
            <IconContext.Provider value={{ color: "black", size: "5em", className: "global-class-name" }}>
              <div>
                <FaTooth />
              </div>
            </IconContext.Provider>
            <label className='logo-text' onClick={()=>{navigate("/")}} style={{cursor: 'pointer'}}>DentAll</label>
          </div>
        </div>
            <div className='user-info'>
                <label className='user-name'>Prijevozni administrator</label>
                <label className='user-name'>Korisnik: <span className='username'>{username}</span></label>
                <button  className="odjava" onClick={handleOdjava}>Odjava</button>
            </div>
        </div>
        <PrijevoznikList path="transport"></PrijevoznikList>
    </div>
  )
}

export default TransportAdminView
