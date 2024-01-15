import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa"
import { baseUrl } from '../..';
import { useNavigate } from 'react-router-dom';

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
      <h1>Prijevoznik</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            {item.kontakt} - {item.radnoVrijeme} - {item.voziloId} 
          </li>
        ))}
      </ul>
      {selectedItem && (
        <UpdateForm
          initialData={{
            kontakt: selectedItem.kontakt,
            radnoVrijeme: selectedItem.radnoVrijeme,
            voziloId: selectedItem.voziloId,
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};*/

export default function PrijevoznikUpdateForm({ onClose, initialData, onUpdate }) {
  const [formData, setFormData] = useState(initialData);

  const navigate = useNavigate();

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

    await fetch(`${baseUrl}/api/transport/update`, {
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
          <div className="text-wrapper"> ažuriraj Prijevoznika</div>
          <form onSubmit={handleSubmit}>
            <div className='overlap'>
              <label className='label-text'>
                Kontakt
              </label>
              <input type="text" name="kontakt" className='input' value={formData.kontakt} onChange={handleChange} />

            </div>
            <div className='overlap'>
              <label className='label-text'>
                Radno vrijeme od
                <input type="text" name="radnoVrijemeOd" className='input' value={formData.radnoVrijemeOd} onChange={handleChange} />
              </label>
            </div>
            <div className='overlap'>
              <label className='label-text'>Radno vrijeme do
                <input type="text" name="radnoVrijemeDo" className='input' value={formData.radnoVrijemeDo} onChange={handleChange} />
              </label>
            </div>
            <div className='overlap'>
              <label className='label-text'>
                ID vozila
              </label>
              <input type="text" name="voziloId" className='input' value={formData.voziloId} onChange={handleChange} />
            </div>
            <div className='buttonContainer'><button type="submit" className='btn'>ažuriraj</button></div>
          </form>
        </div>
      </div>
    </div>
  )
}
