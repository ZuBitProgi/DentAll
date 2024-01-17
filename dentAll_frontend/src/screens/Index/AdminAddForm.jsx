import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { baseUrl } from '../..';
import { useState } from 'react';

const AdminAddForm = ({onClose}) => {

    const [newUserData, setNewUserData] = useState({ username: '', password: '', roles: []});

    function handleFormChange(e) {
        if (e.target.type === 'checkbox') {
            const updatedRoles = newUserData.roles.includes(e.target.value) 
                ? newUserData.roles.filter(role => role !== e.target.value) 
                : [...newUserData.roles, e.target.value];
    
            setNewUserData({ ...newUserData, roles: updatedRoles });
        } else {
            setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
    
        if (localStorage.getItem("token") === null) {
            navigate("/");
            return;
        }
    
        await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserData),
        }) 
        console.log(JSON.stringify(newUserData))
        setNewUserData({ username: '', password: '', roles: []});
        onClose(true);
    }
    
  return (
    <div className="index">
    <div className="form-group-wrapper">
        <div className="overlap-group">
            <form className='add-form' onSubmit={(e) => handleSubmit(e)}>
                <div className='form-header'><FaTimes style={{ cursor: 'pointer' }} size={30} onClick={onClose} /></div>
                <div className="text-wrapper">Dodaj admina</div>
                <div className='overlap'>
                    <label className='label-text'>username</label>
                    <input id="1" className="input" placeholder=" ..." type="text" name="username" value={newUserData.username} onChange={handleFormChange} />
                </div>
                <div className='overlap'>
                    <label className='label-text'>password</label>
                    <input id="2" className="input" placeholder=" ..." type="password" name="password" value={newUserData.password} onChange={handleFormChange} />
                </div>
                <div className='check-box-overlap'>
                    <label className='check-label-text'><label className='label-text'>smjestaj Admin</label> 
                        <input id="3" className="check-box-input" type="checkbox" name="rola" value="sleep_admin" checked={newUserData.roles.includes("sleep_admin")} onChange={handleFormChange} />
                    </label>
                    <label className='check-label-text'><label className='label-text'>prijevoznik Admin</label> 
                        <input id="3" className="check-box-input" type="checkbox" name="rola" value="transport_admin" checked={newUserData.roles.includes("transport_admin")} onChange={handleFormChange} />
                    </label>
                    <label className='check-label-text'><label className='label-text'>korisnik Admin</label> 
                        <input id="3" className="check-box-input" type="checkbox" name="rola" value="user_admin" checked={newUserData.roles.includes("user_admin")} onChange={handleFormChange} />
                    </label>
                </div>
                <div className='buttonContainer'> <button type="submit" className="btn">dodaj</button> </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default AdminAddForm
