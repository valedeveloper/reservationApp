import { listTypeBrowse } from "../../data/Browse";
import { useData } from "../../hooks/useData";
import "./CardBrowse.css";
function CardsBrowse() {
  const { data, loading } = useData("hotel/countByType");
  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          {listTypeBrowse.map((item, i) => (
            <div className="cardBrowse" key={i}>
              <img src={item.image} alt="This is a hotel" />
              <h1>{data[i]?.type}</h1>
              <span>{data[i]?.count}</span>
            </div>
          ))}
        </>
      )}
    </>
  );
}
export default CardsBrowse;
