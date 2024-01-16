import React from 'react'
import '../styles/List.css'

const Prijevoznik = ({id, kontakt, radnoVrijemeOd, radnoVrijemeDo, vrsta, kapacitet, model}) => {


  return (
    <div className='smjestaj-container'>
        <div><span>kontakt: </span>{kontakt}</div>
        <div className='radno-vrijeme-wrap'><pre>radno vrijeme: </pre>{radnoVrijemeOd}<pre> - </pre>{radnoVrijemeDo}</div>
        <div><span>vrsta: {vrsta}</span></div>
        <div><span>kapacitet: {kapacitet}</span></div>
        <div><span>model: {model}</span></div>
    </div>
  )
}

export default Prijevoznik
