import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import List from '../components/SmjestajList'
import PrijevoznikAddForm from './Index/PrijevoznikAddForm'
import PrijevoznikList from '../components/PrijevoznikList'

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
            <label className='logo-text' onClick={()=>{navigate("/")}} style={{cursor: 'pointer'}}>DentAll</label>
            <button onClick={handleOdjava}>Odjava</button>
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
