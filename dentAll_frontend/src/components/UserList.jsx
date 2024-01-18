import React, { useEffect, useState } from 'react'
import { baseUrl } from '..';
import { useNavigate } from 'react-router-dom';
import Korisnik from './Korisnik';
import "../styles/List.css"
import KorisnikAddForm from '../screens/Index/KorisnikAddForm';
import KorisnikUpdateForm from '../screens/Index/KorisnikUpdateForm';


const UserList = ({path}) => {
  let navigate = useNavigate()

  const [data, setData] = useState([]);

  const [showAdd, setShowAdd]= useState(false)
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
        <div className='listFirstRow'><div>KORISNICI:</div></div>
      {data.map((korisnikObject, index) => (
        <li className="list-element" key={index} onClick={() => handleItemClick(korisnikObject)}>
          <Korisnik  {...korisnikObject}/>
          <div className='delete-container'><button onClick={() => handleDeleteClick(korisnikObject.id)} className='delBtn'>Obriši</button></div>
        </li>
      ))}
      {!showAdd && <div className='button-overlay'> <button className='addBtn' onClick={() => setShowAdd(!showAdd)}>Dodaj</button> </div>}

      </ul>}
      {selectedItem && (
        <KorisnikUpdateForm
          initialData={{
            id: selectedItem.id,
            ime: selectedItem.ime,
            prezime: selectedItem.prezime,
            preference: selectedItem.preference,
            kontakt: selectedItem.kontakt,
            datumDolaska: selectedItem.datumDolaska,
            datumOdlaska: selectedItem.datumOdlaska
          }}
          onUpdate={(updatedData) => handleUpdate(updatedData)}
          onClose={updateCloseForm}
        />
      )}
      {showAdd && <KorisnikAddForm onClose={closeForm} data={data} setData={setData}/>}
    </div>
  );
};

export default UserList;
