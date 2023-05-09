import './CardCountry.css'
function CardCountry({image,country,description}){ 
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