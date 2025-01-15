import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// NOTE: here navigate the user in the history stack for a true 'back' button

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center bg-darkBlue border-2 border-darkBlue w-1/6  mx-1 py-2 space-x-2 rounded-lg text-center text-white hover:bg-transparent  hover:text-darkBlue transition duration-1000 delay-150">
      <FaArrowCircleLeft />
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default BackButton;
