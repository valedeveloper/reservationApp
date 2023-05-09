import Button from "../Button/Button"
import './Nav.css'
function Nav(){
    return(
        <nav className="navContainer">
            <span className="logoNav">
                lamabooking
            </span>
            <div className="containerButtons">
                <Button title="Register"/>
                <Button title="Login"/>
            </div>
        </nav>
    )
}
export default Nav