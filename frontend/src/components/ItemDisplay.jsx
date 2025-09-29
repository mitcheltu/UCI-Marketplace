import "./ItemDisplay.css";

function ItemDisplay({ item }) {
    console.log("Item in ItemDisplay:", item);
    return (
    <div className="item-display" aria-label={item.name}>
      {item.image_url && (
        <img src={item.image_url} alt={item.name} loading="lazy" />
      )}
      <div className="item-info">
        <h2 title={item.name}>{item.name}</h2>
      </div>
    </div>
  );
}

export default ItemDisplay;