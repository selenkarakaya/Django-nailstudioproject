import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import api from "../api";

function ApptForm() {
  const [user, setUser] = useState(null);
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("profile/", { withCredentials: true });
        setUser(response.data); // Kullanıcı bilgilerini alıyoruz
      } catch (error) {
        setError("Unable to fetch user data, please try again");
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
    };
    api
      .post("appointment/create", data)
      .then((res) => {
        if (res.status === 201) {
          toast.success(`Hello 🫂  appointment created!!`);
          navigate("/profile");
        } else toast.error(`Hello 🫂  Failed to make appointment!!`);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <BackButton />
      <section className="flex flex-col items-center justify-center">
        <h1>Create New Appointment</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={user.username}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="text"
            className="form-control"
            value={user.email}
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
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ApptForm;
