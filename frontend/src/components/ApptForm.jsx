import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import api from "../api";
import Button from "./Button";
import { toast } from "react-toastify";

function ApptForm() {
  const [user, setUser] = useState(null);
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(""); //for date
  const [appointmentTime, setAppointmentTime] = useState(""); // for hour
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("profile/", { withCredentials: true });
        setUser(response.data); //We are retrieving user data.
      } catch (error) {
        setError("Unable to fetch user data, please try again.");
        console.error("Error fetching profile:", error);
      }
    };
    fetchUserData();
  }, []);

  const createAppointment = (e) => {
    e.preventDefault();

    const data = {
      service,
      message,
      appointment_date: appointmentDateTime, //Send the full datetime.
      status, //Send the calculated status ('open' or 'closed')
    };

    api.post("appointment/create", data).then((res) => {
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
    <div>
      <BackButton />
      <header className="flex flex-col items-center justify-center">
        <h1>Create New Appointment</h1>
        <p className="italic">Please fill out the form below</p>
      </header>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={user?.username || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="text"
            className="form-control"
            value={user?.email || ""}
            readOnly
          />
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
              <option value="Nail Extension Repair">
                Nail Extension Repair
              </option>
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
          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              className="form-control"
              onChange={handleAppointmentDateChange}
              value={appointmentDate}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentTime">Appointment Time</label>
            <select
              id="appointmentTime"
              name="appointmentTime"
              className="form-control"
              onChange={(e) => setAppointmentTime(e.target.value)}
              value={appointmentTime}
              required
            >
              <option value="">Select Time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <Button text="Submit" onClick={createAppointment} />
          </div>
        </form>
      </section>
    </div>
  );
}

export default ApptForm;
