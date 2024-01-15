import React, { useEffect, useState } from 'react'
import { baseUrl } from '..';
import { useNavigate } from 'react-router-dom';
import "../styles/List.css"
import PrijevoznikAddForm from '../screens/Index/PrijevoznikAddForm';
import Prijevoznik from './Prijevoznik';
import PrijevoznikUpdateForm from '../screens/Index/PrijevoznikUpdateForm';


const PrijevoznikList = ({ path }) => {
  let navigate = useNavigate()

  const [data, setData] = useState([/*{ id: 1, kontakt: '+385998432345', radnoVrijemeOd: '08:00', radnoVrijemeDo: '15:00', voziloId: 1 },
  { id: 2, kontakt: '+385998432346', radnoVrijemeOd: '08:00', radnoVrijemeDo: '16:00', voziloId: 2 },
{ id: 3, kontakt: '+385998432347', radnoVrijemeOd: '09:00', radnoVrijemeDo: '17:00', voziloId: 3 },*/]);

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
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleUpdate = (updatedData) => {
    if (selectedItem) {
      setList((prevList) =>
        prevList.map((item) =>
          item.id === selectedItem.id ? { ...item, ...updatedData } : item
        )
      );
      setSelectedItem(null);
    }
  };


  return (
    <div className='container'>
      {<ul className='lista'>
        {data.map((prijevoznikObject, index) => (
          <li className="list-element" key={index} onDoubleClick={() => handleItemClick(prijevoznikObject)}>
            <Prijevoznik  {...prijevoznikObject} />
            <button onClick={() => handleDeleteClick(prijevoznikObject.id)}>Delete</button>
          </li>
        ))}
      </ul>}
      {selectedItem && (
        <PrijevoznikUpdateForm
          initialData={{
            kontakt: selectedItem.kontakt,
            radnoVrijemeOd: selectedItem.radnoVrijemeOd,
            radnoVrijemeDo: selectedItem.radnoVrijemeDo,
            voziloId: selectedItem.voziloId,
          }}
          onUpdate={handleUpdate}
          onClose={updateCloseForm}
        />
      )}
      {showAdd && <PrijevoznikAddForm onClose={closeForm} data={data} setData={setData} />}
      {!showAdd && <div className='button-overlay'> <button onClick={() => setShowAdd(!showAdd)}>dodaj</button> </div>}
    </div>
  );
};

export default PrijevoznikList
