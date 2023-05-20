import { listCountries } from "../../data/Coutries";
import { useData } from "../../hooks/useData";

import "./CardCountry.css";

function CardsCountries() {
  const { data, loading } = useData(
    "hotel/countByCity?cities=Dublin,Colombia,Islandia"
  );
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <>
          {listCountries.map((country, i) => (
            <div className="cardCountry" key={country.id}>
              <img src={country.image} alt={`This is ${country.id}`} />
              <div className="descriptionCardCountry">
                <h1>{country.county}</h1>
                <p>{`${data?.list[i]} properties`}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
export default CardsCountries;
