import React from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const Card = ({ data, onDelete }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`https://pdf-generator-mern.vercel.app/notes/${data._id}/download`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${data.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <div className="border-2 w-[76%] p-4 rounded-md hover:shadow-lg">
      <div className="flex justify-between items-center">
        <span className="font-bold text-[18px] text-black">
          Title <i> <h1 className="font-bold text-slate-600">{data.title}</h1></i>
        </span>
        <FaEdit className="cursor-pointer text-[24px]" />
      </div>
      <h4 className="font-bold text-[18px] text-black">Description</h4>
      <div className="description-container">
        <p className="description-text overflow-hidden">
          {data.description}
        </p>
      </div>
      <h4 className="font-bold text-[18px] text-black">Price</h4>
      <h2 className="font-bold ">${data.price}</h2>
      <div className="gap-4 flex pt-3">
        <button className="p-2 rounded-md border-2 bg-red-500 text-white" onClick={onDelete}>Delete</button>
        <button className="p-2 rounded-md border-2 bg-green-700 text-white" onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default Card;
