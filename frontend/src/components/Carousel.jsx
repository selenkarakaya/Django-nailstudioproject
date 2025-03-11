// //Carousel.jsx

// import React from "react";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Carousel = ({ feedbacks }) => {
//   const chunkedFeedbacks = [];
//   for (let i = 0; i < feedbacks.length; i += 4) {
//     chunkedFeedbacks.push(feedbacks.slice(i, i + 4));
//   }
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
//           {" "}
//           {dots}{" "}
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
//     <>
//       <div className="full-width-carousel">
//         <Slider {...settings}>
//           {chunkedFeedbacks.map((chunk, index) => (
//             <div
//               key={index}
//               className="full-width-slide flex justify-between space-x-4"
//             >
//               {chunk.map((feedback, idx) => (
//                 <div
//                   key={idx}
//                   className="w-full p-4 text-center bg-gray-100 rounded-lg"
//                 >
//                   <p>{feedback}</p>
//                 </div>
//               ))}
//             </div>
//           ))}
//           {/* <div className="full-width-slide">
//             <h1>selen</h1>
//             <h1>selen</h1>
//             <h1>selen</h1>
//             <h1>selen</h1>
//           </div>
//           <div className="full-width-slide">
//             <h1>selen</h1>
//             <h1>selen</h1>
//             <h1>selen</h1>
//             <h1>selen</h1>
//           </div>
//           <div className="full-width-slide">
//             <h1>selen</h1>
//             <h1>selen</h1>
//             <h1>selen</h1>
//             <h1>selen</h1>
//           </div> */}
//         </Slider>
//       </div>
//     </>
//   );
// };

// export default Carousel;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { MdCancelPresentation } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../api";

const Carousel = ({ feedbacks, onDelete }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots custom-dots",

    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "0px", padding: "0px" }}>{dots}</ul>
      </div>
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
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
  const { user } = useContext(UserContext);
  const chunks = [];
  for (let i = 0; i < feedbacks.length; i += 4) {
    chunks.push(feedbacks.slice(i, i + 4));
  }

  const onDeleteHandler = (id) => {
    console.log(id);
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
    <>
      <div className="full-width-carousel">
        <Slider {...settings}>
          {chunks.map((chunk, index) => (
            <div
              key={index}
              className="full-width-slide-group space-x-4 bg-darkBlue"
            >
              {chunk.map((feedback, idx) => (
                <div
                  className="full-width-slide  bg-lightBg rounded-lg"
                  key={idx}
                >
                  {feedback.user.username == user.username && (
                    <button onClick={() => onDeleteHandler(feedback.id)}>
                      <MdCancelPresentation />
                    </button>
                  )}
                  <h3>{feedback.user.username}</h3>{" "}
                  {/* Kullanıcı adını göster */}
                  <p>{feedback.comment}</p> {/* Yorum metnini göster */}
                  <small>{feedback.created_at}</small>{" "}
                  {/* Yorumun oluşturulma tarihini göster */}
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;
