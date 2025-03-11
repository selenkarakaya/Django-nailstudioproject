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
    dots: false, // Noktaları devre dışı bırakıyoruz
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,

    // Ok ikonları için prevArrow ve nextArrow ayarları
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
      weekday: "short", // Hafta günü
      year: "numeric", // Yıl
      month: "short", // Ay (kısa formatta)
      day: "numeric", // Gün
      hour: "2-digit", // Saat
      minute: "2-digit", // Dakika
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
          <div key={index} className="full-width-slide flex bg-lightBg mx-auto">
            {user && feedback.user.username == user.username && (
              <button
                className="m-1"
                onClick={() => onDeleteHandler(feedback.id)}
              >
                <MdCancelPresentation />
              </button>
            )}
            <div>
              <p className="text-center">
                {feedback?.comment || "No comment provided"}
              </p>
              <p className="text-end italic mr-3">
                {feedback?.user?.username || "Anonymous"}
              </p>
              <p className="text-end italic mr-3">
                {formatDate(feedback?.created_at)}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
