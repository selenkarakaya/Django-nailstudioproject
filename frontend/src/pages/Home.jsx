import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Button from "../components/Button";
import Contact from "../assets/image/contact.png";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import UserContext from "../context/UserContext";

function Home() {
  const { user } = useContext(UserContext);
  const [newFeedback, setNewFeedback] = useState(null); // Newly received feedback
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState); // Toggle form visibility
  };

  const handleFeedbackSubmit = (feedback) => {
    setNewFeedback(feedback); // The state is updated when new feedback arrives.
  };
  return (
    <>
      <div className="home-main h-[35rem] bg-cover bg-center bg-no-repeat"></div>
      <div className="flex justify-center">
        <Link
          to="/appointmentBook"
          className="bg-darkBlue  hover:bg-opacity-80 w-1/3 p-4 rounded-lg text-center text-white mt-4"
        >
          Book Here
        </Link>
      </div>
      <section id="contact">
        <div className="flex flex-col md:flex-row md:space-y-0 space-y-6 mt-4 mx-4 md:mx-24 space-x-0 md:space-x-6">
          {/* Image Section */}
          <div className="flex justify-center w-full">
            <img
              src={Contact}
              alt="contact"
              className="object-cover h-96 w-full md:w-96 md:h-auto rounded-lg"
            />
          </div>
          {/* Text Section */}
          <div className="flex flex-col items-center h-auto justify-center space-y-6 w-full px-4 md:w-1/2">
            <h1 className="text-center text-2xl font-semibold py-4">
              GOT ANY QUESTIONS?
            </h1>
            <p className="text-center text-gray-600">
              If you have any questions regarding our services and products,
              please get in touch with a member of our team so we can talk about
              it.
            </p>
            <Link
              to="/contact"
              className="bg-darkBlue hover:bg-opacity-80 w-full md:w-1/3 p-4 rounded-lg text-center text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <FeedbackList newFeedback={newFeedback} />

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
            className="bg-green border-4 border-green w-1/3 p-4 rounded-lg text-center text-white hover:bg-transparent hover:text-green transition duration-1000 delay-150"
          >
            Post Review
          </Link>
        </div>
      )}

      {/* FeedbackForm as a section under FeedbackList */}
      {isFormVisible && (
        <section className="mt-8">
          <FeedbackForm
            onClose={toggleFormVisibility}
            onFeedbackSubmit={handleFeedbackSubmit}
          />
        </section>
      )}
    </>
  );
}

export default Home;
