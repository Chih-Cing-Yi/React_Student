import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/home";
import Student from "./page/student";
import Error from "./page/error";
import Register from "./page/register";
import Login from "./page/login";
import Course from "./page/course";
import AuthService from "./services/AuthService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";

function App() {
  let [user, setUser] = useState(AuthService.getUser());
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser} />}>
            <Route index element={<Home />} />
            <Route path="Register" element={<Register />} />
            <Route
              path="Login"
              element={<Login user={user} setUser={setUser} />}
            />
            <Route
              path="Student"
              element={<Student user={user} setUser={setUser} />}
            />
            <Route
              path="Course"
              element={<Course user={user} setUser={setUser} />}
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
