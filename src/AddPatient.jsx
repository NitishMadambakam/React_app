import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (!name || !age || !gender || !weight || !email || !password || !disease || !doctor) {
      alert("Please fill all fields");
      return;
    }

    // find selected doctor object
    const selectedDoctor = doctors.find(
      (d) => (d.id || d._id).toString() === doctor
    );

    try {
      setLoading(true);

      await axios.post("https://doc-back.onrender.com/patients", {
        name,
        weight,
        gender,
        age,
        email,
        password,
        disease,
        doctor: {
          id: selectedDoctor.id || selectedDoctor._id,
          name: selectedDoctor.name,
          specialization: selectedDoctor.specialization,
        },
      });

      alert("Patient Added Successfully!");

      setName("");
      setAge("");
      setGender("");
      setWeight("");
      setEmail("");
      setPassword("");
      setDisease("");
      setDoctor("");

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

          <input className="form-control mb-3" placeholder="Patient Name"
            value={name} onChange={(e) => setName(e.target.value)} />

          <input className="form-control mb-3" type="number" placeholder="Age"
            value={age} onChange={(e) => setAge(e.target.value)} />

          <input className="form-control mb-3" type="number" placeholder="Weight"
            value={weight} onChange={(e) => setWeight(e.target.value)} />

          <select className="form-select mb-3"
            value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input className="form-control mb-3" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <input className="form-control mb-3" type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />

          <input className="form-control mb-3" placeholder="Disease"
            value={disease} onChange={(e) => setDisease(e.target.value)} />

          <select className="form-select mb-4"
            value={doctor} onChange={(e) => setDoctor(e.target.value)}>
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
