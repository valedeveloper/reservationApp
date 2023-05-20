import Button from "../Button/Button";
import { Link } from "react-router-dom";

import "./Nav.css";
function Nav() {
  return (
    <nav className="navContainer">
      <Link to="/">
        <span className="logoNav">lamabooking</span>
      </Link>
      <div className="containerButtons">
        <Button title="Register" />
        <Link to="/login"><Button title="Login" /></Link>
      </div>
    </nav>
  );
}
export default Nav;
