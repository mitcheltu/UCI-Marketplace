import React from 'react';
import './ItemInfo.css'; // Optional: for custom styles
import { Link, useLocation } from 'react-router-dom';

const ItemInfo = () => {
    const location = useLocation();
    const itemData = location.state?.itemData || {};
    console.log("Item data received:", itemData);
    return (
        <div className="item-info-container">
            <div className="image-section">
                <img src={itemData.image_url} alt="Item" />
            </div>
            <div className="info-section">
                <h1 className="item-title">{itemData.name}</h1>
                <p className="seller-name">Seller: {itemData.username}</p>
                <p className="date-posted">Date Posted: {new Date(itemData.created_at).toLocaleDateString('en-GB')}</p>  
                <p className="item-description">{itemData.description}</p>

                <Link to={"/TradeItem"} state={{userId: sessionStorage.getItem('userId'), itemData: itemData}}>
                    <button className="trade-request-button">Request Trade</button>
                </Link>
            </div>
        </div>
    );
};

export default ItemInfo;