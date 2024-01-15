import React from 'react'
import { useState } from 'react'
import { useLocation } from "react-router-dom"
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import List from '../components/SmjestajList'
import '../styles/HousingAdminView.css'
import AdminAddForm from './Index/AdminAddForm'


function HousingAdminView(props) {

  const [showForm, setShowForm] = useState(false);
  const closeForm = () => {
    setShowForm(false)
  }

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const location = useLocation()
  const username = location.state.username

  return (
    <div className='housing-container'>
      <p>Dobrodošli {username}</p>
      <p>Vaša uloga je Smještajni administrator</p>
      <div className="housing-list-and-map">
        <List path="accomodation"></List>
        <div className='housing-map'>
          <APIProvider apiKey={API_KEY}>
              <Map
                zoom={3}
                center={{lat: 22.54992, lng: 0}}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
              />
          </APIProvider>
        </div>
      </div>
      {showForm && <AdminAddForm onClose={closeForm}/>}
        {!showForm && <div className='button-overlay'> <button onClick={() => setShowForm(!showForm)}>dodaj admina</button> </div>}
    </div>
  )
}

export default HousingAdminView
