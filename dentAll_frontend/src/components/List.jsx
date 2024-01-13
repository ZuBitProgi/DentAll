import React, { useEffect, useState } from 'react'
import { baseUrl } from '..';
import { useNavigate } from 'react-router-dom';
import Smjestaj from './Smjestaj';
import "../styles/List.css"
import ModalForm from './ModalForm';


const List = ({path}) => {
  let navigate = useNavigate()

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);


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

  function handleAddClick() {
    setShowForm(true);
  }

  async function handleDeleteClick(id) {

    await fetch (`${baseUrl}/api/accomodation/delete`, 
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
      }
    ) 

    setData([...data.filter((smjestajObject) => smjestajObject.id !== id)]);

  }

  return (
    <div>
      {<ul className='lista'>
      {data.map((smjestajObject, index) => (
        <li className="list-element" key={index}>
          <Smjestaj  {...smjestajObject}/>
          <button onClick={() => handleDeleteClick(smjestajObject.id)}>Delete</button>
        </li>
      ))}
      </ul>}
      <button onClick={handleAddClick}>Dodaj</button>
      {showForm && (
        <ModalForm data={data} setData={setData}/>
      )}
    </div>
  );
};

export default List
