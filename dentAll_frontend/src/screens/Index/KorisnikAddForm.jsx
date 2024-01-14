import React from 'react'
import { FaTimes } from "react-icons/fa"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../..';

export default function KorisnikAddForm({onClose, data, setData}) {
    const [newUserData, setNewUserData] = useState({ ime: '', prezime: '', preference: '', kontakt: '' });
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
      };

    async function handleSubmit(e){
        e.preventDefault();
        setData([...data, newUserData])

        if (localStorage.getItem("token") === null) {
            navigate("/");
            return;
        }

        await fetch(`${baseUrl}/api/user/create`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserData)
        }) 
        setNewUserData({ ime: '', prezime: '', preference: '', kontakt: '' });
        onClose(true);
    }

    return (
        <div className="index">
            <div className="form-group-wrapper">
                <div className="overlap-group">
                    <form className='add-form' onSubmit={(e) => handleSubmit(e)}>
                        <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} size={30} onClick={onClose} /></div>
                        <div className="text-wrapper"> dodaj korisnika</div>
                        <div className='overlap'>
                            <label className='label-text'>ime </label>
                            <input id="1" className="input" placeholder=" ..." type="text" name="ime" value={newUserData.ime} onChange={handleFormChange} />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>prezime </label>
                            <input id="2" className="input" placeholder=" ..." type="text" name="prezime" value={newUserData.prezime} onChange={handleFormChange} />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>preference </label>
                            <input id="3" className="input" placeholder=" ..." type="text" name="preference" value={newUserData.preference} onChange={handleFormChange} />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>kontakt</label>
                            <input id="4" className="input" placeholder=" ..." type="text" name="kontakt" value={newUserData.kontakt} onChange={handleFormChange} />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>datum dolaska</label>
                            <input id="5" className="input" type="date" />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>datum odlaska</label>
                            <input id="6" className="input" type="date" />
                        </div>
                        <div className='buttonContainer'> <button type="submit" className="btn">dodaj</button> </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
