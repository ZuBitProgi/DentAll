import React, { useEffect, useState } from 'react'
import { baseUrl } from '..';
import { useNavigate } from 'react-router-dom';
import Korisnik from './Korisnik';
import "../styles/List.css"
import KorisnikAddForm from '../screens/Index/KorisnikAddForm';


const UserList = ({path}) => {
  let navigate = useNavigate()

  const [data, setData] = useState([]);

  const [showAdd, setShowAdd]= useState(false)
  const closeForm = () => {
      setShowAdd(false)
    }


  const fetchData = async () => {

    try {
     
      let token = localStorage.getItem("token")

      if (token === null) {
        navigate("/");
        return;
      }
      const response = await fetch(`${baseUrl}/api/${path}`, {
        method: "GET",
        headers: {
          "Authorization": `${token}`,
        }
      });

      if (response.ok) {
        let newData = await response.json();
        setData(newData);
      }

    } catch (error) {
      console.log("greska pri dohvacanju podataka");
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function handleDeleteClick(id) {

    await fetch (`${baseUrl}/api/user/delete`, 
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
      }
    ) 

    setData([...data.filter((korisnikObject) => korisnikObject.id !== id)]);
  }

  return (
    <div className='container'>
      {<ul className='lista'>
      {data.map((korisnikObject, index) => (
        <li className="list-element" key={index}>
          <Korisnik  {...korisnikObject}/>
          <button onClick={() => handleDeleteClick(korisnikObject.id)}>Delete</button>
        </li>
      ))}
      </ul>}
      {showAdd && <KorisnikAddForm onClose={closeForm} data={data} setData={setData}/>}
        {!showAdd && <div className='button-overlay'> <button onClick={() => setShowAdd(!showAdd)}>dodaj</button> </div>}
    </div>
  );
};

export default UserList;
