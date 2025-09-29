import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";



function Navbar() {
    const [searchName, setSearchName] = useState("");
    const [searchSeller, setSearchSeller] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            console.log("Search Name:", searchName);
            console.log("Seller:", searchSeller);
            console.log("Category:", searchCategory);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Search Name:", searchName);
        console.log("Seller:", searchSeller);
        console.log("Category:", searchCategory);

        const params = new URLSearchParams({ search: searchName, seller: searchSeller, category: searchCategory });
        navigate(`/?${params.toString()}`);

    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <div className="navbar-title">
                        <Link to="/" className="navbar-link">UCI Marketplace</Link>
                    </div>
                </div>
                <div className="search-wrapper">
                    <div className="search-container">
                        <form className="search-form" action="/search" method="GET" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Search..." value={searchName} onChange={(e) => setSearchName(e.target.value)} onKeyDown={handleKeyDown}></input>
                        </form>
                    </div>
                    <div className="filters">
                        <label>Seller: <input type="search" value={searchSeller} onChange={(e) => setSearchSeller(e.target.value)}></input></label>
                        <label>Category: 
                            <select id="Category" name="Category" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Books">Books</option>
                                <option value="Toys">Toys</option>
                                <option value="Sports">Sports</option>
                                <option value="Stationery">Stationery</option>
                                <option value="Other">Other</option>
                            </select> 
                        </label>
                    </div>
                </div>

                <div className="CreateItem-Navbar-Button">
                    <Link to={"/CreateItem"}>
                        <button className="standard_button">+ Sell Item</button>
                    </Link>
                </div>
               
                <div className="Login-Navbar-Button">
                    <Link to={"/Login"}>
                        <button className="standard_button">Login</button>
                    </Link>
                </div>
            </div>
            </nav>
    );
}

export default Navbar;