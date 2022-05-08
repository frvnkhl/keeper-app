import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

const CreateArea = (props) => {
    const [note, setNote] = useState({
        title: '',
        content: ''
    });
    const [expansion, setExpansion] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onAdd(note);
        setNote({ title: '', content: '' });
        setExpansion(false);
    }

    const expandForm = () => {
        setExpansion(true);
    }

    return (
        <div>
            <form className="create-note">
                {expansion ? <input name="title" placeholder="Title" value={note.title} onChange={handleChange} /> : null}        
                <textarea name="content" placeholder="Take a note..." rows={expansion ? 3 : 1} onClick={expandForm} value={note.content} onChange={handleChange} />
                <Zoom in={expansion}>
                    <Fab onClick={handleSubmit}><AddIcon /></Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;