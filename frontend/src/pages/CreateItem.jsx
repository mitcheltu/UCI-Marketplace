import { useState } from "react";
import { createItem } from "../api/itemService";
import "./CreateItem.css"

function CreateItem() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const userId = sessionStorage.getItem("userId");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleCreateItem = async (e) => {
        e.preventDefault();

        if (!image) return alert("Please select an image");
        console.log("userId: ", userId);
        if (name && description && category && userId) {
            try {
                    // for now, set price to 0, change later
                const newItem = await createItem({ user_id: userId, name, description, price, category, image });
                console.log("Item created:", newItem);

                setName("");
                setDescription("");
                setCategory("");
                setPrice(0);
                setImage(null);
                setPreview(null);
            } catch (err) {
                console.error("Error creating item:", err);
            }
        }
        else {
            alert("Please fill in all fields");
        }
    }

    const handleChangeImg = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        if (selectedFile) {
            const previewURL = URL.createObjectURL(selectedFile);
            setPreview(previewURL);
        }
        else {
            setPreview(null);
        }
    };
    
    return(
        <div className="create-item-container">
            <form onSubmit={handleCreateItem} >
                <input type="text" placeholder={"Name"} onChange={(e) => setName(e.target.value)}></input>

                <input type="text" placeholder={"Description"} onChange={(e) => setDescription(e.target.value)}></input>

                <input type="number" step="0.01" min="0.00" placeholder={"Price"} onChange={(e) => setPrice(e.target.value)}></input>

                <span>Select Category: </span>
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled hidden>Select a Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Toys">Toys</option>
                    <option value="Sports">Sports</option>
                    <option value="Stationery">Stationery</option> 
                    <option value="Other">Other</option>
                </select>
                <input type="file" accept="image/*" onChange={handleChangeImg} />
                {preview && (
                    <div>
                    <p>Image Preview:</p>
                    <img src={preview} alt="Preview" style={{ width: '20%', height: 'auto' }} />
                </div>
                )}   
                <input type="submit" value={"submit"}></input>
            </form>
        </div>
    )
}

export default CreateItem;

