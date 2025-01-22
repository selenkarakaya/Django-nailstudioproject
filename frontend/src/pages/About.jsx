const About = () => {
  const experts = [
    {
      name: "Emma Smith",
      role: "Nail Art Specialist",
      description:
        "With over 5 years of experience, Emma Smith is a master of intricate and creative nail art. She has a true passion for transforming nails into pieces of art, whether it's for special occasions or everyday wear. Emma's meticulous attention to detail and her artistic flair ensure that every design is unique and flawless. From minimalistic styles to bold, colorful designs, she can bring any vision to life, leaving clients with stunning, personalized nail art.",
      image: "https://via.placeholder.com/150", // Gerekli resmi buraya ekleyebilirsiniz
    },
    {
      name: "Sophia Lee",
      role: "Manicure & Pedicure Expert",
      description:
        "Sophia Lee is a professional nail technician specializing in manicures and pedicures that leave your nails looking perfectly polished and healthy. She focuses on providing a relaxing experience with every treatment, from classic nail care to more advanced services. Sophia's expertise ensures that every client walks out with nails that are not only beautiful but also strong and well-maintained. She takes great pride in offering a comfortable and enjoyable experience that will have you returning time and time again.",
      image: "https://via.placeholder.com/150", // Gerekli resmi buraya ekleyebilirsiniz
    },
    {
      name: "Jess Taylor",
      role: "Senior Beauty Therapist",
      description:
        "As a senior beauty therapist, Jess Taylor brings a wealth of knowledge and expertise in nail care. Specializing in soothing massages and high-quality pedicure treatments, Jess's services are designed to promote relaxation and rejuvenation. She focuses on providing a luxurious, spa-like experience while ensuring that every treatment is performed with precision. Whether you're seeking a calming hand massage or a detailed pedicure, Jess delivers exceptional service that leaves clients feeling refreshed and pampered.",
      image: "https://via.placeholder.com/150", // Gerekli resmi buraya ekleyebilirsiniz
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Welcome to Selena Nail Studio
      </h1>
      <p className="text-xl text-center text-gray-600 mb-8">
        At Selena Nail Studio, we are dedicated to providing you with
        exceptional nail care services in a welcoming and relaxing environment.
        Whether you're looking for a classic manicure, trendy nail art, or a
        luxurious pedicure, our team of experts is here to make your nail care
        experience truly special. Our services are tailored to meet your
        personal preferences and style, ensuring that each visit leaves you
        feeling pampered and confident.
      </p>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">
          Meet Our Experts
        </h2>
      </div>

      <div className="space-y-16 w-3/4 mx-auto">
        {experts.map((expert, index) => (
          <div
            key={index}
            className={`flex items-center justify-between ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } space-x-8`}
          >
            <div className="flex-shrink-0 w-48 h-48">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">
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
