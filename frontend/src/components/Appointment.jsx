import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Appointment({ appointment, onDelete, onEdit }) {
  return (
    <div className="appointment">
      <div>{appointment.service}</div>
      <div>{appointment.message}</div>
      <button className="btn" onClick={() => onDelete(appointment.id)}>
        cancel appotinment {appointment.id}
      </button>

      <button className="btn">
        <Link
          to={`/editAppointment-form/${appointment.id}`}
          className="bg-darkBlue bg-opacity-80 hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white mt-4"
        >
          Boedit appotinment {appointment.id} 💅🏻
        </Link>
      </button>
      {/* <Link to={`/appointment/${appointment._id}`} className="btn">
        <FaPlus /> view
      </Link> */}

      {/* <div className={`status status-${appointment.status}`}>
        {appointment.status}
      </div> */}
    </div>
  );
}

export default Appointment;
