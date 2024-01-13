import React from 'react'

export default function KorisnikAddForm() {
    async function handleSubmit(e) { }

    return (
        <div className="index">
            <div className="overlap-group-wrapper">
                <div className="overlap-group">
                    <form className='add-form' onSubmit={(e) => handleSubmit(e, role)}>
                        <header className='form-header'><FaTimes style={{ cursor: 'pointer' }} onClick={onClose} /></header>
                        <div className="text-wrapper"> dodaj nesto</div>
                        <div className='overlap'>
                            <label></label>
                            <input id="1" className="input" placeholder="ime..." type="text" />
                        </div>
                        <div className='overlap'>
                            <label></label>
                            <input id="2" className="input" placeholder="prezime..." type="text" />
                        </div>
                        <div className='overlap'>
                            <label></label>
                            <input id="3" className="input" placeholder="preference..." type="text" />
                        </div>
                        <div className='overlap'>
                            <label></label>
                            <input id="4" className="input" placeholder="kontakt..." type="text" />
                        </div>
                        <div className='overlap'>
                            <label>datum dolaska</label>
                            <input id="5" className="input" placeholder="kontakt..." type="date" />
                        </div>
                        <div className='overlap'>
                            <label>datum odlaska</label>
                            <input id="6" className="input" placeholder="kontakt..." type="date" />
                        </div>

                        <div className='buttonContainer'> <button className="btn">  dodaj </button> </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
