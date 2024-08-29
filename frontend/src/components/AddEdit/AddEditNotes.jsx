import React, { useState } from "react";
const AddEditNotes = ({onAddNote}) => { 
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
}
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);}
  const handlePriceChange = (e) => {
    setPrice(e.target.value);}

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddNote({ title, description, price });
        setTitle('');
        setDescription('');
        setPrice('');
        if (!title || !description || !price) {
            console.log('Please fill all fields');
            return;
          }
      };

  return (
    <div className="border m-7 p-7 flex flex-col items-center rounded-sm" >
    <div className="flex">
    <h1 className="text-center mb-4 text-4xl font-bold">Enter Your Data</h1>
    </div>
    <div className="form">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
        <label className="py-2">Title </label>
        <input
          type="text"
          placeholder="Please Enter title"
          className="p-2 pr-36 border rounded-md focus:outline-none"
          value={title}
          onChange={handleTitleChange }
        />
        </div>
        <div className="flex flex-col">
        <label>Descripition </label>
        <textarea
          type="text"
          placeholder="Please Enter title"
          className="border p-2 pr-80 focus:outline-none"
          value={description}
          onChange={handleDescriptionChange}
        />
        </div>
        <div className="flex flex-col">
        <label>Price </label>
        <input
          type="number"
          placeholder="Please Enter title"
          className="p-2 border rounded-md focus:outline-none"
          value={price}
          onChange={handlePriceChange}
        />
        </div>

        <button className="bg-blue-500 py-2 rounded-sm text-white hover:bg-blue-700">ADD</button>
      </form>
      </div>
    </div>
  );
};

export default AddEditNotes;
