import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBed } from "react-icons/fa";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { VscPerson } from "react-icons/vsc";
import Button from "../Button/Button";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import "./Filter.css";
const OPTIONSACTIONS = {
  i: "increment",
  d: "decrement",
};
const OPTIONSNAMES = {
  adult: "adult",
  children: "children",
  room: "room",
};

function Filter() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("Colobia");
  const [isDate, setIsDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isOptions, setIsOptions] = useState(false);
  const [countOptions, setCountOption] = useState({
    adult: 0,
    children: 0,
    room: 0,
  });
  const {dispatch,OPTION_ACTIONS}=useContext(SearchContext)

  const handledSubmit = () => {
    dispatch({ type: OPTION_ACTIONS.newSearch, payload: { destination, date, countOptions} });
    navigate("/results", { state: {destination,date,countOptions} }); //Navegar a (sitio), estados para compartir
  };
  const handledOptionDate = () => {
    setIsDate(!isDate);
  };
  const handledOption = () => {
    setIsOptions(!isOptions);
  };
  const handledChangeOptions = (name, action) => {
    setCountOption((prevCount) => ({
      ...prevCount,
      [name]:
        action === OPTIONSACTIONS.i
          ? countOptions[name] + 1
          : countOptions[name] > 0
          ? countOptions[name] - 1
          : 0,
    }));
  };
  const handledDestination = (e) => {
    setDestination(e.target.value);
  };
  return (
    <div className="filterContainer">
      <form className="formFilter" onSubmit={handledSubmit}>
        <div className="itemInput">
          <FaBed fontSize={"20px"} color="gray" />
          <input
            type="text"
            placeholder="Where are you going?"
            onChange={handledDestination}
          />
        </div>
        <div className="itemInput">
          <BsFillCalendarWeekFill fontSize={"20px"} color="gray" />
          <span onClick={handledOptionDate}>
            {`${format(date[0].startDate, "MM/dd/yyyy") ?? "Inicio"} to ${
              format(date[0].endDate, "MM/dd/yyyy") ?? "Fin"
            }`}
          </span>
          {isDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="dateContainer"
            />
          )}
        </div>
        <div className="itemInput">
          <VscPerson fontSize={"20px"} color="gray" />
          <span onClick={handledOption}>
            {countOptions.adult} Adult {countOptions.children} Children
            {countOptions.room} Room
          </span>
        </div>
          {" "}
          <Button title="Search" isDescription onClick={handledSubmit}/>
      </form>
      {isOptions && (
        <div className="itemsPersons">
          <div className="item">
            <span className="itemTitle">Adult</span>
            <div className="optionCounter">
              <span
                className="signos"
                onClick={() =>
                  handledChangeOptions(OPTIONSNAMES.adult, OPTIONSACTIONS.d)
                }
              >
                -
              </span>
              <span className="number">{countOptions.adult}</span>
              <span
                className="signos"
                onClick={() =>
                  handledChangeOptions(OPTIONSNAMES.adult, OPTIONSACTIONS.i)
                }
              >
                +
              </span>
            </div>
          </div>
          <div className="item">
            <span className="itemTitle">Children</span>
            <div className="optionCounter">
              <span
                className="signos"
                onClick={() =>
                  handledChangeOptions(OPTIONSNAMES.children, OPTIONSACTIONS.d)
                }
              >
                -
              </span>
              <span className="number">{countOptions.children}</span>
              <span
                className="signos"
                onClick={() =>
                  handledChangeOptions(OPTIONSNAMES.children, OPTIONSACTIONS.i)
                }
              >
                +
              </span>
            </div>
          </div>
          <div className="item">
            <span className="itemTitle">Room</span>
            <div className="optionCounter">
              <span
                className="signos"
                onClick={() =>
                  handledChangeOptions(OPTIONSNAMES.room, OPTIONSACTIONS.d)
                }
              >
                -
              </span>
              <span className="number">{countOptions.room}</span>
              <span
                className="signos"
                onClick={() =>
                  handledChangeOptions(OPTIONSNAMES.room, OPTIONSACTIONS.i)
                }
              >
                +
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Filter;
