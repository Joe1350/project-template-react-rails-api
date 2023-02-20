import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Login( ) {
    const [showLogin, setShowLogin] = useState(false)

    return (
        <div style={{ padding: "5%" }}>
            {showLogin ? (
                <div>
                    <h1>Login</h1>
                    <LoginForm />
                    <p>
                        Don't have an account? &nbsp;
                        <button color="secondary" onClick={() => setShowLogin(false)}>
                            Sign Up
                        </button>
                    </p>
                </div>
            ) : (
                <div style={{ padding: "5%" }}>
                    <h1>Sign Up</h1>
                    <SignUpForm />
                    <p>
                        Already have an account? &nbsp;
                        <button color="secondary" onClick={() => setShowLogin(true)}>
                            Log In
                        </button>
                    </p>
                </div>
            )}
        </div>
    )
}

export default Login;
