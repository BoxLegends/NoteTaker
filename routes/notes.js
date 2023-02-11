const notes = require('express').Router();

// adds the uuid package so i can use it to make ID's
const { v4: uuidv4 } = require('uuid');

const { readFromFile, readAndAppend} = require('../helpers/fsUtils');

const fileName = './db/db.json';

//the get so that you can view all of the existing notes//
notes.get('/', (req, res) => {
    console.info(`${req.method} requested to see notes`);

    readFromFile(fileName).then((data) => res.json(JSON.parse(data)));
    
});

// the post meathod to Post a new note!//
notes.post('/', (req, res) => {
    console.info(`${req.method} requested to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            //Here we use uuidv4 to generate unique note id's//
            id: uuidv4()
        }
        readAndAppend(newNote, fileName);
        res.json(`Note added successfully!`);
    } 
});