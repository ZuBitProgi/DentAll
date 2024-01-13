import React from 'react'
import { FaTimes } from "react-icons/fa"

export default function KorisnikAddForm({onClose}) {
    async function handleSubmit(e) { }

    return (
        <div className="index">
            <div className="form-group-wrapper">
                <div className="overlap-group">
                    <form className='add-form' onSubmit={(e) => handleSubmit(e, role)}>
                        <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} size={30} onClick={onClose} /></div>
                        <div className="text-wrapper"> dodaj korisnika</div>
                        <div className='overlap'>
                            <label className='label-text'>ime </label>
                            <input id="1" className="input" placeholder=" ..." type="text" />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>prezime </label>
                            <input id="2" className="input" placeholder=" ..." type="text" />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>preference </label>
                            <input id="3" className="input" placeholder=" ..." type="text" />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>kontakt</label>
                            <input id="4" className="input" placeholder=" ..." type="text" />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>datum dolaska</label>
                            <input id="5" className="input" type="date" />
                        </div>
                        <div className='overlap'>
                            <label className='label-text'>datum odlaska</label>
                            <input id="6" className="input" type="date" />
                        </div>

                        <div className='buttonContainer'> <button className="btn">  dodaj </button> </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
