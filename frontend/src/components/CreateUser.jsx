import { useState } from "react";
import { createUser } from "../api/userService";
import "./Modal.css";

function CreateUser( {isActive, onClose}) {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleCreateUser = (e) => {
        e.preventDefault();
        if (user) {

            createUser({ username: user, email: email, password: password });
            setUser("");
            setEmail("");
            setPassword("");
            onClose();
        }
        else {  
            console.log("Can't be empty")
        }
        
    }

    return(
        <div className={`create-item-modal-overlay ${isActive ? 'active' : ''}`}>
        <div className={`create-item-modal ${isActive ? 'active' : ''}`}>
          
            <button id="create-item-modal-close-button" onClick={onClose}>Close</button>
            <form onSubmit={handleCreateUser}>
                <input type="text" placeholder={"Username"} onChange={(e) => setUser(e.target.value)}></input>
                <input type="text" placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="text" placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}></input>
                <input type="submit" value={"submit"}></input>
            </form>
        </div>
        </div>
    )
}

export default CreateUser;