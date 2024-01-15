import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa"

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
      <h1>Korisnik</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            {item.ime} {item.prezime} - {item.preference} - {item.kontakt} -{item.datumDolaska} -{item.datumOdlaska}
          </li>
        ))}
      </ul>
      {selectedItem && (
        <UpdateForm
          initialData={{
            ime: selectedItem.ime,
            prezime: selectedItem.prezime,
            preference: selectedItem.preference,
            kontakt: selectedItem.kontakt,
            datumDolaska: selectedItem.datumDolaska,
            datumOdlaska: selectedItem.datumOdlaska
          }}
          onUpdate={(updatedData) => handleUpdate(updatedData)}
        />
      )}
    </div>
  );
};*/

export default function KorisnikUpdateForm({ onClose, initialData, onUpdate }) {
  const [formData, setFormData] = useState(initialData);

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

    await fetch(`${baseUrl}/api/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(formData)
    })

    onClose(true);
    onUpdate(formData);
  };

  return (
    <div className="index">
      <div className="form-group-wrapper">
        <div className="overlap-group">
          <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></div>
          <div className="text-wrapper"> ažuriraj korisnika</div>
          <form onSubmit={handleSubmit}>

            <div className='overlap'>
              <label className='label-text'>
                ime
              </label>
              <input type="text" name="ime" className='input' value={formData.ime} onChange={handleChange} />

            </div>

            <div className='overlap'>
              <label className='label-text'>
                prezime
              </label>
              <input type="text" name="prezime" className='input' value={formData.prezime} onChange={handleChange} />

            </div>

            <div className='overlap'>
              <label className='label-text'>
                preference
              </label>
              <input type="text" name="preference" className='input' value={formData.preference} onChange={handleChange} />

            </div>

            <div className='overlap'>
              <label className='label-text'>
                kontakt
              </label>
              <input type="text" name="kontakt" className='input' value={formData.kontakt} onChange={handleChange} />

            </div>

            <div className='overlap'>
              <label className='label-text'>
                datum dolaska
              </label>
              <input type="date" name="datum dolaska" className='input' value={formData.datumDolaska} onChange={handleChange} />

            </div>

            <div className='overlap'>
              <label className='label-text'>
                datum odlaska
              </label>
              <input type="date" name="datum odlaska" className='input' value={formData.datumOdlaska} onChange={handleChange} />

            </div>

            <div className='buttonContainer'><button type="submit" className='btn'>ažuriraj</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};
