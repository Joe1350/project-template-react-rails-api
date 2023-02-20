import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setStudent } = useContext(UserContext)

    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({ username, password }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => setStudent(user));
                history.push("/")
            } else {
                r.json().then((err) => setErrors(err.error));
            }
        });
    }
        
    return (
        <form onSubmit={handleSubmit} style={{ width:"250px"}} >
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br></br>
            <label htmlFor="password">Password: </label>
            <input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <button variant="fill" color="primary" type="submit" style={{ float:"right" }}>
                {isLoading ? "Loading..." : "Login"}
            </button>
            {errors === [] ? null : <p>{errors}</p>}
        </form>
    )
}

export default LoginForm;
