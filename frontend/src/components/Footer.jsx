import Logo from "../assets/image/logo.png";

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer>
      <div className="bg-lightBg flex flex-col sm:flex-row justify-around items-center mt-10 py-4 text-darkBlue">
        <img src={Logo} alt="logo" className="w-24 h-24 sm:w-36 sm:h-36" />
        <p className="text-center sm:text-left text-sm sm:text-base">
          Copyright &copy; {footerYear} All rights reserved
        </p>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <i className="fab fa-facebook fa-xl sm:fa-2xl hover:scale-110 text-darkBlue"></i>
          <i className="fab fa-instagram fa-xl sm:fa-2xl hover:scale-110 text-darkBlue"></i>
          <i className="fab fa-twitter fa-xl sm:fa-2xl hover:scale-110 text-darkBlue"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
