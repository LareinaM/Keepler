import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateArea() {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    const navigate = useNavigate();

    function updateNote(e) {
        const { name, value } = e.target;
        setNote(prev => {
            return { ...prev, [name]: value };
        });
    }

    async function onSubmit(e) {
        if (note.title !== '' || note.content !== '') {
            e.preventDefault();
            const newNote = { ...note };
            await fetch("http://localhost:5000/record/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newNote),
            })
                .catch(err => {
                    window.alert(err);
                    return;
                });
            setNote({ title: "", content: "" });
            navigate("/");
        }
    }

    return (
        <div>
            <form method="post" class="create-note">
                <input onChange={updateNote} name="title" placeholder="Title" value={note.title} />
                <textarea
                    onChange={updateNote}
                    name="content"
                    placeholder="Take a note..."
                    rows="3"
                    value={note.content} />
                <button onClick={onSubmit}>+</button>
            </form>
        </div >
    )
}