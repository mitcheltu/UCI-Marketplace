import "./ItemDisplay.css";

function ItemDisplay({ item }) {
    return (
        <div className="item-display">
            <h2>{item.name}</h2>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            {item.image_url && <img src={item.image_url} alt={item.name} />}
        </div>
    );
}

export default ItemDisplay;