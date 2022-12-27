import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
export default function Edit() {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setNote(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    function updateNote(e) {
        const { name, value } = e.target;
        setNote(prev => {
            return { ...prev, [name]: value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedNote = {
            title: note.title,
            content: note.content
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedNote),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
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
                <button onClick={onSubmit}><span role="img">✅</span></button>
            </form>
        </div>
    )
}