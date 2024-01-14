import React, { useEffect, useState } from 'react'
import { baseUrl } from '..';
import { useNavigate } from 'react-router-dom';
import "../styles/List.css"
import PrijevoznikAddForm from '../screens/Index/PrijevoznikAddForm';
import Prijevoznik from './Prijevoznik';


const PrijevoznikList = ({path}) => {
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
        console.log(newData)
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

    await fetch (`${baseUrl}/api/transport/delete`, 
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
      }
    ) 

    setData([...data.filter((prijevoznikObject) => prijevoznikObject.id !== id)]);
  }

  return (
    <div className='container'>
      {<ul className='lista'>
      {data.map((prijevoznikObject, index) => (
        <li className="list-element" key={index}>
          <Prijevoznik  {...prijevoznikObject}/>
          <button onClick={() => handleDeleteClick(prijevoznikObject.id)}>Delete</button>
        </li>
      ))}
      </ul>}
      {showAdd && <PrijevoznikAddForm onClose={closeForm} data={data} setData={setData}/>}
        {!showAdd && <div className='button-overlay'> <button onClick={() => setShowAdd(!showAdd)}>dodaj</button> </div>}
    </div>
  );
};

export default PrijevoznikList
