import React from "react";

function Header(props) {
    async function logoutUser(e) {
        e.preventDefault();
        await fetch("http://localhost:5000/logout", {
            method: "GET",
            headers: { "Content-Type": "application/json", }
        })
        .then(res => {
            props.toggleLoggedin(false);
        })
        ;
    }

    return (
        <div className="header d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3">
            <h1 className="my-0 mr-md-auto font-weight-normal">Keepler</h1>
            {props.loggedin ? (
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-3 text-white" href="/logout" onClick={logoutUser}>Log out</a>
                </nav>
            ) : (
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="p-3 text-white" href="/signup">Sign up</a>
                    <a className="p-3 text-white" href="/login">Log in</a>
                </nav>
            )}
        </div>
    );
}

export default Header;