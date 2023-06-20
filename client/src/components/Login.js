import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
    const [form, setForm] = useState({
        password: '',
        username: ''
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
        await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
            credentials: 'include',
            mode: 'cors'
        })
        .then(response => response.json())
        .then(res => {
            // console.log("Res:", res);
            if (res.login === 'success') {
                props.toggleLoggedin(true);
                // navigate('/');
                setForm({
                    password: '',
                    username: ''
                });
            }
        });
    }

    return (
        <form className="form-signin" method="post">
            <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input onChange={editUser} name="username" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input onChange={editUser} name="password" type="password" id="inputPassword" className="form-control mb-3" placeholder="Password" required />
            <button className="btn btn-lg btn-yellow btn-block" onClick={submitUser}>Log in</button>
        </form>
    );
}

export default LoginForm;