import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Button from "../components/Button";
import Contact from "../assets/image/contact.png";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import UserContext from "../context/UserContext";

function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { user } = useContext(UserContext);

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState); // Toggle form visibility
  };

  return (
    <>
      <div className="home-main h-[35rem] bg-cover bg-center bg-no-repeat"></div>

      <div className="flex justify-center">
        <Link
          to="/appointmentBook"
          className="bg-darkBlue bg-opacity-80 hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white mt-4"
        >
          Book Here
        </Link>
      </div>

      <FeedbackList />

      {user ? (
        <div className="p-4 text-center">
          <Button
            onClick={toggleFormVisibility}
            text={
              isFormVisible ? "Give Us Your Feedback" : "Give Us Your Feedback"
            }
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <Link
            to="/login"
            className="bg-darkBlue border-2 border-darkBlue w-1/3 p-4 rounded-lg text-center text-white hover:bg-transparent hover:text-darkBlue transition duration-1000 delay-150"
          >
            Post Review
          </Link>
        </div>
      )}

      {/* FeedbackForm as a section under FeedbackList */}
      {isFormVisible && (
        <section className="mt-8">
          <FeedbackForm onClose={toggleFormVisibility} />
        </section>
      )}

      <section id="contact">
        <div className="flex md:flex-row flex-col md:space-y-1 space-y-6 mt-4 mx-24 space-x-6">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={Contact}
              alt="contact"
              className="object-cover h-96 w-96"
            />
          </div>
          <div className="md:w-1/2 flex flex-col items-center h-auto justify-center space-y-10">
            <h1 className="box text-center py-4">GOT ANY QUESTIONS?</h1>
            <p>
              If you have any questions regarding our services and products,
              please get in touch with a member of our team so we can talk about
              it.
            </p>
            <Link
              to="/contact"
              className="bg-darkBlue bg-opacity-80 hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
