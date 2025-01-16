import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Button from "./Button";
import api from "../api";

function ApptUpdateForm({}) {
  const [appointment, setAppointment] = useState({
    service: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); // Get the appointment ID from the URL params
  const navigate = useNavigate();

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

  const updateAppointment = (e) => {
    e.preventDefault();
    const updatedData = {
      service: appointment.service,
      message: appointment.message,
    };

    api
      .put(`appointment/update/${id}`, updatedData, { withCredentials: true })
      .then((res) => {
        toast.success(
          `Yay! Your appointment is updated. Get ready for a great experience!💅✨`
        );
        navigate("/profile");
      })
      .catch((err) => toast.error(`Whoops! Let’s give it another try! 🤷‍♂️`));
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <BackButton />
      <h1 className="text-center">Update Appointment</h1>
      <form onSubmit={updateAppointment} className="form">
        <div className="form-group">
          <label htmlFor="service">Service</label>
          <select
            name="product"
            id="product"
            onChange={(e) =>
              setAppointment({ ...appointment, service: e.target.value })
            }
            value={appointment.service}
          >
            <option value="Select service">Select service</option>
            <option value="Gel nail extensions full set">
              Gel nail extensions full set
            </option>
            <option value="Gel Infills">Gel Infill</option>
            <option value="Gel overlay on natural nails">
              Gel overlay on natural nails
            </option>
            <option value="Manicure with gel polish">
              Manicure with gel polish
            </option>
            <option value="Spa pedicure with gel polish">
              Spa pedicure with gel polish
            </option>
            <option value="Pedicure with gel polish">
              Pedicure with gel polish
            </option>
            <option value="Nail Extension Repair">Nail Extension Repair</option>
            <option value="Removal of gel polish/builder gel">
              Removal of gel polish/builder gel
            </option>
          </select>
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
        <div className="text-center">
          <Button text="Update 💅🏻" onClick={updateAppointment} />
        </div>
      </form>
    </div>
  );
}

export default ApptUpdateForm;
