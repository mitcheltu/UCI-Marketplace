
import { useState } from "react";
import CreateUser from "../components/CreateUser";
import InfoTable from "../components/InfoTable";
import ItemDisplay from "../components/ItemDisplay";

import { fetchAllUsers } from "../api/userService";
import { fetchAllItems } from "../api/itemService";

import "./Home.css";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function HomePage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [isCreateUserOpen, setCreateUserOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const search = params.get("search") || "";
    const seller = params.get("seller") || "";
    const category = params.get("category") || "";
    console.log("Search params:", { search, seller, category });

    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await fetchAllUsers();
                setUserData(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getUsers();
    }, []);

    useEffect(() => {
        const getItems = async () => {
            try {
                const items = await fetchAllItems();
                const filteredItems = items.filter(item => 
                    item.name.includes(search) || 
                    item.category.includes(category) || 
                    item.user_id.includes(seller)
                );
                setItemData(filteredItems);
                console.log("set itemData: ", filteredItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        getItems();
    }, [search, seller, category]);
    
    return(
        <div className="Home-Body" >
            <div className="button-controls">
                <button onClick={() => setCreateUserOpen(true)}>Create User!</button>
                <CreateUser 
                isActive={isCreateUserOpen}
                onClose={() => setCreateUserOpen(false)}
                />
                
                <input type="text" placeholder="Your User ID" onChange={(e) => {console.log(e.target.value); sessionStorage.setItem('userId', e.target.value)}} />
    
            </div>

            <div className="info-display" >
                <InfoTable 
                    columns={[
                        {header: "Username", accessor: "username"},
                        {header: "UserID", accessor: "user_id"},
                        {header: "Email", accessor: "email"},
                        {header: "FirebaseUID", accessor: "firebase_uid"}
                        ]}
                    data={userData} />
                <InfoTable 
                    columns={[
                        {header: "ItemID", accessor: "item_id"},
                        {header: "UserID", accessor: "user_id"},
                        {header: "name", accessor: "name"}
                        ]} 
                    data={itemData} />
            </div>
            

            
            <div className="item-display-section">
                {itemData.map((item) => (
                    <div className="item-display-section-{item.item_id}" style={{border: "1px solid transparent", margin: "10px"}}>
                        <Link to={"/ItemInfo"} state={{itemData: item}}>
                            <ItemDisplay key={item.item_id} item={item} />
                        </Link>
                        
                    </div>
                ))}
            </div>
            
            
        </div>
        
    )
}

export default HomePage;