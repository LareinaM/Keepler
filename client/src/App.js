import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateArea from "./components/create";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<CreateArea />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
