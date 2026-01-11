// import React, { useState } from "react";

// export default function App() {
//   const [name, setName] = useState("Nitish");
//   const [age, setAge] = useState(22);

//   // Object creation
//   const [student, setStudent] = useState({
//     name: "Nitish",
//     age: 22
//   });

//   return (
//     <div>
//       <p>Good Afternoon</p>
//       <p>Name is: {name}, age is {age}</p>
//       <p>Student Name is: {student.name}, age is:{student.age}</p>
//     </div>
//   );
// }

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home.jsx'
import Login from './Login.jsx'
import Register from './register.jsx'
import Navigation from './Navigation.jsx'
import AddDocter from './AddDoctor.jsx'
import Patients from './Patients.jsx'
import AddPatient from './AddPatient.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add-doctor' element={<AddDocter />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/add-patient" element={<AddPatient />} />

      </Routes>
    </BrowserRouter>
  )
}