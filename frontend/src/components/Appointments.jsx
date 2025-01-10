import Spinner from "./Spinner";
import BackButton from "./BackButton";
import Appointment from "./Appointment";
import { useState, useEffect } from "react";
import api from "../api";

function Appointments() {
  //appointments cagrilacak ve appointment'a gonderilecek
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
  }, [appointments]); // appointments değiştiğinde log yazdır

  const onDelete = (id) => {
    api
      .delete(`appointment/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("appt delete");
        else alert("Failed to delete");
        getAppointments();
      })
      .catch((err) => alert(err));
  };

  const onEdit = (id) => {};
  return (
    <div>
      <BackButton />
      <h1>Tickets</h1>
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
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default Appointments;
