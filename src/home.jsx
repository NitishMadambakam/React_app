import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const res = await axios.get("https://doc-back.onrender.com/doctors");
    setDoctors(res.data);
  };

  // ✅ DELETE DOCTOR
  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await axios.delete(`https://doc-back.onrender.com/doctors/${id}`);
      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
      alert("Doctor deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ✅ OPEN EDIT MODAL
  const openEditModal = (doctor) => {
    setCurrentDoctor({ ...doctor });
    setShowModal(true);
  };

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setCurrentDoctor({
      ...currentDoctor,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ UPDATE DOCTOR
  const updateDoctor = async () => {
    try {
      const updatedDoctor = {
        name: currentDoctor.name,
        age: currentDoctor.age,
        gender: currentDoctor.gender,
        specialization: currentDoctor.specialization,
        salary: currentDoctor.salary,
      };

      const res = await axios.put(
        `https://doc-back.onrender.com/doctors/${currentDoctor.id}`,
        updatedDoctor
      );

      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === currentDoctor.id ? res.data : doc
        )
      );

      setShowModal(false);
      alert("Doctor updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Doctors List</h2>

      <div className="row">
        {doctors.map((doctor) => (
          <div className="col-md-3 mb-4" key={doctor.id}>
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5>{doctor.name}</h5>
                <p><b>Age:</b> {doctor.age}</p>
                <p><b>Gender:</b> {doctor.gender}</p>
                <p><b>Specialization:</b> {doctor.specialization}</p>
                <p><b>Salary:</b> ₹{doctor.salary}</p>
              </div>

              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => openEditModal(doctor)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteDoctor(doctor.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {showModal && currentDoctor && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Doctor</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body">
                <input className="form-control mb-2" name="name" value={currentDoctor.name} onChange={handleChange} />
                <input className="form-control mb-2" name="age" type="number" value={currentDoctor.age} onChange={handleChange} />
                <input className="form-control mb-2" name="gender" value={currentDoctor.gender} onChange={handleChange} />
                <input className="form-control mb-2" name="specialization" value={currentDoctor.specialization} onChange={handleChange} />
                <input className="form-control mb-2" name="salary" type="number" value={currentDoctor.salary} onChange={handleChange} />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={updateDoctor}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
