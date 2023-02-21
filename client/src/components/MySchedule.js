import React, { useState, useContext } from "react";
import ScheduleListing from "./ScheduleListing";
import EditSuppliesInput from "./EditSuppliesInput";
import { UserContext } from "../context/user";

function MySchedule({ courses }) {
    const [editFormData, setEditFormData] = useState("");
    const [selectedCourses, setSelectedCourses] = useState([])
    const [errors, setErrors] = useState([])
    const [checked, setChecked] = useState(false)
    const { student, setStudent } = useContext(UserContext)

    function handleDisplayEditForm(e, course) {
        const x = document.getElementById(`${course.id}`)

        if (x.style.display === "none") {
            x.style.display = "block"
            e.target.innerText = "Hide Form"
            let filteredCourses = courses.filter(c => {
                if (c.day === course.day) {
                    return c
                } else {
                    return null
                }
            })
            setEditFormData(course.name)
            setSelectedCourses(filteredCourses)
        } else {
            x.style.display = "none"
            e.target.innerText = "Edit Class"
            setSelectedCourses([])
        }
    }

    function handleDelete(course) {
        let schedule = student.schedules.find(s => s.course_id === course.id)

        fetch(`/schedules/${schedule.id}`, {
            method: "DELETE",
        })
            .then(() => {
                let updatedCourses = student.courses.filter(c => c.id !== course.id)
                let updatedSchedules = student.schedules.filter(s => s.id !== schedule.id)
                let updatedStudent = {...student, schedules: updatedSchedules, courses: updatedCourses}
                setStudent(updatedStudent)
            })
    }

    function handleSubmitEdit(e, course) {
        e.preventDefault()
        setErrors([])

        let schedule = student.schedules.find(s => s.course_id === course.id)
        let newCourse = courses.find(c => c.name === editFormData)
        console.log(newCourse)     

        fetch(`/schedules/${schedule.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({...schedule, course_id: newCourse.id}),
        }).then(r => {
            if (r.ok) {
                r.json().then(() => {
                    let updatedSchedules = student.schedules.map(s => s.id === schedule.id ? {...s, course_id: newCourse.id} : s )
                    let updatedCourses = student.courses.map(c => c.id === course.id ? {...c, name: newCourse.name, id: newCourse.id} : c )
                    console.log(updatedCourses)
                    let updatedStudent = {
                        ...student,
                        courses: updatedCourses,
                        schedules: updatedSchedules
                    }
                    setStudent(updatedStudent)
                })
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }

    function changeEditFormInputValue(e) {
        e.preventDefault()
        setEditFormData(e.target.innerText)
    }

    function handleEditFormChange(e) {
        setEditFormData(e.target.value)
    }

    function handleHover() {
        let x = document.getElementById("hover_message")
        if (x.style.display === "none") {
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
    }

    return (
        <div style={{ padding: "5%"}}>
            <h1>{student ? `${student.name}'s` : "My"} Schedule</h1>
            {student ? student.courses.map(course => (
                <div key={course.name}>
                    <ScheduleListing course={course}/>
                    <button onClick={(e) => handleDisplayEditForm(e, course)}>Edit Class</button>
                    <button onClick={() => handleDelete(course)}>Delete Class</button>
                    <br></br>
                    <div id={course.id} style={{ display: "none" }}>
                        <form style={{ padding: "5%"}} onSubmit={(e) => handleSubmitEdit(e, course)}>
                            {/* I had a dropdown, and it looked beautiful, but I didn't know how to make the dropdown populate the current value, a project requirement. I also tried radio and checkbox, but I had the same issue */}

                            {/* <select onChange={handleEditFormChange}>
                                {selectedCourses === [] ? null : selectedCourses.map(c=> (
                                    <option value={c.name}>{c.name}</option>
                                ))}
                            </select>
                            <br></br>
                            <input type="submit" value="Submit Update" /> */}

                            {/* <label>
                                Bring your own supplies:
                                <input type="checkbox" onChange={() => setChecked(!checked)}/>
                            </label> */}
                            {/* <EditSuppliesInput
                                course={course}
                                checked={checked}
                                setChecked={setChecked}
                            /> */}

                            {selectedCourses === [] ? null : selectedCourses.map(c => <div key={c.name}><button onClick={changeEditFormInputValue}>{c.name}</button><br></br></div>) }
                            <br></br>
                            <label>
                                Click on a class button to fill this form:
                            <input id="edit_form_input" type="text" onChange={handleEditFormChange}
                            onMouseEnter={handleHover} onMouseLeave={handleHover} value={editFormData} />
                            </label>
                            <br></br>
                            <p id="hover_message" style={{ display:"none", color: "red" }}>Do Not type in the box! Instead, click on a class.</p>
                            <input type="submit" value="Submit Update" />
                            {errors === [] ? null : <p style={{ color: "red" }}>{errors}</p>}
                        </form>
                    </div>
                </div>
            )) :
                null
            }
        </div>
    )
}

export default MySchedule;
