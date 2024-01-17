import React, { useEffect } from 'react'
import { FaTimes } from "react-icons/fa"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../..';

export default function KorisnikAddForm({onClose, data, setData}) {
    const [newUserData, setNewUserData] = useState({ ime: '', prezime: '', preference: '', kontakt: '' });
    const navigate = useNavigate();
    const [isValidName, setIsValidName] = useState(false);
    const [isValidSrname, setIsValidSrname] = useState(false);
    const [isValidDate, setIsValidDate] = useState(false);
    const [isValidOption, setIsValidOption] = useState(false);
    const [isValidMail, setIsValidMail] = useState(false);
    const [imeMessage, setImeMessage] = useState("");
    const [srnameMessage, setSrnameMessage] = useState("");
    const [dateMessage, setDateMessage] = useState("");
    const [optionMessage, setoptionMessage] = useState("");
    const [mailMessage, setMailMessage] = useState("");


    const handleFormChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
      };

    function handleSubmit(e){
        e.preventDefault();

        if (newUserData.ime.length === 0) {
            setIsValidName(false);
            setImeMessage("Polje za ime ne smije biti prazno.")
        } else {
            setIsValidName(true);
            setImeMessage("");
        }

         if (newUserData.prezime.length === 0) {
            setIsValidSrname(false);
            setSrnameMessage("Polje za prezime ne smije biti prazno.")
        } else {
            setIsValidSrname(true);
            setSrnameMessage("");
        }

         if (newUserData.preference.length === 0) {
            setIsValidOption(true);
            setoptionMessage("")
        } else if (newUserData.preference !== ("tip:kuca") && newUserData.preference !== ("tip:stan") && newUserData.preference !== ("tip:soba")) {
            setIsValidOption(false);
            setoptionMessage("Preference moraju biti u formatu: [tip:kuca/stan/soba]");
        } else {
            setIsValidOption(true);
            setoptionMessage("")
        }

        if (newUserData.kontakt.length === 0) {
            setIsValidMail(false)
            setMailMessage("Polje za e-mail ne smije biti prazno.")
        } else {
            if (newUserData.kontakt.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setIsValidMail(true);
                setMailMessage("");
            } else {
                setIsValidMail(false);
                setMailMessage("E-mail mora biti u obliku {example@gmail.com}")
            }
        }
    }

    async function UserAdd() {
        if (isValidName && isValidSrname && isValidMail && isValidOption) {

            try {

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
            } catch(error) {

            }    
        }    
    }

    useEffect(() => {
        UserAdd();
    },[isValidName, isValidSrname, isValidOption, isValidMail])


    return (
        <div className="index">
            <div className="form-group-wrapper">
                <div className="overlap-group">
                    <form className='add-form' onSubmit={(e) => handleSubmit(e)}>
                        <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} size={30} onClick={onClose} /></div>
                        <div className="text-wrapper"> Dodaj korisnika</div>
                        <div className='overlap'>
                            <label className='label-text'>ime </label>
                            <input id="1" className="input" placeholder=" ..." type="text" name="ime" value={newUserData.ime} onChange={handleFormChange} />
                            {!isValidName && <p className="poruka">{imeMessage}</p>}
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>prezime </label>
                            <input id="2" className="input" placeholder=" ..." type="text" name="prezime" value={newUserData.prezime} onChange={handleFormChange} />
                            {!isValidSrname && <p className="poruka">{srnameMessage}</p>}
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>preference </label>
                            <input id="3" className="input" placeholder="tip:{kuca/stan/soba}" type="text" name="preference" value={newUserData.preference} onChange={handleFormChange} />
                            {!isValidOption && <p id="opt">{optionMessage}</p>}
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>e-mail</label>
                            <input id="4" className="input" placeholder="example@gmail.com" type="text" name="kontakt" value={newUserData.kontakt} onChange={handleFormChange} />
                            {!isValidMail && <p id="mail">{mailMessage}</p>}

                        </div>
                        <div className='overlap'>
                            <label className='label-text'>datum dolaska</label>
                            <input id="5" className="input" type="date" />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>datum odlaska</label>
                            <input id="6" className="input" type="date" />
                        </div>
                        <div className='buttonContainer'> <button type="submit" className="btn">Dodaj</button> </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
