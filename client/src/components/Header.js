import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
function Header() {
    return (
        <header class="p-3 text-white">
            <div class="container" id="header-container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <h1 class="fs-4">Keepler</h1>
                    </a>
                    <ul class="nav navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create">
                                Create Note
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;