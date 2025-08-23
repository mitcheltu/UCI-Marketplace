import "./ItemDisplay.css";

function ItemDisplay({ item }) {
    console.log("Item in ItemDisplay:", item);
    return (
        <div className="item-display">
            <h2><strong>User:</strong> {item.username}</h2>
            {item.image_url && <img src={item.image_url} alt={item.name} />}
            <h2>{item.name}</h2>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            
        </div>
    );
}

export default ItemDisplay;