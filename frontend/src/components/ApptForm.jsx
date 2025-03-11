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
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-6">
        Book an Appointment
      </h2>
      <div className="flex space-x-4 mb-6">
        <div className="form-group w-full sm:w-1/2">
          <label htmlFor="name" className="text-sm font-semibold">
            Your Name
          </label>
          <input
            type="text"
            className="form-control w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={user?.username || ""}
            readOnly
          />
        </div>
        <div className="form-group w-full sm:w-1/2">
          <label htmlFor="email" className="text-sm font-semibold">
            Your Email
          </label>
          <input
            type="text"
            className="form-control w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={user?.email || ""}
            readOnly
          />
        </div>
      </div>

      <form onSubmit={createAppointment}>
        <div className="form-group mb-4">
          <label htmlFor="product" className="text-sm font-semibold">
            Services
          </label>
          <select
            name="product"
            id="product"
            onChange={(e) => setService(e.target.value)}
            value={service}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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

        <div className="form-group mb-4">
          <label htmlFor="message" className="text-sm font-semibold">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="form-control w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="form-group w-full sm:w-1/2">
            <label htmlFor="appointmentDate" className="text-sm font-semibold">
              Appointment Date
            </label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              className="form-control w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={handleAppointmentDateChange}
              value={appointmentDate}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div className="form-group w-full sm:w-1/2">
            <label htmlFor="appointmentTime" className="text-sm font-semibold">
              Appointment Time
            </label>
            <select
              id="appointmentTime"
              name="appointmentTime"
              className="form-control w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
          <button
            type="submit"
            className="px-6 py-3 mt-4 text-white bg-darkBlue rounded-lg focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApptForm;
