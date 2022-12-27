import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Note = (props) => (
    <div className="note">
        <h1>{props.record.title}</h1>
        <p>{props.record.content}</p>
        <button className="btn btn-outline-warning" onClick={() => {
            props.deleteRecord(props.record._id)
        }}><span role="img">🗑</span></button>
        <Link className="btn btn-outline-warning" to={`/edit/${props.record._id}`}><span role="img">🖊</span></Link>
    </div>
);
export default function RecordList() {
    const [records, setRecords] = useState([]);
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    function recordList() {
        return records.map((record) => {
            return (
                <Note
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (<div>{recordList()}</div>);
}