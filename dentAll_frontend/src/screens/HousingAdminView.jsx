import React from 'react'
import { useState } from 'react'
import HoteliLista from './Index/HoteliLista'
import SmjestajAddForm from './Index/SmjestajAddForm'
import { useLocation } from "react-router-dom"
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import List from '../components/SmjestajList'

import '../styles/HousingAdminView.css'

function HousingAdminView(props) {

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
    </div>
  )
}

export default HousingAdminView
