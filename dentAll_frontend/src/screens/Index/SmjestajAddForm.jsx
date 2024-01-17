import { FaTimes } from "react-icons/fa"
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../..";
export default function SmjestajAddForm({onClose, data, setData}) {

    const [newHousingData, setNewHousingData] = useState({ adresa: '', tip: '', kategorija: '', dostupnost: '' });
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setNewHousingData({ ...newHousingData, [e.target.name]: e.target.value });
        console.log(newHousingData)
      };

    async function handleSubmit(e){
        e.preventDefault();
        setData([...data, newHousingData])

        if (localStorage.getItem("token") === null) {
            navigate("/");
            return;
        }

        await fetch(`${baseUrl}/api/accomodation/create`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHousingData)
        })
        setNewHousingData({ adresa: '', tip: '', kategorija: '', dostupnost: '' });
        onClose(true);
    }

    return (
        <div className="index">
            <div className="form-group-wrapper">
                <div className="overlap-group">
                    <form onSubmit={handleSubmit} className='add-form'>
                        <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></div>
                        <div className="text-wrapper">Dodaj smještaj</div>
                        <div className='overlap'>
                            <label></label>
                            <input id="1" className="input" type="text" name="adresa" placeholder="adresa..." value={newHousingData.adresa} onChange={handleFormChange} />
                        </div>
                        <div className='overlap'>
                            <label></label>
                            <input id="2" className="input" type="text" name="tip" placeholder="tip..." value={newHousingData.tip} onChange={handleFormChange} />
                        </div>
                        <div className='overlap'>
                            <label></label>
                            <input id="3" className="input" type="text" name="kategorija" placeholder="kategorija..." value={newHousingData.kategorija} onChange={handleFormChange} />
                        </div>
                        <div className='check-box-overlap'>
                            <label className='check-label-text'><label className='label-text'>Dostupno</label>
                                <input id="4" type="radio" label='small' name="dostupnost" className="check-box-input" value="true" onChange={handleFormChange} /> 
                            </label>
                            <label className='check-label-text'><label className='label-text'>Nedostupno</label>
                                <input id="5" type="radio" name="dostupnost" className="check-box-input" value="false" onChange={handleFormChange} /> 
                            </label>
                        </div>
                        <div className='buttonContainer'> <button type="submit" className="btn">dodaj</button> </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
