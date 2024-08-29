import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Home from './components/Home/Home'
function App() {
  const [cardNotes, setCardNotes] = useState([])
  useEffect(() => {
    fetchNotes()
  }, [])
  const fetchNotes = async()=>{
    try{
      const response = await axios.get('https://pdf-generator-mern.vercel.app/notes');
      setCardNotes(response.data)
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }
  const handleAddNotes = async (note) => {
    if (!note.title || !note.description || !note.price) {
      console.log('All fields are required');
      return;
    }

    try {
      const response = await axios.post('https://pdf-generator-mern.vercel.app/notes', note);
      setCardNotes([...cardNotes, response.data]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteNotes = async (id) => {
    try {
      await axios.delete(`https://pdf-generator-mern.vercel.app/notes/${id}`);
      setCardNotes(cardNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  return (
    <>
    <Home notes={cardNotes} onAddNotes={handleAddNotes} onDeletesNotes={handleDeleteNotes}/>
    </>
  )
}

export default App
