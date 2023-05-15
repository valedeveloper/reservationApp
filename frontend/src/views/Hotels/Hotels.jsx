import Suscribe from "../../components/Suscribe/Suscribe";
import { MdLocationPin } from "react-icons/md";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "../../components/Button/Button";
import "./Hotels.css";
import { useState } from "react";
import {photos} from "../../data/Photos"


const ACTION_SLIDER = {
  increase: "i",
  decrement: "d",
};
function Hotels() {
  const [isSlider, setIsSlider] = useState(false);
  const [numberSlider, setNumberSlider] = useState(null);
  console.log(numberSlider);
  const handledSlider = (index) => {
    setNumberSlider(index);
    setIsSlider(true);
  };
  const handledClose = () => {
    setIsSlider(false);
  };
  const handledNext = (action) => {
    let newNumberSlider;
    if (action === ACTION_SLIDER.increase) {
       newNumberSlider = numberSlider === 5 ? 0 : numberSlider + 1; //Es buena pràctica crear una variable y manejar asì los estados. Cuando los estados estàn dentro de condicionales, es mejor crear variable
    }
    if (action === ACTION_SLIDER.decrement) {
       newNumberSlider = numberSlider === 0 ? 5 : numberSlider - 1;
    }
    setNumberSlider(newNumberSlider); //Dependiendo de cuàl haya sido, se pasa la variable para setear el estado
  };

  return (
    <>
      <section className="sectionHotel">
        <div className="topContainer">
          <div className="locationHotel">
            <h1>Tower Streer Apartaments</h1>

            <span className="location">
              <MdLocationPin /> Alaska, Old Town, 33-332 Poland
            </span>
            <span className="opinionHotel">
              Excellent Location - 500m from center
            </span>
            <span className="comment">
              Book a stay over $514 at this property and get a free airport taxi
            </span>
          </div>
          <Button isDescription title="Reserve ot Book Now!" />
        </div>
        <div className="hotelImages">
          {photos.map((photo, i) => (
            <div
              className="hotelImgWrapper"
              key={i}
              onClick={() => handledSlider(i)} //No es necesario ("poner paràmetro")=> solo se hace en la funciòn
            >
              <img src={photo.src} alt="" className="hotelImg" />
            </div>
          ))}
        </div>
        {isSlider && (
          <div className="sliderContainer">
            <AiFillCloseCircle className="iconSlider" onClick={handledClose} />
            <div className="sliderWrap">
              <BsFillArrowLeftCircleFill
                className="iconSlider"
                onClick={() => handledNext(ACTION_SLIDER.decrement)}
              />
              <div className="containerImagesSlider">
                <img
                  src={photos[numberSlider].src} //El index me trae la posiciòn del objeto, pero para llegar al objeto se necesita desestructurar
                  alt={`This is the img ${numberSlider}`}
                />
              </div>
              <BsFillArrowRightCircleFill
                className="iconSlider"
                onClick={() => handledNext(ACTION_SLIDER.increase)}
              />
            </div>
          </div>
        )}

        <div className="descriptionHotel">
          <div className="leftContainer">
            <h1>Stay in the heart ok Krakow</h1>
            <p>
              Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
              Street Apartments has accommodations with air conditioning and
              free WiFi. The units come with hardwood floors and feature a fully
              equipped kitchenette with a microwave, a flat-screen TV, and a
              private bathroom with shower and a hairdryer. A fridge is also
              offered, as well as an electric tea pot and a coffee machine.
              Popular points of interest near the apartment include Cloth Hall,
              Main Market Square and Town Hall Tower. The nearest airport is
              John Paul II International Kraków–Balice, 16.1 km from Tower
              Street Apartments, and the property offers a paid airport shuttle
              service.
            </p>
          </div>
          <div className="rightContainer">
            <h3>Perfect for a 9-night-stay</h3>
            <p>
              Located in the real heart of Krakow, this property has an
              excellent location score of 9.8!
            </p>
            <span>
              <strong>$945</strong> (9 nights)
            </span>
            <Button isDescription title="Reserve ot Book Now!" />
          </div>
        </div>
      </section>
      <Suscribe />
    </>
  );
}
export default Hotels;
