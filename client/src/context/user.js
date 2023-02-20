import React, { useState, useEffect } from "react";

const UserContext = React.createContext()

function UserProvider({ children }) {
    const [student, setStudent] = useState(null)

    useEffect(() => {
        fetch("/me").then((r) => {
            if (r.ok) {
                r.json().then(user => setStudent(user));
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ student, setStudent }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };
