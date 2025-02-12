import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CreateClassForm({ courses, onSetCourses }) {
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        day: "monday" // ,
        // description: ""
    })

    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        let newCourse = formData

        fetch("/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCourse),
        }).then(r => {
            if (r.ok) {
                r.json().then(newClassData => onSetCourses(newClassData))
                // setFormData({
                //     name: "",
                //     day: "" // ,
                //     // description: ""
                // })
                history.push("/browse")
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
            
    }

    // .then((r) => {
    //     setIsLoading(false);
    //     if (r.ok) {
    //         r.json().then((user) => setStudent(user));
    //         history.push("/")
    //     } else {
    //         r.json().then((err) => setErrors(err.errors));
    //     }
    // });

    console.log(errors)

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div style={{ padding: "5%" }} >
            <h1>Add a New Class to the Program</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Class Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <br></br>
                <label>
                    Day:
                    <select name="day" onChange={handleChange}>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                    </select>
                </label>
                <br></br>
                {/* <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label> */}
                {/* <br></br> */}
                <input type="submit" value="Add Class" />
                {errors === [] ? null : <p style={{ color: "red" }}>{errors}</p>}
            </form>
        </div>
    )
}

export default CreateClassForm;
