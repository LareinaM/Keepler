import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignupForm(props) {
    const [form, setForm] = useState({
        password: '',
        email: '',
        userID: ''
    });
    const navigate = useNavigate();

    function editUser(e) {
        const { name, value } = e.target;
        setForm(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    async function submitUser(e) {
        e.preventDefault();
        const newUser = { ...form };
        await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(newUser),
        });
        // TODO
        props.setID(null);
        navigate('/');
    }

    return (
        <form className="form-signin" method="post">
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input onChange={editUser} name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input onChange={editUser} name="password" type="password" id="inputPassword" className="form-control mb-3" placeholder="Password" required />
            <button className="btn btn-lg btn-yellow btn-block" onClick={submitUser}>Sign in</button>
        </form>
    );
}

export default SignupForm;