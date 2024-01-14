import React, { useState } from 'react';

const UpdateFormDynamicList = ({ itemList }) => {
  const [list, setList] = useState(itemList);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleUpdate = (updatedData) => {
    if (selectedItem) {
      setList((prevList) =>
        prevList.map((item) =>
          item.id === selectedItem.id ? { ...item, ...updatedData } : item
        )
      );
      setSelectedItem(null);
    }
  };

  return (
    <div>
      <h1>Korisnik</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            {item.ime} {item.prezime} - {item.preference} - {item.kontakt} -{item.datumDolaska} -{item.datumOdlaska}
          </li>
        ))}
      </ul>
      {selectedItem && (
        <UpdateForm
          initialData={{
            ime: selectedItem.ime,
            prezime: selectedItem.prezime,
            preference: selectedItem.preference,
            kontakt: selectedItem.kontakt,
            datumDolaska: selectedItem.datumDolaska,
            datumOdlaska: selectedItem.datumOdlaska
          }}
          onUpdate={(updatedData) => handleUpdate(updatedData)}
        />
      )}
    </div>
  );
};

const UpdateForm = ({ initialData, onUpdate }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="ime"
          value={formData.ime}
          onChange={handleChange}
        />
      </label>

      <label>
        Surname:
        <input
          type="text"
          name="prezime"
          value={formData.prezime}
          onChange={handleChange}
        />
      </label>

      <label>
        Preference:
        <input
          type="text"
          name="preference"
          value={formData.preference}
          onChange={handleChange}
        />
      </label>

      <label>
        Contact:
        <input
          type="text"
          name="kontakt"
          value={formData.kontakt}
          onChange={handleChange}
        />
      </label>

      <label>
        Datum dolaska:
        <input
            type='text'
            name='datum dolaska'
            value={formData.datumDolaska}
            onChange={handleChange}
            />
      </label>

      <label>
        Datum odlaska:
        <input 
            type='text'
            name='datum odlaska'
            value={formData.datumOdlaska}
            onChange={handleChange}
            />
      </label>

      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateFormDynamicList;