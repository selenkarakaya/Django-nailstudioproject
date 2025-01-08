function Register() {
  return (
    <>
      <section className="flex flex-col items-center ">
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form>
          <img alt="not found" width={"250px"} />
          <label htmlFor="avatar">Choose a profile picture:</label>
          <input accept="image/*" id="profilePhoto" type="file" />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              id="address"
              name="address"
              rows="3"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group text-center">
            <button className="bg-darkBlue hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
