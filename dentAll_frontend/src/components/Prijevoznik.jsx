import React from 'react'
import '../styles/List.css'

const Prijevoznik = ({id, kontakt, radnoVrijemeOd, radnoVrijemeDo, voziloId}) => {


  return (
    <div className='smjestaj-container'>
        <div><span>kontakt: </span>{kontakt}</div>
        <div className='radno-vrijeme-wrap'><pre>radno vrijeme: </pre>{radnoVrijemeOd}<pre> - </pre>{radnoVrijemeDo}</div>
        {/*<div><span>radnoVrijemeDo: </span>{radnoVrijemeDo}</div>*/}
        <div><span>voziloId: </span>{voziloId}</div>
    </div>
  )
}

export default Prijevoznik
