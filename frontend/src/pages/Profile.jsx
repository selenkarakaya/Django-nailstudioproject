import { Link } from "react-router-dom";
// eslint-disable-next-line
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import Tickets from "./Tickets";

function Profile() {
  return (
    <div>
      <div className="mb-5">
        <header className="flex items-center space-x-8">
          <p className="pl-2 text-xl">My Account • </p>
          <Link
            to="/Feedback"
            className="text-xl text-greens flex items-center space-x-2"
          >
            <GoCommentDiscussion />
            <p>Help us improve •</p>
          </Link>
          <Link
            to="/Contact"
            className="text-xl text-greens flex items-center space-x-2"
          >
            <BiEditAlt />
            <p> Contact •</p>
          </Link>
          <p className="cursor-pointer text-greens text-xl">changeDetails</p>
        </header>
        <main>
          <div className="flex flex-col mt-6">
            <h1 className="text-2xl text-center mb-6">My details</h1>
            <div className="bg-indigo-200 md:w-3/4 mx-auto">
              <form className="flex flex-col justify-center items-center my-4 space-y-4 p-6">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                  >
                    Full name
                  </label>
                  <input type="text" id="name" />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                  >
                    Email
                  </label>
                  <input type="text" id="email" />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                  >
                    Address
                  </label>
                  <input type="text" id="address" />
                </div>
                <h1>image</h1>
                <img alt="not found" width={"250px"} />
                <label htmlFor="avatar">Choose a profile picture:</label>

                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                />
              </form>
            </div>
          </div>
        </main>
      </div>
      <Tickets />
    </div>
  );
}

export default Profile;
