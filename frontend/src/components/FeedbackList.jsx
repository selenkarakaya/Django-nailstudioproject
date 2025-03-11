import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import Feedback from "./Feedback";
import Carousel from "./Carousel";

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
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setFeedbacks(response.data);
      } else {
        throw new Error("Invalid feedback data format");
      }
    } catch (err) {
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
  // Function to delete feedback from the list
  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id)); // Remove the deleted feedback from the list
  };
  // Calculate items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;
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
      <Carousel feedbacks={feedbacks} onDelete={handleDelete} />

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
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 my-4">
            {/* Left Arrow Button */}
            <button
              onClick={goToPrevious}
              className="  bg-green text-white p-2 rounded-full z-10"
            >
              &lt; {/* Left Arrow */}
            </button>
            {/* Right Arrow Button */}
            <button
              onClick={goToNext}
              className=" bg-green text-white p-2 rounded-full z-10"
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
