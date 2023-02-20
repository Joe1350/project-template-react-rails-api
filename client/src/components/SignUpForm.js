import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";

function SignUpForm() {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [age, setAge] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setStudent } = useContext(UserContext)

    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                age: age,
                username: username,
                password: password,
                password_confirmation: passwordConfirmation,
            }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => setStudent(user));
                history.push("/")
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} style={{ width:"350px"}}>
            <label htmlFor="name">Name: </label>
            <input
                type="text"
                id="name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            <label htmlFor="age">Age: </label>
            <input
                type="text"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <br></br>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
            />
            <br></br>
            <label htmlFor="password">Password Confirmation: </label>
            <input
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="current-password"
            />
            <br></br>
            <button
                type="submit"
                style={{ float:"right" }}
            >
                {isLoading ? "Loading..." : "Sign Up"}
            </button>
            {errors === [] ? null : errors.map((err) => <p style={{ color: "red" }} key={err}>{err}</p>)}
        </form>
    );
}

export default SignUpForm;
