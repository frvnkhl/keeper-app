import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from './Note';
import CreateArea from "./CreateArea";
import axios from "../axios";

const App = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get('/v2/notes');
            setNotes(response.data);

            return response;
        }
        fetchPost()
    }, []);


    const addNote = async (newNote) => {
        const response = await axios.post('/v2/notes', newNote);
        window.location.reload();
        return response;
    };


    const deleteNote = async (id) => {
        const response = await (await axios.delete(`/v2/notes/${id}`));
        window.location.reload();
        return response;
    }
    
    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes?.map((note, index) => (
                <Note key={index} id={note._id} title={note.title} content={note.content} onDelete={deleteNote} />
            ))}
            <Footer />
        </div>
    );
};


export default App;