import React, { useEffect, useState } from 'react';
import { FaTimes } from "react-icons/fa"
import { baseUrl } from '../..';
import { useNavigate } from 'react-router-dom';


export default function PrijevoznikUpdateForm({ onClose, initialData, onUpdate }) {
  const [formData, setFormData] = useState(initialData);
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

  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


      if (formData.kontakt.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          setKontakt(true),
          setKontaktMessage("");
      } else { 

          if (formData.kontakt.length === 0) {
              setKontakt(false);
              setKontaktMessage("polje za e-mail ne smije biti prazno")
          } else {
              setKontakt(false);
              setKontaktMessage("e-mail mora biti u formatu {example@gmail.com}")
          }
      }

      if (formData.radnoVrijemeOd.length === 0) {
          setRadnoVrijemeOd(false);
          setRadnoVrijemeOdMessage("Radno vrijeme ne smije biti prazno")
      } else {
          if (formData.radnoVrijemeOd.match(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/)) {
              setRadnoVrijemeOd(true);
              setRadnoVrijemeOdMessage("");
          } else {
              setRadnoVrijemeOd(false);
              setRadnoVrijemeOdMessage("radno vrijeme nije u zadanom {HH:MM:SS} formatu")
          }
      }

      if (formData.radnoVrijemeDo.length === 0) {
          setRadnoVrijemeDo(false);
          setRadnoVrijemeDoMessage("Radno vrijeme ne smije biti prazno")
      } else {
          if (formData.radnoVrijemeDo.match(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/)) {
              setRadnoVrijemeDo(true);
              setRadnoVrijemeDoMessage("");
          } else {
              setRadnoVrijemeDo(false);
              setRadnoVrijemeDoMessage("radno vrijeme nije u zadanom {HH:MM:SS} formatu")
          }
      }
      
      if (formData.model.length === 0) {
          setModel(false);
          setModelMessage("Model polje ne smije biti prazno")
      } else {
          setModel(true);
          setModelMessage("");
      }

                  
      if (formData.vrsta.length === 0) {
          setVrsta(false);
          setVrstaMessage("Vrsta polje ne smije biti prazno")
      } else {
          setVrsta(true);
          setVrstaMessage("");
      }
      

                  
      if (formData.kapacitet.length === 0) {
          setKapacitet(false);
          setKapacitetMessage("Kapacitet polje ne smije biti prazno")
      } else {
          setKapacitet(true);
          setKapacitetMessage("");
      }
    }

  useEffect(() => {
    update();
  }, [kontakt, radnoVrijemeDo, radnoVrijemeOd, vrsta, kapacitet, model])

  const update = async () => {
    if (kontakt && radnoVrijemeDo && radnoVrijemeOd && vrsta && kapacitet && model) {
      try {

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
      } catch (err) {

      }
    }
  }

  return (
    <div className="index">
      <div className="form-group-wrapper">
        <div className="overlap-group">
          <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></div>
          <div className="text-wrapper"> Ažuriraj Prijevoznika</div>
          <form onSubmit={handleSubmit}>
            <div className='overlap'>
              <label className='label-text'>
                E-mail
              </label>
              <input type="text" name="kontakt" className='input' value={formData.kontakt} onChange={handleChange} />
              {!kontakt && <p className='poruka'>{kontaktMessage}</p>} 

            </div>
            <div className='overlap'>
              <label className='label-text'>
                Radno vrijeme od
                <input type="text" name="radnoVrijemeOd" className='input' value={formData.radnoVrijemeOd} onChange={handleChange} />
                {!radnoVrijemeOd && <p className='poruka'>{radnoVrijemeOdMessage}</p>}
              </label>
            </div>
            <div className='overlap'>
              <label className='label-text'>Radno vrijeme do
                <input type="text" name="radnoVrijemeDo" className='input' value={formData.radnoVrijemeDo} onChange={handleChange} />
                {!radnoVrijemeDo && <p className='poruka'>{radnoVrijemeDoMessage}</p>}
              </label>
            </div>
            <div className='overlap'>
                <label className='label-text'>vrsta</label>
                <input name="vrsta" value={formData.vrsta} className="input" placeholder=" ..." type="text" onChange={handleChange} />
                {!vrsta && <p className='poruka'>{vrstaMessage}</p>}
            </div>
            <div className='overlap'>
                <label className='label-text'>kapacitet</label>
                <input name="kapacitet" value={formData.kapacitet} className="input" placeholder=" ..." type="text" onChange={handleChange} />
                {!kapacitet && <p className='poruka'>{kapacitetMessage}</p>}
            </div>
            <div className='overlap'>
                <label className='label-text'>model</label>
                <input name="model" value={formData.model} className="input" placeholder=" ..." type="text" onChange={handleChange} />
                {!model && <p className='poruka'>{modelMessage}</p>}
            </div>
            <div className='buttonContainer'><button type="submit" className='btn'>Ažuriraj</button></div>
          </form>
        </div>
      </div>
    </div>
  )
  }
