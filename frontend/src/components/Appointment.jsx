import { Link } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import { MdEditNote } from "react-icons/md";
function Appointment({ appointment, onDelete }) {
  return (
    <tr className="text-center">
      <td>{appointment.service}</td>
      <td>{appointment.message}</td>
      <td>date{appointment.date}</td>
      <td>open{appointment.status}</td>
      {/* <div className={`status status-${appointment.status}`}>
        {appointment.status}
      </div>  */}
      <td>
        <div className="flex justify-center items-center space-x-4">
          {/* Cancel Button with Tooltip */}
          <div className="relative group flex items-center">
            <button onClick={() => onDelete(appointment.id)}>
              <ImCancelCircle
                style={{ color: "#BE3144", fontSize: "1.5rem" }}
              />
            </button>
            {/* Tooltip for Cancel */}
            <div className="absolute bottom-8 left-0 invisible group-hover:visible bg-darkBlue text-white text-xs p-2 rounded-md mt-2">
              Cancel Appointment
            </div>
          </div>

          {/* Edit Button with Tooltip */}
          <div className="relative group flex items-center">
            <Link to={`/editAppointment-form/${appointment.id}`}>
              <MdEditNote
                className="text-darkBlue"
                style={{ fontSize: "2rem" }}
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
