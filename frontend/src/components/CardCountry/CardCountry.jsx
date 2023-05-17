import { useData } from '../../hooks/useData'
import './CardCountry.css'
function CardCountry({image,country,description}){ 
    const { data} =useData("http://localhost:8800/api/hotel")
    console.log(data)
    return(
        <div className="cardCountry">
            <img src={image} alt={`This is ${country}`}/>
            <div className="descriptionCardCountry">
                <h1>{country}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}
export default CardCountry