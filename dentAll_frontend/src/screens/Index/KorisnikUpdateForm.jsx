import React, { useEffect, useState } from 'react';
import { FaTimes } from "react-icons/fa"
import { baseUrl } from '../..';


export default function KorisnikUpdateForm({ onClose, initialData, onUpdate }) {
  const [formData, setFormData] = useState(initialData);
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      if (formData.ime.length === 0) {
        setIsValidName(false);
        setImeMessage("Polje za ime ne smije biti prazno.")
    } else {
        setIsValidName(true);
        setImeMessage("");
    }

    if (formData.prezime.length === 0) {
        setIsValidSrname(false);
        setSrnameMessage("Polje za prezime ne smije biti prazno.")
    } else {
        setIsValidSrname(true);
        setSrnameMessage("");
    }

    if (formData.preference.length === 0) {
        setIsValidOption(true);
        setoptionMessage("")
    } else if (formData.preference !== ("tip:kuca") && formData.preference !== ("tip:stan") && formData.preference !== ("tip:soba")) {
        setIsValidOption(false);
        setoptionMessage("Preference moraju biti u formatu: [tip:kuca/stan/soba]");
    } else {
        setIsValidOption(true);
        setoptionMessage("")
    }

    if (formData.kontakt.length === 0) {
        setIsValidMail(false)
        setMailMessage("Polje za e-mail ne smije biti prazno.")
    } else {
        if (formData.kontakt.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setIsValidMail(true);
            setMailMessage("");
        } else {
            setIsValidMail(false);
            setMailMessage("E-mail mora biti u obliku {example@gmail.com}")
        }
    }


  };

  async function updateUser() {
    if (isValidName && isValidSrname && isValidMail && isValidOption) {

      try {
        let token = localStorage.getItem("token");
        if (token === null) {
          navigate("/");
          return;
        }

        await fetch(`${baseUrl}/api/user/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify(formData)
        })
  
        onClose(true);
        onUpdate(formData);
      } catch(err) {

      }
    }
}

  useEffect(() => {
    updateUser();
  }, [isValidName, isValidSrname, isValidOption, isValidMail])

  return (
    <div className="index">
      <div className="form-group-wrapper">
        <div className="overlap-group">
          <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></div>
          <div className="text-wrapper"> ažuriraj korisnika</div>
          <form onSubmit={handleSubmit}>

            <div className='overlap'>
              <label className='label-text'>
                ime
              </label>
              <input type="text" name="ime" className='input' value={formData.ime} onChange={handleChange} />
              {!isValidName && <p className="poruka">{imeMessage}</p>}
            </div>

            <div className='overlap'>
              <label className='label-text'>
                prezime
              </label>
              <input type="text" name="prezime" className='input' value={formData.prezime} onChange={handleChange} />
              {!isValidSrname && <p className="poruka">{srnameMessage}</p>}
            </div>

            <div className='overlap'>
              <label className='label-text'>
                preference
              </label>
              <input type="text" name="preference" className='input' value={formData.preference} onChange={handleChange} />
              {!isValidOption && <p id="opt">{optionMessage}</p>}
            </div>

            <div className='overlap'>
              <label className='label-text'>
                kontakt
              </label>
              <input type="text" name="kontakt" className='input' value={formData.kontakt} onChange={handleChange} />
              {!isValidMail && <p id="mail">{mailMessage}</p>}
            </div>

            <div className='overlap'>
              <label className='label-text'>
                datum dolaska
              </label>
              <input type="date" name="datum dolaska" className='input' value={formData.datumDolaska} onChange={handleChange} />

            </div>

            <div className='overlap'>
              <label className='label-text'>
                datum odlaska
              </label>
              <input type="date" name="datum odlaska" className='input' value={formData.datumOdlaska} onChange={handleChange} />

            </div>

            <div className='buttonContainer'><button type="submit" className='btn'>ažuriraj</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};
