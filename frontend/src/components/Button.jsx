const Button = ({ text, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-darkBlue border-2 border-darkBlue w-1/3 p-4 rounded-lg text-center text-white hover:bg-transparent hover:text-darkBlue transition duration-1000 delay-150 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
