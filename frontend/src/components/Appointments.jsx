import Spinner from "./Spinner";
import BackButton from "./BackButton";
import Appointment from "./Appointment";

function Appointments() {
  //appointments cagrilacak ve appointment'a gonderilecek
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
        {/* {appointments.map((appointment) => (
      <Appointment key={appointment._id} appointment={appointment} />
    ))} */}
      </div>
    </div>
  );
}

export default Appointments;
