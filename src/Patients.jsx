import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [editPatient, setEditPatient] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
    loadPatients();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await axios.get("https://doc-back.onrender.com/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load doctors");
    }
  };

  const loadPatients = async () => {
    try {
      const res = await axios.get("https://doc-back.onrender.com/patients");
      setPatients(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load patients");
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm("Delete this patient?")) return;
    try {
      await axios.delete(`https://doc-back.onrender.com/patients/${id}`);
      setPatients((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      alert("Patient deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const openEditModal = (patient) => {
    setEditPatient({
      ...patient,
      doctor: typeof patient.doctor === "string" ? patient.doctor : patient.doctor?.id || patient.doctor?._id || "",
    });
  };

  const handleChange = (e) => {
    setEditPatient({
      ...editPatient,
      [e.target.name]: e.target.value,
    });
  };

  const updatePatient = async () => {
    try {
      const payload = {
        name: editPatient.name,
        age: editPatient.age,
        gender: editPatient.gender,
        disease: editPatient.disease,
        doctor: editPatient.doctor, // just ID
      };
      await axios.put(
        `https://doc-back.onrender.com/patients/${editPatient.id || editPatient._id}`,
        payload
      );
      setEditPatient(null);
      alert("Patient updated");
      loadPatients();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ---------------- Helper to normalize doctor ----------------
  const getDoctorInfo = (doctor) => {
    if (!doctor) return { name: "-", specialization: "-" };

    if (typeof doctor === "string" || typeof doctor === "number") {
      // doctor is ID
      const doc = doctors.find((d) => d.id == doctor || d._id == doctor);
      return doc ? { name: doc.name, specialization: doc.specialization } : { name: "-", specialization: "-" };
    }

    // doctor is object
    return { name: doctor.name || "-", specialization: doctor.specialization || "-" };
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Patients List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Disease</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => {
              const { name, specialization } = getDoctorInfo(p.doctor);
              return (
                <tr key={p.id || p._id}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.disease}</td>
                  <td>{name}</td>
                  <td>{specialization}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => openEditModal(p)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => deletePatient(p.id || p._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editPatient && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Patient</h5>
                <button className="btn-close" onClick={() => setEditPatient(null)} />
              </div>

              <div className="modal-body">
                <input className="form-control mb-2" name="name" value={editPatient.name} onChange={handleChange} />
                <input className="form-control mb-2" type="number" name="age" value={editPatient.age} onChange={handleChange} />
                <select className="form-select mb-2" name="gender" value={editPatient.gender} onChange={handleChange}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input className="form-control mb-2" name="disease" value={editPatient.disease} onChange={handleChange} />
                <select className="form-select" name="doctor" value={editPatient.doctor} onChange={handleChange}>
                  <option value="">Select Doctor</option>
                  {doctors.map((d) => (
                    <option key={d.id || d._id} value={d.id || d._id}>
                      {d.name} ({d.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditPatient(null)}>Cancel</button>
                <button className="btn btn-success" onClick={updatePatient}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
