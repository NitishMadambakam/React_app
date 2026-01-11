import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [disease, setDisease] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- LOAD DOCTORS ----------------
  useEffect(() => {
    axios
      .get("https://doc-back.onrender.com/doctors")
      .then((res) => setDoctors(res.data))
      .catch(() => alert("Failed to load doctors"));
  }, []);

  // ---------------- ADD PATIENT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!name || !age || !gender || !disease || !doctor) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // POST to backend
      await axios.post("https://doc-back.onrender.com/patients", {
        name,
        age,
        gender,
        disease,
        doctor, // just send doctor ID
      });

      // SUCCESS POPUP
      alert("Patient Added Successfully!");

      // CLEAR ALL FIELDS
      setName("");
      setAge("");
      setGender("");
      setDisease("");
      setDoctor("");

      // REDIRECT to patients page
      navigate("/patients");
    } catch (error) {
      console.error(error);
      alert("Failed to add patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <form className="col-12 col-md-6" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Add Patient</h3>

          <input
            className="form-control mb-3"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control mb-3"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <select
            className="form-select mb-3"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            className="form-control mb-3"
            placeholder="Disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />

          <select
            className="form-select mb-4"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id || d._id} value={d.id || d._id}>
                {d.name} ({d.specialization})
              </option>
            ))}
          </select>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Adding..." : "Add Patient"}
          </button>
        </form>
      </div>
    </div>
  );
}
