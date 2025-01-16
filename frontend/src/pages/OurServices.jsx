import { Link } from "react-router-dom";
import Extension from "../assets/image/extension.png";
import Gel from "../assets/image/gel.png";
import Natural from "../assets/image/natural.png";
import Manicure from "../assets/image/manicure.png";
import Remove from "../assets/image/remove.png";
import Repair from "../assets/image/repair.png";
import Pedicure from "../assets/image/pedi.png";
import Spa from "../assets/image/spa.png";
import Button from "../components/Button";

function OurServices() {
  return (
    <div>
      <div className="mx-12 booknow h-[35rem] md:h-35rem] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-end">
        <div className="mx-2 text-right">
          <p>Nail appointments in Selene Nail Studio London only!</p>
          <p>We make your nails with love!</p>
        </div>
      </div>

      <section id="ourServices">
        <div className="flex flex-col my-4">
          <div>
            <h1 className="text-center text-3xl">Discover Your</h1>
            <h1 className="text-center text-3xl border-b border-darkBlue">
              Unique Style
            </h1>
            <h3 className=" text-center">Our Services!</h3>
            <p className="text-center font-imbue">Make Your Nails Shine</p>
          </div>
          <div className="flex flex-col md:flex-row space-x-2 md:space-y-1 space-y-4 mx-16 my-3">
            <div className="md:w-1/3 hover:scale-105 flex flex-col items-center">
              <img
                className="object-cover h-68 w-60"
                src={Extension}
                alt="extension"
              />
              <h1 className="text-center mt-2 font-bold">
                Gel nail extensions full set
              </h1>
              <p className="text-center">2 hrs | £60</p>
            </div>
            <div className="md:w-1/3 hover:scale-105 flex flex-col items-center">
              <img className="object-cover h-68 w-60" src={Gel} alt="Gel" />
              <h1 className="mt-2 font-bold">Gel Infills</h1>
              <p className="">1 hr | £47</p>
            </div>
            <div className="md:w-1/3 hover:scale-105 flex flex-col items-center">
              <img
                className="object-cover h-68 w-60"
                src={Natural}
                alt="Natural"
              />
              <h1 className="mt-2 font-bold">Gel overlay on natural nails</h1>
              <p className="">1 hr 30 mins | £45</p>
            </div>
            <div className="md:w-1/3 hover:scale-105 flex flex-col items-center">
              <img
                className="object-cover h-68 w-60"
                src={Manicure}
                alt="manicure"
              />
              <h1 className="mt-2 font-bold">Manicure with gel polish</h1>
              <p className="">1 hr | £38</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-x-2 md:space-y-1 space-y-4 mx-16 my-3">
            <div className="md:w-1/3 hover:scale-105 flex flex-col items-center">
              <img className="object-cover h-68 w-60" src={Spa} alt="spa" />
              <h1 className="mt-2 font-bold">Spa pedicure with gel polish</h1>
              <p className="">2 hrs | £55</p>
            </div>
            <div className="md:w-1/3 hover:scale-105 flex flex-col items-center">
              <img
                className="object-cover h-68 w-60"
                src={Pedicure}
                alt="pedicure"
              />
              <h1 className="mt-2 font-bold">Pedicure with gel polish</h1>
              <p className="">1 hr | £37</p>
            </div>
            <div className="md:w-1/3 hover:scale-105 flex flex-col items-center">
              <img
                className="object-cover h-68 w-60"
                src={Repair}
                alt="repair"
              />
              <h1 className="mt-2 font-bold">Nail Extension Repair</h1>
              <p className="text-center">30 mins | £10</p>
            </div>
            <div className="md:w-1/3 hover:scale-105 flex flex-col items-center">
              <img
                className="object-cover h-68 w-60"
                src={Remove}
                alt="remove"
              />
              <h1 className="mt-2 font-bold">
                Removal of gel polish/builder gel
              </h1>
              <p className="text-center">30 mins | £10</p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center">
        <button>
          <Link
            to="/appointment-form"
            className="bg-darkBlue hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white mt-4"
          >
            Book your appointments here! 💅🏻
          </Link>
        </button>
      </div>
    </div>
  );
}

export default OurServices;
