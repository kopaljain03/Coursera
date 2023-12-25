import { useState } from "react";
import "./App.css";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Login from "./Login";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/course/:id" element={<Course />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
