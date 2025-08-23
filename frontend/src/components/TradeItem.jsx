import { useState } from "react";
import { requestItemTrade, fetchItemsByUserId } from "../api/itemService";
import ItemDisplay from "./ItemDisplay";
import "./TradeItem.css";
import "./Modal.css";

function TradeItem( {isActive, onClose, userId, receiverID}) {
    const [requesterDisplayItems, setRequesterDisplayItems] = useState([]);
    const [receiverDisplayItems, setReceiverDisplayItems] = useState([]);

    
    const handleTradhandeRequest = async () => {
        if (!receiverID) return alert("Please enter a receiver ID");
        try {
            const reqItems = await fetchItemsByUserId(userId);
            const recItems = await fetchItemsByUserId(receiverID);
            const tradeResponse = await requestItemTrade(userId, receiverID, requesterItems, receiverItems);
            console.log("Trade request sent:", tradeResponse);
            onClose();
        } catch (error) {
            console.error("Error requesting trade:", error);
        }    
    }
    const handleListItems = async () => {
        if (!receiverID) return alert("Please enter a receiver ID");
        try {
            const reqitems = await fetchItemsByUserId(userId);
            setRequesterDisplayItems(reqitems);
            const recItems = await fetchItemsByUserId(receiverID);
            setReceiverDisplayItems(recItems);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }
    

    return(
        <div className={`create-item-modal-overlay ${isActive ? 'active' : ''}`}>
        <div className={`create-item-modal ${isActive ? 'active' : ''}`}>
          
            <button id="create-item-modal-close-button" onClick={onClose}>Close</button>
            <div className="trade-item-form">
                <h2>Trade Item</h2>
                <h4>{userId}</h4>
                <button onClick={handleListItems}>List Items</button>
                <div className="trade-item-display">
                <div className="requester-items">
                    <h2>Your Items</h2>
                    <div className="requester-items-display">
                        {requesterDisplayItems.map((item) => (
                            <div className="item-display-section-{item.item_id}" style={{border: "1px solid #ccc", margin: "20px", justifyContent: "center", alignItems: "center"}}>
                            <ItemDisplay key={item.item_id} item={item} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="receiver-items">
                    <h2>Insert Other USER's Name</h2>
                    <div className="receiver-items-display">
                        {receiverDisplayItems.map((item) => (
                            <div className={`item-display-section-${item.item_id}`} style={{border: "1px solid #ccc", margin: "20px"}}>
                            <ItemDisplay key={item.item_id} item={item} />
                            </div>
                        ))}
                </div>
                </div>
                </div>

            </div>
        </div>
        </div>
    )
}

export default TradeItem;