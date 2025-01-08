import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

import React from "react";

function ApptBook() {
  return (
    <div>
      <section className="flex flex-col items-center">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
        <p>
          <h1 className="mb-4">Fresh Nail • Fresh You</h1>
        </p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Appointment
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> View My Appointment
      </Link>
    </div>
  );
}

export default ApptBook;
