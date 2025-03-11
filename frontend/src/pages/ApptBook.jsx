import { useContext } from "react";
import { Link } from "react-router-dom";
import ApptForm from "../components/ApptForm";
import UserContext from "../context/UserContext";

function ApptBook() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gradient-to-r from-darkBlue to-lightBlue py-12 flex flex-col items-center justify-center">
      <section className="text-center mb-12 max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg animate-scaleUp">
          How can we make your day better?
        </h1>

        <h4 className="text-lg text-gray-100 mb-6 drop-shadow-lg">
          Choose an option below to get started with your experience
        </h4>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink to-green italic tracking-widest mb-8 drop-shadow-lg">
          Fresh Nail • Fresh You
        </h1>
      </section>

      {/* Conditional rendering based on user login status */}
      {user ? (
        <ApptForm />
      ) : (
        <div className="flex justify-center mt-6">
          <button className="bg-darkBlue border-2 border-darkBlue px-8 py-3 rounded-full text-white text-xl font-semibold hover:bg-transparent hover:text-darkBlue hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-110">
            <Link to="/login" className="w-full block">
              Log in
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default ApptBook;
