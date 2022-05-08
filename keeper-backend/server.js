require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const data = require(__dirname + '/data.js');

const connectionUrl = `mongodb+srv://keeper-admin:${process.env.DB_PASSWORD}@cluster0.0rij7.mongodb.net/keeper-db?retryWrites=true&w=majority`;

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
});

//app config
const app = express();
const port = process.env.PORT || 6299;

//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

//db config
const noteSchema = mongoose.Schema({
    title: String,
    content: String
});

const Note = mongoose.model('Note', noteSchema);

//api endpoints
app.get('/', (req, res) => {
    res.status(200).send('Hello from the other sideeeee');
});

app.get('/v1/notes', (req, res) => {
    res.status(200).send(data);
});

app.get('/v2/notes', (req, res) => {
    Note.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post('/v2/notes', (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })

    try {
        newNote.save();
        res.status(201).send("New note added successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/v2/notes/:id', (req, res) => {
    const noteId = mongoose.Types.ObjectId(req.params.id);

    Note.findByIdAndDelete(noteId, err => {
        if (!err) {
            res.status(200).send('Article deleted successfully')
        } else {
            res.status(500).send(err);
        }
    });
});


//listen
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});