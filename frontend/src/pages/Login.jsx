function Login() {
  return (
    <>
      <section className="flex flex-col items-center">
        <h1>Register</h1>
        <p>Please log in and book</p>
      </section>
      <section className="form">
        <form>
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
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group text-center">
            <button className="bg-darkBlue bg-opacity-80 hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
