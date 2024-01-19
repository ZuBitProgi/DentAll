import React, { useEffect, useState } from 'react'
import { baseUrl } from '..';
import { useNavigate } from 'react-router-dom';
import Smjestaj from './Smjestaj';
import "../styles/List.css"
import SmjestajAddForm from '../screens/Index/SmjestajAddForm';
import SmjestajUpdateForm from '../screens/Index/SmjestajUpdateForm';


const List = ({path, setParentData}) => {
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
        const adrese = newData.map(data => data.adresa);
        setParentData([...adrese]);
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

    const newData = [...data.filter((smjestajObject) => smjestajObject.id !== id)];
    setData(newData);
    setParentData([...newData.map(data => data.adresa)])

  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleUpdate = (updatedData) => {
    if (selectedItem) {
      setSelectedItem(null);
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === updatedData.id) {
        let newData = data;
        newData[i] = updatedData;
        setData(newData);
        setParentData([...newData.map(data => data.adresa)]);
        break;
      }
    }
  };

  return (
    <div className='container'>
      {<ul className='lista'>
       <div className='listFirstRow'>SMJESTAJ
       </div>
      {data.map((smjestajObject, index) => (
        <li className="list-element" key={index} >
          <Smjestaj {...smjestajObject} onClick={() => handleItemClick(smjestajObject)}/>
         { <div className='delete-container'><button onClick={() => handleDeleteClick(smjestajObject.id)} className='delBtn'>Delete</button></div> }
        </li>
      ))}
      
      {!showAdd && <div className='button-overlay'> <button onClick={() => setShowAdd(!showAdd)} className='addBtn'>Dodaj</button> </div>}
      </ul>}
      {selectedItem && (
        <SmjestajUpdateForm
          initialData={{
            id: selectedItem.id,
            tip: selectedItem.tip,
            kategorija: selectedItem.kategorija,
            adresa: selectedItem.adresa,
            dostupnost: selectedItem.dostupnost
          }}
          onUpdate={handleUpdate}
          onClose={updateCloseForm}
        />
      )}
      {showAdd && <SmjestajAddForm onClose={closeForm} data={data} setData={setData}/>}
       
    </div>
  );
};

export default List
