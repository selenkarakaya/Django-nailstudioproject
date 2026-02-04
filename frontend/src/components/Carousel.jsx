// import React from "react";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Carousel = ({ feedbacks }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,

//     appendDots: (dots) => (
//       <div>
//         <ul
//           style={{
//             margin: "0px",
//             padding: "0px",
//           }}
//         >
//           {dots}
//         </ul>
//       </div>
//     ),

//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="full-width-carousel">
//       <Slider {...settings}>
//         {/* Map through feedbacks and render each feedback */}
//         {feedbacks.map((feedback, index) => (
//           <div key={index} className="full-width-slide bg-lightBg">
//             {/* Assuming feedback is an object with a 'text' or 'message' field */}
//             <p>{feedback?.comment || "No comment provided"}</p>
//             <p className="text-end italic">
//               {feedback?.user?.username || "Anonymous"}
//             </p>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Carousel;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // React Icons'dan ok ikonları
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { MdCancelPresentation } from "react-icons/md";
import api from "../api";
import { toast } from "react-toastify";

const Carousel = ({ feedbacks, onDelete }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,

    prevArrow: (
      <div className="slick-prev">
        <FaChevronLeft size={30} style={{ color: "black" }} />
      </div>
    ),
    nextArrow: (
      <div className="slick-next">
        <FaChevronRight size={30} style={{ color: "black" }} />
      </div>
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const { user } = useContext(UserContext);
  const onDeleteHandler = (id) => {
    api
      .delete(`/appointment/feedback/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          toast.success(`Uh-oh! Your feedback was deleted 😔`);
          onDelete(id);
        }
      })
      .catch((err) => toast.error(`Oops! Something went wrong.`));
  };

  return (
    <div className="">
      <Slider {...settings}>
        {feedbacks.map((feedback, index) => (
          <div
            key={index}
            className="full-width-slide bg-lightBg mx-auto p-6 rounded-lg shadow-sm"
          >
            {user && feedback.user.username == user.username && (
              <button
                className="m-1"
                onClick={() => onDeleteHandler(feedback.id)}
              >
                <MdCancelPresentation />
              </button>
            )}
            <div className="flex gap-4 items-start">
              {feedback.image_url && (
                <img
                  src={feedback.image_url}
                  alt="feedback"
                  className="w-32 h-32 object-cover rounded-lg shadow-md flex-shrink-0"
                  loading="lazy"
                />
              )}
              <div className="flex flex-col gap-2 min-w-0">
                <p className="break-words">
                  {feedback?.comment || "No comment provided"}
                </p>

                <p className="italic text-sm self-end">
                  {feedback?.user?.username || "Anonymous"}
                </p>

                <p className="italic text-sm self-end">
                  {formatDate(feedback?.created_at)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
