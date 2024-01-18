import React, { useEffect, useState } from 'react'
import { baseUrl } from '..';
import { useNavigate } from 'react-router-dom';
import "../styles/List.css"
import PrijevoznikAddForm from '../screens/Index/PrijevoznikAddForm';
import Prijevoznik from './Prijevoznik';
import PrijevoznikUpdateForm from '../screens/Index/PrijevoznikUpdateForm';
import { FaTimes } from "react-icons/fa"


const PrijevoznikList = ({ path }) => {
  let navigate = useNavigate()

  const [data, setData] = useState([]);

  const [showAdd, setShowAdd] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null);
  const closeForm = () => {
    setShowAdd(false)
  }

  const updateCloseForm = () => {
    setSelectedItem(null)
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

    await fetch(`${baseUrl}/api/transport/delete`,
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
    setSelectedItem(null);
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleUpdate = (updatedData) => {
    if (selectedItem) {
      setSelectedItem(null);
    }

    let newData = data;
    for (let i = 0; i < data.length; i++) {
      if (newData[i].id === updatedData.id) {
        newData[i] = updatedData;
        break;
      }
    }

    setData([...newData])
  };


  return (
    <div className='container'>
      {<ul className='lista'>
        <div className='listFirstRow'><div>PRIJEVOZNICI:</div> {/*<div>radno vrijeme</div><div className='lastElement'>vozilo id</div>*/} 
        {!showAdd && <div className='button-overlay'> <button onClick={() => setShowAdd(!showAdd)} className='addBtn'>Dodaj</button> </div>}
        </div>
        {data.map((prijevoznikObject, index) => (
          <li className="list-element" key={index} >
            <Prijevoznik  {...prijevoznikObject} onClick={() => handleItemClick(prijevoznikObject) }/>
            <div className='delete-container'><button onClick={() => handleDeleteClick(prijevoznikObject.id) } className='delBtn'>Obriši</button></div>
          </li>
        ))}
      </ul>}
      {selectedItem && (
        <PrijevoznikUpdateForm
          initialData={{
            id: selectedItem.id,
            kontakt: selectedItem.kontakt,
            radnoVrijemeOd: selectedItem.radnoVrijemeOd,
            radnoVrijemeDo: selectedItem.radnoVrijemeDo,
            vrsta: selectedItem.vrsta,
            kapacitet: selectedItem.kapacitet,
            model: selectedItem.model
          }}
          onUpdate={handleUpdate}
          onClose={updateCloseForm}
        />
      )}
      {showAdd && <PrijevoznikAddForm onClose={closeForm} data={data} setData={setData} />}
    </div>
  );
};

export default PrijevoznikList
