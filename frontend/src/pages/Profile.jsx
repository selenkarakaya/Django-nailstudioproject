import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import Appointments from "../components/Appointments";
import api from "../api";

function Profile() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await api.get("profile/", { withCredentials: true });
  //       setUser(response.data); // Kullanıcı bilgilerini alıyoruz
  //     } catch (error) {
  //       setError("Unable to fetch user data, please try again");
  //       console.error("Error fetching profile:", error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("profile/", { withCredentials: true });
        setUser(response.data); // Kullanıcı bilgilerini alıyoruz
      } catch (error) {
        if (error.response && error.response.status === 403) {
          toast.error(`You must be logged in to view this page`);
        } else {
          toast.error(`Unable to fetch user data, please try again.`);
        }
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return user ? (
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
                  <input type="text" id="name" value={user.username} readOnly />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                  >
                    Email
                  </label>
                  <input type="text" id="email" value={user.email} readOnly />
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
              </form>
            </div>
          </div>
        </main>
      </div>
      <Appointments />
    </div>
  ) : (
    <p>selen</p>
  );
}

export default Profile;
