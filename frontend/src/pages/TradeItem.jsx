import { useState, useEffect } from "react";
import { fetchItemsByUserId } from "../api/itemService";
import { requestItemTrade } from "../api/tradeService";
import ItemDisplay from "../components/ItemDisplay";
import "./TradeItem.css";
import { useLocation } from 'react-router-dom';

function TradeItem() {
    const [requesterDisplayItems, setRequesterDisplayItems] = useState([]);
    const [receiverDisplayItems, setReceiverDisplayItems] = useState([]);
    const [requesterItems, setRequesterItems] = useState([]);
    const [receiverItems, setReceiverItems] = useState([]);
    const userId = sessionStorage.getItem("userId");
    const receiverItemData = useLocation().state.itemData;
    const [receiverId, setreceiverId] = useState(receiverItemData.user_id);
 
    
    const handleTradhandeRequest = async () => {
        
        const requesterItemsIds = requesterItems.map(item => item.item_id);
        const receiverItemsIds = receiverItems.map(item => item.item_id);

        try {
            const tradeResponse = await requestItemTrade(userId, receiverId, requesterItemsIds, receiverItemsIds);
            console.log("Trade request sent:", tradeResponse);
        } catch (error) {
            console.error("Error requesting trade:", error);
        }    
    }
    
    const handleDisplayTradeItems = async () => {
        if (!receiverId) return alert("Please enter a receiver ID"); //not logged in
        try {
            
            const reqitems = await fetchItemsByUserId(userId);
            setRequesterDisplayItems(reqitems);
            const recItems = await fetchItemsByUserId(receiverId);
            setReceiverDisplayItems(recItems);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }

    const toggleRequesterItem = (item) => {
        setRequesterItems((prev) =>
            prev.some(i => i.item_id === item.item_id)
            ? prev.filter(i => i.item_id !== item.item_id)
            : [...prev, item]
        );
    };

    const toggleReceiverItem = (item) => {
        setReceiverItems((prev) =>
            prev.some(i => i.item_id === item.item_id)
            ? prev.filter(i => i.item_id !== item.item_id)
            : [...prev, item]
        );
    };
    
    useEffect (() => {
        if (!userId){
            return;
        }
        else
        {
            setRequesterItems([]);
            setReceiverItems([]);
            setReceiverItems(prevItems => [...prevItems, receiverItemData])
            handleDisplayTradeItems();
        }
    }, [userId, receiverItemData]);

    return(
        <div className="trade-item-container">
            <div className="trade-item-form">
                <h2>Trade Item</h2>
                <input type="text" onChange={(e) => setreceiverId(e.target.value)}></input>
                <div className="trade-item-display">
                    <div className="requester-items">
                        <h2>Your Items</h2>
                        <div className="requester-items-display">
                            {requesterDisplayItems.map((item) => (
                                
                                <div className={`trade-item-display-section ${
                                    requesterItems.some(i => i.item_id === item.item_id) ? "active" : ""
                                    }`} onClick={() => toggleRequesterItem(item)}>
                                <ItemDisplay key={item.item_id} item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="receiver-items">
                        <h2>Insert Other USER's Name</h2>
                        <div className="receiver-items-display">
                            {receiverDisplayItems.map((item) => (
                                <div className={`trade-item-display-section ${
                                    receiverItems.some(i => i.item_id === item.item_id) ? "active" : ""
                                    }`} onClick={() => toggleReceiverItem(item)}>
                                <ItemDisplay key={item.item_id} item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="selected-trade-items">

                    <div className="selected-trade-items-requester">
                        {requesterItems.map((item) => (
                            <button onClick={() => toggleRequesterItem(item)}>{item.name}</button>
                        ))}
                    </div>
                    <div className="selected-trade-items-receiver">
                        {receiverItems.map((item) => (
                            <button onClick={() => toggleReceiverItem(item)}>{item.name}</button>
                        ))}
                    </div>
                </div>
                    <div className="trade-item-actions">
                        <button onClick={handleTradhandeRequest}>Request Trade</button>
                        <button onClick={handleDisplayTradeItems}>Refresh Items</button>
                    </div>
            </div>
        </div>
    )
}

export default TradeItem;