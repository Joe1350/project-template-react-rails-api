import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";

function NavBar() {
    const { student, setStudent } = useContext(UserContext)

    const history = useHistory()

    const myStyle = {padding: "10px"}

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setStudent(null);
            }
        });
        history.push("/")
    }
    
    return (
        student ?
        <div>
            <NavLink
                to="/"
                exact
                style={myStyle}
                activeStyle={{
                    background: "darkblue",
                    color: "white"
                }}
            >
                Home
            </NavLink>
            <NavLink
                to="/schedule"
                exact
                style={myStyle}
                activeStyle={{
                    background: "darkblue",
                    color: "white"
                }}
            >
                My Schedule
            </NavLink>
            <NavLink
                to="/add_class"
                exact
                style={myStyle}
                activeStyle={{
                    background: "darkblue",
                    color: "white"
                }}
            >
                Class Sign Up
            </NavLink>
            <NavLink
                to="/create_class"
                exact
                style={myStyle}
                activeStyle={{
                    background: "darkblue",
                    color: "white"
                }}
            >
                Create Class
            </NavLink>
            <NavLink
                to="/browse"
                exact
                style={myStyle}
                activeStyle={{
                    background: "darkblue",
                    color: "white"
                }}
            >
                Browse Classes
            </NavLink>
            <button onClick={handleLogoutClick}>Logout</button>
        </div> :
        <div>
            <NavLink
                to="/"
                exact
                style={myStyle}
                activeStyle={{
                    background: "darkblue",
                    color: "white"
                }}
            >
                Home
            </NavLink>
            <NavLink
                to="/browse"
                exact
                style={myStyle}
                activeStyle={{
                    background: "darkblue",
                    color: "white"
                }}
            >
                Browse Classes
            </NavLink>
            <NavLink
                to="/login"
                exact
                style={myStyle}
                activeStyle={{
                    background: "darkblue",
                    color: "white"
                }}
            >
                Login/Sign Up
            </NavLink>
        </div>
    )
}

export default NavBar;
