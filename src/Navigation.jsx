import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      window.bootstrap.Collapse.getOrCreateInstance(navbar).hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        {/* Logo */}
        <NavLink className="navbar-brand" to="/" onClick={closeNavbar}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxEuu_RNYcrJ7npfoVxiueD_OYjSyH1ifK8g&s"
            alt="Logo"
            width="40"
            height="40"
          />
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center">

            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/login" onClick={closeNavbar}>
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/register" onClick={closeNavbar}>
                Register
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/add-doctor" onClick={closeNavbar}>
                Add Doctor
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/patients" onClick={closeNavbar}>
                Patients
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/add-patient" onClick={closeNavbar}>
                Add Patient
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
