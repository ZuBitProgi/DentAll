import React, { useEffect, useState } from 'react'
import { baseUrl } from '..';
import { useNavigate } from 'react-router-dom';
import Smjestaj from './Smjestaj';
import "../styles/List.css"


const List = ({path}) => {
  let navigate = useNavigate()

  const [data, setData] = useState([]);

  const fetchData = async () => {

    try {
     
      let token = localStorage.getItem("token")

      if (token === null) {
        navigate("/");
        return;
      }

      console.log(token)
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


  return (
    <div>
      {<ul className='lista'>
      {data.map((smjestajObject, index) => (
        <li key={smjestajObject.id}>
          <Smjestaj  {...smjestajObject}/>
        </li>
      ))}
      </ul>}
    </div>
  );
};

export default List
