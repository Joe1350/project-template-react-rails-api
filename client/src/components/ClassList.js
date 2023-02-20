import React from "react";

function ClassList({ courses }) {
    return (
        <div style={{ padding: "5%" }}>
            <h1>Our Courses</h1>
            {courses.map(course => (
                <p key={`${course.id}_${course.name}`} >
                    <strong>{course.name}</strong> on {course.day}
                </p>
            ))}
        </div>
    )
}

export default ClassList;
