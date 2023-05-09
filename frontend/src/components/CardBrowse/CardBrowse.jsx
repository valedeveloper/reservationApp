import './CardBrowse.css'
function CardBrowse({image,title,description}){
    return(
       <div className="cardBrowse">
        <img src={image} alt="This is a hotel"/>
        <h1>{title}</h1>
        <span>{description}</span>
       </div>
    )


}
export default CardBrowse