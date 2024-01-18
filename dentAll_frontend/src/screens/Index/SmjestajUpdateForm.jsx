import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa"
import { baseUrl } from '../..';
import { useEffect } from 'react';


export default function SmjestajUpdateForm({ onClose, initialData, onUpdate }) {
  const [formData, setFormData] = useState(initialData);

  const [tip, setTip] = useState(false);
  const [kategorija, setKategorija] = useState(false);
  const [adresa, setAdresa] = useState(false);
  const [dostupnost, setDostupnost] = useState(false);

  const [tipMessage, setTipMessage] = useState("");
  const [kategorijaMessage, setKategorijaMessage] = useState("");
  const [adresaMessage, setAdresaMessage] = useState("");
  const [dostupnostMessage, setDostupnostMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleSubmit(e){
    e.preventDefault();


    if (formData.adresa.length === 0) {
        setAdresa(false);
        setAdresaMessage("Polje za adresu ne smije biti prazno.")
    } else {
        setAdresa(true);
        setAdresaMessage("");
    }

    if (formData.tip.length === 0) {
        setTip(false);
        setTipMessage("Polje za tip ne smije biti prazno");
    } else {
        setTip(true);
        setTipMessage("")
    }

    if (formData.kategorija.length === 0) {
        setKategorija(false);
        setKategorijaMessage("Polje za kategoriju ne smije biti prazno");
    } else {
        setKategorija(true);
        setKategorijaMessage("")
    }

}


async function updateSmjestaj() {

  if (tip && kategorija && adresa) {
      try {
          let token = localStorage.getItem("token");
      
  
          if (token === null) {
              navigate("/");
              return;
          }
  
          await fetch(`${baseUrl}/api/accomodation/update`, {
              method: "POST",
              headers: {
                  Authorization: localStorage.getItem("token"),
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
          })
          onUpdate(formData)
          onClose(true);
      } catch(err) {

      }
  }
}

  useEffect(() => {
    updateSmjestaj();
  }, [tip, kategorija, adresa])

  return (
    <div className="index">
      <div className="form-group-wrapper smjestaj">
        <div className="overlap-group">
          <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></div>
          <div className="text-wrapper">Ažuriraj smještaj</div>
          <form onSubmit={handleSubmit}>

          <div className='overlap'>
            <label className='label-text'>
              adresa
            </label>
            <input type="text" name="adresa" className='input' value={formData.adresa} onChange={handleChange} />
            {adresa && <p>{adresaMessage}</p>}
          </div>
          <div className='overlap'>
            <label className='label-text'>
              tip
            </label>
            <input type="text" name="tip" className='input' value={formData.tip} onChange={handleChange} />
            {tip && <p>{tipMessage}</p>}
          </div>
          <div className='overlap'>
            <label className='label-text'>
              kategorija
            </label>
            <input type="text" name="kategorija" className='input' value={formData.kategorija} onChange={handleChange} />
            {kategorija && <p>{kategorijaMessage}</p>}
          </div>
          <div className='check-box-overlap'>
            <label className='check-label-text'><label className='label-text'>Dostupno</label>
                <input id="4" type="radio" className='check-box-input' name="dostupnost" value="true" checked={formData.dostupnost === true || formData.dostupnost === "true" ? true : false} onChange={handleChange} /> 
            </label>
            <label className='check-label-text'><label className='label-text'>Nedostupno</label>
                <input id="5" type="radio" className='check-box-input' name="dostupnost" value="false" checked={formData.dostupnost === false || formData.dostupnost === "false" ? true : false} onChange={handleChange} /> 
            </label>
          </div>
           



            <div className='buttonContainer'><button type="submit" className='btn'>ažuriraj</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

