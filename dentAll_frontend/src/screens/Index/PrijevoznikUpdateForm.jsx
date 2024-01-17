import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa"
import { baseUrl } from '../..';
import { useNavigate } from 'react-router-dom';


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
                <label className='label-text'>vrsta</label>
                <input name="vrsta" value={formData.vrsta} className="input" placeholder=" ..." type="text" onChange={handleChange} />
            </div>
            <div className='overlap'>
                <label className='label-text'>kapacitet</label>
                <input name="kapacitet" value={formData.kapacitet} className="input" placeholder=" ..." type="text" onChange={handleChange} />
            </div>
            <div className='overlap'>
                <label className='label-text'>model</label>
                <input name="model" value={formData.model} className="input" placeholder=" ..." type="text" onChange={handleChange} />
            </div>
            <div className='buttonContainer'><button type="submit" className='btn'>Ažuriraj</button></div>
          </form>
        </div>
      </div>
    </div>
  )
}
