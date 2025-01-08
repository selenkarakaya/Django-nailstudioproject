import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Appointment({ appointment }) {
  return (
    <div className="appointment">
      <div>{appointment.product}</div>
      <div>{appointment.date}</div>
      <Link to={`/appointment/${appointment._id}`} className="btn">
        <FaPlus /> view
      </Link>

      <div className={`status status-${appointment.status}`}>
        {appointment.status}
      </div>
    </div>
  );
}

export default Appointment;
