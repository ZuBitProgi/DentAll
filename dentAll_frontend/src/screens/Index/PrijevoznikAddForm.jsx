import React from 'react'

export default function PrijevoznikAddForm() {
  return (
    <div className="index">
    <div className="overlap-group-wrapper">
        <div className="overlap-group">
            <form className='add-form' onSubmit={(e) => handleSubmit(e, role)}>
                <header className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></header>
                <div className="text-wrapper"> dodaj Prijevoznika</div>
                <div className='overlap'>
                    <label></label>
                    <input id="1" className="input" placeholder="kontakt..." type="text" />
                </div>
                <div className='overlap'>
                    <label></label>
                    <input id="2" className="input" placeholder="radnoVrijeme..." type="text" />
                </div>
                <div className='overlap'>
                    <label></label>
                    <input id="3" className="input" placeholder="voziloId..." type="text" />
                </div>

                <div className='buttonContainer'> <button className="btn">  dodaj </button> </div>
            </form>
        </div>
    </div>
</div>
  )
}
