import Logo from "../assets/image/logo.png";

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer>
      <div className="bg-oranges flex justify-around items-center mt-10 h-18 text-darkBlue">
        <img src={Logo} alt="logo" className="w-36 h-36" />
        <p>Copyright &copy; {footerYear} All rights reserved</p>
        <div className="space-x-2">
          <i className="fab fa-facebook fa-2xl hover:scale-125 text-darkBlue"></i>
          <i className="fab fa-instagram fa-2xl hover:scale-125 text-darkBlue"></i>
          <i className="fab fa-twitter fa-2xl hover:scale-125 text-darkBlue"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
