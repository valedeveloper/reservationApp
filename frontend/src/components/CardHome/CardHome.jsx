import './CardHome.css'
function CardHome({image,title,country,price,rating,opinion}){
    return(
       <div className="cardHome">
        <img src={image} alt="This is a hotel"/>
        <h1 className="titleCardHome">{title}</h1>
        <span className="countrySpan">{country}</span>
        <h1 className="price">{`Starting from $${price}`}</h1>
        <div className="opinions">
            <span className="rating">{rating}</span>
            <span>{opinion}</span>
        </div>
       </div>
    )


}
export default CardHome