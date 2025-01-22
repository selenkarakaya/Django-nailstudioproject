// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import api from "../api";

// const FeedbackList = () => {
//   const [feedbacks, setFeedbacks] = useState([]); // State for storing feedback data
//   const [loading, setLoading] = useState(true); // State for indicating loading status

//   // Fetch feedbacks from API
//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const response = await api.get("appointment/feedbacks/");
//         setFeedbacks(response.data);
//       } catch (err) {
//         toast.error("Feedbacks could not be loaded. 🤷‍♂️");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeedbacks();
//   }, []);

//   // Loading or Error State
//   if (loading) {
//     return <p>Loading feedbacks...</p>;
//   }

//   // Feedback List Rendering
//   return (
//     <div className="relative w-full">
//       <h1 className="text-center text-2xl font-bold mb-6">All Feedbacks</h1>

//       {feedbacks.length > 0 ? (
//         <div className="overflow-x-auto w-full">
//           {" "}
//           {/* Horizontal scroll container */}
//           <div className="flex w-full">
//             {feedbacks.map((feedback, index) => (
//               <div
//                 key={feedback?.id || index}
//                 className="flex-none w-[calc(100%/4)] p-4 bg-white rounded-lg shadow-md mr-4"
//               >
//                 <p>
//                   <strong>User:</strong>
//                   {feedback?.user?.username || "Anonymous"}
//                 </p>
//                 <p>
//                   <strong>Comment:</strong>
//                   {feedback?.comment || "No comment provided"}
//                 </p>
//                 {feedback?.image && (
//                   <div className="mt-2">
//                     <img
//                       src={`${feedback.image}`}
//                       alt="Feedback"
//                       className="w-full h-auto rounded-md"
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p>Be the first to share feedback! 💬🌟</p>
//       )}
//     </div>
//   );
// };

// export default FeedbackList;

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
      <h1 className="text-center text-2xl font-bold mb-6">All Feedbacks</h1>

      {feedbacks.length > 0 ? (
        <div className="relative flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 z-10"
          >
            &lt; {/* Left Arrow */}
          </button>

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

          {/* Right Arrow Button */}
          <button
            onClick={goToNext}
            className="absolute right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 z-10"
          >
            &gt; {/* Right Arrow */}
          </button>
        </div>
      ) : (
        <p>Be the first to share feedback! 💬🌟</p>
      )}
    </div>
  );
};

export default FeedbackList;

// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import api from "../api";

// const FeedbackList = () => {
//   const [feedbacks, setFeedbacks] = useState([]); //State for storing feedback data.
//   const [loading, setLoading] = useState(true); //tate for indicating the loading status.
//   const [currentIndex, setCurrentIndex] = useState(0); // State to track the current position of the feedback carousel
//   const itemsPerPage = 4; // Number of feedbacks to display at a time

//   // Fetch feedbacks from API
//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const response = await api.get("appointment/feedbacks/");
//         setFeedbacks(response.data);
//       } catch (err) {
//         toast.error(`Feedbacks could not be loaded. 🤷‍♂️`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeedbacks();
//   }, []);

//   // Handlers for navigation
//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex > 0
//         ? prevIndex - 1
//         : Math.ceil(feedbacks.length / itemsPerPage) - 1
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) =>
//       (prevIndex + 1) * itemsPerPage < feedbacks.length ? prevIndex + 1 : 0
//     );
//   };

//   // Loading or Error State
//   if (loading) {
//     return <p>Loading feedbacks...</p>;
//   }

//   // Feedback List Rendering
//   return (
//     <div className="relative w-full">
//       <h1 className="text-center text-2xl font-bold mb-6">All Feedbacks</h1>

//       {feedbacks.length > 0 ? (
//         <div className="relative flex items-center justify-center">
//           {/* Left Arrow Button */}
//           <button
//             onClick={goToPrevious}
//             className="absolute left-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 z-10"
//           >
//             &lt; {/* Left Arrow */}
//           </button>
//           {/* Feedback Container */}
//           <div className="overflow-hidden w-full max-w-4xl">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(-${currentIndex * 100}%)`,
//                 width: `${(feedbacks.length / itemsPerPage) * 100}%`,
//               }}
//             >
//               {feedbacks.map((feedback, index) => (
//                 <div
//                   key={feedback?.id || index}
//                   className="flex-none w-1/4 p-4 bg-white rounded-lg shadow-md"
//                 >
//                   <p>
//                     <strong>User:</strong>
//                     {feedback?.user?.username || "Anonymous"}
//                   </p>
//                   <p>
//                     <strong>Comment:</strong>
//                     {feedback?.comment || "No comment provided"}
//                   </p>
//                   {feedback?.image && (
//                     <div className="mt-2">
//                       <img
//                         src={`${feedback.image}`}
//                         alt="Feedback"
//                         className="w-full h-auto rounded-md"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Right Arrow Button */}
//           <button
//             onClick={goToNext}
//             className="absolute right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 z-10"
//           >
//             &gt; {/* Right Arrow */}
//           </button>
//         </div>
//       ) : (
//         <p>Be the first to share feedback! 💬🌟</p>
//       )}
//     </div>
//   );
// };

// export default FeedbackList;
