import { FaTimes } from "react-icons/fa"
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../..";
export default function SmjestajAddForm({onClose, data, setData}) {

    const [newHousingData, setNewHousingData] = useState({ adresa: '', tip: '', kategorija: '', dostupnost: '' });
    const navigate = useNavigate();

    const [tip, setTip] = useState(false);
    const [kategorija, setKategorija] = useState(false);
    const [adresa, setAdresa] = useState(false);
    const [dostupnost, setDostupnost] = useState(false);

    const [tipMessage, setTipMessage] = useState("");
    const [kategorijaMessage, setKategorijaMessage] = useState("");
    const [adresaMessage, setAdresaMessage] = useState("");
    const [dostupnostMessage, setDostupnostMessage] = useState("");


    const handleFormChange = (e) => {
        setNewHousingData({ ...newHousingData, [e.target.name]: e.target.value });
        console.log(newHousingData)
      };

     function handleSubmit(e){
        e.preventDefault();


        if (newHousingData.adresa.length === 0) {
            setAdresa(false);
            setAdresaMessage("Polje za adresu ne smije biti prazno.")
        } else {
            setAdresa(true);
            setAdresaMessage("");
        }

        if (newHousingData.tip.length === 0) {
            setTip(false);
            setTipMessage("Polje za tip ne smije biti prazno");
        } else {
            setTip(true);
            setTipMessage("")
        }

        if (newHousingData.kategorija.length === 0) {
            setKategorija(false);
            setKategorijaMessage("Polje za kategoriju ne smije biti prazno");
        } else {
            setKategorija(true);
            setKategorijaMessage("")
        }

    }


    async function addSmjestaj() {

        if (tip && kategorija && adresa) {
            try {
                setData([...data, newHousingData])

                let token = localStorage.getItem("token");
            
        
                if (token === null) {
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
            } catch(err) {

            }
        }
    }


    useEffect(() => {
        addSmjestaj();
    }, [tip, kategorija, adresa])

    return (
        <div className="index">
            <div className="form-group-wrapper smjestaj">
                <div className="overlap-group" >
                    <form onSubmit={handleSubmit} className='add-form'>
                        <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></div>
                        <div className="text-wrapper">Dodaj smještaj</div>
                        <div className='overlap'>
                            <label></label>
                            <input id="1" className="input" type="text" name="adresa" placeholder="adresa..." value={newHousingData.adresa} onChange={handleFormChange} />
                            {!adresa && <p>{adresaMessage}</p>}
                        </div>
                        <div className='overlap'>
                            <label></label>
                            <input id="2" className="input" type="text" name="tip" placeholder="tip..." value={newHousingData.tip} onChange={handleFormChange} />
                            {!tip && <p>{tipMessage}</p>}
                        </div>
                        <div className='overlap'>
                            <label></label>
                            <input id="3" className="input" type="text" name="kategorija" placeholder="kategorija..." value={newHousingData.kategorija} onChange={handleFormChange} />
                            {!kategorija && <p>{kategorijaMessage}</p>}
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
