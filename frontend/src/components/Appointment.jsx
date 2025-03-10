import { Link } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import { MdEditNote } from "react-icons/md";

function Appointment({ appointment, onDelete }) {
  //date-time format for style
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      weekday: "long", //A day name like Monday.
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false, //24-hour format.
    });
  };
  // Dynamically set the status based on the appointment date
  const getStatus = (appointmentDate) => {
    const currentDate = new Date();
    const appointmentDateTime = new Date(appointmentDate);
    if (appointmentDateTime < currentDate) {
      return "closed";
    } else {
      return "open";
    }
  };

  return (
    <tr className="text-center">
      <td>{appointment.service}</td>
      <td>{appointment.message}</td>
      <td>{formatDate(appointment.appointment_date)}</td>
      <td>
        <span className={`status ${getStatus(appointment.appointment_date)}`}>
          {getStatus(appointment.appointment_date)}
        </span>
      </td>
      <td>
        <div className="flex justify-center items-center space-x-4">
          {/* Cancel Button with Tooltip */}
          <div className="relative group flex items-center">
            <button
              onClick={() => onDelete(appointment.id)}
              disabled={getStatus(appointment.appointment_date) === "closed"} //The button is disabled.
            >
              <ImCancelCircle
                style={{
                  color:
                    getStatus(appointment.appointment_date) === "closed"
                      ? "#d3d3d3"
                      : "#BE3144",
                  fontSize: "1.5rem",
                }}
              />
            </button>
            {/* Tooltip for Cancel */}
            <div className="absolute bottom-8 left-0 invisible group-hover:visible bg-darkBlue text-white text-xs p-2 rounded-md mt-2">
              Cancel Appointment
            </div>
          </div>

          {/* Edit Button with Tooltip */}
          <div className="relative group flex items-center">
            <Link
              to={`/editAppointment-form/${appointment.id}`}
              style={{
                pointerEvents:
                  getStatus(appointment.appointment_date) === "closed"
                    ? "none"
                    : "auto",
              }} //The link is disabled.
            >
              <MdEditNote
                className="text-darkBlue"
                style={{
                  fontSize: "2rem",
                  color:
                    getStatus(appointment.appointment_date) === "closed"
                      ? "#d3d3d3"
                      : "",
                }}
              />
            </Link>
            {/* Tooltip for Edit */}
            <div className="absolute bottom-8 left-0 invisible group-hover:visible bg-darkBlue text-white text-xs p-2 rounded-md mt-2">
              Update Appointment
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Appointment;
