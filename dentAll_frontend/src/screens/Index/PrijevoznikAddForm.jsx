import React, { useEffect } from 'react'
import { FaTimes } from "react-icons/fa"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../..';

export default function PrijevoznikAddForm({onClose, data, setData}) {

    const [newTransportData, setNewTransportData] = useState({ kontakt: '', radnoVrijemeOd: '', radnoVrijemeDo: '', vrsta: '', kapacitet: '', model: ''});
    const navigate = useNavigate();
    const [kontakt, setKontakt] = useState(false)
    const [radnoVrijemeOd, setRadnoVrijemeOd] = useState(false)
    const [radnoVrijemeDo, setRadnoVrijemeDo] = useState(false)
    const [vrsta, setVrsta] = useState(false)
    const [kapacitet, setKapacitet] = useState(false)
    const [model, setModel] = useState(false)

    const [kontaktMessage, setKontaktMessage] = useState("")
    const [radnoVrijemeOdMessage, setRadnoVrijemeOdMessage] = useState("")
    const [radnoVrijemeDoMessage, setRadnoVrijemeDoMessage] = useState("")
    const [vrstaMessage, setVrstaMessage] = useState("")
    const [kapacitetMessage, setKapacitetMessage] = useState("")
    const [modelMessage, setModelMessage] = useState("")


    
    

    const handleFormChange = (e) => {
        setNewTransportData({ ...newTransportData, [e.target.name]: e.target.value });
      };

    async function handleSubmit(e){
        e.preventDefault();

            if (newTransportData.kontakt.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setKontakt(true),
                setKontaktMessage("");
            } else { 

                if (newTransportData.kontakt.length === 0) {
                    setKontakt(false);
                    setKontaktMessage("polje za e-mail ne smije biti prazno")
                } else {
                    setKontakt(false);
                    setKontaktMessage("e-mail mora biti u formatu {example@gmail.com}")
                }
            }

            if (newTransportData.radnoVrijemeOd.length === 0) {
                setRadnoVrijemeOd(false);
                setRadnoVrijemeOdMessage("Radno vrijeme ne smije biti prazno")
            } else {
                if (newTransportData.radnoVrijemeOd.match(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/)) {
                    setRadnoVrijemeOd(true);
                    setRadnoVrijemeOdMessage("");
                } else {
                    setRadnoVrijemeOd(false);
                    setRadnoVrijemeOdMessage("radno vrijeme nije u zadanom {HH:MM:SS} formatu")
                }
            }

            if (newTransportData.radnoVrijemeDo.length === 0) {
                setRadnoVrijemeDo(false);
                setRadnoVrijemeDoMessage("Radno vrijeme ne smije biti prazno")
            } else {
                if (newTransportData.radnoVrijemeDo.match(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/)) {
                    setRadnoVrijemeDo(true);
                    setRadnoVrijemeDoMessage("");
                } else {
                    setRadnoVrijemeDo(false);
                    setRadnoVrijemeDoMessage("radno vrijeme nije u zadanom {HH:MM:SS} formatu")
                }
            }
            
            if (newTransportData.model.length === 0) {
                setModel(false);
                setModelMessage("Model polje ne smije biti prazno")
            } else {
                setModel(true);
                setModelMessage("");
            }

                        
            if (newTransportData.vrsta.length === 0) {
                setVrsta(false);
                setVrstaMessage("Vrsta polje ne smije biti prazno")
            } else {
                setVrsta(true);
                setVrstaMessage("");
            }
            

                        
            if (newTransportData.kapacitet.length === 0) {
                setKapacitet(false);
                setKapacitetMessage("Kapacitet polje ne smije biti prazno")
            } else {
                setKapacitet(true);
                setKapacitetMessage("");
            }
    }


    useEffect(() => {
        add();
    }, [kontakt, radnoVrijemeDo, radnoVrijemeOd, vrsta, model, kapacitet])

    const add = async () => {
        if (kontakt && radnoVrijemeDo && radnoVrijemeOd && vrsta && model && kapacitet) {

            try {
                setData([...data, newTransportData])

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
                setNewTransportData({ kontakt: '', radnoVrijemeOd: '', radnoVrijemeDo: '', vrsta: '', kapacitet: '', model: ''});
                onClose(true);
                } catch(err) {

                }
            }
    }

    
  return (
    <div className="index">
    <div className="form-group-wrapper">
        <div className="overlap-group">
            <form className='add-form' onSubmit={(e) => handleSubmit(e)}>
                <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} size={30} onClick={onClose} /></div>
                <div className="text-wrapper"> Dodaj prijevoznika</div>
                <div className='overlap'>
                    <label className='label-text'>E-mail</label>
                    <input id="1" name="kontakt" value={newTransportData.kontakt} className="input" placeholder="example@gmail.com" type="text" onChange={handleFormChange} />
                    {!kontakt && <p className='poruka'>{kontaktMessage}</p>}
                </div>
                <div className='overlap'>
                    <label className='label-text'>radno vrijeme od</label>
                    <input id="2" name="radnoVrijemeOd"value={newTransportData.radnoVrijemeOd} className="input" placeholder="HH:MM:SS" type="text" onChange={handleFormChange} />
                    {!radnoVrijemeOd && <p className='poruka'>{radnoVrijemeOdMessage}</p>}

                </div>
                <div className='overlap'>
                    <label className='label-text'>radno vrijeme do</label>
                    <input id="3" name="radnoVrijemeDo" value={newTransportData.radnoVrijemeDo} className="input" placeholder="HH:MM:SS" type="text" onChange={handleFormChange} />
                    {!radnoVrijemeDo && <p className='poruka'>{radnoVrijemeDoMessage}</p>}
                </div>
                <div className='overlap'>
                    <label className='label-text'>vrsta</label>
                    <input id="4" name="vrsta" value={newTransportData.vrsta} className="input" placeholder=" ..." type="text" onChange={handleFormChange} />
                    {!vrsta && <p className='poruka'>{vrstaMessage}</p>}

                </div>
                <div className='overlap'>
                    <label className='label-text'>kapacitet</label>
                    <input id="5" name="kapacitet" value={newTransportData.kapacitet} className="input" placeholder=" ..." type="text" onChange={handleFormChange} />
                    {!kapacitet && <p className='poruka'>{kapacitetMessage}</p>}
                </div>
                <div className='overlap'>
                    <label className='label-text'>model</label>
                    <input id="6" name="model" value={newTransportData.model} className="input" placeholder=" ..." type="text" onChange={handleFormChange} />
                    {!model && <p className='poruka'>{modelMessage}</p>}
                </div>
                <div className='addButtonContainer'> <button type="submit" className="btn">Dodaj</button> </div>
            </form>
        </div>
    </div>
</div>
  )
}
