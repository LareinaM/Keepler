import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [notesArr, setArr] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch('http://localhost:5000/');
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setArr(records);
    }
    getRecords();
    return;
  }, [notesArr.length]);

  async function deleteItem(tarId) {
    await fetch(`http://localhost:5000/${tarId}`, {
      method: "DELETE"
    });
    console.log("Delete ", tarId);
    setArr(prev => {
      return prev.filter((note, idx) => {
        return note._id !== tarId;
      })
    });
    console.log(notesArr.length)
  }

  function notesList() {
    return notesArr.map((note, idx) => {
      return <Note key={idx} title={note.title} content={note.content} deleteItem={() => deleteItem(note._id)}></Note>
    });
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<><CreateArea />{notesList()}</>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
