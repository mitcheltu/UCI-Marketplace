import "./Navbar.css";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <nav class="navbar">
            <div class="navbar-container">
                <div class="navbar-brand">
                    <div class="navbar-logo">🐷</div>
                    <div class="navbar-title">
                        <Link to="/" className="navbar-link">UCI Marketplace</Link>
                    </div>
                </div>

            </div>
            </nav>
    );
}

export default Navbar;