import React, { useContext } from "react";
import { UserContext } from "../context/user";

function EditSuppliesInput({ course, checked, setChecked }) {
    const { student } = useContext(UserContext)

    const schedule = student.schedules.find(s => s.course_id === course.id)

    setChecked(schedule.bring_own_supplies)

    return (
        <label>
            Bring your own supplies
            <input type="checkbox" value={checked} onChange={() => setChecked(!checked)} />
        </label>
    )
}

export default EditSuppliesInput;
