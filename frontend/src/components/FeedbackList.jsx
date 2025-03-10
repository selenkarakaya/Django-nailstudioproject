import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

const FeedbackList = ({ newFeedback }) => {
  const [feedbacks, setFeedbacks] = useState([]); // State for storing feedback data
  const [loading, setLoading] = useState(true); // State for indicating loading status
  const [currentIndex, setCurrentIndex] = useState(0); // State for tracking current carousel position
  const [itemsPerPage, setItemsPerPage] = useState(4); // Number of feedbacks to display at a time

  // Fetch feedbacks from API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get("/appointment/feedbacks/");
        setFeedbacks(response.data);
      } catch (err) {
        toast.error("Feedbacks could not be loaded. 🤷‍♂️");
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);
  useEffect(() => {
    if (newFeedback) {
      setFeedbacks((prevFeedbacks) => [newFeedback, ...prevFeedbacks]);
    }
  }, [newFeedback]); // When newFeedback changes, we update the feedbacks list.

  // Calculate items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;
      // Dynamically adjust the width of each item based on the screen width.
      const itemsVisible = Math.floor(screenWidth / 300); // 300px, the approximate width of each item.
      setItemsPerPage(itemsVisible > 0 ? itemsVisible : 1); // Display at least 1 item.
    };

    updateItemsPerPage(); // Calculate initially.
    window.addEventListener("resize", updateItemsPerPage); // Recalculate if the screen size changes.

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Handlers for navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0
        ? prevIndex - 1
        : Math.ceil(feedbacks.length / itemsPerPage) - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < Math.ceil(feedbacks.length / itemsPerPage)
        ? prevIndex + 1
        : 0
    );
  };

  // Loading or Error State
  if (loading) {
    return <p>Loading feedbacks...</p>;
  }

  // Feedback List Rendering
  return (
    <div className="relative w-full">
      <h1 className="text-center text-lg italic font-bold my-6">
        Reviews from Those Who Trust Us
      </h1>

      {feedbacks.length > 0 ? (
        <>
          <div className="relative flex items-center justify-center mx-6">
            {/* Feedback Container */}
            <div className="overflow-hidden w-full max-w-full">
              <div
                className="flex space-x-2 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / itemsPerPage)
                  }%)`, // Adjusted for correct movement
                  width: `${feedbacks.length * (100 / itemsPerPage)}%`, // Width of all feedbacks to fit into carousel
                }}
              >
                {feedbacks.map((feedback, index) => (
                  <div
                    key={feedback?.id || index}
                    className="p-4 bg-lightBg rounded-lg"
                  >
                    <div className="p-4">
                      <p>{feedback?.comment || "No comment provided"}</p>
                      <p>{feedback.image}</p>
                      {feedback?.image && (
                        <div className="w-1/2 h-1/2">
                          <img
                            src={
                              feedback.image.startsWith("http://")
                                ? feedback.image.replace("http://", "https://")
                                : feedback.image
                            }
                            alt="Feedback"
                            className="w-full h-full rounded-md"
                          />
                        </div>
                      )}
                      <p className="text-end italic">
                        {feedback?.user?.username || "Anonymous"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 my-4">
            {/* Left Arrow Button */}
            <button
              onClick={goToPrevious}
              className="  bg-darkBlue text-white p-2 rounded-full z-10"
            >
              &lt; {/* Left Arrow */}
            </button>
            {/* Right Arrow Button */}
            <button
              onClick={goToNext}
              className=" bg-darkBlue text-white p-2 rounded-full z-10"
            >
              &gt; {/* Right Arrow */}
            </button>
          </div>
        </>
      ) : (
        <p>Be the first to share feedback! 💬🌟</p>
      )}
    </div>
  );
};

export default FeedbackList;
