import React, {useContext} from "react";
import { UserContext } from "../context/user";


function ScheduleListing({ course }) {
    const { student } = useContext(UserContext)

    let schedule = student.schedules.find(s => s.course_id === course.id)

    return (
        <p>{course.name} on {course.day} {schedule.bring_own_supplies ? "with" : "without"} my own supplies</p>
    )
}

export default ScheduleListing;