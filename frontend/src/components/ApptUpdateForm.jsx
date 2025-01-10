import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

function ApptUpdateForm({}) {
  const [appointment, setAppointment] = useState({
    service: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); // Get the appointment ID from the URL params
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Fetch the current appointment data to populate the form
    api
      .get(`appointment/${id}/`, { withCredentials: true })
      .then((res) => {
        setAppointment({
          service: res.data.service,
          message: res.data.message,
        });
        setIsLoading(false);
      })
      .catch((err) => alert(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      service: appointment.service,
      message: appointment.message,
    };

    api
      .put(`appointment/update/${id}`, updatedData, { withCredentials: true })
      .then((res) => {
        alert("Appointment updated successfully");
        navigate("/appointments"); // Use navigate instead of history.push
      })
      .catch((err) => alert(err));
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <BackButton />
      <h1>Update Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="service">Service</label>
          <input
            type="text"
            id="service"
            className="form-control"
            value={appointment.service}
            onChange={(e) =>
              setAppointment({ ...appointment, service: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form-control"
            value={appointment.message}
            onChange={(e) =>
              setAppointment({ ...appointment, message: e.target.value })
            }
          ></textarea>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApptUpdateForm;
