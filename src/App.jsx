import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import LectureList from "./components/LectureList";
import AddLecture from "./components/AddLecture";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Конспекты 436</h1>
          <Link to="/add">Добавить лекцию</Link>
        </header>

        <Routes>
          <Route path="/" element={<LectureList />} />
          <Route path="/add" element={<AddLecture />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
