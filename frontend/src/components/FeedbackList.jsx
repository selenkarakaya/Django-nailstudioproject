// import React, { useEffect, useState } from "react";
// import api from "../api"; // Axios yapılandırmasını içeren dosyayı import edin.

// const FeedbackList = () => {
//   const [feedbacks, setFeedbacks] = useState([]); // Feedback verilerini tutmak için state
//   const [loading, setLoading] = useState(true); // Yüklenme durumunu göstermek için state
//   const [error, setError] = useState(null); // Hata durumunu göstermek için state

//   useEffect(() => {
//     // Feedback verilerini backend'den al
//     const fetchFeedbacks = async () => {
//       try {
//         const response = await api.get("appointment/feedbacks/"); // API endpoint
//         setFeedbacks(response.data); // Feedback verilerini state'e kaydet
//       } catch (err) {
//         console.error("Error fetching feedbacks:", err);
//         setError("Feedbacks could not be loaded."); // Hata mesajını kaydet
//       } finally {
//         setLoading(false); // Yüklenme durumu tamamlandı
//       }
//     };

//     fetchFeedbacks();
//   }, []);

//   if (loading) {
//     return <p>Loading feedbacks...</p>; // Yükleniyor mesajı
//   }

//   if (error) {
//     return <p>{error}</p>; // Hata mesajı
//   }
//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex > 0 ? prevIndex - 1 : feedbacks.length - 1
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex < feedbacks.length - 1 ? prevIndex + 1 : 0
//     );
//   };
//   return (
//     // <div>
//     //   <h1>All Feedbacks</h1>
//     //   {feedbacks.length > 0 ? (
//     //     <ul>
//     //       {feedbacks.map((feedback) => (
//     //         <li key={feedback.id}>
//     //           <p>
//     //             <strong>User:</strong> {feedback.user || "Anonymous"}
//     //           </p>
//     //           <p>
//     //             <strong>Comment:</strong> {feedback.comment}
//     //           </p>

//     //           <p>
//     //             {feedback.image && ( // Eğer görsel varsa göster
//     //               <img
//     //                 src={`${feedback.image}`}
//     //                 alt="Feedback"
//     //                 style={{ width: "200px", height: "auto" }} // Resmi boyutlandırmak için
//     //               />
//     //             )}
//     //           </p>
//     //           <hr />
//     //         </li>
//     //       ))}
//     //     </ul>
//     //   ) : (
//     //     <p>No feedback available.</p> // Eğer feedback yoksa mesaj
//     //   )}
//     // </div>
//     // <div>
//     //   <h1>All Feedbacks</h1>
//     //   {feedbacks.length > 0 ? (
//     //     <div className="flex overflow-x-auto space-x-4 pb-4">
//     //       {/* Horizontal Scrolling Container */}
//     //       {feedbacks.map((feedback) => (
//     //         <div
//     //           key={feedback.id}
//     //           className="flex-none w-64 p-4 bg-white rounded-lg shadow-md flex-shrink-0"
//     //         >
//     //           <p>
//     //             <strong>User:</strong> {feedback.user || "Anonymous"}
//     //           </p>
//     //           <p>
//     //             <strong>Comment:</strong> {feedback.comment}
//     //           </p>
//     //           {feedback.image && ( // Eğer görsel varsa göster
//     //             <img
//     //               src={`${feedback.image}`}
//     //               alt="Feedback"
//     //               style={{ width: "200px", height: "auto" }} // Resmi boyutlandırmak için
//     //             />
//     //           )}
//     //         </div>
//     //       ))}
//     //     </div>
//     //   ) : (
//     //     <p>No feedback available.</p> // Eğer feedback yoksa mesaj
//     //   )}
//     // </div>
//     <div className="relative">
//       <h1>All Feedbacks</h1>

//       {feedbacks.length > 0 ? (
//         <div className="flex items-center space-x-4">
//           {/* Left Arrow Button */}
//           <button
//             onClick={goToPrevious}
//             className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700"
//           >
//             &lt; {/* Left Arrow */}
//           </button>

//           {/* Feedback Display */}
//           <div className="w-64 overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(-${currentIndex * 100}%)`, // Move the current feedback into view
//               }}
//             >
//               {feedbacks.map((feedback, index) => (
//                 <div
//                   key={feedback.id}
//                   className="flex-none w-64 p-4 bg-white rounded-lg shadow-md flex-shrink-0"
//                 >
//                   <p>
//                     <strong>User:</strong> {feedback.user || "Anonymous"}
//                   </p>
//                   <p>
//                     <strong>Comment:</strong> {feedback.comment}
//                   </p>
//                   {feedback.image && (
//                     <div className="mt-2">
//                       <img
//                         src={feedback.image}
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
//             className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700"
//           >
//             &gt; {/* Right Arrow */}
//           </button>
//         </div>
//       ) : (
//         <p>No feedback available.</p> // Eğer feedback yoksa mesaj
//       )}
//     </div>
//   );
// };

// export default FeedbackList;

import React, { useEffect, useState } from "react";
import api from "../api"; // Axios yapılandırmasını içeren dosyayı import edin.

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Feedback verilerini tutmak için state
  const [loading, setLoading] = useState(true); // Yüklenme durumunu göstermek için state
  const [error, setError] = useState(null); // Hata durumunu göstermek için state
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current position of the feedback carousel
  const itemsPerPage = 4; // Number of feedbacks to display at a time

  // Fetch feedbacks from API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get("appointment/feedbacks/");
        setFeedbacks(response.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Feedbacks could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
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
      (prevIndex + 1) * itemsPerPage < feedbacks.length ? prevIndex + 1 : 0
    );
  };

  // Function to handle image URLs
  const getImageUrl = (imagePath) => `http://localhost:8000${imagePath}`;

  // Loading or Error State
  if (loading) {
    return <p>Loading feedbacks...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
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
          <div className="overflow-hidden w-full max-w-4xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${(feedbacks.length / itemsPerPage) * 100}%`,
              }}
            >
              {feedbacks.map((feedback, index) => (
                <div
                  key={feedback?.id || index}
                  className="flex-none w-1/4 p-4 bg-white rounded-lg shadow-md"
                >
                  <p>
                    <strong>User:</strong> {feedback?.user || "Anonymous"}
                  </p>
                  <p>
                    <strong>Comment:</strong>{" "}
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
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default FeedbackList;
