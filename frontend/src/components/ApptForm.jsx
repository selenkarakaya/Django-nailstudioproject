import BackButton from "../components/BackButton";

function ApptForm() {
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
          <input type="text" className="form-control" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input type="text" className="form-control" disabled />
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="product">Services</label>
            <select name="product" id="product">
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
            <label htmlFor="description">Message</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
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
