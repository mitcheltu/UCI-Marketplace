import CreateItem from "../components/CreateItem";
import { useState } from "react";
import CreateUser from "../components/CreateUser";
import InfoTable from "../components/InfoTable";
import ItemDisplay from "../components/ItemDisplay";

import { fetchAllUsers } from "../api/userService";
import { fetchAllItems } from "../api/itemService";

import { useEffect } from "react";

function HomePage() {
    const [isCreateUserOpen, setCreateUserOpen] = useState(false);
    const [isCreateItemOpen, setCreateItemOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [itemData, setItemData] = useState([]);

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
                setItemData(items);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        getItems();
    }, []);
    
    return(
        <div className="Home-Body" style={{display: "flex", flexDirection: "column"}}>
            <h1>Home Piggy</h1>
            <div className="button-controls">
                <button onClick={() => setCreateUserOpen(true)}>Create User!</button>
                <CreateUser 
                isActive={isCreateUserOpen}
                onClose={() => setCreateUserOpen(false)}
                />
                <button onClick={() => setCreateItemOpen(true)}>Create Item!</button>
                <CreateItem 
                isActive={isCreateItemOpen}
                onClose={() => setCreateItemOpen(false)}
                />
            </div>
            <div className="info-display" >
                <InfoTable 
                    columns={[
                        {header: "Username", accessor: "username"},
                        {header: "UserID", accessor: "user_id"},
                        {header: "Email", accessor: "email"},
                        {header: "Hashed-Password", accessor: "password"}
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
                    <ItemDisplay key={item.item_id} item={item} />
                ))}
            </div>
            
            
        </div>
        
    )
}

export default HomePage;