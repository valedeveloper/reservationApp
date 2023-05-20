import { listHomes } from "../../data/Homes";
import { useData } from "../../hooks/useData";
import "./CardHome.css";
function CardsHome() {
  const { data, loading } = useData("hotel");
  console.log(data);
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item,i) => (
            <div className="cardHome" key={item._id}>
              <img src={listHomes[i].image} alt="This is a hotel" />
              <h1 className="titleCardHome">{item.name}</h1>
              <span className="countrySpan">{item.country}</span>
              <h1 className="price">{`Starting from $${item.cheapestPrice}`}</h1>
              <div className="opinions">
                <span className="rating">{item.rating}</span>
                <span>{item.desc}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
export default CardsHome;
