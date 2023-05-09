import Button from "../Button/Button"
import './Suscribe.css'
function Suscribe(){ 
    return(
        <section className="suscribeSection">
            <h1>Save time, save money!</h1>
            <p>Sign up and we´ll send the best deals to you</p>

            <form className="formSuscribe">
                <input placeholder="Your email" type="text"/>
                <Button title="Suscribe" isDescription/>
            </form>
        </section>
    )
}
export default Suscribe