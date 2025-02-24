import React, { useState } from "react";
import api from "../api";
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai"; // React Icons ile X ikonu

const FeedbackForm = ({ onFeedbackSubmit, onClose }) => {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const createFeedback = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post("appointment/feedback/", formData);
      if (response.status === 201) {
        setSuccess(true);
        setComment("");
        setImage(null);
        setTimeout(() => {
          setSuccess(false);
          onFeedbackSubmit(response.data); // Yeni feedback'i üst bileşene gönderiyoruz
          onClose(); // Close modal
        }, 1500);
      }
    } catch (err) {
      console.error("Error submitting feedback:", err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-auto"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        border: "2px solid #5168C4",
        boxShadow: "0px 4px 15px rgba(81, 104, 196, 0.7)",
      }}
    >
      <div className="flex justify-end">
        <button onClick={onClose} className="text-2xl text-gray-600">
          <AiOutlineClose /> {/*close icon */}
        </button>
      </div>

      {success && (
        <p className="text-green-600 text-center mb-4">
          ✅ Feedback submitted successfully!
        </p>
      )}
      {error && <p className="text-red-500 text-center mb-4">❌ {error}</p>}

      <form onSubmit={createFeedback} className="space-y-4">
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Your Feedback:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your feedback here..."
            required
            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload an Image (optional):
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="text-center">
          <Button text="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
