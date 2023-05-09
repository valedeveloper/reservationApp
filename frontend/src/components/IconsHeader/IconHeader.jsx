import { FaBed } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";
import { AiFillCar } from "react-icons/ai";
import { BsFillTaxiFrontFill } from "react-icons/bs";
import './IconHeader.css'
function IconHeader() {
  return (
    <ul className="containerIcons">
      <li className="itemIcons active">
        <FaBed fontSize={"20px"} />
        <span className="titleItem">Stays</span>
      </li>
      <li className="itemIcons">
        <IoIosAirplane fontSize={"20px"} />
        <span className="titleItem">Flights</span>
      </li>
      <li className="itemIcons">
        <AiFillCar fontSize={"20px"} />
        <span className="titleItem">Car rentals</span>
      </li>
      <li className="itemIcons">
        <FaBed fontSize={"20px"} />
        <span className="titleItem">Attractions</span>
      </li>
      <li className="itemIcons">
        <BsFillTaxiFrontFill fontSize={"20px"} />
        <span className="titleItem">AirportTaxis</span>
      </li>
    </ul>
  );
}
export default IconHeader
