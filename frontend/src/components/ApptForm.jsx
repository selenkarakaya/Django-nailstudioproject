import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import Button from "./Button";
import UserContext from "../context/UserContext";

function ApptForm() {
  const { user } = useContext(UserContext);
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(""); //for date
  const [appointmentTime, setAppointmentTime] = useState(""); //for hour
  const appointmentDateTime = `${appointmentDate}T${appointmentTime}:00`;
  const [status, setStatus] = useState(""); // Status için
  const navigate = useNavigate();

  //Create time slots with 30-minute intervals between 09:00 and 18:00.
  const generateTimeSlots = (start, end, interval) => {
    const times = [];
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);

    while (startTime <= endTime) {
      const timeString = startTime.toTimeString().slice(0, 5); //In hour and minute format.
      times.push(timeString);
      startTime.setMinutes(startTime.getMinutes() + interval);
    }
    return times;
  };

  const timeSlots = generateTimeSlots("09:00", "18:00", 30); //09:00 - 18:00, with 30-minute intervals.

  // Handle the appointment date change and calculate status
  const handleAppointmentDateChange = (e) => {
    const date = e.target.value;
    setAppointmentDate(date);
    const currentDate = new Date();
    const selectedDate = new Date(date);
    // Check if the selected date is in the past or future
    if (selectedDate < currentDate) {
      setStatus("closed");
    } else {
      setStatus("open");
    }
  };

  const createAppointment = (e) => {
    e.preventDefault();

    // Form validation
    if (!service || !appointmentDate || !appointmentTime) {
      toast.error("Please fill all the required fields!");
      return;
    }
    const data = {
      service,
      message: message || "", // If no message is provided, send an empty string
      appointment_date: appointmentDateTime, //Send the full datetime.
      status, //Send the calculated status ('open' or 'closed')
    };

    api.post("appointment/create/", data).then((res) => {
      if (res.status === 201) {
        toast.success(
          `Yay! Your appointment is confirmed. Get ready for a great experience!💅✨`
        );
        navigate("/profile");
      } else toast.error(`Whoops! Let’s give it another try! 🤷‍♂️`);
    });
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-3/4 mx-auto">
      <div className="flex">
        <div className="form-group w-1/2">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={user?.username || ""}
            readOnly
          />
        </div>
        <div className="form-group w-1/2">
          <label htmlFor="email">Your Email</label>
          <input
            type="text"
            className="form-control"
            value={user?.email || ""}
            readOnly
          />
        </div>
      </div>
      <form onSubmit={createAppointment}>
        <div className="form-group">
          <label htmlFor="product">Services</label>
          <select
            name="product"
            id="product"
            onChange={(e) => setService(e.target.value)}
            value={service}
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
            name="message"
            id="message"
            className="form-control"
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
        </div>
        <div className="flex space-x-2">
          <div className="form-group w-1/2">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              className="form-control"
              onChange={handleAppointmentDateChange}
              value={appointmentDate}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div className="form-group w-1/2">
            <label htmlFor="appointmentTime">Appointment Time</label>
            <select
              id="appointmentTime"
              name="appointmentTime"
              className="form-control"
              onChange={(e) => setAppointmentTime(e.target.value)}
              value={appointmentTime}
              required
            >
              <option>Select Time</option>
              {timeSlots.map((time) => {
                const currentTime = new Date();
                const selectedTime = new Date(`${appointmentDate}T${time}:00`);
                const isPastTime = selectedTime < currentTime;
                return (
                  <option key={time} value={time} disabled={isPastTime}>
                    {time}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="text-center">
          <Button text="Submit" onClick={createAppointment} />
        </div>
      </form>
    </div>
  );
}

export default ApptForm;
