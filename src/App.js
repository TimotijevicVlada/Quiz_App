import React from "react";
import "./style/App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route path="/quiz" element={ <Quiz/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
