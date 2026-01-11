import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDoctor() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [salary, setSalary] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorData = {
      name,
      age,
      gender,
      salary,
      specialization,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        "https://doc-back.onrender.com/doctors",
        doctorData
      );

      if (res.status === 201) {
        alert("Doctor Added Successfully");
        navigate("/");
      }

      // Reset form
      setName("");
      setAge("");
      setGender("");
      setSalary("");
      setSpecialization("");
    } catch (error) {
      console.error("Error adding doctor:", error.response?.data || error.message);
      alert("Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <form className="col-12 col-md-6" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Add Doctor</h2>

          {/* Doctor Name */}
          <div className="mb-3">
            <label className="form-label">Doctor Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Age */}
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Salary */}
          <div className="mb-3">
            <label className="form-label">Salary</label>
            <input
              type="number"
              className="form-control"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>

          {/* Specialization */}
          <div className="mb-4">
            <label className="form-label">Specialization</label>
            <input
              type="text"
              className="form-control"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
}
