import React from 'react'
import { useState } from 'react'
import HoteliLista from './Index/HoteliLista'
import SmjestajAddForm from './Index/SmjestajAddForm'
import { useLocation } from "react-router-dom"
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import List from '../components/List'

import '../styles/HousingAdminView.css'

function HousingAdminView(props) {

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


  const [hoteli, setHoteli] = useState([
    {
      id: 1,
      name: 'Hotel Esplanade'
    },
    {
      id: 2,
      name: 'Hotel Sheraton'
    },
    {
      id: 3,
      name: 'Hotel Westin'
    },

  ])
  const location = useLocation()
  const username = location.state.username
  const [showAdd, setShowAdd]= useState(false)
  const closeForm = () => {
    setShowAdd(false)
  }
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
      {showAdd && <SmjestajAddForm onClose={closeForm}/>}
      {!showAdd && <div className='button-overlay'> <button onClick={() => setShowAdd(!showAdd)}>  dodaj </button> </div>}
    </div>
  )
}

export default HousingAdminView
