import React from 'react'
import "../styles/Smjestaj.css"

const Smjestaj = ({id, adresa, tip, kategorija, dostupnost}) => {


  return (
    <div className='smjestaj-container'>
        <div><span>adresa: </span>{adresa}</div>
        <div><span>tip: </span>{tip}</div>
        <div><span>kategorija: </span>{kategorija}</div>
        <div><span>dostupnost: </span>{dostupnost === "false" ? "nije dostupno" : "dostupno"}</div>
    </div>
  )
}

export default Smjestaj
