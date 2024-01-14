import React, { useState } from 'react';

/*const UpdateFormDynamicList = ({ itemList }) => {
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
      <h1>Prijevoznik</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            {item.kontakt} - {item.radnoVrijeme} - {item.voziloId} 
          </li>
        ))}
      </ul>
      {selectedItem && (
        <UpdateForm
          initialData={{
            kontakt: selectedItem.kontakt,
            radnoVrijeme: selectedItem.radnoVrijeme,
            voziloId: selectedItem.voziloId,
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};*/

export default function PrijevoznikUpdateForm ({ initialData, onUpdate }){
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
        Kontakt:
        <input
          type="text"
          name="kontakt"
          value={formData.kontakt}
          onChange={handleChange}
        />
      </label>

      <label>
        Radno vrijeme:
        <input
          type="text"
          name="radnoVrijemeOd"
          value={formData.radnoVrijemeOd}
          onChange={handleChange}
        />

        <input
          type="text"
          name="radnoVrijemeOd"
          value={formData.radnoVrijemeDo}
          onChange={handleChange}
        />
      </label>

      <label>
        ID vozila:
        <input
          type="text"
          name="voziloId"
          value={formData.voziloId}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Update</button>
    </form>
  )
}
