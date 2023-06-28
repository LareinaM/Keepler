import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import { Sidebar } from "./components/Sidebar";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import SignupForm from "./components/Signup";
import LoginForm from "./components/Login";
import { useSelectedTaskValue } from './task-context';

function App() {
  const [notesArr, setArr] = useState([]);
  const [userID, setUserId] = useState(null);
  const [loggedin, toggleLoggedin] = useState(false);
  const { selectedTask } = useSelectedTaskValue();

  useEffect(() => {
    fetch(`http://localhost:5000/get/notes/${selectedTask}`)
      .then(response => response.json())
      .then(actualData => {
        setArr(actualData);
      });
  }, [loggedin, selectedTask]);

  async function deleteItem(tarId) {
    await fetch(`http://localhost:5000/delete/${tarId}`, {
      method: "DELETE"
    });
    setArr(prev => {
      return prev.filter((note, idx) => {
        return note._id !== tarId;
      })
    });
  }

  function notesList() {
    return notesArr.map((note, idx) => {
      var key = note._id;
      if (key === undefined) {
        key = idx.toString();
      }
      return <Note key={key} noteId={note._id} task={note.task} color={note.color} title={note.title} content={note.content} modifiedDate={note.modifiedDate} deleteItem={() => deleteItem(note._id)}></Note>
    });
  }

  return (
    <div>
      <Header loggedin={loggedin} toggleLoggedin={toggleLoggedin} />
      <Routes>
        <Route exact path="/" element={
          <>
            <Sidebar />
            <div className='notes'>
              <CreateArea addFunc={setArr} />
              {notesList()}
            </div>
          </>} />
        <Route path="/signup" element={< SignupForm setID={setUserId} toggleLoggedin={toggleLoggedin} />} />
        <Route path="/login" element={< LoginForm toggleLoggedin={toggleLoggedin} />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
