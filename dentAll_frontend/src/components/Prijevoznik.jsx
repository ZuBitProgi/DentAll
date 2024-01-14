import React from 'react'

const Prijevoznik = ({id, kontakt, radnoVrijemeOd, radnoVrijemeDo, voziloId}) => {


  return (
    <div className='smjestaj-container'>
        <div><span>kontakt: </span>{kontakt}</div>
        <div><span>radnoVrijemeOd: </span>{radnoVrijemeOd}</div>
        <div><span>radnoVrijemeDo: </span>{radnoVrijemeDo}</div>
        <div><span>voziloId: </span>{voziloId}</div>
    </div>
  )
}

export default Prijevoznik
