import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Card from '../Card/Card'
import AddEditNotes from '../AddEdit/AddEditNotes'
const Home = ({notes,onAddNotes, onDeletesNotes}) => {
  return (
    <div>
        <Navbar/>
        <AddEditNotes onAddNote={onAddNotes}/>
        <div className="grid grid-cols-4 gap-4 m-7">
        {notes.map((note, id) => (
          <Card key={id} data={note} onDelete={() => onDeletesNotes(note._id)}/>
        ))}
      </div>
        <Footer/>
    </div>
  )
}

export default Home