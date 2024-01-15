import React, { useEffect, useState } from 'react'
import { baseUrl } from '..';
import { useNavigate } from 'react-router-dom';
import Smjestaj from './Smjestaj';
import "../styles/List.css"
import ModalForm from './ModalForm';
import SmjestajAddForm from '../screens/Index/SmjestajAddForm';
import SmjestajUpdateForm from '../screens/Index/SmjestajUpdateForm';


const List = ({path}) => {
  let navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);

  const [showAdd, setShowAdd]= useState(false)
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
      {data.map((smjestajObject, index) => (
        <li className="list-element" key={index} onDoubleClick={() => handleItemClick(smjestajObject)}>
          <Smjestaj  {...smjestajObject}/>
          <button onClick={() => handleDeleteClick(smjestajObject.id)}>Delete</button>
        </li>
      ))}
      </ul>}
      {selectedItem && (
        <SmjestajUpdateForm
          initialData={{
            tip: selectedItem.tip,
            kategorija: selectedItem.kategorija,
            adresa: selectedItem.adresa,
          }}
          onUpdate={handleUpdate}
          onClose={updateCloseForm}
        />
      )}
      {showAdd && <SmjestajAddForm onClose={closeForm} data={data} setData={setData}/>}
        {!showAdd && <div className='button-overlay'> <button onClick={() => setShowAdd(!showAdd)}>dodaj</button> </div>}
    </div>
  );
};

export default List
