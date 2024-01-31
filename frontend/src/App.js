// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Homepage from "./Pages/Homepage/Homepage";
import Register from "./Pages/Register/Register";
import Logout from "./Pages/Logout/Logout";
import { useState } from "react";
function App() {
  

  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route path="/home" Component={Homepage} />
        <Route path="/register" Component={Register} />
        <Route path="/logout" Component={Logout} />
      </Routes>
    </Router>
  );
}

export default App;
