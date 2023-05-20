import { useState } from "react";
import Button from "../../components/Button/Button";
import CardResult from "../../components/CardResults/CardResult";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import { useData } from "../../hooks/useData";
import "./Results.css";
import { format } from "date-fns";
function Results() {
  const location = useLocation(); //Del location vienen los estados que se le hayan pasado a este route
  const [destination,setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options] = useState(location.state.countOptions);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const [isDate, setIsDate] = useState(false);
  const { data, loading, error, fetchData } = useData(
    `hotel/find?city=${destination}`
  );

  const handledSubmit = async (e) => {
    e.preventDefault();
    fetchData();
  };
  const handledOptionDate = () => {
    setIsDate(!isDate);
  };
  return (
    <section className="sectionResults">
      <div className="resultsWrap">
        <div className="containerForm">
          <h1>Search</h1>
          <form className="formSearchResult" onSubmit={handledSubmit}>
            <label id="country">Destino</label>
            <input id="country" placeholder={destination}  onChange={(e)=>setDestination(e.target.value)}/>
            <label id="date">Ckeck in Date</label>
            <span className="spanDate" onClick={handledOptionDate}>
              {`${format(date[0].startDate, "MM/dd/yyyy") ?? "Inicio"} to ${
                format(date[0].endDate, "MM/dd/yyyy") ?? "Fin"
              }`}
            </span>
            {isDate && (
              <DateRange
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                onChange={(item) => setDate([item.selection])}
              />
            )}
            <label>Options</label>
            <div className="optionItem">
              <span>Min price</span>
              <input placeholder="min" name="min" type="number"  onChange={(e)=>setMin(e.target.value)}/>
            </div>
            <div className="optionItem">
              <span>Max price</span>
              <input placeholder="max" name="max"  type="number"  onChange={(e)=>setMax(e.target.value)}/>
            </div>
            <div className="optionItem">
              <span>Adult</span>
              <input placeholder={options.adult} name="adult" />
            </div>
            <div className="optionItem">
              <span>Children</span>
              <input placeholder={options.children} name="children" />
            </div>
            <div className="optionItem">
              <span>Room</span>
              <input placeholder={options.room} name="room" />
            </div>
            <Button isDescription title="Search" />
          </form>
        </div>
        <div className="listCardResults">
          {loading ? (
            "Loading"
          ) : (
            <>
              {data.map((item) => (
                <CardResult
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  distance={item.distance}
                  desc={item.desc}
                  rating={item.rating}
                  price={item.cheapestPrice}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
export default Results;
