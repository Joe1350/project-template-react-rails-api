import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";

function AddScheduleForm({ courses, setCourses }) {
    const [bringOwnSupplies, setBringOwnSupplies] = useState(false)
    const [day, setDay] = useState("")
    const [courseName, setCourseName] = useState("")
    const [errors, setErrors] = useState([])
    const { student, setStudent } = useContext(UserContext)

    const history = useHistory()

    function handleDayChange(e) {
        setDay(e.target.value)
    }

    function handleClassChange(e) {
        setCourseName(e.target.value)
    }

    function handleSuppleiesCheckbox() {
        setBringOwnSupplies(!bringOwnSupplies)
    }

    function handleSubmit(e) {
        e.preventDefault()

        let course = courses.find(course => course.name === courseName)

        let newSchedule = {
            bring_own_supplies: bringOwnSupplies,
            course_id: course.id
        }

        fetch("/schedules", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSchedule),
        }).then(r => {
            if (r.ok) {
                r.json().then(data => {
                    let updatedStudent = student
                    let schedule = {
                        id: data.id,
                        bring_own_supplies: data.bring_own_supplies,
                        course_id: data.course_id
                    }
                    updatedStudent.schedules.push(schedule)
                    let course = courses.find(c => c.name === courseName)
                    updatedStudent.courses.push(course)
                    setStudent(updatedStudent)
                    history.push("/schedule")
                })
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
            
    }

    return (
        <div style={{ padding: "5%"}}>
            <h1>Sign Up for a Class</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Choose a Day:
                    <select onChange={handleDayChange} >
                        <option
                            value=""
                        >
                            Choose a Day
                        </option>
                        <option
                            value="monday"
                        >
                            Monday
                        </option>
                        <option
                            value="tuesday"
                        >
                            Tuesday
                        </option>
                        <option
                            value="wednesday"
                        >
                            Wednesday
                        </option>
                        <option
                            value="thursday"
                        >
                            Thursday
                        </option>
                        <option
                            value="friday"
                        >
                            Friday
                        </option>
                    </select>
                </label>
                <br></br>
                <label style={day === "" ? { display: "none" } : { display: "block" }}>
                    Choose a Class
                    <select onChange={handleClassChange}>
                        <option value="">Choose a Class</option> 
                        {courses.map(
                            course => (
                                course.day === day ? <option key={`${course.id}`} value={`${course.name}`}>{course.name}</option> : null
                            )
                        )}
                    </select>
                </label>
                <br></br>
                <label>
                    I will bring my own supplies
                    <input
                        type="checkbox"
                        name="bring_own_supplies"
                        value={bringOwnSupplies}
                        onChange={handleSuppleiesCheckbox}
                    />
                </label>
                <br></br>
                <input type="submit" value="Enroll"/>
                {errors === [] ? null : errors.map(err => (
                    <p style={{ color: "red" }}>{err}</p>
                ))}
            </form>
        </div>
    )
}

export default AddScheduleForm;
