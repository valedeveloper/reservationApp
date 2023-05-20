import CardsCountries from "../CardCountry/CardCountry";
import CardsBrowse from "../CardBrowse/CardBrowse";
import CardsHome from "../CardHome/CardHome";
import "./Section.css";
import { useData } from "../../hooks/useData";

function Section() {
  return (
    <main>
      <section className="sectionCountries">
        <CardsCountries />
      </section>
      <section className="sectionTypeBrowse">
        <h1 className="titleType">Browse by property type</h1>
        <div className="listCardsBrowse">
          <CardsBrowse />
        </div>
      </section>
      <section className="sectionHomeOptions">
        <h1 className="titleType">Home guest Love</h1>
        <div className="listCardsBrowse">
          <CardsHome />
        </div>
      </section>
    </main>
  );
}
export default Section;
