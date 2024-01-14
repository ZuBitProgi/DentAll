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
      <h1>Smjestaj</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            {item.tip} - {item.kategorija} - {item.adresa} 
          </li>
        ))}
      </ul>
      {selectedItem && (
        <UpdateForm
          initialData={{
            tip: selectedItem.tip,
            kategorija: selectedItem.kategorija,
            adresa: selectedItem.adresa,
          }}
          onUpdate={handleUpdate}
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
        Tip:
        <input
          type="text"
          name="tip"
          value={formData.tip}
          onChange={handleChange}
        />
      </label>

      <label>
        Kategorija:
        <input
          type="text"
          name="kategorija"
          value={formData.kategorija}
          onChange={handleChange}
        />
      </label>

      <label>
        adresa:
        <input
          type="text"
          name="adresa"
          value={formData.adresa}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateFormDynamicList;