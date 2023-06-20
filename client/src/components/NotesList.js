import React from "react";
import { useSelectedTaskValue } from '../task-context';

function NotesList(props){
    notesArr = 
    return props.notesArr.map((note, idx) => {
        return <Note key={note._id} noteId={note._id} color={note.color} task={note.task} title={note.title} content={note.content} modifiedDate={note.modifiedDate} deleteItem={() => deleteItem(note._id)}></Note>
      });
}

export default NotesList;