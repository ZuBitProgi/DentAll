import { useState } from "react";
import { baseUrl } from "..";
import { useNavigate } from "react-router-dom";

function ModalForm({ data, setData }) {
    const [newHousingData, setNewHousingData] = useState({ adresa: '', tip: '', kategorija: '', dostupnost: '' });
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setNewHousingData({ ...newHousingData, [e.target.name]: e.target.value });
      };
    
      const handleSave = async () => {
        setData([...data, newHousingData])

        if (localStorage.getItem("token") === null) {
            navigate("/");
            return;
        }

        await fetch(`${baseUrl}/api/accomodation/create`, {
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHousingData)
        })
        setShowForm(false);
        setNewHousingData({ adresa: '', tip: '', kategorija: '', dostupnost: '' });
      };


    return (
      <div className="modal">
        <input type="text" name="adresa" value={newHousingData.adresa} onChange={handleFormChange} />
        <input type="text" name="tip" value={newHousingData.tip} onChange={handleFormChange} />
        <input type="text" name="kategorija" value={newHousingData.kategorija} onChange={handleFormChange} />
        <input type="text" name="dostupnost" value={newHousingData.dostupnost} onChange={handleFormChange} />
        <button onClick={handleSave}>Save</button>
      </div>
    );
  }

  export default ModalForm;
