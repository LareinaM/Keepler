import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import SignupForm from "./components/Signup";
import LoginForm from "./components/Login";

function App() {
  const [notesArr, setArr] = useState([]);
  const [userID, setUserId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(actualData => setArr(actualData));
  }, []);

  async function deleteItem(tarId) {
    await fetch(`http://localhost:5000/${tarId}`, {
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
      return <Note key={note._id} noteId={note._id} title={note.title} content={note.content} modifiedDate={note.modifiedDate} deleteItem={() => deleteItem(note._id)}></Note>
    });
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={
          <>
            <CreateArea addFunc={setArr} />
            {notesList()}
          </>} />
        <Route path="/signup" element={< SignupForm setID={setUserId} />}/>
        <Route path="/login" element={< LoginForm />}/>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
