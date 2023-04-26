import React from "react";

function Header() {
    return (
        <div className="header d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3">
            <h1 className="my-0 mr-md-auto font-weight-normal">Keepler</h1>
            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-3 text-white" href="/signup">Sign up</a>
                <a className="p-3 text-white" href="/login">Log in</a>
            </nav>
        </div>
    );
}

export default Header;