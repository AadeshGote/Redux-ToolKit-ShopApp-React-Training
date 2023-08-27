import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./redux/NavBar";
import Display from "./redux/Display";
import Cart from "./redux/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
