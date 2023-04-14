import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import {MyDate} from "./Date";

function Note(props) {
    const [editing, setEditing] = useState(false);
    const [note, setNote] = useState({
        title: props.title,
        content: props.content,
        modifiedDate: props.modifiedDate
    });

    function editNote(e) {
        const { name, value } = e.target;
        setNote(prev => {
            return {
                ...prev,
                [name]: value,
                modifiedDate: MyDate()
            }
        })
    }

    async function finishEditing(e) {
        e.preventDefault();
        const id = props.id;
        await fetch(`http://localhost:5000/update/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(note),
        })
        setEditing(false);
    }

    return (
        <div>
            {editing ? (
                <form method="post" className="edit-note">
                    <input onChange={editNote} name="title" placeholder="Title" value={note.title} />
                    <textarea onChange={editNote} name="content" rows="3" value={note.content} />
                    <button onClick={props.deleteItem}><DeleteIcon /></button>
                    <button onClick={finishEditing}><DoneIcon /></button>
                </form>
            ) : (
                <div className="note">
                    <h1>{note.title}</h1>
                    <p>{note.content}</p>
                    <p className="dateCreated">{note.modifiedDate}</p>
                    <button onClick={props.deleteItem}><DeleteIcon /></button>
                    <button onClick={() => setEditing(true)}><EditIcon /></button>
                </div>)}
        </div>
    );
}

export default Note;
