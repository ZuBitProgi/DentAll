import React from 'react'
import { FaTimes } from "react-icons/fa"

export default function PrijevoznikAddForm({onClose}) {
  return (
    <div className="index">
    <div className="form-group-wrapper">
        <div className="overlap-group">
            <form className='add-form' onSubmit={(e) => handleSubmit(e, role)}>
                <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></div>
                <div className="text-wrapper"> dodaj Prijevoznika</div>
                <div className='overlap'>
                    <label className='label-text'>kontakt</label>
                    <input id="1" className="input" placeholder=" ..." type="text" />
                </div>
                <div className='overlap'>
                    <label className='label-text'>radno vrijeme</label>
                    <input id="2" className="input" placeholder=" ..." type="text" />
                </div>
                <div className='overlap'>
                    <label className='label-text'>id vozila</label>
                    <input id="3" className="input" placeholder=" ..." type="text" />
                </div>

                <div className='buttonContainer'> <button className="btn">  dodaj </button> </div>
            </form>
        </div>
    </div>
</div>
  )
}
