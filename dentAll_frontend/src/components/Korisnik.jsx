import React from 'react'

const Korisnik = ({id, ime, prezime, preference, kontakt}) => {


  return (
    <div className='smjestaj-container'>
        <div><span>ime: </span>{ime}</div>
        <div><span>prezime: </span>{prezime}</div>
        <div><span>preference: </span>{preference}</div>
        <div><span>kontakt: </span>{kontakt}</div>
    </div>
  )
}

export default Korisnik
