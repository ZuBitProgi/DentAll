import { FaTimes } from "react-icons/fa"
import React from 'react'

export default function SmjestajAddForm({onClose}) {

    async function handleSubmit(e){}

    return (
        <div className="index">
            <div className="form-group-wrapper">
                <div className="overlap-group">
                    <form className='add-form' onSubmit={(e) => handleSubmit(e, role)}>
                        <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></div>
                        <div className="text-wrapper"> dodaj nesto</div>
                        <div className='overlap'>
                            <label></label>
                            <input id="1" className="input" placeholder="tip..." type="text" />
                        </div>
                        <div className='overlap'>
                            <label></label>
                            <input id="2" className="input" placeholder="kategorija..." type="text" />
                        </div>
                        <div className='overlap'>
                            <label></label>
                            <input id="3" className="input" placeholder="adresa..." type="text" />
                        </div>

                        <div className='buttonContainer'> <button className="btn">  dodaj </button> </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
