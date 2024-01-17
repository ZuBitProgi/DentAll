import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa"
import { baseUrl } from '../..';

/*const UpdateFormDynamicList = ({ itemList }) => {
  const [list, setList] = useState(itemList);
  const [selectedItem, setSelectedItem] = useState(null);

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
    <div>
      <h1>Smjestaj</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            {item.tip} - {item.kategorija} - {item.adresa} 
          </li>
        ))}
      </ul>
      {selectedItem && (
        <UpdateForm
          initialData={{
            tip: selectedItem.tip,
            kategorija: selectedItem.kategorija,
            adresa: selectedItem.adresa,
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};*/

export default function SmjestajUpdateForm({ onClose, initialData, onUpdate }) {
  const [formData, setFormData] = useState(initialData);

  console.log(formData.dostupnost);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    if (token === null) {
      navigate("/");
      return;
    }

    await fetch(`${baseUrl}/api/accomodation/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(formData)
    })

    onUpdate(formData);
    onClose(true);

  };

  return (
    <div className="index">
      <div className="form-group-wrapper">
        <div className="overlap-group">
          <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></div>
          <div className="text-wrapper">Ažuriraj smještaj</div>
          <form onSubmit={handleSubmit}>

          <div className='overlap'>
            <label className='label-text'>
              adresa
            </label>
            <input type="text" name="adresa" className='input' value={formData.adresa} onChange={handleChange} />
          </div>
          <div className='overlap'>
            <label className='label-text'>
              tip
            </label>
            <input type="text" name="tip" className='input' value={formData.tip} onChange={handleChange} />
          </div>
          <div className='overlap'>
            <label className='label-text'>
              kategorija
            </label>
            <input type="text" name="Kategorija" className='input' value={formData.kategorija} onChange={handleChange} />
          </div>
          <div className='check-box-overlap'>
            <label className='check-label-text'><label className='label-text'>Dostupno</label>
                <input id="4" type="radio" className='check-box-input' name="dostupnost" value="true" checked={formData.dostupnost === true || formData.dostupnost === "true" ? true : false} onChange={handleChange} /> 
            </label>
            <label className='check-label-text'><label className='label-text'>Nedostupno</label>
                <input id="5" type="radio" className='check-box-input' name="dostupnost" value="false" checked={formData.dostupnost === false || formData.dostupnost === "false" ? true : false} onChange={handleChange} /> 
            </label>
          </div>
           



            <div className='buttonContainer'><button type="submit" className='btn'>ažuriraj</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

