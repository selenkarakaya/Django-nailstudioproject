import selena from "../assets/image/aboutSelena.png";
import sophia from "../assets/image/aboutSophia.png";
import jess from "../assets/image/aboutJess.png";

const About = () => {
  const experts = [
    {
      name: "Selena Smith",
      role: "Nail Art Specialist",
      description:
        "With over 5 years of experience, Emma Smith is a master of intricate and creative nail art. She has a true passion for transforming nails into pieces of art, whether it's for special occasions or everyday wear. Emma's meticulous attention to detail and her artistic flair ensure that every design is unique and flawless. From minimalistic styles to bold, colorful designs, she can bring any vision to life, leaving clients with stunning, personalized nail art.",
      image: selena,
    },
    {
      name: "Sophia Lee",
      role: "Manicure & Pedicure Expert",
      description:
        "Sophia Lee is a professional nail technician specializing in manicures and pedicures that leave your nails looking perfectly polished and healthy. She focuses on providing a relaxing experience with every treatment, from classic nail care to more advanced services. Sophia's expertise ensures that every client walks out with nails that are not only beautiful but also strong and well-maintained. She takes great pride in offering a comfortable and enjoyable experience that will have you returning time and time again.",
      image: sophia,
    },
    {
      name: "Jess Taylor",
      role: "Senior Beauty Therapist",
      description:
        "As a senior beauty therapist, Jess Taylor brings a wealth of knowledge and expertise in nail care. Specializing in soothing massages and high-quality pedicure treatments, Jess's services are designed to promote relaxation and rejuvenation. She focuses on providing a luxurious, spa-like experience while ensuring that every treatment is performed with precision. Whether you're seeking a calming hand massage or a detailed pedicure, Jess delivers exceptional service that leaves clients feeling refreshed and pampered.",
      image: jess,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-r from-lightBlue to-darkBlue">
      {/* Section Title */}
      <h1 className="text-4xl font-semibold text-center text-white mb-8">
        Welcome to Selena Nail Studio
      </h1>
      <p className="text-xl text-center text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto">
        At Selena Nail Studio, we are dedicated to providing you with
        exceptional nail care services in a welcoming and relaxing environment.
        Whether you're looking for a classic manicure, trendy nail art, or a
        luxurious pedicure, our team of experts is here to make your nail care
        experience truly special. Our services are tailored to meet your
        personal preferences and style, ensuring that each visit leaves you
        feeling pampered and confident.
      </p>

      {/* Meet Our Experts */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-white">Meet Our Experts</h2>
      </div>

      {/* Expert Cards */}
      <div className="space-y-16 sm:space-y-8 md:space-y-16 w-full lg:w-3/4 mx-auto">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-500 transform hover:scale-105 sm:flex-col sm:space-y-6 sm:text-center md:flex-col md:space-y-6 md:text-center"
          >
            {/* Image Section */}
            <div className="flex-shrink-0 w-48 h-48 p-4 mx-auto sm:w-36 sm:h-36">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-full rounded-full object-cover shadow-lg"
              />
            </div>

            {/* Text Section */}
            <div className="flex-1 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {expert.name}
              </h3>
              <p className="text-center text-gray-600 mb-2">{expert.role}</p>
              <p className="text-gray-500 text-sm">{expert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
