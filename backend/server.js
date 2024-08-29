const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Note = require('./Model/item');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/notesdb', {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Ensure files directory exists
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir, { recursive: true });
}

// Routes
app.get('/notes', async (req, res) => {

  try {
    console.log(notes)
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/notes', async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const newNote = new Note({
      title,
      description,
      price
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to generate and download PDF
app.get('/notes/:id/download', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send('Note not found');
    }

    const doc = new PDFDocument();
    const filePath = path.join(filesDir, `${note.title}.pdf`);
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Add a logo
    doc.fontSize(25).text('HAMZA TAJ', 50, 50);


    // Add email address opposite the logo
    doc.fontSize(12).text('thehamzataj@icloud.com', 400, 65, { align: 'right' });

    // Add a horizontal line
    doc.moveTo(50, 100).lineTo(550, 100).stroke();

    // Add note details
    doc.fontSize(25).text(`Title: ${note.title}`, 50, 120);
    doc.fontSize(20).text(`Description: ${note.description}`, 50, 160);
    doc.fontSize(20).text(`Price: $${note.price}`, 50, 200,{ color: '#0000FF' });

    doc.end();

    writeStream.on('finish', () => {
      res.download(filePath, `${note.title}.pdf`, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          res.status(500).send('Error downloading the file');
        }
      });
    });

    writeStream.on('error', (err) => {
      console.error('Error writing the file:', err);
      res.status(500).send('Error writing the file');
    });
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
