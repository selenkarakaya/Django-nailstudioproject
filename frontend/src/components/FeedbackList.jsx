import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]); // State for storing feedback data
  const [loading, setLoading] = useState(true); // State for indicating loading status
  const [currentIndex, setCurrentIndex] = useState(0); // State for tracking current carousel position
  const [itemsPerPage, setItemsPerPage] = useState(4); // Number of feedbacks to display at a time

  // Fetch feedbacks from API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get("appointment/feedbacks/");
        setFeedbacks(response.data);
      } catch (err) {
        toast.error("Feedbacks could not be loaded. 🤷‍♂️");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Calculate items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;
      // Ekranın genişliğine göre her öğenin genişliğini dinamik olarak ayarla
      const itemsVisible = Math.floor(screenWidth / 300); // 300px, her bir öğenin yaklaşık genişliği
      setItemsPerPage(itemsVisible > 0 ? itemsVisible : 1); // Minimum 1 öğe göster
    };

    updateItemsPerPage(); // İlk başta hesapla
    window.addEventListener("resize", updateItemsPerPage); // Ekran boyutu değişirse tekrar hesapla

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
      <h1 className="text-center text-xl font-bold mb-6">
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
                  <div key={feedback?.id || index} className="bg-gray-700">
                    <div className="p-4 bg-red-800 rounded-lg shadow-md">
                      <p>
                        <strong>User:</strong>
                        {feedback?.user?.username || "Anonymous"}
                      </p>
                      <p>
                        <strong>Comment:</strong>
                        {feedback?.comment || "No comment provided"}
                      </p>
                      {feedback?.image && (
                        <div className="mt-2">
                          <img
                            src={`${feedback.image}`}
                            alt="Feedback"
                            className="w-full h-auto rounded-md"
                          />
                        </div>
                      )}
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
              className="  bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 z-10"
            >
              &lt; {/* Left Arrow */}
            </button>
            {/* Right Arrow Button */}
            <button
              onClick={goToNext}
              className=" bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 z-10"
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
