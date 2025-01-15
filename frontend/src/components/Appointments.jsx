import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";
import Appointment from "./Appointment";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Appointments() {
  //Appointments will be called and sent to the appointment.
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = () => {
    api
      .get("appointment/", { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    console.log("Appointments updated:", appointments);
  }, [appointments]); //Write to the log when appointments are changed.

  const onDelete = (id) => {
    api
      .delete(`appointment/delete/${id}`)
      .then((res) => {
        if (res.status === 204)
          toast.success(
            `Uh-oh! Your appointment was canceled, but we’ll make sure to reschedule it at your convenience! 😔`
          );
        else
          toast.error(
            `Oops! Looks like we hit a snag while canceling. Try once more! 🤞`
          );
        getAppointments();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div>
        {/* <h1>Your Appointments</h1>
        <div className="tickets">
          <div className="ticket-headings">
            <div>Product</div>
            <div>Date</div>
            <div>Status</div>
            <div></div>
          </div>
          {appointments.map((appointment) => (
            <Appointment
              key={appointment.id}
              appointment={appointment}
              onDelete={onDelete}
            />
          ))}
        </div> */}
      </div>
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <th>Service</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        {appointments.map((appointment) => (
          <tbody className="w-full">
            <tr className="text-center">
              <td>{appointment.service}</td>
              <td>{appointment.message}</td>
              <td>1961</td>
              <td>open</td>
              <button className="btn" onClick={() => onDelete(appointment.id)}>
                cancel {appointment.id}
              </button>
              <button className="btn">
                <Link
                  to={`/editAppointment-form/${appointment.id}`}
                  className="bg-darkBlue bg-opacity-80 hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white mt-4"
                >
                  edit {appointment.id} 💅🏻
                </Link>
              </button>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default Appointments;
