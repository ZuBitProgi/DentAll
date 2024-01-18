import React from 'react'

const Korisnik = ({id, ime, prezime, preference, kontakt, onClick}) => {


  return (
    <div className='smjestaj-container' onClick={onClick}>
        <div><span>ime: </span>{ime}</div>
        <div><span>prezime: </span>{prezime}</div>
        <div><span>preference: </span>{preference === "" ? "-" : preference.split(":")[1]}</div>
        <div><span>kontakt: </span>{kontakt}</div>
    </div>
  )
}

export default Korisnik
