import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";
import Appointment from "./Appointment";

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
      .catch((err) => toast.error(`Oops!  Try once more! 🤞`));
  };

  const onDelete = (id) => {
    api
      .delete(`appointment/delete/${id}`)
      .then((res) => {
        if (res.status === 204)
          toast.success(
            `Uh-oh! Your appointment was canceled, but we’ll make sure to reschedule it at your convenience! 😔`
          );

        getAppointments();
      })
      .catch((err) =>
        toast.error(
          `Oops! Looks like we hit a snag while canceling. Try once more! 🤞`
        )
      );
  };

  return (
    <>
      <h1 className="text-lightOrange text-center text-lg">
        Your Appointments
      </h1>

      <table className="table-fixed w-3/4 mx-auto">
        <thead className="border-b-2 border-darkBlue">
          <tr>
            <th>Service</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <Appointment
              key={appointment.id}
              appointment={appointment}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Appointments;
