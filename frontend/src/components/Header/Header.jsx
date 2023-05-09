import Filter from "../FilterBar/Filter";
import Button from "../Button/Button";
import "./Header.css";
function Header() {
  return (
    <header>
      <div className="descriptionHeader">
        <h1>A lifetime of discounts? It´s Genius.</h1>
        <p>
          Get rewarded for you travels -unlock instant saving of 10% more with a
          free Lamabrooking acconunt
        </p>
        <Button isDescription/>
      </div>
      <Filter/>
    </header>
  );
}

export default Header;
