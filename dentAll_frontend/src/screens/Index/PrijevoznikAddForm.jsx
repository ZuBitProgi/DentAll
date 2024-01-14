import React from 'react'
import { FaTimes } from "react-icons/fa"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../..';

export default function PrijevoznikAddForm({onClose, data, setData}) {

    const [newTransportData, setNewTransportData] = useState({ kontakt: '', radnoVrijemeOd: '', radnoVrijemeDo: '', voziloId: '' });
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setNewTransportData({ ...newTransportData, [e.target.name]: e.target.value });
        console.log(newTransportData)
      };

    async function handleSubmit(e){
        e.preventDefault();
        setData([...data, newTransportData])
        console.log(data)

        if (localStorage.getItem("token") === null) {
            navigate("/");
            return;
        }

        await fetch(`${baseUrl}/api/transport/create`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTransportData)
        })
        setNewTransportData({kontakt: '', radnoVrijemeOd: '', radnoVrijemeDo: '', voziloId: ''});
        onClose(true);
    }


    
  return (
    <div className="index">
    <div className="form-group-wrapper">
        <div className="overlap-group">
            <form className='add-form' onSubmit={(e) => handleSubmit(e)}>
                <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></div>
                <div className="text-wrapper"> dodaj Prijevoznika</div>
                <div className='overlap'>
                    <label className='label-text'>kontakt</label>
                    <input id="1" name="kontakt" value={newTransportData.kontakt} className="input" placeholder=" ..." type="text" onChange={handleFormChange} />
                </div>
                <div className='overlap'>
                    <label className='label-text'>radno vrijeme od</label>
                    <input id="2" name="radnoVrijemeOd"value={newTransportData.radnoVrijemeOd} className="input" placeholder=" ..." type="text" onChange={handleFormChange} />
                </div>
                <div className='overlap'>
                    <label className='label-text'>radno vrijeme do</label>
                    <input id="3" name="radnoVrijemeDo" value={newTransportData.radnoVrijemeDo} className="input" placeholder=" ..." type="text" onChange={handleFormChange} />
                </div>
                <div className='overlap'>
                    <label className='label-text'>id vozila</label>
                    <input id="4" name="voziloId" value={newTransportData.voziloId} className="input" placeholder=" ..." type="text" onChange={handleFormChange} />
                </div>
                <div className='buttonContainer'> <button type="submit" className="btn">dodaj</button> </div>
            </form>
        </div>
    </div>
</div>
  )
}