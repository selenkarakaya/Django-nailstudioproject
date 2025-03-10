import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import Feedback from "./Feedback";

const FeedbackList = ({ newFeedback }) => {
  const [feedbacks, setFeedbacks] = useState([]); // State for storing feedback data
  const [loading, setLoading] = useState(true); // State for indicating loading status
  const [currentIndex, setCurrentIndex] = useState(0); // State for tracking current carousel position
  const [itemsPerPage, setItemsPerPage] = useState(4); // Number of feedbacks to display at a time

  // Fetch feedbacks from API
  useEffect(() => {
    fetchFeedbacks();
  }, []);

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

  const onDelete = (id) => {
    api
      .delete(`/appointment/feedback/delete/${id}/`)
      .then((res) => {
        if (res.status === 204)
          toast.success(
            `Uh-oh! Your appointment was canceled, but we’ll make sure to reschedule it at your convenience! 😔`
          );

        fetchFeedbacks();
      })
      .catch((err) =>
        toast.error(
          `Oops! Looks like we hit a snag while canceling. Try once more! 🤞`
        )
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
                {feedbacks.map((feedback) => (
                  <Feedback
                    key={feedback.id}
                    feedback={feedback}
                    onDelete={onDelete}
                  />
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
