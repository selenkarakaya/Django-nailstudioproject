import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import Carousel from "./Carousel";
import Spinner from "./Spinner";

const FeedbackList = ({ newFeedback }) => {
  const [feedbacks, setFeedbacks] = useState([]); // State for storing feedback data
  const [loading, setLoading] = useState(true); // State for indicating loading status

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

  // Loading or Error State
  if (loading) {
    return <Spinner />;
  }

  // Feedback List Rendering
  return (
    <div className="relative w-full">
      <h1 className="text-center text-lg italic font-bold my-6">
        Reviews from Those Who Trust Us
      </h1>

      {feedbacks.length > 0 ? (
        <Carousel feedbacks={feedbacks} onDelete={handleDelete} />
      ) : (
        <p>Be the first to share feedback! 💬🌟</p>
      )}
    </div>
  );
};

export default FeedbackList;
