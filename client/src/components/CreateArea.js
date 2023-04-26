import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import {MyDate} from "./Date";

function CreateArea(props) {

    const [note, setNote] = useState({
        title: "",
        content: "",
        modifiedDate: "",
        // TODO
        userID: null
    });
    const [isExpanded, setExpanded] = useState(false);

    function createNote(e) {
        const { name, value } = e.target;
        setNote(prev => {
            return {
                ...prev,
                [name]: value,
                modifiedDate: MyDate()
            }
        })
    }

    async function submit(e) {
        if (note.title !== '' || note.content !== '') {
            e.preventDefault();
            const newNote = { ...note };
            await fetch("http://localhost:5000/", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(newNote),
            })
                .then(result => result.json())
                .then(actualData => {
                    const actualNote = { ...newNote, _id: actualData.insertedId };
                    props.addFunc(prev => {
                        return [...prev, actualNote];
                    })
                })
                .catch(error => {
                    window.alert(error);
                    return;
                });
            setNote({
                title: "",
                content: "",
                modifiedDate: ""
            });
        } else {
            alert("No empty notes!");
        }
    }

    return (
        <div>
            <form method="post" className="create-note">
                <input onClick={() => { setExpanded(true) }} onChange={createNote} name="title" placeholder="Title" value={note.title} />
                {isExpanded &&
                    <textarea
                        onChange={createNote}
                        name="content"
                        placeholder="Take a note..."
                        rows="3"
                        value={note.content} />}
                <Zoom in={isExpanded}><Fab onClick={submit} aria-label="add"><AddIcon /></Fab></Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
