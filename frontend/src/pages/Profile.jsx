import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import FeedbackForm from "../components/FeedbackForm";
import { GoCommentDiscussion } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import Appointments from "../components/Appointments";
import UserContext from "../context/UserContext";
import Spinner from "../components/Spinner";

function Profile() {
  const { user } = useContext(UserContext);

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const openFeedback = () => setIsFeedbackOpen(true);
  const closeFeedback = () => setIsFeedbackOpen(false);

  const handleFeedbackSubmit = (feedback) => {
    closeFeedback();
  };

  if (!user) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="mb-5">
        <header className="flex items-center space-x-8">
          <p className="pl-2 md:text-xl text-sm">My Account • </p>
          <button
            type="button"
            onClick={openFeedback}
            className="md:text-xl text-sm text-greens flex items-center space-x-2"
          >
            <GoCommentDiscussion />
            <p>Help us improve •</p>
          </button>

          <Link
            to="/Contact"
            className="md:text-xl text-sm text-greens flex items-center space-x-2"
          >
            <BiEditAlt />
            <p> Contact •</p>
          </Link>
        </header>
        <main>
          <div className="flex flex-col mt-6">
            <h1 className="text-2xl text-center mb-6">My details</h1>
            <div className="bg-indigo-200 md:w-3/4 w-full mx-auto">
              <form className="flex flex-col justify-center items-center my-4 space-y-4 p-6">
                <div className="w-1/2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={user.username}
                    readOnly
                    className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
                  />
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={user.email}
                    className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <FeedbackForm
            onClose={closeFeedback}
            onFeedbackSubmit={handleFeedbackSubmit}
          />
        </div>
      )}
      <Appointments />
    </div>
  );
}

export default Profile;
