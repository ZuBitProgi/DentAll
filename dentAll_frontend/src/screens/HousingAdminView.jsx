import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation , useNavigate} from "react-router-dom"
import { APIProvider, Map, AdvancedMarker, Pin, Marker  } from '@vis.gl/react-google-maps';
import List from '../components/SmjestajList'
import '../styles/HousingAdminView.css'
import AdminAddForm from './Index/AdminAddForm'
import { baseUrl } from '..';
import { FaTooth } from "react-icons/fa";
import { IconContext } from "react-icons";


function HousingAdminView(props) {

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState([]);

  const closeForm = () => {
    setShowForm(false)
  }

  useEffect(() => {
    const fetchData = async () => {

        let token = localStorage.getItem("token")
  
        if (token === null) {
          navigate("/");
          return;
        }
        const response = await fetch(`${baseUrl}/api/accomodation`, {
          method: "GET",
          headers: {
            "Authorization": `${token}`,
          }
        });
  
        if (response.ok) {
          let newData = await response.json();
          const adrese = newData.map(data => data.adresa);
          setData(adrese);
        }
  
    }
    fetchData();
  }, [])


  useEffect(() => {

    const setCoords = async () => {
      let newCoords = []
      for (let adresa of data) {
        let res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${adresa}&key=${API_KEY}`)
        let resData = await res.json();

        newCoords.push({
          lat: resData.results[0].geometry.location.lat,
          lng: resData.results[0].geometry.location.lng
        })
      }

      console.log("New coords", newCoords)
      setCoordinates([...newCoords]);
    }


    setCoords()
  }, [data])



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
          <label className='user-name'>Smještajni administrator</label>
          <label className='user-name'>Korisnik: <span className='username'>{username}</span></label>
          <div className='housing-buttons'>
            <button className="odjava" onClick={handleOdjava}>Odjava</button>
            <button onClick={() => setShowForm(!showForm)} className='admin'>Dodaj admina</button>
          </div>
        </div>
      </div>
      {showForm && <AdminAddForm onClose={closeForm} />}
        <div className="housing-list-and-map">
          <List setParentData={setData} path="accomodation"></List>
            <button onClick={() => {setShowMap(!showMap)}}>Karta</button>
            {showMap &&           
            <div className='housing-map'>
              <APIProvider apiKey={API_KEY}>
                <Map
                  zoom={3}
                  center={{ lat: 22.54992, lng: 0 }}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                  mapId={'My map id'}
                >
                {
                  coordinates.map((c, i) => <Marker key={i} position={c}/>)
                }
                </Map>
              </APIProvider>
            </div>}
        </div>
    </div>
  )
}

export default HousingAdminView
