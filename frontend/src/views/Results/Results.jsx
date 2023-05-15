import { useState } from "react";
import Button from "../../components/Button/Button";
import CardResult from "../../components/CardResults/CardResult";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";

import "./Results.css";
import { format } from "date-fns";
function Results() {
  const location = useLocation(); //Del location vienen los estados que se le hayan pasado a este route

  const [destination] = useState(location.state.destination);
  const [date] = useState(location.state.date);
  const [options] = useState(location.state.countOptions);
  const [isDate, setIsDate] = useState(false);
  
  const handledOptionDate = () => {
    setIsDate(!isDate);
  };
  return (
    <section className="sectionResults">
      <div className="resultsWrap">
        <div className="containerForm">
          <h1>Search</h1>
          <form className="formSearchResult">
            <label id="country">Destino</label>
            <input id="country" placeholder={destination} />
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
              />
            )}
            <label>Options</label>
            <div className="optionItem">
              <span>Min price</span>
              <input />
            </div>
            <div className="optionItem">
              <span>Max price</span>
              <input />
            </div>
            <div className="optionItem">
              <span>Adult</span>
              <input placeholder={options.adult} />
            </div>
            <div className="optionItem">
              <span>Children</span>
              <input placeholder={options.children} />
            </div>
            <div className="optionItem">
              <span>Room</span>
              <input placeholder={options.room} />
            </div>
            <Button isDescription title="Search" />
          </form>
        </div>
        <div className="listCardResults">
          <CardResult />
          <CardResult />
          <CardResult />
          <CardResult />
          <CardResult />
          <CardResult />
        </div>
      </div>
    </section>
  );
}
export default Results;
